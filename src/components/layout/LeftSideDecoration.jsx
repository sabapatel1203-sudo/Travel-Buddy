import React from 'react';

export default function LeftSideDecoration() {
  return (
    <aside
      className="left-side-decoration-canvas"
      aria-hidden="true"
      style={{
        position: 'fixed',
        left: '245px',
        top: '80px',
        bottom: '20px',
        width: '180px',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        userSelect: 'none',
        transition: 'opacity 0.3s ease'
      }}
    >
      <style>{`
        @media (max-width: 1440px) {
          .left-side-decoration-canvas {
            display: none !important;
          }
        }
      `}</style>

      {/* ========================================================
          1. TOP VINTAGE AIRMAIL STAMP & ROUTE BADGE
      ======================================================== */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', paddingLeft: '0.25rem' }}>
        {/* Airmail Stamp */}
        <div
          style={{
            background: '#FFFFFF',
            border: '2px dashed #EC4899',
            borderRadius: '0.75rem',
            padding: '0.5rem 0.75rem',
            transform: 'rotate(-4deg)',
            boxShadow: '0 6px 16px rgba(236, 72, 153, 0.15)',
            width: 'fit-content'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.65rem', fontWeight: 900, color: '#4F46E5', letterSpacing: '0.06em' }}>
            <span>✈️</span> PAR AVION
          </div>
          <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#BE123C', fontFamily: "'Caveat', cursive, serif", marginTop: '0.1rem' }}>
            Travel Buddy Pass
          </div>
          <div style={{ fontSize: '0.6rem', color: '#94A3B8', fontWeight: 700, marginTop: '0.1rem' }}>
            12 DEC • GOA VIBES
          </div>
        </div>

        {/* Route Badge */}
        <div
          style={{
            background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)',
            border: '1px solid #C7D2FE',
            borderRadius: '9999px',
            padding: '0.3rem 0.75rem',
            fontSize: '0.68rem',
            fontWeight: 800,
            color: '#4338CA',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem',
            boxShadow: '0 4px 10px rgba(99, 102, 241, 0.1)',
            transform: 'rotate(2deg)',
            width: 'fit-content'
          }}
        >
          <span>📍</span> Mumbai ➔ Goa
        </div>
      </div>

      {/* ========================================================
          2. MIDDLE MINI POLAROID FRAME ("Wanderlust Vibe 💕")
      ======================================================== */}
      <div
        style={{
          background: '#FFFFFF',
          padding: '0.45rem 0.45rem 0.6rem 0.45rem',
          borderRadius: '0.75rem',
          boxShadow: '0 10px 25px rgba(99, 102, 241, 0.18)',
          transform: 'rotate(-5deg)',
          width: '145px',
          margin: '0.5rem 0',
          border: '1.5px solid #F1F5F9',
          alignSelf: 'center'
        }}
      >
        {/* Washi Tape Accent */}
        <div
          style={{
            position: 'absolute',
            top: '-8px',
            left: '50%',
            transform: 'translateX(-50%) rotate(2deg)',
            width: '45px',
            height: '14px',
            background: 'rgba(244, 114, 182, 0.45)',
            backdropFilter: 'blur(4px)',
            borderRadius: '2px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}
        />

        <div style={{
          height: '85px',
          borderRadius: '0.5rem',
          backgroundImage: 'url(/hero_banner_photo.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.2)'
        }} />

        <div style={{ marginTop: '0.35rem', textAlign: 'center', fontFamily: "'Caveat', cursive, serif" }}>
          <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1E1B4B', lineHeight: 1 }}>
            Wanderlust 💕
          </div>
          <div style={{ fontSize: '0.62rem', fontFamily: 'sans-serif', color: '#64748B', fontWeight: 700, marginTop: '0.1rem' }}>
            Himalayas • Road Trip
          </div>
        </div>
      </div>

      {/* ========================================================
          3. LOWER MOUNTAIN & PINE FOREST SCENERY ("Good People. Great Journeys. ♥")
      ======================================================== */}
      <div style={{ position: 'relative', width: '100%', minHeight: '230px', marginTop: 'auto' }}>
        
        {/* Handwritten Overlay Text ("Good People. Great Journeys. ♥") */}
        <div style={{
          position: 'relative',
          zIndex: 3,
          transform: 'rotate(-4deg)',
          fontFamily: "'Caveat', cursive, serif",
          lineHeight: 1.1,
          userSelect: 'none',
          paddingLeft: '0.2rem',
          marginBottom: '0.5rem'
        }}>
          <div style={{ fontSize: '1.55rem', fontWeight: 800, color: '#1E1B4B', letterSpacing: '-0.01em' }}>
            Good
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#312E81', paddingLeft: '0.8rem' }}>
            People
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#4C1D95', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span>Great Journeys.</span>
            <span style={{ color: '#F43F5E', fontSize: '1.25rem', filter: 'drop-shadow(0 2px 6px rgba(244,63,94,0.4))' }}>♥</span>
          </div>
        </div>

        {/* SVG Mountain & Pine Tree Forest Artwork */}
        <svg
          viewBox="0 0 180 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: '140px', opacity: 0.9, marginTop: '-10px' }}
        >
          <defs>
            <linearGradient id="leftGutterSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F3E8FF" stopOpacity="0" />
              <stop offset="100%" stopColor="#DDD6FE" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="leftGutterMtn1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C084FC" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#818CF8" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="leftGutterMtn2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A855F7" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#6366F1" stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id="leftGutterMtn3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6D28D9" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#3730A3" stopOpacity="0.98" />
            </linearGradient>
          </defs>

          {/* Background Gradient Base */}
          <rect width="180" height="180" fill="url(#leftGutterSky)" />

          {/* Distant Mountains */}
          <path d="M-10 180 L40 80 L100 180 Z" fill="url(#leftGutterMtn1)" />
          <path d="M50 180 L120 60 L180 180 Z" fill="url(#leftGutterMtn1)" />

          {/* Midground Layered Mountains */}
          <path d="M0 180 L70 95 L140 180 Z" fill="url(#leftGutterMtn2)" />
          <path d="M70 180 L135 80 L190 180 Z" fill="url(#leftGutterMtn3)" />

          {/* Foreground Pine Forest Silhouettes */}
          <polygon points="4,180 11,145 18,180" fill="#1E1B4B" opacity="0.9" />
          <polygon points="14,180 20,152 26,180" fill="#1E1B4B" opacity="0.95" />
          <polygon points="22,180 30,138 38,180" fill="#1E1B4B" opacity="0.9" />

          <polygon points="70,180 78,135 86,180" fill="#1E1B4B" opacity="0.9" />
          <polygon points="82,180 89,148 96,180" fill="#1E1B4B" opacity="0.95" />
          <polygon points="92,180 100,128 108,180" fill="#1E1B4B" opacity="0.9" />

          <polygon points="135,180 143,132 151,180" fill="#1E1B4B" opacity="0.95" />
          <polygon points="147,180 154,146 161,180" fill="#1E1B4B" opacity="0.9" />
          <polygon points="157,180 166,122 175,180" fill="#1E1B4B" opacity="0.95" />
        </svg>

      </div>
    </aside>
  );
}
