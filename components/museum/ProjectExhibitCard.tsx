'use client';

import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionStyle,
} from 'framer-motion';
import { Eye, Github, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { resolveTechIcon } from './tech-icons';
import { PREVIEW_FALLBACK_URL, type ProjectExhibitCardProps } from './types';

const MAX_TILT = 8; // degrees of 3D tilt
const SPRING = { stiffness: 150, damping: 20, mass: 0.4 };

/**
 * ProjectExhibitCard
 * A "Code Museum" exhibit card: dark, premium, with a cursor-following
 * spotlight, subtle 3D tilt, dust + scanline overlays, and glassmorphism
 * action buttons that appear on hover.
 */
export default function ProjectExhibitCard({
  title,
  description,
  image,
  imageAlt,
  techStack,
  previewUrl,
  repoUrl,
  artifactId,
  year,
  className,
}: ProjectExhibitCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Raw pointer position (0..1) for the spotlight + tilt math.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  // Smoothed values so the tilt eases in/out.
  const sx = useSpring(px, SPRING);
  const sy = useSpring(py, SPRING);

  const rotateX = useTransform(sy, [0, 1], [MAX_TILT, -MAX_TILT]);
  const rotateY = useTransform(sx, [0, 1], [-MAX_TILT, MAX_TILT]);

  // Spotlight position as a CSS background gradient string.
  const spotlightBg = useMotionTemplate`radial-gradient(
    500px circle at calc(${sx} * 100%) calc(${sy} * 100%),
    rgba(201, 162, 39, 0.20),
    rgba(47, 107, 79, 0.12) 28%,
    transparent 60%
  )`;

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      px.set((e.clientX - rect.left) / rect.width);
      py.set((e.clientY - rect.top) / rect.height);
    },
    [px, py],
  );

  const handlePointerLeave = useCallback(() => {
    px.set(0.5);
    py.set(0.5);
    setIsHovered(false);
  }, [px, py]);

  // Hover OR keyboard focus both reveal the interactive layer.
  const isActive = isHovered || isFocused;

  return (
    <motion.article
      ref={cardRef}
      className={cn(
        'group relative w-full max-w-md select-none',
        '[perspective:1200px]',
        className,
      )}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={handlePointerLeave}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      aria-label={`${title} exhibit`}
    >
      {/* 3D-tilting body */}
      <motion.div
        className="relative overflow-hidden rounded-2xl border border-border bg-card"
        style={
          {
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
            boxShadow: isActive
              ? '0 0 0 1px rgba(201,162,39,0.45), 0 24px 60px -12px rgba(201,162,39,0.30), 0 0 80px -20px rgba(47,107,79,0.45)'
              : '0 10px 30px -12px rgba(0,0,0,0.8)',
            transition: 'box-shadow 0.5s ease',
          } as MotionStyle
        }
      >
        {/* ---- Thumbnail ---- */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <motion.div
            className="absolute inset-0"
            animate={{ scale: isActive ? 1.08 : 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={image}
              alt={imageAlt ?? `${title} project thumbnail`}
              fill
              sizes="(max-width: 768px) 100vw, 28rem"
              className="object-cover"
            />
          </motion.div>

          {/* Dark overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10"
            animate={{ opacity: isActive ? 1 : 0.25 }}
            transition={{ duration: 0.4 }}
          />

          {/* Scanline texture */}
          <div className="museum-scanlines pointer-events-none absolute inset-0 opacity-40" />
          {/* Dust particles */}
          <div className="museum-dust pointer-events-none absolute inset-0 opacity-50" />

          {/* Artifact ID — top right */}
          <div className="absolute right-3 top-3 z-20">
            <span className="font-museum-mono rounded-full border border-museum-gold/40 bg-black/60 px-2.5 py-1 text-[10px] font-medium tracking-[0.2em] text-museum-gold-soft backdrop-blur-sm">
              {artifactId}
            </span>
          </div>

          {/* ---- Hover action buttons ---- */}
          <motion.div
            className="absolute inset-0 z-10 flex items-center justify-center"
            initial={false}
            animate={{
              opacity: isActive ? 1 : 0,
              y: isActive ? 0 : 12,
            }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            aria-hidden={!isActive}
          >
            <div className="flex flex-col gap-3 sm:flex-row">
              <ActionLink
                href={previewUrl ?? PREVIEW_FALLBACK_URL}
                label={`View live preview of ${title}`}
                icon={<Eye className="h-4 w-4" />}
                text="View Preview"
                externalIcon={<ExternalLink className="h-3 w-3" />}
              />
              <ActionLink
                href={repoUrl}
                label={`View GitHub repository for ${title}`}
                icon={<Github className="h-4 w-4" />}
                text="Repository"
              />
            </div>
          </motion.div>
        </div>

        {/* ---- Bottom info section ---- */}
        <div className="relative z-10 p-5">
          {/* Spotlight overlay sits above the card bg, below the text */}
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{ background: spotlightBg }}
          />

          <div className="relative">
            <div className="mb-1 flex items-baseline justify-between gap-3">
              <h3 className="font-museum-serif text-2xl font-bold leading-tight text-museum-ivory">
                {title}
              </h3>
              <span className="font-museum-mono shrink-0 text-xs tracking-widest text-museum-gold/70">
                {year}
              </span>
            </div>

            {/* Description — fades/slides down on hover */}
            <motion.p
              className="mb-3 text-sm leading-relaxed text-muted-foreground"
              animate={{
                opacity: isActive ? 0.35 : 1,
                y: isActive ? 6 : 0,
              }}
              transition={{ duration: 0.35 }}
            >
              {description}
            </motion.p>

            {/* Tech stack badges */}
            <motion.ul
              className="flex flex-wrap gap-1.5"
              animate={{
                opacity: isActive ? 0.4 : 1,
                y: isActive ? 4 : 0,
              }}
              transition={{ duration: 0.35 }}
            >
              {techStack.map((tech) => {
                const { icon: Icon, color } = resolveTechIcon(tech.name);
                return (
                  <li
                    key={tech.name}
                    className="flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium"
                    style={{
                      borderColor: `${color}40`,
                      backgroundColor: `${color}14`,
                      color: color,
                    }}
                  >
                    <Icon className="h-3 w-3" style={{ color }} />
                    {tech.name}
                  </li>
                );
              })}
            </motion.ul>
          </div>
        </div>

        {/* Top border shimmer line on hover */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(201,162,39,0.8), transparent)',
          }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </motion.article>
  );
}

/* -------------------------------------------------------------------------- */

type ActionLinkProps = {
  href: string;
  label: string;
  icon: React.ReactNode;
  text: string;
  externalIcon?: React.ReactNode;
};

function ActionLink({ href, label, icon, text, externalIcon }: ActionLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        'glass-gold group/btn inline-flex items-center gap-2 rounded-lg px-4 py-2.5',
        'text-sm font-medium text-museum-ivory',
        'transition-all duration-300',
        'hover:border-museum-gold hover:bg-museum-gold/15 hover:text-museum-gold-soft',
        'hover:shadow-[0_0_20px_-4px_rgba(201,162,39,0.6)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-museum-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black',
      )}
    >
      {icon}
      <span>{text}</span>
      {externalIcon && (
        <span className="opacity-60 transition-transform duration-300 group-hover/btn:translate-x-0.5">
          {externalIcon}
        </span>
      )}
    </a>
  );
}
