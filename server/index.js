import "dotenv/config";
import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();
const PORT = process.env.PORT || 3001;

const supabaseUrl = process.env.SUPABASE_URL || "https://mlncmwgoljergzncycsa.supabase.co";
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
if (!supabaseUrl || !serviceKey) {
  console.warn("[visitors api] Missing SUPABASE_URL / SERVICE_ROLE_KEY — set in .env");
}
const supabase = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

app.use(cors());
app.use(express.json({ limit: "100kb" }));

app.get("/api/health", (_req, res) => res.json({ ok: true, ts: new Date().toISOString(), db: "supabase", table: "visitors" }));

// Helper: Map camelCase body -> snake_case for Supabase
function toDbRow(b) {
  return {
    visitor_id: b.visitorId || null,
    session_id: b.sessionId || null,
    timestamp: b.timestamp ? new Date(b.timestamp).toISOString() : new Date().toISOString(),
    timestamp_ms: b.timestampMs ? String(b.timestampMs) : String(Date.now()),
    route: String(b.route || "/").slice(0, 200),
    hash: b.hash ? String(b.hash).slice(0, 500) : null,
    href: b.href ? String(b.href).slice(0, 2000) : null,
    pathname: b.pathname ? String(b.pathname).slice(0, 500) : null,
    referrer: b.referrer ? String(b.referrer).slice(0, 2000) : null,
    email: b.email ? String(b.email).slice(0, 320) : null,
    name: b.name ? String(b.name).slice(0, 200) : null,
    phone: b.phone ? String(b.phone).slice(0, 50) : null,
    language: b.language ? String(b.language).slice(0, 20) : null,
    languages: b.languages ? String(b.languages).slice(0, 200) : null,
    timezone: b.timezone ? String(b.timezone).slice(0, 100) : null,
    timezone_offset: typeof b.timezoneOffset === "number" ? b.timezoneOffset : null,
    device: b.device ? String(b.device).slice(0, 50) : null,
    browser: b.browser ? String(b.browser).slice(0, 50) : null,
    os: b.os ? String(b.os).slice(0, 50) : null,
    platform: b.platform ? String(b.platform).slice(0, 100) : null,
    vendor: b.vendor ? String(b.vendor).slice(0, 100) : null,
    user_agent: b.userAgent ? String(b.userAgent).slice(0, 1000) : null,
    screen: b.screen ? String(b.screen).slice(0, 50) : null,
    viewport: b.viewport ? String(b.viewport).slice(0, 50) : null,
    pixel_ratio: typeof b.pixelRatio === "number" ? b.pixelRatio : null,
    touch: typeof b.touch === "boolean" ? b.touch : null,
    cores: typeof b.cores === "number" ? b.cores : null,
    memory: typeof b.memory === "number" ? b.memory : null,
    cookie_enabled: typeof b.cookieEnabled === "boolean" ? b.cookieEnabled : null,
    online: typeof b.online === "boolean" ? b.online : null,
    do_not_track: b.doNotTrack ? String(b.doNotTrack).slice(0, 20) : null,
    connection: b.connection && typeof b.connection === "object" ? b.connection : null,
    ip: b.ip ? String(b.ip).slice(0, 45) : null,
    city: b.city ? String(b.city).slice(0, 100) : null,
    region: b.region ? String(b.region).slice(0, 100) : null,
    region_code: b.regionCode ? String(b.regionCode).slice(0, 20) : null,
    country: b.country ? String(b.country).slice(0, 100) : null,
    country_code: b.countryCode ? String(b.countryCode).slice(0, 10) : null,
    postal: b.postal ? String(b.postal).slice(0, 20) : null,
    org: b.org ? String(b.org).slice(0, 200) : null,
    asn: b.asn ? String(b.asn).slice(0, 50) : null,
    latitude: typeof b.latitude === "number" ? b.latitude : null,
    longitude: typeof b.longitude === "number" ? b.longitude : null,
    currency: b.currency ? String(b.currency).slice(0, 10) : null,
  };
}

