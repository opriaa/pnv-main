/**
 * CategoryIcon
 * Maps a category name to a clean line-style SVG icon.
 * Uses `currentColor` so it inherits from the parent — easy to theme.
 *
 * Lookup is case-insensitive and matches both full names and common
 * fragments (e.g. "Chemical Drums" → chemical, "Plastic Sheets" → sheets).
 * Falls back to a tag icon for unknown categories.
 */

const baseProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
};

const Icons = {
  chemical: (
    <svg {...baseProps}>
      <path d="M9 3h6" />
      <path d="M10 3v6.2L4.6 18.6A2 2 0 0 0 6.3 21.6h11.4a2 2 0 0 0 1.7-3L14 9.2V3" />
      <path d="M7.2 14h9.6" />
      <circle cx="10" cy="17" r="0.6" fill="currentColor" />
      <circle cx="14" cy="18.5" r="0.6" fill="currentColor" />
      <circle cx="12" cy="16" r="0.5" fill="currentColor" />
    </svg>
  ),
  thread: (
    <svg {...baseProps}>
      {/* Spool */}
      <rect x="5" y="4" width="14" height="3" rx="0.5" />
      <rect x="5" y="17" width="14" height="3" rx="0.5" />
      <path d="M7 7v10M17 7v10" />
      {/* Winding */}
      <path d="M7 9.5c2.6 0 7.4 0 10 0" />
      <path d="M7 12c2.6 0 7.4 0 10 0" />
      <path d="M7 14.5c2.6 0 7.4 0 10 0" />
      {/* Thread coming off */}
      <path d="M17 12l3.5 1.6" />
    </svg>
  ),
  sheets: (
    <svg {...baseProps}>
      <rect x="7" y="3" width="13" height="14" rx="2" />
      <path d="M16 17v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2" />
      <path d="M11 8h5M11 12h5" />
    </svg>
  ),
  trolley: (
    <svg {...baseProps}>
      {/* Hand trolley / dolly */}
      <path d="M3 3h2.2l3 12.5h11" />
      <path d="M9.5 7.5h10l-1.7 7.5h-9" />
      <circle cx="10.5" cy="19.5" r="1.6" />
      <circle cx="18" cy="19.5" r="1.6" />
    </svg>
  ),
  cloth: (
    // Swiss / centrifugal filter fabric — woven mesh panel with a folded corner
    <svg {...baseProps}>
      <path d="M4 4h13l3 3v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" />
      {/* corner fold flap */}
      <path d="M17 4v3h3" />
      {/* horizontal weave threads */}
      <path d="M4 9.5h16" />
      <path d="M4 14.5h16" />
      {/* vertical weave threads */}
      <path d="M9 4v17" />
      <path d="M14 4v17" />
    </svg>
  ),
  paper: (
    // Filter paper in chemistry funnel + a single drop
    <svg {...baseProps}>
      {/* funnel body */}
      <path d="M4.5 4h15l-5.5 10v6h-4v-6z" />
      {/* fluted filter-paper pleats inside the cone */}
      <path d="M8.4 6.5h7.2" />
      <path d="M10 9.5h4" />
      <path d="M9 4.6l1.6 9" />
      <path d="M15 4.6l-1.6 9" />
      <path d="M12 4.6v9" />
      {/* drop falling */}
      <path d="M12 21c-.55-.9-.55-1.6 0-2.4.55.8.55 1.5 0 2.4z" fill="currentColor" stroke="none" />
    </svg>
  ),
  // ---- Extras commonly seen on industrial supply catalogs ----
  bag: (
    <svg {...baseProps}>
      <path d="M6 8h12l-1 12.5a1 1 0 0 1-1 .9H8a1 1 0 0 1-1-.9L6 8z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  ),
  rope: (
    <svg {...baseProps}>
      <path d="M4 6c3 2 5 2 8 0s5-2 8 0" />
      <path d="M4 12c3 2 5 2 8 0s5-2 8 0" />
      <path d="M4 18c3 2 5 2 8 0s5-2 8 0" />
    </svg>
  ),
  plastic: (
    <svg {...baseProps}>
      {/* Bottle */}
      <path d="M10 3h4v3l1.5 1.7a3 3 0 0 1 .7 1.9V19a2 2 0 0 1-2 2H9.8a2 2 0 0 1-2-2V9.6a3 3 0 0 1 .7-1.9L10 6V3z" />
      <path d="M9 13h6" />
    </svg>
  ),
  box: (
    <svg {...baseProps}>
      <path d="M3 7.5L12 3l9 4.5v9L12 21 3 16.5z" />
      <path d="M3 7.5L12 12l9-4.5M12 12v9" />
    </svg>
  ),
  wire: (
    <svg {...baseProps}>
      <path d="M3 17c2-4 4-4 6 0s4 4 6 0 4-4 6 0" />
      <path d="M3 7c2-4 4-4 6 0s4 4 6 0 4-4 6 0" />
    </svg>
  ),
  tool: (
    <svg {...baseProps}>
      <path d="M14.7 6.3a4 4 0 0 0 5 5l-9.4 9.4a2 2 0 0 1-2.8-2.8z" />
      <path d="M14.7 6.3l-1.4-1.4a2 2 0 0 1 0-2.8l.7-.7 4.2 4.2" />
    </svg>
  ),
  tag: (
    <svg {...baseProps}>
      <path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8z" />
      <circle cx="7.2" cy="7.2" r="1.1" fill="currentColor" />
    </svg>
  ),
};

// Match aliases / common alternate spellings to a canonical key
const aliases = {
  chemicals: "chemical",
  flask: "chemical",
  threads: "thread",
  yarn: "thread",
  spool: "thread",
  sheet: "sheets",
  film: "sheets",
  films: "sheets",
  trolleys: "trolley",
  cart: "trolley",
  dolly: "trolley",
  cloths: "cloth",
  fabric: "cloth",
  textile: "cloth",
  papers: "paper",
  document: "paper",
  bags: "bag",
  sack: "bag",
  ropes: "rope",
  cord: "rope",
  plastics: "plastic",
  bottle: "plastic",
  boxes: "box",
  carton: "box",
  packaging: "box",
  wires: "wire",
  cable: "wire",
  tools: "tool",
  hardware: "tool",
};

function resolveKey(name) {
  if (!name) return "tag";
  const raw = String(name).toLowerCase().trim();
  if (Icons[raw]) return raw;
  if (aliases[raw]) return aliases[raw];
  // try first word
  const first = raw.split(/[^a-z]+/)[0];
  if (Icons[first]) return first;
  if (aliases[first]) return aliases[first];
  // try substring match against known keys (Icons + aliases)
  const haystack = [...Object.keys(Icons), ...Object.keys(aliases)];
  const hit = haystack.find((k) => raw.includes(k));
  if (hit) return aliases[hit] || hit;
  return "tag";
}

export default function CategoryIcon({ name, size = 36, className = "" }) {
  const key = resolveKey(name);
  const icon = Icons[key] || Icons.tag;
  return (
    <span
      className={`category-icon-svg ${className}`}
      style={{ width: size, height: size, display: "inline-flex" }}
    >
      {icon}
    </span>
  );
}
