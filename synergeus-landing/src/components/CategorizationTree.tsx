import { forwardRef, useLayoutEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const NodeA = forwardRef<HTMLDivElement, { children: React.ReactNode; delay: number; isInView: boolean }>(
  ({ children, delay, isInView }, ref) => (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
      className="font-serif italic whitespace-nowrap inline-block"
      style={{
        borderRadius: 9999,
        border: "1px solid rgba(255,255,255,0.25)",
        background: "rgba(255,255,255,0.10)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        padding: "10px 20px",
        fontSize: 16,
        color: "#fff",
      }}
    >
      {children}
    </motion.div>
  )
);

const NodeB = forwardRef<HTMLDivElement, { children: React.ReactNode; delay: number; isInView: boolean }>(
  ({ children, delay, isInView }, ref) => (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
      className="font-heading inline-block"
      style={{
        borderRadius: 12,
        background: "rgba(255,255,255,0.92)",
        padding: "10px 16px",
        fontSize: 12,
        fontWeight: 400,
        color: "rgba(0,0,0,0.75)",
        lineHeight: 1.5,
        maxWidth: 160,
        textAlign: "center",
      }}
    >
      {children}
    </motion.div>
  )
);

interface TreeConnection {
  from: string;
  to: string;
  delay: number;
}

const CONNECTIONS: TreeConnection[] = [
  { from: "root", to: "transport", delay: 0.25 },
  { from: "root", to: "entertainment", delay: 0.4 },
  { from: "transport", to: "transportDetail", delay: 0.6 },
  { from: "entertainment", to: "entertainmentDetail", delay: 0.78 },
  { from: "root", to: "bills", delay: 0.95 },
  { from: "bills", to: "billsDetail", delay: 1.15 },
];

export function CategorizationTree() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const nodesRef = useRef<Record<string, HTMLDivElement | null>>({});
  const [measurements, setMeasurements] = useState<{
    width: number;
    height: number;
    coords: Record<string, { topX: number; topY: number; botX: number; botY: number }>;
  }>({ width: 0, height: 0, coords: {} });

  const measure = () => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newCoords: Record<string, { topX: number; topY: number; botX: number; botY: number }> = {};

    Object.keys(nodesRef.current).forEach((key) => {
      const node = nodesRef.current[key];
      if (node) {
        const rect = node.getBoundingClientRect();
        newCoords[key] = {
          topX: rect.left - containerRect.left + rect.width / 2,
          topY: rect.top - containerRect.top,
          botX: rect.left - containerRect.left + rect.width / 2,
          botY: rect.bottom - containerRect.top,
        };
      }
    });

    setMeasurements({
      width: containerRect.width,
      height: containerRect.height,
      coords: newCoords,
    });
  };

  useLayoutEffect(() => {
    measure();
    const resizeObserver = new ResizeObserver(() => measure());
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    window.addEventListener("resize", measure);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);



  return (
    <div
      ref={containerRef}
      className="absolute flex flex-col items-center"
      style={{ top: 32, left: 16, right: 16, bottom: 110, zIndex: 2, gap: 18 }}
    >
      <div style={{ zIndex: 2 }} className="flex flex-col items-center gap-[18px]">
        {/* Row 1 */}
        <div>
          <NodeA ref={(el) => (nodesRef.current["root"] = el)} delay={0} isInView={isInView}>
            Categorization
          </NodeA>
        </div>

        {/* Row 2 */}
        <div className="flex gap-4">
          <NodeA ref={(el) => (nodesRef.current["transport"] = el)} delay={0.18} isInView={isInView}>
            Transportation
          </NodeA>
          <NodeA ref={(el) => (nodesRef.current["entertainment"] = el)} delay={0.36} isInView={isInView}>
            Entertainment
          </NodeA>
        </div>

        {/* Row 3 */}
        <div className="flex gap-4 items-start">
          <NodeB ref={(el) => (nodesRef.current["transportDetail"] = el)} delay={0.54} isInView={isInView}>
            Fuel, rides, car maintenance, public transit
          </NodeB>
          <NodeB ref={(el) => (nodesRef.current["entertainmentDetail"] = el)} delay={0.72} isInView={isInView}>
            Streaming services, gaming, events
          </NodeB>
        </div>

        {/* Row 4 */}
        <div>
          <NodeA ref={(el) => (nodesRef.current["bills"] = el)} delay={0.9} isInView={isInView}>
            Bills and Utilities
          </NodeA>
        </div>

        {/* Row 5 */}
        <div>
          <NodeB ref={(el) => (nodesRef.current["billsDetail"] = el)} delay={1.08} isInView={isInView}>
            Electricity, water, gas, internet, phone
          </NodeB>
        </div>
      </div>

      {/* SVG Connections Layer */}
      {measurements.width > 0 && isInView && (
        <svg
          className="absolute top-0 left-0 pointer-events-none"
          width={measurements.width}
          height={measurements.height}
          style={{ zIndex: 1 }}
        >
          {CONNECTIONS.map((conn, i) => {
            const fromCoords = measurements.coords[conn.from];
            const toCoords = measurements.coords[conn.to];
            if (!fromCoords || !toCoords) return null;

            const x1 = fromCoords.botX;
            const y1 = fromCoords.botY;
            const x2 = toCoords.topX;
            const y2 = toCoords.topY;
            const midY = (y1 + y2) / 2;
            const pathData = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;

            return (
              <g key={i}>
                <motion.path
                  id={`tree-path-${i}`}
                  d={pathData}
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth="1"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: conn.delay }}
                />
                <motion.circle
                  cx={x2}
                  cy={y2}
                  r="2.5"
                  fill="rgba(255,255,255,0.9)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: conn.delay + 0.5 }}
                />
                <motion.circle
                  r="3"
                  fill="#fff"
                  style={{ filter: "drop-shadow(0 0 4px rgba(255,255,255,0.8))" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{
                    duration: 2.4,
                    delay: conn.delay + 0.6,
                    repeat: Infinity,
                    repeatDelay: 1.2,
                    ease: "easeInOut",
                    times: [0, 0.1, 0.9, 1],
                  }}
                >
                  <animateMotion
                    dur="3.6s"
                    repeatCount="indefinite"
                    begin={`${conn.delay + 0.6}s`}
                    keyPoints="0;1;1"
                    keyTimes="0;0.666667;1"
                    calcMode="linear"
                  >
                    <mpath href={`#tree-path-${i}`} />
                  </animateMotion>
                </motion.circle>
              </g>
            );
          })}
        </svg>
      )}
    </div>
  );
}
