"use client";
import { Header } from "@/components/Header";
import { Hero } from "@/components/section/Hero";
import { Projects } from "@/components/section/Projects";
import { Experience } from "@/components/section/Experience";
import { Skills } from "@/components/section/Skills";
import { Contact } from "@/components/section/Contact";
import { Footer } from "@/components/Footer";

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
    <div className="flex flex-col gap-0 min-h-screen">
      <Header profile={profile} />
      <div className="relative min-h-screen">
        {/* Ambient Subtle Grid */}
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
          <div className="grid-background absolute inset-0 opacity-15 dark:opacity-15" />
          <div className="dot-background absolute inset-0 opacity-15 dark:opacity-10" />

          {/* Floating Subtle Geometric Squares */}
          {[...Array(14)].map((_, i) => (
            <div
              key={i}
              className={`absolute border rounded-2xl opacity-40 dark:opacity-20 ${
                i % 2 === 0 ? "animate-float" : "animate-float-reverse"
              } ${
                i % 3 === 0
                  ? "border-blue-500/30 bg-blue-500/5 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                  : "border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/5"
              }`}
              style={{
                width: `${(i % 5) * 15 + 35}px`,
                height: `${(i % 5) * 15 + 35}px`,
                top: `${(i * 7) % 95}%`,
                left: `${(i * 13) % 95}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${7 + (i % 4)}s`,
              }}
            />
          ))}
        </div>

        <main className="relative z-10">
          <Hero profile={profile} />
          <Projects projects={projects} />
          <Experience />
          <Skills skills={skills} />
          <Contact profile={profile} />
        </main>
      </div>
      <Footer profile={profile} />
    </div>
  );
};

export default HomeView;
