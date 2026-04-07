import {
  Code2,
  Figma,
  GitBranch,
  Globe,
  LayoutGrid,
  Smartphone,
} from "lucide-react";

const skills = [
  {
    title: "HTML & CSS",
    description: "Building semantic, accessible interfaces with solid layout fundamentals.",
    icon: Globe,
  },
  {
    title: "JavaScript",
    description: "Writing interactive front-end features and understanding core language patterns.",
    icon: Code2,
  },
  {
    title: "React",
    description: "Creating component-based user interfaces with modern React development workflows.",
    icon: LayoutGrid,
  },
  {
    title: "Responsive Design",
    description: "Designing pages that adapt cleanly across mobile, tablet, and desktop screens.",
    icon: Smartphone,
  },
  {
    title: "Tailwind CSS",
    description: "Styling quickly with utility classes while keeping layouts consistent and maintainable.",
    icon: Figma,
  },
  {
    title: "Git & GitHub",
    description: "Tracking changes, collaborating on projects, and managing source control confidently.",
    icon: GitBranch,
  },
];

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="inline-flex rounded-full border border-border bg-muted/70 px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Developer Profile
        </div>
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Aisha Kabir
          </h1>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            I am a web development student learning how to build thoughtful,
            responsive user experiences with modern frontend tools. I enjoy
            turning ideas into clean interfaces and improving my skills through
            hands-on projects.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Skills</h2>
          <p className="text-sm text-muted-foreground">
            A snapshot of the tools and workflows I am building with.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <article
              key={skill.title}
              className="group rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-primary/10">
                <skill.icon className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-base font-semibold leading-tight">{skill.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {skill.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
