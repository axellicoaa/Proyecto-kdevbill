import Cookies from "js-cookie";

const API = "http://localhost:8080/kdevbill";

export async function fetchWithAuth(url: string, options: any = {}) {
  const token = Cookies.get("token");

  const res = await fetch(`${API}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    // ⬅️ Si backend envía message, úsalo
    const errorMsg = data?.message || "Error inesperado del servidor";
    throw new Error(errorMsg);
  }

  return data;
}


export async function postWithAuth(path: string, body: any) {
  const token = Cookies.get("token");
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return res.json();
}
