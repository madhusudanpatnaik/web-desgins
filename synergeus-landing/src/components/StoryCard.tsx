import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Heart, MessageCircle } from "lucide-react";

export function StoryCard() {
  const [slide, setSlide] = useState(0);

  // 3D Tilt logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 120, damping: 18, mass: 0.4 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateY = useTransform(springX, [-1, 1], [-18, 18]);
  const rotateX = useTransform(springY, [-1, 1], [12, -12]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    // Initial switch to slide 1 after 3s
    const initialTimeout = setTimeout(() => {
      setSlide(1);
    }, 3000);

    // Loop every 6s
    const interval = setInterval(() => {
      setSlide(0);
      setTimeout(() => {
        setSlide(1);
      }, 3000);
    }, 6000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <div style={{ marginTop: 48, perspective: 1200 }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: 310,
          height: 455,
          borderRadius: 28,
          background: "#1a1a1a",
          overflow: "hidden",
          position: "relative",
          transformStyle: "preserve-3d",
          rotateX,
          rotateY,
          boxShadow:
            "0 40px 100px rgba(0,0,0,0.55), 0 8px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.18), inset 0 0 0 1px rgba(255,255,255,0.06)",
        }}
      >
        {/* Background Image */}
        <img
          src="https://qclay.design/lovable/synergy/person-2.png"
          alt="Story background"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "center 20%", zIndex: 0 }}
        />

        {/* Soft-light tinted overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 1,
            mixBlendMode: "soft-light",
            background:
              "linear-gradient(160deg, rgba(220,255,90,0.65) 0%, rgba(170,230,70,0.35) 40%, rgba(80,140,40,0.25) 100%)",
          }}
        />

        {/* Radial highlight */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 2,
            background:
              "radial-gradient(circle at 30% 15%, rgba(230,255,120,0.25) 0%, transparent 55%)",
          }}
        />

        {/* Inset top highlight */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 3,
            borderRadius: 28,
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25)",
          }}
        />

        {/* Story progress bars */}
        <div
          className="absolute top-6 left-6 right-6 flex gap-1.5"
          style={{ zIndex: 20 }}
        >
          {/* Bar 1 */}
          <div
            className="flex-1 story-bar-1 overflow-hidden"
            style={{
              height: 3,
              borderRadius: 3,
              background: "rgba(0,0,0,0.25)",
            }}
          >
            <div
              className="story-bar-fill h-full w-full"
              style={{ background: "rgba(0,0,0,0.95)" }}
            />
          </div>
          {/* Bar 2 */}
          <div
            className="flex-1 story-bar-2 overflow-hidden"
            style={{
              height: 3,
              borderRadius: 3,
              background: "rgba(0,0,0,0.25)",
            }}
          >
            <div
              className="story-bar-fill h-full w-full"
              style={{ background: "rgba(0,0,0,0.95)" }}
            />
          </div>
        </div>

        {/* Lower dark gradient */}
        <div
          className="absolute bottom-0 w-full"
          style={{
            zIndex: 5,
            height: "55%",
            background: "linear-gradient(0deg, #040504 20.54%, rgba(29,37,9,0) 100%)",
          }}
        />

        {/* Headline */}
        <motion.h3
          key={slide}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-6 right-6"
          style={{
            zIndex: 10,
            bottom: 88,
            color: "#fff",
            fontSize: 38,
            lineHeight: "40px",
            letterSpacing: -0.5,
            textShadow: "0 2px 18px rgba(0,0,0,0.35)",
            margin: 0,
          }}
        >
          {slide === 0 ? (
            <>
              <span className="font-heading font-bold">Guiding</span>
              <br />
              <span className="font-serif italic font-normal">your money</span>
            </>
          ) : (
            <>
              <span className="font-heading font-bold">Building</span>
              <br />
              <span className="font-serif italic font-normal">the future</span>
            </>
          )}
        </motion.h3>

        {/* Bottom action row */}
        <div
          className="absolute bottom-6 left-6 right-6 flex gap-2.5 items-center"
          style={{ zIndex: 10 }}
        >
          <div
            className="font-heading"
            style={{
              background: "rgba(255,255,255,0.96)",
              color: "#0a0a0a",
              fontSize: 13,
              fontWeight: 500,
              padding: "9px 16px",
              borderRadius: 9999,
              boxShadow:
                "0 6px 18px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.9)",
            }}
          >
            Top Rated
          </div>
          <button
            className="flex items-center justify-center"
            style={{
              width: 38,
              height: 38,
              borderRadius: 14,
              background: "rgba(20,20,20,0.45)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.14)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
            }}
          >
            <Heart size={18} color="#fff" strokeWidth={1.8} />
          </button>
          <button
            className="flex items-center justify-center"
            style={{
              width: 38,
              height: 38,
              borderRadius: 14,
              background: "rgba(20,20,20,0.45)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.14)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
            }}
          >
            <MessageCircle size={18} color="#fff" strokeWidth={1.8} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
