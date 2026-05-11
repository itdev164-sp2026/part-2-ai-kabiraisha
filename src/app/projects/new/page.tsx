import { ProjectForm } from "@/components/project-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NewProjectPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-3 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="inline-flex rounded-full border border-border bg-muted/70 px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          New Project
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Create a New Project
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            Add a new project to your portfolio. Fill in the details below and
            submit to get started.
          </p>
        </div>
      </section>

      <Card className="border-border/70 bg-card shadow-sm">
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
          <CardDescription>
            Enter the information for your new project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProjectForm />
        </CardContent>
      </Card>
    </div>
  );
}
