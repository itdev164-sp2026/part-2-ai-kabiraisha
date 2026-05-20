# Prompting Log — ITDEV-164

## Activity 1: The AI-Native Launchpad

### Prompt 1
**What I asked:**
> (Paste the exact prompt you gave to Copilot Agent Mode)
Look at my project structure and tell me:

What framework and version am I using?
What styling solution is configured?
What components exist so far?
Then add a small "Setup verified ✓" badge to the bottom of the home page.

**What happened:**
> (Describe what the Agent did. Did it understand your intent immediately?

The agent correctly identified Next.js, React, Tailwind, postcss and existing components. It also added the setup verified badge.


### Prompt 2
**What I asked:**
> (Paste your second prompt — this could be a follow-up correction or
> a completely new request)

Look at the existing src/app/page.tsx and src/app/layout.tsx in this project.
Replace the current homepage content with a "Developer Profile" page for me.
It should include:
- My name: Aisha Kabir
- A short bio (1-2 sentences about being a web development student)
- A "Skills" section that displays at least 6 skills in a responsive
  Tailwind CSS grid (use cards with icons from lucide-react)

Keep the existing Header component and layout structure intact.
If you need to create new components, go ahead and create them in
the src/components/ folder.

**What happened:**
> (Describe the result. Did you have to "steer" the Agent?
> What did you learn about writing effective prompts?)

It did everything I asked of it except it added new components that I didn't request for. I had to redirect it and be more specific in what I requested.

### Reflection
> Write 2-3 sentences reflecting on the experience. How did it feel
> to direct an AI to build something for you? What surprised you?
> What would you do differently next time?
It felt amazing at the same time a little nerve wracking. I do not know exactly why I was nervous. Maybe it's because I sometimes prefer things a specific way and the thought of possibly having to deal with errors that I did not write in the future makes me a little nervous. Overall, I do think it will be an amazing tool for debugging codes and learning from my mistakes as a beginner. I cannot wait to use it for that specific purpose.

-------------------------------------------------------

## Activity 2: Building the Dashboard Shell

### Prompt 1

**What I asked:**

Using the shadcn sidebar components that are now in my src/components/ui/ folder,
create a professional, collapsible dashboard layout. It should include:

1. A sidebar (src/components/app-sidebar.tsx) with navigation links for:
   - Overview (use the Home icon from lucide-react)
   - Projects (use the FolderOpen icon)
   - Settings (use the Settings icon)

2. A top navigation area with breadcrumbs showing the current page.

3. A main content area that wraps the existing page content.

4. Update src/app/layout.tsx to use the new SidebarProvider and sidebar layout.

Important: Preserve the Developer Profile content from Activity 1 in
src/app/page.tsx — it should appear in the main content area of the new layout.
Keep the dark mode toggle working.

**What happened:**
The agent created a professional dashboard layout with the shadcn sidebar components. It created a new breadcrumb navigation component with the file nav-breadcrumbs.tsx and updated layout.tsx


### Prompt 2

**What I asked:**

The sidebar is not responsive on desktop. It should collapse into a sheet
(slide-out panel) that opens when clicking a trigger button. The shadcn
Sidebar component supports this with the "offcanvas" variant or by using
SidebarTrigger. Please fix the mobile behavior.

**What happened:**

The agent fixed the collapsible button and made it slide out on desktop.

### Reflection

The only error the agent made was not having the sidebar open and responsive on desktop which was an easy fix. The agent also didn't break any of my codes from activity 1.


## Activity 3: Server-Side Data with Supabase

### Prompt 1

**What I asked:**

Using the Supabase client at src/lib/supabase.ts, create a new Server Component
at src/app/projects/page.tsx that:

1. Fetches all records from the "projects" table in Supabase
2. Displays them in a professional layout using shadcn/ui Card components
   (run `npx shadcn@latest add card` if needed)
3. Each card should show the project title, description, and a status badge
4. The status badge should be color-coded:
   - "active" = green
   - "completed" = blue
   - "archived" = gray

Use @workspace context to match the styling of our existing Dashboard.
This must be a React Server Component (async function, no "use client").
Do NOT use useEffect or useState for data fetching.

**What happened:**

> (Did the Agent create a Server Component or a Client Component?
The agent created a server component file that fetches projects and renders shadcn card components. It also added a shadcn card component to the project and matched the dashboard's existing layout patterns. It added a color coded status on each new card in the project page.
> Did it use async/await or useEffect? Did you have to correct it?)
The Agent used an asynchronous function in page.tsx but did not use useEffect or useState.

### Prompt 2
**What I asked:**

The breadcrumb in src/app/layout.tsx always shows "Overview" because the page
name is hardcoded. Extract the breadcrumb into its own client component at
src/components/breadcrumb-nav.tsx that uses usePathname() from next/navigation
to display the correct page name. Map "/" to "Overview", "/projects" to
"Projects", and "/settings" to "Settings". Keep "ITDEV-164" as the first
breadcrumb segment. Then update layout.tsx to use the new component.


**What happened:**

The agent replaced the hardcoded breadcrumb with a pathname-aware client component in nav-breadcrumbs.tsx. It then updated layout.tsx by removing the old hardcoded breadcrumb component and replaced it with importing the new component in layout.tsx

### Reflection

Server-side data fetching feels much cleaner and more direct than the useEffect pattern from Web Programming 1. Instead of loading the page first and then fetching the data after, the App Router lets the data be fetched before the page renders. The biggest advantage I noticed is that there is less code to write because I did not need useState, useEffect, or a separate loading pattern just to display the projects. It also made the page feel more organized because the Supabase query stayed directly inside the server component where the data was being used. What surprised me most was how simple it was to use async/await right inside page.tsx and still render a professional page without needing to turn it into a client component.


## Activity 4: AI-Driven Forms & Validation

### Prompt 1

**What I asked:**

Create a Zod validation schema in a new file src/lib/schemas.ts for a "Project"
with the following fields:

- title: string, minimum 3 characters, with a custom error message
  "Title must be at least 3 characters"
- description: string, minimum 10 characters, with a custom error message
  "Description must be at least 10 characters"
- status: enum with values "active", "completed", "archived"

Export the schema and also export the inferred TypeScript type using z.infer.

**What happened:**

The Agent created the schema correctly in src/lib/schemas.ts. It added a projectSchema with the correct validation rules and custom error messages. It also exported the inferred TypeScript type using z.infer, so the schema can be reused for type safety.

### Prompt 2

**What I asked:**

Using the Zod schema from src/lib/schemas.ts, do the following:

1. Create a form component at src/components/project-form.tsx that:
   - Is a Client Component ("use client") because it uses react-hook-form hooks
   - Uses react-hook-form with the zodResolver from @hookform/resolvers for validation
   - Uses shadcn/ui Field, FieldLabel, and FieldError for field layout
   - Uses shadcn/ui Input for title, Textarea for description, and Select for status
   - Shows inline error messages under each field when validation fails
   - Has a "Create Project" submit button
   - Shows a sonner toast notification on successful submission

2. Create a Server Action at src/app/actions.ts that:
   - Has "use server" at the top of the file
   - Accepts the validated form data
   - Validates it again with the Zod schema using projectSchema
   - Inserts the validated data into the Supabase "projects" table
   - Returns a success or error response

3. Create a new page at src/app/projects/new/page.tsx that renders
   the project form within the dashboard layout.

4. Add a "New Project" button to the existing projects page
   src/app/projects/page.tsx that links to /projects/new.

Use @workspace to match the existing project styling.

**What happened:**

The Agent handled creating multiple files well. It created src/components/project-form.tsx, src/app/actions.ts, and src/app/projects/new/page.tsx. It also updated the existing projects page to include a “New Project” button linking to /projects/new. The form submission was connected to the Server Action correctly, and the Server Action included "use server" at the top with server-side Zod validation using the project schema.



### Reflection

The Schema-First approach with Zod makes forms feel way more organized to me because everything is defined in one place instead of having validation logic all over the app. I like that the same schema can be reused for both the form and the Server Action, so there’s less repetition and less chance of mistakes. It helps prevent junk data from getting into the database because the data gets validated twice; once on the client side before submission and again on the server before it gets inserted into Supabase. In previous courses, validation was mostly just HTML required fields or manual JavaScript checks, which felt easier to miss or bypass. Using Zod feels cleaner, more professional, and a lot more secure.



 ## Activity 5: Securing the App with Supabase Auth

### Prompt 1

Implement a complete email/password authentication flow for this Next.js 15
App Router project using @supabase/ssr. Here is what I need:

1. SUPABASE CLIENTS: Create server-side Supabase client utilities in
   src/lib/supabase/ that work correctly with Next.js cookies. I need
   separate clients for Server Components, Server Actions, and Middleware.

2. LOGIN PAGE: Create a page at src/app/(auth)/login/page.tsx with a
   shadcn/ui card-based login form. It should support both "Sign In"
   and "Sign Up" (toggle between them or use tabs). Handle the auth
   via Server Actions, not client-side fetch.

3. MIDDLEWARE: Create a middleware.ts file at src/middleware.ts (next to
   the app directory — Next.js looks for middleware as a sibling of app)
   that:
   - Refreshes the user's auth session on every request
   - Protects the /projects routes — redirect unauthenticated users to /login
   - Allows unauthenticated access to /login
   - Uses supabase.auth.getUser() (NOT getSession()) for verification

4. SIGN OUT: Add a "Sign Out" button to the existing sidebar component
   (src/components/app-sidebar.tsx) that calls a Server Action to sign
   the user out and redirect to /login. The button must only render
   when an authenticated user is present — pass the user as a prop from
   the root layout (which will need to fetch it via the server Supabase
   client) and gate the Sign Out UI on that prop.

5. UPDATE DATA QUERIES: Modify the projects page and the create-project
   Server Action to use the authenticated Supabase client so that RLS
   policies filter data per user.

Use @workspace to understand the existing project structure. Do not remove or break existing functionality — integrate auth around it.


**What happened:**

The Agent implemented the Supabase authentication setup across the app. It created helper files for authenticated Supabase access in src/lib/supabase/server.ts, src/lib/supabase/action.ts, and src/lib/supabase/middleware.ts, then connected the middleware through src/middleware.ts. It also added the login flow by creating a login page and login form component. The sidebar was updated with sign-out functionality using a Server Action from src/app/actions.ts. The dashboard layout was updated to fetch the authenticated user, and the projects page now uses the authenticated Supabase client so Row Level Security can filter projects per user automatically.



### Reflection

The Agent handled middleware.ts by creating the middleware helper files first, then adding the main src/middleware.ts file to connect everything together. I did not have to manually add every file to the Working Set because the Agent was able to look through the project and find the files it needed for context. What surprised me was how many different files had to change just to add authentication. It was not only a login page. It also needed Supabase helper files, middleware, server actions, the layout, the sidebar, and the projects page. Middleware-based auth feels cleaner than checking login status inside every page component because it handles authentication before the page loads. Instead of repeating the same login check on every page, the middleware helps protect routes in one central place. It makes the app feel more organized and more secure.


## Activity 6: Deployment, Webhooks, & AI-Testing

### Prompt 1

**What I asked:**

I have a Next.js app with Supabase Auth. Using @workspace context to
understand the app structure, write an End-to-End (E2E) test file at
tests/auth.spec.ts using Playwright.

The tests should verify:

1. LOGIN PAGE VISIBLE: Navigate to /login and confirm the login form
   is visible (check for email input, password input, and submit button).

2. REDIRECT AFTER LOGIN: After a successful login with valid credentials,
   the user is redirected to the dashboard or projects page.

3. SIDEBAR NAVIGATION: After login, verify that the sidebar navigation
   links are visible: "Overview", "Projects", and "Settings".

Requirements:
- Use role-based locators (getByRole, getByLabel, getByText) instead of
  CSS selectors or test IDs. This makes tests more accessible and resilient
  to UI changes.
- Add clear test descriptions that explain what each test verifies.
- Handle the async nature of navigation and page loads with proper
  Playwright waiting strategies.
- Read test credentials from process.env.TEST_USER_EMAIL and
  process.env.TEST_USER_PASSWORD. Do not hardcode credentials. If those
  variables are not set, the credentialed tests should skip with a clear
  message rather than fail.

**What happened:**
The Agent created the Playwright test file and used role-based locators like I asked. It understood that the app used Supabase Auth and that the login credentials should come from process.env.TEST_USER_EMAIL and process.env.TEST_USER_PASSWORD instead of being hardcoded. The tests did not fully pass on the first run because the “Projects” link matched more than one element on the page.

### Prompt 2

**What I asked:**

This Playwright test is failing with the following error:
 2) tests/auth.spec.ts:38:7 › Supabase auth flow › shows Overview, Projects, and Settings links in the sidebar after login 

    Error: expect(locator).toBeVisible() failed

    Locator: getByRole('link', { name: 'Projects' })
    Expected: visible
    Error: strict mode violation: getByRole('link', { name: 'Projects' }) resolved to 2 elements:
        1) <a href="/projects" data-active="true" data-size="default" data-sidebar="menu-button" data-slot="sidebar-menu-button" class="peer/menu-button group/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left ring-sidebar-ring outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-fore…>…</a> aka locator('ul').getByRole('link', { name: 'Projects' })
        2) <span role="link" aria-current="page" aria-disabled="true" data-slot="breadcrumb-page" class="font-normal text-foreground">Projects</span> aka getByLabel('breadcrumb').getByRole('link', { name: 'Projects' })

