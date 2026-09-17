export function BassBoat({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 280"
      className={className}
      role="img"
      aria-label="Abstract HQ E498 bass boat silhouette"
    >
      <defs>
        <linearGradient id="hull" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#cbd5e1" />
          <stop offset="18%" stopColor="#94a3b8" />
          <stop offset="22%" stopColor="#1e293b" />
          <stop offset="72%" stopColor="#0b1218" />
          <stop offset="86%" stopColor="#134e4a" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
        <linearGradient id="deck" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
        <linearGradient id="water" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.0" />
          <stop offset="40%" stopColor="#0891b2" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#042f2e" stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <ellipse cx="320" cy="214" rx="250" ry="18" fill="url(#water)" />
      <path
        d="M72 176c46-38 118-78 248-84 112-5 186 24 248 62 8 5 10 14-2 18l-38 14c-28 8-64 12-208 12-132 0-186-6-230-14-18-4-24-6-18-8z"
        fill="url(#hull)"
      />
      <path
        d="M118 150c38-22 96-46 202-50 94-4 156 18 210 48-42 6-112 12-214 12-86 0-148-4-198-10z"
        fill="url(#deck)"
        opacity="0.92"
      />
      <rect x="286" y="108" width="52" height="46" rx="8" fill="#070d12" />
      <rect x="292" y="114" width="40" height="16" rx="3" fill="#164e63" />
      <path d="M300 108h24v-10c0-6-4-10-12-10s-12 4-12 10z" fill="#0b1f2a" />
      <rect x="160" y="142" width="88" height="8" rx="2" fill="#0f766e" opacity="0.7" />
      <rect x="392" y="142" width="96" height="8" rx="2" fill="#0f766e" opacity="0.7" />
      <circle cx="534" cy="186" r="7" fill="#22d3ee" opacity="0.85" />
      <path
        d="M508 188c18 2 28 8 36 16"
        fill="none"
        stroke="#67e8f9"
        strokeWidth="2"
        opacity="0.7"
      />
      <path
        d="M80 188c40 10 140 22 240 22s200-12 240-22"
        fill="none"
        stroke="#22d3ee"
        strokeWidth="2"
        opacity="0.35"
      />
    </svg>
  );
}

export function LakeScene({ note }: { note: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[#071018]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_18%,rgba(103,232,249,0.22),transparent_42%),radial-gradient(ellipse_at_20%_80%,rgba(15,118,110,0.2),transparent_46%)]" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#08202c" />
            <stop offset="42%" stopColor="#0b3040" />
            <stop offset="70%" stopColor="#0c3a42" />
            <stop offset="100%" stopColor="#07141c" />
          </linearGradient>
        </defs>
        <rect width="1440" height="900" fill="url(#sky)" />
        <ellipse cx="1080" cy="210" rx="220" ry="90" fill="#67e8f9" opacity="0.12" />
        <path d="M0 430 C 180 390, 280 470, 460 450 S 780 390, 980 430 1280 500, 1440 470 V 900 H 0 Z" fill="#0a2430" />
        <path d="M0 510 C 220 470, 360 560, 560 530 S 900 470, 1120 520 1320 580, 1440 550 V 900 H 0 Z" fill="#082028" />
        <g opacity="0.45">
          <path d="M40 520 70 430 78 520" fill="#134e4a" />
          <path d="M90 530 128 400 140 530" fill="#0f766e" />
          <path d="M160 528 186 448 196 528" fill="#115e59" />
          <path d="M1180 540 1220 420 1234 540" fill="#134e4a" />
          <path d="M1260 548 1310 390 1328 548" fill="#0f766e" />
        </g>
        <g transform="translate(430 430) scale(1.15)">
          <BassBoat />
        </g>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-r from-[#070d12]/90 via-[#070d12]/55 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#070d12] to-transparent" />
      <p className="absolute right-4 bottom-24 max-w-xs rounded-xl border border-white/10 bg-black/45 p-3 text-[11px] leading-5 text-ice/80 sm:right-8 sm:bottom-28">
        {note}
      </p>
    </div>
  );
}
