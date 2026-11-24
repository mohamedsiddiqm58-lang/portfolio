import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Smartphone, Brain, Database, LucideIcon } from 'lucide-react';
import { FadeIn } from '../components/FadeIn';
import { AnimatedText } from '../components/AnimatedText';
import { ContactButton } from '../components/ContactButton';

interface FloatingBadgeProps {
  icon: LucideIcon;
  label: string;
  sublabel: string;
  className: string;
  xOffset: number;
  delay: number;
  floatDuration: number;
}

const FloatingBadge: React.FC<FloatingBadgeProps> = ({
  icon: Icon,
  label,
  sublabel,
  className,
  xOffset,
  delay,
  floatDuration,
}) => {
  return (
    <div className={`hidden lg:block absolute z-10 pointer-events-none sm:pointer-events-auto ${className}`}>
      <FadeIn delay={delay} x={xOffset} y={0} duration={0.9}>
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{
            repeat: Infinity,
            duration: floatDuration,
            ease: 'easeInOut',
          }}
          className="w-[110px] sm:w-[150px] md:w-[200px] p-[1.5px] rounded-2xl md:rounded-3xl bg-gradient-to-br from-[#B600A8]/60 via-[#7621B0]/40 to-[#BE4C00]/40 shadow-[0_0_30px_rgba(182,0,168,0.25)] backdrop-blur-md"
        >
          <div className="w-full h-full bg-[#121214]/90 rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-5 flex flex-col items-center justify-center text-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-tr from-[#B600A8]/20 to-[#7621B0]/30 flex items-center justify-center mb-1.5 sm:mb-2 text-[#D7E2EA]">
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#BBCCD7]" />
            </div>
            <span className="text-[#D7E2EA] font-semibold text-xs sm:text-sm md:text-base uppercase tracking-wider">
              {label}
            </span>
            <span className="text-[#646973] font-light text-[10px] sm:text-xs hidden sm:block">
              {sublabel}
            </span>
          </div>
        </motion.div>
      </FadeIn>
    </div>
  );
};

export const AboutSection: React.FC = () => {
  const bioText =
    "Enthusiastic web and app developer and second-year B.Tech student in Artificial Intelligence and Data Science. I love building user-focused web and mobile applications and exploring AI-powered solutions. With hands-on experience in fitness technology, healthcare, autonomous rescue concepts and algorithmic trading, i'm always learning and building. Let's create something incredible together!";

  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 bg-[#0C0C0C] overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] -z-10 rounded-full blur-[140px] opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #B600A8 0%, #7621B0 50%, transparent 80%)',
        }}
      />

      {/* Four Decorative Floating Elements in Corners */}
      {/* 1. Top-left */}
      <FloatingBadge
        icon={Code2}
        label="Web Craft"
        sublabel="React & Modern UI"
        className="top-[4%] left-[1%] sm:left-[3%]"
        xOffset={-80}
        delay={0.1}
        floatDuration={4.5}
      />

      {/* 2. Top-right */}
      <FloatingBadge
        icon={Smartphone}
        label="Mobile Dev"
        sublabel="Flutter & Cross-Platform"
        className="top-[4%] right-[1%] sm:right-[3%]"
        xOffset={80}
        delay={0.15}
        floatDuration={5.2}
      />

      {/* 3. Bottom-left */}
      <FloatingBadge
        icon={Brain}
        label="AI & DS"
        sublabel="Models & Intelligent Agents"
        className="bottom-[8%] left-[2%] sm:left-[5%]"
        xOffset={-80}
        delay={0.25}
        floatDuration={4.8}
      />

      {/* 4. Bottom-right */}
      <FloatingBadge
        icon={Database}
        label="Databases"
        sublabel="PostgreSQL & Firebase"
        className="bottom-[8%] right-[2%] sm:right-[5%]"
        xOffset={80}
        delay={0.3}
        floatDuration={5.5}
      />

      {/* Central Content */}
      <div className="w-full max-w-4xl flex flex-col items-center text-center z-20">
        {/* Heading */}
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-8 sm:mb-12"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        {/* Bio Text */}
        <div className="w-full flex justify-center">
          <AnimatedText
            text={bioText}
            className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px] text-xs sm:text-sm md:text-base px-2"
          />
        </div>

        {/* Mobile/Tablet Feature Badges Grid (visible on < lg) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10 w-full max-w-2xl lg:hidden">
          <div className="p-3 rounded-2xl bg-[#121214]/80 border border-white/10 flex flex-col items-center text-center">
            <Code2 className="w-5 h-5 text-[#B600A8] mb-1" />
            <span className="text-[#D7E2EA] font-semibold text-xs uppercase">Web Craft</span>
            <span className="text-[#646973] text-[10px]">React & UI</span>
          </div>
          <div className="p-3 rounded-2xl bg-[#121214]/80 border border-white/10 flex flex-col items-center text-center">
            <Smartphone className="w-5 h-5 text-[#7621B0] mb-1" />
            <span className="text-[#D7E2EA] font-semibold text-xs uppercase">Mobile Dev</span>
            <span className="text-[#646973] text-[10px]">Flutter</span>
          </div>
          <div className="p-3 rounded-2xl bg-[#121214]/80 border border-white/10 flex flex-col items-center text-center">
            <Brain className="w-5 h-5 text-[#B600A8] mb-1" />
            <span className="text-[#D7E2EA] font-semibold text-xs uppercase">AI & DS</span>
            <span className="text-[#646973] text-[10px]">ML & Agents</span>
          </div>
          <div className="p-3 rounded-2xl bg-[#121214]/80 border border-white/10 flex flex-col items-center text-center">
            <Database className="w-5 h-5 text-[#BE4C00] mb-1" />
            <span className="text-[#D7E2EA] font-semibold text-xs uppercase">Databases</span>
            <span className="text-[#646973] text-[10px]">PostgreSQL</span>
          </div>
        </div>

        {/* Gap between text/badges and button */}
        <div className="mt-12 sm:mt-16 md:mt-20">
          <FadeIn delay={0.2} y={20}>
            <ContactButton label="Contact Me" href="#contact" />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
