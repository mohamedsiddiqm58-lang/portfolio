import React from 'react';
import { Mail, Phone, Linkedin, Github, MapPin, ArrowUpRight, ArrowUp } from 'lucide-react';
import { FadeIn } from '../components/FadeIn';
import { contactData } from '../data/portfolio';

interface ContactRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  isExternal?: boolean;
  delay: number;
}

const ContactRow: React.FC<ContactRowProps> = ({
  icon,
  label,
  value,
  href,
  isExternal = false,
  delay,
}) => {
  const content = (
    <div className="group relative flex items-center justify-between p-4 sm:p-5 md:p-6 rounded-2xl md:rounded-3xl border border-[#D7E2EA]/20 bg-[#141416]/70 backdrop-blur-sm transition-all duration-300 hover:border-[#D7E2EA]/50 hover:bg-[#1a1a20] hover:translate-x-1.5 shadow-lg">
      <div className="flex items-center gap-3.5 sm:gap-5 min-w-0">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-[#B600A8]/20 to-[#7621B0]/20 flex items-center justify-center text-[#BBCCD7] group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
          {icon}
        </div>
        <div className="min-w-0">
          <span className="block text-[11px] sm:text-xs uppercase font-semibold tracking-wider text-[#646973]">
            {label}
          </span>
          <span className="text-xs sm:text-base md:text-lg font-medium text-[#D7E2EA] group-hover:text-white transition-colors truncate block">
            {value}
          </span>
        </div>
      </div>

      {href && (
        <div className="w-8 h-8 rounded-full border border-[#D7E2EA]/20 flex items-center justify-center text-[#BBCCD7] group-hover:text-white group-hover:border-white transition-colors flex-shrink-0 ml-2">
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      )}
    </div>
  );

  return (
    <FadeIn delay={delay} y={20}>
      {href ? (
        <a
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="block focus:outline-none focus:ring-2 focus:ring-[#B600A8] rounded-2xl md:rounded-3xl"
        >
          {content}
        </a>
      ) : (
        content
      )}
    </FadeIn>
  );
};

export const ContactSection: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="contact"
      className="relative z-10 bg-[#0C0C0C] pt-20 sm:pt-28 pb-12 px-4 sm:px-8 md:px-10 border-t border-[#D7E2EA]/10 overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] -z-10 rounded-full blur-[160px] opacity-25 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #B600A8 0%, #7621B0 50%, transparent 80%)',
        }}
      />

      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Huge Heading */}
        <FadeIn delay={0} y={40}>
          <div className="text-center mb-12 sm:mb-16">
            <h2
              className="hero-heading font-black uppercase leading-none tracking-tight text-center"
              style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
            >
              Let&apos;s talk
            </h2>
            <p className="mt-4 text-[#D7E2EA]/70 font-light text-xs sm:text-base md:text-lg max-w-md mx-auto leading-relaxed">
              Have a project, opportunity, or collaboration in mind? Reach out and let&apos;s build something exceptional.
            </p>
          </div>
        </FadeIn>

        {/* Contact Cards List */}
        <div className="w-full max-w-2xl flex flex-col gap-3.5 sm:gap-4 mb-16 sm:mb-20">
          <ContactRow
            icon={<Mail className="w-5 h-5 text-[#BBCCD7]" />}
            label="Email"
            value={contactData.email}
            href={`mailto:${contactData.email}`}
            delay={0.1}
          />

          <ContactRow
            icon={<Phone className="w-5 h-5 text-[#BBCCD7]" />}
            label="Phone"
            value={contactData.phone}
            href={`tel:${contactData.phone}`}
            delay={0.15}
          />

          <ContactRow
            icon={<Linkedin className="w-5 h-5 text-[#BBCCD7]" />}
            label="LinkedIn"
            value={contactData.linkedinDisplay}
            href={contactData.linkedinUrl}
            isExternal={true}
            delay={0.2}
          />

          <ContactRow
            icon={<Github className="w-5 h-5 text-[#BBCCD7]" />}
            label="GitHub"
            value={contactData.githubDisplay}
            href={contactData.githubUrl}
            isExternal={true}
            delay={0.25}
          />

          <ContactRow
            icon={<MapPin className="w-5 h-5 text-[#BBCCD7]" />}
            label="Location"
            value={contactData.location}
            delay={0.3}
          />
        </div>

        {/* Footer Navigation & Social Icons Bar */}
        <div className="w-full pt-8 border-t border-[#D7E2EA]/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo / Attribution */}
          <div className="text-center sm:text-left">
            <span className="text-sm font-black uppercase tracking-wider text-[#D7E2EA]">
              MOHAMED SIDDIQ<span className="text-[#B600A8]">.DEV</span>
            </span>
            <p className="text-[#D7E2EA]/50 text-xs tracking-wider uppercase font-light mt-0.5">
              &copy; 2026 Mohamed Siddiq M. All rights reserved.
            </p>
          </div>

          {/* Social Icons & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href={contactData.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#BBCCD7] hover:text-white hover:bg-[#B600A8]/20 hover:border-[#B600A8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#B600A8]"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={contactData.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#BBCCD7] hover:text-white hover:bg-[#B600A8]/20 hover:border-[#B600A8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#B600A8]"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${contactData.email}`}
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#BBCCD7] hover:text-white hover:bg-[#B600A8]/20 hover:border-[#B600A8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#B600A8]"
              aria-label="Email Siddiq"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#BBCCD7] hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#B600A8]"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
