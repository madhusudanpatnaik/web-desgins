import { useState } from "react";

const NAV_ITEMS = ["Advisors", "What we do", "AI Intelligence", "Tools"];

export function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{ padding: "16px 32px" }}
    >
      <div className="relative flex items-center h-12">
        {/* Left: Logo */}
        <img
          src="https://qclay.design/lovable/synergy/Logo-lov.svg"
          alt="Synergeus"
          style={{ height: 28 }}
        />

        {/* Center: Links Pill */}
        <div
          className="absolute left-1/2 -translate-x-1/2 flex items-center rounded-full"
          style={{
            background: "rgba(28,28,28,0.75)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.10)",
            padding: "6px 8px",
            gap: "4px",
          }}
        >
          {NAV_ITEMS.map((item, idx) => (
            <a
              key={item}
              href="#"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="font-heading rounded-full transition-colors"
              style={{
                fontSize: 14,
                fontWeight: 400,
                color: "rgba(255,255,255,0.80)",
                padding: "8px 16px",
                backgroundColor:
                  hoveredIndex === idx
                    ? "rgba(255,255,255,0.10)"
                    : "transparent",
              }}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="ml-auto flex items-center gap-8">
          <a
            href="#"
            className="font-heading"
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.80)",
              padding: "8px 16px",
            }}
          >
            Login
          </a>
          <button
            className="font-heading rounded-full"
            style={{
              background: "#fff",
              color: "#000",
              fontSize: 14,
              fontWeight: 500,
              padding: "10px 20px",
            }}
          >
            Find an advisor
          </button>
        </div>
      </div>
    </nav>
  );
}
