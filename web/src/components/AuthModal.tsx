"use client";

import { useState } from "react";
import { api } from "@/lib/apiClient";
import { useAuth } from "@/state/AuthContext";

export function AuthModal({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { setSession } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  async function submit() {
    setBusy(true);
    setError(null);
    try {
      const res =
        mode === "login"
          ? await api.login(email, password)
          : await api.register(email, password);

      setSession(res.token, res.user);
      onClose();
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.35)",
        display: "grid",
        placeItems: "center"
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 360,
          background: "white",
          borderRadius: 12,
          padding: 16,
          border: "1px solid #ddd"
        }}
      >
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <button
            disabled={busy}
            onClick={() => setMode("login")}
            style={{ fontWeight: mode === "login" ? 700 : 400 }}
          >
            Sign In
          </button>
          <button
            disabled={busy}
            onClick={() => setMode("register")}
            style={{ fontWeight: mode === "register" ? 700 : 400 }}
          >
            Sign Up
          </button>
        </div>

        <div style={{ display: "grid", gap: 8 }}>
          <input
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error ? <div style={{ color: "crimson" }}>{error}</div> : null}
          <button disabled={busy} onClick={submit}>
            {busy ? "..." : mode === "login" ? "Sign In" : "Create Account"}
          </button>
          <button disabled={busy} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
