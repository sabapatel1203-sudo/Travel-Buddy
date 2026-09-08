import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Filter, SortDesc, CheckCircle, MessageCircle, Bookmark, Heart, Star, Shield, MapPin, Calendar, DollarSign, ChevronDown } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import CompatibilityScore from '../components/ui/CompatibilityScore';
import TrustBadge from '../components/ui/TrustBadge';
import { useApp } from '../context/AppContext';
import { calculateCompatibilityScore, generateMatchExplanation } from '../services/smartMatch';

export default function MatchesPage() {
  const { state, actions } = useApp();
  const [sortBy, setSortBy] = useState('Best Match');
  const [filterVerified, setFilterVerified] = useState(false);
  const [filterMinScore, setFilterMinScore] = useState(0);
  const [expandedMatch, setExpandedMatch] = useState(null);
  const [connecting, setConnecting] = useState(null);

  const activeUserId = state.currentUser?.id || 'demo';
  const userMatches = state.matches.filter(m => m.userId === activeUserId);
  const rawMatches = userMatches.length > 0 ? userMatches : state.matches;

  const me = state.currentUser || {
    id: 'demo',
    name: 'Sam Traveller',
    interests: ['Adventure', 'Beaches', 'Photography', 'Nightlife', 'Movies'],
    travelStyle: 'Backpacker',
    foodPreference: 'Vegetarian',
    travelPace: 'Balanced',
  };

  const enriched = rawMatches
    .map(m => {
      const companionUser = state.users.find(u => u.id === m.matchedUserId);
      if (!companionUser) return null;

      const myTrip = state.trips.find(t => t.id === m.tripId) || state.trips[0];
      const companionTrip = companionUser.trips?.length > 0
        ? state.trips.find(t => t.id === companionUser.trips[0])
        : myTrip;

      const calc = calculateCompatibilityScore(me, companionUser, myTrip, companionTrip);
      const shared = calc.sharedInterests || [];
      const matchReasons = [];

      if (myTrip && companionTrip && myTrip.destination?.toLowerCase() === companionTrip.destination?.toLowerCase()) {
        matchReasons.push(`Same destination (${myTrip.destination})`);
      }
      if (shared.length > 0) {
        matchReasons.push(`${shared.length} shared interest${shared.length > 1 ? 's' : ''} (${shared.slice(0, 3).join(', ')})`);
      }
      if (me.travelStyle && me.travelStyle === companionUser.travelStyle) {
        matchReasons.push(`Same travel style (${me.travelStyle})`);
      }
      if (me.foodPreference && me.foodPreference === companionUser.foodPreference) {
        matchReasons.push(`Same food preference (${me.foodPreference})`);
      }
      if (me.travelPace && me.travelPace === companionUser.travelPace) {
        matchReasons.push(`Same travel pace (${me.travelPace})`);
      }
      if (matchReasons.length === 0) {
        matchReasons.push('Compatible travel dates & budget');
      }

      const aiInsight = generateMatchExplanation(me, companionUser, myTrip, companionTrip, shared);

      return {
        ...m,
        user: companionUser,
        compatibilityScore: calc.score,
        scoreBreakdown: calc.breakdown,
        matchReasons,
        aiInsight,
      };
    })
    .filter(Boolean)
    .filter(m => m.compatibilityScore >= filterMinScore)
    .filter(m => !filterVerified || (m.user.verification?.email && m.user.verification?.phone));

  const sorted = [...enriched].sort((a, b) => {
    if (sortBy === 'Best Match') return b.compatibilityScore - a.compatibilityScore;
    if (sortBy === 'Highest Trust') return b.user.trustScore - a.user.trustScore;
    if (sortBy === 'Closest Budget') return a.compatibilityScore - b.compatibilityScore;
    return b.matchReasons?.length - a.matchReasons?.length;
  });

  const handleConnect = async (matchId) => {
    setConnecting(matchId);
    await actions.connectWithUser(matchId);
    setConnecting(null);
  };

  return (
    <AppLayout title="Your Best Matches" subtitle="AI-powered travel companion recommendations just for you.">
      <div style={{ maxWidth: 900, margin: '0 auto' }}>

        {/* Filters bar */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'white', borderRadius: '9999px', padding: '0.5rem 1rem', border: '1.5px solid rgba(143,136,221,0.25)', flex: 1, minWidth: 200 }}>
            <Filter size={16} color="#8F88DD" />
            <span style={{ fontSize: '0.875rem', color: '#8F88DD', fontWeight: 500 }}>Min. {filterMinScore}% match</span>
            <input type="range" min={0} max={80} step={10} value={filterMinScore} onChange={e => setFilterMinScore(Number(e.target.value))}
              style={{ flex: 1, accentColor: '#8F88DD' }} />
          </div>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ background: 'white', borderRadius: '9999px', padding: '0.5rem 1rem', border: '1.5px solid rgba(143,136,221,0.25)', color: '#6860B8', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', fontFamily: 'Poppins,sans-serif' }}>
            {['Best Match', 'Highest Trust', 'Most Shared Interests'].map(s => <option key={s}>{s}</option>)}
          </select>
          <button onClick={() => setFilterVerified(!filterVerified)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: filterVerified ? 'linear-gradient(135deg,#8F88DD,#6860B8)' : 'white', color: filterVerified ? 'white' : '#6860B8', borderRadius: '9999px', padding: '0.5rem 1rem', border: '1.5px solid rgba(143,136,221,0.25)', cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem', fontFamily: 'Poppins,sans-serif' }}>
            <Shield size={14} /> Verified Only
          </button>
        </div>

        {/* Results count */}
        <div style={{ marginBottom: '1.25rem', color: '#8F88DD', fontSize: '0.9rem' }}>
          <strong style={{ color: '#202024' }}>{sorted.length}</strong> compatible travellers found
        </div>

        {sorted.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#9CA3AF' }}>
            <Heart size={48} style={{ marginBottom: '1rem', opacity: 0.4 }} />
            <h3 style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#202024' }}>No matches found yet.</h3>
            <p>Try expanding your dates or budget range — or create a new trip to generate fresh matches.</p>
            <Link to="/create-trip" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', marginTop: '1.5rem' }}>Create a Trip</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {sorted.map(match => (
              <div key={match.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                {/* Match header */}
                <div style={{ padding: '1.5rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  {/* Avatar + score */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                    <div style={{ position: 'relative' }}>
                      <img src={match.user.avatar} alt="" style={{ width: 72, height: 72, borderRadius: '50%', background: '#EAE8FF', border: '3px solid rgba(143,136,221,0.25)' }} />
                      {match.user.verification?.identity && (
                        <div style={{ position: 'absolute', bottom: 0, right: 0, width: 22, height: 22, background: '#4ADE80', borderRadius: '50%', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <CheckCircle size={12} color="white" />
                        </div>
                      )}
                    </div>
                    <CompatibilityScore score={match.compatibilityScore} size={64} />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
                      <h3 style={{ fontWeight: 700, color: '#202024', fontSize: '1.0625rem' }}>{match.user.name}, {match.user.age}</h3>
                      <TrustBadge score={match.user.trustScore} compact />
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Star size={12} color="#F59E0B" fill="#F59E0B" />
                        <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{match.user.rating}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: '#8F88DD', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
                      <MapPin size={14} /> {match.user.location}
                    </div>

                    {/* Trip info */}
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.875rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8rem', background: '#EAE8FF', padding: '0.2rem 0.6rem', borderRadius: '9999px', color: '#6860B8', fontWeight: 500 }}>
                        <MapPin size={11} /> {state.trips.find(t => t.id === match.tripId)?.destination || 'Goa'}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8rem', background: '#EAE8FF', padding: '0.2rem 0.6rem', borderRadius: '9999px', color: '#6860B8', fontWeight: 500 }}>
                        <span>₹{match.user.trips?.length > 0 ? '18,000' : '15,000'}</span>
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8rem', background: '#F3F2FF', padding: '0.2rem 0.6rem', borderRadius: '9999px', color: '#6860B8', fontWeight: 500 }}>
                        {match.user.travelStyle}
                      </span>
                    </div>

                    {/* Interests */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                      {match.user.interests.slice(0, 4).map(i => <span key={i} className="tag" style={{ fontSize: '0.75rem' }}>{i}</span>)}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '0.625rem', flexShrink: 0, width: '100%', marginTop: '0.5rem' }} className="match-card-actions">
                    <Link to={`/profile/${match.user.id}`} className="btn-secondary" style={{ flex: 1, textDecoration: 'none', padding: '0.5rem 1rem', fontSize: '0.875rem', justifyContent: 'center', minWidth: 110 }}>
                      View Profile
                    </Link>
                    {match.status === 'connected' ? (
                      <Link to="/messages" state={{ userId: match.user.id }} className="btn-primary" style={{ flex: 1, textDecoration: 'none', padding: '0.5rem 1rem', fontSize: '0.875rem', justifyContent: 'center', minWidth: 110 }}>
                        <MessageCircle size={14} /> Message
                      </Link>
                    ) : (
                      <button onClick={() => handleConnect(match.id)} disabled={connecting === match.id} className="btn-primary" style={{ flex: 1, padding: '0.5rem 1rem', fontSize: '0.875rem', justifyContent: 'center', minWidth: 110 }}>
                        {connecting === match.id ? 'Connecting…' : 'Connect'}
                      </button>
                    )}
                    <button onClick={() => actions.toggleSaveUser(match.user.id)} style={{ background: state.savedUsers.includes(match.user.id) ? '#EAE8FF' : 'none', color: '#8F88DD', border: '1.5px solid rgba(143,136,221,0.25)', borderRadius: '9999px', padding: '0.5rem 0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Bookmark size={16} fill={state.savedUsers.includes(match.user.id) ? '#8F88DD' : 'none'} />
                    </button>
                  </div>
                </div>

                {/* AI Insight panel */}
                <div style={{ background: '#F8F7FF', borderTop: '1px solid rgba(143,136,221,0.15)', padding: '1rem 1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#6860B8', marginBottom: '0.5rem' }}>✨ Why you match</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '0.625rem' }}>
                        {(match.matchReasons || []).map(r => (
                          <span key={r} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', color: '#166534', background: '#DCFCE7', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontWeight: 500 }}>
                            <CheckCircle size={10} /> {r}
                          </span>
                        ))}
                      </div>
                      <p style={{ fontSize: '0.8125rem', color: '#6B7280', lineHeight: 1.6 }}>{match.aiInsight}</p>
                    </div>
                    <button onClick={() => setExpandedMatch(expandedMatch === match.id ? null : match.id)} style={{ background: 'none', border: 'none', color: '#8F88DD', cursor: 'pointer', fontSize: '0.8125rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem', flexShrink: 0 }}>
                      Score Breakdown <ChevronDown size={14} style={{ transform: expandedMatch === match.id ? 'rotate(180deg)' : 'none' }} />
                    </button>
                  </div>

                  {expandedMatch === match.id && (
                    <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px dashed rgba(143,136,221,0.2)' }}>
                      {Object.entries(match.scoreBreakdown || {}).map(([key, val]) => (
                        <div key={key}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                            <span style={{ fontSize: '0.8rem', color: '#6B7280', textTransform: 'capitalize', fontWeight: 500 }}>{key}</span>
                            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#6860B8' }}>{val}%</span>
                          </div>
                          <div className="progress-bar" style={{ height: 5 }}>
                            <div className="progress-fill" style={{ width: `${val}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