Look at the actual component code in @workspace and fix the test
to match the real UI. Use role-based locators

**What happened:**

The Agent used the error message and the workspace context to understand that the locator was too broad. It fixed the test by making the locator more specific to the sidebar instead of matching the breadcrumb too. It only took one follow-up round to identify the issue and adjust the test so it matched the real UI better.

### Reflection

Having AI write and run tests makes me feel more confident about hitting the deploy button because it checks important user flows before I assume everything works. It is helpful because the Agent can test things I might forget to click through manually, like whether the login page renders correctly, whether login redirects properly, and whether the sidebar navigation appears after login. The Agent also caught an issue I probably would have missed at first, which was that the test was finding two “Projects” links because one was in the sidebar and one was in the breadcrumb. Manually testing in the browser can confirm that something looks right, but automated tests are better because they can repeat the same checks every time. It made deployment feel less like guessing and more like verifying.

### Course Reflection

Looking back from Activity 1 to Activity 6, I can tell my prompting strategy became a lot more intentional and detailed. In the beginning, I was giving broad prompts and hoping the Agent would understand exactly what I meant. Sometimes it did, but other times it added things I did not want or structured things differently than I imagined. That taught me quickly that the quality of the result depends heavily on how specific I am. 
As the activities went on, I started including exact file paths, frameworks, component requirements, validation rules, and even instructions like “do not use useEffect” or “use role-based locators.” I also became better at using the workspace context and pasting full terminal errors instead of just saying something was broken. By the time I got to authentication and Playwright testing, I noticed I was thinking more like a developer and less like someone just asking AI to “build something.”
One thing that really surprised me was how much I still needed to understand the code even when the AI generated most of it. At first, I thought AI coding tools would feel almost like magic, but I realized pretty quickly that if I do not understand what the code is doing, debugging becomes stressful. That nervousness I mentioned in Activity 1 actually helped me stay careful and pay attention to the architecture instead of blindly accepting everything.
The most important thing I learned is that AI coding tools are strongest when they are used as collaborators instead of replacements for learning. The Agent helped me move faster, but I still needed to review the logic, understand the flow, and guide it toward the result I actually wanted. I also learned that debugging with AI is one of the most valuable parts because I could paste real errors, ask follow-up questions, and learn from the fixes in real time.
