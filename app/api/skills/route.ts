import { db } from "@/src";
import { skills } from "@/src/db/schema";
import { eq, desc } from "drizzle-orm";
import { NextResponse } from "next/server";

// GET all skills
export async function GET() {
  try {
    const data = await db.select().from(skills).orderBy(desc(skills.createdAt));
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching skills:", error);
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 }
    );
  }
}

// POST new skill
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, iconName, category, percentage } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const id = crypto.randomUUID();
    const result = await db
      .insert(skills)
      .values({
        id,
        name,
        iconName,
        category,
        percentage,
      })
      .returning();

    return NextResponse.json({ success: true, skill: result[0] });
  } catch (error) {
    console.error("Error adding skill:", error);
    return NextResponse.json({ error: "Failed to add skill" }, { status: 500 });
  }
}

// DELETE skill
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await db.delete(skills).where(eq(skills.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting skill:", error);
    return NextResponse.json(
      { error: "Failed to delete skill" },
      { status: 500 }
    );
  }
}

// PATCH update skill
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, name, iconName, category, percentage } = body;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const result = await db
      .update(skills)
      .set({
        name,
        iconName,
        category,
        percentage,
        updatedAt: new Date(),
      })
      .where(eq(skills.id, id))
      .returning();

    return NextResponse.json({ success: true, skill: result[0] });
  } catch (error) {
    console.error("Error updating skill:", error);
    return NextResponse.json(
      { error: "Failed to update skill" },
      { status: 500 }
    );
  }
}
