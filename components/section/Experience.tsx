"use client";

import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/language-context";

interface ExperienceItem {
  company: string;
  roleEn: string;
  roleAr: string;
  periodEn: string;
  periodAr: string;
  locationEn: string;
  locationAr: string;
  descriptionEn: string;
  descriptionAr: string;
  highlightsEn: string[];
  highlightsAr: string[];
  skills: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    company: "Orchida AI",
    roleEn: "Full Stack Engineer",
    roleAr: "مهندس برمجيات Full Stack",
    periodEn: "2024 - Present",
    periodAr: "2024 - حالياً",
    locationEn: "Remote / Hybrid",
    locationAr: "عن بُعد / هجين",
    descriptionEn:
      "Leading full-stack engineering for AI-assisted adaptive learning platforms, high-throughput educational tools, and low-latency database queries.",
    descriptionAr:
      "قيادة التطوير البرمجي الشامل لمنصات التعليم الذكي التكيفي، أدوات توليد التقييمات اللحظية، وتصميم قواعد البيانات السريعة.",
    highlightsEn: [
      "Architected generative AI pipelines with streaming responses and under 1.2s roundtrip latency",
      "Engineered high-performance database schemas with PostgreSQL and Drizzle ORM",
      "Implemented strict RBAC security patterns for students, mentors, and administrators",
    ],
    highlightsAr: [
      "تصميم مسارات تكامل الذكاء الاصطناعي مع معالجة البث اللحظي وزمن استجابة أقل من 1.2 ثانية",
      "بناء مخططات قواعد بيانات فائقة الأداء باستخدام PostgreSQL وDrizzle ORM",
      "تطبيق منظومة صلاحيات دقيقة (RBAC) للطلاب، المدرسين، والمسؤولين",
    ],
    skills: ["Next.js", "TypeScript", "PostgreSQL", "Drizzle ORM", "Gemini API", "Tailwind CSS"],
  },
  {
    company: "ViexelMedia",
    roleEn: "Full Stack Developer",
    roleAr: "مطور برمجيات Full Stack",
    periodEn: "2023 - 2024",
    periodAr: "2023 - 2024",
    locationEn: "Contract / Remote",
    locationAr: "عقد عمل / عن بُعد",
    descriptionEn:
      "Engineered modern client-facing platforms, business portals, and automated workflow integrations across multiple industry domains.",
    descriptionAr:
      "تطوير منصات وبوابات رقمية متعددة لمؤسسات تجارية، وأتمتة مسارات العمل وتكاملات الواجهات البرمجية الخارجية.",
    highlightsEn: [
      "Built resilient RESTful microservices and custom webhook listeners with HMAC validation",
      "Optimized client web performance, elevating Google Lighthouse scores from 65 to 98+",
      "Delivered responsive, accessible UI components utilizing Tailwind CSS and React",
    ],
    highlightsAr: [
      "بناء خدمات برمجية مصغرة ومعالجات Webhooks آمنة وموثقة بـ HMAC",
      "تحسين أداء الواجهات ورفع تقييم Google Lighthouse من 65 إلى أكثر من 98",
      "تسليم واجهات متجاوبة وقابلة للوصول بدقة عالية بالاعتماد على Tailwind CSS وReact",
    ],
    skills: ["React", "Node.js", "REST APIs", "Tailwind CSS", "HMAC", "Git"],
  },
];

export const Experience = () => {
  const { language, dir, t } = useLanguage();

  return (
    <section id="experience" dir={dir} className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4 backdrop-blur-md">
            <Briefcase className="w-4 h-4 text-blue-500" />
            <span className="font-mono text-xs font-bold text-blue-500 uppercase tracking-widest">
              {t("expBadge")}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-5 tracking-tight">
            {t("expTitle")}{" "}
            <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-500 to-indigo-500 dark:from-white dark:to-blue-400">
              {t("expTitleHighlight")}
            </span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            {t("expDesc")}
          </p>
        </div>

        {/* Timeline Cards */}
        <div className="max-w-4xl mx-auto space-y-8">
          {EXPERIENCES.map((exp, idx) => {
            const role = language === "ar" ? exp.roleAr : exp.roleEn;
            const period = language === "ar" ? exp.periodAr : exp.periodEn;
            const location = language === "ar" ? exp.locationAr : exp.locationEn;
            const desc = language === "ar" ? exp.descriptionAr : exp.descriptionEn;
            const highlights = language === "ar" ? exp.highlightsAr : exp.highlightsEn;

            return (
              <Card
                key={idx}
                className="bg-card/60 dark:bg-card/40 border-black/5 dark:border-white/10 hover:border-blue-500/40 transition-all backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-xl"
              >
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-2xl font-black text-foreground tracking-tight">
                          {exp.company}
                        </h3>
                        <Badge className="bg-blue-600/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs font-bold">
                          {role}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs font-semibold text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-blue-500" />
                          {period}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-blue-500" />
                          {location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 font-medium">
                    {desc}
                  </p>

                  {/* Key Deliverables / Highlights */}
                  <div className="space-y-2.5 mb-6">
                    {highlights.map((item, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                        <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        <span className="text-foreground/90 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-black/5 dark:border-white/5">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 text-[11px] font-mono font-bold rounded-lg bg-black/5 dark:bg-white/5 text-muted-foreground border border-black/5 dark:border-white/10"
                      >
                        {skill}
                      </span>
                    ))}
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
