/**
 * Iconografia de Dosi — SVG en línia.
 *
 * Sistema de disseny (docs/dosi/03-disseny.md, "Icones"):
 *   · Estil de línia, traç d'1,8 px, quadrícula de 24 px, extrems i unions
 *     arrodonits, sense farciment. Mai emojis.
 *   · L'única icona plena és la flama de la ratxa.
 *
 * Per què SVG i no PNG: hereten `currentColor`, canvien amb el tema sense
 * dues versions i pesen ~200 bytes en lloc de ~40 KB.
 *
 * Tots els icones fan servir viewBox 24x24 i traç 1,8 tret que s'indiqui el
 * contrari.
 */

interface IconProps {
  className?: string;
  /** Perquè els lectors de pantalla no llegeixin una icona decorativa. */
  title?: string;
}

const base = (p: IconProps) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  role: p.title ? ("img" as const) : ("presentation" as const),
  "aria-hidden": p.title ? undefined : (true as const),
  "aria-label": p.title,
  className: p.className,
});

// ── Pestanyes de la barra inferior ────────────────────────────────────────

export const FeedIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="5" y="3" width="14" height="18" rx="3" />
    <path d="M9 8h6M9 12h6" />
  </svg>
);

export const ExploreIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M15.5 8.5l-2 5-5 2 2-5z" />
  </svg>
);

export const PracticeIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4z" />
  </svg>
);

export const ProfileIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
  </svg>
);

// ── Ratxa i repàs ─────────────────────────────────────────────────────────

/** Flama de la ratxa: l'única icona plena (03-disseny.md). */
export const FlameIcon = (p: IconProps) => (
  <svg {...base(p)} fill="currentColor" strokeWidth={1.5}>
    <path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2.2 1-3.7 2.3-5 .2 1.6 1 2.6 2.2 3C11 8.5 11 5.5 12 3z" />
  </svg>
);

export const ReviewIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3" />
    <path d="M18 3v4h-4M6 21v-4h4" />
  </svg>
);

// ── Accions ───────────────────────────────────────────────────────────────

export const BookmarkIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M7 4h10v16l-5-4-5 4z" />
  </svg>
);

export const VolumeIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 9v6h4l5 4V5L8 9z" />
    <path d="M16.5 8.5a5 5 0 0 1 0 7" />
  </svg>
);

export const BellIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z" />
    <path d="M10 21h4" />
  </svg>
);

export const LockIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
);

export const SendIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 12l16-8-6 16-2.5-6.5z" />
  </svg>
);

export const MicIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="9" y="3" width="6" height="12" rx="3" />
    <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
  </svg>
);

export const CheckIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

export const PlusIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const CloseIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

// ── Fletxes ───────────────────────────────────────────────────────────────

export const ChevronRightIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M9 6l6 6-6 6" />
  </svg>
);

export const ChevronUpIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 15l6-6 6 6" />
  </svg>
);

export const ChevronDownIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const ArrowLeftIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M15 6l-6 6 6 6" />
  </svg>
);

// ── Conceptes ─────────────────────────────────────────────────────────────

export const TargetIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="4" />
  </svg>
);

export const BulbIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1.1 1 1.8V16h5v-.3c0-.7.4-1.4 1-1.8A6 6 0 0 0 12 3z" />
  </svg>
);

export const AnchorIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v13M8 11h8M5 14a7 7 0 0 0 14 0" />
  </svg>
);

export const icons = {
  feed: FeedIcon,
  explore: ExploreIcon,
  practice: PracticeIcon,
  profile: ProfileIcon,
  flame: FlameIcon,
  review: ReviewIcon,
  bookmark: BookmarkIcon,
  volume: VolumeIcon,
  bell: BellIcon,
  lock: LockIcon,
  send: SendIcon,
  mic: MicIcon,
  check: CheckIcon,
  plus: PlusIcon,
  close: CloseIcon,
  chevronRight: ChevronRightIcon,
  chevronUp: ChevronUpIcon,
  chevronDown: ChevronDownIcon,
  arrowLeft: ArrowLeftIcon,
  target: TargetIcon,
  bulb: BulbIcon,
  anchor: AnchorIcon,
} as const;

export type IconName = keyof typeof icons;

export function Icon({ name, ...rest }: IconProps & { name: IconName }) {
  const Cmp = icons[name];
  return <Cmp {...rest} />;
}
