import {
  Atom,
  Box,
  BrainCircuit,
  Code2,
  Component,
  Database,
  FileCode2,
  Globe,
  Hash,
  Layers,
  Palette,
  Server,
  Sparkles,
  Terminal,
  Wind,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * Maps a tech-stack keyword to a lucide icon + brand tint color.
 * Matching is case-insensitive and partial (e.g. "React" matches "react native").
 */
const TECH_ICONS: Array<{
  match: string[];
  icon: LucideIcon;
  color: string;
}> = [
  { match: ['react'], icon: Atom, color: '#61dafb' },
  { match: ['next', 'nextjs'], icon: Layers, color: '#e6c55c' },
  { match: ['typescript', 'ts'], icon: Code2, color: '#3178c6' },
  { match: ['javascript', 'js'], icon: FileCode2, color: '#f7df1e' },
  { match: ['tailwind', 'tailwindcss'], icon: Wind, color: '#38bdf8' },
  { match: ['framer', 'motion'], icon: Sparkles, color: '#c9a227' },
  { match: ['node', 'nodejs'], icon: Server, color: '#2f6b4f' },
  { match: ['supabase', 'postgres', 'postgresql', 'sql'], icon: Database, color: '#3ecf8e' },
  { match: ['opencv', 'cv', 'vision'], icon: BrainCircuit, color: '#c9a227' },
  { match: ['three', 'threejs', 'webgl'], icon: Box, color: '#c9a227' },
  { match: ['css', 'scss'], icon: Palette, color: '#e6c55c' },
  { match: ['html'], icon: Globe, color: '#e34f26' },
  { match: ['cli', 'terminal', 'bash'], icon: Terminal, color: '#2f6b4f' },
  { match: ['vite', 'webpack', 'bundler'], icon: Zap, color: '#c9a227' },
  { match: ['component', 'ui', 'radix'], icon: Component, color: '#2f6b4f' },
];

export function resolveTechIcon(name: string): { icon: LucideIcon; color: string } {
  const lower = name.toLowerCase();
  const found = TECH_ICONS.find((t) => t.match.some((m) => lower.includes(m)));
  return found ?? { icon: Hash, color: '#c9a227' };
}
