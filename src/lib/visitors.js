/**
 * Visitor logging — hybrid: localStorage (instant) + Supabase/Prisma backend (shared)
 *
 * What we CAN collect without permission (best-effort):
 * - timestamp, route/hash, href, referrer
 * - userAgent, platform, vendor, language, timezone
 * - screen / viewport size, device memory, hardware concurrency, touch support
 * - connection info (if available)
 * - IP + geo (city/region/country/org/lat-lon) via public IP APIs (best-effort, needs network)
 *
 * What we CANNOT collect without explicit user input / consent:
 * - email, name — never available via JS. Requires a form/opt-in.
 *   Columns exist but stay "-" until user submits a form.
 *
 * Storage:
 * - localStorage key `rm_visitors_v1` (instant, per-browser)
 * - Supabase table `visitors` via Prisma or direct supabase-js (shared, cross-device)
 */

const STORAGE_KEY = "rm_visitors_v1";
const LEGACY_KEYS = ["visitors_log", "rm_visitors"];
const IP_CACHE_KEY = "rm_ip_cache_v1";
const IP_CACHE_TTL = 1000 * 60 * 60 * 6; // 6h

// Backend endpoints:
// - Primary: VITE_VISITOR_ENDPOINT (e.g. /api/visitors -> Prisma Express server)
// - Fallback: direct Supabase insert via supabase-js (requires VITE_SUPABASE_URL + ANON_KEY)
// For GitHub Pages (static, no server) set VITE_VISITOR_ENDPOINT="" to skip API and use direct Supabase
const _envEndpoint = import.meta.env?.VITE_VISITOR_ENDPOINT;
const VISITOR_ENDPOINT = _envEndpoint !== undefined ? _envEndpoint : "/api/visitors";

// ---------------------------------------------------------------------------

function safeGetLocalStorage(key) {
  try { return localStorage.getItem(key); } catch { return null; }
}
function safeSetLocalStorage(key, val) {
  try { localStorage.setItem(key, val); } catch { /* quota / private mode */ }
}

