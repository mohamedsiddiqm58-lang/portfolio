import React from 'react';
import { Briefcase, GraduationCap, Trophy, Award, Calendar, CheckCircle2 } from 'lucide-react';
import { FadeIn } from '../components/FadeIn';
import { journeyData } from '../data/portfolio';

export const ExperienceSection: React.FC = () => {
  return (
    <section
      id="experience"
      className="relative z-10 bg-[#0C0C0C] -mt-10 sm:-mt-12 md:-mt-14 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] pt-20 sm:pt-28 pb-20 px-5 sm:px-8 md:px-10 border-t border-[#D7E2EA]/10 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <FadeIn delay={0} y={30}>
          <div className="text-center mb-16 sm:mb-20">
            <h2
              className="hero-heading font-black uppercase leading-none tracking-tight inline-block"
              style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
            >
              Journey
            </h2>
            <p className="mt-4 text-[#D7E2EA]/60 uppercase tracking-widest text-xs sm:text-sm">
              Experience &bull; Education &bull; Milestones
            </p>
          </div>
        </FadeIn>

        {/* 2-Column Grid (stacked on mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
          {/* Column 1: Experience */}
          <FadeIn delay={0.1} y={30}>
            <div className="h-full border border-[#D7E2EA]/30 rounded-[24px] sm:rounded-[30px] p-4 sm:p-6 md:p-8 bg-[#121214]/60 backdrop-blur-sm flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#D7E2EA]/15">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#B600A8]/30 to-[#7621B0]/30 flex items-center justify-center text-[#BBCCD7] flex-shrink-0">
                    <Briefcase className="w-5 h-5 text-[#BBCCD7]" />
                  </div>
                  <h3 className="hero-heading text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight">
                    Experience
                  </h3>
                </div>

                <div className="space-y-6 sm:space-y-8">
                  {/* Position 1 */}
                  <div className="relative pl-5 sm:pl-6 border-l-2 border-[#B600A8]/60 space-y-1.5 sm:space-y-2">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#B600A8] ring-4 ring-[#0C0C0C]" />
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-medium bg-[#B600A8]/20 text-[#D7E2EA] border border-[#B600A8]/30">
                      <Calendar className="w-3 h-3 flex-shrink-0" />
                      <span>{journeyData.experience[0].duration}</span>
                    </span>
                    <h4 className="text-lg sm:text-xl font-semibold text-[#D7E2EA] pt-1">
                      {journeyData.experience[0].role}
                    </h4>
                    <p className="text-xs sm:text-sm font-medium text-[#BBCCD7]/80">
                      {journeyData.experience[0].organization}
                    </p>
                    <ul className="mt-3 space-y-2 text-xs sm:text-sm text-[#D7E2EA]/75 font-light">
                      {journeyData.experience[0].details?.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B600A8] mt-0.5 flex-shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Position 2 */}
                  <div className="relative pl-5 sm:pl-6 border-l-2 border-[#7621B0]/50 space-y-1.5 sm:space-y-2">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#7621B0] ring-4 ring-[#0C0C0C]" />
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-medium bg-[#7621B0]/20 text-[#D7E2EA] border border-[#7621B0]/30">
                      <Calendar className="w-3 h-3 flex-shrink-0" />
                      <span>{journeyData.experience[1].duration}</span>
                    </span>
                    <h4 className="text-lg sm:text-xl font-semibold text-[#D7E2EA] pt-1">
                      {journeyData.experience[1].role}
                    </h4>
                    <p className="text-xs sm:text-sm font-medium text-[#BBCCD7]/80">
                      {journeyData.experience[1].organization}
                    </p>
                    <ul className="mt-2 space-y-1.5 text-xs sm:text-sm text-[#D7E2EA]/75 font-light">
                      {journeyData.experience[1].details?.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#7621B0] mt-0.5 flex-shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Column 2: Education & Achievements */}
          <div className="flex flex-col gap-6 sm:gap-8">
            {/* Education Card */}
            <FadeIn delay={0.2} y={30}>
              <div className="border border-[#D7E2EA]/30 rounded-[24px] sm:rounded-[30px] p-4 sm:p-6 md:p-8 bg-[#121214]/60 backdrop-blur-sm shadow-xl">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#D7E2EA]/15">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#7621B0]/30 to-[#BE4C00]/30 flex items-center justify-center text-[#BBCCD7] flex-shrink-0">
                    <GraduationCap className="w-5 h-5 text-[#BBCCD7]" />
                  </div>
                  <h3 className="hero-heading text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight">
                    Education
                  </h3>
                </div>

                <div className="space-y-5 sm:space-y-6">
                  {/* B.Tech */}
                  <div className="relative pl-5 sm:pl-6 border-l-2 border-[#BE4C00]/60 space-y-1">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#BE4C00] ring-4 ring-[#0C0C0C]" />
                    <span className="text-[11px] sm:text-xs font-medium text-[#BE4C00] uppercase tracking-wider">
                      {journeyData.education[0].duration}
                    </span>
                    <h4 className="text-base sm:text-lg font-semibold text-[#D7E2EA]">
                      {journeyData.education[0].degree}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#BBCCD7]/80">
                      {journeyData.education[0].institution}
                    </p>
                    {journeyData.education[0].grade && (
                      <div className="inline-block mt-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-medium text-[#D7E2EA]">
                        ⭐ {journeyData.education[0].grade}
                      </div>
                    )}
                  </div>

                  {/* Schooling */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 pt-2">
                    <div className="p-3.5 rounded-2xl bg-black/30 border border-white/5">
                      <span className="text-xs text-[#646973] uppercase tracking-wider block">
                        {journeyData.education[1].duration}
                      </span>
                      <h5 className="text-sm font-semibold text-[#D7E2EA] mt-1">
                        {journeyData.education[1].degree}
                      </h5>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-black/30 border border-white/5">
                      <span className="text-xs text-[#646973] uppercase tracking-wider block">
                        {journeyData.education[2].duration}
                      </span>
                      <h5 className="text-sm font-semibold text-[#D7E2EA] mt-1">
                        {journeyData.education[2].degree}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Achievements Card */}
            <FadeIn delay={0.3} y={30}>
              <div className="border border-[#D7E2EA]/30 rounded-[30px] p-6 sm:p-8 bg-[#121214]/60 backdrop-blur-sm shadow-xl">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#D7E2EA]/15">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#B600A8]/30 to-[#BE4C00]/30 flex items-center justify-center text-[#BBCCD7]">
                    <Trophy className="w-5 h-5 text-[#BBCCD7]" />
                  </div>
                  <h3 className="hero-heading text-2xl sm:text-3xl font-bold uppercase tracking-tight">
                    Achievements
                  </h3>
                </div>

                <div className="space-y-4">
                  {/* Achievement 1 */}
                  <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-gradient-to-r from-[#B600A8]/10 to-transparent border border-[#B600A8]/30">
                    <Trophy className="w-6 h-6 text-[#B600A8] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-base font-semibold text-[#D7E2EA]">
                        {journeyData.achievements[0].title}
                      </h4>
                      <p className="text-xs text-[#BBCCD7]/70 font-medium">
                        {journeyData.achievements[0].event}
                      </p>
                      <p className="text-xs text-[#D7E2EA]/60 font-light mt-1">
                        {journeyData.achievements[0].description}
                      </p>
                    </div>
                  </div>

                  {/* Achievement 2 */}
                  <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-gradient-to-r from-[#7621B0]/10 to-transparent border border-[#7621B0]/30">
                    <Award className="w-6 h-6 text-[#BBCCD7] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-base font-semibold text-[#D7E2EA]">
                        {journeyData.achievements[1].title}
                      </h4>
                      <p className="text-xs text-[#BBCCD7]/70 font-medium">
                        {journeyData.achievements[1].event}
                      </p>
                      <p className="text-xs text-[#D7E2EA]/60 font-light mt-1">
                        {journeyData.achievements[1].description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};
