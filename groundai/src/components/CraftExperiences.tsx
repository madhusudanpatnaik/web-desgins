import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { A } from '../lib/assets';

export function CraftExperiences() {
  const [active, setActive] = useState(2);
  const ITEMS = [
    "Modern Minimalist",
    "Cozy Scandinavian",
    "Rustic Wooden design",
    "Bold Industrial",
    "Coastal Retreat",
    "Japandi Calm",
    "Art Deco Luxe"
  ];
  const len = ITEMS.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % len);
    }, 2800);
    return () => clearInterval(timer);
  }, [len]);

  const [filled, setFilled] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilled(true);
    }, 1100);
    return () => clearTimeout(timer);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.35,
        duration: 1.1,
        ease: "easeOut"
      }
    })
  };

  return (
    <section className="bg-white">
      <div className="max-w-[1360px] mx-auto px-6 md:px-12 pt-16 pb-20">
        <h2 className="text-center text-5xl md:text-6xl font-normal leading-[1.1] mb-12 text-neutral-900" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
          <span className="italic" style={{ fontFamily: "'Playfair Display', serif" }}>Craft experiences</span> your <br/> customers will remember
        </h2>

        <div className="flex flex-col lg:flex-row justify-between items-stretch gap-6">
          {/* Card 1 - Style Carousel */}
          <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={cardVariants} className="flex flex-1">
            <div className="relative flex-1 h-[585px] rounded-3xl overflow-hidden bg-stone-300">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${A.backgroundCard})` }} />
              <div className="absolute inset-0 bg-black/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full flex items-center justify-center h-[80px]">
                  {ITEMS.map((label, i) => {
                    const diff = ((i - active + len + Math.floor(len / 2)) % len) - Math.floor(len / 2);
                    const isActive = diff === 0;
                    const visible = Math.abs(diff) <= 2;
                    const y = diff === 0 ? 0 : diff < 0 ? diff * (56 + 18) - 22 : diff * (56 + 18) + 22;
                    const opacity = !visible ? 0 : Math.abs(diff) === 2 ? 0.55 : 1;

                    return (
                      <motion.div
                        key={label}
                        animate={{ y, opacity }}
                        transition={{ y: { type: "spring", stiffness: 260, damping: 28 }, opacity: { ease: "easeInOut", duration: 0.4 } }}
                        className="absolute left-0 right-0 flex justify-center pointer-events-none"
                      >
                        <motion.div layout transition={{ type: "spring", stiffness: 260, damping: 28 }} className={
                          !isActive 
                            ? "w-[261px] h-[56px] px-3 bg-white/15 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-[8.5px]" 
                            : "w-[calc(100%_-_60px)] mx-[30px] h-[80px] bg-white/25 backdrop-blur-xl shadow-xl p-[8.5px] rounded-full flex items-center gap-[8.5px]"
                        }>
                          {/* Left Circle */}
                          <div className={!isActive ? "w-[44px] h-[44px] rounded-full bg-white/30 p-1 shrink-0" : "w-[63px] h-[63px] rounded-full bg-white/30 shrink-0 flex items-center justify-center"}>
                            {!isActive ? (
                              <div className="w-full h-full rounded-full bg-white/10" />
                            ) : (
                              <motion.img layoutId={`icon-${label}`} src={A.logo} alt="Logo" className="w-8 h-8 object-contain" />
                            )}
                          </div>
                          {/* Right Area */}
                          <div className="relative flex-1 h-[44px] text-left ml-1 flex items-center">
                            <AnimatePresence mode="popLayout">
                              {isActive ? (
                                <motion.div key="active" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col justify-center">
                                  <span className="text-white text-lg font-medium whitespace-nowrap" style={{ fontFamily: "'SF Pro Rounded', system-ui, sans-serif" }}>{label}</span>
                                  <span className="text-white/70 text-[11px] tracking-[0.15em] whitespace-nowrap" style={{ fontFamily: "'SF Pro Rounded', system-ui, sans-serif" }}>GROUNDAI CHOICE</span>
                                </motion.div>
                              ) : (
                                <motion.div key="inactive" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-1.5 justify-center">
                                  <div className="h-2 w-[140px] bg-white/50 rounded-full" />
                                  <div className="h-2 w-[70px] bg-white/35 rounded-full" />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
              <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Card 2 - Chat/Customer Card */}
          <motion.div custom={1} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={cardVariants} className="flex flex-1">
            <div className="relative flex-1 h-[585px] rounded-3xl overflow-hidden bg-[#141413] flex flex-col pt-10 pb-10 justify-between">
              <div className="flex-1 flex flex-col justify-center gap-[10px] mb-6">
                {/* Static Bubble */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="mx-[58px] h-[108px] rounded-2xl bg-[#FAFAFA14] flex items-start pt-[22px] pl-[22px] relative">
                  <div className="w-[40px] h-[40px] rounded-xl bg-[#FFFFFF54] shrink-0" />
                  <div className="ml-[12px] flex-1 flex flex-col gap-[9px] pr-[22px]">
                    <div className="h-[6px] w-[31px] bg-[#FFFFFF3D] rounded-full mt-[17px]" />
                    <div className="h-[6px] w-[85%] bg-[#FFFFFF3D] rounded-full" />
                    <div className="h-[6px] w-[55%] bg-[#FFFFFF3D] rounded-full" />
                  </div>
                </motion.div>

                {/* MorphBubble */}
                <motion.div layout animate={{ backgroundColor: filled ? "#9E948B" : "#FAFAFA14" }} transition={{ duration: 0.7, ease: "easeOut" }} className="mx-[45px] h-[135px] rounded-3xl p-[22px] overflow-hidden relative">
                  <AnimatePresence mode="wait">
                    {!filled ? (
                      <motion.div key="skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="flex items-start">
                        <div className="w-[40px] h-[40px] rounded-xl bg-[#FFFFFF54] shrink-0" />
                        <div className="ml-[12px] flex-1 flex flex-col gap-[9px] pr-[22px] mt-2">
                          <div className="h-[6px] w-[31px] bg-[#FFFFFF3D] rounded-full" />
                          <div className="h-[6px] w-[85%] bg-[#FFFFFF3D] rounded-full" />
                          <div className="h-[6px] w-[55%] bg-[#FFFFFF3D] rounded-full" />
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15, duration: 0.5 }} className="flex flex-col h-full">
                        <div className="flex items-center gap-[12px] h-[44px]">
                          <img src={A.womem} alt="User Avatar" className="w-[40px] h-[40px] rounded-full object-cover" />
                          <span className="text-white text-base leading-none" style={{ fontFamily: "'SF Pro Rounded', system-ui, sans-serif" }}>Me</span>
                        </div>
                        <p className="text-white text-[15px] leading-snug mt-[-9px] ml-[56px]" style={{ fontFamily: "'SF Pro Rounded', system-ui, sans-serif" }}>
                          My interior won't update, any ideas on how to use GroundAI?
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Bottom Row */}
              <div className="flex justify-between items-end pl-[32px] pr-[32px]">
                <div className="w-64 text-white text-4xl leading-10" style={{ fontFamily: "'SF Pro Rounded', system-ui, sans-serif" }}>
                  {"Engage and delight customers".split(" ").map((w, i) => (
                    <motion.span key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ delay: 0.5 + i * 0.1, duration: 0.5, ease: "easeOut" }} className="inline-block mr-[0.25em]">
                      {w}
                    </motion.span>
                  ))}
                </div>
                <div className="flex">
                  <div className="w-10 h-10 rounded-full border-2 border-[#141413] flex items-center justify-center text-xl bg-[#5F5D4D] text-white z-30" style={{ fontFamily: "'SF Pro Rounded', system-ui, sans-serif" }}>01</div>
                  <div className="w-10 h-10 rounded-full border-2 border-[#141413] flex items-center justify-center text-xl bg-[#252522] text-white/40 -ml-3 z-20" style={{ fontFamily: "'SF Pro Rounded', system-ui, sans-serif" }}>2</div>
                  <div className="w-10 h-10 rounded-full border-2 border-[#141413] flex items-center justify-center text-xl bg-[#252522] text-white/40 -ml-3 z-10" style={{ fontFamily: "'SF Pro Rounded', system-ui, sans-serif" }}>3</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3 - Adaptable List */}
          <motion.div custom={2} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={cardVariants} className="flex flex-1">
            <div className="relative flex-1 h-[585px] rounded-3xl overflow-hidden flex flex-col px-[33px] pt-[44px] pb-10 bg-[#9E948B]">
              <div className="flex flex-col gap-[26px]">
                <h3 className="text-white text-5xl font-normal leading-[1.05]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                  It's completely <br/> adaptable.
                </h3>
                <p className="text-white/60 text-lg leading-snug max-w-[340px]" style={{ fontFamily: "'SF Pro Rounded', system-ui, sans-serif" }}>
                  {"Customize GroundAI to fit your style and needs—whether you want modern minimalism, cozy comfort, or bold luxury.".split(" ").map((w, i) => (
                    <motion.span key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: 0.6 + i * 0.04, duration: 0.4, ease: "easeOut" }} className="inline-block mr-[5px]">
                      {w}
                    </motion.span>
                  ))}
                </p>
              </div>

              <div className="mt-auto z-10 flex flex-col gap-[12px]">
                {[
                  { label: "Style preference", color: "#887C71" },
                  { label: "Room layout rules", color: "#9E948B" },
                  { label: "Furniture & décor choices", color: "#9E948B" }
                ].map((item, idx) => (
                  <motion.div key={item.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: 1.1 + idx * 0.18, duration: 0.55, ease: "easeOut" }} className="w-full py-[15px] px-[27px] rounded-2xl bg-white flex items-center justify-between">
                    <span className="text-lg" style={{ color: item.color, fontFamily: "'SF Pro Rounded', system-ui, sans-serif" }}>{item.label}</span>
                    <svg className="w-[22px] h-[22px] text-neutral-400 stroke-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </motion.div>
                ))}
              </div>

              <div className="pointer-events-none absolute inset-x-0 -bottom-10 h-[140px] -mx-4 z-20" style={{ background: "linear-gradient(to top, rgba(158,148,139,1) 0%, rgba(158,148,139,1) 35%, rgba(158,148,139,0.7) 65%, rgba(158,148,139,0) 80%)" }} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
