import React from 'react';

export default function LoadingSpinner({ fullScreen = false, size = 40 }) {
  const spinner = (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <div style={{
        width: size, height: size,
        border: `3px solid #EAE8FF`,
        borderTop: `3px solid #8F88DD`,
        borderRadius: '50%',
        animation: 'spin-slow 0.8s linear infinite',
      }} />
      {fullScreen && <p style={{ color: '#8F88DD', fontWeight: 500, fontSize: '0.9rem' }}>Loading Travel Buddy…</p>}
    </div>
  );
  if (fullScreen) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8F7FF' }}>
        {spinner}
      </div>
    );
  }
  return spinner;
}
