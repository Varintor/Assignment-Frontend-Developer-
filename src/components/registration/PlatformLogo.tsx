import type { ReactNode } from "react";
import type { PlatformOption } from "../../data/registrationOptions";

type PlatformLogoProps = {
  platform: PlatformOption;
};

export function PlatformLogo({ platform }: PlatformLogoProps) {
  const common = {
    viewBox: "0 0 36 36",
    role: "img",
    "aria-label": `${platform.name} logo`,
  } as const;

  switch (platform.id) {
    case "facebook":
      return (
        <Logo name="facebook">
          <svg {...common}>
            <circle cx="18" cy="18" r="18" fill="#1877F2" />
            <path
              fill="#fff"
              d="M20.8 29V19.4h3.2l.5-3.7h-3.7v-2.4c0-1.1.3-1.8 1.9-1.8h2V8.2c-.3-.1-1.5-.2-2.9-.2-2.9 0-4.9 1.8-4.9 5v2.8h-3.3v3.7h3.3V29h3.9Z"
            />
          </svg>
        </Logo>
      );
    case "instagram":
      return (
        <Logo name="instagram">
          <svg {...common}>
            <defs>
              <linearGradient
                id="instagram-gradient"
                x1="3"
                y1="33"
                x2="33"
                y2="3"
              >
                <stop stopColor="#FFD600" />
                <stop offset=".45" stopColor="#FF0169" />
                <stop offset="1" stopColor="#7638FA" />
              </linearGradient>
            </defs>
            <rect
              x="2"
              y="2"
              width="32"
              height="32"
              rx="9"
              fill="url(#instagram-gradient)"
            />
            <rect
              x="9"
              y="9"
              width="18"
              height="18"
              rx="5.5"
              fill="none"
              stroke="#fff"
              strokeWidth="2.6"
            />
            <circle
              cx="18"
              cy="18"
              r="4.5"
              fill="none"
              stroke="#fff"
              strokeWidth="2.6"
            />
            <circle cx="27.5" cy="8.6" r="1.6" fill="#fff" />
          </svg>
        </Logo>
      );
    case "tiktok":
      return (
        <Logo name="tiktok">
          <svg {...common}>
            <rect width="36" height="36" rx="9" fill="#050505" />
            <path
              d="M21.1 8.5c.5 3 2.2 4.8 5.1 5.2v3.6a10 10 0 0 1-5.1-1.6v7.1a7.1 7.1 0 1 1-6.1-7v3.7a3.5 3.5 0 1 0 2.5 3.3V8.5h3.6Z"
              fill="#25F4EE"
              transform="translate(-1 1)"
            />
            <path
              d="M21.1 8.5c.5 3 2.2 4.8 5.1 5.2v3.6a10 10 0 0 1-5.1-1.6v7.1a7.1 7.1 0 1 1-6.1-7v3.7a3.5 3.5 0 1 0 2.5 3.3V8.5h3.6Z"
              fill="#FE2C55"
              transform="translate(1)"
            />
            <path
              d="M21.1 8.5c.5 3 2.2 4.8 5.1 5.2v2.1a10 10 0 0 1-5.1-1.6v6.6a5.5 5.5 0 1 1-4.6-5.4v2.1a3.5 3.5 0 1 0 2.5 3.3V8.5h2.2Z"
              fill="#fff"
            />
          </svg>
        </Logo>
      );
    case "youtube":
      return (
        <Logo name="youtube">
          <svg {...common}>
            <rect x="2" y="7" width="32" height="22" rx="7" fill="#FF0033" />
            <path fill="#fff" d="m15 13 9 5-9 5V13Z" />
          </svg>
        </Logo>
      );
    case "x":
      return (
        <Logo name="x">
          <svg {...common}>
            <rect width="36" height="36" rx="9" fill="#050505" />
            <path
              fill="#fff"
              d="M9 8h5.6l4.7 6.3L24.8 8h2.1l-6.6 7.8L27.5 28h-5.6l-5.2-7-6 7H8.5l7.2-8.6L9 8Zm4.5 2 9.4 16h2L15.5 10h-2Z"
            />
          </svg>
        </Logo>
      );
    case "lemon8":
      return (
        <Logo name="lemon8">
          <svg {...common}>
            <rect
              x="2"
              y="2"
              width="32"
              height="32"
              rx="8"
              fill="#FFE600"
              transform="rotate(-5 18 18)"
            />
            <text
              x="18"
              y="16"
              textAnchor="middle"
              fontSize="6.8"
              fontWeight="900"
              fill="#111"
              transform="rotate(-5 18 18)"
            >
              LEMON
            </text>
            <text
              x="18"
              y="24"
              textAnchor="middle"
              fontSize="9"
              fontWeight="900"
              fill="#111"
              transform="rotate(-5 18 18)"
            >
              8
            </text>
          </svg>
        </Logo>
      );
    case "shopee":
      return (
        <Logo name="shopee">
          <svg {...common}>
            <rect width="36" height="36" rx="9" fill="#EE4D2D" />
            <path d="M10 14h16l-1 14H11l-1-14Z" fill="#fff" />
            <path
              d="M14 15v-3a4 4 0 0 1 8 0v3"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
            />
            <text
              x="18"
              y="25"
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="#EE4D2D"
            >
              S
            </text>
          </svg>
        </Logo>
      );
    case "lazada":
      return (
        <Logo name="lazada">
          <svg {...common}>
            <defs>
              <linearGradient
                id="lazada-gradient"
                x1="4"
                y1="5"
                x2="31"
                y2="31"
              >
                <stop stopColor="#FF793E" />
                <stop offset=".5" stopColor="#F52B78" />
                <stop offset="1" stopColor="#9832C9" />
              </linearGradient>
            </defs>
            <path
              d="M18 31S4.5 23.4 4.5 13.5A7.5 7.5 0 0 1 18 9a7.5 7.5 0 0 1 13.5 4.5C31.5 23.4 18 31 18 31Z"
              fill="url(#lazada-gradient)"
            />
          </svg>
        </Logo>
      );
  }
}

function Logo({ name, children }: { name: string; children: ReactNode }) {
  return <span className={`kol-platform-mark ${name}`}>{children}</span>;
}
