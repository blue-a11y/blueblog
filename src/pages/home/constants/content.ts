import { Mail } from "lucide-react";
import { SiGithub } from "react-icons/si";
import type { IHomeContent } from "@/pages/home/types/content";

// Central content config for the homepage. Update copy, commands, snippets,
// and social links here without touching the view components.
const homeContent: IHomeContent = {
  intro: "Frontend Developer crafting simple, thoughtful interfaces.",
  title: {
    text: "Hi, I'm Blue.",
    highlight: "Blue",
  },
  terminal: {
    // Left-side terminal identity and right-side rotating commands.
    prompt: "blue@dev ~",
    commands: ["> whoami", "> cd blueblog", "> pnpm dev"],
    statusLabel: "online",
  },
  code: {
    // Rotating code snippets shown in the single-line code panel.
    prompt: ">",
    snippets: [
      {
        code: "const stack = ['React', 'TypeScript', 'Tailwind', 'Vim']",
        tone: "text-blue-200",
      },
      {
        code: "const focus = 'clean code, subtle motion, great UX'",
        tone: "text-emerald-200",
      },
      {
        code: "const status = 'building, learning, iterating'",
        tone: "text-slate-300",
      },
    ],
  },
  // Social actions rendered as icon buttons below the code panel.
  socialLinks: [
    {
      icon: SiGithub,
      label: "GitHub",
      href: "https://github.com/blue-a11y",
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:xuanzhang194@gmail.com",
    },
  ],
  footer: "© Blue 2026",
};

export { homeContent };
