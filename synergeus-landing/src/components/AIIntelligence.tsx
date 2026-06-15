import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CategorizationTree } from "./CategorizationTree";

const QAS = [
  {
    q: "Can I afford to invest $500 this month?",
    a: "Based on your current income and expenses, you’ll have around $620 in available balance after bills. Investing $500 is within reach - but consider saving at least $200 as an emergency buffer.",
  },
  {
    q: "When will I reach my savings goal?",
    a: "At your current savings rate of $850/month, you’ll reach your $10,000 goal in approximately 8 months. Cutting discretionary spending by 15% could shave off 3 weeks.",
  },
  {
    q: "How much did I spend on food last month?",
    a: "You spent $643 on food in March - $421 on groceries and $222 on dining out. That’s 18% above your monthly food budget of $545.",
  },
];

export function AIIntelligence() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [qIdx, setQIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setQIdx((prev) => (prev + 1) % QAS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={containerRef} className="overflow-hidden" style={{ background: "#000", padding: "80px 48px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 64 }}>
        <div
          className="font-heading"
          style={{
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: 2,
            color: "rgba(255,255,255,0.50)",
            marginBottom: 16,
          }}
        >
          AI INTELLIGENCE
        </div>
        <motion.h2
          initial={{ opacity: 0, filter: "blur(12px)", y: 30 }}
          animate={isInView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ margin: 0, color: "#fff" }}
        >
          <span className="font-heading" style={{ fontSize: 72, fontWeight: 400, letterSpacing: "-1.02px" }}>
            Your personal{" "}
          </span>
          <span className="font-serif italic" style={{ fontSize: 72, fontWeight: 400, letterSpacing: "-1.02px" }}>
            AI advisor
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
          animate={isInView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="font-heading mx-auto"
          style={{ fontSize: 16, fontWeight: 400, color: "rgba(255,255,255,0.60)", lineHeight: 1.6, marginTop: 16 }}
        >
          Experience the power of artificial intelligence working for your financial well being
        </motion.p>
      </div>

      {/* Cards Row */}
      <div className="flex flex-row items-stretch mx-auto" style={{ gap: 16, maxWidth: 1200 }}>
        {/* CARD 1 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="relative overflow-hidden"
          style={{ flex: 1, minHeight: 560, borderRadius: 24 }}
        >
          <img src="https://qclay.design/lovable/synergy/back-3-1.png" alt="BG 1" className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 0 }} />
          <div className="absolute inset-0" style={{ zIndex: 1, background: "rgba(0,0,0,0.30)" }} />

          {/* Glass UI */}
          <div
            className="absolute"
            style={{
              top: 32, left: 24, right: 24, zIndex: 2,
              borderRadius: 20, border: "1px solid rgba(255,255,255,0.20)",
              background: "rgba(255,255,255,0.10)", backdropFilter: "blur(56px)", WebkitBackdropFilter: "blur(56px)",
              padding: 20
            }}
          >
            <div className="flex items-center" style={{ gap: 10, marginBottom: 16 }}>
              <div className="flex items-center justify-center" style={{ width: 40, height: 40, borderRadius: 12, background: "#fff" }}>
                <img src="https://qclay.design/lovable/synergy/Logo-lov.svg" alt="Logo" style={{ width: 22, filter: "invert(1)" }} />
              </div>
              <span className="font-heading" style={{ fontSize: 16, fontWeight: 500, color: "#fff" }}>Synergeus</span>
            </div>
            <div style={{ borderTop: "1px dashed rgba(255,255,255,0.20)", marginBottom: 16 }} />
            
            <div className="relative" style={{ height: 160 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={qIdx}
                  initial={{ opacity: 0, filter: "blur(8px)", y: 8 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  exit={{ opacity: 0, filter: "blur(8px)", y: -6 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <div className="font-heading" style={{ fontSize: 16, fontWeight: 500, color: "#fff", marginBottom: 12, lineHeight: 1.4 }}>
                    {QAS[qIdx].q}
                  </div>
                  <div className="flex items-start" style={{ gap: 8 }}>
                    <div className="flex items-center justify-center shrink-0" style={{ width: 20, height: 20, borderRadius: 6, background: "rgba(255,255,255,0.15)" }}>
                      <img src="https://qclay.design/lovable/synergy/Logo-lov.svg" alt="Logo" style={{ width: 12, opacity: 0.8 }} />
                    </div>
                    <div className="font-heading" style={{ fontSize: 12, fontWeight: 400, lineHeight: 1.6, color: "rgba(255,255,255,0.55)" }}>
                      {QAS[qIdx].a}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between" style={{ marginTop: 16 }}>
              <button className="flex items-center border-none cursor-pointer" style={{ gap: 8, background: "#fff", color: "#000", fontFamily: "Inter Tight", fontSize: 13, fontWeight: 500, padding: "6px 6px 6px 16px", borderRadius: 9999 }}>
                View transaction
                <div className="flex items-center justify-center" style={{ width: 22, height: 22, borderRadius: "50%", background: "#000" }}>
                  <ArrowUpRight size={12} color="#fff" />
                </div>
              </button>
              <a href="#" className="font-heading underline cursor-pointer" style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.80)" }}>
                ASK YOURS
              </a>
            </div>
          </div>

          <div className="absolute" style={{ bottom: 28, left: 24, right: 24, zIndex: 2 }}>
            <h3 className="font-serif italic" style={{ fontSize: 26, fontWeight: 400, color: "#fff", marginBottom: 8 }}>Natural Language Queries</h3>
            <p className="font-heading" style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>Ask questions about your finances in plain English and get instant, accurate answers.</p>
          </div>
        </motion.div>

        {/* CARD 2 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.35 }}
          className="relative overflow-hidden"
          style={{ flex: 1, minHeight: 560, borderRadius: 24 }}
        >
          <img src="https://qclay.design/lovable/synergy/back-3-2.png" alt="BG 2" className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 0 }} />
          <div className="absolute inset-0" style={{ zIndex: 1, background: "rgba(0,0,0,0.20)" }} />

          <div className="absolute" style={{ top: 32, left: 24, right: 24, zIndex: 2 }}>
            <div style={{ borderRadius: 20, background: "rgba(255,255,255,0.92)", padding: "24px 20px 20px", textAlign: "center" }}>
              <div className="font-heading" style={{ fontSize: 12, fontWeight: 400, color: "rgba(0,0,0,0.50)", lineHeight: 1.5, marginBottom: 4 }}>
                Expenses <br /> expected to rise
              </div>
              <div className="font-serif italic" style={{ fontSize: 52, fontWeight: 400, color: "#000", letterSpacing: "-1px", lineHeight: 1 }}>
                3%
              </div>
              <div style={{ height: 16 }} />
              
              {/* Chart */}
              <div style={{ width: 280, maxWidth: "100%", height: 145, position: "relative", overflow: "visible", margin: "0 auto" }}>
                <svg viewBox="60 -25 220 145" style={{ width: "100%", height: "100%", overflow: "visible" }} preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(180,210,80,0.85)" />
                      <stop offset="100%" stopColor="rgba(180,210,80,0.10)" />
                    </linearGradient>
                    <clipPath id="reveal">
                      <motion.rect
                        x="60" y="-25" height="145"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: 220 } : {}}
                        transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
                      />
                    </clipPath>
                  </defs>
                  
                  <g clipPath="url(#reveal)">
                    <path d="M 60 75 L 150 20 L 280 28 L 280 120 L 60 120 Z" fill="url(#areaFill)" />
                    <path d="M 60 75 L 150 20 L 280 28" fill="none" stroke="#8DB800" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
                    <line x1="60" y1="75" x2="60" y2="120" stroke="#8DB800" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                    <line x1="280" y1="28" x2="280" y2="120" stroke="#8DB800" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                  </g>
                  
                  <motion.line
                    x1="150" y1="-15" x2="150" y2="20"
                    stroke="#1DC47D" strokeWidth="1.2"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 1.4 }}
                  />
                  
                  <motion.circle
                    cx="150" cy="-15" r="4.5" fill="#1DC47D"
                    style={{ transformOrigin: "150px -15px" }}
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.3, ease: "easeOut", delay: 1.7 }}
                  />
                </svg>
              </div>

              <div className="font-heading inline-block" style={{ borderRadius: 9999, border: "1px solid rgba(0,0,0,0.12)", background: "rgba(255,255,255,0.80)", backdropFilter: "blur(8px)", padding: "8px 16px", marginTop: 16, fontSize: 11, color: "rgba(0,0,0,0.60)", textAlign: "center" }}>
                Tip: Reduce subscriptions to maintain savings target.
              </div>
            </div>
          </div>

          <div className="absolute" style={{ bottom: 28, left: 24, right: 24, zIndex: 2 }}>
            <h3 className="font-serif italic" style={{ fontSize: 26, fontWeight: 400, color: "#fff", marginBottom: 8 }}>Predictive Analysis</h3>
            <p className="font-heading" style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>AI algorithms analyze patterns to forecast future expenses and income trends.</p>
          </div>
        </motion.div>

        {/* CARD 3 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
          className="relative overflow-hidden"
          style={{ flex: 1, minHeight: 560, borderRadius: 24 }}
        >
          <img src="https://qclay.design/lovable/synergy/back-3-3.png" alt="BG 3" className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 0 }} />
          <div className="absolute inset-0" style={{ zIndex: 1, background: "rgba(0,0,0,0.30)" }} />

          <CategorizationTree />

          <div className="absolute" style={{ bottom: 28, left: 24, right: 24, zIndex: 2 }}>
            <h3 className="font-serif italic" style={{ fontSize: 26, fontWeight: 400, color: "#fff", marginBottom: 8 }}>Smart Categorization</h3>
            <p className="font-heading" style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>Automatically categorize transactions with machine learning that improves over time.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
