export function DeckPlan({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 520 220" className={className} role="img" aria-label="HQ E498 deck layout diagram">
      <rect width="520" height="220" fill="#0b1620" />
      <rect x="16" y="36" width="488" height="148" rx="74" fill="#101820" stroke="#1f3a46" />
      <path d="M70 54h380c28 0 48 20 48 56s-20 56-48 56H70C42 166 22 146 22 110S42 54 70 54z" fill="#dbe4ea" />
      <rect x="86" y="70" width="132" height="80" rx="10" fill="#c5d0d8" />
      <rect x="302" y="70" width="132" height="80" rx="10" fill="#c5d0d8" />
      <rect x="230" y="78" width="60" height="64" rx="8" fill="#0b1f2a" />
      <rect x="238" y="86" width="44" height="18" rx="3" fill="#155e75" />
      <circle cx="260" cy="128" r="10" fill="#00c2d4" />
      <rect x="168" y="96" width="46" height="28" rx="4" fill="#0e7490" opacity="0.55" />
      <text x="152" y="28" fill="#22d3ee" fontSize="11" fontFamily="ui-monospace, monospace">
        BOW CASTING DECK
      </text>
      <text x="232" y="208" fill="#8b9aaa" fontSize="11" fontFamily="ui-monospace, monospace">
        CONSOLE · LIVEWELL · AFT DECK · HIDDEN JET
      </text>
    </svg>
  );
}

export function JetCutaway({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 220" className={className} role="img" aria-label="Protected electric jet intake diagram">
      <rect width="560" height="220" fill="#0b1620" />
      <path d="M40 70h360c40 0 80 18 120 46v20H40z" fill="#1e293b" />
      <path d="M40 136h480v24H40z" fill="#00c2d4" opacity="0.28" />
      <rect x="168" y="108" width="120" height="36" rx="8" fill="#22d3ee" opacity="0.85" />
      <path d="M288 116h90c18 4 40 14 70 28v12H288z" fill="#67e8f9" opacity="0.7" />
      <path d="M176 150c18 16 54 26 92 26s74-10 92-26" fill="none" stroke="#22d3ee" strokeWidth="2" />
      <text x="40" y="36" fill="#22d3ee" fontSize="12" fontFamily="ui-monospace, monospace">
        PROTECTED INTAKE · ELECTRIC PUMP · NO EXPOSED PROPELLER
      </text>
      <text x="168" y="102" fill="#e0f2fe" fontSize="11">
        Intake
      </text>
      <text x="330" y="102" fill="#e0f2fe" fontSize="11">
        Jet path
      </text>
    </svg>
  );
}

export function StationKeepingDiagram({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 220" className={className} role="img" aria-label="GNSS station keeping diagram">
      <rect width="560" height="220" fill="#0b1620" />
      <circle cx="280" cy="118" r="78" fill="none" stroke="#22d3ee" strokeDasharray="4 6" />
      <circle cx="280" cy="118" r="46" fill="none" stroke="#00c2d4" opacity="0.7" />
      <rect x="250" y="102" width="60" height="24" rx="8" fill="#94a3b8" />
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8z" fill="#67e8f9" />
        </marker>
      </defs>
      <path d="M40 40h80" stroke="#67e8f9" markerEnd="url(#arrow)" />
      <path d="M480 70v60" stroke="#00c2d4" markerEnd="url(#arrow)" />
      <text x="40" y="32" fill="#8b9aaa" fontSize="11">
        WIND
      </text>
      <text x="430" y="58" fill="#8b9aaa" fontSize="11">
        CURRENT
      </text>
      <text x="150" y="206" fill="#22d3ee" fontSize="12" fontFamily="ui-monospace, monospace">
        GNSS HOLD · HEADING HOLD · CURRENT-HOLD
      </text>
    </svg>
  );
}

export function ServicePath({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 180" className={className} role="img" aria-label="Maintenance path diagram">
      <rect width="560" height="180" fill="#0b1620" />
      {["Deck hatch", "Battery bay", "Intake inspection", "Control check"].map((label, index) => (
        <g key={label} transform={`translate(${36 + index * 132} 46)`}>
          <rect width="112" height="88" rx="2" fill="#10202a" stroke="#1f3a46" />
          <text x="56" y="50" textAnchor="middle" fill="#e0f2fe" fontSize="12">
            {`0${index + 1}`}
          </text>
          <text x="56" y="70" textAnchor="middle" fill="#8b9aaa" fontSize="10">
            {label}
          </text>
        </g>
      ))}
    </svg>
  );
}
