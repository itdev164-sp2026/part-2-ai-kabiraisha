import { expect, test, type Page } from "@playwright/test";

const testUserEmail = process.env.TEST_USER_EMAIL;
const testUserPassword = process.env.TEST_USER_PASSWORD;

async function signInWithValidCredentials(page: Page) {
  await page.goto("/login", { waitUntil: "domcontentloaded" });

  // Ensure the form is in Sign In mode before submitting credentials.
  await page.getByRole("button", { name: /^Sign In$/ }).first().click();

  await page.getByLabel("Email").fill(testUserEmail!);
  await page.getByLabel("Password").fill(testUserPassword!);

  await page.getByRole("button", { name: /^Sign In$/ }).nth(1).click();
}

test.describe("Supabase auth flow", () => {
  test("shows the login form with email, password, and submit controls", async ({ page }) => {
    await page.goto("/login", { waitUntil: "domcontentloaded" });

    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(page.getByRole("button", { name: /^Sign In$/ }).nth(1)).toBeVisible();
  });

  test("redirects to the dashboard/projects route after successful login", async ({ page }) => {
    test.skip(
      !testUserEmail || !testUserPassword,
      "Skipping: set TEST_USER_EMAIL and TEST_USER_PASSWORD to run login tests."
    );

    await signInWithValidCredentials(page);

    await expect(page).toHaveURL(/\/(projects)?$/);
  });

  test("shows Overview, Projects, and Settings links in the sidebar after login", async ({ page }) => {
    test.skip(
      !testUserEmail || !testUserPassword,
      "Skipping: set TEST_USER_EMAIL and TEST_USER_PASSWORD to run login tests."
    );

    await signInWithValidCredentials(page);
    await expect(page).toHaveURL(/\/(projects)?$/);

    // The app may render multiple elements with the text "Projects" (breadcrumb + nav).
    // Scope to the first matching link in DOM (sidebar link) to avoid strict-mode ambiguity.
    await expect(page.getByRole("link", { name: "Overview" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Projects" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Settings" }).first()).toBeVisible();
  });
});
