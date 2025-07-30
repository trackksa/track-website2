import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/glass-card";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";
import { content } from "@/app/i18n";

interface NavbarProps {
  scrollY: number;
}

const routes: { [key: string]: string } = {
  home: "/",
  about: "/about",
  services: "/services",
  portfolio: "/jobs",
  contact: "/contact",
};

export function Navbar({ scrollY }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const navItems = content[language].nav;
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500">
      <GlassCard
        className={`px-8 py-3 transition-all duration-500 ${
          scrollY > 100 ? "bg-white/80 shadow-xl" : "bg-white/80"
        }`}
      >
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <div className="flex items-center group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#28bba4] to-purple-500 rounded-lg blur-sm opacity-0 group-hover:opacity-30 transition-all duration-500" />
              <Image
                src="/track-logo.png"
                alt="Track Logo"
                width={100}
                height={32}
                className="h-8 w-auto relative z-10 transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {Object.entries(navItems).map(([key, value]) => (
              <a
                key={key}
                href={routes[key] || `#${key}`}
                className="text-gray-700 hover:text-[#28bba4] transition-all duration-300 font-medium text-sm tracking-wide relative group py-2 px-3 rounded-full hover:bg-[#28bba4]/5"
              >
                {value}
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#28bba4] to-purple-500 group-hover:w-full transition-all duration-500"></span>
              </a>
            ))}
          </div>

          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(language === "en" ? "ar" : "en")}
            className="flex items-center space-x-2 text-gray-700 hover:text-[#28bba4] hover:bg-[#28bba4]/10 rounded-full transition-all duration-300 hover:scale-105"
          >
            <Globe className="h-4 w-4" />
            <span className="text-sm font-medium">
              {language === "en" ? "العربية" : "English"}
            </span>
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-gray-700 hover:bg-[#28bba4]/10 rounded-full transition-all duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </GlassCard>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="mt-4 lg:hidden animate-in slide-in-from-top-2 duration-300"
        >
          <GlassCard className="p-6 bg-white/80">
            <div className="flex flex-col space-y-4">
              {Object.entries(navItems).map(([key, value]) => (
                <a
                  key={key}
                  href={routes[key] || `#${key}`}
                  className="text-gray-700 hover:text-[#28bba4] transition-all duration-300 font-medium py-3 px-4 rounded-xl hover:bg-[#28bba4]/10 group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="group-hover:translate-x-2 transition-transform duration-300 inline-block">
                    {value}
                  </span>
                </a>
              ))}
            </div>
          </GlassCard>
        </div>
      )}
    </nav>
  );
}
