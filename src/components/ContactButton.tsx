import React from 'react';

interface ContactButtonProps {
  label?: string;
  href?: string;
  className?: string;
  onClick?: () => void;
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  label = 'Contact Me',
  href = '#contact',
  className = '',
  onClick,
}) => {
  const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');

  return (
    <a
      href={href}
      onClick={onClick}
      target={isExternal && !href.startsWith('mailto:') && !href.startsWith('tel:') ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={`inline-flex items-center justify-center rounded-full text-white font-medium uppercase tracking-widest transition-transform duration-300 hover:scale-105 active:scale-95 px-6 py-2.5 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base cursor-pointer select-none min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#B600A8] focus:ring-offset-2 focus:ring-offset-[#0C0C0C] ${className}`}
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
        outline: '2px solid white',
        outlineOffset: '-3px',
      }}
    >
      {label}
    </a>
  );
};
