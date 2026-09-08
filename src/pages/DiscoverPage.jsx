import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Star, Shield, UserPlus, Bookmark, MessageCircle, Calendar, Wallet, Check, Sparkles } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import TrustBadge from '../components/ui/TrustBadge';
import { useApp } from '../context/AppContext';

export default function DiscoverPage() {
  const { state, actions } = useApp();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filterDest, setFilterDest] = useState('');
  const [filterStyle, setFilterStyle] = useState('');
  const [connectingId, setConnectingId] = useState(null);

  const allUsers = state.users.filter(u => u.id !== state.currentUser?.id);

  // Available unique destinations from trips for quick filtering
  const tripDestinations = Array.from(
    new Set(state.trips.map(t => t.destination).filter(Boolean))
  );

  const filtered = allUsers.filter(u => {
    const userTrip = (u.trips && u.trips.length > 0)
      ? state.trips.find(t => u.trips.includes(t.id))
      : null;

    const matchSearch = !search ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.location?.toLowerCase().includes(search.toLowerCase()) ||
      u.interests?.some(i => i.toLowerCase().includes(search.toLowerCase())) ||
      userTrip?.destination?.toLowerCase().includes(search.toLowerCase());

    const matchDest = !filterDest ||
      userTrip?.destination?.toLowerCase() === filterDest.toLowerCase() ||
      u.location?.toLowerCase().includes(filterDest.toLowerCase());

    const matchStyle = !filterStyle || u.travelStyle === filterStyle;
    return matchSearch && matchDest && matchStyle;
  });

  const isUserConnected = (userId) => {
    const isDirect = (state.connectedUserIds || []).includes(userId);
    const isMatched = state.matches?.some(
      m => (m.matchedUserId === userId || m.userId === userId) && m.status === 'connected'
    );
    return isDirect || isMatched;
  };

  const handleConnect = async (userId) => {
    setConnectingId(userId);
    await actions.connectWithTraveller(userId);
    setConnectingId(null);
  };

  const handleOpenChat = (userId) => {
    navigate('/messages', { state: { userId } });
  };

  return (
    <AppLayout title="Discover Travellers" subtitle="Browse travel companions, compare trip plans, and connect directly.">
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>

        {/* Search and interactive filters */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 2, minWidth: 220, position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
            <input
              className="input"
              style={{ paddingLeft: '2.5rem' }}
              placeholder="Search by name, destination, or interests…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* Destination filter */}
          <select
            className="input"
            style={{ flex: 1, minWidth: 160, appearance: 'none' }}
            value={filterDest}
            onChange={e => setFilterDest(e.target.value)}
          >
            <option value="">All Destinations</option>
            {tripDestinations.map(d => <option key={d} value={d}>📍 {d}</option>)}
          </select>

          {/* Travel style filter */}
          <select
            className="input"
            style={{ flex: 1, minWidth: 140, appearance: 'none' }}
            value={filterStyle}
            onChange={e => setFilterStyle(e.target.value)}
          >
            <option value="">All Styles</option>
            {['Budget', 'Backpacker', 'Balanced', 'Comfort', 'Luxury'].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Status header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ color: '#6860B8', fontSize: '0.9rem', fontWeight: 600 }}>
            <strong style={{ color: '#202024' }}>{filtered.length}</strong> travellers ready to explore
          </div>
          {(filterDest || filterStyle || search) && (
            <button
              onClick={() => { setSearch(''); setFilterDest(''); setFilterStyle(''); }}
              style={{ background: 'none', border: 'none', color: '#EC4899', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
            >
              Reset Filters ✕
            </button>
          )}
        </div>

        {/* Travellers Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '1.25rem' }}>
          {filtered.map(user => {
            const sharedInterests = (user.interests || []).filter(i => (state.currentUser?.interests || []).includes(i));
            const userTrip = (user.trips && user.trips.length > 0)
              ? state.trips.find(t => user.trips.includes(t.id))
              : null;
            const connected = isUserConnected(user.id);
            const isConnecting = connectingId === user.id;

            return (
              <div
                key={user.id}
                className="card"
                style={{
                  padding: '1.4rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  border: connected ? '1.5px solid rgba(99, 102, 241, 0.3)' : '1px solid rgba(143,136,221,0.18)',
                }}
              >
                <div>
                  {/* Card top: Avatar + Details + Save */}
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                      <Link to={`/profile/${user.id}`}>
                        <img
                          src={user.avatar}
                          alt={user.name}
                          style={{ width: 58, height: 58, borderRadius: '50%', background: '#EAE8FF', border: '2.5px solid rgba(143,136,221,0.25)', objectFit: 'cover' }}
                        />
                      </Link>
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          right: 0,
                          width: 14,
                          height: 14,
                          background: '#4ADE80',
                          borderRadius: '50%',
                          border: '2px solid white',
                        }}
                        title="Online now"
                      />
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <Link to={`/profile/${user.id}`} style={{ textDecoration: 'none' }}>
                        <div style={{ fontWeight: 800, color: '#202024', fontSize: '1.02rem', marginBottom: '0.15rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {user.name}
                        </div>
                      </Link>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', color: '#6860B8', marginBottom: '0.45rem' }}>
                        <MapPin size={12} color="#8F88DD" /> {user.location}
                      </div>

                      {/* Trust & rating indicators */}
                      <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <TrustBadge score={user.trustScore} compact />
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.2rem',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            color: '#92400E',
                            background: '#FEF3C7',
                            border: '1px solid #FDE68A',
                            borderRadius: '9999px',
                            padding: '0.1rem 0.45rem',
                          }}
                        >
                          <Star size={10} fill="#F59E0B" color="#F59E0B" /> {user.rating} ({user.reviewCount || 1})
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => actions.toggleSaveUser(user.id)}
                      title={state.savedUsers.includes(user.id) ? 'Remove bookmark' : 'Bookmark profile'}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', color: '#8F88DD' }}
                    >
                      <Bookmark size={17} fill={state.savedUsers.includes(user.id) ? '#8F88DD' : 'none'} />
                    </button>
                  </div>

                  {/* Bio */}
                  <p style={{ fontSize: '0.835rem', color: '#64748B', lineHeight: 1.55, marginBottom: '0.85rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {user.bio}
                  </p>

                  {/* ACTIVE TRIP CALLOUT: Makes companion searching actionable */}
                  <div
                    style={{
                      background: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
                      border: '1px solid rgba(139, 92, 246, 0.2)',
                      borderRadius: '0.75rem',
                      padding: '0.65rem 0.8rem',
                      marginBottom: '0.85rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#6D28D9', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Sparkles size={11} color="#7C3AED" /> Upcoming Journey
                      </span>
                      {userTrip && (
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#059669', background: '#D1FAE5', padding: '0.05rem 0.4rem', borderRadius: '0.35rem' }}>
                          ₹{userTrip.budget?.toLocaleString('en-IN') || '18,000'}
                        </span>
                      )}
                    </div>
                    {userTrip ? (
                      <div>
                        <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#1E1B4B', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <span>📍 {userTrip.destination}</span>
                          <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#6D28D9', background: '#DDD6FE', padding: '0.05rem 0.4rem', borderRadius: '0.3rem' }}>
                            {userTrip.travelStyle || user.travelStyle}
                          </span>
                        </div>
                        {userTrip.startDate && (
                          <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                            <Calendar size={11} /> {userTrip.startDate} → {userTrip.endDate}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div style={{ fontSize: '0.78rem', color: '#6B7280' }}>
                        Open to spontaneous getaways • Style: <strong>{user.travelStyle}</strong>
                      </div>
                    )}
                  </div>

                  {/* Interest tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
                    {user.interests?.slice(0, 3).map(i => (
                      <span
                        key={i}
                        className="tag"
                        style={{
                          fontSize: '0.72rem',
                          padding: '0.15rem 0.5rem',
                          background: sharedInterests.includes(i) ? '#DCFCE7' : '#EAE8FF',
                          color: sharedInterests.includes(i) ? '#166534' : '#6860B8',
                          fontWeight: sharedInterests.includes(i) ? 700 : 500,
                        }}
                      >
                        {sharedInterests.includes(i) ? '✓ ' : ''}{i}
                      </span>
                    ))}
                    {sharedInterests.length > 0 && (
                      <span style={{ fontSize: '0.72rem', color: '#166534', fontWeight: 700, alignSelf: 'center' }}>
                        +{sharedInterests.length} shared
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Action Buttons: View Profile + Workable Connect/Message */}
                <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(234, 232, 255, 0.8)' }}>
                  <Link
                    to={`/profile/${user.id}`}
                    className="btn-secondary"
                    style={{
                      flex: 1,
                      textDecoration: 'none',
                      justifyContent: 'center',
                      padding: '0.5rem 0.75rem',
                      fontSize: '0.825rem',
                      fontWeight: 600,
                    }}
                  >
                    View
                  </Link>

                  {connected ? (
                    <button
                      onClick={() => handleOpenChat(user.id)}
                      className="btn-primary"
                      style={{
                        flex: 1.2,
                        justifyContent: 'center',
                        padding: '0.5rem 0.75rem',
                        fontSize: '0.825rem',
                        background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)',
                      }}
                    >
                      <MessageCircle size={14} /> Message
                    </button>
                  ) : (
                    <button
                      onClick={() => handleConnect(user.id)}
                      disabled={isConnecting}
                      className="btn-primary"
                      style={{
                        flex: 1.2,
                        justifyContent: 'center',
                        padding: '0.5rem 0.75rem',
                        fontSize: '0.825rem',
                      }}
                    >
                      <UserPlus size={14} />
                      {isConnecting ? 'Connecting…' : 'Connect'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
