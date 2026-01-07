"use client";

import { useEffect, useState, useRef } from "react";
// Import only needed category icons
import {
  Code2,
  Server,
  Wrench,
  HelpCircle,
  Layout,
  Database,
  Cpu,
  Globe,
  Terminal,
  Layers,
  Container,
  Cloud,
  Box,
  Infinity,
  Smartphone,
} from "lucide-react";
import {
  RiReactjsLine,
  RiNodejsLine,
  RiJavascriptLine,
  RiHtml5Line,
  RiCss3Line,
  RiGithubFill,
  RiDatabaseLine,
} from "react-icons/ri";
import {
  SiTailwindcss,
  SiNextdotjs,
  SiTypescript,
  SiPostgresql,
  SiPrisma,
  SiDocker,
  SiFramer,
  SiVite,
  SiRedux,
  SiGraphql,
  SiFirebase,
  SiSupabase,
} from "react-icons/si";
import { Card, CardContent } from "@/components/ui/card";

// Mapping a select set of popular tech icons to avoid importing entire libraries
// This significantly improves performance
const TECH_ICONS: Record<string, any> = {
  // Lucide (Defaults)
  Code2,
  Server,
  Wrench,
  HelpCircle,
  Layout,
  Database,
  Cpu,
  Globe,
  Terminal,
  Layers,
  Container,
  Cloud,
  Box,
  Infinity,
  Smartphone,
  // Tech specific
  React: RiReactjsLine,
  Node: RiNodejsLine,
  JS: RiJavascriptLine,
  HTML: RiHtml5Line,
  CSS: RiCss3Line,
  Tailwind: SiTailwindcss,
  NextJS: SiNextdotjs,
  TS: SiTypescript,
  PostgreSQL: SiPostgresql,
  Prisma: SiPrisma,
  Docker: SiDocker,
  Framer: SiFramer,
  Vite: SiVite,
  Redux: SiRedux,
  GraphQL: SiGraphql,
  Firebase: SiFirebase,
  Supabase: SiSupabase,
  GitHub: RiGithubFill,
  SQL: RiDatabaseLine,
};

// Helper component to render icons efficiently
const DynamicIcon = ({
  name,
  className,
}: {
  name: string;
  className?: string;
}) => {
  // Check if it's in our mapping
  const Icon = TECH_ICONS[name] || HelpCircle;
  return <Icon className={className || "w-5 h-5"} />;
};

export const Skills = ({ skills }: { skills: any[] }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Group skills by category
  const categories = skills.reduce((acc: any, skill: any) => {
    const category = skill.category || "General";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {});

  const skillCategories = Object.keys(categories).map((cat) => ({
    title: cat,
    icon: cat === "Frontend" ? Code2 : cat === "Backend" ? Server : Wrench,
    skills: categories[cat],
  }));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-32 bg-secondary/30 dark:bg-secondary/10 relative overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] -z-10 animate-pulse-slow" />
      <div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] -z-10 animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6 backdrop-blur-md">
            <Code2 className="w-4 h-4 text-blue-500" />
            <span className="font-mono text-xs font-bold text-blue-500 uppercase tracking-widest">
              Tech Stack
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Skills &{" "}
            <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-blue-600 dark:to-white">
              Expertise
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Technologies and tools I use to bring ideas to life.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <Card
              key={category.title}
              className="bg-card/60 dark:bg-card/40 border-black/5 dark:border-white/5 hover:border-blue-500/30 transition-all duration-500 backdrop-blur-xl rounded-[2.5rem] group shadow-xl hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <CardContent className="p-8">
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-blue-500/5">
                    <category.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-black tracking-tight uppercase">
                    {category.title}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="space-y-8">
                  {category.skills.map((skill: any, skillIndex: number) => (
                    <div key={skill.id} className="space-y-4">
                      <div className="flex justify-between items-center group/skill">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-500/5 border border-blue-500/10 text-blue-500 group-hover/skill:bg-blue-500/10 transition-all duration-500 group-hover/skill:scale-110">
                            <DynamicIcon
                              name={skill.iconName}
                              className="w-5 h-5"
                            />
                          </div>
                          <span className="font-bold text-base tracking-tight group-hover/skill:text-blue-500 transition-colors">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-xs font-black text-blue-500 dark:text-blue-400">
                          {skill.percentage}%
                        </span>
                      </div>
                      <div className="h-2.5 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden p-px border border-black/5 dark:border-white/5">
                        <div
                          className="h-full rounded-full transition-all duration-1000 ease-out bg-linear-to-r from-blue-600 to-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                          style={{
                            width: isVisible ? `${skill.percentage}%` : "0%",
                            transitionDelay: `${
                              categoryIndex * 0.1 + skillIndex * 0.05
                            }s`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
