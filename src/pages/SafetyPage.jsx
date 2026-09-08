import React, { useState } from 'react';
import { Shield, CheckCircle, AlertTriangle, Phone, BookOpen, UserCheck, Star, Award, Flag } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import TrustBadge from '../components/ui/TrustBadge';
import { useApp } from '../context/AppContext';
import { DEMO_REVIEWS } from '../data/demoData';

const SAFETY_TIPS = [
  { icon: '📞', title: 'Meet in Public First', desc: 'Always meet your travel buddy in a public place before planning a trip together.' },
  { icon: '🤝', title: 'Use In-App Messaging', desc: 'Keep communications within Travel Buddy until you\'re comfortable sharing personal details.' },
  { icon: '📍', title: 'Share Your Itinerary', desc: 'Let a trusted friend or family member know your travel plans and companion details.' },
  { icon: '🛡️', title: 'Trust Your Instincts', desc: 'If something feels off, it\'s okay to cancel plans. Your safety comes first.' },
  { icon: '✅', title: 'Verify Before You Travel', desc: 'Always check your buddy\'s verification status and read their reviews before committing.' },
  { icon: '💳', title: 'Keep Finances Separate', desc: 'Use our Expense Splitter and avoid giving cash to unverified users.' },
];

const EMERGENCY_CONTACTS = [
  { label: 'Police', number: '100', color: '#DC2626' },
  { label: 'Ambulance', number: '108', color: '#DC2626' },
  { label: 'Women Helpline', number: '1091', color: '#7C3AED' },
  { label: 'Tourist Helpline', number: '1363', color: '#2563EB' },
];

