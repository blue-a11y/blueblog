import { motion } from "framer-motion";
import { TextType } from "@/components/ui/text-type";
import { homeContent } from "@/pages/home/constants/content";
import { codeLineVariants, itemVariants } from "@/pages/home/constants/motion";

const codeTexts = homeContent.code.snippets.map(({ code }) => {
  return code;
});

const codeTones = homeContent.code.snippets.map(({ tone }) => {
  return tone;
});

const codeBlock = (
  <motion.div
    variants={itemVariants}
    className="mx-auto mt-10 w-full max-w-xl rounded-xl border border-white/10 p-4 text-left font-mono text-xs shadow-[0_18px_70px_rgba(0,0,0,0.34)] sm:text-sm"
  >
    <motion.div variants={codeLineVariants} className="grid grid-cols-[2rem_1fr] gap-3 leading-7">
      <TextType
        text={homeContent.code.prompt}
        className="text-slate-600 select-none"
        initialDelay={360}
        typingSpeed={45}
        loop={false}
        showCursor={false}
        reserveSpace
      />
      <TextType
        text={codeTexts}
        textColors={codeTones}
        initialDelay={420}
        typingSpeed={18}
        deletingSpeed={12}
        pauseDuration={3000}
        cursorCharacter="_"
        cursorClassName="ml-1 text-blue-300"
        reserveSpace
      />
    </motion.div>
  </motion.div>
);

export { codeBlock };
