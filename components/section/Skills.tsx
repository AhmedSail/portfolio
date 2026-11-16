"use client";

import {
  Code2,
  Server,
  Database,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
  Globe,
  Terminal,
  Container,
} from "lucide-react";
import {
  RiReactjsLine,
  RiNodejsLine,
  RiJavascriptLine,
  RiTailwindCssFill,
  RiGithubFill,
} from "react-icons/ri";
import {
  SiNextdotjs,
  SiTypescript,
  SiPostgresql,
  SiPrisma,
  SiDocker,
  SiMongodb,
  SiTailwindcss,
  SiGraphql,
  SiRedis,
  SiGit,
} from "react-icons/si";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/lib/language-context";

interface SkillItem {
  name: string;
  badge?: string;
  icon?: any;
}

interface SkillCategory {
  titleEn: string;
  titleAr: string;
  icon: any;
  skills: SkillItem[];
}

const CURATED_CATEGORIES: SkillCategory[] = [
  {
    titleEn: "Frontend & Full Stack",
    titleAr: "الواجهات والمنظومات الشاملة",
    icon: Code2,
    skills: [
      { name: "Next.js (App Router)", badge: "Production Core", icon: SiNextdotjs },
      { name: "TypeScript", badge: "Strict Type-Safe", icon: SiTypescript },
      { name: "React 19", badge: "Advanced", icon: RiReactjsLine },
      { name: "Tailwind CSS", badge: "Responsive UI", icon: SiTailwindcss },
      { name: "JavaScript (ES6+)", badge: "Core", icon: RiJavascriptLine },
    ],
  },
  {
    titleEn: "Backend & Databases",
    titleAr: "الأنظمة الخلفية وقواعد البيانات",
    icon: Database,
    skills: [
      { name: "PostgreSQL", badge: "Primary Relational", icon: SiPostgresql },
      { name: "Drizzle ORM", badge: "Production Tested", icon: Layers },
      { name: "Node.js", badge: "Runtime", icon: RiNodejsLine },
      { name: "Prisma ORM", badge: "Data Modeling", icon: SiPrisma },
      { name: "MongoDB", badge: "Document Store", icon: SiMongodb },
    ],
  },
  {
    titleEn: "Real-Time & Architecture",
    titleAr: "الأنظمة اللحظية والبنية الهندسية",
    icon: Zap,
    skills: [
      { name: "WebSockets & Events", badge: "<150ms Sync", icon: Zap },
      { name: "HMAC & Webhooks", badge: "Gov / Secure APIs", icon: ShieldCheck },
      { name: "Role-Based Access (RBAC)", badge: "Security", icon: ShieldCheck },
      { name: "RESTful Microservices", badge: "Architecture", icon: Server },
      { name: "Static IP Proxy Bridges", badge: "Integrations", icon: Globe },
    ],
  },
  {
    titleEn: "DevOps, Tools & Reliability",
    titleAr: "أدوات التطوير والاعتمادية",
    icon: Terminal,
    skills: [
      { name: "Docker", badge: "Containers", icon: SiDocker },
      { name: "Git & GitHub", badge: "Version Control", icon: RiGithubFill },
      { name: "API Testing & Postman", badge: "Verification", icon: Terminal },
      { name: "Neon Serverless DB", badge: "Cloud Postgres", icon: Database },
      { name: "CI / CD Pipelines", badge: "Automation", icon: Cpu },
    ],
  },
];

export const Skills = ({ skills: dbSkills = [] }: { skills?: any[] }) => {
  const { language, dir, t } = useLanguage();

  return (
    <section id="skills" dir={dir} className="py-24 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[130px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[130px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4 backdrop-blur-md">
            <Cpu className="w-4 h-4 text-blue-500" />
            <span className="font-mono text-xs font-bold text-blue-500 uppercase tracking-widest">
              {t("skillsBadge")}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-5 tracking-tight">
            {t("skillsTitle")}{" "}
            <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-500 to-indigo-500 dark:from-white dark:to-blue-400">
              {t("skillsTitleHighlight")}
            </span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            {t("skillsDesc")}
          </p>
        </div>

        {/* Categories Grid - Clean, No Percentages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {CURATED_CATEGORIES.map((category, catIndex) => {
            const Icon = category.icon;
            const title = language === "ar" ? category.titleAr : category.titleEn;

            return (
              <Card
                key={catIndex}
                className="bg-card/60 dark:bg-card/40 border-black/5 dark:border-white/10 hover:border-blue-500/30 transition-all duration-300 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/5 group"
              >
                <CardContent className="p-6 sm:p-8">
                  {/* Category Title */}
                  <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-black/5 dark:border-white/10">
                    <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-105 transition-transform shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-foreground tracking-tight">
                        {title}
                      </h3>
                      <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                        {category.skills.length} Core Technologies
                      </span>
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {category.skills.map((skill, sIndex) => {
                      const SkillIcon = skill.icon || Layers;
                      return (
                        <div
                          key={sIndex}
                          className="flex items-center justify-between p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all group/item"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-7 h-7 rounded-lg bg-card flex items-center justify-center text-blue-500 shrink-0 shadow-xs">
                              <SkillIcon className="w-4 h-4" />
                            </div>
                            <span className="text-xs sm:text-sm font-bold text-foreground truncate group-hover/item:text-blue-500 transition-colors">
                              {skill.name}
                            </span>
                          </div>
                          {skill.badge && (
                            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0 border border-blue-500/20">
                              {skill.badge}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
