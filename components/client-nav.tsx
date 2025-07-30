// app/client-layout.tsx
"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/Nav";
import { useLanguage } from "@/app/context/LanguageContext";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scrollY, setScrollY] = useState(0);
  const { language } = useLanguage();
  const dir = language === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div dir={dir}>
      <Navbar scrollY={scrollY} />
      {children}
    </div>
  );
}