import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { FadeIn } from '../components/FadeIn';
import { Magnet } from '../components/Magnet';
import { PortraitCarousel3D } from '../components/PortraitCarousel3D';
import { ContactButton } from '../components/ContactButton';
import { navItems } from '../data/portfolio';

export const HeroSection: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section className="relative h-screen min-h-[580px] sm:min-h-[640px] max-h-[1200px] flex flex-col justify-between overflow-x-clip bg-[#0C0C0C] select-none">
      {/* 1. Navbar */}
      <header className="w-full z-30 px-4 sm:px-6 md:px-10 pt-5 sm:pt-6 md:pt-8">
        <FadeIn delay={0} y={-20}>
          {/* Desktop Navigation (Unchanged reference laptop design) */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center justify-between w-full"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70 focus:outline-none focus:underline"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile Navigation Header (< md) */}
          <div className="flex md:hidden items-center justify-between w-full">
            <a
              href="#"
              className="text-[#D7E2EA] font-black uppercase tracking-wider text-base sm:text-lg"
            >
              SIDDIQ<span className="text-[#B600A8]">.DEV</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-[#D7E2EA] focus:outline-none focus:ring-2 focus:ring-[#B600A8] transition-colors hover:bg-white/10"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Navigation Overlay Drawer */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="md:hidden absolute top-16 left-4 right-4 z-50 bg-[#121214]/95 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex flex-col gap-3"
              >
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[#D7E2EA] font-semibold uppercase tracking-wider text-base py-3 px-4 min-h-[44px] flex items-center rounded-xl hover:bg-white/5 hover:text-[#B600A8] transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
                <div className="pt-2 border-t border-white/10">
                  <a
                    href="#contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="inline-flex items-center justify-center w-full min-h-[44px] py-3 rounded-2xl bg-gradient-to-r from-[#B600A8] to-[#7621B0] text-white font-medium uppercase tracking-wider text-sm shadow-lg"
                  >
                    Get In Touch
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </FadeIn>
      </header>

      {/* 2. Giant Heading */}
      <div className="w-full text-center overflow-hidden z-0 mt-4 sm:mt-4 md:-mt-5 select-none pointer-events-none">
        <FadeIn delay={0.15} y={40}>
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[13.5vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]">
            Hi, i&apos;m siddiq
          </h1>
        </FadeIn>
      </div>

      {/* 3. Illustrated Portrait with Magnet & Glow */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 w-[240px] xs:w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] max-w-[85vw] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-auto">
        <FadeIn delay={0.6} y={30} className="w-full flex justify-center">
          {/* Subtle purple/magenta radial glow behind the portrait */}
          <div
            className="absolute -inset-10 -z-10 rounded-full blur-3xl opacity-80 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(182,0,168,0.3) 0%, rgba(118,33,176,0.15) 50%, transparent 75%)',
            }}
          />

          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            className="w-full flex justify-center"
          >
            <div className="relative w-full">
              <PortraitCarousel3D />
            </div>
          </Magnet>
        </FadeIn>
      </div>

      {/* 4. Bottom bar */}
      <div className="w-full z-20 px-4 sm:px-6 md:px-10 pb-6 sm:pb-8 md:pb-10 flex justify-between items-end gap-3 mt-auto">
        <FadeIn delay={0.35} y={20}>
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[140px] xs:max-w-[180px] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.72rem, 1.4vw, 1.5rem)' }}
          >
            a web &amp; app developer and ai student building user-focused products
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton label="Contact Me" href="#contact" />
        </FadeIn>
      </div>
    </section>
  );
};
