import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Bell, Shield, Palette, LogOut, ChevronRight, Sparkles, Mail, MapPin, Eye, EyeOff, CheckCircle, Moon, Sun } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import InterestsSelector from '../components/InterestsSelector';
import AvatarPickerModal from '../components/AvatarPickerModal';
import { useApp } from '../context/AppContext';
import { INTERESTS_LIST, TRAVEL_STYLES, FOOD_PREFS, TRAVEL_PACES, GROUP_PREFS } from '../data/demoData';

const SECTIONS = ['profile', 'notifications', 'privacy', 'appearance', 'account'];

export default function SettingsPage() {
  const { state, actions } = useApp();
  const navigate = useNavigate();
  const user = state.currentUser;
  const [activeSection, setActiveSection] = useState('profile');
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    username: user?.username || '',
    bio: user?.bio || '',
    location: user?.location || '',
    age: user?.age || '',
    travelStyle: user?.travelStyle || '',
    foodPreference: user?.foodPreference || '',
    travelPace: user?.travelPace || '',
    groupPreference: user?.groupPreference || '',
    interests: user?.interests || [],
  });
  const [notifications, setNotifications] = useState({ matches: true, messages: true, tripUpdates: true, groupActivity: true, safetyAlerts: true, marketing: false });
  const [privacy, setPrivacy] = useState({ showLocation: true, showAge: true, publicProfile: true });
  const [darkMode, setDarkMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleInterest = (label) => setForm(f => ({
    ...f,
    interests: f.interests.includes(label) ? f.interests.filter(i => i !== label) : [...f.interests, label]
  }));

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    actions.updateProfile(form);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    actions.showToast('Profile updated successfully!', 'success');
  };

  const handleLogout = () => {
    actions.logout();
    navigate('/');
  };

  const NAV = [
    { key: 'profile', icon: User, label: 'Profile' },
    { key: 'notifications', icon: Bell, label: 'Notifications' },
    { key: 'privacy', icon: Shield, label: 'Privacy' },
    { key: 'appearance', icon: Palette, label: 'Appearance' },
    { key: 'account', icon: LogOut, label: 'Account' },
  ];

  return (
    <AppLayout title="Settings">
      <div style={{ maxWidth: 860, margin: '0 auto', display: 'grid', gridTemplateColumns: '220px 1fr', gap: '1.5rem' }} className="settings-layout">
        <style>{`@media(max-width:640px){.settings-layout{grid-template-columns:1fr!important;} .settings-nav{display:flex!important;flex-direction:row!important;overflow-x:auto;}}`}</style>

        {/* Nav sidebar */}
        <div className="card settings-nav" style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', alignSelf: 'start', position: 'sticky', top: 80 }}>
          {NAV.map(n => (
            <button key={n.key} onClick={() => setActiveSection(n.key)} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: '0.75rem', border: 'none', cursor: 'pointer', fontFamily: 'Poppins,sans-serif', fontWeight: activeSection === n.key ? 700 : 500, fontSize: '0.9rem', background: activeSection === n.key ? 'linear-gradient(135deg,#8F88DD22,#EAE8FF)' : 'transparent', color: activeSection === n.key ? '#6860B8' : '#6B7280', textAlign: 'left', width: '100%' }}>
              <n.icon size={18} />
              <span style={{ display: 'flex', flex: 1 }}>{n.label}</span>
              {activeSection === n.key && <ChevronRight size={14} />}
            </button>
          ))}
        </div>

        {/* Content */}
        <div>
          {/* Profile */}
          {activeSection === 'profile' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Avatar Section */}
              <div className="card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                  <div>
                    <h3 style={{ fontWeight: 700, color: '#202024', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                      Choose Your Travel Avatar ✨
                    </h3>
                    <p style={{ color: '#8F88DD', fontSize: '0.8125rem', margin: 0, marginTop: 4 }}>
                      Show your travel personality
                    </p>
                  </div>
                  <span className="badge badge-purple" style={{ fontSize: '0.75rem' }}>
                    Verified Travel Reputation
                  </span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem',
                    background: 'linear-gradient(135deg, #F8F7FF 0%, #FAFAFE 100%)',
                    padding: '1.25rem 1.5rem',
                    borderRadius: '1rem',
                    border: '1px solid #EAE8FF',
                  }}
                >
                  <div style={{ position: 'relative' }}>
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      style={{
                        width: 88,
                        height: 88,
                        borderRadius: '50%',
                        background: '#EAE8FF',
                        border: '4px solid #8F88DD',
                        boxShadow: '0 6px 16px rgba(143,136,221,0.25)',
                        objectFit: 'cover',
                      }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 2,
                        right: 2,
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #8F88DD, #6860B8)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        border: '2px solid white',
                      }}
                    >
                      ✓
                    </span>
                  </div>

                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1.125rem', color: '#202024' }}>
                      {user?.name}
                    </div>
                    <div style={{ color: '#6860B8', fontSize: '0.875rem', fontWeight: 500 }}>
                      @{user?.username}
                    </div>

                    {user?.avatarPersonality && (
                      <div
                        style={{
                          marginTop: '0.375rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.375rem',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '0.5rem',
                          background: '#EAE8FF',
                          color: '#6860B8',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                        }}
                      >
                        <span>🎒</span> Travel Personality: {user.avatarPersonality}
                      </div>
                    )}

                    <div style={{ marginTop: '0.75rem' }}>
                      <button
                        type="button"
                        onClick={() => setShowAvatarPicker(true)}
                        className="btn-primary"
                        style={{ padding: '0.45rem 1rem', fontSize: '0.8125rem' }}
                      >
                        ✨ Change Avatar
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Avatar Modal */}
              <AvatarPickerModal
                isOpen={showAvatarPicker}
                onClose={() => setShowAvatarPicker(false)}
                currentAvatarUrl={user?.avatar}
                showToast={actions.showToast}
                onSelectAvatar={(avatarObj) => {
                  actions.updateProfile({
                    avatar: avatarObj.avatar,
                    avatarId: avatarObj.id,
                    avatarPersonality: avatarObj.personality,
                  });
                  actions.showToast(`Updated avatar to "${avatarObj.name}" ✨`, 'success');
                }}
              />

              {/* Basic info */}
              <div className="card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontWeight: 700, color: '#202024', marginBottom: '1.25rem', fontSize: '0.9375rem' }}>Basic Info</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#202024', display: 'block', marginBottom: '0.375rem' }}>Full Name</label>
                      <input className="input" value={form.name} onChange={e => set('name', e.target.value)} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#202024', display: 'block', marginBottom: '0.375rem' }}>Username</label>
                      <input className="input" value={form.username} onChange={e => set('username', e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#202024', display: 'block', marginBottom: '0.375rem' }}>Bio</label>
                    <textarea className="input" style={{ resize: 'vertical', minHeight: 70 }} value={form.bio} onChange={e => set('bio', e.target.value)} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#202024', display: 'block', marginBottom: '0.375rem' }}>Location</label>
                      <input className="input" value={form.location} onChange={e => set('location', e.target.value)} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#202024', display: 'block', marginBottom: '0.375rem' }}>Age</label>
                      <input className="input" type="number" value={form.age} onChange={e => set('age', e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Travel preferences */}
              <div className="card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontWeight: 700, color: '#202024', marginBottom: '1.25rem', fontSize: '0.9375rem' }}>Travel Preferences</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '0.875rem' }}>
                    {[
                      { key: 'travelStyle', label: 'Travel Style', opts: TRAVEL_STYLES },
                      { key: 'travelPace', label: 'Travel Pace', opts: TRAVEL_PACES },
                      { key: 'foodPreference', label: 'Food Preference', opts: FOOD_PREFS },
                      { key: 'groupPreference', label: 'Group Size', opts: GROUP_PREFS },
                    ].map(pref => (
                      <div key={pref.key}>
                        <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#202024', display: 'block', marginBottom: '0.375rem' }}>{pref.label}</label>
                        <select className="input" value={form[pref.key]} onChange={e => set(pref.key, e.target.value)} style={{ appearance: 'none' }}>
                          <option value="">Select…</option>
                          {pref.opts.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: '0.5rem' }}>
                    <InterestsSelector interests={form.interests} onChange={next => setForm(f => ({ ...f, interests: next }))} />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.875rem' }}>
                <button onClick={handleSave} disabled={saving} className="btn-primary" style={{ flex: 2, justifyContent: 'center', padding: '0.875rem' }}>
                  {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save Changes'}
                </button>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeSection === 'notifications' && (
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontWeight: 700, color: '#202024', marginBottom: '1.25rem', fontSize: '0.9375rem' }}>🔔 Notification Preferences</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {Object.entries(notifications).map(([key, val]) => {
                  const labels = { matches: 'New Match Recommendations', messages: 'New Messages', tripUpdates: 'Trip Updates', groupActivity: 'Group Activity', safetyAlerts: 'Safety Alerts (cannot disable)', marketing: 'Promotions & News' };
                  return (
                    <div key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: '#F8F7FF', borderRadius: '0.875rem' }}>
                      <span style={{ fontSize: '0.9375rem', fontWeight: 500, color: '#202024' }}>{labels[key]}</span>
                      <button onClick={() => key !== 'safetyAlerts' && setNotifications(n => ({ ...n, [key]: !n[key] }))} disabled={key === 'safetyAlerts'} style={{ width: 44, height: 24, borderRadius: 12, background: val ? 'linear-gradient(135deg,#8F88DD,#6860B8)' : '#E5E7EB', border: 'none', cursor: key === 'safetyAlerts' ? 'default' : 'pointer', position: 'relative', transition: 'background 0.3s' }}>
                        <div style={{ position: 'absolute', top: 2, left: val ? 22 : 2, width: 20, height: 20, borderRadius: '50%', background: 'white', transition: 'left 0.3s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Privacy */}
          {activeSection === 'privacy' && (
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontWeight: 700, color: '#202024', marginBottom: '1.25rem', fontSize: '0.9375rem' }}>🔒 Privacy Settings</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {[
                  { key: 'publicProfile', label: 'Public Profile', desc: 'Allow others to find and view your profile' },
                  { key: 'showLocation', label: 'Show Location', desc: 'Display your location on your profile' },
                  { key: 'showAge', label: 'Show Age', desc: 'Display your age on your profile' },
                ].map(item => (
                  <div key={item.key} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem', background: '#F8F7FF', borderRadius: '0.875rem' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: '#202024', fontSize: '0.9375rem' }}>{item.label}</div>
                      <div style={{ fontSize: '0.8125rem', color: '#6B7280' }}>{item.desc}</div>
                    </div>
                    <button onClick={() => setPrivacy(p => ({ ...p, [item.key]: !p[item.key] }))} style={{ width: 44, height: 24, borderRadius: 12, background: privacy[item.key] ? 'linear-gradient(135deg,#8F88DD,#6860B8)' : '#E5E7EB', border: 'none', cursor: 'pointer', position: 'relative', flexShrink: 0 }}>
                      <div style={{ position: 'absolute', top: 2, left: privacy[item.key] ? 22 : 2, width: 20, height: 20, borderRadius: '50%', background: 'white', transition: 'left 0.3s' }} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Appearance */}
          {activeSection === 'appearance' && (
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontWeight: 700, color: '#202024', marginBottom: '1.25rem', fontSize: '0.9375rem' }}>🎨 Appearance</h3>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {[false, true].map(dark => (
                  <button key={String(dark)} onClick={() => setDarkMode(dark)} style={{ flex: 1, padding: '1.5rem', borderRadius: '1rem', border: `2px solid ${darkMode === dark ? '#6860B8' : 'rgba(143,136,221,0.2)'}`, background: dark ? '#1F2937' : 'white', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                    {dark ? <Moon size={24} color={darkMode ? '#8F88DD' : '#9CA3AF'} /> : <Sun size={24} color={!darkMode ? '#F59E0B' : '#9CA3AF'} />}
                    <span style={{ fontWeight: 600, color: dark ? 'white' : '#202024', fontSize: '0.9rem' }}>{dark ? 'Dark Mode' : 'Light Mode'}</span>
                    {darkMode === dark && <CheckCircle size={16} color="#8F88DD" />}
                  </button>
                ))}
              </div>
              <p style={{ color: '#9CA3AF', fontSize: '0.8125rem', marginTop: '1rem' }}>Coming soon: Full dark mode support is in development.</p>
            </div>
          )}

          {/* Account */}
          {activeSection === 'account' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontWeight: 700, color: '#202024', marginBottom: '1.25rem', fontSize: '0.9375rem' }}>👤 Account Details</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', padding: '0.875rem', background: '#F8F7FF', borderRadius: '0.875rem' }}>
                    <Mail size={16} color="#8F88DD" />
                    <span style={{ fontSize: '0.9rem', color: '#202024', fontWeight: 500 }}>{user?.email || 'demo@travelbuddy.app'}</span>
                    <span className="badge badge-green" style={{ marginLeft: 'auto' }}><CheckCircle size={10} /> Verified</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', padding: '0.875rem', background: '#F8F7FF', borderRadius: '0.875rem' }}>
                    <MapPin size={16} color="#8F88DD" />
                    <span style={{ fontSize: '0.9rem', color: '#202024', fontWeight: 500 }}>Member since {user?.joinedDate?.split('-')[0] || '2024'}</span>
                  </div>
                </div>
              </div>

              <div className="card" style={{ padding: '1.5rem', border: '2px solid #FCA5A5' }}>
                <h3 style={{ fontWeight: 700, color: '#DC2626', marginBottom: '0.75rem', fontSize: '0.9375rem' }}>Danger Zone</h3>
                <p style={{ color: '#6B7280', fontSize: '0.875rem', marginBottom: '1.25rem' }}>These actions cannot be undone. Please be careful.</p>
                <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' }}>
                  <button onClick={handleLogout} className="btn-primary" style={{ background: '#DC2626', padding: '0.625rem 1.25rem', fontSize: '0.875rem' }}>
                    <LogOut size={14} /> Log Out
                  </button>
                  <button onClick={() => actions.showToast('Account deletion would require email confirmation.', 'error')} style={{ background: 'none', border: '1.5px solid #FCA5A5', color: '#DC2626', borderRadius: '9999px', padding: '0.625rem 1.25rem', cursor: 'pointer', fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '0.875rem' }}>
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
