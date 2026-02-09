import type { Metadata } from "next";
import { AuthProvider } from "@/state/AuthContext";

export const metadata: Metadata = {
  title: "CellularMaze",
  description: "MazeGenerator v1.0"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif" }}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

