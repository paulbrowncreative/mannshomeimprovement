import type { IllustrationKey } from "@/content/services";

/**
 * Line drawings in a draftsman style. They stand in where project photography
 * will eventually go, and are never presented as photos of Mann's work.
 * All drawings are decorative (aria-hidden) — adjacent text carries the meaning.
 */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  vectorEffect: "non-scaling-stroke" as const,
};

export function HouseElevation({ className }: { className?: string }) {
  const dim = { ...stroke, strokeWidth: 1, opacity: 0.6 };
  const faint = { ...stroke, strokeWidth: 1, opacity: 0.35 };
  return (
    <svg viewBox="0 0 600 440" className={className} aria-hidden="true" focusable="false">
      <g className="draw">
        {/* ground */}
        <line x1="30" y1="380" x2="570" y2="380" {...stroke} strokeWidth={2} />
        {/* roof */}
        <polyline points="128,176 300,68 472,176" {...stroke} strokeWidth={2} />
        <polyline points="150,176 300,82 450,176" {...faint} />
        {/* chimney */}
        <polyline points="380,128 380,96 408,96 408,146" {...stroke} />
        {/* body */}
        <rect x="150" y="170" width="300" height="210" {...stroke} />
        {/* gable window */}
        <circle cx="300" cy="134" r="15" {...stroke} />
        <line x1="285" y1="134" x2="315" y2="134" {...faint} />
        <line x1="300" y1="119" x2="300" y2="149" {...faint} />
        {/* upper windows */}
        {[190, 280, 370].map((x) => (
          <g key={x}>
            <rect x={x} y="194" width="40" height="52" {...stroke} />
            <line x1={x + 20} y1="194" x2={x + 20} y2="246" {...faint} />
            <line x1={x} y1="220" x2={x + 40} y2="220" {...faint} />
            <line x1={x - 5} y1="250" x2={x + 45} y2="250" {...stroke} />
          </g>
        ))}
        {/* porch roof */}
        <polyline points="122,276 150,258 450,258 478,276 122,276" {...stroke} />
        {/* columns */}
        {[160, 236, 364, 440].map((x) => (
          <rect key={x} x={x - 4} y="276" width="8" height="96" {...stroke} />
        ))}
        {/* porch deck + rail */}
        <line x1="128" y1="372" x2="472" y2="372" {...stroke} />
        <line x1="164" y1="340" x2="232" y2="340" {...faint} />
        <line x1="368" y1="340" x2="436" y2="340" {...faint} />
        {[176, 188, 200, 212, 224, 380, 392, 404, 416, 428].map((x) => (
          <line key={x} x1={x} y1="340" x2={x} y2="372" {...faint} />
        ))}
        {/* door */}
        <rect x="282" y="290" width="36" height="82" {...stroke} />
        <rect x="288" y="298" width="24" height="26" {...faint} />
        <circle cx="311" cy="334" r="1.8" {...stroke} />
        {/* lower windows */}
        {[180, 376].map((x) => (
          <g key={x}>
            <rect x={x} y="290" width="44" height="44" {...stroke} />
            <line x1={x + 22} y1="290" x2={x + 22} y2="334" {...faint} />
            <line x1={x} y1="312" x2={x + 44} y2="312" {...faint} />
          </g>
        ))}
        {/* steps */}
        <polyline points="270,380 270,376 330,376 330,380" {...stroke} />
        {/* lap siding hints */}
        {[300, 312, 324].map((y) => (
          <g key={y}>
            <line x1="244" y1={y} x2="276" y2={y} {...faint} />
            <line x1="324" y1={y} x2="356" y2={y} {...faint} />
          </g>
        ))}
        {/* shrubs */}
        <path d="M70 380c0-22 14-34 28-34s26 12 26 34" {...stroke} />
        <path d="M492 380c0-16 10-26 22-26s22 10 22 26" {...stroke} />
        {/* dimension lines */}
        <line x1="128" y1="40" x2="472" y2="40" {...dim} />
        <line x1="128" y1="32" x2="128" y2="48" {...dim} />
        <line x1="472" y1="32" x2="472" y2="48" {...dim} />
        <line x1="128" y1="48" x2="128" y2="170" {...dim} strokeDasharray="3 5" />
        <line x1="472" y1="48" x2="472" y2="170" {...dim} strokeDasharray="3 5" />
        <line x1="530" y1="68" x2="530" y2="380" {...dim} />
        <line x1="522" y1="68" x2="538" y2="68" {...dim} />
        <line x1="522" y1="380" x2="538" y2="380" {...dim} />
        {/* section marker */}
        <circle cx="64" cy="96" r="18" {...dim} />
        <line x1="46" y1="96" x2="82" y2="96" {...dim} />
      </g>
      <g fill="currentColor" opacity="0.75" fontFamily="var(--font-display)" fontSize="11" letterSpacing="1.5">
        <text x="300" y="30" textAnchor="middle">
          34′-0″
        </text>
        <text x="552" y="228" textAnchor="middle" transform="rotate(90 552 228)">
          26′-6″
        </text>
        <text x="64" y="91" textAnchor="middle" fontSize="9">
          A
        </text>
        <text x="64" y="108" textAnchor="middle" fontSize="8">
          2
        </text>
        <text x="30" y="410" fontSize="10">
          FRONT ELEVATION
        </text>
        <text x="570" y="410" textAnchor="end" fontSize="10">
          SCALE 1/4″ = 1′-0″
        </text>
      </g>
    </svg>
  );
}

