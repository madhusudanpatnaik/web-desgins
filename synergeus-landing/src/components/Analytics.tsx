import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { Info, ArrowUpRight } from "lucide-react";

export function Analytics() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Count up values
  const count1 = useMotionValue(100);
  const count2 = useMotionValue(10);

  const rounded1 = useTransform(count1, (latest) =>
    `$${latest.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  );
  const rounded2 = useTransform(count2, (latest) =>
    `$${latest.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  );

  useEffect(() => {
    if (isInView) {
      animate(count1, 14250, { duration: 1.2, ease: "easeOut" });
      animate(count2, 925, { duration: 1.2, ease: "easeOut" });
    }
  }, [isInView, count1, count2]);

  return (
    <section className="overflow-hidden" style={{ background: "#000", padding: "80px 48px" }}>
      {/* Header */}
      <div ref={containerRef} style={{ textAlign: "center", marginBottom: 64 }}>
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
          ANALYTICS
        </div>
        <motion.h2
          initial={{ opacity: 0, filter: "blur(12px)", y: 30 }}
          animate={isInView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ margin: 0, color: "#fff" }}
        >
          <span
            className="block font-heading"
            style={{ fontSize: 72, fontWeight: 400, lineHeight: 1, letterSpacing: "-1.02px" }}
          >
            Smarter cash flow
          </span>
          <span
            className="block font-serif italic"
            style={{ fontSize: 72, fontWeight: 400, lineHeight: 1, letterSpacing: "-1.02px" }}
          >
            insights at a glance
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
          animate={isInView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="font-heading"
          style={{
            fontSize: 16,
            fontWeight: 400,
            color: "rgba(255,255,255,0.60)",
            marginTop: 16,
          }}
        >
          Keep your income and expense in sync with real-time AI
        </motion.p>
      </div>

      {/* Cards Row */}
      <div className="flex flex-row items-stretch mx-auto" style={{ gap: 16, maxWidth: 1200 }}>
        {/* CARD 1 - LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="relative overflow-hidden"
          style={{ flex: 1.4, minHeight: 480, borderRadius: 24 }}
        >
          <img
            src="https://qclay.design/lovable/synergy/block-1.png"
            alt="Overview background"
            className="absolute inset-0 object-cover w-full h-full"
            style={{ zIndex: 0 }}
          />
          <div className="absolute inset-0" style={{ zIndex: 1, background: "rgba(0,0,0,0.35)" }} />

          {/* Glass overview card */}
          <div
            className="absolute"
            style={{
              top: 32,
              left: 32,
              right: 32,
              zIndex: 2,
              borderRadius: 20,
              border: "1px solid rgba(255,255,255,0.20)",
              background: "rgba(255,255,255,0.10)",
              backdropFilter: "blur(56px)",
              WebkitBackdropFilter: "blur(56px)",
              padding: "24px 28px",
            }}
          >
            <div className="flex justify-between items-center" style={{ marginBottom: 8 }}>
              <span className="font-heading" style={{ fontSize: 11, fontWeight: 500, letterSpacing: 1.5, color: "rgba(255,255,255,0.60)" }}>
                MONTHLY OVERVIEW
              </span>
              <span className="font-heading underline" style={{ fontSize: 11, fontWeight: 500, letterSpacing: 1.5, color: "rgba(255,255,255,0.60)" }}>
                MONTHLY
              </span>
            </div>
            <motion.div
              className="font-heading"
              style={{ fontSize: 42, fontWeight: 400, letterSpacing: "-1px", color: "#fff", marginBottom: 24, fontVariantNumeric: "tabular-nums" }}
            >
              {rounded1}
            </motion.div>
            <div style={{ width: "100%", borderTop: "1px dashed rgba(255,255,255,0.20)", marginBottom: 20 }} />

            {/* Rows */}
            {[
              { label: "Income", value: "$15,500", width: "75%", fill: "linear-gradient(90deg, #1DC47D 60.8%, rgba(29,196,125,0) 100%)" },
              { label: "Investment", value: "$4,250", width: "45%", fill: "linear-gradient(90deg, #B48F17 55.74%, rgba(180,143,23,0) 100%)" },
              { label: "Expenses", value: "$8,200", width: "60%", fill: "linear-gradient(90deg, #FFF 52.46%, rgba(255,255,255,0) 100%)" },
            ].map((row, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div className="flex justify-between font-heading">
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.70)" }}>{row.label}</span>
                  <span style={{ fontSize: 13, color: "#fff", fontWeight: 500 }}>{row.value}</span>
                </div>
                <div className="relative" style={{ height: 5, borderRadius: 5, width: "100%", marginTop: 6 }}>
                  <div className="absolute inset-0" style={{ opacity: 0.13, background: "linear-gradient(90deg, #040504 0%, rgba(4,5,4,0.50) 100%)", borderRadius: 5 }} />
                  <div className="absolute top-0 left-0 h-full" style={{ width: row.width, background: row.fill, borderRadius: 5 }} />
                </div>
              </div>
            ))}
          </div>

          <div className="absolute" style={{ bottom: 22, left: 32, right: 32, zIndex: 2 }}>
            <h3 className="font-serif italic" style={{ fontSize: 26, fontWeight: 400, color: "#fff", marginBottom: 8 }}>
              See the full picture of your finances.
            </h3>
            <p className="font-heading" style={{ fontSize: 13, fontWeight: 400, lineHeight: 1.6, color: "rgba(255,255,255,0.65)", margin: 0 }}>
              AI keeps your income, expenses, and goals effortlessly aligned giving you a clearer view of your financial rhythm, smarter decisions, and lasting stability.
            </p>
          </div>
        </motion.div>

        {/* CARD 2 - RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.45 }}
          className="relative overflow-hidden"
          style={{ flex: 1, minHeight: 480, borderRadius: 24 }}
        >
          <img
            src="https://qclay.design/lovable/synergy/block-2.png"
            alt="Daily background"
            className="absolute inset-0 object-cover w-full h-full"
            style={{ zIndex: 0 }}
          />
          <div className="absolute inset-0" style={{ zIndex: 1, background: "rgba(0,0,0,0.25)" }} />

          <div className="absolute font-heading underline" style={{ top: 24, right: 24, zIndex: 2, fontSize: 11, fontWeight: 500, letterSpacing: 1.5, color: "rgba(255,255,255,0.70)" }}>
            DAILY
          </div>

          {/* White transaction card */}
          <div className="absolute" style={{ top: 32, left: 32, zIndex: 2, width: 200, borderRadius: 16, background: "#fff", padding: "16px 18px", boxShadow: "0 8px 32px rgba(0,0,0,0.20)" }}>
            <div className="flex justify-between">
              <motion.div className="font-heading" style={{ fontSize: 22, fontWeight: 400, color: "#000", letterSpacing: "-0.5px", fontVariantNumeric: "tabular-nums" }}>
                {rounded2}
              </motion.div>
              <Info size={16} color="rgba(0,0,0,0.35)" />
            </div>
            <div className="font-heading" style={{ fontSize: 12, color: "rgba(0,0,0,0.45)", marginBottom: 14 }}>
              Sent today
            </div>
            <button className="font-heading flex justify-between items-center w-full" style={{ background: "#000", color: "#fff", fontSize: 13, fontWeight: 500, padding: "10px 14px", borderRadius: 9999, border: "none" }}>
              <span>View transaction</span>
              <div className="flex justify-center items-center" style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(255,255,255,0.15)" }}>
                <ArrowUpRight size={13} color="#fff" />
              </div>
            </button>
          </div>

          {/* Portrait image */}
          <img
            src="https://qclay.design/lovable/synergy/person-2.png"
            alt="Person"
            className="absolute"
            style={{ bottom: 140, left: "50%", transform: "translateX(-50%)", zIndex: 2, width: 200, height: 240, objectFit: "cover", objectPosition: "top center", borderRadius: 16 }}
          />

          {/* Brand bar */}
          <div className="absolute flex items-center gap-2" style={{ bottom: 160, right: 24, zIndex: 3 }}>
            <div className="flex items-center" style={{ gap: 8, background: "rgba(255,255,255,0.15)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderRadius: 9999, padding: "8px 16px 8px 10px" }}>
              <img src="https://qclay.design/lovable/synergy/Logo-lov.svg" alt="Synergeus" style={{ height: 20 }} />
            </div>
            <button className="flex items-center justify-center" style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "none" }}>
              <ArrowUpRight size={16} color="#fff" />
            </button>
          </div>

          {/* Bottom text block */}
          <div className="absolute" style={{ bottom: 22, left: 32, right: 32, zIndex: 2 }}>
            <h3 className="font-serif italic" style={{ fontSize: 24, fontWeight: 400, color: "#fff", marginBottom: 8 }}>
              Your money, perfect transactions
            </h3>
            <p className="font-heading" style={{ fontSize: 13, fontWeight: 400, lineHeight: 1.6, color: "rgba(255,255,255,0.65)", margin: 0 }}>
              Stay grounded with real-time visibility into where your money’s going and growing.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
