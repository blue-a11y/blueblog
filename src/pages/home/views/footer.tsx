import { motion } from "framer-motion";
import { TextType } from "@/components/ui/text-type";
import { homeContent } from "@/pages/home/constants/content";
import { itemVariants } from "@/pages/home/constants/motion";

const footer = (
  <motion.p variants={itemVariants} className="mt-5 font-mono text-xs text-slate-600">
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
