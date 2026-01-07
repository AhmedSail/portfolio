import { db } from "@/src";
import { profile } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// GET profile (returns the first/only profile)
export async function GET() {
  try {
    const data = await db.select().from(profile).limit(1);
    return NextResponse.json(data[0] || {});
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

// POST or PATCH profile (upsert)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const existing = await db.select().from(profile).limit(1);

    if (existing.length > 0) {
      // Update
      const result = await db
        .update(profile)
        .set({
          ...body,
          updatedAt: new Date(),
        })
        .where(eq(profile.id, existing[0].id))
        .returning();
      return NextResponse.json({ success: true, profile: result[0] });
    } else {
      // Insert
      const id = crypto.randomUUID();
      const result = await db
        .insert(profile)
        .values({
          id,
          ...body,
        })
        .returning();
      return NextResponse.json({ success: true, profile: result[0] });
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
