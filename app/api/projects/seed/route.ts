import { db } from "@/src";
import { projects } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const FLAGSHIP_PROJECTS = [
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

export async function GET() {
  return seedDatabase();
}

export async function POST() {
  return seedDatabase();
}

async function seedDatabase() {
  try {
    const results = [];

    for (const p of FLAGSHIP_PROJECTS) {
      // Check if project already exists
      const existing = await db
        .select()
        .from(projects)
        .where(eq(projects.id, p.id))
        .limit(1);

      if (existing.length > 0) {
        // Update to make sure titles, descriptions, and tags are modern
        const updated = await db
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
          .where(eq(projects.id, p.id))
          .returning();
        results.push({ action: "updated", project: updated[0] });
      } else {
        // Insert new
        const inserted = await db
          .insert(projects)
          .values({
            id: p.id,
            title: p.title,
            description: p.description,
            tags: p.tags,
            imageUrl: p.imageUrl,
            liveUrl: p.liveUrl,
            githubUrl: p.githubUrl,
            gallery: p.gallery,
            featured: p.featured,
          })
          .returning();
        results.push({ action: "inserted", project: inserted[0] });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Flagship projects successfully pushed to database!",
      count: results.length,
      results,
    });
  } catch (error: any) {
    console.error("Database seed error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to seed projects to database",
        details: error?.message,
      },
      { status: 500 }
    );
  }
}
