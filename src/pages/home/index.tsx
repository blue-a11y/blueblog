import { motion } from "framer-motion";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { Badge } from "@/components/ui/badge";
import { TechStackCarousel } from "@/components/blocks/logos3";
import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiVite,
  SiNodedotjs,
  SiGit,
  SiGithub,
  SiWebpack,
} from "react-icons/si";
import { RiCss3Fill, RiHtml5Fill } from "react-icons/ri";

const HERO_TEXTS = ["Building BlueBlog", "React Enthusiast", "Frontend Developer"];

const PERSONAL_TAGS = ["Vim爱好者", "代码洁癖症", "喜欢折腾"];

const TECH_STACK = [
  { icon: RiCss3Fill, color: "text-orange-400" },
  { icon: RiHtml5Fill, color: "text-blue-400" },
  { icon: SiReact, color: "text-sky-400" },
  { icon: SiTypescript, color: "text-blue-400" },
  { icon: SiTailwindcss, color: "text-cyan-400" },
  { icon: SiVite, color: "text-purple-400" },
  { icon: SiWebpack, color: "text-blue-400" },
  { icon: SiNodedotjs, color: "text-green-400" },
  { icon: SiGit, color: "text-orange-400" },
];

const SOCIAL_LINKS = [{ icon: SiGithub, href: "https://github.com/blue-a11y", label: "GitHub" }];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

/* ─── 子渲染区块 ─── */

const heroSection = (
  <motion.div variants={itemVariants} className="my-20 min-h-fit w-full">
    <GooeyText texts={HERO_TEXTS} textClassName="font-display text-5xl font-bold" />
  </motion.div>
);

const personalTagsSection = (
  <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-2">
    {PERSONAL_TAGS.map((tag) => {
      return (
        <Badge key={tag} variant="secondary">
          {tag}
        </Badge>
      );
    })}
  </motion.div>
);

const techStackSection = (
  <motion.div variants={itemVariants} className="w-full">
    <TechStackCarousel items={TECH_STACK} />
  </motion.div>
);

const socialLinksSection = (
  <motion.div variants={itemVariants} className="absolute bottom-10 flex items-center gap-4">
    {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => {
      return (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <Icon className="size-4" />
        </a>
      );
    })}
  </motion.div>
);

/* ─── 主组件 ─── */

const Home = () => {
  return (
    <div className="flex flex-1 justify-center pt-30">
      <motion.section
        className="flex flex-col items-center text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {personalTagsSection}
        {heroSection}
        {techStackSection}
        {socialLinksSection}
      </motion.section>
    </div>
  );
};

export default Home;
