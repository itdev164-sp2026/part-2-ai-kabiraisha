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