export default function SafetyPage() {
  const { state, actions } = useApp();
  const user = state.currentUser;
  const [activeTab, setActiveTab] = useState('overview');
  const [reportingUser, setReportingUser] = useState(null);
  const [requestingVerification, setRequestingVerification] = useState(false);

  const myReviews = DEMO_REVIEWS.filter(r => r.reviewedUserId === user?.id);
  const avgRating = myReviews.length ? (myReviews.reduce((a, r) => a + r.rating.overall, 0) / myReviews.length).toFixed(1) : null;

  const handleRequestVerification = async (type) => {
    setRequestingVerification(type);
    await new Promise(r => setTimeout(r, 1200));
    actions.updateVerification({ [type]: true });
    setRequestingVerification(null);
    actions.showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} verified! Your trust score has increased.`, 'success');
  };

  const TABS = ['overview', 'reviews', 'tips', 'emergency'];

  return (
    <AppLayout title="TrustGuard Safety" subtitle="Your safety and trust profile management center.">
      <div style={{ maxWidth: 850, margin: '0 auto' }}>

        {/* Trust score hero */}
        <div className="card" style={{ marginBottom: '1.5rem', padding: '2rem', background: 'linear-gradient(135deg,#8F88DD,#6860B8)', color: 'white' }}>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.2)', borderRadius: '1.25rem', padding: '1.25rem 1.75rem', backdropFilter: 'blur(8px)' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: '#F3A9C7', lineHeight: 1 }}>{user?.trustScore}</div>
              <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>/ 100</div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 700, marginTop: '0.25rem' }}>Trust Score</div>
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                {user?.trustScore >= 90 ? '🏆 Highly Trusted Traveller' : user?.trustScore >= 75 ? '⭐ Trusted Traveller' : '🌱 Building Trust'}
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '1rem', lineHeight: 1.6 }}>
                Your Trust Score reflects your verifications, community reviews and platform activity. A higher score increases your visibility and match quality.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '0.75rem', padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                  <span style={{ fontWeight: 700 }}>{myReviews.length}</span> reviews
                </div>
                {avgRating && (
                  <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '0.75rem', padding: '0.5rem 1rem', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    <Star size={14} fill="white" /> <span style={{ fontWeight: 700 }}>{avgRating}</span> avg rating
                  </div>
                )}
                <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '0.75rem', padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                  <span style={{ fontWeight: 700 }}>{Object.values(user?.verification || {}).filter(Boolean).length}</span>/3 verified
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.375rem', marginBottom: '1.5rem', background: 'white', borderRadius: '1rem', padding: '0.375rem', border: '1px solid rgba(143,136,221,0.15)' }}>
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ flex: 1, padding: '0.625rem', borderRadius: '0.75rem', border: 'none', cursor: 'pointer', fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '0.8125rem', background: activeTab === tab ? 'linear-gradient(135deg,#8F88DD,#6860B8)' : 'transparent', color: activeTab === tab ? 'white' : '#8F88DD', textTransform: 'capitalize', transition: 'all 0.2s' }}>
              {tab}
            </button>
          ))}
        </div>

        {/* Overview tab */}
        {activeTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Verification */}
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontWeight: 700, color: '#202024', marginBottom: '1.25rem', fontSize: '0.9375rem' }}>🔐 Identity Verification</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {[
                  { key: 'email', label: 'Email Verification', desc: 'Verify your email address', points: 10 },
                  { key: 'phone', label: 'Phone Verification', desc: 'Verify your mobile number', points: 15 },
                  { key: 'identity', label: 'Identity Verification', desc: 'Verify with government ID', points: 25 },
                ].map(v => {
                  const isDone = user?.verification?.[v.key];
                  return (
                    <div key={v.key} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '0.875rem', background: isDone ? '#DCFCE7' : '#F8F7FF', border: `1px solid ${isDone ? '#86EFAC' : 'rgba(143,136,221,0.15)'}` }}>
                      <div style={{ width: 40, height: 40, borderRadius: '0.625rem', background: isDone ? '#4ADE8022' : '#EAE8FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {isDone ? <CheckCircle size={20} color="#4ADE80" /> : <UserCheck size={20} color="#8F88DD" />}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, color: '#202024', fontSize: '0.9rem' }}>{v.label}</div>
                        <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>{v.desc} · +{v.points} trust points</div>
                      </div>
                      {isDone ? (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: '#DCFCE7', color: '#166534', borderRadius: '9999px', padding: '0.25rem 0.75rem', fontSize: '0.8rem', fontWeight: 600 }}>
                          <CheckCircle size={12} /> Verified
                        </span>
                      ) : (
                        <button onClick={() => handleRequestVerification(v.key)} disabled={requestingVerification === v.key} className="btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.8125rem' }}>
                          {requestingVerification === v.key ? 'Verifying…' : 'Verify'}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Trust breakdown */}
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontWeight: 700, color: '#202024', marginBottom: '1.25rem', fontSize: '0.9375rem' }}>📊 Trust Score Breakdown</h3>
              {[
                { label: 'Identity Verifications', score: user?.verification?.identity ? 25 : user?.verification?.phone ? 15 : user?.verification?.email ? 10 : 5, max: 50 },
                { label: 'Community Reviews', score: Math.min(myReviews.length * 5, 25), max: 25 },
                { label: 'Profile Completeness', score: 15, max: 15 },
                { label: 'Response Rate', score: 8, max: 10 },
              ].map(item => (
                <div key={item.label} style={{ marginBottom: '0.875rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#202024' }}>{item.label}</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#6860B8' }}>{item.score}/{item.max}</span>
                  </div>
                  <div className="progress-bar" style={{ height: 6 }}>
                    <div className="progress-fill" style={{ width: `${(item.score / item.max) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews tab */}
        {activeTab === 'reviews' && (
          <div className="card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'center', background: '#EAE8FF', borderRadius: '1rem', padding: '1rem 1.5rem' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#6860B8' }}>{avgRating || '–'}</div>
                <div style={{ display: 'flex', gap: '2px', justifyContent: 'center', margin: '0.25rem 0' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} color="#F59E0B" fill={avgRating && i < Math.round(avgRating) ? '#F59E0B' : 'none'} />)}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#8F88DD' }}>{myReviews.length} reviews</div>
              </div>
              <div style={{ flex: 1 }}>
                {[5,4,3,2,1].map(r => {
                  const count = myReviews.filter(x => Math.round(x.rating.overall) === r).length;
                  return (
                    <div key={r} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.375rem' }}>
                      <span style={{ fontSize: '0.8rem', color: '#6B7280', width: 8 }}>{r}</span>
                      <Star size={12} color="#F59E0B" fill="#F59E0B" />
                      <div className="progress-bar" style={{ flex: 1, height: 6 }}>
                        <div className="progress-fill" style={{ width: myReviews.length ? `${(count / myReviews.length) * 100}%` : '0%' }} />
                      </div>
                      <span style={{ fontSize: '0.8rem', color: '#9CA3AF', width: 16 }}>{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            {myReviews.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#9CA3AF' }}>
                <p>No reviews yet. Reviews appear after completed trips with connected users.</p>
              </div>
            ) : myReviews.map(review => {
              const reviewer = state.users.find(u => u.id === review.reviewerId);
              return (
                <div key={review.id} style={{ padding: '1.25rem', background: '#F8F7FF', borderRadius: '1rem', marginBottom: '0.875rem', border: '1px solid rgba(143,136,221,0.15)' }}>
                  <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    {reviewer && <img src={reviewer.avatar} alt="" style={{ width: 40, height: 40, borderRadius: '50%', background: '#EAE8FF', flexShrink: 0 }} />}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, color: '#202024' }}>{reviewer?.name}</div>
                      <div style={{ display: 'flex', gap: '2px' }}>{[...Array(5)].map((_, i) => <Star key={i} size={12} color="#F59E0B" fill={i < review.rating.overall ? '#F59E0B' : 'none'} />)}</div>
                    </div>
                    <span style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>{review.date}</span>
                  </div>
                  <p style={{ color: '#6B7280', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>{review.comment}</p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {Object.entries(review.rating).filter(([k]) => k !== 'overall').map(([k, v]) => (
                      <span key={k} style={{ background: '#EAE8FF', color: '#6860B8', borderRadius: '9999px', padding: '0.2rem 0.6rem', fontSize: '0.75rem', fontWeight: 500, textTransform: 'capitalize' }}>
                        {k}: {v}/5
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Safety Tips tab */}
        {activeTab === 'tips' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: '1.25rem' }}>
            {SAFETY_TIPS.map(tip => (
              <div key={tip.title} className="card" style={{ padding: '1.5rem' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{tip.icon}</div>
                <h3 style={{ fontWeight: 700, color: '#202024', marginBottom: '0.5rem', fontSize: '0.9375rem' }}>{tip.title}</h3>
                <p style={{ color: '#6B7280', fontSize: '0.875rem', lineHeight: 1.7 }}>{tip.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* Emergency tab */}
        {activeTab === 'emergency' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="card" style={{ padding: '1.5rem', background: '#FFF1F2', border: '2px solid #FCA5A5' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <AlertTriangle size={24} color="#DC2626" />
                <h3 style={{ fontWeight: 700, color: '#DC2626', fontSize: '1rem' }}>Emergency Contacts</h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: '0.75rem' }}>
                {EMERGENCY_CONTACTS.map(contact => (
                  <a key={contact.label} href={`tel:${contact.number}`} style={{ textDecoration: 'none', background: 'white', borderRadius: '0.875rem', padding: '1rem', border: `2px solid ${contact.color}33`, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <Phone size={20} color={contact.color} />
                    <div style={{ fontWeight: 700, color: '#202024', fontSize: '1.125rem' }}>{contact.number}</div>
                    <div style={{ fontSize: '0.8125rem', color: '#6B7280' }}>{contact.label}</div>
                  </a>
                ))}
              </div>
            </div>

            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontWeight: 700, color: '#202024', marginBottom: '1rem', fontSize: '0.9375rem' }}>📖 Safety Guidelines</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  'Inform your home contact of your travel plans and check in regularly.',
                  'Keep a physical copy of your important documents.',
                  'Have the local hospital and embassy contact numbers saved offline.',
                  'Purchase travel insurance before your trip.',
                  'Know the local emergency number of your destination country.',
                ].map((tip, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.75rem', background: '#F8F7FF', borderRadius: '0.75rem' }}>
                    <CheckCircle size={16} color="#4ADE80" style={{ flexShrink: 0, marginTop: '0.125rem' }} />
                    <span style={{ fontSize: '0.875rem', color: '#6B7280', lineHeight: 1.6 }}>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
