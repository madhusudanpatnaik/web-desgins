import { WordsPullUpMultiStyle } from "./animations/WordsPullUpMultiStyle";
import { AnimatedLetterText } from "./animations/AnimatedLetterText";

export function About() {
  return (
    <section className="bg-black w-full py-12 md:py-24 px-4 sm:px-6">
      <div className="bg-[#101010] rounded-3xl md:rounded-[2rem] max-w-6xl mx-auto py-16 px-4 sm:px-8 md:py-32 flex flex-col items-center text-center">
        <span className="text-primary text-[10px] sm:text-xs tracking-wider uppercase mb-8">
          Visual arts
        </span>
        
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-4xl mx-auto leading-[0.95] sm:leading-[0.9] mb-16 text-[#E1E0CC]">
          <WordsPullUpMultiStyle
            segments={[
              { text: "I am Marcus Chen, " },
              { text: "a self-taught director. ", className: "font-serif italic text-primary" },
              { text: "I have skills in color grading, visual effects, and narrative design." }
            ]}
          />
        </div>

        <div className="max-w-2xl mx-auto text-[#DEDBC8] text-xs sm:text-sm md:text-base leading-relaxed">
          <AnimatedLetterText 
            text="Over the last seven years, I have worked with Parallax, a Berlin-based production house that crafts cinema, series, and Noir Studio in Paris. Together, we have created work that has earned international acclaim at several major festivals."
            className="justify-center text-center"
          />
        </div>
      </div>
    </section>
  );
}
