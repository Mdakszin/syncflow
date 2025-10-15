"use server";

import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "../generated/prisma";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

const createProjectSchema = z.object({
  name: z.string().min(3, "Project name must be at least 3 characters long."),
  workspaceId: z.string(),
});

export async function createProject(formData: FormData) {
  const { userId, orgId } = await auth();

  if (!userId || !orgId) {
    return { error: "You must be logged in and in an organization to create a project." };
  }

  const validatedFields = createProjectSchema.safeParse({
    name: formData.get("name"),
    workspaceId: orgId,
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.project.create({
      data: {
        id: uuidv4(),
        name: validatedFields.data.name,
        workspaceId: validatedFields.data.workspaceId,
      },
    });
  } catch (error) {
    return { error: "Database error: Failed to create project." };
  }

  revalidatePath("/dashboard"); // Refresh the dashboard to show the new project
  return { data: "Project created successfully!" };
}