import React from 'react';

interface GhostButtonProps {
  label: string;
  href: string;
  className?: string;
  external?: boolean;
  children?: React.ReactNode;
}

export const GhostButton: React.FC<GhostButtonProps> = ({
  label,
  href,
  className = '',
  external = true,
  children,
}) => {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={`inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-6 py-2.5 sm:px-10 sm:py-3.5 text-xs sm:text-sm md:text-base min-h-[44px] hover:bg-[#D7E2EA]/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#D7E2EA] focus:ring-offset-2 focus:ring-offset-[#0C0C0C] ${className}`}
    >
      <span>{label}</span>
      {children}
    </a>
  );
};
