import { motion } from "framer-motion";
import { TextType } from "@/components/ui/text-type";
import { homeContent } from "@/pages/home/constants/content";
import { itemVariants } from "@/pages/home/constants/motion";

const footer = (
  <motion.p variants={itemVariants} className="mt-4 font-mono text-[11px] text-slate-600 sm:mt-5 sm:text-xs">
    <TextType
      text={homeContent.footer}
      initialDelay={4200}
      typingSpeed={45}
      loop={false}
      showCursor={false}
      reserveSpace
    />
  </motion.p>
);

export { footer };
