const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
const API_URL = API_BASE_URL.replace(/\/$/, "");

function resolveMediaUrl(url) {
  if (!url) return null;
  const raw = String(url).trim();
  if (!raw) return null;
  if (/^https?:\/\//i.test(raw)) return raw;
  if (raw.startsWith("/")) return `${API_URL}${raw}`;
  return `${API_URL}/${raw}`;
}

export default resolveMediaUrl;