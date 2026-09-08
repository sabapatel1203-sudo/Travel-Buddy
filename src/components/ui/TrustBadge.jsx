import React from 'react';
import { ShieldCheck, Star, CheckCircle } from 'lucide-react';

export default function TrustBadge({ score, verification, compact = false }) {
  const level = score >= 90 ? { label: 'Highly Trusted', color: '#166534', bg: '#DCFCE7' }
    : score >= 75 ? { label: 'Trusted', color: '#854D0E', bg: '#FEF9C3' }
    : { label: 'Building Trust', color: '#6860B8', bg: '#EAE8FF' };

  if (compact) {
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', background: level.bg, color: level.color, borderRadius: '9999px', padding: '0.2rem 0.6rem', fontSize: '0.75rem', fontWeight: 600 }}>
        <ShieldCheck size={12} />
        {score}
      </span>
    );
  }

  return (
    <div style={{ background: level.bg, borderRadius: '1rem', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <ShieldCheck size={20} color={level.color} />
        <span style={{ fontWeight: 700, color: level.color }}>{score}/100</span>
        <span style={{ fontSize: '0.8125rem', color: level.color }}>{level.label}</span>
      </div>
      {verification && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
          {verification.email && <span className="badge badge-green"><CheckCircle size={10} />Email</span>}
          {verification.phone && <span className="badge badge-green"><CheckCircle size={10} />Phone</span>}
          {verification.identity && <span className="badge badge-green"><CheckCircle size={10} />Identity</span>}
        </div>
      )}
    </div>
  );
}
