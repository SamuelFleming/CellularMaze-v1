"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/apiClient";
import { useAuth } from "@/state/AuthContext";
import { Navbar } from "@/components/Navbar";
import { AuthModal } from "@/components/AuthModal";

export default function HomePage() {
  const { status, setSession } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [healthOk, setHealthOk] = useState<boolean | null>(null);

  // Requirement: Home loads in guest mode by default
  useEffect(() => {
    let cancelled = false;

    async function boot() {
      try {
        // Prove FE->API wiring (optional but useful)
        const h = await api.health();
        if (!cancelled) setHealthOk(!!h.ok);
      } catch {
        if (!cancelled) setHealthOk(false);
      }

      // Acquire guest session if none
      if (status === "none") {
        try {
          const res = await api.guest();
          if (!cancelled) setSession(res.token, res.user);
        } catch {
          // If API is down, UI still loads; you’ll see healthOk=false
        }
      }
    }

    boot();
    return () => {
      cancelled = true;
    };
  }, [status, setSession]);

  return (
    <div>
      <Navbar onOpenAuth={() => setAuthOpen(true)} />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />

      <main style={{ padding: 16 }}>
        <h1 style={{ marginTop: 0 }}>MazeGenerator v1.0 (Sprint 1)</h1>

        <div style={{ display: "grid", gap: 8 }}>
          <div>
            API Health:{" "}
            {healthOk === null ? "checking..." : healthOk ? "OK" : "DOWN"}
          </div>

          <div style={{ opacity: 0.75 }}>
            Next steps (Sprint 2): add maze-core package + mock /mazes endpoints +
            canvas renderer scaffold.
          </div>
        </div>
      </main>
    </div>
  );
}
