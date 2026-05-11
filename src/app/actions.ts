"use server";

import { supabase } from "@/lib/supabase";
import { projectSchema } from "@/lib/schemas";

export async function createProject(formData: unknown) {
  try {
    // Validate with Zod schema
    const validatedData = projectSchema.parse(formData);

    // Insert into Supabase
    const { error } = await supabase
      .from("projects")
      .insert([validatedData]);

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      message: "Project created successfully",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }
    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
}
