import React from 'react';

export default function RightSideDecoration() {
  return (
    <aside
      className="right-side-decoration-canvas"
      aria-hidden="true"
      style={{
        position: 'fixed',
        right: 0,
        top: '72px',
        bottom: 0,
        width: '260px',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.5rem 1rem 0 1rem',
        userSelect: 'none',
        transition: 'opacity 0.3s ease'
      }}
    >
      <style>{`
        @media (max-width: 1380px) {
          .right-side-decoration-canvas {
            display: none !important;
          }
        }
      `}</style>

      {/* ========================================================
          1. VERTICAL DIRECTION SIGNPOST ("New Places", "Same Vibes", "Better People")
      ======================================================== */}
      <div style={{ position: 'relative', marginTop: '1rem', alignSelf: 'flex-end', marginRight: '1rem' }}>
        {/* Wooden / Pastel Pole */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '-10px',
            transform: 'translateX(-50%)',
            width: '10px',
            height: '190px',
            background: 'linear-gradient(180deg, #DDD6FE 0%, #A78BFA 60%, #7C3AED 100%)',
            borderRadius: '9999px',
            boxShadow: '2px 4px 10px rgba(124, 58, 237, 0.15)',
            zIndex: 1
          }}
        />

        {/* Pole Top Knob */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '-20px',
            transform: 'translateX(-50%)',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #F472B6 0%, #EC4899 100%)',
            boxShadow: '0 2px 8px rgba(236, 72, 153, 0.4)',
            zIndex: 3
          }}
        />

        {/* Direction Planks Container */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '0.85rem', paddingTop: '0.75rem' }}>
          {/* Plank 1: New Places (Points Right) */}
          <div
            style={{
              transform: 'rotate(-4deg) translateX(8px)',
              background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
              color: '#FFFFFF',
              padding: '0.4rem 0.9rem 0.4rem 1.1rem',
              borderRadius: '0.4rem 1rem 1rem 0.4rem',
              fontWeight: 800,
              fontSize: '0.78rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              boxShadow: '0 4px 12px rgba(79, 70, 229, 0.28)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              clipPath: 'polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%)'
            }}
          >
            <span>📍</span>
            <span>New Places</span>
          </div>

          {/* Plank 2: Same Vibes (Points Left) */}
          <div
            style={{
              transform: 'rotate(3deg) translateX(-12px)',
              background: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
              color: '#FFFFFF',
              padding: '0.4rem 1.1rem 0.4rem 0.9rem',
              borderRadius: '1rem 0.4rem 0.4rem 1rem',
              fontWeight: 800,
              fontSize: '0.78rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              boxShadow: '0 4px 12px rgba(236, 72, 153, 0.28)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              clipPath: 'polygon(15% 0%, 100% 0%, 100% 100%, 15% 100%, 0% 50%)'
            }}
          >
            <span>Same Vibes</span>
            <span>✨</span>
          </div>

          {/* Plank 3: Better People (Points Right) */}
          <div
            style={{
              transform: 'rotate(-2deg) translateX(6px)',
              background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
              color: '#FFFFFF',
              padding: '0.4rem 0.9rem 0.4rem 1.1rem',
              borderRadius: '0.4rem 1rem 1rem 0.4rem',
              fontWeight: 800,
              fontSize: '0.78rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              boxShadow: '0 4px 12px rgba(139, 92, 246, 0.28)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              clipPath: 'polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%)'
            }}
          >
            <span>👥</span>
            <span>Better People</span>
          </div>
        </div>
      </div>

      {/* ========================================================
          2. HANDWRITTEN "TRAVEL MORE WORRY LESS ♥" BADGE & DOODLES
      ======================================================== */}
      <div style={{ position: 'relative', margin: '2rem 0.75rem 1rem auto', width: 'fit-content' }}>
        {/* Airplane Trail Doodles */}
        <div style={{ position: 'absolute', top: '-24px', left: '-20px', opacity: 0.75, transform: 'rotate(-15deg)' }}>
          <span style={{ fontSize: '1.1rem' }}>✈️</span>
          <svg width="60" height="20" viewBox="0 0 60 20" fill="none" style={{ marginLeft: '-5px' }}>
            <path d="M2 10 Q20 2, 40 12 T58 8" stroke="#EC4899" strokeWidth="1.5" strokeDasharray="3 3" />
          </svg>
        </div>

        {/* Handwritten Card / Stamp */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(10px)',
            border: '2px dashed rgba(236, 72, 153, 0.35)',
            borderRadius: '1.25rem',
            padding: '0.75rem 1.1rem',
            transform: 'rotate(5deg)',
            boxShadow: '0 8px 24px rgba(139, 92, 246, 0.1)',
            textAlign: 'center',
            fontFamily: "'Caveat', cursive, serif"
          }}
        >
          <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#4F46E5', lineHeight: 1 }}>
            Travel
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#EC4899', lineHeight: 1.05 }}>
            More
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#7C3AED', lineHeight: 1 }}>
            Worry
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#E11D48', lineHeight: 1.05 }}>
            Less ♥
          </div>
          <div style={{ fontSize: '0.7rem', fontFamily: 'sans-serif', color: '#94A3B8', marginTop: '0.2rem', fontWeight: 600 }}>
            ☁️ ✨ 📍
          </div>
        </div>
      </div>

      {/* ========================================================
          3. RIGHT DOWN SIDE MOUNTAIN & PINE FOREST LANDSCAPE ("Good People. Great Journeys. ♥")
      ======================================================== */}
      <div style={{ position: 'relative', width: '100%', minHeight: '260px', marginTop: 'auto' }}>
        
        {/* Handwritten Overlay Text ("Good People. Great Journeys. ♥") */}
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          right: '10px',
          zIndex: 3,
          transform: 'rotate(-5deg)',
          fontFamily: "'Caveat', cursive, serif",
          lineHeight: 1.1,
          userSelect: 'none'
        }}>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1E1B4B', letterSpacing: '-0.01em' }}>
            Good
          </div>
          <div style={{ fontSize: '1.95rem', fontWeight: 800, color: '#312E81', paddingLeft: '1rem' }}>
            People
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 900, color: '#4C1D95', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <span>Great Journeys.</span>
            <span style={{ color: '#F43F5E', fontSize: '1.4rem', filter: 'drop-shadow(0 2px 8px rgba(244,63,94,0.4))' }}>♥</span>
          </div>
        </div>

        {/* SVG Mountain & Pine Tree Forest Artwork */}
        <svg
          viewBox="0 0 260 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: 'absolute', bottom: 0, right: 0, width: '100%', height: '100%', opacity: 0.9 }}
        >
          <defs>
            <linearGradient id="rdMtnSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F3E8FF" stopOpacity="0" />
              <stop offset="60%" stopColor="#E9D5FF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#DDD6FE" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="rdMtnFar" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C084FC" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#818CF8" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="rdMtnMid" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A855F7" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#6366F1" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="rdMtnNear" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6D28D9" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#3730A3" stopOpacity="0.95" />
            </linearGradient>
          </defs>

          {/* Background Gradient Base */}
          <rect width="260" height="260" fill="url(#rdMtnSky)" />

          {/* Distant Mountain Peaks */}
          <path d="M-20 260 L60 110 L150 260 Z" fill="url(#rdMtnFar)" />
          <path d="M70 260 L170 80 L260 260 Z" fill="url(#rdMtnFar)" />

          {/* Midground Layered Mountains */}
          <path d="M10 260 L110 130 L210 260 Z" fill="url(#rdMtnMid)" />
          <path d="M110 260 L200 110 L280 260 Z" fill="url(#rdMtnNear)" />

          {/* Foreground Pine Forest Silhouettes */}
          {/* Group of Pine Trees Left */}
          <polygon points="5,260 14,215 23,260" fill="#1E1B4B" opacity="0.9" />
          <polygon points="18,260 25,225 32,260" fill="#1E1B4B" opacity="0.95" />
          <polygon points="28,260 38,205 48,260" fill="#1E1B4B" opacity="0.9" />

          {/* Group of Pine Trees Center */}
          <polygon points="110,260 120,190 130,260" fill="#1E1B4B" opacity="0.9" />
          <polygon points="125,260 133,205 141,260" fill="#1E1B4B" opacity="0.95" />
          <polygon points="138,260 148,180 158,260" fill="#1E1B4B" opacity="0.9" />

          {/* Group of Pine Trees Right */}
          <polygon points="200,260 210,175 220,260" fill="#1E1B4B" opacity="0.95" />
          <polygon points="215,260 224,195 233,260" fill="#1E1B4B" opacity="0.9" />
          <polygon points="228,260 240,165 252,260" fill="#1E1B4B" opacity="0.95" />
          <polygon points="245,260 254,185 263,260" fill="#1E1B4B" opacity="0.9" />
        </svg>

      </div>
    </aside>
  );
}
