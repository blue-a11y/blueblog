import type { ComponentType } from "react";
import { Mail, MessageCircle } from "lucide-react";
import { SiGithub } from "react-icons/si";

type ICodeLine = {
  code: string;
  tone: string;
};

type ISocialLink = {
  icon: ComponentType<{ className?: string }>;
  label: string;
  href: string;
};

const commands = ["> whoami", "> cat profile.ts", "> pnpm dev"];

const codeLines: ICodeLine[] = [
  {
    code: "const stack = ['React', 'TypeScript', 'Motion', 'Vim']",
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
];

const codeTexts = codeLines.map(({ code }) => {
  return code;
});

const codeTones = codeLines.map(({ tone }) => {
  return tone;
});

const socialLinks: ISocialLink[] = [
  {
    icon: SiGithub,
    label: "GitHub",
    href: "https://github.com/blue-a11y",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:hello@example.com",
  },
  {
    icon: MessageCircle,
    label: "Chat",
    href: "mailto:hello@example.com",
  },
];

const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

const codeLineVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.34, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

export {
  codeLines,
  codeLineVariants,
  codeTexts,
  codeTones,
  commands,
  itemVariants,
  pageVariants,
  socialLinks,
};
