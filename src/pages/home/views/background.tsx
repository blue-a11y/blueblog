import { motion } from "framer-motion";

const background = (
  <div className="pointer-events-none fixed inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-[#080b11]" />
    <motion.div
      className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(37,99,235,0.13),transparent_34%)]"
      animate={{ opacity: [0.75, 1, 0.75], scale: [1, 1.04, 1] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.035)_1px,transparent_1px)] bg-size-[36px_36px] opacity-70"
      animate={{ backgroundPosition: ["0px 0px", "36px 36px"] }}
      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
    />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(8,11,17,0.86)_72%)]" />
  </div>
);

export { background };
