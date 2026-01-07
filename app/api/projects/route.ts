import { db } from "@/src";
import { projects } from "@/src/db/schema";
import { eq, desc } from "drizzle-orm";
import { NextResponse } from "next/server";

// GET all projects
export async function GET() {
  try {
    const data = await db
      .select()
      .from(projects)
      .orderBy(desc(projects.createdAt));
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST new project
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      title,
      description,
      imageUrl,
      liveUrl,
      githubUrl,
      tags,
      gallery,
      featured,
    } = body;

    if (!title || !imageUrl) {
      return NextResponse.json(
        { error: "Title and Image are required" },
        { status: 400 }
      );
    }

    const id = crypto.randomUUID();
    const result = await db
      .insert(projects)
      .values({
        id,
        title,
        description,
        imageUrl,
        liveUrl,
        githubUrl,
        tags,
        gallery: gallery ? JSON.stringify(gallery) : null,
        featured: !!featured,
      })
      .returning();

    return NextResponse.json({ success: true, project: result[0] });
  } catch (error) {
    console.error("Error adding project:", error);
    return NextResponse.json(
      { error: "Failed to add project" },
      { status: 500 }
    );
  }
}

// DELETE project
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await db.delete(projects).where(eq(projects.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}

// PATCH update project
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const {
      id,
      title,
      description,
      imageUrl,
      liveUrl,
      githubUrl,
      tags,
      gallery,
      featured,
    } = body;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const result = await db
      .update(projects)
      .set({
        title,
        description,
        imageUrl,
        liveUrl,
        githubUrl,
        tags,
        gallery: gallery
          ? typeof gallery === "string"
            ? gallery
            : JSON.stringify(gallery)
          : null,
        featured: !!featured,
        updatedAt: new Date(),
      })
      .where(eq(projects.id, id))
      .returning();

    return NextResponse.json({ success: true, project: result[0] });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}
