"use client";

import Image from "next/image";
import {
  ArrowDown,
  Github,
  Linkedin,
  Twitter,
  FileText,
  Sparkles,
  Layers,
  ShieldCheck,
  Server,
  Activity,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";

export const Hero = ({ profile }: { profile: any | null }) => {
  const { language, dir, t } = useLanguage();

  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const name = language === "ar" ? "أحمد قنبز" : "Ahmed Qompoz";

  const title = t("heroTitle");
  const bio = t("heroBio");

  const imageUrl =
    profile?.imageUrl ||
    "/Gemini_Generated_Image_vfoxzbvfoxzbvfox-removebg-preview-removebg-preview.png";

  const stats = [
    {
      value: t("statPlatforms"),
      label: t("statPlatformsLabel"),
      icon: Layers,
    },
    {
      value: t("statSectors"),
      label: t("statSectorsLabel"),
      icon: Server,
    },
    {
      value: t("statExperience"),
      label: t("statExperienceLabel"),
      icon: Activity,
    },
    {
      value: t("statStack"),
      label: t("statStackLabel"),
      icon: ShieldCheck,
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      href: profile?.githubUrl || "https://github.com/AhmedSail",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/ahmedqompoz",
      label: "LinkedIn",
    },
    {
      icon: Twitter,
      href: "https://x.com/ahmedqompoz",
      label: "X (Twitter)",
    },
    {
      icon: FileText,
      href: profile?.resumeUrl || "/resume.pdf",
      label: t("resumeBtn"),
    },
  ];

  return (
    <section
      id="about"
      dir={dir}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-28 pb-16"
    >
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/10 dark:bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 max-w-6xl mx-auto">
          {/* Main Info */}
          <div className="flex-1 text-center lg:text-start">
            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                {t("availableBadge")}
              </span>
            </div>

            {/* Name & Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-3 tracking-tighter leading-[1.1]">
              <span className="text-muted-foreground text-2xl sm:text-3xl block font-semibold mb-1">
                {t("heroGreeting")}
              </span>
              <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 via-blue-500 to-indigo-400 dark:from-white dark:via-blue-200 dark:to-blue-400">
                {name}
              </span>
            </h1>

            {/* Role Title */}
            <div className="inline-block mb-6">
              <span className="px-3.5 py-1 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono text-sm sm:text-base font-bold border border-blue-500/20">
                {title}
              </span>
            </div>

            {/* Targeted Production Bio */}
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed font-normal">
              {bio}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8 w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-500/25 rounded-2xl px-8 h-14 text-base font-bold transition-all hover:scale-[1.02] active:scale-95"
                onClick={scrollToProjects}
              >
                <span>{t("heroCtaProjects")}</span>
                <ArrowRight className={`w-4 h-4 ${language === "ar" ? "rotate-180" : ""}`} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 px-8 h-14 text-base font-bold rounded-2xl backdrop-blur-sm transition-all hover:border-blue-500/40"
                onClick={scrollToContact}
              >
                {t("heroCtaContact")}
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center lg:justify-start gap-3">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-blue-600/10 border border-black/5 dark:border-white/10 hover:border-blue-500/40 flex items-center justify-center transition-all group"
                  title={social.label}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 text-muted-foreground group-hover:text-blue-500 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Visual Profile Avatar */}
          <div className="flex-1 relative flex justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
              {/* Outer decorative ring */}
              <div className="absolute inset-0 rounded-[2.5rem] bg-linear-to-tr from-blue-600 to-indigo-400 opacity-20 blur-xl animate-pulse" />

              {/* Main Image Container */}
              <div className="relative z-10 w-full h-full rounded-[2.5rem] p-2 bg-card/60 backdrop-blur-xl border border-black/10 dark:border-white/10 overflow-hidden shadow-2xl group transition-all duration-500 hover:border-blue-500/40">
                <Image
                  src={imageUrl}
                  alt={name}
                  width={400}
                  height={400}
                  priority
                  sizes="(max-width: 768px) 260px, 380px"
                  className="w-full h-full object-cover rounded-[2rem] transition-transform duration-700 group-hover:scale-105"
                  unoptimized
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 px-4 py-3 bg-card/90 backdrop-blur-xl rounded-2xl border border-black/10 dark:border-white/10 shadow-xl z-20 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider font-semibold">
                    Architecting
                  </div>
                  <div className="text-xs font-black text-foreground">
                    Production Systems
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* STATS BAR: Requested 8 platforms, 6 sectors, reliability, clean stack */}
        <div className="mt-16 max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 sm:p-6 rounded-3xl bg-card/60 dark:bg-card/40 border border-black/5 dark:border-white/10 backdrop-blur-xl shadow-lg">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center sm:items-start text-center sm:text-start p-3 sm:p-4 rounded-2xl hover:bg-blue-500/5 transition-colors group"
              >
                <div className="flex items-center gap-2 mb-1">
                  <stat.icon className="w-4 h-4 text-blue-500" />
                  <span className="text-2xl sm:text-3xl font-black text-foreground tracking-tight group-hover:text-blue-500 transition-colors">
                    {stat.value}
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-semibold text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-12 opacity-40">
          <ArrowDown className="w-5 h-5 text-blue-500 animate-bounce" />
        </div>
      </div>
    </section>
  );
};
