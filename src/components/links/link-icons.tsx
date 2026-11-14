import type { CSSProperties, ReactNode } from 'react';
import { BookOpen, Sparkles } from 'lucide-react';

/**
 * The square icons on the links page, drawn like phone app icons: a coloured
 * tile with a white mark. Each one is decoration, the link text names it.
 */
function Tile({
  children,
  background,
  style,
}: {
  children: ReactNode;
  background: string;
  style?: CSSProperties;
}) {
  return (
    <span className="links-tile" style={{ background, ...style }} aria-hidden="true">
      {children}
    </span>
  );
}

/** My initials in the site's gold on its dark green, like the browser-tab icon. */
export function WebsiteIcon() {
  return (
    <Tile background="linear-gradient(160deg, #143321, #0A1A0F)">
      <span
        style={{
          color: '#E8C46A',
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: '-0.05em',
        }}
      >
        KU
      </span>
    </Tile>
  );
}

/** The Frontend Hub mark: three stacked layers, the top one cyan. */
export function FrontendHubIcon() {
  return (
    <Tile background="#05080A">
      <svg viewBox="0 0 32 32" width="34" height="34">
        <path d="M16 6 27 11.5 16 17 5 11.5Z" fill="#2AD2EE" />
        <path
          d="M5 16.5 16 22l11-5.5M5 21.5 16 27l11-5.5"
          fill="none"
          stroke="#EEF3F4"
          strokeWidth="1.8"
        />
      </svg>
    </Tile>
  );
}

/** AI 해바: "haeba" comes from the Korean word for sunflower, so warm yellow. */
export function AiHaebaIcon() {
  return (
    <Tile background="linear-gradient(160deg, #FFC53D, #F97316)">
      <Sparkles size={24} color="#FFFFFF" strokeWidth={2.1} />
    </Tile>
  );
}

export function IlmulHaqIcon() {
  return (
    <Tile background="linear-gradient(160deg, #25A874, #0B5D3F)">
      <BookOpen size={24} color="#FFFFFF" strokeWidth={2.1} />
    </Tile>
  );
}

/** The LifePath app icon: a white path climbing to a goal, on blue. */
export function LifePathIcon() {
  return (
    <Tile background="linear-gradient(135deg, #5E9BFF, #2A5BEA)">
      <svg viewBox="0 0 72 72" width="46" height="46" fill="#FFFFFF">
        <path d="M20 50c8 0 8-14 16-14s8-14 16-14" fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
        <circle cx="20" cy="50" r="4.5" />
        <circle cx="52" cy="22" r="6" />
      </svg>
    </Tile>
  );
}

export function TelegramIcon() {
  return (
    <Tile background="linear-gradient(180deg, #37BBFE, #007DBB)">
      <svg viewBox="0 0 24 24" width="46" height="46" fill="#FFFFFF">
        <path d="M16.906 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    </Tile>
  );
}

export function LinkedInIcon() {
  return (
    <Tile background="#0A66C2">
      <svg viewBox="0 0 24 24" width="31" height="31" fill="#FFFFFF">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286z" />
        <path d="M5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065z" />
        <path d="M7.119 20.452H3.555V9h3.564v11.452z" />
      </svg>
    </Tile>
  );
}

export function GitHubIcon() {
  return (
    <Tile background="linear-gradient(180deg, #2B3137, #0D1117)">
      <svg viewBox="0 0 24 24" width="29" height="29" fill="#FFFFFF">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    </Tile>
  );
}

export function InstagramIcon() {
  return (
    <Tile background="radial-gradient(circle at -17% 7%, #3771C8 0%, #3771C8 13%, rgba(102,0,255,0) 62%), radial-gradient(circle at 27% 107%, #FFDD55 0%, #FFDD55 10%, #FF543E 50%, #C837AB 100%)">
      <svg
        viewBox="0 0 24 24"
        width="28"
        height="28"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2.16"
      >
        <rect x="1.08" y="1.08" width="21.84" height="21.84" rx="6.1" />
        <circle cx="12" cy="12" r="5.08" />
        <circle cx="18.41" cy="5.59" r="1.44" fill="#FFFFFF" stroke="none" />
      </svg>
    </Tile>
  );
}

export function GmailIcon() {
  return (
    <Tile background="#FFFFFF">
      <svg viewBox="52 42 88 66" width="28" height="21">
        <path fill="#4285F4" d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6" />
        <path fill="#34A853" d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15" />
        <path fill="#FBBC04" d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2" />
        <path fill="#EA4335" d="M72 74V48l24 18 24-18v26L96 92" />
        <path fill="#C5221F" d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2" />
      </svg>
    </Tile>
  );
}
