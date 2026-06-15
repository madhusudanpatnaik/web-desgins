import React, { useEffect, useState } from 'react';

interface AnimatedHeadingProps {
  text: string;
  className?: string;
}

export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  text,
  className = '',
}) => {
  const [startAnimation, setStartAnimation] = useState(false);
  const delayMs = 200;
  const charDelay = 30;
  const durationMs = 500;

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, delayMs);
    return () => clearTimeout(timer);
  }, []);

  const lines = text.split('\n');
  const lineLength = lines.length > 0 ? lines[0].length : 0;

  return (
    <h1 className={className} style={{ letterSpacing: '-0.04em' }}>
      {lines.map((line, lineIndex) => {
        const words = line.split(' ');
        let charOffset = 0;
        
        return (
          <div key={lineIndex}>
            {words.map((word, wordIndex) => {
              const chars = word.split('');
              const wordNode = (
                <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
                  {chars.map((char, charIndex) => {
                    const globalCharIndex = charOffset + charIndex;
                    const itemDelay = (lineIndex * lineLength * charDelay) + (globalCharIndex * charDelay);
                    
                    return (
                      <span
                        key={`${lineIndex}-${wordIndex}-${charIndex}`}
                        className="inline-block"
                        style={{
                          opacity: startAnimation ? 1 : 0,
                          transform: startAnimation ? 'translateX(0)' : 'translateX(-18px)',
                          transition: `opacity ${durationMs}ms ease-out ${itemDelay}ms, transform ${durationMs}ms ease-out ${itemDelay}ms`,
                        }}
                      >
                        {char}
                      </span>
                    );
                  })}
                </span>
              );
              charOffset += chars.length + 1; // +1 for the space that was removed by split
              return wordNode;
            })}
          </div>
        );
      })}
    </h1>
  );
};
