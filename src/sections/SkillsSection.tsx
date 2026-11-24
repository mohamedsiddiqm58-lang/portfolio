import React from 'react';
import {
  Code2, Coffee, FileCode2, Braces, Database, GitBranch,
  Github, Terminal, LucideIcon
} from 'lucide-react';
import { FadeIn } from '../components/FadeIn';
import { skillItems, techChips } from '../data/portfolio';

const chipIconMap: Record<string, LucideIcon> = {
  Code2,
  Coffee,
  FileCode2,
  Braces,
  Database,
  GitBranch,
  Github,
  Terminal,
};

export const SkillsSection: React.FC = () => {
  return (
    <section
      id="skills"
      className="bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-4 sm:px-8 md:px-10 py-16 sm:py-24 md:py-32 relative z-20"
      aria-label="Core Technical Skills"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <FadeIn delay={0} y={30}>
          <h2
            className="text-[#0C0C0C] font-black uppercase text-center leading-none tracking-tight mb-12 sm:mb-20 md:mb-28"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Skills
          </h2>
        </FadeIn>

        {/* Desktop View: 5 Vertical Items (Reference laptop design) */}
        <div className="hidden md:flex flex-col border-t border-[rgba(12,12,12,0.15)]">
          {skillItems.map((item, index) => (
            <FadeIn key={item.number} delay={index * 0.1} y={25}>
              <div className="flex flex-row items-baseline justify-between border-b border-[rgba(12,12,12,0.15)] py-8 sm:py-10 md:py-12 gap-6 sm:gap-10 transition-colors duration-200 hover:bg-black/[0.02] px-4 rounded-xl">
                {/* Number */}
                <div
                  className="font-black text-[#0C0C0C] tracking-tighter leading-none select-none min-w-[140px] md:min-w-[180px]"
                  style={{ fontSize: 'clamp(2.8rem, 10vw, 140px)' }}
                >
                  {item.number}
                </div>

                {/* Name & Description */}
                <div className="flex-1 flex flex-col gap-2 sm:gap-3">
                  <h3
                    className="font-medium uppercase tracking-tight text-[#0C0C0C]"
                    style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="font-light text-[#0C0C0C] leading-relaxed max-w-2xl opacity-60"
                    style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Mobile View: 2-Column Responsive Skill Cards (< md) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 md:hidden">
          {skillItems.map((item, index) => (
            <FadeIn key={item.number} delay={index * 0.08} y={20}>
              <div className="h-full p-4 sm:p-5 rounded-2xl border border-[rgba(12,12,12,0.12)] bg-black/[0.02] hover:bg-black/[0.04] transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-black text-xl text-[#B600A8] tracking-tight">
                      {item.number}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-black/[0.05] text-[#0C0C0C]/60">
                      Core Skill
                    </span>
                  </div>
                  <h3 className="font-semibold uppercase tracking-tight text-sm sm:text-base text-[#0C0C0C] mb-1.5">
                    {item.title}
                  </h3>
                  <p className="font-light text-xs text-[#0C0C0C]/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Chips for Languages & Tools */}
        <div className="mt-12 sm:mt-20 pt-8 border-t border-[rgba(12,12,12,0.1)] flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Programming Languages */}
          <div className="flex flex-col items-center md:items-start gap-3 w-full md:w-auto">
            <span className="text-xs uppercase font-semibold tracking-wider text-[#0C0C0C]/50">
              Programming Languages
            </span>
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:flex sm:flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3 w-full">
              {techChips.languages.map((chip) => {
                const Icon = chipIconMap[chip.icon] || Code2;
                return (
                  <div
                    key={chip.name}
                    className="flex items-center justify-center sm:justify-start gap-2 px-3.5 py-2 sm:px-4 sm:py-2 rounded-xl sm:rounded-full border border-[rgba(12,12,12,0.15)] bg-black/[0.03] text-[#0C0C0C] text-xs sm:text-sm font-medium hover:bg-black/[0.08] transition-colors shadow-sm min-h-[40px]"
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0C0C0C]/70 flex-shrink-0" />
                    <span className="truncate">{chip.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Developer Tools */}
          <div className="flex flex-col items-center md:items-start gap-3 w-full md:w-auto">
            <span className="text-xs uppercase font-semibold tracking-wider text-[#0C0C0C]/50">
              Developer Tools
            </span>
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:flex sm:flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3 w-full">
              {techChips.tools.map((chip) => {
                const Icon = chipIconMap[chip.icon] || Terminal;
                return (
                  <div
                    key={chip.name}
                    className="flex items-center justify-center sm:justify-start gap-2 px-3.5 py-2 sm:px-4 sm:py-2 rounded-xl sm:rounded-full border border-[rgba(12,12,12,0.15)] bg-black/[0.03] text-[#0C0C0C] text-xs sm:text-sm font-medium hover:bg-black/[0.08] transition-colors shadow-sm min-h-[40px]"
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0C0C0C]/70 flex-shrink-0" />
                    <span className="truncate">{chip.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
