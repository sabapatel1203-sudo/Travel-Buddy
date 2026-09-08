import React from 'react';

/**
 * Circular compatibility score visualization
 */
export default function CompatibilityScore({ score, size = 80, showLabel = true }) {
  const radius = (size - 10) / 2;
  const circumference = 2 * Math.PI * radius;
  const filled = (score / 100) * circumference;
  const color = score >= 85 ? '#8F88DD' : score >= 70 ? '#F3A9C7' : '#9CA3AF';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="#EAE8FF" strokeWidth={6}
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={color} strokeWidth={6}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - filled}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
        />
        <text
          x={size / 2} y={size / 2}
          textAnchor="middle" dominantBaseline="central"
          style={{ transform: 'rotate(90deg)', transformOrigin: `${size / 2}px ${size / 2}px`, fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: size * 0.2, fill: '#202024' }}
        >
          {score}%
        </text>
      </svg>
      {showLabel && <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#8F88DD' }}>Match</span>}
    </div>
  );
}
