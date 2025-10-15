import { auth } from "@clerk/nextjs/server";
import { PrismaClient, Project } from "../../lib/generated/prisma"; // <-- 1. IMPORT the Project type
import { CreateProjectButton } from "@/components/create-project-button";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function DashboardPage() {
  const { orgId } = await auth();

  if (!orgId) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold">Welcome to Syncflow</h1>
        <p className="mt-4">
          Please select or create a workspace to get started.
        </p>
      </div>
    );
  }

  const projects = await prisma.project.findMany({
    where: {
      workspaceId: orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>
        <CreateProjectButton />
      </div>

      {projects.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* ▼▼▼ 2. APPLY the type here ▼▼▼ */}
          {projects.map((project: Project) => (
            <Link href={`/project/${project.id}`} key={project.id}>
              <div className="border rounded-lg p-4 h-32 hover:shadow-md transition-shadow">
                <h3 className="font-semibold">{project.name}</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  {/* You now get autocomplete for other properties! */}
                  Created on: {project.createdAt.toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-8 text-center border-2 border-dashed rounded-lg p-12">
          <h2 className="text-xl font-medium">No projects yet!</h2>
          <p className="text-muted-foreground mt-2">
            Get started by creating your first project.
          </p>
        </div>
      )}
    </div>
  );
}