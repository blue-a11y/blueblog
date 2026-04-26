import { motion } from "framer-motion";
import { homeContent } from "@/pages/home/constants/content";
import { itemVariants } from "@/pages/home/constants/motion";

const socialLinksSection = (
  <motion.div variants={itemVariants} className="mt-10 flex items-center justify-center gap-3">
    {homeContent.socialLinks.map(({ icon: Icon, href, label }) => {
      return (
        <a
          key={label}
          href={href}
          aria-label={label}
          target="_blank"
          className="group inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/3 text-slate-500 transition-colors hover:border-blue-300/40 hover:bg-blue-300/10 hover:text-blue-100 focus-visible:ring-2 focus-visible:ring-blue-400/60 focus-visible:outline-none"
        >
          <Icon className="size-4 transition-transform group-hover:-translate-y-0.5" />
        </a>
      );
    })}
  </motion.div>
);

export { socialLinksSection };
