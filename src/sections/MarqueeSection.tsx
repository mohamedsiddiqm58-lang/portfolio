import React, { useEffect, useRef, useState } from 'react';
import {
  Code, Coffee, FileCode2, Braces, Database, FileCode, Palette,
  Atom, Server, Cpu, Zap, Smartphone, Flame, GitBranch,
  Github, Terminal, Bot, Brain, Network, BarChart3, LucideIcon
} from 'lucide-react';
import { marqueeRow1, marqueeRow2 } from '../data/portfolio';

const iconMap: Record<string, LucideIcon> = {
  'C': Code,
  'Java': Coffee,
  'Python': FileCode2,
  'JavaScript': Braces,
  'SQL': Database,
  'HTML': FileCode,
  'CSS': Palette,
  'React.js': Atom,
  'Node.js': Server,
  'Express.js': Cpu,
  'FastAPI': Zap,
  'Flutter': Smartphone,
  'PostgreSQL': Database,
  'Firebase': Flame,
  'Git': GitBranch,
  'GitHub': Github,
  'VS Code': Terminal,
  'AI Agents': Bot,
  'Machine Learning': Brain,
  'API Integration': Network,
  'Data Science': BarChart3,
};

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const sectionTop = rect.top + window.scrollY;
            const currentOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
            setOffset(currentOffset);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Triple each row for continuous visuals
  const tripledRow1 = [...marqueeRow1, ...marqueeRow1, ...marqueeRow1];
  const tripledRow2 = [...marqueeRow2, ...marqueeRow2, ...marqueeRow2];

  const row1Transform = `translate3d(${offset - 200}px, 0, 0)`;
  const row2Transform = `translate3d(${-(offset - 200)}px, 0, 0)`;

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden select-none relative z-10"
      aria-label="Technical skills marquee"
    >
      <div className="flex flex-col gap-3">
        {/* Row 1 - moves RIGHT on scroll */}
        <div
          className="flex gap-3 whitespace-nowrap"
          style={{
            transform: row1Transform,
            willChange: 'transform',
            transition: 'transform 0.05s linear',
          }}
        >
          {tripledRow1.map((item, index) => {
            const Icon = iconMap[item] || Code;
            return (
              <div
                key={`row1-${index}`}
                className="w-[240px] sm:w-[320px] h-[85px] sm:h-[120px] rounded-2xl border border-[#D7E2EA]/20 bg-[#141414] flex items-center justify-center gap-4 px-6 flex-shrink-0 shadow-lg hover:border-[#D7E2EA]/40 transition-colors duration-200"
              >
                <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#BBCCD7]" />
                <span className="hero-heading uppercase font-bold text-lg sm:text-2xl tracking-wide">
                  {item}
                </span>
              </div>
            );
          })}
        </div>

        {/* Row 2 - moves LEFT on scroll */}
        <div
          className="flex gap-3 whitespace-nowrap"
          style={{
            transform: row2Transform,
            willChange: 'transform',
            transition: 'transform 0.05s linear',
          }}
        >
          {tripledRow2.map((item, index) => {
            const Icon = iconMap[item] || Code;
            return (
              <div
                key={`row2-${index}`}
                className="w-[240px] sm:w-[320px] h-[85px] sm:h-[120px] rounded-2xl border border-[#D7E2EA]/20 bg-[#141414] flex items-center justify-center gap-4 px-6 flex-shrink-0 shadow-lg hover:border-[#D7E2EA]/40 transition-colors duration-200"
              >
                <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#BBCCD7]" />
                <span className="hero-heading uppercase font-bold text-lg sm:text-2xl tracking-wide">
                  {item}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
