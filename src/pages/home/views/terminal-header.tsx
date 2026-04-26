import { motion } from "framer-motion";
import { TextType } from "@/components/ui/text-type";
import { homeContent } from "@/pages/home/constants/content";

const TerminalHeader = () => {
  return (
    <div className="relative flex items-center justify-between gap-3 overflow-hidden border-b border-white/10 px-4 py-3 font-mono text-[11px] text-slate-500 sm:gap-4 sm:px-5 sm:py-4 sm:text-xs">
      <motion.div
        className="pointer-events-none absolute bottom-0 left-0 h-px w-1/5 rounded-full bg-linear-to-r from-blue-300/10 via-blue-300/80 to-blue-300/10 opacity-75"
        animate={{ x: ["0%", "400%", "0%"] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="flex items-center gap-2">
        <motion.span
          className="size-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.7)]"
          animate={{ opacity: [0.45, 1, 0.45], scale: [0.85, 1.15, 0.85] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <TextType
          text={homeContent.terminal.prompt}
          initialDelay={80}
          typingSpeed={42}
          loop={false}
          showCursor={false}
          highlight="blue"
          highlightClassName="text-emerald-300"
          reserveSpace
        />
      </div>
      <span className="min-w-20 text-right sm:min-w-28">
        <TextType
          text={homeContent.terminal.commands}
          typingSpeed={70}
          deletingSpeed={35}
          pauseDuration={1600}
          cursorCharacter="_"
          cursorClassName="ml-1 text-blue-300"
        />
      </span>
    </div>
  );
};

export { TerminalHeader };
