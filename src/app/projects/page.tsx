import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ProjectRecord = {
  id: string | number;
  title: string | null;
  description: string | null;
  status: string | null;
};

const statusStyles: Record<string, string> = {
  active: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  completed: "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-400",
  archived: "border-muted-foreground/20 bg-muted text-muted-foreground",
};

function formatStatus(status: string | null) {
  return status ? status.charAt(0).toUpperCase() + status.slice(1) : "Unknown";
}

export default async function ProjectsPage() {
  const { data, error } = await supabase
    .from("projects")
    .select("id, title, description, status");

  if (error) {
    throw new Error(`Failed to load projects: ${error.message}`);
  }

  const projects = (data ?? []) as ProjectRecord[];

  return (
    <div className="space-y-8">
      <section className="space-y-3 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="inline-flex rounded-full border border-border bg-muted/70 px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Projects
        </div>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Project Portfolio
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              A server-rendered view of the latest records from Supabase,
              arranged in a clean dashboard grid.
            </p>
          </div>
          <Link href="/projects/new">
            <Button className="whitespace-nowrap">New Project</Button>
          </Link>
        </div>
      </section>

      {projects.length === 0 ? (
        <Card className="border-dashed bg-background/70 shadow-sm">
          <CardContent className="py-14 text-center">
            <p className="text-sm font-medium text-foreground">No projects found</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Add rows to the <span className="font-medium">projects</span> table to see them here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => {
            const statusKey = (project.status ?? "").toLowerCase();
            const badgeClassName = cn(
              "inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-xs font-semibold capitalize",
              statusStyles[statusKey] ?? "border-border bg-muted text-muted-foreground"
            );

            return (
              <Card
                key={project.id}
                className="group border-border/70 bg-card shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
              >
                <CardHeader className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <CardTitle className="text-xl tracking-tight">
                        {project.title ?? "Untitled project"}
                      </CardTitle>
                      <CardDescription className="text-sm leading-6">
                        {project.description ?? "No description provided."}
                      </CardDescription>
                    </div>

                    <span className={badgeClassName}>
                      {formatStatus(project.status)}
                    </span>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
