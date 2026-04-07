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
