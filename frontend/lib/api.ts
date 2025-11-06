import Cookies from "js-cookie";

const API = "http://localhost:8080/kdevbill";

export async function fetchWithAuth(path: string, options: RequestInit = {}) {
  const token = Cookies.get("token");

  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  if (!res.ok) throw new Error("Error en la petición");
  return res.json();
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
