
import { ArrowRight, Link } from 'lucide-react';

export const CaseStudies = () => {
  return (
    <section className="bg-[#F5F5F5] pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28">
      <div className="w-full max-w-[1440px] mx-auto">
        
        {/* Badge row */}
        <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-900 text-white flex items-center justify-center text-[11px] sm:text-[12px] font-semibold">
            2
          </div>
          <div className="text-[12px] sm:text-[13px] font-medium border border-gray-300 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-gray-900">
            Featured client work
          </div>
        </div>

        {/* Heading */}
        <div className="px-5 sm:px-8 lg:px-12">
          <h2 className="text-[clamp(1.75rem,7vw,4.2rem)] sm:text-[clamp(2.5rem,5vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 mb-10 sm:mb-14 lg:mb-16">
            Our projects
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-7 px-5 sm:px-8 lg:px-12">
          
          {/* Card 1: Narrativ */}
          <div className="flex flex-col">
            <div className="relative aspect-[329/246] rounded-2xl overflow-hidden bg-[#1a1d2e] group cursor-pointer">
              <video 
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260516_122702_390f5305-8719-41d5-ae80-d23ab3796c28.mp4" 
                autoPlay 
                muted 
                loop 
                playsInline 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 h-9 w-9 bg-white rounded-full flex items-center group-hover:w-[148px] transition-all duration-300 ease-in-out overflow-hidden px-2.5">
                <div className="flex items-center gap-2 w-max h-full">
                  <div className="w-4 h-4 flex-shrink-0 flex items-center justify-center">
                    <Link className="w-[14px] h-[14px] text-gray-900 -rotate-45 group-hover:rotate-0 transition-transform duration-300 ease-in-out" />
                  </div>
                  <span className="text-[13px] font-medium text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 ease-in-out whitespace-nowrap">
                    Learn more
                  </span>
                </div>
              </div>
            </div>
            <p className="text-[13px] sm:text-[14px] text-gray-600 mt-4 leading-relaxed">
              Winner of Site of the Month 2025 - an interactive 3D showcase driving record engagement
            </p>
            <h3 className="text-[14px] sm:text-[15px] font-semibold text-gray-900 mt-1">
              Narrativ
            </h3>
          </div>

          {/* Card 2: Luminar */}
          <div className="flex flex-col">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#6b6b6b] group cursor-pointer">
              <video 
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260516_123323_f909c2b8-ff6c-4edf-882b-8ebcdbe389b5.mp4" 
                autoPlay 
                muted 
                loop 
                playsInline 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 h-9 w-9 bg-gray-900 rounded-full flex items-center group-hover:w-[168px] transition-all duration-300 ease-in-out overflow-hidden px-2.5">
                <div className="flex items-center gap-2 w-max h-full">
                  <div className="w-4 h-4 flex-shrink-0 flex items-center justify-center">
                    <ArrowRight className="w-[14px] h-[14px] text-white -rotate-45 group-hover:rotate-0 transition-transform duration-300 ease-in-out" />
                  </div>
                  <span className="text-[13px] font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 ease-in-out whitespace-nowrap">
                    View case study
                  </span>
                </div>
              </div>
            </div>
            <p className="text-[13px] sm:text-[14px] text-gray-600 mt-4 leading-relaxed">
              Transforming a dated platform into a conversion-focused brand experience
            </p>
            <h3 className="text-[14px] sm:text-[15px] font-semibold text-gray-900 mt-1">
              Luminar
            </h3>
          </div>

        </div>
      </div>
    </section>
  );
};
