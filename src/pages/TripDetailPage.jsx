import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, DollarSign, Users, Clock, CheckCircle, Zap, ArrowRight, ChevronDown, ChevronUp, MessageCircle, Share2 } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import CompatibilityScore from '../components/ui/CompatibilityScore';
import { useApp } from '../context/AppContext';
import { generateItinerary } from '../services/tripCraft';
import { DEMO_ITINERARY } from '../data/demoData';

export default function TripDetailPage() {
  const { id } = useParams();
  const { state, actions } = useApp();
  const [expandedDay, setExpandedDay] = useState(0);
  const [generatingItinerary, setGeneratingItinerary] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const trip = state.trips.find(t => t.id === id) || state.trips[0];
  const members = trip?.members?.map(id => state.users.find(u => u.id === id)).filter(Boolean) || [];
  const groupData = state.groups.find(g => g.tripId === id);

  const handleGenerateItinerary = async () => {
    setGeneratingItinerary(true);
    await new Promise(r => setTimeout(r, 1600));
    const result = generateItinerary({
      destination: trip?.destination,
      days: trip?.startDate && trip?.endDate
        ? Math.ceil((new Date(trip.endDate) - new Date(trip.startDate)) / (1000 * 60 * 60 * 24)) + 1
        : 5,
      budget: trip?.budget || 18000,
      travelStyle: trip?.travelStyle || 'Balanced',
      interests: trip?.interests || ['Beaches', 'Food'],
    });
    setItinerary(result);
    setExpandedDay(0);
    setGeneratingItinerary(false);
    actions.showToast('Itinerary generated!', 'success');
  };

  const handleUseDemoItinerary = () => {
    setItinerary({
      itinerary: DEMO_ITINERARY.days,
      totalBudget: DEMO_ITINERARY.estimatedTotal,
    });
    setExpandedDay(0);
  };

  if (!trip) {
    return <AppLayout title="Trip"><div style={{ textAlign: 'center', padding: '3rem', color: '#9CA3AF' }}>Trip not found.</div></AppLayout>;
  }

  const dayCount = trip.startDate && trip.endDate
    ? Math.ceil((new Date(trip.endDate) - new Date(trip.startDate)) / (1000 * 60 * 60 * 24)) + 1
    : 5;

  const daysLeft = trip.startDate
    ? Math.max(0, Math.ceil((new Date(trip.startDate) - new Date()) / (1000 * 60 * 60 * 24)))
    : null;

  const READINESS = [
    { label: 'Trip created', done: true },
    { label: 'Buddy found', done: state.matches.some(m => m.userId === state.currentUser?.id && m.status === 'connected') },
    { label: 'Itinerary planned', done: !!itinerary },
    { label: 'Budget calculated', done: !!trip.budget },
    { label: 'Accommodation booked', done: !!trip.accommodation },
    { label: 'Group formed', done: !!groupData },
  ];

  const TABS = ['overview', 'itinerary', 'budget', 'members'];

  return (
    <AppLayout title={trip.destination} subtitle={`${trip.startDate || 'TBD'} → ${trip.endDate || 'TBD'} · ${dayCount} days`}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>

        {/* Hero banner */}
        <div style={{ borderRadius: '1.25rem', background: 'linear-gradient(135deg,#8F88DD,#4A4399)', padding: '2rem', marginBottom: '1.5rem', color: 'white', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.25rem' }}>{trip.destination}</h1>
              <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', opacity: 0.85, fontSize: '0.9rem', marginBottom: '1rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><Calendar size={14} /> {trip.startDate} – {trip.endDate}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><DollarSign size={14} /> ₹{trip.budget?.toLocaleString()}/person</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><Users size={14} /> {members.length} member{members.length !== 1 ? 's' : ''}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><Clock size={14} /> {dayCount} days</span>
              </div>
              <div style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap' }}>
                <span style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '9999px', padding: '0.25rem 0.75rem', fontSize: '0.8125rem', fontWeight: 600 }}>{trip.status || 'Planning'}</span>
                {trip.travelStyle && <span style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '9999px', padding: '0.25rem 0.75rem', fontSize: '0.8125rem' }}>{trip.travelStyle}</span>}
              </div>
            </div>
            {daysLeft !== null && (
              <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '1rem', padding: '1rem 1.25rem', textAlign: 'center', backdropFilter: 'blur(8px)' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#F3A9C7', lineHeight: 1 }}>{daysLeft}</div>
                <div style={{ fontSize: '0.8125rem', opacity: 0.8 }}>days to go</div>
              </div>
            )}
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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="trip-grid">
            <style>{`@media(max-width:600px){.trip-grid{grid-template-columns:1fr!important;}}`}</style>

            {/* Readiness */}
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontWeight: 700, color: '#202024', marginBottom: '1rem', fontSize: '0.9375rem' }}>✅ Trip Readiness</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                <CompatibilityScore score={Math.round((READINESS.filter(r => r.done).length / READINESS.length) * 100)} size={64} showLabel={false} />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.25rem', color: '#202024' }}>{Math.round((READINESS.filter(r => r.done).length / READINESS.length) * 100)}%</div>
                  <div style={{ fontSize: '0.8125rem', color: '#8F88DD' }}>Complete</div>
                </div>
              </div>
              {READINESS.map(r => (
                <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: r.done ? '#166534' : '#9CA3AF', marginBottom: '0.5rem' }}>
                  {r.done ? <CheckCircle size={14} color="#4ADE80" /> : <div style={{ width: 14, height: 14, borderRadius: '50%', border: '1.5px solid #D1D5DB' }} />}
                  {r.label}
                </div>
              ))}
            </div>

            {/* Interests */}
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontWeight: 700, color: '#202024', marginBottom: '1rem', fontSize: '0.9375rem' }}>🌟 Trip Preferences</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                {(trip.interests || ['Beaches', 'Adventure', 'Food']).map(i => <span key={i} className="tag">{i}</span>)}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  { label: 'Style', value: trip.travelStyle || 'Balanced' },
                  { label: 'Pace', value: trip.travelPace || 'Balanced' },
                  { label: 'Food', value: trip.foodPreference || 'No preference' },
                  { label: 'Accommodation', value: trip.accommodation || 'TBD' },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', background: '#F8F7FF', borderRadius: '0.625rem', fontSize: '0.875rem' }}>
                    <span style={{ color: '#6B7280' }}>{item.label}</span>
                    <span style={{ fontWeight: 600, color: '#202024' }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="card" style={{ padding: '1.5rem', gridColumn: '1/-1' }}>
              <h3 style={{ fontWeight: 700, color: '#202024', marginBottom: '1rem', fontSize: '0.9375rem' }}>⚡ Quick Actions</h3>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <Link to="/matches" className="btn-secondary" style={{ textDecoration: 'none', fontSize: '0.875rem' }}><Users size={14} /> Find Buddies</Link>
                <Link to="/messages" className="btn-secondary" style={{ textDecoration: 'none', fontSize: '0.875rem' }}><MessageCircle size={14} /> Message Group</Link>
                <Link to="/expenses" className="btn-secondary" style={{ textDecoration: 'none', fontSize: '0.875rem' }}><DollarSign size={14} /> Track Expenses</Link>
                <button onClick={() => actions.showToast('Trip link copied to clipboard!', 'success')} className="btn-secondary" style={{ fontSize: '0.875rem' }}><Share2 size={14} /> Share Trip</button>
              </div>
            </div>
          </div>
        )}

        {/* Itinerary tab */}
        {activeTab === 'itinerary' && (
          <div>
            {!itinerary ? (
              <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                <Zap size={48} color="#8F88DD" style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontWeight: 700, color: '#202024', marginBottom: '0.5rem' }}>Generate Your AI Itinerary</h3>
                <p style={{ color: '#6B7280', marginBottom: '1.5rem' }}>Let TripCraft AI create a personalized day-by-day itinerary for your {trip.destination} trip.</p>
                <div style={{ display: 'flex', gap: '0.875rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button onClick={handleGenerateItinerary} disabled={generatingItinerary} className="btn-primary" style={{ padding: '0.875rem 1.5rem' }}>
                    <Zap size={16} /> {generatingItinerary ? 'Generating…' : 'Generate with AI'}
                  </button>
                  <button onClick={handleUseDemoItinerary} className="btn-secondary" style={{ padding: '0.875rem 1.5rem' }}>Use Demo</button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {(itinerary.itinerary || []).map((day, di) => (
                  <div key={di} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    <button onClick={() => setExpandedDay(expandedDay === di ? null : di)} style={{ width: '100%', padding: '1.25rem 1.5rem', background: expandedDay === di ? '#EAE8FF' : 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'Poppins,sans-serif' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: 40, height: 40, borderRadius: '0.875rem', background: 'linear-gradient(135deg,#8F88DD,#6860B8)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800 }}>
                          {day.day}
                        </div>
                        <div style={{ textAlign: 'left' }}>
                          <div style={{ fontWeight: 700, color: '#202024' }}>Day {day.day}</div>
                          <div style={{ fontSize: '0.8125rem', color: '#8F88DD' }}>{day.theme}</div>
                        </div>
                      </div>
                      {expandedDay === di ? <ChevronUp size={18} color="#8F88DD" /> : <ChevronDown size={18} color="#8F88DD" />}
                    </button>
                    {expandedDay === di && (
                      <div style={{ padding: '0 1.5rem 1.5rem' }}>
                        {(day.slots || []).map((slot, si) => (
                          <div key={si} style={{ padding: '1rem 0', borderBottom: si < day.slots.length - 1 ? '1px dashed rgba(143,136,221,0.2)' : 'none' }}>
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#8F88DD', minWidth: 64 }}>{slot.time}</span>
                              <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 600, color: '#202024', marginBottom: '0.25rem' }}>{slot.activity}</div>
                                <div style={{ fontSize: '0.8rem', color: '#8F88DD' }}>📍 {slot.location}</div>
                                {slot.estimatedCost && <div style={{ fontSize: '0.8rem', color: '#166534', marginTop: '0.25rem' }}>💰 ₹{slot.estimatedCost?.toLocaleString()}</div>}
                                {slot.food && <div style={{ fontSize: '0.8rem', color: '#F59E0B', marginTop: '0.25rem' }}>🍽️ {slot.food}</div>}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Budget tab */}
        {activeTab === 'budget' && (
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontWeight: 700, color: '#202024', marginBottom: '1.25rem', fontSize: '0.9375rem' }}>💰 Budget Overview</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                { label: 'Total Budget', value: `₹${trip.budget?.toLocaleString() || 18000}`, sub: 'per person' },
                { label: 'Accommodation', value: `₹${Math.round((trip.budget || 18000) * 0.35).toLocaleString()}`, sub: '35%' },
                { label: 'Food', value: `₹${Math.round((trip.budget || 18000) * 0.25).toLocaleString()}`, sub: '25%' },
                { label: 'Transport', value: `₹${Math.round((trip.budget || 18000) * 0.2).toLocaleString()}`, sub: '20%' },
                { label: 'Activities', value: `₹${Math.round((trip.budget || 18000) * 0.15).toLocaleString()}`, sub: '15%' },
                { label: 'Emergency', value: `₹${Math.round((trip.budget || 18000) * 0.05).toLocaleString()}`, sub: '5%' },
              ].map(item => (
                <div key={item.label} style={{ background: '#F8F7FF', borderRadius: '1rem', padding: '1rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.125rem', fontWeight: 800, color: '#202024' }}>{item.value}</div>
                  <div style={{ fontSize: '0.75rem', color: '#8F88DD', fontWeight: 500 }}>{item.label}</div>
                  <div style={{ fontSize: '0.7rem', color: '#9CA3AF' }}>{item.sub}</div>
                </div>
              ))}
            </div>
            <Link to="/expenses" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', padding: '0.75rem 1.5rem' }}>
              <DollarSign size={16} /> Open Expense Tracker <ArrowRight size={14} />
            </Link>
          </div>
        )}

        {/* Members tab */}
        {activeTab === 'members' && (
          <div className="card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontWeight: 700, color: '#202024', fontSize: '0.9375rem' }}>👥 Trip Members</h3>
              <Link to="/matches" className="btn-primary" style={{ textDecoration: 'none', padding: '0.5rem 1rem', fontSize: '0.8125rem' }}>
                <Users size={14} /> Invite Buddies
              </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {members.map(m => {
                const isMe = m.id === state.currentUser?.id;
                return (
                  <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: '#F8F7FF', borderRadius: '1rem', border: isMe ? '2px solid rgba(143,136,221,0.3)' : '1px solid transparent' }}>
                    <img src={m.avatar} alt="" style={{ width: 48, height: 48, borderRadius: '50%', background: '#EAE8FF' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, color: '#202024' }}>{m.name} {isMe && <span style={{ fontSize: '0.75rem', background: '#EAE8FF', color: '#6860B8', padding: '0.15rem 0.5rem', borderRadius: '9999px', fontWeight: 600 }}>You</span>}</div>
                      <div style={{ fontSize: '0.8125rem', color: '#8F88DD' }}>{m.location}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#202024' }}>{m.trustScore}/100</div>
                      <div style={{ fontSize: '0.75rem', color: '#8F88DD' }}>trust</div>
                    </div>
                    {!isMe && (
                      <Link to="/messages" style={{ textDecoration: 'none' }}>
                        <button className="btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8125rem' }}>
                          <MessageCircle size={13} />
                        </button>
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
