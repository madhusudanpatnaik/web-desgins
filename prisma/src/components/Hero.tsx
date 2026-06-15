import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { WordsPullUp } from "./animations/WordsPullUp";

export function Hero() {
  return (
    <section className="h-screen w-full p-4 md:p-6 bg-black flex flex-col">
      <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
        />

        {/* Overlays */}
        <div className="absolute inset-0 noise-overlay opacity-[0.7] mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />

        {/* Navbar */}
        <div className="absolute top-0 left-0 right-0 flex justify-center z-10">
          <nav className="bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8 flex items-center gap-3 sm:gap-6 md:gap-12 lg:gap-14">
            {["Our story", "Collective", "Workshops", "Programs", "Inquiries"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="text-[10px] sm:text-xs md:text-sm transition-colors duration-300"
                style={{ color: "rgba(225, 224, 204, 0.8)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#E1E0CC")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(225, 224, 204, 0.8)")}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 lg:p-12 z-10">
          <div className="grid grid-cols-12 gap-4 items-end">
            {/* Left 8 cols: Heading */}
            <div className="col-span-12 md:col-span-8">
              <WordsPullUp
                text="Prisma"
                showAsterisk={true}
                className="text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw] font-medium leading-[0.85] tracking-[-0.07em] text-[#E1E0CC]"
              />
            </div>

            {/* Right 4 cols: Text & Button */}
            <div className="col-span-12 md:col-span-4 flex flex-col gap-6 md:pb-4 lg:pb-8">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-primary/70 text-xs sm:text-sm md:text-base leading-[1.2]"
              >
                Prisma is a worldwide network of visual artists, filmmakers and storytellers bound not by place, status or labels but by passion and hunger to unlock potential through our unique perspectives.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <button className="group flex items-center gap-2 hover:gap-3 transition-all duration-300 bg-primary text-black font-medium text-sm sm:text-base rounded-full py-1 px-1 pl-6">
                  <span>Join the lab</span>
                  <div className="bg-black text-[#E1E0CC] rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
