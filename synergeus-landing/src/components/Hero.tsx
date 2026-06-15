import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { HeroVideo } from "./HeroVideo";
import { Navbar } from "./Navbar";
import { StoryCard } from "./StoryCard";

const LOGOS = [
  "https://qclay.design/lovable/synergy/logo-taa.png",
  "https://qclay.design/lovable/synergy/logo-harris.png",
  "https://qclay.design/lovable/synergy/logo-siemens.png",
  "https://qclay.design/lovable/synergy/logo-summit.png",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden w-full" style={{ minHeight: "100vh", background: "#000" }}>
      <HeroVideo />

      {/* Dark Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      <Navbar />

      {/* Hero Content Wrapper */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-[80px]" style={{ zIndex: 10 }}>
        
        {/* H1 Title */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            color: "#fff",
            textAlign: "center",
            margin: 0,
            fontSize: 102,
            lineHeight: "96px",
            letterSpacing: "-1.02px",
          }}
        >
          <span className="block font-heading font-normal">Our AI simplify</span>
          <span className="block">
            <span className="font-heading font-normal">your </span>
            <span className="font-serif italic font-normal">financial life</span>
          </span>
        </motion.h1>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading flex items-center"
          style={{
            marginTop: 32,
            background: "#fff",
            color: "#000",
            fontSize: 15,
            fontWeight: 500,
            paddingLeft: 24,
            paddingRight: 8,
            paddingTop: 6,
            paddingBottom: 6,
            borderRadius: 9999,
            gap: 8,
          }}
        >
          Start free trial now
          <div
            className="flex items-center justify-center"
            style={{
              width: 24,
              height: 24,
              borderRadius: 9999,
              background: "#000",
            }}
          >
            <ArrowUpRight size={14} color="#fff" strokeWidth={2.5} />
          </div>
        </motion.button>

        <StoryCard />
      </div>

      {/* Bottom-Left Block */}
      <div className="absolute" style={{ bottom: 40, left: 40, zIndex: 10 }}>
        <h4
          className="font-heading"
          style={{
            fontSize: 21,
            lineHeight: 1.2,
            color: "rgba(255,255,255,0.6)",
            marginBottom: 18,
            fontWeight: 400,
          }}
        >
          Nationally recognized
        </h4>
        <div style={{ width: 430, overflow: "hidden" }}>
          <div className="flex animate-marquee" style={{ gap: 54, width: "max-content" }}>
            {[...LOGOS, ...LOGOS].map((logo, idx) => (
              <img
                key={idx}
                src={logo}
                alt="Partner logo"
                style={{
                  height: 30,
                  width: "auto",
                  objectFit: "contain",
                  filter: "brightness(0) invert(1) opacity(0.55)",
                  flexShrink: 0,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom-Right Block */}
      <div className="absolute" style={{ bottom: 40, right: 40, zIndex: 10, maxWidth: 430 }}>
        <p
          className="font-heading"
          style={{
            color: "#fff",
            fontSize: 21,
            lineHeight: 1.4,
            marginBottom: 12,
            fontWeight: 400,
          }}
        >
          Synergeus is your all in one financial home, now powered by your own intelligent AI advisor.
        </p>
        <a
          href="#"
          className="font-heading underline"
          style={{ color: "#fff", fontSize: 21, fontWeight: 400 }}
        >
          Learn more
        </a>
      </div>
    </section>
  );
}
