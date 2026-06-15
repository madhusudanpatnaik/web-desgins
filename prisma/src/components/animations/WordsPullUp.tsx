import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "../../lib/utils";

export function WordsPullUp({
  text,
  className,
  showAsterisk = false,
}: {
  text: string;
  className?: string;
  showAsterisk?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-10%" });
  const words = text.split(" ");

  return (
    <div ref={containerRef} className={cn("inline-flex flex-wrap", className)}>
      {words.map((word, i) => (
        <span key={i} className="inline-flex overflow-hidden mr-[0.25em] last:mr-0">
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{
              duration: 0.5,
              delay: i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block relative"
          >
            {word}
            {showAsterisk && i === words.length - 1 && (
              <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</span>
            )}
          </motion.span>
        </span>
      ))}
    </div>
  );
}
