import { motion, useInView } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useRef } from "react";
import { WordsPullUpMultiStyle } from "./animations/WordsPullUpMultiStyle";

export function Features() {
  return (
    <section className="relative min-h-screen bg-black w-full py-24 px-4 sm:px-6 md:px-8">
      {/* Background noise overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.15] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-12">
        {/* Header Text */}
        <div className="flex flex-col gap-2 max-w-4xl text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-left">
          <WordsPullUpMultiStyle
            className="justify-start"
            segments={[
              {
                text: "Studio-grade workflows for visionary creators.",
                className: "text-[#E1E0CC]",
              },
            ]}
          />
          <WordsPullUpMultiStyle
            className="justify-start"
            segments={[
              {
                text: "Built for pure vision. Powered by art.",
                className: "text-gray-500",
              },
            ]}
          />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:h-[480px] gap-3 sm:gap-2 md:gap-1">
          <Card index={0}>
            <div className="relative w-full h-full rounded-2xl overflow-hidden min-h-[400px] lg:min-h-0 flex flex-col justify-end p-6">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="relative z-10 text-[#E1E0CC] font-medium text-lg">
                Your creative canvas.
              </div>
            </div>
          </Card>

          <FeatureCard
            index={1}
            number="01"
            title="Project Storyboard."
            iconSrc="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85"
            items={[
              "Drag-and-drop scene ordering",
              "Integrated script viewer",
              "Real-time team collaboration",
              "Asset library linking",
            ]}
          />

          <FeatureCard
            index={2}
            number="02"
            title="Smart Critiques."
            iconSrc="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85"
            items={[
              "AI-powered composition analysis",
              "Timestamped creative notes",
              "Direct NLE tool integrations",
            ]}
          />

          <FeatureCard
            index={3}
            number="03"
            title="Immersion Capsule."
            iconSrc="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85"
            items={[
              "One-click notification silencing",
              "Curated ambient soundscapes",
              "Pomodoro schedule syncing",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function Card({ children, index }: { children: React.ReactNode; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}

function FeatureCard({
  index,
  number,
  title,
  iconSrc,
  items,
}: {
  index: number;
  number: string;
  title: string;
  iconSrc: string;
  items: string[];
}) {
  return (
    <Card index={index}>
      <div className="bg-[#212121] rounded-2xl p-6 md:p-8 h-full flex flex-col justify-between">
        <div className="flex flex-col gap-6">
          <img
            src={iconSrc}
            alt={title}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover"
          />
          <div className="flex flex-col gap-1">
            <span className="text-gray-500 text-xs font-mono">{number}</span>
            <h3 className="text-[#E1E0CC] text-lg sm:text-xl font-medium">{title}</h3>
          </div>
          <ul className="flex flex-col gap-3">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0 mt-[2px]" />
                <span className="text-gray-400 text-xs sm:text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="pt-8">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-[#E1E0CC] text-xs sm:text-sm font-medium hover:text-primary transition-colors group"
          >
            Learn more
            <ArrowRight className="w-4 h-4 -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </Card>
  );
}
