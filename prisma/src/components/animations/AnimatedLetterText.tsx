import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import { cn } from "../../lib/utils";

export function AnimatedLetterText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
  });

  const characters = text.split("");

  return (
    <p ref={containerRef} className={cn("flex flex-wrap", className)}>
      {characters.map((char, i) => {
        const start = i / characters.length - 0.1;
        const end = i / characters.length + 0.05;
        return (
          <Character
            key={i}
            char={char}
            progress={scrollYProgress}
            range={[Math.max(0, start), Math.min(1, end)]}
          />
        );
      })}
    </p>
  );
}

function Character({
  char,
  progress,
  range,
}: {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <motion.span style={{ opacity }}>
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}
