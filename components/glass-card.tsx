"use client";

import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({
  children,
  className = "",
  hover = true,
}: GlassCardProps) {
  return (
    <div
      className={`bg-white rounded-3xl transition-all duration-500 shadow-xl ${className}`}
    >
      {children}
    </div>
  );
}
