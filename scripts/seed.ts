import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { eq } from "drizzle-orm";

const projects = pgTable("projects", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  liveUrl: text("live_url"),
  githubUrl: text("github_url"),
  tags: text("tags"),
  gallery: text("gallery"),
  featured: boolean("featured").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

const FLAGSHIP_PROJECTS = [
  {
    id: "ofuq-smart-cafe",
    title: "Ofuq Cloud POS & Real-Time QR Ordering",
    description:
      "منظومة سحابية لحظية لإدارة طلبات الطاولات عبر الـ QR ونقاط البيع السحابية مع مزامنة فورية للمطبخ والكاشير. | ⚡ مزامنة لحظية في أقل من 150ms وانعدام تام لفقدان الطلبات وقت الذروة",
    tags: "Real-time, Next.js, WebSockets, PostgreSQL, Tailwind CSS",
    imageUrl:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=500&fit=crop",
    liveUrl: "https://ofuq.cafe",
    githubUrl: "https://github.com/ahmedqompoz/ofuq-pos",
    gallery: JSON.stringify([
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&h=500&fit=crop",
    ]),
    featured: true,
  },
  {
    id: "kafaah-logistics-erp",
    title: "Kafa'ah Logistics & Gov-Integrated ERP",
    description:
      "محرك لإدارة العمليات واللوجستيات مرتبط بالأنظمة الحكومية الرسمية عبر Webhooks موثقة بـ HMAC وتتبع لحظي. | 🏢 أتمتة 90% من عمليات الشحن وسجل تدقيق مشفر غير قابل للتلاعب",
    tags: "Gov Integration, Next.js, TypeScript, Drizzle ORM, HMAC / Static IP",
    imageUrl:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop",
    liveUrl: "https://kafaah.app",
    githubUrl: "https://github.com/ahmedqompoz/kafaah-erp",
    gallery: JSON.stringify([
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=800&h=500&fit=crop",
    ]),
    featured: true,
  },
  {
    id: "aact-secure-evoting",
    title: "AACT Cryptographic E-Voting Platform",
    description:
      "منظومة اقتراع إلكتروني مشفرة تضمن سرية اقتراع الناخب مع سجل تدقيق شفاف غير قابل للتعديل (Tamper-Proof). | 🔒 إدارة 10,000+ ناخب متزامن موثق مع صفر حالات تلاعب",
    tags: "Enterprise & Security, Next.js, PostgreSQL, RBAC, Cryptography",
    imageUrl:
      "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&h=500&fit=crop",
    liveUrl: "https://aact-vote.org",
    githubUrl: "https://github.com/ahmedqompoz/aact-voting",
    gallery: JSON.stringify([
      "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&h=500&fit=crop",
    ]),
    featured: true,
  },
  {
    id: "canaan-real-estate",
    title: "Canaan Real Estate Marketplace & CRM",
    description:
      "بوابة عقارية سحابية بمحرك بحث مكاني متقدم، إدارة عقود ومعاينات فورية، ونظام CRM متكامل للوسطاء. | 🏡 بحث مكاني أسرع بـ 4 أضعاف وإدارة أكثر من 350 عقار معتمد",
    tags: "Real Estate, React, Tailwind CSS, PostgreSQL, Spatial Search",
    imageUrl:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop",
    liveUrl: "https://canaan-estate.com",
    githubUrl: "https://github.com/ahmedqompoz/canaan-estate",
    gallery: JSON.stringify([
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop",
    ]),
    featured: true,
  },
  {
    id: "orchida-ai-edtech",
    title: "Orchida AI Adaptive Learning & Tutoring",
    description:
      "منصة تعليمية ذكية تولد اختبارات تفاعلية وشروحات موجهة لحظياً بناءً على تقييم مستوى الطالب ونقاط ضعفه. | 🧠 توليد الأسئلة في أقل من 1.2 ثانية وتحسين استيعاب الطلاب بنسبة 42%",
    tags: "AI & EdTech, Next.js, Gemini API, PostgreSQL, Drizzle ORM",
    imageUrl:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=500&fit=crop",
    liveUrl: "https://orchida.ai",
    githubUrl: "https://github.com/ahmedqompoz/orchida-ai",
    gallery: JSON.stringify([
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=500&fit=crop",
    ]),
    featured: true,
  },
  {
    id: "prescripto-medical-saas",
    title: "Prescripto Telehealth & Clinic Appointments SaaS",
    description:
      "نظام سحابي لحجز المواعيد الطبية يمنع تضارب الحجوزات مع إدارة ذكية لجداول الأطباء وسجلات المرضى. | 🏥 منع كامل لتضارب المواعيد وحجز مؤتمت للمرضى على مدار 24 ساعة",
    tags: "Healthcare, Next.js, TypeScript, Tailwind CSS, Slot Sync",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop",
    liveUrl: "https://prescripto-health.vercel.app",
    githubUrl: "https://github.com/ahmedqompoz/prescripto",
    gallery: JSON.stringify([
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop",
    ]),
    featured: true,
  },
];

async function runSeed() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error("❌ DATABASE_URL is not set in environment or .env!");
    process.exit(1);
  }

  console.log("Connecting to Neon PostgreSQL...");
  const sql = neon(dbUrl);
  const db = drizzle({ client: sql });

  for (const p of FLAGSHIP_PROJECTS) {
    console.log(`Pushing project: ${p.title} (${p.id})...`);
    const existing = await db.select().from(projects).where(eq(projects.id, p.id)).limit(1);

    if (existing.length > 0) {
      await db
        .update(projects)
        .set({
          title: p.title,
          description: p.description,
          tags: p.tags,
          imageUrl: p.imageUrl,
          liveUrl: p.liveUrl,
          githubUrl: p.githubUrl,
          gallery: p.gallery,
          featured: p.featured,
          updatedAt: new Date(),
        })
        .where(eq(projects.id, p.id));
      console.log(`  ✓ Updated ${p.id}`);
    } else {
      await db.insert(projects).values({
        id: p.id,
        title: p.title,
        description: p.description,
        tags: p.tags,
        imageUrl: p.imageUrl,
        liveUrl: p.liveUrl,
        githubUrl: p.githubUrl,
        gallery: p.gallery,
        featured: p.featured,
      });
      console.log(`  ✓ Inserted ${p.id}`);
    }
  }

  console.log("🎉 All 6 flagship production projects are now in Neon PostgreSQL!");
}

runSeed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
