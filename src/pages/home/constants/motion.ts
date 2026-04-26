import type { Variants } from "framer-motion";

// Page-level stagger so the hero pieces arrive with a soft terminal-like cadence.
const pageVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

// Shared fade/slide treatment for main content blocks on first paint.
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

// Slightly tighter motion for the code panel so it feels responsive.
const codeLineVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.34, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

export {
  codeLineVariants,
  itemVariants,
  pageVariants,
};
