import { db } from "@/src";
import { projects, skills, profile } from "./schema";
import { desc } from "drizzle-orm";

export async function getProjects() {
  try {
    const data = await db
      .select()
      .from(projects)
      .orderBy(desc(projects.createdAt));
    return data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function getSkills() {
  try {
    const data = await db.select().from(skills).orderBy(desc(skills.createdAt));
    return data;
  } catch (error) {
    console.error("Error fetching skills:", error);
    return [];
  }
}

export async function getProfile() {
  try {
    const data = await db.select().from(profile).limit(1);
    return data[0] || null;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
}