function genId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function getHashRoute() {
  const hash = window.location.hash || "#/";
  const m = hash.match(/^#(\/[^?]*)/);
  if (m) return m[1] || "/";
  return window.location.pathname || "/";
}

function canonicalRoute(path) {
  if (!path) return "/";
  const p = path.split("?")[0].split("#")[0];
  if (p === "" || p === "/") return "/";
  return p.replace(/\/$/, "") || "/";
}

export function getCurrentRoute() {
  if (window.location.hash && window.location.hash.startsWith("#/")) {
    return canonicalRoute(getHashRoute());
  }
  return canonicalRoute(window.location.pathname);
}

function getDeviceInfo() {
  const ua = navigator.userAgent || "";
  const platform = navigator.platform || "";
  const vendor = navigator.vendor || "";
  let device = "Desktop";
  if (/Mobi|Android|iPhone|iPad|iPod/i.test(ua)) device = "Mobile";
  else if (/Tablet|iPad/i.test(ua)) device = "Tablet";
  let browser = "Unknown";
  if (ua.includes("Edg/")) browser = "Edge";
  else if (ua.includes("Chrome/") && !ua.includes("Chromium")) browser = "Chrome";
  else if (ua.includes("Safari/") && !ua.includes("Chrome")) browser = "Safari";
  else if (ua.includes("Firefox/")) browser = "Firefox";
  else if (ua.includes("OPR/") || ua.includes("Opera")) browser = "Opera";
  let os = "Unknown";
  if (/Windows/i.test(ua)) os = "Windows";
  else if (/Mac OS|Macintosh/i.test(ua)) os = "macOS";
  else if (/Android/i.test(ua)) os = "Android";
  else if (/iPhone|iPad|iPod/i.test(ua)) os = "iOS";
  else if (/Linux/i.test(ua)) os = "Linux";
  return { device, browser, os, platform, vendor, ua };
}

function getScreenInfo() {
  return {
    screen: `${window.screen?.width || 0}x${window.screen?.height || 0}`,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    pixelRatio: window.devicePixelRatio || 1,
    touch: "ontouchstart" in window || navigator.maxTouchPoints > 0,
    cores: navigator.hardwareConcurrency || null,
    memory: navigator.deviceMemory || null,
    cookieEnabled: navigator.cookieEnabled,
    online: navigator.onLine,
    doNotTrack: navigator.doNotTrack || window.doNotTrack || null,
  };
}

function getConnectionInfo() {
  const c = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (!c) return null;
  return {
    effectiveType: c.effectiveType || null,
    downlink: c.downlink || null,
    rtt: c.rtt || null,
    saveData: c.saveData || false,
  };
}

// ---- IP / Geo — best-effort via public APIs ----

function getCachedIP() {
  try {
    const raw = safeGetLocalStorage(IP_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.ts || Date.now() - parsed.ts > IP_CACHE_TTL) return null;
    return parsed.data;
  } catch { return null; }
}
function setCachedIP(data) {
  safeSetLocalStorage(IP_CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
}

async function fetchWithTimeout(url, ms = 4000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, { signal: ctrl.signal, cache: "no-store" });
    clearTimeout(t);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (e) {
    clearTimeout(t);
    throw e;
  }
}

export async function fetchIPInfo() {
  const cached = getCachedIP();
  if (cached) return cached;
  try {
    const d = await fetchWithTimeout("https://ipapi.co/json/", 3500);
    if (d && d.ip && !d.error) {
      const out = {
        ip: d.ip || null,
        city: d.city || null,
        region: d.region || null,
        regionCode: d.region_code || null,
        country: d.country_name || d.country || null,
        countryCode: d.country_code || null,
        postal: d.postal || null,
        org: d.org || null,
        asn: d.asn || null,
        latitude: d.latitude ?? null,
        longitude: d.longitude ?? null,
        timezone: d.timezone || null,
        currency: d.currency || null,
      };
      setCachedIP(out);
      return out;
    }
  } catch { /* fallthrough */ }
  try {
    const d = await fetchWithTimeout("https://ipwho.is/", 3500);
    if (d && d.success !== false && d.ip) {
      const out = {
        ip: d.ip || null,
        city: d.city || null,
        region: d.region || null,
        regionCode: d.region_code || null,
        country: d.country || null,
        countryCode: d.country_code || null,
        postal: d.postal || null,
        org: d.connection?.org || d.connection?.isp || d.org || null,
        asn: d.connection?.asn || null,
        latitude: d.latitude ?? null,
        longitude: d.longitude ?? null,
        timezone: d.timezone?.id || null,
        currency: null,
      };
      setCachedIP(out);
      return out;
    }
  } catch { /* fallthrough */ }
  try {
    const d = await fetchWithTimeout("https://api.ipify.org?format=json", 3000);
    if (d?.ip) {
      const out = { ip: d.ip, city: null, region: null, country: null, countryCode: null, org: null, latitude: null, longitude: null };
      setCachedIP(out);
      return out;
    }
  } catch { /* ignore */ }
  return { ip: null, city: null, region: null, country: null, countryCode: null, org: null, latitude: null, longitude: null };
}

// ---- Storage helpers (local) ----

export function getVisits() {
  try {
    for (const key of [STORAGE_KEY, ...LEGACY_KEYS]) {
      const raw = safeGetLocalStorage(key);
      if (!raw) continue;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        if (key !== STORAGE_KEY && parsed.length) safeSetLocalStorage(STORAGE_KEY, JSON.stringify(parsed));
        return parsed;
      }
    }
  } catch { /* corrupt */ }
  return [];
}

export function saveVisits(list) {
  safeSetLocalStorage(STORAGE_KEY, JSON.stringify(list));
  try { window.dispatchEvent(new CustomEvent("rm:visitors-updated")); } catch { /* */ }
}

export function clearVisits() {
  safeSetLocalStorage(STORAGE_KEY, JSON.stringify([]));
  try { window.dispatchEvent(new CustomEvent("rm:visitors-updated")); } catch { /* */ }
}

