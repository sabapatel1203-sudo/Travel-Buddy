import React, { useState } from 'react';
import { Brain, ShieldCheck, Zap, Bot, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const FEATURES = [
  {
    id: 'match',
    icon: Brain,
    title: 'Smart Matching',
    desc: 'Find travellers with similar destinations, dates, budgets and interests.',
    color: '#8F88DD',
    tag: '96% Match Accuracy',
  },
  {
    id: 'trust',
    icon: ShieldCheck,
    title: 'TrustGuard',
    desc: 'Check verification and trust signals before connecting.',
    color: '#F3A9C7',
    tag: 'Verified Profiles',
  },
  {
    id: 'trip',
    icon: Zap,
    title: 'TripCraft AI',
    desc: 'Generate personalized day-wise travel plans.',
    color: '#6860B8',
    tag: 'Instant Itinerary',
  },
  {
    id: 'assistant',
    icon: Bot,
    title: 'AI Travel Assistant',
    desc: 'Get instant help with travel questions.',
    color: '#4ADE80',
    tag: '24/7 Companion',
  },
];

export default function MobileExperienceSection() {
  const [activeTab, setActiveTab] = useState('match');

  return (
    <section style={{ padding: '5.5rem 0', background: 'linear-gradient(180deg, #F8F7FF 0%, #EDE9FF 100%)', position: 'relative', overflow: 'hidden' }}>
      {/* Background ambient lighting */}
      <div style={{ position: 'absolute', top: '10%', left: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(143,136,221,0.12)', filter: 'blur(50px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '-5%', width: 450, height: 450, borderRadius: '50%', background: 'rgba(243,169,199,0.12)', filter: 'blur(50px)', pointerEvents: 'none' }} />

      <div className="tb-container" style={{ position: 'relative', zIndex: 5 }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem', maxWidth: '780px', marginInline: 'auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#FFFFFF', border: '1px solid rgba(143,136,221,0.3)', borderRadius: '9999px', padding: '0.4rem 1.1rem', marginBottom: '1rem', boxShadow: '0 4px 14px rgba(104,96,184,0.08)' }}>
            <Sparkles size={16} color="#6860B8" />
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#6860B8', letterSpacing: '0.04em' }}>MOBILE EXPERIENCE</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', fontWeight: 900, color: '#202024', lineHeight: 1.12, letterSpacing: '-0.02em' }}>
            Travel Buddy in Your Pocket
          </h2>
          <p style={{ color: '#5F6275', marginTop: '0.875rem', fontSize: '1.0625rem', lineHeight: 1.65 }}>
            Find a compatible travel companion, plan your journey, and stay connected — all from your phone.
          </p>
        </div>

        {/* Main Grid: Feature Cards Left, Phone Preview Right */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)', gap: '3rem', alignItems: 'center' }} className="mobile-exp-grid">
          <style>{`
            @media (max-width: 992px) {
              .mobile-exp-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
            }
          `}</style>

          {/* LEFT: 4 FEATURE CARDS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            {FEATURES.map((feat) => {
              const isSelected = activeTab === feat.id;
              return (
                <div
                  key={feat.id}
                  onClick={() => setActiveTab(feat.id)}
                  className="card"
                  style={{
                    padding: '1.5rem',
                    cursor: 'pointer',
                    borderRadius: '1.25rem',
                    border: isSelected ? `2px solid ${feat.color}` : '1px solid rgba(143,136,221,0.2)',
                    background: isSelected ? '#FFFFFF' : 'rgba(255,255,255,0.7)',
                    boxShadow: isSelected ? `0 12px 30px ${feat.color}25` : '0 4px 16px rgba(0,0,0,0.04)',
                    transition: 'all 0.25s ease',
                    transform: isSelected ? 'translateY(-2px)' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '0.875rem', background: feat.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <feat.icon size={22} color={feat.color} />
                    </div>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: feat.color, background: feat.color + '15', padding: '0.2rem 0.6rem', borderRadius: '9999px' }}>
                      {feat.tag}
                    </span>
                  </div>
                  <h3 style={{ fontWeight: 800, color: '#202024', fontSize: '1.0625rem', marginBottom: '0.375rem' }}>{feat.title}</h3>
                  <p style={{ color: '#5F6275', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>{feat.desc}</p>
                </div>
              );
            })}

            {/* Bottom CTA Button */}
            <div style={{ gridColumn: '1 / -1', marginTop: '0.5rem', textAlign: 'left' }}>
              <Link to="/discover" className="btn-primary" style={{ textDecoration: 'none', padding: '0.875rem 2rem', fontSize: '0.9375rem', boxShadow: '0 8px 24px rgba(243,169,199,0.45)' }}>
                Find Your Companion On Mobile <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          {/* RIGHT: REALISTIC PHONE MOCKUP WITH INTERACTIVE LIVE APP PREVIEW */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            
            {/* Phone Frame Outer Shadow Glow */}
            <div style={{
              position: 'relative',
              width: '320px',
              height: '620px',
              background: '#1E1B4B',
              borderRadius: '44px',
              padding: '12px',
              boxShadow: '0 25px 60px rgba(104,96,184,0.35), 0 0 0 1px rgba(255,255,255,0.2) inset',
            }}>
              
              {/* iPhone Dynamic Island / Notch */}
              <div style={{
                position: 'absolute',
                top: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100px',
                height: '24px',
                background: '#000000',
                borderRadius: '12px',
                zIndex: 30,
                display: 'flex',
                alignItems: 'center',
                justify: 'flex-end',
                paddingRight: '8px',
              }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#1E1B4B' }} />
              </div>

              {/* Phone Screen Container */}
              <div style={{
                width: '100%',
                height: '100%',
                background: '#F8F7FF',
                borderRadius: '34px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}>

                {/* Status Bar */}
                <div style={{ height: '44px', padding: '12px 18px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', fontWeight: 700, color: '#1E1B4B', zIndex: 20 }}>
                  <span>9:41</span>
                  <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                    <span>5G</span>
                    <div style={{ width: '18px', height: '9px', border: '1.5px solid #1E1B4B', borderRadius: '3px', padding: '1px' }}>
                      <div style={{ width: '100%', height: '100%', background: '#1E1B4B', borderRadius: '1px' }} />
                    </div>
                  </div>
                </div>

                {/* Mobile App Header */}
                <div style={{ background: '#FFFFFF', padding: '0.625rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(143,136,221,0.15)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    <span style={{ fontSize: '1rem' }}>✈️</span>
                    <span style={{ fontWeight: 800, fontSize: '0.875rem', color: '#1E1B4B' }}>Travel Buddy</span>
                  </div>
                  <span style={{ fontSize: '0.65rem', background: '#DCFCE7', color: '#166534', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '9999px' }}>Live</span>
                </div>

                {/* App Tab Pills inside Phone */}
                <div style={{ display: 'flex', background: '#FFFFFF', padding: '0.35rem 0.5rem', gap: '0.25rem', borderBottom: '1px solid rgba(143,136,221,0.1)' }}>
                  {[
                    { id: 'match', label: 'Match' },
                    { id: 'trip', label: 'Itinerary' },
                    { id: 'chat', label: 'Chat' },
                    { id: 'trust', label: 'Trust' },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      style={{
                        flex: 1,
                        padding: '0.25rem 0',
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        borderRadius: '9999px',
                        border: 'none',
                        cursor: 'pointer',
                        background: activeTab === tab.id ? 'linear-gradient(135deg,#8F88DD,#6860B8)' : 'transparent',
                        color: activeTab === tab.id ? 'white' : '#6B7280',
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Dynamic Screen Content */}
                <div style={{ flex: 1, padding: '0.75rem', overflowY: 'auto' }}>
                  
                  {/* TAB 1: MATCH PREVIEW */}
                  {activeTab === 'match' && (
                    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                      <div style={{ background: '#FFFFFF', borderRadius: '1rem', padding: '0.875rem', boxShadow: '0 4px 16px rgba(104,96,184,0.08)', border: '1px solid rgba(143,136,221,0.15)' }}>
                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.625rem' }}>
                          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" alt="Rohan" style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }} />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 800, fontSize: '0.875rem', color: '#1E1B4B' }}>Rohan Sharma, 25</div>
                            <div style={{ fontSize: '0.7rem', color: '#6860B8', fontWeight: 600 }}>📍 Mumbai → Goa (12–16 Dec)</div>
                          </div>
                        </div>

                        {/* Compatibility Meter */}
                        <div style={{ background: '#F8F7FF', borderRadius: '0.75rem', padding: '0.625rem', marginBottom: '0.625rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', fontWeight: 800, color: '#1E1B4B', marginBottom: '0.25rem' }}>
                            <span>AI Compatibility Score</span>
                            <span style={{ color: '#6860B8' }}>96%</span>
                          </div>
                          <div style={{ height: '6px', background: '#EAE8FF', borderRadius: '9999px', overflow: 'hidden' }}>
                            <div style={{ width: '96%', height: '100%', background: 'linear-gradient(90deg,#8F88DD,#F3A9C7)', borderRadius: '9999px' }} />
                          </div>
                        </div>

                        {/* Interest Tags */}
                        <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                          {['🏖️ Beaches', '📸 Photography', '🥾 Trekking'].map(t => (
                            <span key={t} style={{ background: '#EAE8FF', color: '#6860B8', fontSize: '0.65rem', fontWeight: 600, padding: '0.15rem 0.5rem', borderRadius: '9999px' }}>{t}</span>
                          ))}
                        </div>

                        <Link to="/matches" style={{ textDecoration: 'none', display: 'block' }}>
                          <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.45rem', fontSize: '0.75rem', borderRadius: '0.75rem' }}>
                            View Match Details <ArrowRight size={12} />
                          </button>
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: ITINERARY PREVIEW */}
                  {activeTab === 'trip' && (
                    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <div style={{ background: 'linear-gradient(135deg,#8F88DD,#6860B8)', color: 'white', borderRadius: '0.875rem', padding: '0.625rem 0.875rem', fontSize: '0.75rem', fontWeight: 700, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>🏖️ Goa TripItinerary</span>
                        <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.15rem 0.5rem', borderRadius: '9999px', fontSize: '0.65rem' }}>5 Days</span>
                      </div>
                      {[
                        { time: 'Morning', act: 'Sunrise walk at Baga Beach', cost: '₹500' },
                        { time: 'Afternoon', act: 'Water sports & Kayaking', cost: '₹1,200' },
                        { time: 'Evening', act: 'Sunset & Market at Vagator', cost: '₹800' },
                      ].map((slot, i) => (
                        <div key={i} style={{ background: '#FFFFFF', padding: '0.5rem 0.75rem', borderRadius: '0.75rem', border: '1px solid rgba(143,136,221,0.15)', fontSize: '0.7rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#6860B8', marginBottom: '0.15rem' }}>
                            <span>{slot.time}</span>
                            <span style={{ color: '#166534' }}>{slot.cost}</span>
                          </div>
                          <div style={{ color: '#202024', fontWeight: 500 }}>{slot.act}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* TAB 3: CHAT PREVIEW */}
                  {activeTab === 'chat' && (
                    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', height: '100%' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                        <div style={{ background: '#FFFFFF', padding: '0.5rem 0.75rem', borderRadius: '0.75rem 0.75rem 0.75rem 0.15rem', fontSize: '0.7rem', color: '#202024', maxWidth: '85%', border: '1px solid rgba(143,136,221,0.15)' }}>
                          Hey Sam! Saw your Goa trip details, 96% match! 🏖️
                        </div>
                        <div style={{ background: 'linear-gradient(135deg,#8F88DD,#6860B8)', color: 'white', padding: '0.5rem 0.75rem', borderRadius: '0.75rem 0.75rem 0.15rem 0.75rem', fontSize: '0.7rem', maxWidth: '85%', alignSelf: 'flex-end' }}>
                          Hey Rohan! Super excited, dates align perfectly!
                        </div>
                        <div style={{ background: '#FFFFFF', padding: '0.5rem 0.75rem', borderRadius: '0.75rem 0.75rem 0.75rem 0.15rem', fontSize: '0.7rem', color: '#202024', maxWidth: '85%', border: '1px solid rgba(143,136,221,0.15)' }}>
                          Awesome, let's lock the hostel booking!
                        </div>
                      </div>
                      <div style={{ marginTop: 'auto', background: '#FFFFFF', borderRadius: '9999px', padding: '0.35rem 0.75rem', display: 'flex', alignItems: 'center', border: '1px solid rgba(143,136,221,0.2)', fontSize: '0.65rem', color: '#9CA3AF' }}>
                        Type a message...
                      </div>
                    </div>
                  )}

                  {/* TAB 4: TRUSTGUARD PREVIEW */}
                  {activeTab === 'trust' && (
                    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <div style={{ background: '#FFFFFF', borderRadius: '0.875rem', padding: '0.75rem', textAlign: 'center', border: '1px solid rgba(143,136,221,0.15)' }}>
                        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#DCFCE7', color: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.35rem' }}>
                          <ShieldCheck size={20} />
                        </div>
                        <div style={{ fontSize: '1.125rem', fontWeight: 900, color: '#1E1B4B' }}>94 / 100</div>
                        <div style={{ fontSize: '0.65rem', color: '#166534', fontWeight: 700 }}>Verified Trust Index</div>
                      </div>
                      {[
                        { label: 'Government ID', status: 'Verified ✓' },
                        { label: 'Email & Phone', status: 'Verified ✓' },
                        { label: 'Community Rating', status: '4.8 ★ (12 Reviews)' },
                      ].map((v, idx) => (
                        <div key={idx} style={{ background: '#FFFFFF', padding: '0.45rem 0.75rem', borderRadius: '0.625rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', border: '1px solid rgba(143,136,221,0.1)' }}>
                          <span style={{ color: '#4B5563', fontWeight: 500 }}>{v.label}</span>
                          <span style={{ color: '#166534', fontWeight: 700 }}>{v.status}</span>
                        </div>
                      ))}
                    </div>
                  )}

                </div>

                {/* Home Indicator */}
                <div style={{ height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '100px', height: '4px', background: '#1E1B4B', borderRadius: '2px', opacity: 0.3 }} />
                </div>

              </div>

            </div>

            {/* Floating Badge Label beside phone */}
            <div style={{
              position: 'absolute',
              top: '40px',
              right: '-15px',
              background: '#FFFFFF',
              borderRadius: '9999px',
              padding: '0.4rem 0.875rem',
              boxShadow: '0 8px 24px rgba(104,96,184,0.18)',
              zIndex: 35,
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#6860B8',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }} className="hidden sm:flex">
              <Sparkles size={14} color="#E890B5" /> Real-time Sync
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
