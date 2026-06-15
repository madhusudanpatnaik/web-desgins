import { A } from '../lib/assets';

export function TrustedBy() {
  const brands = [
    { name: 'Nueral', logo: A.Nueral },
    { name: 'GroundAI', logo: null },
    { name: 'Wids', logo: A.Wids },
    { name: 'Orinya', logo: A.Orinya },
    { name: 'Xyreion', logo: A.Xyreion },
    { name: 'Skodia', logo: A.Skodia },
    { name: 'GreenFlag', logo: A.GreenFlag }
  ];

  return (
    <section className="bg-white pt-16 pb-14 px-[40px]">
      <h2 className="text-center text-3xl md:text-4xl font-medium text-neutral-900 mb-12" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
        Trusted by the <span className="italic" style={{ fontFamily: "'Playfair Display', serif" }}>leading brands</span>
      </h2>
      
      <div className="relative overflow-hidden">
        {/* Left and Right Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
        
        {/* Marquee Track */}
        <div className="flex w-max animate-marquee gap-16">
          {[...brands, ...brands].map((brand, idx) => (
            <div key={`${brand.name}-${idx}`} className="flex items-center gap-3 shrink-0 opacity-40">
              {brand.logo && <img src={brand.logo} alt={brand.name} className="h-8 object-contain" />}
              <span className="text-3xl font-bold text-black whitespace-nowrap" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
