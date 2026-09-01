import { useEffect, useMemo, useState, useCallback } from "react";
import { getVisits, clearVisits, exportCSV, fetchVisitsFromDB, clearVisitsFromDB } from "@/lib/visitors";

function fmtTime(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, { year:"numeric", month:"short", day:"2-digit", hour:"2-digit", minute:"2-digit", second:"2-digit" });
  } catch { return iso; }
}

function Flag({ code }) {
  if (!code) return <span className="text-white/30">—</span>;
  const flag = code.length === 2 ? code.toUpperCase().replace(/./g, c => String.fromCodePoint(127397 + c.charCodeAt(0))) : "";
  return <span className="inline-flex items-center gap-1.5"><span>{flag}</span><span className="text-xs font-mono">{code}</span></span>;
}

export default function VisitorsPage() {
  const [visits, setVisits] = useState(() => getVisits());
  const [dbMeta, setDbMeta] = useState({ source: "local", total: visits.length });
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");
  const [routeFilter, setRouteFilter] = useState("all");
  const [refreshTick, setRefreshTick] = useState(0);

  const loadFromDB = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchVisitsFromDB({ limit: 500, offset: 0, route: routeFilter, q });
      // if DB returned rows, use them; otherwise keep local
      if (res?.rows) {
        setVisits(res.rows);
        setDbMeta({ source: res.source, total: res.total });
      } else {
        const local = getVisits();
        setVisits(local);
        setDbMeta({ source: "local", total: local.length });
      }
    } catch {
      const local = getVisits();
      setVisits(local);
      setDbMeta({ source: "local", total: local.length });
    } finally {
      setLoading(false);
      setRefreshTick(t => t + 1);
    }
  }, [routeFilter, q]);

  const reloadLocal = useCallback(() => {
    setVisits(getVisits());
    loadFromDB();
  }, [loadFromDB]);

  useEffect(() => {
    document.title = "Visitors — RealMeal";
    const fav = document.querySelector("link[rel='icon']");
    if (fav) fav.href = "/realmeal/logo.png";
  }, []);

  useEffect(() => {
    loadFromDB();
  }, [loadFromDB]);

  useEffect(() => {
    const onUpd = () => setVisits(getVisits());
    window.addEventListener("rm:visitors-updated", onUpd);
    window.addEventListener("storage", onUpd);
    const iv = setInterval(() => setVisits(getVisits()), 4000);
    return () => {
      window.removeEventListener("rm:visitors-updated", onUpd);
      window.removeEventListener("storage", onUpd);
      clearInterval(iv);
    };
  }, []);

  const filtered = useMemo(() => {
    // server already filtered by routeFilter+q, but also filter client-side for hybrid
    const needle = q.trim().toLowerCase();
    return visits.filter(v => {
      if (routeFilter !== "all" && v.route !== routeFilter) return false;
      if (!needle) return true;
      const hay = [v.route, v.ip, v.city, v.region, v.country, v.countryCode, v.org, v.browser, v.os, v.device, v.referrer, v.language, v.email, v.name, v.href].join(" ").toLowerCase();
      return hay.includes(needle);
    });
  }, [visits, q, routeFilter]);

  const stats = useMemo(() => {
    const total = dbMeta.total ?? visits.length;
    const uniqIps = new Set(visits.map(v => v.ip).filter(Boolean)).size;
    const today = visits.filter(v => {
      try { return new Date(v.timestamp).toDateString() === new Date().toDateString(); } catch { return false; }
    }).length;
    const byRoute = visits.reduce((acc, v) => { acc[v.route] = (acc[v.route]||0)+1; return acc; }, {});
    const topRoute = Object.entries(byRoute).sort((a,b)=>b[1]-a[1])[0]?.[0] || "—";
    return { total, uniqIps, today, topRoute, byRoute };
  }, [visits, dbMeta]);

  const handleClear = async () => {
    if (!visits.length) return;
    if (!confirm(`Clear ${visits.length} visitor record(s)? This will clear local + DB (if connected). Cannot be undone.`)) return;
    await clearVisitsFromDB();
    // fallback also clear local
    clearVisits();
    setVisits([]);
    setDbMeta({ source: dbMeta.source, total: 0 });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="sticky top-0 z-30 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur">
        <div className="mx-auto max-w-[1280px] px-4 py-4 sm:px-6 flex flex-wrap items-center gap-3 justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-white text-black text-[11px] font-bold">RM</span>
              Visitors
              <span className="ml-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-normal text-white/60">{dbMeta.total ?? visits.length} records</span>
              <span className="ml-1 rounded-full bg-emerald-500/15 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-mono text-emerald-300">{dbMeta.source === "prisma" ? "prisma" : dbMeta.source === "supabase" ? "supabase" : "local"} {loading ? "· loading…" : ""}</span>
            </h1>
            <p className="text-xs text-white/50 mt-1 max-w-[70ch]">
              Page views for <span className="text-white/80">/</span> · <span className="text-white/80">/#/realmeal</span> · <span className="text-white/80">/#/behealthy</span>. Prisma table <code className="font-mono text-emerald-300/80">visitors</code> on Supabase <code className="font-mono text-white/60">mlncmwgoljergzncycsa</code>.{" "}
              <span className="text-amber-300/80">IP/geo via ipapi.co/ipwho.is</span> — Email/name only when user submits a form.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <a href="#/" className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/10">← Home</a>
            <a href="#/realmeal" className="hidden sm:inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/10">RealMeal</a>
            <a href="#/behealthy" className="hidden sm:inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/10">BeHealthy</a>
            <button onClick={reloadLocal} className="rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-black hover:bg-white/90">Refresh</button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-4 py-6 sm:px-6">
        {/* Privacy notice */}
        <div className="mb-6 rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-xs leading-relaxed text-amber-100/90">
          <span className="font-semibold text-amber-200">Prisma + Supabase:</span> Table <code className="font-mono bg-black/30 px-1 rounded">visitors</code> created via <code className="font-mono bg-black/30 px-1 rounded">prisma/schema.prisma</code> (see <code className="font-mono bg-black/30 px-1 rounded">DATABASE_URL</code> in <code className="font-mono bg-black/30 px-1 rounded">.env</code>). Frontend writes via <code className="font-mono bg-black/30 px-1 rounded">POST /api/visitors</code> (Prisma) with fallback direct-insert via <code className="font-mono bg-black/30 px-1 rounded">supabase-js</code>. Secret key <code className="font-mono bg-black/30 px-1 rounded">sb_secret_…</code> stays server-only — never set as <code className="font-mono bg-black/30 px-1 rounded">VITE_</code>.
          <span className="block mt-1 text-amber-200/60">Run <code className="font-mono bg-black/30 px-1 rounded">npx prisma db push</code> to create the table, then <code className="font-mono bg-black/30 px-1 rounded">npm run server</code> for the API (proxied at <code className="font-mono bg-black/30 px-1 rounded">/api</code>).</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-5">
          {[
            { label: "Total visits", value: stats.total },
            { label: "Today", value: stats.today },
            { label: "Unique IPs", value: stats.uniqIps },
            { label: "Top route", value: stats.topRoute },
          ].map(s => (
            <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="text-[11px] uppercase tracking-widest text-white/40">{s.label}</div>
              <div className="mt-1 text-xl font-semibold truncate" title={String(s.value)}>{s.value}</div>
              {s.label === "Top route" && stats.byRoute[s.value] ? <div className="text-xs text-white/40">{stats.byRoute[s.value]} views</div> : null}
            </div>
          ))}
        </div>

        {/* Route breakdown */}
        <div className="flex flex-wrap gap-2 mb-4 text-xs">
          <span className="text-white/40 py-1">Breakdown:</span>
          {Object.entries(stats.byRoute).length ? Object.entries(stats.byRoute).sort((a,b)=>b[1]-a[1]).map(([r,c]) => (
            <span key={r} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-white/70">{r} · {c}</span>
          )) : <span className="text-white/30">No data yet — visit /, /#/realmeal or /#/behealthy to generate a record.</span>}
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="flex-1 flex gap-2">
            <input
              value={q}
              onChange={e=>setQ(e.target.value)}
              placeholder="Search IP, city, country, org, browser, referrer, email…"
              className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/20"
            />
            <select value={routeFilter} onChange={e=>setRouteFilter(e.target.value)} className="rounded-full border border-white/10 bg-[#1a1a1a] px-3 py-2 text-sm text-white outline-none">
              <option value="all">All routes</option>
              <option value="/">/</option>
              <option value="/realmeal">/realmeal</option>
              <option value="/behealthy">/behealthy</option>
              <option value="/visitors">/visitors</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button onClick={()=>exportCSV(filtered.length?filtered:visits)} disabled={!visits.length} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 hover:bg-white/10 disabled:opacity-40">Export CSV</button>
            <button onClick={handleClear} disabled={!visits.length} className="rounded-full bg-red-500/90 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500 disabled:opacity-40">Clear</button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/[0.04] text-[11px] uppercase tracking-widest text-white/40">
                <tr>
                  <th className="px-3 py-3 font-medium whitespace-nowrap">Time</th>
                  <th className="px-3 py-3 font-medium whitespace-nowrap">Route</th>
                  <th className="px-3 py-3 font-medium whitespace-nowrap">IP</th>
                  <th className="px-3 py-3 font-medium whitespace-nowrap">Location</th>
                  <th className="px-3 py-3 font-medium whitespace-nowrap">ISP / Org</th>
                  <th className="px-3 py-3 font-medium whitespace-nowrap">Device</th>
                  <th className="px-3 py-3 font-medium whitespace-nowrap">Browser / OS</th>
                  <th className="px-3 py-3 font-medium whitespace-nowrap">Lang</th>
                  <th className="px-3 py-3 font-medium whitespace-nowrap">Referrer</th>
                  <th className="px-3 py-3 font-medium whitespace-nowrap">Email / Name</th>
                  <th className="px-3 py-3 font-medium whitespace-nowrap">Screen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.length === 0 ? (
                  <tr><td colSpan={11} className="px-4 py-12 text-center text-sm text-white/40">{loading ? "Loading…" : "No visitors yet on this filter."}<br/><span className="text-xs text-white/30">Open <a href="#/" className="underline decoration-white/20 underline-offset-4 hover:text-white/60">#/</a> · <a href="#/realmeal" className="underline decoration-white/20 underline-offset-4 hover:text-white/60">#/realmeal</a> · <a href="#/behealthy" className="underline decoration-white/20 underline-offset-4 hover:text-white/60">#/behealthy</a> in another tab to create a record, then refresh.</span></td></tr>
                ) : filtered.map(v => (
                  <tr key={v.id} className="hover:bg-white/[0.03] transition-colors">
                    <td className="px-3 py-2.5 whitespace-nowrap text-xs text-white/70" title={v.timestamp}>{fmtTime(v.timestamp)}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap"><span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-xs text-white/80">{v.route}</span></td>
                    <td className="px-3 py-2.5 whitespace-nowrap font-mono text-xs text-white/80">{v.ip || <span className="text-white/25">resolving…</span>}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap text-xs text-white/70">
                      {[v.city, v.region].filter(Boolean).join(", ") || <span className="text-white/25">—</span>}
                      {v.country ? <span className="ml-2 text-white/50">{v.country}</span> : null}
                      {v.countryCode ? <span className="ml-1"><Flag code={v.countryCode} /></span> : null}
                      {v.latitude && v.longitude ? <a href={`https://www.google.com/maps?q=${v.latitude},${v.longitude}`} target="_blank" rel="noopener noreferrer" className="ml-1 underline decoration-white/20 underline-offset-2 text-white/40 hover:text-white/70">map</a> : null}
                    </td>
                    <td className="px-3 py-2.5 whitespace-nowrap text-xs text-white/60 max-w-[160px] truncate" title={v.org || ""}>{v.org || <span className="text-white/25">—</span>}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap text-xs text-white/70">{v.device}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap text-xs text-white/60">{v.browser} · {v.os}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap text-xs font-mono text-white/60">{v.language || "—"}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap text-xs text-white/50 max-w-[180px] truncate" title={v.referrer}>{v.referrer ? <a href={v.referrer} target="_blank" rel="noopener noreferrer" className="underline decoration-white/20 underline-offset-2 hover:text-white/70">{new URL(v.referrer).hostname}</a> : "—"}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap text-xs text-white/60">
                      {v.email || v.name ? <span>{[v.name, v.email].filter(Boolean).join(" · ")}</span> : <span className="text-white/25" title="Requires explicit form opt-in">—</span>}
                    </td>
                    <td className="px-3 py-2.5 whitespace-nowrap font-mono text-xs text-white/40">{v.viewport} <span className="text-white/20">/</span> {v.screen}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length > 0 && (
            <div className="border-t border-white/10 bg-black/20 px-4 py-2 text-[11px] text-white/30 truncate">
              Showing {filtered.length} of {dbMeta.total} records — source: {dbMeta.source} · Full href & user-agent exported in CSV.
            </div>
          )}
        </div>

        <p className="mt-4 text-xs leading-relaxed text-white/30">
          Prisma model <code className="font-mono text-white/50">Visitor</code> @ <code className="font-mono text-white/50">prisma/schema.prisma:14</code> maps to table <code className="font-mono text-white/50">visitors</code>. Direct Supabase table also works via anon key — but keep <code className="font-mono text-white/50">sb_secret_…</code> server-only.
        </p>
      </div>
    </div>
  );
}
