import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

type ISplitTextProps = {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  splitBy?: "chars" | "words";
};

const SplitText = ({
  text,
  className,
  delay = 0,
  duration = 0.5,
  stagger = 0.03,
  splitBy = "chars",
}: ISplitTextProps) => {
  const parts =
    splitBy === "words"
      ? text.split(" ").map((word, index, array) => {
          return index === array.length - 1 ? word : `${word} `;
        })
      : Array.from(text);

  return (
    <motion.span
      className={cn("inline-block whitespace-pre-wrap", className)}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: stagger,
          },
        },
      }}
    >
      {parts.map((part, index) => {
        return (
          <motion.span
            key={`${part}-${index}`}
            className="inline-block"
            variants={{
              hidden: {
                opacity: 0,
                y: 10,
                filter: "blur(6px)",
              },
              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: {
                  duration,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            {part === " " ? "\u00A0" : part}
          </motion.span>
        );
      })}
    </motion.span>
  );
};

export { SplitText };
