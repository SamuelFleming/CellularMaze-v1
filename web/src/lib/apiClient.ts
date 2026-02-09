const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!baseUrl) {
  // Fail fast during dev
  // eslint-disable-next-line no-console
  console.warn("NEXT_PUBLIC_API_BASE_URL is not set");
}

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {})
    }
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText}: ${text}`);
  }

  return res.json() as Promise<T>;
}

export type ApiUser =
  | { id: "guest"; role: "guest"; displayName: string }
  | { id: string; role: "user"; email: string };

export type AuthResponse = {
  token: string;
  user: ApiUser;
};

export const api = {
  health: () => http<{ ok: boolean }>("/health"),
  guest: () => http<AuthResponse>("/auth/guest", { method: "POST" }),
  login: (email: string, password: string) =>
    http<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    }),
  register: (email: string, password: string) =>
    http<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password })
    })
};
