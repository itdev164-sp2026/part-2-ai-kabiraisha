"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { projectSchema } from "@/lib/schemas";
import { createSupabaseActionClient } from "@/lib/supabase/action";

const authSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  mode: z.enum(["signin", "signup"]),
});

export type AuthState = {
  success: boolean;
  message?: string;
  error?: string;
};

export async function authenticateAction(
  _previousState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const parsed = authSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    mode: formData.get("mode"),
  });

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid credentials",
    };
  }

  const supabase = await createSupabaseActionClient();
  const { email, password, mode } = parsed.data;

  if (mode === "signin") {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    redirect("/projects");
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  if (data.session) {
    redirect("/projects");
  }

  return {
    success: true,
    message: "Check your email to confirm your account.",
  };
}

export async function signOutAction() {
  const supabase = await createSupabaseActionClient();

  await supabase.auth.signOut();
  redirect("/login");
}

export async function createProject(formData: unknown) {
  try {
    const supabase = await createSupabaseActionClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        error: "You must be signed in to create a project.",
      };
    }

    // Validate with Zod schema
    const validatedData = projectSchema.parse(formData);

    // Insert into Supabase
    const { error } = await supabase.from("projects").insert([validatedData]);

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
