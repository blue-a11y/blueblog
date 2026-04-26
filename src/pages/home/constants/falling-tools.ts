import {
  SiCodeblocks,
  SiCss,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiNeovim,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVim,
  SiVite,
  SiZedindustries,
} from "react-icons/si";
import type { IFallingTool } from "@/pages/home/types/background";

// Background physics icons. Update this list to control exactly which tools
// appear in the falling layer behind the terminal.
const fallingToolItems: readonly IFallingTool[] = [
  { label: "HTML", icon: SiHtml5, accentClassName: "text-orange-300" },
  { label: "CSS", icon: SiCss, accentClassName: "text-sky-300" },
  { label: "JavaScript", icon: SiJavascript, accentClassName: "text-yellow-200" },
  { label: "TypeScript", icon: SiTypescript, accentClassName: "text-blue-300" },
  { label: "React", icon: SiReact, accentClassName: "text-cyan-300" },
  { label: "Tailwind", icon: SiTailwindcss, accentClassName: "text-sky-300" },
  { label: "Vite", icon: SiVite, accentClassName: "text-violet-300" },
  { label: "Node.js", icon: SiNodedotjs, accentClassName: "text-emerald-300" },
  { label: "Git", icon: SiGit, accentClassName: "text-orange-300" },
  { label: "Vim", icon: SiVim, accentClassName: "text-emerald-300" },
  { label: "Neovim", icon: SiNeovim, accentClassName: "text-green-300" },
  { label: "VS Code", icon: SiCodeblocks, accentClassName: "text-blue-200" },
  { label: "Zed", icon: SiZedindustries, accentClassName: "text-slate-100" },
  { label: "Neovide", icon: SiNeovim, accentClassName: "text-indigo-200" },
];

export { fallingToolItems };
