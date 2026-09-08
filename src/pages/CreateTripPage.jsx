import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, DollarSign, Users, Zap, ArrowRight, ChevronDown } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import InterestsSelector from '../components/InterestsSelector';
import { useApp } from '../context/AppContext';
import { INTERESTS_LIST, TRAVEL_STYLES, FOOD_PREFS, TRAVEL_PACES, DESTINATIONS } from '../data/demoData';
import { getTripCountdownText } from '../utils/dateUtils';

export default function CreateTripPage() {
  const navigate = useNavigate();
  const { actions } = useApp();
  const [loading, setLoading] = useState(false);
  const [aiOptimizing, setAiOptimizing] = useState(false);
  const [form, setForm] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    budget: '',
    currency: 'INR',
    travelStyle: '',
    groupSize: 2,
    accommodation: '',
    transportation: '',
    interests: [],
    foodPreference: '',
    travelPace: '',
    description: '',
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleInterest = (label) => setForm(f => ({
    ...f,
    interests: f.interests.includes(label) ? f.interests.filter(i => i !== label) : [...f.interests, label]
  }));

  const handleAIOptimize = async () => {
    setAiOptimizing(true);
    await new Promise(r => setTimeout(r, 1200));
    setForm(f => ({
      ...f,
      travelStyle: f.travelStyle || 'Balanced',
      travelPace: f.travelPace || 'Balanced',
      foodPreference: f.foodPreference || 'No Preference',
      accommodation: f.accommodation || 'Guesthouse',
      transportation: f.transportation || 'Train + Local',
    }));
    setAiOptimizing(false);
    actions.showToast('AI has optimized your preferences!', 'success');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.destination || !form.startDate || !form.endDate || !form.budget) {
      actions.showToast('Please fill destination, dates and budget.', 'error');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const trip = actions.addTrip({ ...form, budget: Number(form.budget) });
    actions.showToast('Trip created! Finding your matches…', 'success');
    navigate('/matches');
  };

  return (
    <AppLayout title="Create Trip" subtitle="Set your preferences and let AI find the best matches.">
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>

          {/* Destination & Dates */}
          <div className="card" style={{ marginBottom: '1.25rem', padding: '1.5rem' }}>
            <h3 style={{ fontWeight: 700, color: '#202024', marginBottom: '1.25rem', fontSize: '1rem' }}>📍 Where & When</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#202024', display: 'block', marginBottom: '0.5rem' }}>Destination *</label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                  <input className="input" style={{ paddingLeft: '2.5rem' }} list="destinations" placeholder="e.g. Goa, Manali, Bali…" value={form.destination} onChange={e => set('destination', e.target.value)} required />
                  <datalist id="destinations">{DESTINATIONS.map(d => <option key={d} value={d} />)}</datalist>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#202024' }}>Start Date *</label>
                    {getTripCountdownText(form.startDate) && (
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#6860B8', background: '#EAE8FF', padding: '0.15rem 0.5rem', borderRadius: '9999px' }}>
                        {getTripCountdownText(form.startDate)}
                      </span>
                    )}
                  </div>
                  <div style={{ position: 'relative' }}>
                    <Calendar size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                    <input className="input" style={{ paddingLeft: '2.5rem' }} type="date" value={form.startDate} onChange={e => set('startDate', e.target.value)} required min={new Date().toISOString().split('T')[0]} />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#202024', display: 'block', marginBottom: '0.5rem' }}>End Date *</label>
                  <div style={{ position: 'relative' }}>
                    <Calendar size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                    <input className="input" style={{ paddingLeft: '2.5rem' }} type="date" value={form.endDate} onChange={e => set('endDate', e.target.value)} required min={form.startDate || new Date().toISOString().split('T')[0]} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Budget & Group */}
          <div className="card" style={{ marginBottom: '1.25rem', padding: '1.5rem' }}>
            <h3 style={{ fontWeight: 700, color: '#202024', marginBottom: '1.25rem', fontSize: '1rem' }}>💰 Budget & Group</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#202024', display: 'block', marginBottom: '0.5rem' }}>Budget (per person) *</label>
                <div style={{ position: 'relative' }}>
                  <DollarSign size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                  <input className="input" style={{ paddingLeft: '2.5rem' }} type="number" placeholder="18000" value={form.budget} onChange={e => set('budget', e.target.value)} required min={500} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#202024', display: 'block', marginBottom: '0.5rem' }}>Currency</label>
                <select className="input" value={form.currency} onChange={e => set('currency', e.target.value)} style={{ appearance: 'none' }}>
                  {['INR', 'USD', 'EUR', 'GBP', 'AED'].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#202024', display: 'block', marginBottom: '0.5rem' }}>Group Size</label>
                <div style={{ position: 'relative' }}>
                  <Users size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                  <input className="input" style={{ paddingLeft: '2.5rem' }} type="number" placeholder="4" min={1} max={20} value={form.groupSize} onChange={e => set('groupSize', e.target.value)} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#202024', display: 'block', marginBottom: '0.5rem' }}>Accommodation</label>
                <select className="input" value={form.accommodation} onChange={e => set('accommodation', e.target.value)} style={{ appearance: 'none' }}>
                  <option value="">Select type</option>
                  {['Hostel', 'Guesthouse', 'Hotel', 'Airbnb', 'Luxury Resort', 'Camping', 'Ashram/Hostel'].map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Travel Style */}
          <div className="card" style={{ marginBottom: '1.25rem', padding: '1.5rem' }}>
            <h3 style={{ fontWeight: 700, color: '#202024', marginBottom: '1.25rem', fontSize: '1rem' }}>🎒 Travel Style</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem', marginBottom: '1rem' }}>
              {TRAVEL_STYLES.map(style => (
                <button key={style} type="button" onClick={() => set('travelStyle', style)} className={`interest-chip ${form.travelStyle === style ? 'selected' : ''}`}>
                  {style === 'Budget' ? '💰' : style === 'Backpacker' ? '🎒' : style === 'Balanced' ? '⚖️' : style === 'Comfort' ? '🛋️' : '✨'} {style}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}>
              {TRAVEL_PACES.map(pace => (
                <button key={pace} type="button" onClick={() => set('travelPace', pace)} className={`interest-chip ${form.travelPace === pace ? 'selected' : ''}`}>
                  {pace}
                </button>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="card" style={{ marginBottom: '1.25rem', padding: '1.5rem' }}>
            <h3 style={{ fontWeight: 700, color: '#202024', marginBottom: '1.25rem', fontSize: '1rem' }}>🌟 Interests & Activities</h3>
            <div style={{ marginBottom: '1.25rem' }}>
              <InterestsSelector interests={form.interests} onChange={next => setForm(f => ({ ...f, interests: next }))} />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}>
              {FOOD_PREFS.map(pref => (
                <button key={pref} type="button" onClick={() => set('foodPreference', pref)} className={`interest-chip ${form.foodPreference === pref ? 'selected' : ''}`}>
                  🍽️ {pref}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="card" style={{ marginBottom: '1.5rem', padding: '1.5rem' }}>
            <h3 style={{ fontWeight: 700, color: '#202024', marginBottom: '0.875rem', fontSize: '1rem' }}>📝 Trip Description</h3>
            <textarea className="input" style={{ resize: 'vertical', minHeight: 80 }} placeholder="Describe your ideal trip — what you want to do, see and experience…" value={form.description} onChange={e => set('description', e.target.value)} />
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button type="button" onClick={handleAIOptimize} disabled={aiOptimizing} className="btn-secondary" style={{ flex: 1, justifyContent: 'center', padding: '0.875rem', minWidth: 180 }}>
              <Zap size={18} />
              {aiOptimizing ? 'AI Optimizing…' : 'Let AI Optimize My Preferences'}
            </button>
            <button type="submit" disabled={loading} className="btn-primary" style={{ flex: 2, justifyContent: 'center', padding: '0.875rem', fontSize: '1rem' }}>
              {loading ? 'Creating…' : 'Find My Matches'}
              <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
