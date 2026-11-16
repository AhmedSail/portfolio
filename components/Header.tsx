"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X, Globe, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";

export const Header = ({ profile }: { profile: any | null }) => {
  const { language, toggleLanguage, t, dir } = useLanguage();
  const [isDark, setIsDark] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: t("navAbout"), href: "#about" },
    { name: t("navProjects"), href: "#projects" },
    { name: t("navExperience"), href: "#experience" },
    { name: t("navSkills"), href: "#skills" },
    { name: t("navContact"), href: "#contact" },
  ];

  useEffect(() => {
    // Default to dark mode if not specified
    const hasTheme = document.documentElement.classList.contains("light");
    if (!hasTheme) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      setIsDark(false);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const switchTheme = () => {
      setIsDark((prev) => {
        const next = !prev;
        if (next) {
          document.documentElement.classList.add("dark");
          document.documentElement.classList.remove("light");
        } else {
          document.documentElement.classList.remove("dark");
          document.documentElement.classList.add("light");
        }
        return next;
      });
    };

    if (!(document as any).startViewTransition) {
      switchTheme();
      return;
    }

    (document as any).startViewTransition(switchTheme);
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      dir={dir}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-2xl border-b border-black/5 dark:border-white/10 py-3 shadow-sm"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between">
          {/* Logo / Brand Mark */}
          <a
            href="#"
            className="group flex items-center gap-3"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-blue-600 to-blue-400 flex items-center justify-center font-black text-white shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform tracking-tight text-sm">
              AQ
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight leading-tight group-hover:text-blue-500 transition-colors">
                {language === "ar" ? "أحمد قنبز" : "Ahmed Qompoz"}
              </span>
              <span className="text-[11px] font-mono font-medium text-muted-foreground uppercase tracking-wider">
                Full Stack Engineer
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 p-1 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-md">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="px-5 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-white/80 dark:hover:bg-white/10 rounded-xl transition-all"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Actions: Language Switcher, Theme Toggle, Resume */}
          <div className="flex items-center gap-2">
            {/* Language Switcher Pill */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="h-10 px-3.5 gap-2 rounded-xl border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-blue-500/10 hover:border-blue-500/40 hover:text-blue-500 transition-all font-bold text-xs"
              title={language === "en" ? "تبديل إلى العربية" : "Switch to English"}
            >
              <Globe className="w-3.5 h-3.5 text-blue-500" />
              <span>{language === "en" ? "عربي" : "EN"}</span>
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="w-10 h-10 rounded-xl border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all"
              aria-label="Toggle theme"
            >
              <Sun
                className={`h-4 w-4 transition-all text-amber-500 ${
                  isDark ? "rotate-90 scale-0 hidden" : "rotate-0 scale-100 block"
                }`}
              />
              <Moon
                className={`h-4 w-4 transition-all text-blue-400 ${
                  isDark ? "rotate-0 scale-100 block" : "-rotate-90 scale-0 hidden"
                }`}
              />
            </Button>

            {/* Resume Button */}
            {profile?.resumeUrl && (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex h-10 items-center gap-1.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-md shadow-blue-500/20 active:scale-95"
              >
                <span>{t("resumeBtn")}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden w-10 h-10 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 border border-black/5 dark:border-white/5"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="p-4 rounded-2xl bg-card/95 backdrop-blur-2xl border border-black/10 dark:border-white/10 shadow-2xl space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="w-full text-start px-4 py-3 rounded-xl text-sm font-bold text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 transition-all"
                >
                  {link.name}
                </button>
              ))}
              {profile?.resumeUrl && (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-2 flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm"
                >
                  <span>{t("resumeBtn")}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
