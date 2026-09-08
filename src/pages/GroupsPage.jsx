import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Users, CheckCircle, MapPin, Calendar, DollarSign, ArrowRight, UserPlus, X, Search, Filter, Globe, RotateCcw, Sparkles, SlidersHorizontal, Check } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import CompatibilityScore from '../components/ui/CompatibilityScore';
import { useApp } from '../context/AppContext';
import { calculateGroupCompatibility } from '../services/smartMatch';
import { getTripCountdownText } from '../utils/dateUtils';

export default function GroupsPage() {
  const { state, actions } = useApp();
  const [activeTab, setActiveTab] = useState('discover'); // 'discover' | 'my-groups' | 'recommended'
  const [createOpen, setCreateOpen] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [joining, setJoining] = useState(null);

  // Search & Filter State
  const [search, setSearch] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [filterCountry, setFilterCountry] = useState('');
  const [filterBudget, setFilterBudget] = useState('');
  const [filterStyle, setFilterStyle] = useState('');
  const [filterAge, setFilterAge] = useState('');
  const [destSearchQuery, setDestSearchQuery] = useState('');

  const ALL_CITIES_LIST = [
    'Goa', 'Manali', 'Rishikesh', 'Jaipur', 'Kerala', 'Kochi', 'Mumbai', 'Delhi',
    'Bengaluru', 'Ladakh', 'Udaipur', 'Shimla', 'Ooty', 'Darjeeling', 'Varanasi',
    'Agra', 'Bali', 'Ubud', 'Paris', 'Tokyo', 'Kyoto', 'Dubai', 'Bangkok'
  ];

  const ALL_COUNTRIES_LIST = [
    { name: 'India', flag: '🇮🇳' },
    { name: 'Indonesia', flag: '🇮🇩' },
    { name: 'France', flag: '🇫🇷' },
    { name: 'Japan', flag: '🇯🇵' },
    { name: 'Thailand', flag: '🇹🇭' },
    { name: 'United Arab Emirates', flag: '🇦🇪' },
    { name: 'Italy', flag: '🇮🇹' },
  ];

  const POPULAR_DESTINATIONS = [
    { city: 'Goa', country: 'India', flag: '🏖️' },
    { city: 'Manali', country: 'India', flag: '🏔️' },
    { city: 'Rishikesh', country: 'India', flag: '🌊' },
    { city: 'Jaipur', country: 'India', flag: '🏰' },
    { city: 'Kerala', country: 'India', flag: '🌿' },
    { city: 'Ubud', country: 'Indonesia', flag: '🌺' },
    { city: 'Paris', country: 'France', flag: '🎨' },
    { city: 'Tokyo', country: 'Japan', flag: '🎌' },
    { city: 'Ladakh', country: 'India', flag: '⛰️' },
    { city: 'Dubai', country: 'United Arab Emirates', flag: '🕌' },
  ];

  // Create Group Form State
  const [form, setForm] = useState({
    name: '',
    destination: '',
    city: '',
    country: 'India',
    startDate: '',
    endDate: '',
    budget: '',
    maxMembers: 6,
    travelStyle: 'Balanced',
    description: '',
  });
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [creating, setCreating] = useState(false);

  const currentUserId = state.currentUser?.id || 'demo';

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleMember = (uid) => setSelectedMembers(m => m.includes(uid) ? m.filter(id => id !== uid) : [...m, uid]);

  const resetFilters = () => {
    setSearch('');
    setFilterCity('');
    setFilterCountry('');
    setFilterBudget('');
    setFilterStyle('');
    setFilterAge('');
    setDestSearchQuery('');
  };

  const filteredCitiesList = ALL_CITIES_LIST.filter(c => c.toLowerCase().includes(destSearchQuery.toLowerCase()));
  const filteredCountriesList = ALL_COUNTRIES_LIST.filter(c => c.name.toLowerCase().includes(destSearchQuery.toLowerCase()));
  const matchingQuickDestinations = POPULAR_DESTINATIONS.filter(d =>
    d.city.toLowerCase().includes(destSearchQuery.toLowerCase()) ||
    d.country.toLowerCase().includes(destSearchQuery.toLowerCase())
  );

  const activeFilterCount = [filterCity, filterCountry, filterBudget, filterStyle, filterAge].filter(Boolean).length;

  const handleJoinLeave = async (groupId) => {
    setJoining(groupId);
    await new Promise(r => setTimeout(r, 400));
    actions.toggleJoinGroup(groupId);
    setJoining(null);
  };

  const handleCreate = async () => {
    if (!form.name || !form.destination) {
      actions.showToast('Please provide group name and destination.', 'error');
      return;
    }
    setCreating(true);
    await new Promise(r => setTimeout(r, 600));

    const members = [currentUserId, ...selectedMembers];
    const memberUsers = members.map(id => state.users.find(u => u.id === id)).filter(Boolean);
    const compat = calculateGroupCompatibility(memberUsers, []);

    const newGroup = actions.addGroup({
      ...form,
      city: form.city || form.destination,
      country: form.country || 'India',
      budget: Number(form.budget) || 18000,
      maxMembers: Number(form.maxMembers) || 6,
      members,
      compatibility: { overall: compat.overall, ...compat.breakdown },
      strengths: compat.sharedInterests?.slice(0, 4).map(i => `Shared interest: ${i}`) || ['Similar travel goals', 'High group match'],
      status: 'active',
    });

    setCreateOpen(false);
    setForm({ name: '', destination: '', city: '', country: 'India', startDate: '', endDate: '', budget: '', maxMembers: 6, travelStyle: 'Balanced', description: '' });
    setSelectedMembers([]);
    setCreating(false);
    setActiveTab('my-groups');
    actions.showToast('Group created successfully! 🎉', 'success');
  };

  // Connected buddies for invite
  const potentialMembers = state.users.filter(u => u.id !== currentUserId);

  // Filter groups
  const filteredGroups = state.groups.filter(group => {
    // Tab filter
    const isMyGroup = group.members?.includes(currentUserId);
    if (activeTab === 'my-groups' && !isMyGroup) return false;
    if (activeTab === 'recommended') {
      const overall = group.compatibility?.overall || 85;
      if (overall < 85) return false;
    }

    // Search filter
    const matchSearch = !search ||
      group.name.toLowerCase().includes(search.toLowerCase()) ||
      group.destination.toLowerCase().includes(search.toLowerCase()) ||
      group.city?.toLowerCase().includes(search.toLowerCase()) ||
      group.country?.toLowerCase().includes(search.toLowerCase()) ||
      group.description?.toLowerCase().includes(search.toLowerCase());

    // City filter
    const matchCity = !filterCity || group.city?.toLowerCase().includes(filterCity.toLowerCase()) || group.destination.toLowerCase().includes(filterCity.toLowerCase());

    // Country filter
    const matchCountry = !filterCountry || group.country?.toLowerCase() === filterCountry.toLowerCase();

    // Travel style filter
    const matchStyle = !filterStyle || group.travelStyle === filterStyle;

    // Budget filter
    let matchBudget = true;
    if (filterBudget === 'under-15k') matchBudget = group.budget <= 15000;
    else if (filterBudget === '15k-30k') matchBudget = group.budget > 15000 && group.budget <= 30000;
    else if (filterBudget === '30k-60k') matchBudget = group.budget > 30000 && group.budget <= 60000;
    else if (filterBudget === 'above-60k') matchBudget = group.budget > 60000;

    // Age Group Range filter
    let matchAge = true;
    if (filterAge) {
      const memberAges = group.members?.map(id => state.users.find(u => u.id === id)?.age).filter(Boolean) || [25];
      const avgAge = memberAges.reduce((a, b) => a + b, 0) / memberAges.length;
      if (filterAge === '18-24') matchAge = avgAge >= 18 && avgAge <= 24;
      else if (filterAge === '25-34') matchAge = avgAge >= 25 && avgAge <= 34;
      else if (filterAge === '35-44') matchAge = avgAge >= 35 && avgAge <= 44;
      else if (filterAge === '45+') matchAge = avgAge >= 45;
    }

    return matchSearch && matchCity && matchCountry && matchStyle && matchBudget && matchAge;
  });

  const myGroupsCount = state.groups.filter(g => g.members?.includes(currentUserId)).length;

  return (
    <AppLayout title="GroupSync" subtitle="Join compatible travel squads or create your own group.">
      <div style={{ maxWidth: 960, margin: '0 auto' }}>

        {/* Top Header & Create CTA */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
          {/* Navigation Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', background: '#F8F7FF', padding: '0.35rem', borderRadius: '9999px', border: '1px solid rgba(143,136,221,0.2)' }}>
            <button
              onClick={() => setActiveTab('discover')}
              style={{
                background: activeTab === 'discover' ? 'linear-gradient(135deg,#8F88DD,#6860B8)' : 'transparent',
                color: activeTab === 'discover' ? 'white' : '#6860B8',
                border: 'none', borderRadius: '9999px', padding: '0.5rem 1.125rem', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'Poppins,sans-serif', transition: 'all 0.2s'
              }}
            >
              🌐 Discover Squads
            </button>
            <button
              onClick={() => setActiveTab('my-groups')}
              style={{
                background: activeTab === 'my-groups' ? 'linear-gradient(135deg,#8F88DD,#6860B8)' : 'transparent',
                color: activeTab === 'my-groups' ? 'white' : '#6860B8',
                border: 'none', borderRadius: '9999px', padding: '0.5rem 1.125rem', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'Poppins,sans-serif', transition: 'all 0.2s'
              }}
            >
              🎒 My Groups ({myGroupsCount})
            </button>
            <button
              onClick={() => setActiveTab('recommended')}
              style={{
                background: activeTab === 'recommended' ? 'linear-gradient(135deg,#8F88DD,#6860B8)' : 'transparent',
                color: activeTab === 'recommended' ? 'white' : '#6860B8',
                border: 'none', borderRadius: '9999px', padding: '0.5rem 1.125rem', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'Poppins,sans-serif', transition: 'all 0.2s'
              }}
            >
              ✨ Smart Picks
            </button>
          </div>

          <button onClick={() => setCreateOpen(true)} className="btn-primary" style={{ padding: '0.625rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={18} /> Create Group
          </button>
        </div>

        {/* AI Smart Group Banner */}
        <div className="card" style={{ marginBottom: '1.5rem', padding: '1.5rem', background: 'linear-gradient(135deg,#EAE8FF,#F8F7FF)', border: '2px solid rgba(143,136,221,0.25)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 240 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.375rem' }}>
                <Sparkles size={20} color="#6860B8" />
                <h3 style={{ fontWeight: 800, color: '#202024', fontSize: '1.0625rem', margin: 0 }}>Smart Group Recommendation</h3>
              </div>
              <p style={{ color: '#6B7280', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
                Matched based on your travel DNA: <strong>Goa Adventure Crew 🏖️</strong> shares your photography passion, backpacking style, and exact travel dates!
              </p>
            </div>
            <div style={{ textAlign: 'center', background: 'white', borderRadius: '1rem', padding: '0.75rem 1.25rem', border: '1px solid rgba(143,136,221,0.2)' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#6860B8' }}>93%</div>
              <div style={{ fontSize: '0.75rem', color: '#8F88DD', fontWeight: 600 }}>Group Alignment</div>
            </div>
          </div>
        </div>

        {/* Filters & Search Bar */}
        <div className="card" style={{ padding: '1.25rem', marginBottom: '1.5rem', background: 'white' }}>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Search Input */}
            <div style={{ flex: 1, minWidth: 240, position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
              <input
                className="input"
                style={{ paddingLeft: '2.5rem', fontSize: '0.875rem' }}
                placeholder="Search groups by city, country or vibe…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            {/* Filter Trigger Button */}
            <button
              onClick={() => setFilterModalOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.625rem 1.25rem',
                borderRadius: '9999px',
                border: activeFilterCount > 0 ? '2px solid #6860B8' : '1px solid rgba(143,136,221,0.3)',
                background: activeFilterCount > 0 ? 'linear-gradient(135deg, #EAE8FF 0%, #F5F3FF 100%)' : '#FFFFFF',
                color: activeFilterCount > 0 ? '#4C1D95' : '#4B5563',
                fontWeight: 700,
                fontSize: '0.875rem',
                cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(104,96,184,0.08)',
                transition: 'all 0.2s ease-in-out'
              }}
            >
              <SlidersHorizontal size={17} color={activeFilterCount > 0 ? '#6860B8' : '#6B7280'} />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span style={{
                  background: '#6860B8',
                  color: 'white',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  borderRadius: '9999px',
                  padding: '0.1rem 0.55rem',
                  lineHeight: 1
                }}>
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Reset Filter Button if active */}
            {(search || activeFilterCount > 0) && (
              <button
                onClick={resetFilters}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.375rem', background: '#F3F4F6', color: '#6B7280',
                  border: 'none', borderRadius: '9999px', padding: '0.625rem 1rem', cursor: 'pointer', fontSize: '0.8125rem', fontWeight: 600,
                  transition: 'all 0.2s'
                }}
              >
                <RotateCcw size={14} /> Clear All
              </button>
            )}
          </div>

          {/* Active Filter Tags List */}
          {activeFilterCount > 0 && (
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.875rem', paddingTop: '0.75rem', borderTop: '1px dashed #E5E7EB', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Active:</span>
              {filterCity && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: '#EAE8FF', color: '#6860B8', borderRadius: '9999px', padding: '0.2rem 0.65rem', fontSize: '0.775rem', fontWeight: 600 }}>
                  🏙️ City: {filterCity} <X size={13} style={{ cursor: 'pointer' }} onClick={() => setFilterCity('')} />
                </span>
              )}
              {filterCountry && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: '#EAE8FF', color: '#6860B8', borderRadius: '9999px', padding: '0.2rem 0.65rem', fontSize: '0.775rem', fontWeight: 600 }}>
                  🌍 Country: {filterCountry} <X size={13} style={{ cursor: 'pointer' }} onClick={() => setFilterCountry('')} />
                </span>
              )}
              {filterBudget && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: '#EAE8FF', color: '#6860B8', borderRadius: '9999px', padding: '0.2rem 0.65rem', fontSize: '0.775rem', fontWeight: 600 }}>
                  💰 Budget: {filterBudget} <X size={13} style={{ cursor: 'pointer' }} onClick={() => setFilterBudget('')} />
                </span>
              )}
              {filterAge && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: '#EAE8FF', color: '#6860B8', borderRadius: '9999px', padding: '0.2rem 0.65rem', fontSize: '0.775rem', fontWeight: 600 }}>
                  👥 Age: {filterAge} yrs <X size={13} style={{ cursor: 'pointer' }} onClick={() => setFilterAge('')} />
                </span>
              )}
              {filterStyle && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: '#EAE8FF', color: '#6860B8', borderRadius: '9999px', padding: '0.2rem 0.65rem', fontSize: '0.775rem', fontWeight: 600 }}>
                  🎒 Style: {filterStyle} <X size={13} style={{ cursor: 'pointer' }} onClick={() => setFilterStyle('')} />
                </span>
              )}
            </div>
          )}
        </div>

        {/* Results Counter */}
        <div style={{ marginBottom: '1.25rem', color: '#8F88DD', fontSize: '0.875rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            Showing <strong style={{ color: '#202024' }}>{filteredGroups.length}</strong> travel squads
          </div>
        </div>

        {/* Groups Grid */}
        {filteredGroups.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#9CA3AF', background: 'white', borderRadius: '1.25rem', border: '1px solid rgba(143,136,221,0.15)' }}>
            <Users size={48} style={{ marginBottom: '1rem', opacity: 0.4 }} />
            <h3 style={{ fontWeight: 700, color: '#202024', marginBottom: '0.5rem' }}>No matching travel groups found</h3>
            <p style={{ fontSize: '0.875rem', marginBottom: '1.5rem' }}>Try expanding your search, clearing city/country filters, or create your own custom group!</p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button onClick={resetFilters} className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>Clear Filters</button>
              <button onClick={() => setCreateOpen(true)} className="btn-primary" style={{ padding: '0.5rem 1rem' }}>Create a Group</button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(380px,1fr))', gap: '1.25rem' }}>
            {filteredGroups.map(group => {
              const members = group.members?.map(id => state.users.find(u => u.id === id)).filter(Boolean) || [];
              const isMember = group.members?.includes(currentUserId);
              const maxCap = group.maxMembers || 6;
              const isFull = !isMember && members.length >= maxCap;

              return (
                <div key={group.id} className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    {/* Header: Title & Compatibility */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.875rem' }}>
                      <div>
                        <h3 style={{ fontWeight: 800, color: '#202024', fontSize: '1.125rem', marginBottom: '0.25rem', lineHeight: 1.3 }}>{group.name}</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: '#8F88DD', fontSize: '0.875rem', fontWeight: 500 }}>
                          <MapPin size={14} color="#8F88DD" />
                          <span>{group.city || group.destination}{group.country ? `, ${group.country}` : ''}</span>
                        </div>
                      </div>
                      <CompatibilityScore score={group.compatibility?.overall || 88} size={58} />
                    </div>

                    {/* Vibe Description */}
                    {group.description && (
                      <p style={{ color: '#6B7280', fontSize: '0.8375rem', lineHeight: 1.5, marginBottom: '1rem' }}>
                        {group.description}
                      </p>
                    )}

                    {/* Info Pills */}
                    <div style={{ display: 'flex', gap: '0.625rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                      {group.startDate && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78125rem', background: '#EAE8FF', border: '1px solid rgba(143,136,221,0.3)', padding: '0.25rem 0.625rem', borderRadius: '9999px', color: '#6860B8', fontWeight: 700 }}>
                          <Calendar size={12} /> {getTripCountdownText(group.startDate) || group.startDate}
                        </span>
                      )}
                      {group.budget && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78125rem', background: '#F8F7FF', border: '1px solid rgba(143,136,221,0.2)', padding: '0.25rem 0.625rem', borderRadius: '9999px', color: '#6860B8', fontWeight: 600 }}>
                          <DollarSign size={12} /> ₹{Number(group.budget).toLocaleString()}
                        </span>
                      )}
                      {group.travelStyle && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78125rem', background: '#EAE8FF', padding: '0.25rem 0.625rem', borderRadius: '9999px', color: '#6860B8', fontWeight: 600 }}>
                          🎒 {group.travelStyle}
                        </span>
                      )}
                    </div>

                    {/* Members Avatar Stack & Capacity */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', background: '#FAF9FF', padding: '0.625rem 0.875rem', borderRadius: '0.75rem', border: '1px solid rgba(143,136,221,0.15)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ display: 'flex' }}>
                          {members.slice(0, 4).map((m, i) => (
                            <img key={m.id} src={m.avatar} alt={m.name} title={m.name} style={{ width: 30, height: 30, borderRadius: '50%', border: '2px solid white', marginLeft: i ? -6 : 0, background: '#EAE8FF' }} />
                          ))}
                        </div>
                        <span style={{ fontSize: '0.8125rem', color: '#202024', fontWeight: 600 }}>
                          {members.length} / {maxCap} members
                        </span>
                      </div>
                      <span className={`badge ${isMember ? 'badge-green' : isFull ? 'badge-yellow' : 'badge-purple'}`} style={{ fontSize: '0.72rem' }}>
                        {isMember ? 'Joined Member' : isFull ? 'Full Capacity' : 'Open to Join'}
                      </span>
                    </div>

                    {/* Group Strengths */}
                    {group.strengths && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '1.25rem' }}>
                        {group.strengths.slice(0, 3).map(s => (
                          <span key={s} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: '#166534', background: '#DCFCE7', padding: '0.2rem 0.55rem', borderRadius: '9999px', fontWeight: 500 }}>
                            <CheckCircle size={10} /> {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '0.625rem', marginTop: '0.5rem' }}>
                    <button
                      onClick={() => handleJoinLeave(group.id)}
                      disabled={joining === group.id || (isFull && !isMember)}
                      className={isMember ? "btn-secondary" : "btn-primary"}
                      style={{
                        flex: 1, padding: '0.55rem 0.875rem', fontSize: '0.85rem', justifyContent: 'center',
                        background: isMember ? '#F3F2FF' : isFull ? '#9CA3AF' : undefined,
                        color: isMember ? '#6860B8' : undefined,
                        borderColor: isMember ? 'rgba(143,136,221,0.3)' : undefined,
                      }}
                    >
                      {joining === group.id ? 'Updating…' : isMember ? 'Leave Group' : isFull ? 'Group Full' : 'Join Group'}
                    </button>
                    <Link to={`/trip/${group.tripId || 't1'}`} className="btn-secondary" style={{ flex: 1, textDecoration: 'none', justifyContent: 'center', padding: '0.55rem 0.875rem', fontSize: '0.85rem' }}>
                      View Trip <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Create Group Modal */}
        {createOpen && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
            <div className="card animate-fade-in" style={{ width: '100%', maxWidth: 520, padding: '1.75rem', maxHeight: '90vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div>
                  <h3 style={{ fontWeight: 800, color: '#202024', fontSize: '1.25rem', margin: 0 }}>Create Travel Group Squad</h3>
                  <p style={{ fontSize: '0.8125rem', color: '#8F88DD', margin: 0, marginTop: 4 }}>Set your destination, budget, and invite travel companions.</p>
                </div>
                <button onClick={() => setCreateOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} color="#9CA3AF" /></button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#202024', display: 'block', marginBottom: '0.375rem' }}>Group Name *</label>
                  <input className="input" placeholder="e.g., Bali Beach Vibe Squad 🌴" value={form.name} onChange={e => set('name', e.target.value)} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#202024', display: 'block', marginBottom: '0.375rem' }}>City / Destination *</label>
                    <input className="input" placeholder="e.g., Goa or Ubud" value={form.destination} onChange={e => { set('destination', e.target.value); set('city', e.target.value); }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#202024', display: 'block', marginBottom: '0.375rem' }}>Country</label>
                    <select className="input" value={form.country} onChange={e => set('country', e.target.value)}>
                      <option value="India">India 🇮🇳</option>
                      <option value="Indonesia">Indonesia 🇮🇩</option>
                      <option value="France">France 🇫🇷</option>
                      <option value="Japan">Japan 🇯🇵</option>
                      <option value="Thailand">Thailand 🇹🇭</option>
                      <option value="Italy">Italy 🇮🇹</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#202024', display: 'block', marginBottom: '0.375rem' }}>Start Date</label>
                    <input className="input" type="date" value={form.startDate} onChange={e => set('startDate', e.target.value)} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#202024', display: 'block', marginBottom: '0.375rem' }}>End Date</label>
                    <input className="input" type="date" value={form.endDate} onChange={e => set('endDate', e.target.value)} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#202024', display: 'block', marginBottom: '0.375rem' }}>Group Budget per Person (₹)</label>
                    <input className="input" type="number" placeholder="18000" value={form.budget} onChange={e => set('budget', e.target.value)} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#202024', display: 'block', marginBottom: '0.375rem' }}>Travel Style</label>
                    <select className="input" value={form.travelStyle} onChange={e => set('travelStyle', e.target.value)}>
                      <option value="Backpacker">Backpacker</option>
                      <option value="Budget">Budget</option>
                      <option value="Balanced">Balanced</option>
                      <option value="Comfort">Comfort</option>
                      <option value="Luxury">Luxury</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#202024', display: 'block', marginBottom: '0.375rem' }}>Group Description & Vibe</label>
                  <textarea
                    className="input"
                    rows={2}
                    placeholder="Tell travellers what this group is planning..."
                    value={form.description}
                    onChange={e => set('description', e.target.value)}
                    style={{ resize: 'none' }}
                  />
                </div>

                {/* Invite connected users */}
                {potentialMembers.length > 0 && (
                  <div>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#202024', display: 'block', marginBottom: '0.5rem' }}>Invite Travel Companions</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: 150, overflowY: 'auto' }}>
                      {potentialMembers.map(u => (
                        <div key={u.id} onClick={() => toggleMember(u.id)} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0.75rem', borderRadius: '0.75rem', border: `2px solid ${selectedMembers.includes(u.id) ? '#6860B8' : 'rgba(143,136,221,0.2)'}`, background: selectedMembers.includes(u.id) ? '#EAE8FF' : 'white', cursor: 'pointer' }}>
                          <img src={u.avatar} alt="" style={{ width: 32, height: 32, borderRadius: '50%', background: '#EAE8FF' }} />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#202024' }}>{u.name}</div>
                            <div style={{ fontSize: '0.75rem', color: '#8F88DD' }}>{u.location}</div>
                          </div>
                          {selectedMembers.includes(u.id) && <CheckCircle size={16} color="#6860B8" />}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button onClick={() => setCreateOpen(false)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>Cancel</button>
                <button onClick={handleCreate} disabled={creating} className="btn-primary" style={{ flex: 2, justifyContent: 'center' }}>
                  {creating ? 'Creating…' : 'Create Group Squad'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filter Modal */}
        {filterModalOpen && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(4px)' }}>
            <div className="card" style={{ maxWidth: 520, width: '100%', padding: '1.75rem', background: 'white', borderRadius: '1.25rem', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}>
              {/* Modal Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid #F3F4F6' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#EAE8FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <SlidersHorizontal size={18} color="#6860B8" />
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 800, color: '#1F2937', fontSize: '1.125rem', margin: 0 }}>Filter Travel Squads</h3>
                    <p style={{ fontSize: '0.775rem', color: '#6B7280', margin: 0 }}>Refine by destination, budget, age group & style</p>
                  </div>
                </div>
                <button onClick={() => setFilterModalOpen(false)} style={{ background: '#F3F4F6', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <X size={16} color="#6B7280" />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                {/* 1. Destination Section with Live Search */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#374151', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      🏙️ Destination (City & Country)
                    </label>
                    {(filterCity || filterCountry || destSearchQuery) && (
                      <button
                        onClick={() => { setFilterCity(''); setFilterCountry(''); setDestSearchQuery(''); }}
                        style={{ background: 'none', border: 'none', color: '#6860B8', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                      >
                        Clear destination
                      </button>
                    )}
                  </div>

                  {/* Destination Search Box */}
                  <div style={{ position: 'relative', marginBottom: '0.75rem' }}>
                    <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                    <input
                      className="input"
                      style={{ paddingLeft: '2.25rem', paddingRight: destSearchQuery ? '2rem' : '0.85rem', fontSize: '0.85rem', background: '#F9FAFB' }}
                      placeholder="Type to search city or country (e.g., Goa, Bali, Japan)…"
                      value={destSearchQuery}
                      onChange={e => setDestSearchQuery(e.target.value)}
                    />
                    {destSearchQuery && (
                      <X size={14} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', cursor: 'pointer' }} onClick={() => setDestSearchQuery('')} />
                    )}
                  </div>

                  {/* Filtered Dropdowns Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div>
                      <select className="input" value={filterCity} onChange={e => setFilterCity(e.target.value)} style={{ fontSize: '0.85rem', cursor: 'pointer' }}>
                        <option value="">🏙️ All Cities ({filteredCitiesList.length})</option>
                        {filteredCitiesList.map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <select className="input" value={filterCountry} onChange={e => setFilterCountry(e.target.value)} style={{ fontSize: '0.85rem', cursor: 'pointer' }}>
                        <option value="">🌍 All Countries ({filteredCountriesList.length})</option>
                        {filteredCountriesList.map(c => (
                          <option key={c.name} value={c.name}>{c.name} {c.flag}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Quick Select Destination Chips */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', maxHeight: 85, overflowY: 'auto' }}>
                    {matchingQuickDestinations.map(d => {
                      const isSelected = filterCity === d.city || (filterCountry === d.country && !filterCity);
                      return (
                        <button
                          key={d.city + d.country}
                          onClick={() => {
                            if (isSelected) {
                              setFilterCity('');
                              setFilterCountry('');
                            } else {
                              setFilterCity(d.city);
                              setFilterCountry(d.country);
                            }
                          }}
                          style={{
                            padding: '0.3rem 0.65rem',
                            borderRadius: '9999px',
                            border: isSelected ? '1.5px solid #6860B8' : '1px solid #E5E7EB',
                            background: isSelected ? '#EAE8FF' : '#F9FAFB',
                            color: isSelected ? '#4C1D95' : '#4B5563',
                            fontWeight: isSelected ? 700 : 500,
                            fontSize: '0.775rem',
                            cursor: 'pointer',
                            transition: 'all 0.15s'
                          }}
                        >
                          {d.flag} {d.city}, {d.country}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Budget Range */}
                <div>
                  <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#374151', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.5rem' }}>
                    💰 Budget Range per Person
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {[
                      { id: '', label: 'Any Budget' },
                      { id: 'under-15k', label: 'Under ₹15,000' },
                      { id: '15k-30k', label: '₹15k – ₹30k' },
                      { id: '30k-60k', label: '₹30k – ₹60k' },
                      { id: 'above-60k', label: 'Above ₹60k' },
                    ].map(b => (
                      <button
                        key={b.id}
                        onClick={() => setFilterBudget(b.id)}
                        style={{
                          padding: '0.45rem 0.85rem',
                          borderRadius: '9999px',
                          border: filterBudget === b.id ? '2px solid #6860B8' : '1px solid #E5E7EB',
                          background: filterBudget === b.id ? '#EAE8FF' : '#F9FAFB',
                          color: filterBudget === b.id ? '#4C1D95' : '#4B5563',
                          fontWeight: filterBudget === b.id ? 700 : 500,
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          transition: 'all 0.15s'
                        }}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Age Group Range Filter */}
                <div>
                  <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#374151', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.5rem' }}>
                    👥 Target Age Group Range
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    {[
                      { id: '', label: 'All Age Groups', sub: 'No age preference' },
                      { id: '18-24', label: '18–24 years 🎒', sub: 'Students & Gen Z' },
                      { id: '25-34', label: '25–34 years 💼', sub: 'Young Professionals' },
                      { id: '35-44', label: '35–44 years 🌄', sub: 'Mid-Career Explorers' },
                      { id: '45+', label: '45+ years ☕', sub: 'Senior Travellers' },
                    ].map(a => (
                      <button
                        key={a.id}
                        onClick={() => setFilterAge(a.id)}
                        style={{
                          padding: '0.6rem 0.75rem',
                          borderRadius: '0.75rem',
                          textAlign: 'left',
                          border: filterAge === a.id ? '2px solid #6860B8' : '1px solid #E5E7EB',
                          background: filterAge === a.id ? '#EAE8FF' : '#F9FAFB',
                          cursor: 'pointer',
                          transition: 'all 0.15s'
                        }}
                      >
                        <div style={{ fontWeight: 700, fontSize: '0.825rem', color: filterAge === a.id ? '#4C1D95' : '#1F2937' }}>{a.label}</div>
                        <div style={{ fontSize: '0.7rem', color: '#6B7280', marginTop: '0.1rem' }}>{a.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Travel Style */}
                <div>
                  <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#374151', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.5rem' }}>
                    🎒 Travel Style & Vibe
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {['', 'Backpacker', 'Budget', 'Balanced', 'Comfort', 'Luxury'].map(s => (
                      <button
                        key={s}
                        onClick={() => setFilterStyle(s)}
                        style={{
                          padding: '0.45rem 0.85rem',
                          borderRadius: '9999px',
                          border: filterStyle === s ? '2px solid #6860B8' : '1px solid #E5E7EB',
                          background: filterStyle === s ? '#EAE8FF' : '#F9FAFB',
                          color: filterStyle === s ? '#4C1D95' : '#4B5563',
                          fontWeight: filterStyle === s ? 700 : 500,
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          transition: 'all 0.15s'
                        }}
                      >
                        {s || 'All Styles'}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Modal Actions */}
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.75rem', paddingTop: '1rem', borderTop: '1px solid #F3F4F6' }}>
                <button
                  onClick={() => { resetFilters(); }}
                  className="btn-secondary"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  Reset All
                </button>
                <button
                  onClick={() => setFilterModalOpen(false)}
                  className="btn-primary"
                  style={{ flex: 2, justifyContent: 'center' }}
                >
                  Apply Filters ({filteredGroups.length} Matches)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
