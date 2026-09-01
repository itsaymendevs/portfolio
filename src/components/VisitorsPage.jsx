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

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false);
  if (!text) return null;
  return (
    <button
      onClick={async () => { try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(()=>setCopied(false), 1200);} catch {} }}
      className="ml-1 inline-flex items-center rounded bg-white/10 px-1 py-0.5 text-[10px] font-mono text-white/60 hover:bg-white/15 hover:text-white"
      title="Copy"
    >{copied ? "✓" : "⧉"}</button>
  );
}

export default function VisitorsPage() {
  const [visits, setVisits] = useState(() => getVisits());
  const [dbMeta, setDbMeta] = useState({ source: "local", total: visits.length });
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [q, setQ] = useState("");
  const [routeFilter, setRouteFilter] = useState("all");
  const [page, setPage] = useState(0);
  const [expandedId, setExpandedId] = useState(null);
  const PAGE_SIZE = 200;

  const loadFromDB = useCallback(async ({ reset = true, nextPage = 0 } = {}) => {
    if (reset) setLoading(true); else setLoadingMore(true);
    try {
      const offset = reset ? 0 : nextPage * PAGE_SIZE;
      const limit = reset && q === "" && routeFilter === "all" ? 1000 : PAGE_SIZE;
      // For "show all" we fetch large limit when reset and no filter
      const res = await fetchVisitsFromDB({ limit, offset, route: routeFilter, q: q.trim() });
      if (res?.rows) {
        if (reset) {
          setVisits(res.rows);
        } else {
          setVisits(prev => [...prev, ...res.rows]);
        }
        setDbMeta({ source: res.source, total: res.total });
        setPage(nextPage);
      } else {
        const local = getVisits();
        if (reset) setVisits(local);
        setDbMeta({ source: "local", total: local.length });
      }
    } catch {
      const local = getVisits();
      if (reset) setVisits(local);
      setDbMeta({ source: "local", total: local.length });
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [routeFilter, q]);

  const handleSearch = useCallback(() => {
    loadFromDB({ reset: true, nextPage: 0 });
  }, [loadFromDB]);

  const reloadLocal = useCallback(() => {
    loadFromDB({ reset: true, nextPage: 0 });
  }, [loadFromDB]);

  useEffect(() => {
    document.title = "Visitors — RealMeal";
    const fav = document.querySelector("link[rel='icon']");
    if (fav) fav.href = "/realmeal/logo.png";
  }, []);

  useEffect(() => {
    loadFromDB({ reset: true, nextPage: 0 });
  }, [loadFromDB]);

  // Realtime sync: poll DB every 8s instead of overwriting with localStorage (fixes glitch)
  useEffect(() => {
    const iv = setInterval(() => {
      // only auto-refresh if no active search and we are on first page
      if (q.trim() === "" && page === 0) {
        loadFromDB({ reset: true, nextPage: 0 });
      }
    }, 8000);
    const onUpd = () => {
      // when local logVisit happens, refresh from DB to include new row
      if (q.trim() === "" && routeFilter === "all") loadFromDB({ reset: true, nextPage: 0 });
    };
    window.addEventListener("rm:visitors-updated", onUpd);
    return () => {
      clearInterval(iv);
      window.removeEventListener("rm:visitors-updated", onUpd);
    };
  }, [loadFromDB, q, routeFilter, page]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return visits;
    return visits.filter(v => {
      if (routeFilter !== "all" && v.route !== routeFilter) return false;
      const hay = [v.route, v.href, v.pathname, v.hash, v.ip, v.city, v.region, v.country, v.countryCode, v.org, v.browser, v.os, v.device, v.referrer, v.language, v.email, v.name, v.phone, v.userAgent].join(" ").toLowerCase();
      return hay.includes(needle);
    });
  }, [visits, q, routeFilter]);

  // When filtering client-side after DB fetch with limit, we already filtered server-side, but keep client filter for instant feedback
  const displayRows = filtered;

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

  const hasMore = visits.length < (dbMeta.total || 0);
  const totalLabel = dbMeta.total ?? visits.length;

  const handleLoadMore = () => {
    if (loadingMore || !hasMore) return;
    loadFromDB({ reset: false, nextPage: page + 1 });
  };

  const handleShowAll = async () => {
    setLoading(true);
    try {
      const res = await fetchVisitsFromDB({ limit: Math.min(totalLabel, 5000), offset: 0, route: routeFilter, q: q.trim() });
      if (res?.rows) {
        setVisits(res.rows);
        setDbMeta({ source: res.source, total: res.total });
        setPage(0);
      }
    } finally { setLoading(false); }
  };

  const handleClear = async () => {
    if (!visits.length) return;
    if (!confirm(`Clear ${totalLabel} visitor record(s)? This will clear local + DB (if connected). Cannot be undone.`)) return;
    await clearVisitsFromDB();
    clearVisits();
    setVisits([]);
    setDbMeta({ source: dbMeta.source, total: 0 });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="sticky top-0 z-30 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur">
        <div className="mx-auto max-w-[1600px] px-4 py-4 sm:px-6 flex flex-wrap items-center gap-3 justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-white text-black text-[11px] font-bold">RM</span>
              Visitors
              <span className="ml-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-normal text-white/60">{totalLabel} records</span>
              <span className="ml-1 rounded-full bg-emerald-500/15 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-mono text-emerald-300">{dbMeta.source === "prisma" ? "prisma" : dbMeta.source === "supabase" ? "supabase" : "local"} {loading ? "· loading…" : ""}</span>
            </h1>
            <p className="text-xs text-white/50 mt-1 max-w-[90ch]">
              Full URLs, all users — <span className="text-white/80">/</span> · <span className="text-white/80">/#/realmeal</span> · <span className="text-white/80">/#/behealthy</span> · <span className="text-white/80">/#/visitors</span>. Table shows <span className="text-emerald-300">full href</span> (not just route) with copy. Prisma table <code className="font-mono text-white/60">visitors</code> on Supabase <code className="font-mono text-white/60">mlncmwgoljergzncycsa</code>.
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

      <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6">
        <div className="mb-6 rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-xs leading-relaxed text-amber-100/90">
          <span className="font-semibold text-amber-200">Fixed:</span> Table now loads <span className="font-mono bg-black/30 px-1 rounded">1000</span> rows initially, paginates with <span className="font-mono bg-black/30 px-1 rounded">Load more</span> / <span className="font-mono bg-black/30 px-1 rounded">Show all (up to 5000)</span>, shows <span className="font-mono bg-black/30 px-1 rounded">full href</span> with <span className="font-mono bg-black/30 px-1 rounded">break-all</span> (no truncation), and auto-refreshes from DB every 8s (previous interval overwrote DB with localStorage — fixed).
        </div>

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

        <div className="flex flex-wrap gap-2 mb-4 text-xs">
          <span className="text-white/40 py-1">Breakdown:</span>
          {Object.entries(stats.byRoute).length ? Object.entries(stats.byRoute).sort((a,b)=>b[1]-a[1]).map(([r,c]) => (
            <span key={r} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-white/70">{r} · {c}</span>
          )) : <span className="text-white/30">No data yet — visit /, /#/realmeal or /#/behealthy to generate a record.</span>}
        </div>

        <div className="flex flex-col lg:flex-row gap-3 mb-4">
          <div className="flex-1 flex gap-2">
            <input
              value={q}
              onChange={e=>setQ(e.target.value)}
              onKeyDown={e=> e.key==="Enter" && handleSearch()}
              placeholder="Search full URL, href, IP, city, country, org, browser, referrer, email…"
              className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/20"
            />
            <select value={routeFilter} onChange={e=>setRouteFilter(e.target.value)} className="rounded-full border border-white/10 bg-[#1a1a1a] px-3 py-2 text-sm text-white outline-none">
              <option value="all">All routes</option>
              <option value="/">/</option>
              <option value="/realmeal">/realmeal</option>
              <option value="/behealthy">/behealthy</option>
              <option value="/visitors">/visitors</option>
            </select>
            <button onClick={handleSearch} className="rounded-full bg-white/10 border border-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15">Search</button>
          </div>
          <div className="flex gap-2">
            <button onClick={()=>exportCSV(displayRows)} disabled={!displayRows.length} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 hover:bg-white/10 disabled:opacity-40">Export CSV ({displayRows.length})</button>
            <button onClick={handleClear} disabled={!totalLabel} className="rounded-full bg-red-500/90 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500 disabled:opacity-40">Clear</button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-3 text-xs text-white/40">
          <span>Showing <span className="text-white font-mono">{displayRows.length}</span> of <span className="text-white font-mono">{totalLabel}</span> {q ? "filtered" : "total"} — source: {dbMeta.source}</span>
          {hasMore && <button onClick={handleLoadMore} disabled={loadingMore} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white hover:bg-white/10 disabled:opacity-40">{loadingMore ? "Loading…" : `Load more +${Math.min(PAGE_SIZE, totalLabel - visits.length)}`}</button>}
          {hasMore && totalLabel <= 5000 && <button onClick={handleShowAll} disabled={loading} className="rounded-full bg-white text-black px-3 py-1 text-xs font-semibold hover:bg-white/90 disabled:opacity-40">Show all {totalLabel}</button>}
          <span className="hidden sm:inline text-white/20">· Full href column is break-all + copy + expandable row for userAgent</span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/[0.04] text-[11px] uppercase tracking-widest text-white/40 sticky top-0">
                <tr>
                  <th className="px-3 py-3 font-medium whitespace-nowrap">Time</th>
                  <th className="px-3 py-3 font-medium whitespace-nowrap">Route</th>
                  <th className="px-3 py-3 font-medium min-w-[340px]">Full URL (href)</th>
                  <th className="px-3 py-3 font-medium whitespace-nowrap">IP</th>
                  <th className="px-3 py-3 font-medium whitespace-nowrap">Location</th>
                  <th className="px-3 py-3 font-medium min-w-[180px]">ISP / Org</th>
                  <th className="px-3 py-3 font-medium whitespace-nowrap">Device</th>
                  <th className="px-3 py-3 font-medium whitespace-nowrap">Browser / OS</th>
                  <th className="px-3 py-3 font-medium whitespace-nowrap">Lang</th>
                  <th className="px-3 py-3 font-medium min-w-[180px]">Referrer</th>
                  <th className="px-3 py-3 font-medium whitespace-nowrap">Email / Name / Phone</th>
                  <th className="px-3 py-3 font-medium whitespace-nowrap">Screen</th>
                  <th className="px-3 py-3 font-medium whitespace-nowrap"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {displayRows.length === 0 ? (
                  <tr><td colSpan={13} className="px-4 py-12 text-center text-sm text-white/40">{loading ? "Loading…" : "No visitors yet on this filter."}<br/><span className="text-xs text-white/30">Open <a href="#/" className="underline decoration-white/20 underline-offset-4 hover:text-white/60">#/</a> · <a href="#/realmeal" className="underline decoration-white/20 underline-offset-4 hover:text-white/60">#/realmeal</a> · <a href="#/behealthy" className="underline decoration-white/20 underline-offset-4 hover:text-white/60">#/behealthy</a> in another tab to create a record, then refresh.</span></td></tr>
                ) : displayRows.map(v => (
                  <>
                    <tr key={v.id} className="hover:bg-white/[0.04] transition-colors group">
                      <td className="px-3 py-2.5 whitespace-nowrap text-xs text-white/70" title={v.timestamp}>{fmtTime(v.timestamp)}</td>
                      <td className="px-3 py-2.5 whitespace-nowrap"><span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-xs text-white/80">{v.route}</span><div className="text-[10px] font-mono text-white/30">{v.hash || ""}</div></td>
                      <td className="px-3 py-2.5 text-xs text-white/80 max-w-[520px]">
                        <div className="break-all leading-relaxed font-mono text-[11px] text-white/80" title={v.href}>
                          {v.href || <span className="text-white/25">—</span>}
                        </div>
                        {v.href && <div className="mt-1 flex gap-1"><CopyBtn text={v.href} /><a href={v.href} target="_blank" rel="noopener noreferrer" className="text-[10px] underline decoration-white/20 text-white/40 hover:text-white/70">open</a></div>}
                      </td>
                      <td className="px-3 py-2.5 whitespace-nowrap font-mono text-xs text-white/80">{v.ip || <span className="text-white/25">resolving…</span>} {v.ip && <CopyBtn text={v.ip} />}</td>
                      <td className="px-3 py-2.5 whitespace-nowrap text-xs text-white/70">
                        {[v.city, v.region].filter(Boolean).join(", ") || <span className="text-white/25">—</span>}
                        {v.country ? <span className="ml-1 text-white/50">{v.country}</span> : null}
                        {v.countryCode ? <span className="ml-1"><Flag code={v.countryCode} /></span> : null}
                        {v.latitude && v.longitude ? <a href={`https://www.google.com/maps?q=${v.latitude},${v.longitude}`} target="_blank" rel="noopener noreferrer" className="ml-1 underline decoration-white/20 text-white/40 hover:text-white/70">map</a> : null}
                      </td>
                      <td className="px-3 py-2.5 text-xs text-white/60 max-w-[200px] break-all" title={v.org || ""}>{v.org || <span className="text-white/25">—</span>}</td>
                      <td className="px-3 py-2.5 whitespace-nowrap text-xs text-white/70">{v.device}</td>
                      <td className="px-3 py-2.5 whitespace-nowrap text-xs text-white/60">{v.browser} · {v.os}<div className="text-[10px] text-white/30 truncate max-w-[120px]" title={v.userAgent}>{v.platform || ""}</div></td>
                      <td className="px-3 py-2.5 whitespace-nowrap text-xs font-mono text-white/60">{v.language || "—"}</td>
                      <td className="px-3 py-2.5 text-xs text-white/50 max-w-[220px] break-all" title={v.referrer}>{v.referrer ? <><a href={v.referrer} target="_blank" rel="noopener noreferrer" className="underline decoration-white/20 hover:text-white/70 break-all">{v.referrer}</a> <CopyBtn text={v.referrer} /></> : "—"}</td>
                      <td className="px-3 py-2.5 text-xs text-white/60 max-w-[200px] break-all">
                        {[v.name, v.email, v.phone].filter(Boolean).join(" · ") || <span className="text-white/25" title="Requires explicit form opt-in">—</span>}
                        {(v.email || v.phone) && <CopyBtn text={[v.email, v.phone].filter(Boolean).join(" ")} />}
                      </td>
                      <td className="px-3 py-2.5 whitespace-nowrap font-mono text-xs text-white/40">{v.viewport} <span className="text-white/20">/</span> {v.screen}</td>
                      <td className="px-3 py-2.5 whitespace-nowrap">
                        <button onClick={()=> setExpandedId(expandedId===v.id ? null : v.id)} className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-white/60 hover:bg-white/10 hover:text-white">{expandedId===v.id ? "Hide" : "Details"}</button>
                      </td>
                    </tr>
                    {expandedId===v.id && (
                      <tr key={`${v.id}-exp`} className="bg-white/[0.02]">
                        <td colSpan={13} className="px-4 py-3">
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 text-xs font-mono">
                            <div className="rounded-xl bg-black/30 border border-white/10 p-3 break-all">
                              <div className="text-white/40 uppercase tracking-widest text-[10px] mb-1">href + hash + pathname</div>
                              <div className="text-white/80 break-all">{v.href}</div>
                              <div className="text-white/40 mt-1">hash: {v.hash || "—"} · pathname: {v.pathname || "—"}</div>
                            </div>
                            <div className="rounded-xl bg-black/30 border border-white/10 p-3 break-all">
                              <div className="text-white/40 uppercase tracking-widest text-[10px] mb-1">userAgent + vendor</div>
                              <div className="text-white/60 break-all">{v.userAgent || "—"}</div>
                              <div className="text-white/30 mt-1">vendor: {v.vendor || "—"}</div>
                            </div>
                            <div className="rounded-xl bg-black/30 border border-white/10 p-3">
                              <div className="text-white/40 uppercase tracking-widest text-[10px] mb-1">geo + connection</div>
                              <div className="text-white/60">ip: {v.ip || "—"} · {v.city || ""} {v.region || ""} {v.country || ""} ({v.countryCode || "—"})</div>
                              <div className="text-white/60">org: {v.org || "—"} · asn: {v.asn || "—"}</div>
                              <div className="text-white/60">lat/lon: {v.latitude ?? "—"}, {v.longitude ?? "—"}</div>
                              <div className="text-white/60">connection: {v.connection ? JSON.stringify(v.connection) : "—"}</div>
                              <div className="text-white/60">tz: {v.timezone || "—"} ({v.timezoneOffset ?? "—"}) · lang: {v.language} [{v.languages || ""}]</div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
          {displayRows.length > 0 && (
            <div className="border-t border-white/10 bg-black/20 px-4 py-2 text-[11px] text-white/30 flex flex-wrap gap-2 justify-between">
              <span>Showing {displayRows.length} of {totalLabel} — source: {dbMeta.source} · href & userAgent fully visible (break-all + Details). Export gets everything.</span>
              {hasMore && <button onClick={handleLoadMore} className="underline decoration-white/20 hover:text-white">Load more</button>}
            </div>
          )}
        </div>

        <p className="mt-4 text-xs leading-relaxed text-white/30">
          Full href is now a dedicated column with <code className="font-mono text-white/50">break-all</code> + copy + expandable details. Previous glitch: table overwrote DB rows with <code className="font-mono text-white/50">localStorage</code> every 4s and truncated URLs via <code className="font-mono text-white/50">max-w + truncate + whitespace-nowrap</code> + limit 500 — fixed to paginated DB fetch (1000 initial, Show all up to 5000).
        </p>
      </div>
    </div>
  );
}
