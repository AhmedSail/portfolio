"use client";
import { Header } from "@/components/Header";
import { Hero } from "@/components/section/Hero";
import { Projects } from "@/components/section/Projects";
import { Skills } from "@/components/section/Skills";
import { Contact } from "@/components/section/Contact";
import { Footer } from "@/components/Footer";

import { Button } from "@/components/ui/button";

const HomeView = ({
  projects,
  skills,
  profile,
}: {
  projects: any[];
  skills: any[];
  profile: any | null;
}) => {
  return (
    <div className="flex flex-col gap-0">
      <Header profile={profile} />
      <div className="relative min-h-screen">
        {/* Fixed Background with faster floating squares */}
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
          <div className="grid-background absolute inset-0 opacity-20 dark:opacity-20" />
          <div className="dot-background absolute inset-0 opacity-20 dark:opacity-10" />

          {/* Floating Decorative Squares - Faster & more dynamic */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute border rounded-2xl opacity-50 dark:opacity-30 ${
                i % 2 === 0 ? "animate-float" : "animate-float-reverse"
              } ${
                i % 3 === 0
                  ? "border-blue-500/40 bg-blue-500/5 shadow-[0_0_25px_rgba(59,130,246,0.2)]"
                  : "border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/5"
              }`}
              style={{
                width: `${Math.random() * 100 + 30}px`,
                height: `${Math.random() * 100 + 30}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${Math.random() * 4 + 6}s`, // Much faster movements: 6s - 10s
              }}
            />
          ))}
        </div>
        <main className="relative z-10">
          <Hero profile={profile} />
          <Projects projects={projects} />
          <Skills skills={skills} />
          <Contact profile={profile} />
        </main>
      </div>
      <Footer profile={profile} />
    </div>
  );
};

export default HomeView;
