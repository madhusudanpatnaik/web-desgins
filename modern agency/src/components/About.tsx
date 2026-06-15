
import { ArrowRight } from 'lucide-react';

export const About = () => {
  return (
    <section className="bg-white pt-16 sm:pt-20 lg:pt-32 pb-12 sm:pb-16 lg:pb-24 overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto">
        
        {/* Badge row */}
        <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-900 text-white flex items-center justify-center text-[11px] sm:text-[12px] font-semibold">
            1
          </div>
          <div className="text-[12px] sm:text-[13px] font-medium border border-gray-200 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-gray-900">
            Introducing Axion
          </div>
        </div>

        {/* Heading */}
        <div className="px-5 sm:px-8 lg:px-12">
          <h2 className="text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 mb-12 sm:mb-16 lg:mb-28">
            Strategy-led creatives, delivering <br className="hidden md:block" />
            results in digital and beyond.
          </h2>
        </div>

        {/* Content Area */}
        <div className="px-5 sm:px-8 lg:px-12">
          
          {/* Mobile/Tablet Layout (lg:hidden) */}
          <div className="lg:hidden flex flex-col gap-8">
            <div className="flex flex-col gap-6 items-start">
              <p className="text-[15px] sm:text-[17px] leading-[1.6] font-medium text-gray-900">
                Through research, creative thinking and iteration we help growing brands realize their digital full potential.
              </p>
              <button className="flex items-center gap-3 bg-[#F26522] hover:bg-[#e05a1a] text-white text-[13px] font-medium rounded-full pl-5 pr-2 py-2 group transition-colors duration-300">
                <div className="flex-col overflow-hidden h-[20px] flex">
                  <div className="group-hover:-translate-y-1/2 duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] flex flex-col">
                    <span className="h-[20px] flex items-center">About our studio</span>
                    <span className="h-[20px] flex items-center">About our studio</span>
                  </div>
                </div>
                <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-[#F26522] group-hover:-rotate-45 duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
              <img 
                src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090123_74be96d4-9c1b-40cf-932a-96f4f4babed3.png&w=1280&q=85" 
                alt="Studio setup small" 
                className="w-full sm:w-[45%] aspect-[438/346] rounded-xl sm:rounded-2xl object-cover" 
              />
              <img 
                src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090133_c157d30b-a99a-4477-bec1-a446149ec3f2.png&w=1280&q=85" 
                alt="Studio setup large" 
                className="w-full sm:w-[55%] aspect-[900/600] rounded-xl sm:rounded-2xl object-cover" 
              />
            </div>
          </div>

          {/* Desktop Layout (hidden lg:grid) */}
          <div className="hidden lg:grid grid-cols-[26%_1fr_48%] items-end gap-6 xl:gap-8">
            <img 
              src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090123_74be96d4-9c1b-40cf-932a-96f4f4babed3.png&w=1280&q=85" 
              alt="Studio setup small" 
              className="w-full aspect-[438/346] rounded-2xl object-cover self-end" 
            />
            
            <div className="self-start flex flex-col justify-end h-full">
              <div className="mb-8">
                <p className="text-[16px] xl:text-[18px] leading-[1.65] font-medium text-gray-900 whitespace-nowrap">
                  Through research, creative <br/>
                  thinking and iteration we help <br/>
                  growing brands realize their <br/>
                  digital full potential.
                </p>
              </div>
              <div>
                <button className="flex items-center gap-3 bg-[#F26522] hover:bg-[#e05a1a] text-white text-[14px] font-medium rounded-full pl-6 pr-2 py-2 group transition-colors duration-300">
                  <div className="flex-col overflow-hidden h-[20px] flex">
                    <div className="group-hover:-translate-y-1/2 duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] flex flex-col">
                      <span className="h-[20px] flex items-center">About our studio</span>
                      <span className="h-[20px] flex items-center">About our studio</span>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#F26522] group-hover:-rotate-45 duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              </div>
            </div>

            <img 
              src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090133_c157d30b-a99a-4477-bec1-a446149ec3f2.png&w=1280&q=85" 
              alt="Studio setup large" 
              className="w-full aspect-[3/2] rounded-2xl object-cover self-end" 
            />
          </div>

        </div>
      </div>
    </section>
  );
};
