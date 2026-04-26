import { useRef } from "react";
import { motion } from "framer-motion";
import { SplitText } from "@/components/ui/split-text";
import { TextType } from "@/components/ui/text-type";
import { homeContent } from "@/pages/home/constants/content";
import { itemVariants, pageVariants } from "@/pages/home/constants/motion";
import { Background } from "@/pages/home/views/background";
import { codeBlock } from "@/pages/home/views/code-block";
import { footer } from "@/pages/home/views/footer";
import { socialLinksSection } from "@/pages/home/views/social-links";
import { TerminalHeader } from "@/pages/home/views/terminal-header";

const intro = (
  <motion.p variants={itemVariants} className="min-h-5 font-mono text-sm text-slate-500">
    <SplitText
      text={homeContent.intro}
      delay={0.24}
      duration={0.45}
      stagger={0.016}
      splitBy="chars"
    />
  </motion.p>
);

const title = (
  <motion.h1
    variants={itemVariants}
    className="font-terminal-display mx-auto mt-7 min-h-[1.12em] max-w-3xl text-5xl text-white sm:text-7xl"
  >
    <TextType
      text={homeContent.title.text}
      initialDelay={320}
      typingSpeed={92}
      loop={false}
      cursorCharacter="_"
      cursorClassName="ml-1 text-blue-300"
      highlight={homeContent.title.highlight}
      highlightClassName="text-blue-300"
      reserveSpace
    />
  </motion.h1>
);

const divider = (
  <motion.div variants={itemVariants} className="mx-auto mt-8 h-px w-8 bg-slate-500/80" />
);

const Home = () => {
  const terminalRef = useRef<HTMLElement | null>(null);

  return (
    <motion.div
      className="relative flex min-h-svh items-center justify-center overflow-hidden px-4 py-8 text-slate-100"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <Background obstacleRef={terminalRef} />
      <motion.main
        ref={terminalRef}
        variants={itemVariants}
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
        className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/12 bg-[#090c14]/20 shadow-[0_28px_120px_rgba(0,0,0,0.52)] backdrop-blur-3xl select-none"
      >
        <TerminalHeader />
        <section className="relative px-6 py-20 text-center sm:px-10 sm:py-24">
          {intro}
          {title}
          {divider}
          {codeBlock}
          {socialLinksSection}
          {footer}
        </section>
      </motion.main>
    </motion.div>
  );
};

export default Home;
