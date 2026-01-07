const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3333";

export async function apiRequest(path, { method = "GET", token, body } = {}) {
  const headers = {};

  if (body) headers["Content-Type"] = "application/json";
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  // tenta ler json
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { message: text };
  }

  if (!res.ok) {
    const msg = data?.message || `Erro HTTP ${res.status}`;
    throw new Error(msg);
  }

  return data;
}
