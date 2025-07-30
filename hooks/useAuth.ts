// hooks/useAuth.ts
"use client";

import { useState, useEffect } from "react";

export function useAuth() {
  const [admin, setAdmin] = useState<null | {
    id: string;
    email: string;
    name: string;
    role: string;
  }>(null);

  useEffect(() => {
    const stored = localStorage.getItem("admin");
    if (stored) {
      setAdmin(JSON.parse(stored));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        return { success: false, error: data.error || "Login failed" };
      }

      localStorage.setItem("admin", JSON.stringify(data.admin));
      setAdmin(data.admin);
      return { success: true };
    } catch (error) {
      return { success: false, error: "Something went wrong" };
    }
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    localStorage.removeItem("admin");
    setAdmin(null);
  };

  return { admin, login, logout };
}
