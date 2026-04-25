import { motion } from "framer-motion";
import { TextType } from "@/components/ui/text-type";
import { itemVariants } from "@/pages/home/constants";

const footer = (
  <motion.p variants={itemVariants} className="mt-5 font-mono text-xs text-slate-600">
    <TextType
      text="© Blue 2026"
      initialDelay={4200}
      typingSpeed={45}
      loop={false}
      showCursor={false}
      reserveSpace
    />
  </motion.p>
);

export { footer };