const icons: Record<IllustrationKey, React.ReactNode> = {
  kitchen: (
    <>
      <rect x="8" y="8" width="20" height="14" />
      <rect x="36" y="8" width="20" height="14" />
      <line x1="18" y1="8" x2="18" y2="22" opacity="0.5" />
      <line x1="46" y1="8" x2="46" y2="22" opacity="0.5" />
      <rect x="6" y="34" width="52" height="4" />
      <rect x="8" y="38" width="48" height="18" />
      <line x1="24" y1="38" x2="24" y2="56" opacity="0.5" />
      <line x1="40" y1="38" x2="40" y2="56" opacity="0.5" />
      <path d="M30 34v-6a3 3 0 0 1 6 0" />
      <line x1="20" y1="46" x2="20" y2="48" />
      <line x1="44" y1="46" x2="44" y2="48" />
      <line x1="4" y1="56" x2="60" y2="56" />
    </>
  ),
  bath: (
    <>
      <path d="M14 30V12a5 5 0 0 1 10 0" />
      <path d="M20 16h8" />
      <line x1="22" y1="20" x2="21" y2="23" opacity="0.5" />
      <line x1="26" y1="20" x2="26" y2="23" opacity="0.5" />
      <path d="M6 30h52v6a14 14 0 0 1-14 14H20A14 14 0 0 1 6 36z" />
      <line x1="16" y1="50" x2="14" y2="56" />
      <line x1="48" y1="50" x2="50" y2="56" />
      <line x1="4" y1="56" x2="60" y2="56" />
    </>
  ),
  basement: (
    <>
      <polyline points="6,24 32,8 58,24" />
      <rect x="12" y="24" width="40" height="12" />
      <line x1="2" y1="36" x2="62" y2="36" />
      <rect x="12" y="36" width="40" height="20" strokeDasharray="3 3" />
      <polyline points="18,56 18,52 22,52 22,48 26,48 26,44 30,44 30,40" />
      <rect x="38" y="42" width="10" height="7" />
    </>
  ),
  floor: (
    <>
      <path d="M6 50L20 14h24l14 36z" />
      <line x1="10" y1="40" x2="54" y2="40" opacity="0.6" />
      <line x1="14" y1="30" x2="50" y2="30" opacity="0.6" />
      <line x1="17" y1="22" x2="47" y2="22" opacity="0.6" />
      <line x1="24" y1="50" x2="27" y2="40" />
      <line x1="40" y1="40" x2="42" y2="30" />
      <line x1="28" y1="30" x2="29" y2="22" />
      <line x1="38" y1="22" x2="38" y2="14" />
      <line x1="46" y1="50" x2="44" y2="40" />
    </>
  ),
  trim: (
    <>
      <polyline points="8,8 56,8" />
      <polyline points="56,8 56,56" />
      <path d="M8 8h6v4c6 0 10 4 10 10h4v6" />
      <path d="M8 14c8 0 14 6 14 14" opacity="0.5" />
      <line x1="8" y1="8" x2="8" y2="56" opacity="0.4" />
      <rect x="34" y="34" width="22" height="22" strokeDasharray="2 3" opacity="0.6" />
      <line x1="4" y1="56" x2="60" y2="56" />
    </>
  ),
  deck: (
    <>
      <rect x="4" y="12" width="12" height="28" />
      <line x1="16" y1="28" x2="60" y2="28" />
      <line x1="16" y1="32" x2="60" y2="32" />
      <line x1="20" y1="18" x2="58" y2="18" />
      {[24, 34, 44, 54].map((x) => (
        <line key={x} x1={x} y1="18" x2={x} y2="28" opacity="0.6" />
      ))}
      <line x1="26" y1="32" x2="26" y2="44" />
      <line x1="52" y1="32" x2="52" y2="44" />
      <line x1="2" y1="44" x2="62" y2="44" />
      <rect x="23" y="44" width="6" height="14" strokeDasharray="2 2" />
      <rect x="49" y="44" width="6" height="14" strokeDasharray="2 2" />
    </>
  ),
  addition: (
    <>
      <polyline points="4,28 20,14 36,28" />
      <rect x="8" y="28" width="24" height="26" />
      <rect x="16" y="40" width="8" height="14" />
      <polyline points="32,34 46,24 60,34" strokeDasharray="3 3" />
      <rect x="32" y="34" width="26" height="20" strokeDasharray="3 3" />
      <rect x="40" y="40" width="10" height="8" strokeDasharray="2 2" />
      <line x1="2" y1="54" x2="62" y2="54" />
    </>
  ),
};

export function ServiceIcon({ name, className }: { name: IllustrationKey; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <g {...stroke}>{icons[name]}</g>
    </svg>
  );
}

/** Large drawing in a framed "sheet" with a title block, used on service pages. */
export function ServiceSheet({
  name,
  title,
  sheet,
  tone = "dark",
}: {
  name: IllustrationKey;
  title: string;
  sheet: string;
  tone?: "dark" | "paper";
}) {
  return (
    <div className={`sheet${tone === "paper" ? " sheet--paper" : ""}`}>
      <div style={{ padding: "12% 18%" }}>
        <ServiceIcon name={name} className="sheet__art draw" />
      </div>
      <div className="sheet__titleblock" aria-hidden="true">
        <span>{title}</span>
        <span>Sheet {sheet}</span>
      </div>
    </div>
  );
}

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <rect width="40" height="40" rx="6" fill="#1d3a33" />
      <polyline
        points="7,17 20,8 33,17"
        fill="none"
        stroke="#d3a557"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="12,31 12,19 20,25 28,19 28,31"
        fill="none"
        stroke="#f2ede2"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
