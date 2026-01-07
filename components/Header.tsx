"use client";
import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export const Header = ({ profile }: { profile: any | null }) => {
  const [isDark, setIsDark] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Set dark mode by default
    document.documentElement.classList.add("dark");

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const switchTheme = () => {
      setIsDark(!isDark);
      document.documentElement.classList.toggle("dark");
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

  const initials = profile?.name
    ? profile.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
    : "AH";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/40 backdrop-blur-2xl border-b border-black/5 dark:border-white/5 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="group relative flex items-center gap-2"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-black text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
              {initials[0]}
            </div>
            <span className="text-xl font-black tracking-tighter bg-clip-text text-transparent bg-linear-to-r from-blue-600 dark:from-blue-400 to-blue-400 dark:to-white">
              {isDark ? (
                <Image
                  src="/logoWhite2.png"
                  alt="Logo"
                  width={100}
                  height={100}
                />
              ) : (
                <Image src="/logo.png" alt="Logo" width={100} height={100} />
              )}
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 p-1 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-md">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="px-6 py-2 text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-white/10 dark:hover:bg-white/5 rounded-xl transition-all uppercase tracking-widest"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="w-12 h-12 rounded-2xl border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all"
            >
              <Sun
                className={`h-5 w-5 transition-all text-blue-600 ${
                  isDark ? "rotate-90 scale-0" : "rotate-0 scale-100"
                }`}
              />
              <Moon
                className={`absolute h-5 w-5 transition-all text-blue-400 ${
                  isDark ? "rotate-0 scale-100" : "-rotate-90 scale-0"
                }`}
              />
            </Button>

            {/* Resume Button */}
            {profile?.resumeUrl && (
              <a
                href={profile.resumeUrl}
                target="_blank"
                className="hidden sm:flex h-12 items-center gap-2 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95"
              >
                Resume
              </a>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden w-12 h-12 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 border border-black/5 dark:border-white/5"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 px-6 mt-3 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="p-4 rounded-3xl bg-background/95 backdrop-blur-2xl border border-black/5 dark:border-white/10 shadow-2xl">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    className="w-full text-left px-6 py-4 rounded-2xl text-lg font-black text-muted-foreground hover:text-blue-600 dark:hover:text-white hover:bg-blue-50/50 dark:hover:bg-blue-600/20 transition-all uppercase tracking-widest"
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
