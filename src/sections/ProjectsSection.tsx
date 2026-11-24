import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Dumbbell, HeartPulse, Radar, LineChart, ExternalLink, LucideIcon } from 'lucide-react';
import { GhostButton } from '../components/GhostButton';
import { FadeIn } from '../components/FadeIn';
import { ProjectItem, projectsData } from '../data/portfolio';

const projectIcons: Record<string, LucideIcon> = {
  Dumbbell,
  HeartPulse,
  Radar,
  LineChart,
};

// Project Tile Component (handles real image or styled placeholder)
interface ProjectTileProps {
  imageSrc?: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  heightClass?: string;
  style?: React.CSSProperties;
  className?: string;
  gradientClass?: string;
  objectFit?: 'cover' | 'contain';
  bgClass?: string;
}

const ProjectTile: React.FC<ProjectTileProps> = ({
  imageSrc,
  icon: Icon,
  title,
  subtitle,
  style,
  className = '',
  gradientClass = 'from-[#1a1025] via-[#121214] to-[#1c0f1e]',
  objectFit = 'contain',
  bgClass = 'bg-[#0f1115]',
}) => {
  if (imageSrc) {
    return (
      <div
        style={style}
        className={`relative overflow-hidden rounded-[22px] sm:rounded-[36px] md:rounded-[50px] border border-[#D7E2EA]/20 group ${bgClass} ${className}`}
      >
        <img
          src={imageSrc}
          alt={title}
          className={`w-full h-full ${objectFit === 'contain' ? 'object-contain p-2 sm:p-3' : 'object-cover'} transition-transform duration-700 group-hover:scale-105`}
        />
        {/* Semi-transparent hover/tap overlay that preserves diagram legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3.5 sm:p-6 pointer-events-none">
          <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#BBCCD7] font-medium">
            {subtitle}
          </span>
          <span className="text-xs sm:text-base font-semibold text-white">
            {title}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      style={style}
      className={`relative overflow-hidden rounded-[22px] sm:rounded-[36px] md:rounded-[50px] border border-[#D7E2EA]/20 bg-gradient-to-br ${gradientClass} p-4 sm:p-6 flex flex-col justify-between group hover:border-[#D7E2EA]/40 transition-colors shadow-inner ${className}`}
    >
      {/* Faint Grid Background */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(215,226,234,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(215,226,234,0.15) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Top indicator */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#D7E2EA]/50 bg-black/40 px-2.5 py-1 rounded-full border border-white/5">
          {subtitle}
        </span>
        <div className="w-2 h-2 rounded-full bg-[#B600A8] animate-pulse" />
      </div>

      {/* Center Icon */}
      <div className="relative z-10 my-auto flex justify-center items-center py-4">
        <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-black/40 border border-white/10 group-hover:scale-110 transition-transform duration-500 shadow-2xl">
          <Icon className="w-6 h-6 sm:w-12 sm:h-12 text-[#BBCCD7] group-hover:text-white transition-colors" />
        </div>
      </div>

      {/* Bottom Label */}
      <div className="relative z-10">
        <div className="text-xs sm:text-sm font-medium text-[#D7E2EA] group-hover:text-white transition-colors">
          {title}
        </div>
      </div>
    </div>
  );
};

// Single Card with sticky scaling
interface CardProps {
  project: ProjectItem;
  index: number;
  totalCards: number;
}

const Card: React.FC<CardProps> = ({ project, index, totalCards }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  const Icon = projectIcons[project.icon] || Dumbbell;

  return (
    <div
      ref={containerRef}
      className="mb-8 md:mb-0 md:h-[85vh] md:min-h-[700px] flex items-start justify-center static md:sticky top-20 md:top-28"
      style={{
        top: `calc(5rem + ${index * 28}px)`,
      }}
    >
      <motion.div
        style={{ scale }}
        className="w-full max-w-6xl rounded-[32px] sm:rounded-[45px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-7 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col justify-between"
      >
        {/* TOP ROW */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 pb-5 sm:pb-6 border-b border-[#D7E2EA]/15">
          {/* Left: Number + Details */}
          <div className="flex items-start gap-3 sm:gap-6">
            <span
              className="hero-heading font-black tracking-tighter leading-none select-none text-3xl sm:text-5xl md:text-7xl"
            >
              {project.number}
            </span>

            <div className="space-y-1 sm:space-y-2 min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#B600A8] bg-[#B600A8]/15 px-2.5 py-0.5 rounded-full border border-[#B600A8]/30">
                  {project.category}
                </span>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] sm:text-xs uppercase tracking-wider text-[#D7E2EA]/70 bg-white/5 px-2 py-0.5 rounded-full border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-lg sm:text-2xl md:text-3xl font-bold uppercase tracking-tight text-[#D7E2EA] break-words">
                {project.title}
              </h3>
              <p className="text-xs sm:text-sm md:text-base font-light text-[#D7E2EA]/80 max-w-2xl leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>

          {/* Right: Action Button */}
          <div className="self-stretch sm:self-start md:self-center flex-shrink-0 pt-2 md:pt-0">
            <GhostButton
              label="View Project"
              href={project.githubUrl}
              external={true}
              className="w-full sm:w-auto"
            >
              <ExternalLink className="w-4 h-4 ml-1" />
            </GhostButton>
          </div>
        </div>

        {/* BOTTOM ROW: Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-6 pt-5 sm:pt-6">
          {/* Left column (40% on desktop -> 5 cols): stacked tiles */}
          <div className="md:col-span-5 flex flex-col gap-3.5 sm:gap-6">
            <ProjectTile
              imageSrc={project.images?.tile1}
              icon={Icon}
              title="Architecture & Prototype"
              subtitle="System Overview"
              style={{ height: 'clamp(150px, 20vw, 230px)' }}
              gradientClass="from-[#1e0c24] via-[#141416] to-[#121214]"
              objectFit="contain"
              bgClass={project.tileTheme === 'light' ? 'bg-[#F8FAF9]' : 'bg-[#060D18]'}
            />
            <ProjectTile
              imageSrc={project.images?.tile2}
              icon={Icon}
              title="Workflow & Logic"
              subtitle="Data Pipeline"
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
              gradientClass="from-[#141224] via-[#131317] to-[#1d1020]"
              objectFit="contain"
              bgClass={project.tileTheme === 'light' ? 'bg-[#F8FAF9]' : 'bg-[#060D18]'}
            />
          </div>

          {/* Right column (60% on desktop -> 7 cols): main preview tile */}
          <div className="md:col-span-7 h-[200px] xs:h-[240px] sm:h-[340px] md:h-auto">
            <ProjectTile
              imageSrc={project.images?.tile3}
              icon={Icon}
              title="Interactive Interface & Metrics"
              subtitle="Live Experience Preview"
              className="h-full min-h-[200px] xs:min-h-[240px] md:min-h-full"
              gradientClass="from-[#220d2b] via-[#171321] to-[#0f1118]"
              objectFit="contain"
              bgClass={project.images?.tile3?.includes('algo') ? 'bg-[#060D18]' : 'bg-[#F8FAF9]'}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  return (
    <section
      id="projects"
      className="relative z-10 bg-[#0C0C0C] py-20 px-4 sm:px-6 md:px-10 overflow-visible"
      aria-label="Featured Engineering Projects"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <FadeIn delay={0} y={30}>
          <div className="text-center mb-16 sm:mb-24">
            <h2
              className="hero-heading font-black uppercase leading-none tracking-tight inline-block"
              style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
            >
              Projects
            </h2>
            <p className="mt-4 text-[#D7E2EA]/60 uppercase tracking-widest text-xs sm:text-sm">
              Hand-built AI, Web &amp; Mobile Applications
            </p>
          </div>
        </FadeIn>

        {/* Sticky Stacking Cards Container */}
        <div className="relative pb-24">
          {projectsData.map((project, index) => (
            <Card
              key={project.id}
              project={project}
              index={index}
              totalCards={projectsData.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
