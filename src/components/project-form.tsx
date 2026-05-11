"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { projectSchema, type Project } from "@/lib/schemas";
import { createProject } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

export function ProjectForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Project>({
    resolver: zodResolver(projectSchema),
  });

  const status = watch("status");

  const onSubmit = async (data: Project) => {
    const result = await createProject(data);

    if (result.success) {
      toast.success(result.message);
      // Reset form or redirect
    } else {
      toast.error(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Title Field */}
      <Field>
        <FieldLabel>Title</FieldLabel>
        <FieldContent>
          <Input
            {...register("title")}
            placeholder="Enter project title"
            aria-invalid={!!errors.title}
          />
          {errors.title && (
            <FieldError>{errors.title.message}</FieldError>
          )}
        </FieldContent>
      </Field>

      {/* Description Field */}
      <Field>
        <FieldLabel>Description</FieldLabel>
        <FieldContent>
          <Textarea
            {...register("description")}
            placeholder="Enter project description"
            aria-invalid={!!errors.description}
          />
          {errors.description && (
            <FieldError>{errors.description.message}</FieldError>
          )}
        </FieldContent>
      </Field>

      {/* Status Field */}
      <Field>
        <FieldLabel>Status</FieldLabel>
        <FieldContent>
          <Select value={status || ""} onValueChange={(value) => setValue("status", value as "active" | "completed" | "archived")}>
            <SelectTrigger aria-invalid={!!errors.status}>
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
          {errors.status && (
            <FieldError>{errors.status.message}</FieldError>
          )}
        </FieldContent>
      </Field>

      {/* Submit Button */}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create Project"}
      </Button>
    </form>
  );
}
