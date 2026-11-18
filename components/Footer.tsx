"use client";

import {
  Github,
  Linkedin,
  Twitter,
  Heart,
  MessageCircle,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export const Footer = ({ profile }: { profile: any | null }) => {
  const { language, dir, t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const name = language === "ar" ? "أحمد قنبز" : "Ahmed Qompoz";

  const socialLinks = [
    {
      icon: Github,
      href: profile?.githubUrl || "https://github.com/AhmedSail",
      name: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/ahmedqompoz",
      name: "LinkedIn",
    },
    {
      icon: Twitter,
      href: "https://x.com/ahmedqompoz",
      name: "X (Twitter)",
    },
    {
      icon: MessageCircle,
      href: profile?.whatsappUrl || "https://wa.me/970592855602",
      name: "WhatsApp",
    },
  ];

  return (
    <footer
      dir={dir}
      className="py-12 border-t border-black/5 dark:border-white/10 bg-background/50 backdrop-blur-md"
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-black text-white text-xs shadow-md shadow-blue-500/20">
                AQ
              </div>
              <span className="font-black tracking-tight text-lg text-foreground">
                {name}
              </span>
            </div>
            <p className="text-xs text-muted-foreground font-medium">
              © {currentYear} • {t("footerBuiltBy")} • {t("footerTagline")}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2.5">
            {socialLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-muted-foreground hover:text-blue-500 hover:border-blue-500/40 flex items-center justify-center transition-all hover:scale-105 shadow-xs"
              >
                <link.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
