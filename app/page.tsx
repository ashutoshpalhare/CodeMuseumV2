import type { Metadata } from 'next';
import { Github, Twitter, MapPin, Briefcase, ArrowUpRight } from 'lucide-react';
import { ExhibitGallery } from '@/components/museum';
import type { ProjectExhibitCardProps } from '@/components/museum/types';

export const metadata: Metadata = {
  title: 'Code Museum',
  description:
    'A curated collection of software artifacts, experiments, and digital creations built with modern technologies.',
};

const CURATOR = {
  name: 'Ashutosh Palhare',
  handle: 'ashutoshpalhare',
  tagline: 'Every project tells a story. Welcome to the Code Museum.',
  bio: 'A curated collection of software artifacts, experiments, and digital creations built with modern technologies.',
  location: 'Maharashtra, India',
  company: '@devculture4you',
  github: 'https://github.com/ashutoshpalhare',
  twitter: 'https://twitter.com/AshutoshPalhare',
  site: 'https://ashutoshpalhare.github.io',
  avatar: 'https://avatars.githubusercontent.com/u/53346137?v=4',
};

const exhibits: ProjectExhibitCardProps[] = [
  {
    artifactId: 'CM-013',
    title: 'BioLinks V2',
    description:
      'Premium Linktree-inspired digital business card with a modern glassmorphism UI.',
    image:
      'https://images.pexels.com/photos/6424587/pexels-photo-6424587.jpeg?auto=compress&cs=tinysrgb&w=1200',
    imageAlt: 'Glassmorphism business card interface',
    year: 2026,
    previewUrl: 'https://ashutoshpalhare.github.io/BioLinksV2/',
    repoUrl: 'https://github.com/ashutoshpalhare/BioLinksV2',
    techStack: [{ name: 'HTML' }, { name: 'CSS' }, { name: 'JavaScript' }],
    categories: ['Frontend', 'Open Source', 'Utilities & Automation'],
  },
  {
    artifactId: 'CM-012',
    title: 'mactab',
    description: 'A TypeScript-based tab management utility for modern browsers.',
    image:
      'https://images.pexels.com/photos/37657434/pexels-photo-37657434.jpeg?auto=compress&cs=tinysrgb&w=1200',
    imageAlt: 'Tab management interface',
    year: 2026,
    repoUrl: 'https://github.com/ashutoshpalhare/mactab',
    techStack: [{ name: 'TypeScript' }],
    categories: ['Developer Tools', 'Experimental Labs'],
  },
  {
    artifactId: 'CM-011',
    title: 'Developer Portfolio',
    description:
      'Personal developer portfolio showcasing projects, skills, and experience.',
    image:
      'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=1200',
    imageAlt: 'Developer portfolio on a monitor',
    year: 2026,
    repoUrl: 'https://github.com/ashutoshpalhare/ashutosh-palhare-s-portfolio',
    techStack: [{ name: 'React' }, { name: 'TypeScript' }, { name: 'Vite' }],
    categories: ['Frontend', 'Full Stack', 'Open Source'],
  },
  {
    artifactId: 'CM-010',
    title: 'Personal Website',
    description:
      'Portfolio website showcasing web dev, app dev, cybersecurity, and graphic editing skills.',
    image:
      'https://images.pexels.com/photos/37709121/pexels-photo-37709121.jpeg?auto=compress&cs=tinysrgb&w=1200',
    imageAlt: 'Personal website on a screen',
    year: 2026,
    previewUrl: 'https://ashutoshpalhare.github.io/',
    repoUrl: 'https://github.com/ashutoshpalhare/ashutoshpalhare.github.io',
    techStack: [{ name: 'HTML' }, { name: 'CSS' }, { name: 'JavaScript' }],
    categories: ['Frontend', 'Open Source'],
  },
  {
    artifactId: 'CM-009',
    title: 'Termy',
    description: 'A colourful terminal emulator for Linux built with shell scripting.',
    image:
      'https://images.pexels.com/photos/5380603/pexels-photo-5380603.jpeg?auto=compress&cs=tinysrgb&w=1200',
    imageAlt: 'Colourful terminal interface',
    year: 2024,
    repoUrl: 'https://github.com/ashutoshpalhare/Termy',
    techStack: [{ name: 'Shell' }, { name: 'Terminal' }],
    categories: ['Developer Tools', 'Open Source', 'Utilities & Automation'],
  },
  {
    artifactId: 'CM-008',
    title: 'WebDev Projects',
    description:
      'A compilation of 10+ clean, effective web development mini-projects for learning.',
    image:
      'https://images.pexels.com/photos/326501/pexels-photo-326501.jpeg?auto=compress&cs=tinysrgb&w=1200',
    imageAlt: 'Web development projects collection',
    year: 2024,
    previewUrl: 'https://ashutosh786palhare.github.io/WebDev-Projects/',
    repoUrl: 'https://github.com/ashutoshpalhare/WebDev-Projects',
    techStack: [{ name: 'HTML' }, { name: 'CSS' }, { name: 'JavaScript' }],
    categories: ['Frontend', 'Open Source', 'Experimental Labs'],
  },
  {
    artifactId: 'CM-007',
    title: 'E-Start 2',
    description:
      'Feature-rich custom Chrome start page with speed dials, quotes, and a sleek design.',
    image:
      'https://images.pexels.com/photos/2156881/pexels-photo-2156881.jpeg?auto=compress&cs=tinysrgb&w=1200',
    imageAlt: 'Custom Chrome start page',
    year: 2024,
    previewUrl: 'https://ashutosh786palhare.github.io/E-Start2/',
    repoUrl: 'https://github.com/ashutoshpalhare/E-Start2',
    techStack: [{ name: 'HTML' }, { name: 'CSS' }, { name: 'JavaScript' }],
    categories: ['Frontend', 'Utilities & Automation', 'Open Source'],
  },
  {
    artifactId: 'CM-006',
    title: 'E-Start 1',
    description:
      'Personalized Chrome start page with speed dial, quotes, dual search bars, and social nav.',
    image:
      'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1200',
    imageAlt: 'Chrome start page with speed dial',
    year: 2024,
    previewUrl: 'https://ashutosh786palhare.github.io/E-Start1/',
    repoUrl: 'https://github.com/ashutoshpalhare/E-Start1',
    techStack: [{ name: 'HTML' }, { name: 'CSS' }, { name: 'JavaScript' }],
    categories: ['Frontend', 'Utilities & Automation', 'Experimental Labs'],
  },
  {
    artifactId: 'CM-005',
    title: 'FaceWise',
    description:
      'Python attendance system using face recognition — register faces, mark attendance, generate reports.',
    image:
      'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200',
    imageAlt: 'Face recognition attendance system',
    year: 2024,
    repoUrl: 'https://github.com/ashutoshpalhare/FaceWise',
    techStack: [{ name: 'Python' }, { name: 'OpenCV' }],
    categories: ['AI / ML', 'Backend', 'Utilities & Automation'],
  },
  {
    artifactId: 'CM-004',
    title: 'BK Estate',
    description: 'Official website for B & K Estate company with property listings.',
    image:
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1200',
    imageAlt: 'Real estate company website',
    year: 2024,
    previewUrl: 'https://ashutosh786palhare.github.io/BK-Estate/',
    repoUrl: 'https://github.com/ashutoshpalhare/BK-Estate',
    techStack: [{ name: 'HTML' }, { name: 'CSS' }],
    categories: ['Frontend', 'Full Stack'],
  },
  {
    artifactId: 'CM-003',
    title: 'Python Micro Projects',
    description:
      'A curated collection of Python micro-projects, each with docs and requirements.',
    image:
      'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=1200',
    imageAlt: 'Python micro projects',
    year: 2023,
    repoUrl: 'https://github.com/ashutoshpalhare/Python-Micro-Projects',
    techStack: [{ name: 'Python' }],
    categories: ['Open Source', 'Developer Tools', 'Experimental Labs'],
  },
  {
    artifactId: 'CM-002',
    title: 'BioLinks',
    description:
      'Customizable Linktree clone built with HTML, CSS, and JavaScript for your social profiles.',
    image:
      'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=1200',
    imageAlt: 'BioLinks landing page',
    year: 2023,
    repoUrl: 'https://github.com/ashutoshpalhare/BioLinks',
    techStack: [{ name: 'HTML' }, { name: 'CSS' }, { name: 'JavaScript' }],
    categories: ['Frontend', 'Open Source', 'Utilities & Automation'],
  },
  {
    artifactId: 'CM-001',
    title: 'Asset Collection',
    description: 'A curated collection of personal assets, snippets, and configuration files.',
    image:
      'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=1200',
    imageAlt: 'Asset collection',
    year: 2026,
    previewUrl: 'https://ashutoshpalhare.github.io/',
    repoUrl: 'https://github.com/ashutoshpalhare/ashutoshpalhare',
    techStack: [{ name: 'HTML' }, { name: 'CSS' }],
    categories: ['Open Source', 'Utilities & Automation', 'Experimental Labs'],
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-museum-bg text-museum-ivory">
      {/* Ambient museum backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-museum-green/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[600px] rounded-full bg-museum-gold/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-20">
        {/* Curator hero */}
        <header className="mb-20 flex flex-col items-center text-center">
          <div className="relative mb-6">
            <div className="absolute -inset-2 rounded-full bg-museum-gold/20 blur-2xl" />
            <img
              src={CURATOR.avatar}
              alt={CURATOR.name}
              className="relative h-28 w-28 rounded-full border-2 border-museum-gold/50 object-cover"
            />
          </div>
          <p className="font-museum-mono mb-3 text-xs uppercase tracking-[0.4em] text-museum-gold/70">
            Curated by {CURATOR.name}
          </p>
          <h1 className="font-museum-serif text-5xl font-bold leading-tight text-museum-ivory sm:text-6xl">
            The <span className="text-gold-gradient">Code Museum</span>
          </h1>
          <p className="mt-3 text-sm uppercase tracking-[0.25em] text-museum-gold-soft/80">
            {CURATOR.tagline}
          </p>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            {CURATOR.bio}
          </p>

          {/* Curator meta */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-museum-green-bright" />
              {CURATOR.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Briefcase className="h-3.5 w-3.5 text-museum-green-bright" />
              {CURATOR.company}
            </span>
          </div>

          {/* Curator links */}
          <div className="mt-6 flex items-center gap-3">
            <a
              href={CURATOR.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Ashutosh Palhare's GitHub profile"
              className="glass-gold inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-museum-ivory transition-all duration-300 hover:border-museum-gold hover:text-museum-gold-soft hover:shadow-[0_0_20px_-4px_rgba(201,162,39,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-museum-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href={CURATOR.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Ashutosh Palhare's Twitter profile"
              className="glass-gold inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-museum-ivory transition-all duration-300 hover:border-museum-gold hover:text-museum-gold-soft hover:shadow-[0_0_20px_-4px_rgba(201,162,39,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-museum-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <Twitter className="h-4 w-4" />
              Twitter
            </a>
            <a
              href={CURATOR.site}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Ashutosh Palhare's personal website"
              className="glass-gold inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-museum-ivory transition-all duration-300 hover:border-museum-gold hover:text-museum-gold-soft hover:shadow-[0_0_20px_-4px_rgba(201,162,39,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-museum-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Website
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mx-auto mt-10 h-px w-32 bg-gradient-to-r from-transparent via-museum-gold/60 to-transparent" />
        </header>

        {/* Project Showcase */}
        <section aria-label="Project Showcase" className="mb-10">
          <div className="mb-8 text-center">
            <p className="font-museum-mono mb-2 text-xs uppercase tracking-[0.4em] text-museum-gold/70">
              The Collection
            </p>
            <h2 className="font-museum-serif text-3xl font-bold text-museum-ivory sm:text-4xl">
              Project Showcase
            </h2>
          </div>

          <ExhibitGallery exhibits={exhibits} />
        </section>

        {/* Footer plaque */}
        <footer className="mt-20 text-center">
          <p className="font-museum-mono text-xs uppercase tracking-[0.3em] text-muted-foreground/60">
            Est. 2019 · {exhibits.length} artifacts catalogued · Curated by{' '}
            {CURATOR.name}
          </p>
        </footer>
      </div>
    </main>
  );
}
