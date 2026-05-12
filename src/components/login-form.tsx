"use client";

import { useActionState, useState } from "react";

import { authenticateAction, type AuthState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const initialState: AuthState = { success: false };

export function LoginForm() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [state, formAction, pending] = useActionState(
    authenticateAction,
    initialState
  );

  return (
    <Card className="border-border/70 bg-card shadow-sm">
      <CardHeader className="space-y-3">
        <div className="inline-flex rounded-full border border-border bg-muted/70 px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Authentication
        </div>
        <div className="space-y-2">
          <CardTitle className="text-2xl tracking-tight">
            {mode === "signin" ? "Sign In" : "Sign Up"}
          </CardTitle>
          <CardDescription className="text-sm leading-6">
            {mode === "signin"
              ? "Use your email and password to access your dashboard."
              : "Create an account to start saving projects under your session."}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 rounded-lg border border-border bg-muted p-1">
          <Button
            type="button"
            variant={mode === "signin" ? "secondary" : "ghost"}
            className="w-full"
            onClick={() => setMode("signin")}
          >
            Sign In
          </Button>
          <Button
            type="button"
            variant={mode === "signup" ? "secondary" : "ghost"}
            className="w-full"
            onClick={() => setMode("signup")}
          >
            Sign Up
          </Button>
        </div>

        {state?.error ? (
          <p className="rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive">
            {state.error}
          </p>
        ) : state?.message ? (
          <p className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-400">
            {state.message}
          </p>
        ) : null}

        <form action={formAction} className="space-y-4">
          <input type="hidden" name="mode" value={mode} />

          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <FieldContent>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
              />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <FieldContent>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                placeholder="Enter your password"
                required
              />
            </FieldContent>
          </Field>

          <Button type="submit" className="w-full" disabled={pending}>
            {pending
              ? mode === "signin"
                ? "Signing in..."
                : "Signing up..."
              : mode === "signin"
                ? "Sign In"
                : "Sign Up"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
