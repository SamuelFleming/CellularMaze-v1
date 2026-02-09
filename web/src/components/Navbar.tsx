"use client";

import { useAuth } from "@/state/AuthContext";

export function Navbar({
  onOpenAuth
}: {
  onOpenAuth: () => void;
}) {
  const { status, user, signOut } = useAuth();

  const indicator =
    status === "user"
      ? `Signed in: ${(user as any)?.email ?? "user"}`
      : status === "guest"
      ? "Guest"
      : "No session";

  return (
    <div
      style={{
        display: "flex",
        padding: "12px 16px",
        borderBottom: "1px solid #ddd",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <div style={{ fontWeight: 700 }}>CellularMaze</div>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div
          style={{
            padding: "4px 10px",
            border: "1px solid #ddd",
            borderRadius: 999
          }}
        >
          {indicator}
        </div>

        {status !== "user" ? (
          <>
            <button onClick={onOpenAuth}>Sign In / Sign Up</button>
          </>
        ) : (
          <button onClick={signOut}>Sign Out</button>
        )}
      </div>
    </div>
  );
}
