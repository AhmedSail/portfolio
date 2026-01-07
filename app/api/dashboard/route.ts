import { db } from "@/src";
import { projects, skills } from "@/src/db/schema";
import { count, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [projectCount] = await db.select({ value: count() }).from(projects);
    const [skillCount] = await db.select({ value: count() }).from(skills);
    const [featuredCount] = await db
      .select({ value: count() })
      .from(projects)
      .where(eq(projects.featured, true));

    // Get recent projects
    const recentProjects = await db
      .select()
      .from(projects)
      .orderBy(projects.createdAt)
      .limit(5);

    // Group skills by category for some data
    const skillsList = await db.select().from(skills);
    const categories = Array.from(
      new Set(skillsList.map((s) => s.category || "General"))
    );

    return NextResponse.json({
      stats: {
        totalProjects: projectCount.value,
        totalSkills: skillCount.value,
        featuredProjects: featuredCount.value,
        categoriesCount: categories.length,
      },
      recentActivity: recentProjects.map((p) => ({
        id: p.id,
        user: "System",
        action: `Project '${p.title}' was added/updated`,
        time: new Date(p.createdAt).toLocaleDateString(),
      })),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
