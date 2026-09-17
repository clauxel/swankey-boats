import { useId } from "react";

export function BassBoat({ className = "" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const hull = `${uid}-hull`;
  const deck = `${uid}-deck`;
  const water = `${uid}-water`;
  return (
    <svg
      viewBox="40 96 560 128"
      className={className}
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Abstract E498 bass boat silhouette"
    >
      <defs>
        <linearGradient id={hull} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="16%" stopColor="#94a3b8" />
          <stop offset="22%" stopColor="#334155" />
          <stop offset="70%" stopColor="#0f172a" />
          <stop offset="88%" stopColor="#173e60" />
          <stop offset="100%" stopColor="#9bd8ff" />
        </linearGradient>
        <linearGradient id={deck} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
        <linearGradient id={water} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#9bd8ff" stopOpacity="0.0" />
          <stop offset="45%" stopColor="#6cbcf2" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#0c2941" stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <ellipse cx="320" cy="214" rx="250" ry="18" fill={`url(#${water})`} />
      <path
        d="M72 176c46-38 118-78 248-84 112-5 186 24 248 62 8 5 10 14-2 18l-38 14c-28 8-64 12-208 12-132 0-186-6-230-14-18-4-24-6-18-8z"
        fill={`url(#${hull})`}
      />
      <path
        d="M90 182c40 6 120 12 230 12 110 0 188-6 228-12"
        fill="none"
        stroke="#67b5ea"
        strokeWidth="3"
      />
      <path
        d="M118 150c38-22 96-46 202-50 94-4 156 18 210 48-42 6-112 12-214 12-86 0-148-4-198-10z"
        fill={`url(#${deck})`}
        opacity="0.96"
      />
      <rect x="286" y="108" width="52" height="46" rx="8" fill="#07111c" />
      <rect x="292" y="114" width="40" height="16" rx="3" fill="#9bd8ff" opacity="0.55" />
      <path d="M300 108h24v-10c0-6-4-10-12-10s-12 4-12 10z" fill="#0b1f2a" />
      <rect x="160" y="142" width="88" height="8" rx="2" fill="#246994" opacity="0.85" />
      <rect x="392" y="142" width="96" height="8" rx="2" fill="#246994" opacity="0.85" />
      <circle cx="534" cy="186" r="7" fill="#9bd8ff" />
      <path
        d="M508 188c18 2 28 8 36 16"
        fill="none"
        stroke="#9bd8ff"
        strokeWidth="2"
      />
      <path
        d="M80 188c40 10 140 22 240 22s200-12 240-22"
        fill="none"
        stroke="#6cbcf2"
        strokeWidth="2"
        opacity="0.45"
      />
    </svg>
  );
}

export function LakeScene({ note }: { note: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#071018]" aria-hidden="true" />
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#0a2433" />
            <stop offset="38%" stopColor="#0d3a48" />
            <stop offset="68%" stopColor="#0b333c" />
            <stop offset="100%" stopColor="#07141c" />
          </linearGradient>
        </defs>
        <rect width="1440" height="900" fill="url(#sky)" />
        <ellipse cx="1120" cy="190" rx="260" ry="100" fill="#9bd8ff" opacity="0.16" />
        <path
          d="M0 430 C 180 390, 280 470, 460 450 S 780 390, 980 430 1280 500, 1440 470 V 900 H 0 Z"
          fill="#0a2430"
        />
        <path
          d="M0 510 C 220 470, 360 560, 560 530 S 900 470, 1120 520 1320 580, 1440 550 V 900 H 0 Z"
          fill="#082028"
        />
        <g opacity="0.55">
          <path d="M1180 540 1220 400 1234 540" fill="#328ed4" />
          <path d="M1260 548 1310 360 1328 548" fill="#67b5ea" />
          <path d="M1348 552 1388 420 1402 552" fill="#246994" />
        </g>
      </svg>
      <div
        className="pointer-events-none absolute right-[-4%] bottom-[6%] w-[92%] max-w-none sm:right-[-2%] sm:bottom-[10%] sm:w-[70%] md:w-[58%]"
        aria-hidden="true"
      >
        <BassBoat />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#07111c] via-[#07111c]/72 to-[#07111c]/10 sm:via-[#07111c]/55 sm:to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#07111c] to-transparent" />
      <p className="absolute top-20 right-4 hidden max-w-xs rounded-xl border border-white/10 bg-black/50 p-3 text-[11px] leading-5 text-ice/80 sm:block md:right-8">
        {note}
      </p>
    </div>
  );
}
