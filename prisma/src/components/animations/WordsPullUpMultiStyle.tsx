import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "../../lib/utils";

type Segment = {
  text: string;
  className?: string;
};

export function WordsPullUpMultiStyle({
  segments,
  className,
}: {
  segments: Segment[];
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-10%" });

  // Flatten segments into individual words, preserving class names
  const words = segments.flatMap((segment) =>
    segment.text.split(" ").filter(Boolean).map((word) => ({
      word,
      className: segment.className,
    }))
  );

  return (
    <div ref={containerRef} className={cn("inline-flex flex-wrap justify-center", className)}>
      {words.map((item, i) => (
        <span key={i} className="inline-flex overflow-hidden mr-[0.25em] mb-[0.1em]">
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{
              duration: 0.5,
              delay: i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={cn("inline-block", item.className)}
          >
            {item.word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}
