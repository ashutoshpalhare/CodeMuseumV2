import type { LucideIcon } from 'lucide-react';

export type TechStackItem = {
  name: string;
  /** Optional brand color used for the badge background tint */
  color?: string;
  /** Optional lucide icon name; falls back to a generic dot */
  icon?: LucideIcon;
};

/** Museum gallery categories used by the filter */
export type ProjectCategory =
  | 'Full Stack'
  | 'Frontend'
  | 'Backend'
  | 'AI / ML'
  | 'Open Source'
  | 'Developer Tools'
  | 'Utilities & Automation'
  | 'Experimental Labs';

export type ProjectExhibitCardProps = {
  /** Full project title */
  title: string;
  /** One-line description shown under the title */
  description: string;
  /** Thumbnail image URL (passed to next/image) */
  image: string;
  /** Alt text for the thumbnail */
  imageAlt?: string;
  /** Tech stack badges */
  techStack: TechStackItem[];
  /**
   * Live demo URL — opens in a new tab.
   * If omitted, the "View Preview" button falls back to the curator's YouTube channel.
   */
  previewUrl?: string;
  /** GitHub repository URL — opens in a new tab */
  repoUrl: string;
  /** Museum artifact identifier, e.g. "CM-023" */
  artifactId: string;
  /** Year the project was created */
  year: string | number;
  /** Gallery categories this exhibit belongs to */
  categories: ProjectCategory[];
  /** Optional className override for the outer wrapper */
  className?: string;
};

/** Fallback URL used when a project has no live deployment */
export const PREVIEW_FALLBACK_URL = 'https://www.youtube.com/@AshutoshPalhare';
