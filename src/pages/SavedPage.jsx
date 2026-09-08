import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, UserPlus, MapPin, Star, Heart } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import TrustBadge from '../components/ui/TrustBadge';
import { useApp } from '../context/AppContext';

export default function SavedPage() {
  const { state, actions } = useApp();
  const [tab, setTab] = useState('people');

  const savedUsers = state.users.filter(u => state.savedUsers.includes(u.id));
  const savedTrips = state.trips.filter(t => state.savedTrips.includes(t.id));

  return (
    <AppLayout title="Saved" subtitle="Your bookmarked travellers and trips.">
      <div style={{ maxWidth: 800, margin: '0 auto' }}>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', background: 'white', borderRadius: '1rem', padding: '0.375rem', border: '1px solid rgba(143,136,221,0.15)', width: 'fit-content' }}>
          {[['people', 'Saved People'], ['trips', 'Saved Trips']].map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} style={{ padding: '0.625rem 1.5rem', borderRadius: '0.75rem', border: 'none', cursor: 'pointer', fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '0.875rem', background: tab === key ? 'linear-gradient(135deg,#8F88DD,#6860B8)' : 'transparent', color: tab === key ? 'white' : '#8F88DD' }}>
              {label}
            </button>
          ))}
        </div>

        {tab === 'people' && (
          savedUsers.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#9CA3AF' }}>
              <Heart size={48} style={{ marginBottom: '1rem', opacity: 0.4 }} />
              <p style={{ fontWeight: 600, color: '#202024' }}>No saved travellers yet</p>
              <p>Bookmark travellers you like while browsing matches.</p>
              <Link to="/discover" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', marginTop: '1.5rem' }}>Discover Travellers</Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: '1rem' }}>
              {savedUsers.map(user => (
                <div key={user.id} className="card" style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', gap: '0.875rem', alignItems: 'center', marginBottom: '0.875rem' }}>
                    <img src={user.avatar} alt="" style={{ width: 52, height: 52, borderRadius: '50%', background: '#EAE8FF' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, color: '#202024' }}>{user.name}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem', color: '#8F88DD' }}>
                        <MapPin size={12} /> {user.location}
                      </div>
                    </div>
                    <button onClick={() => actions.toggleSaveUser(user.id)} style={{ background: '#EAE8FF', border: 'none', borderRadius: '0.5rem', padding: '0.375rem', cursor: 'pointer', color: '#8F88DD' }}>
                      <Bookmark size={14} fill="#8F88DD" />
                    </button>
                  </div>
                  <TrustBadge score={user.trustScore} compact />
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', margin: '0.75rem 0' }}>
                    {user.interests?.slice(0, 3).map(i => <span key={i} className="tag" style={{ fontSize: '0.75rem' }}>{i}</span>)}
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Link to={`/profile/${user.id}`} className="btn-secondary" style={{ flex: 1, textDecoration: 'none', justifyContent: 'center', padding: '0.5rem', fontSize: '0.8125rem' }}>View</Link>
                    <button onClick={() => actions.showToast('Connection request sent!', 'success')} className="btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '0.5rem', fontSize: '0.8125rem' }}>
                      <UserPlus size={13} /> Connect
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        {tab === 'trips' && (
          savedTrips.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#9CA3AF' }}>
              <Bookmark size={48} style={{ marginBottom: '1rem', opacity: 0.4 }} />
              <p style={{ fontWeight: 600, color: '#202024' }}>No saved trips yet</p>
              <Link to="/create-trip" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', marginTop: '1.5rem' }}>Create a Trip</Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {savedTrips.map(trip => (
                <div key={trip.id} className="card" style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: '#202024' }}>{trip.destination}</div>
                    <div style={{ fontSize: '0.875rem', color: '#8F88DD' }}>{trip.startDate} → {trip.endDate}</div>
                  </div>
                  <button onClick={() => actions.toggleSaveTrip(trip.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8F88DD' }}>
                    <Bookmark size={16} fill="#8F88DD" />
                  </button>
                  <Link to={`/trip/${trip.id}`} className="btn-secondary" style={{ textDecoration: 'none', padding: '0.5rem 1rem', fontSize: '0.875rem' }}>View</Link>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </AppLayout>
  );
}