export function exportCSV(visits) {
  const cols = ["timestamp","route","hash","href","referrer","ip","city","region","country","countryCode","org","latitude","longitude","device","browser","os","language","timezone","screen","viewport","userAgent"];
  const esc = (v) => {
    if (v == null) return "";
    const s = String(v).replace(/"/g, '""');
    return /[",\n]/.test(s) ? `"${s}"` : s;
  };
  const rows = [cols.join(",")].concat(
    visits.map(v => cols.map(c => esc(v[c])).join(","))
  );
  const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `visitors-${new Date().toISOString().slice(0,10)}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// ---- Enrich email/name if user ever submits a form ----

export function attachVisitorIdentity({ email, name, phone } = {}) {
  try {
    if (email || name || phone) {
      localStorage.setItem("rm_visitor_identity", JSON.stringify({ email: email || null, name: name || null, phone: phone || null, ts: new Date().toISOString() }));
    }
  } catch { /* */ }
}
function getStoredIdentity() {
  try {
    const raw = safeGetLocalStorage("rm_visitor_identity");
    if (!raw) return { email: null, name: null, phone: null };
    const p = JSON.parse(raw);
    return { email: p.email || null, name: p.name || null, phone: p.phone || null };
  } catch { return { email: null, name: null, phone: null }; }
}

// ---- Supabase direct helpers (fallback if no Prisma API) ----

async function supabaseInsert(payload) {
  try {
    const { supabase } = await import("./supabase.js");
    const { data, error } = await supabase.from("visitors").insert([{
      visitor_id: payload.visitorId,
      session_id: payload.sessionId,
      timestamp: payload.timestamp,
      timestamp_ms: payload.timestampMs,
      route: payload.route,
      hash: payload.hash,
      href: payload.href,
      pathname: payload.pathname,
      referrer: payload.referrer,
      email: payload.email,
      name: payload.name,
      phone: payload.phone,
      language: payload.language,
      languages: payload.languages,
      timezone: payload.timezone,
      timezone_offset: payload.timezoneOffset,
      device: payload.device,
      browser: payload.browser,
      os: payload.os,
      platform: payload.platform,
      vendor: payload.vendor,
      user_agent: payload.userAgent,
      screen: payload.screen,
      viewport: payload.viewport,
      pixel_ratio: payload.pixelRatio,
      touch: payload.touch,
      cores: payload.cores,
      memory: payload.memory,
      cookie_enabled: payload.cookieEnabled,
      online: payload.online,
      do_not_track: payload.doNotTrack,
      connection: payload.connection,
      ip: payload.ip,
      city: payload.city,
      region: payload.region,
      region_code: payload.regionCode,
      country: payload.country,
      country_code: payload.countryCode,
      postal: payload.postal,
      org: payload.org,
      asn: payload.asn,
      latitude: payload.latitude,
      longitude: payload.longitude,
      currency: payload.currency,
    }]).select().single();
    if (error) throw error;
    return data;
  } catch (e) {
    console.warn("[visitors] supabaseInsert failed", e?.message || e);
    return null;
  }
}

async function supabasePatch(id, geo) {
  try {
    const { supabase } = await import("./supabase.js");
    const patch = {};
    if (geo.ip) patch.ip = geo.ip;
    if (geo.city) patch.city = geo.city;
    if (geo.region) patch.region = geo.region;
    if (geo.regionCode) patch.region_code = geo.regionCode;
    if (geo.country) patch.country = geo.country;
    if (geo.countryCode) patch.country_code = geo.countryCode;
    if (geo.postal) patch.postal = geo.postal;
    if (geo.org) patch.org = geo.org;
    if (geo.asn) patch.asn = geo.asn;
    if (geo.latitude != null) patch.latitude = geo.latitude;
    if (geo.longitude != null) patch.longitude = geo.longitude;
    if (geo.timezone) patch.timezone = geo.timezone;
    if (geo.currency) patch.currency = geo.currency;
    const { error } = await supabase.from("visitors").update(patch).eq("id", id);
    if (error) throw error;
  } catch (e) {
    console.warn("[visitors] supabasePatch failed", e?.message || e);
  }
}

export async function fetchVisitsFromDB({ limit = 200, offset = 0, route = null, q = "" } = {}) {
  // Try Prisma API first
  if (VISITOR_ENDPOINT) {
    try {
      const params = new URLSearchParams({ limit: String(limit), offset: String(offset) });
      if (route && route !== "all") params.set("route", route);
      if (q) params.set("q", q);
      const url = `${VISITOR_ENDPOINT}?${params.toString()}`;
      const res = await fetch(url, { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        // normalize Prisma -> local shape
        const rows = (json.rows || json || []).map(normalizeDbRow);
        return { rows, total: json.total ?? rows.length, source: "prisma" };
      }
    } catch (e) {
      console.warn("[visitors] fetchViaPrisma failed, trying supabase direct", e?.message || e);
    }
  }
  // Fallback: direct Supabase
  try {
    const { supabase } = await import("./supabase.js");
    let query = supabase.from("visitors").select("*", { count: "exact" }).order("timestamp", { ascending: false }).range(offset, offset + limit - 1);
    if (route && route !== "all") query = query.eq("route", route);
    if (q) query = query.or(`ip.ilike.%${q}%,city.ilike.%${q}%,country.ilike.%${q}%,org.ilike.%${q}%,email.ilike.%${q}%,route.ilike.%${q}%`);
    const { data, error, count } = await query;
    if (error) throw error;
    return { rows: (data || []).map(normalizeDbRow), total: count ?? data.length, source: "supabase" };
  } catch (e) {
    console.warn("[visitors] fetchViaSupabase failed, falling back to localStorage", e?.message || e);
    return { rows: getVisits(), total: getVisits().length, source: "local" };
  }
}

function normalizeDbRow(r) {
  // Prisma returns camelCase, Supabase returns snake_case — normalize to local shape
  return {
    id: r.id,
    visitorId: r.visitorId ?? r.visitor_id,
    sessionId: r.sessionId ?? r.session_id,
    timestamp: r.timestamp ? new Date(r.timestamp).toISOString() : r.timestamp,
    timestampMs: r.timestampMs ?? r.timestamp_ms ? String(r.timestampMs ?? r.timestamp_ms) : null,
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
    timezoneOffset: r.timezoneOffset ?? r.timezone_offset,
    device: r.device,
    browser: r.browser,
    os: r.os,
    platform: r.platform,
    vendor: r.vendor,
    userAgent: r.userAgent ?? r.user_agent,
    screen: r.screen,
    viewport: r.viewport,
    pixelRatio: r.pixelRatio ?? r.pixel_ratio,
    touch: r.touch,
    cores: r.cores,
    memory: r.memory,
    cookieEnabled: r.cookieEnabled ?? r.cookie_enabled,
    online: r.online,
    doNotTrack: r.doNotTrack ?? r.do_not_track,
    connection: r.connection,
    ip: r.ip,
    city: r.city,
    region: r.region,
    regionCode: r.regionCode ?? r.region_code,
    country: r.country,
    countryCode: r.countryCode ?? r.country_code,
    postal: r.postal,
    org: r.org,
    asn: r.asn,
    latitude: r.latitude,
    longitude: r.longitude,
    currency: r.currency,
    createdAt: r.createdAt ?? r.created_at,
  };
}

export async function clearVisitsFromDB() {
  // clear local
  clearVisits();
  // try Prisma API
  if (VISITOR_ENDPOINT) {
    try {
      const res = await fetch(VISITOR_ENDPOINT, { method: "DELETE" });
      if (res.ok) return true;
    } catch { /* */ }
  }
  try {
    const { supabase } = await import("./supabase.js");
    const { error } = await supabase.from("visitors").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    if (error) throw error;
    return true;
  } catch (e) {
    console.warn("[visitors] clear DB failed", e?.message || e);
    return false;
  }
}

// ---- Main logger ----

let _lastLogKey = null;
let _lastLogAt = 0;

export async function logVisit(opts = {}) {
  const now = new Date();
  const route = opts.route || getCurrentRoute();
  const dedupKey = `${route}|${window.location.hash}|${window.location.href}`;
  if (_lastLogKey === dedupKey && Date.now() - _lastLogAt < 1500) return null;
  _lastLogKey = dedupKey;
  _lastLogAt = Date.now();

  const deviceInfo = getDeviceInfo();
  const screenInfo = getScreenInfo();
  const connection = getConnectionInfo();
  const identity = getStoredIdentity();

  let visitorId = safeGetLocalStorage("rm_visitor_id");
  if (!visitorId) {
    visitorId = genId();
    safeSetLocalStorage("rm_visitor_id", visitorId);
  }
  let sessionId = null;
  try { sessionId = sessionStorage.getItem("rm_session_id"); } catch { /* */ }
  if (!sessionId) {
    sessionId = genId();
    try { sessionStorage.setItem("rm_session_id", sessionId); } catch { /* */ }
  }

  const base = {
    id: genId(),
    visitorId,
    sessionId,
    timestamp: now.toISOString(),
    timestampMs: now.getTime(),
    route,
    hash: window.location.hash || "",
    href: window.location.href,
    pathname: window.location.pathname,
    referrer: document.referrer || "",
    language: navigator.language || "",
    languages: (navigator.languages || []).join(","),
    timezone: (() => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone; } catch { return ""; } })(),
    timezoneOffset: new Date().getTimezoneOffset(),
    email: identity.email || opts.email || null,
    name: identity.name || opts.name || null,
    phone: identity.phone || opts.phone || null,
    device: deviceInfo.device,
    browser: deviceInfo.browser,
    os: deviceInfo.os,
    platform: deviceInfo.platform,
    vendor: deviceInfo.vendor,
    userAgent: deviceInfo.ua,
    ...screenInfo,
    connection,
    ip: null,
    city: null,
    region: null,
    regionCode: null,
    country: null,
    countryCode: null,
    postal: null,
    org: null,
    asn: null,
    latitude: null,
    longitude: null,
  };

  // 1) Instant local save
  const visits = getVisits();
  visits.unshift(base);
  if (visits.length > 1000) visits.length = 1000;
  saveVisits(visits);

  // 2) Shared persistence: try Prisma API first, then Supabase direct
  let dbId = null;

  const tryPrismaPost = async () => {
    if (!VISITOR_ENDPOINT) return null;
    try {
      const res = await fetch(VISITOR_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(base),
        keepalive: true,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      return json.id || json.rows?.id || null;
    } catch (e) {
      console.warn("[visitors] Prisma POST failed, trying Supabase direct", e?.message || e);
      return null;
    }
  };

  dbId = await tryPrismaPost();
  if (!dbId) {
    const row = await supabaseInsert(base);
    if (row?.id) dbId = row.id;
  }

  // 3) Enrich with IP/geo async -> update both local + db
  fetchIPInfo().then(async (geo) => {
    const list = getVisits();
    const idx = list.findIndex(v => v.id === base.id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...geo };
      saveVisits(list);
    }
    if (dbId) {
      // Prefer Prisma PATCH, fallback Supabase
      if (VISITOR_ENDPOINT) {
        try {
          // Prisma server supports PATCH /api/visitors/:id  OR PATCH with body.id
          const patchUrl = VISITOR_ENDPOINT.endsWith("/") ? `${VISITOR_ENDPOINT}${dbId}` : `${VISITOR_ENDPOINT}/${dbId}`;
          let res = await fetch(patchUrl, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(geo),
          });
          if (!res.ok) {
            // fallback to body-id style
            res = await fetch(VISITOR_ENDPOINT, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: dbId, ...geo }),
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
          }
        } catch {
          await supabasePatch(dbId, geo);
        }
      } else {
        await supabasePatch(dbId, geo);
      }
    } else if (VISITOR_ENDPOINT) {
      // No dbId yet (offline-first) — try to PATCH by original base.id for local-only backends
      try {
        await fetch(VISITOR_ENDPOINT, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: base.id, ...geo }),
          keepalive: true,
        });
      } catch { /* ignore */ }
    }
  }).catch(() => {});

  return base;
}