function fromDbRow(r) {
  if (!r) return r;
  return {
    id: r.id,
    visitorId: r.visitor_id,
    sessionId: r.session_id,
    timestamp: r.timestamp,
    timestampMs: r.timestamp_ms ? String(r.timestamp_ms) : null,
    route: r.route,
    hash: r.hash,
    href: r.href,
    pathname: r.pathname,
    referrer: r.referrer,
    email: r.email,
    name: r.name,
    phone: r.phone,
    language: r.language,
    languages: r.languages,
    timezone: r.timezone,
    timezoneOffset: r.timezone_offset,
    device: r.device,
    browser: r.browser,
    os: r.os,
    platform: r.platform,
    vendor: r.vendor,
    userAgent: r.user_agent,
    screen: r.screen,
    viewport: r.viewport,
    pixelRatio: r.pixel_ratio,
    touch: r.touch,
    cores: r.cores,
    memory: r.memory,
    cookieEnabled: r.cookie_enabled,
    online: r.online,
    doNotTrack: r.do_not_track,
    connection: r.connection,
    ip: r.ip,
    city: r.city,
    region: r.region,
    regionCode: r.region_code,
    country: r.country,
    countryCode: r.country_code,
    postal: r.postal,
    org: r.org,
    asn: r.asn,
    latitude: r.latitude,
    longitude: r.longitude,
    currency: r.currency,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

// POST /api/visitors — create
app.post("/api/visitors", async (req, res) => {
  try {
    const b = req.body || {};
    if (!b.route && !b.href) return res.status(400).json({ error: "route or href required" });
    const row = toDbRow(b);
    // let DB generate id/updated_at if missing
    delete row.id;
    const { data, error } = await supabase.from("visitors").insert([row]).select().single();
    if (error) throw error;
    res.status(201).json(fromDbRow(data));
  } catch (e) {
    console.error("[POST /api/visitors]", e);
    res.status(500).json({ error: "failed to create visitor", details: String(e.message || e).slice(0, 500) });
  }
});

// PATCH /api/visitors/:id
app.patch("/api/visitors/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const b = req.body || {};
    const allowed = ["ip","city","region","regionCode","country","countryCode","postal","org","asn","latitude","longitude","timezone","currency"];
    const map = { regionCode:"region_code", countryCode:"country_code" };
    const patch = {};
    for (const k of allowed) if (b[k] !== undefined) patch[map[k] || k] = b[k];
    if (!Object.keys(patch).length) return res.status(400).json({ error: "no patchable fields" });
    const { data, error } = await supabase.from("visitors").update(patch).eq("id", id).select().single();
    if (error) throw error;
    res.json(fromDbRow(data));
  } catch (e) {
    console.error("[PATCH /api/visitors/:id]", e);
    res.status(500).json({ error: "failed to update", details: String(e.message || e).slice(0, 500) });
  }
});

// PATCH /api/visitors (body with id) — alternative for frontend
app.patch("/api/visitors", async (req, res) => {
  try {
    const b = req.body || {};
    const id = b.id;
    if (!id) return res.status(400).json({ error: "id required" });
    const allowed = ["ip","city","region","regionCode","country","countryCode","postal","org","asn","latitude","longitude","timezone","currency"];
    const map = { regionCode:"region_code", countryCode:"country_code" };
    const patch = {};
    for (const k of allowed) if (b[k] !== undefined) patch[map[k] || k] = b[k];
    if (!Object.keys(patch).length) return res.status(400).json({ error: "no patchable fields" });
    const { data, error } = await supabase.from("visitors").update(patch).eq("id", id).select().single();
    if (error) throw error;
    res.json(fromDbRow(data));
  } catch (e) {
    console.error("[PATCH /api/visitors]", e);
    res.status(500).json({ error: "failed to update", details: String(e.message || e).slice(0, 500) });
  }
});

// GET /api/visitors
app.get("/api/visitors", async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit || "100", 10) || 100, 500);
    const offset = parseInt(req.query.offset || "0", 10) || 0;
    const route = req.query.route ? String(req.query.route) : null;
    const q = req.query.q ? String(req.query.q).trim() : null;

    let query = supabase.from("visitors").select("*", { count: "exact" }).order("timestamp", { ascending: false }).range(offset, offset + limit - 1);
    if (route && route !== "all") query = query.eq("route", route);
    if (q) query = query.or(`ip.ilike.%${q}%,city.ilike.%${q}%,country.ilike.%${q}%,org.ilike.%${q}%,email.ilike.%${q}%,route.ilike.%${q}%`);

    const { data, error, count } = await query;
    if (error) throw error;
    res.json({ rows: (data || []).map(fromDbRow), total: count ?? data.length, limit, offset });
  } catch (e) {
    console.error("[GET /api/visitors]", e);
    res.status(500).json({ error: "failed to list", details: String(e.message || e).slice(0, 500) });
  }
});

app.delete("/api/visitors", async (req, res) => {
  try {
    const token = process.env.ADMIN_TOKEN;
    if (token && req.headers["x-admin-token"] !== token) return res.status(403).json({ error: "forbidden — missing x-admin-token" });
    const { error, count } = await supabase.from("visitors").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    if (error) throw error;
    res.json({ deleted: count ?? 0 });
  } catch (e) {
    console.error("[DELETE /api/visitors]", e);
    res.status(500).json({ error: "failed to delete" });
  }
});

app.listen(PORT, () => {
  console.log(`[visitors api] listening on http://localhost:${PORT}`);
  console.log(`[visitors api] health: http://localhost:${PORT}/api/health`);
  console.log(`[visitors api] supabase: ${supabaseUrl} -> visitors table (Prisma schema)`);
});
