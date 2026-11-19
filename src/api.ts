const API_BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
const TOKEN_KEY = "kora_session_token";

export type CurrentUser = {
  id: number;
  display_name: string;
  email: string;
  role: "ceo" | "admin" | "collaborator" | "client";
  is_active: boolean;
  created_at: string;
};

export type KoraRecord = {
  id: number;
  kind: string;
  name: string;
  description: string | null;
  status: string;
  email: string | null;
  phone: string | null;
  country: string | null;
  currency: string | null;
  amount: number | string | null;
  start_date: string | null;
  due_date: string | null;
  extra_data: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

export type RecordPayload = {
  name: string;
  description?: string | null;
  status: string;
  email?: string | null;
  phone?: string | null;
  country?: string | null;
  currency?: string | null;
  amount?: number | null;
  start_date?: string | null;
  due_date?: string | null;
};

export type DashboardSummary = {
  counts: Record<string, number>;
  leads_by_status: Record<string, number>;
  recent: Array<{ id: number; kind: string; name: string; status: string; updated_at: string }>;
  analytics_connected: boolean;
  note: string;
};

export type TeamUser = CurrentUser;

export function getToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  sessionStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  sessionStorage.removeItem(TOKEN_KEY);
}

export async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  if (init.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  const token = getToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  let response: Response;
  try {
    response = await fetch(`${API_BASE}${path}`, { ...init, headers });
  } catch {
    throw new Error("Não foi possível contactar a API. Confirma se o backend está iniciado e se VITE_API_BASE_URL está configurado.");
  }

  if (response.status === 401) clearToken();
  if (response.status === 204) return undefined as T;

  const data: unknown = await response.json().catch(() => ({}));
  if (!response.ok) {
    const detail = typeof data === "object" && data !== null && "detail" in data
      ? String((data as { detail: unknown }).detail)
      : `Erro HTTP ${response.status}`;
    throw new Error(detail);
  }
  return data as T;
}

export type AuditEntry = {
  id: number;
  user_id: number | null;
  user_name: string;
  action: string;
  entity: string;
  entity_id: number | null;
  details: Record<string, unknown>;
  created_at: string;
};
