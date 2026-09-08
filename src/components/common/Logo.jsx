import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ size = 'medium', showTagline = true, to = '/', lightMode = false }) {
  // Sizes: small, medium, large
  const iconSize = size === 'small' ? 36 : size === 'large' ? 52 : 44;
  const titleSize = size === 'small' ? '1.1rem' : size === 'large' ? '1.5rem' : '1.3rem';
  const taglineSize = size === 'small' ? '0.52rem' : size === 'large' ? '0.68rem' : '0.6rem';

  return (
    <Link to={to} style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
      <style>{`
        @keyframes rotateWorldGrid {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes rotateFlightOrbit {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        .anim-world-grid {
          transform-origin: 25px 25px;
          animation: rotateWorldGrid 18s linear infinite;
        }
        .anim-flight-orbit {
          transform-origin: 25px 25px;
          animation: rotateFlightOrbit 7s linear infinite;
        }
      `}</style>

      {/* SVG ANIMATED LOGO ICON */}
      <div style={{ width: iconSize, height: iconSize, position: 'relative', flexShrink: 0 }}>
        <svg viewBox="0 0 50 50" width={iconSize} height={iconSize} style={{ overflow: 'visible' }}>
          <defs>
            {/* World / Globe Gradient: Blue -> Purple -> Magenta */}
            <linearGradient id="tbGlobeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="40%" stopColor="#7C3AED" />
              <stop offset="85%" stopColor="#E11D48" />
              <stop offset="100%" stopColor="#F43F5E" />
            </linearGradient>

            {/* Orbit / Plane Ring Gradient */}
            <linearGradient id="tbOrbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818CF8" />
              <stop offset="50%" stopColor="#C084FC" />
              <stop offset="100%" stopColor="#F43F5E" />
            </linearGradient>

            {/* Buddy Text Gradient */}
            <linearGradient id="tbBuddyTextGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#D946EF" />
            </linearGradient>
          </defs>

          {/* 1. CONTINUOUS ROTATING GLOBE (Grid + Continent Shapes) */}
          <g className="anim-world-grid">
            {/* Globe Boundary Outer Circle */}
            <circle cx="25" cy="25" r="18" fill="none" stroke="url(#tbGlobeGrad)" strokeWidth="2.8" />
            
            {/* Latitude Grid Arcs */}
            <line x1="7" y1="25" x2="43" y2="25" stroke="url(#tbGlobeGrad)" strokeWidth="1.8" opacity="0.9" />
            <path d="M 10 16 Q 25 20 40 16" fill="none" stroke="url(#tbGlobeGrad)" strokeWidth="1.6" opacity="0.85" />
            <path d="M 10 34 Q 25 30 40 34" fill="none" stroke="url(#tbGlobeGrad)" strokeWidth="1.6" opacity="0.85" />

            {/* Longitude Grid Ellipse & Center Axis */}
            <ellipse cx="25" cy="25" rx="10" ry="18" fill="none" stroke="url(#tbGlobeGrad)" strokeWidth="1.8" opacity="0.9" />
            <line x1="25" y1="7" x2="25" y2="43" stroke="url(#tbGlobeGrad)" strokeWidth="1.8" opacity="0.9" />

            {/* Stylized Continent Silhouette Fills */}
            <path d="M 17 14 Q 22 12 24 16 Q 22 22 17 20 Z" fill="url(#tbGlobeGrad)" opacity="0.4" />
            <path d="M 27 27 Q 33 25 35 31 Q 30 37 26 33 Z" fill="url(#tbGlobeGrad)" opacity="0.4" />
          </g>

          {/* 2. CONTINUOUS ROTATING FLIGHT ORBIT RING WITH AIRPLANE */}
          <g className="anim-flight-orbit">
            {/* Outer Orbit Ring with Gap for 3D feel */}
            <ellipse
              cx="25"
              cy="25"
              rx="23"
              ry="11"
              fill="none"
              stroke="url(#tbOrbitGrad)"
              strokeWidth="3"
              transform="rotate(-25 25 25)"
              strokeLinecap="round"
            />

            {/* Airplane Graphic Attached to the Orbit Ring */}
            <g transform="translate(42.5, 29.5) rotate(32) scale(0.85)">
              <path
                d="M 0 -8 L 4 2 L 13 4 L 4 6.5 L 2 12 L 0 9.5 L -2 12 L -4 6.5 L -13 4 L -4 2 Z"
                fill="url(#tbGlobeGrad)"
                stroke="#FFFFFF"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
            </g>
          </g>
        </svg>
      </div>

      {/* BRAND NAME & TAGLINE */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{
          fontSize: titleSize,
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: '-0.02em',
          display: 'flex',
          alignItems: 'center',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        }}>
          <span style={{ color: lightMode ? '#FFFFFF' : '#0B0F19' }}>Travel</span>
          <span style={{
            background: 'linear-gradient(135deg, #8B5CF6 0%, #D946EF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginLeft: '1px',
          }}>Buddy</span>
        </div>
        {showTagline && (
          <div style={{
            fontSize: taglineSize,
            fontWeight: 800,
            color: lightMode ? 'rgba(255, 255, 255, 0.85)' : '#475569',
            letterSpacing: '0.18em',
            marginTop: '0.22rem',
            textTransform: 'uppercase',
            lineHeight: 1,
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          }}>
            EXPLORE. CONNECT. BELONG.
          </div>
        )}
      </div>
    </Link>
  );
}
