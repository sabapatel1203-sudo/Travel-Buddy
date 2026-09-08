import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import InterestsSelector from '../components/InterestsSelector';
import { INTERESTS_LIST, TRAVEL_STYLES, FOOD_PREFS, TRAVEL_PACES, GROUP_PREFS } from '../data/demoData';

const STEPS = [
  'Basic Profile',
  'Travel Interests',
  'Travel Style',
  'Food Preferences',
  'Travel Pace',
  'Group Size',
  'Safety Preferences',
];

const SAFETY_OPTS = ['Verified users only', 'Same-interest users', 'Same age range', 'Public meeting preference'];

export default function OnboardingPage() {
  const { state, actions } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    bio: state.currentUser?.bio || '',
    location: state.currentUser?.location || '',
    age: state.currentUser?.age || '',
    interests: state.currentUser?.interests || [],
    travelStyle: state.currentUser?.travelStyle || '',
    foodPreference: state.currentUser?.foodPreference || '',
    travelPace: state.currentUser?.travelPace || '',
    groupPreference: state.currentUser?.groupPreference || '',
    safetyPrefs: state.currentUser?.safetyPrefs || [],
  });

  const toggle = (key, value) => {
    setData(d => {
      const arr = d[key];
      return { ...d, [key]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value] };
    });
  };

  const set = (k, v) => setData(d => ({ ...d, [k]: v }));

  const handleFinish = async () => {
    const travelDNA = {
      adventure: data.interests.includes('Adventure') || data.interests.includes('Trekking') ? 85 : 55,
      relaxation: data.travelPace === 'Relaxed' ? 85 : data.travelPace === 'Balanced' ? 65 : 45,
      foodExplorer: data.interests.includes('Food') ? 90 : 65,
      photography: data.interests.includes('Photography') ? 88 : 58,
      social: data.groupPreference === '5+ people' ? 90 : data.groupPreference === '3-4 people' ? 75 : 50,
      budget: data.travelStyle === 'Budget' || data.travelStyle === 'Backpacker' ? 88 : data.travelStyle === 'Luxury' ? 35 : 65,
    };
    actions.completeOnboarding({ ...data, travelDNA });
    navigate('/dashboard');
  };

  const canProceed = () => {
    if (step === 1 && data.interests.length < 3) return false;
    if (step === 2 && !data.travelStyle) return false;
    if (step === 3 && !data.foodPreference) return false;
    if (step === 4 && !data.travelPace) return false;
    if (step === 5 && !data.groupPreference) return false;
    return true;
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#F8F7FF,#EAE8FF)', fontFamily: 'Poppins,sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: 560 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(143,136,221,0.15)', borderRadius: '9999px', padding: '0.375rem 1rem', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#6860B8' }}>Step {step + 1} of {STEPS.length}</span>
          </div>
          <h2 style={{ fontSize: '1.625rem', fontWeight: 800, color: '#202024', marginBottom: '0.25rem' }}>{STEPS[step]}</h2>
        </div>

        {/* Progress bar */}
        <div className="progress-bar" style={{ marginBottom: '2rem', height: 6 }}>
          <div className="progress-fill" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
        </div>

        {/* Step content */}
        <div className="card" style={{ padding: '2rem' }}>
          {step === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p style={{ color: '#8F88DD', marginBottom: '0.5rem' }}>Complete your travel profile to get better matches.</p>
              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#202024', display: 'block', marginBottom: '0.5rem' }}>Your Location</label>
                <input className="input" placeholder="e.g. Mumbai, India" value={data.location} onChange={e => set('location', e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#202024', display: 'block', marginBottom: '0.5rem' }}>Age</label>
                <input className="input" type="number" placeholder="24" min="18" max="70" value={data.age} onChange={e => set('age', e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#202024', display: 'block', marginBottom: '0.5rem' }}>Short Bio</label>
                <textarea className="input" style={{ resize: 'vertical', minHeight: 80 }} placeholder="Tell other travellers about yourself…" value={data.bio} onChange={e => set('bio', e.target.value)} />
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <p style={{ color: '#8F88DD', marginBottom: '1.25rem' }}>Select at least 3 interests that match your travel personality.</p>
              <InterestsSelector interests={data.interests} onChange={next => setData(d => ({ ...d, interests: next }))} />
              <p style={{ marginTop: '1rem', fontSize: '0.8125rem', color: data.interests.length >= 3 ? '#166534' : '#9CA3AF' }}>
                {data.interests.length} selected {data.interests.length >= 3 ? '✓' : `(need ${3 - data.interests.length} more)`}
              </p>
            </div>
          )}

          {step === 2 && (
            <div>
              <p style={{ color: '#8F88DD', marginBottom: '1.25rem' }}>How do you prefer to travel?</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {TRAVEL_STYLES.map(style => (
                  <button key={style} onClick={() => set('travelStyle', style)} style={{ padding: '1rem', borderRadius: '1rem', border: `2px solid ${data.travelStyle === style ? '#6860B8' : 'rgba(143,136,221,0.25)'}`, background: data.travelStyle === style ? 'linear-gradient(135deg,#8F88DD,#6860B8)' : 'white', color: data.travelStyle === style ? 'white' : '#202024', fontWeight: 600, cursor: 'pointer', textAlign: 'left' }}>
                    <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>
                      {style === 'Budget' ? '💰' : style === 'Backpacker' ? '🎒' : style === 'Balanced' ? '⚖️' : style === 'Comfort' ? '🛋️' : '✨'}
                    </div>
                    {style}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <p style={{ color: '#8F88DD', marginBottom: '1.25rem' }}>What are your food preferences?</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {FOOD_PREFS.map(pref => (
                  <button key={pref} onClick={() => set('foodPreference', pref)} style={{ padding: '0.875rem 1rem', borderRadius: '0.875rem', border: `2px solid ${data.foodPreference === pref ? '#6860B8' : 'rgba(143,136,221,0.25)'}`, background: data.foodPreference === pref ? '#EAE8FF' : 'white', color: data.foodPreference === pref ? '#6860B8' : '#202024', fontWeight: 600, cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {data.foodPreference === pref && <CheckCircle size={18} color="#6860B8" />}
                    {pref}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <p style={{ color: '#8F88DD', marginBottom: '1.25rem' }}>How fast do you like to travel?</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {TRAVEL_PACES.map((pace, i) => (
                  <button key={pace} onClick={() => set('travelPace', pace)} style={{ padding: '1.25rem 1rem', borderRadius: '1rem', border: `2px solid ${data.travelPace === pace ? '#6860B8' : 'rgba(143,136,221,0.25)'}`, background: data.travelPace === pace ? 'linear-gradient(135deg,#8F88DD,#6860B8)' : 'white', color: data.travelPace === pace ? 'white' : '#202024', fontWeight: 600, cursor: 'pointer', textAlign: 'left' }}>
                    <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{['🐢','⚖️','🚀'][i]}</div>
                    <div>{pace}</div>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 400, opacity: 0.8 }}>
                      {pace === 'Relaxed' ? 'Few activities, lots of leisure time' : pace === 'Balanced' ? 'Mix of activities and rest' : 'Maximum activities, minimal downtime'}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <p style={{ color: '#8F88DD', marginBottom: '1.25rem' }}>What is your preferred group size?</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {GROUP_PREFS.map((pref, i) => (
                  <button key={pref} onClick={() => set('groupPreference', pref)} style={{ padding: '1.25rem 1rem', borderRadius: '1rem', border: `2px solid ${data.groupPreference === pref ? '#6860B8' : 'rgba(143,136,221,0.25)'}`, background: data.groupPreference === pref ? 'linear-gradient(135deg,#8F88DD,#6860B8)' : 'white', color: data.groupPreference === pref ? 'white' : '#202024', fontWeight: 600, cursor: 'pointer', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{['🧍','👫','👥','🎉'][i]}</div>
                    {pref}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 6 && (
            <div>
              <p style={{ color: '#8F88DD', marginBottom: '1.25rem' }}>Choose your safety preferences (optional).</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {SAFETY_OPTS.map(opt => (
                  <button key={opt} onClick={() => toggle('safetyPrefs', opt)} style={{ padding: '0.875rem 1rem', borderRadius: '0.875rem', border: `2px solid ${data.safetyPrefs.includes(opt) ? '#6860B8' : 'rgba(143,136,221,0.25)'}`, background: data.safetyPrefs.includes(opt) ? '#EAE8FF' : 'white', color: data.safetyPrefs.includes(opt) ? '#6860B8' : '#202024', fontWeight: 500, cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {data.safetyPrefs.includes(opt) ? <CheckCircle size={18} color="#6860B8" /> : <div style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid #D1D5DB' }} />}
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          {step > 0 && (
            <button onClick={() => setStep(s => s - 1)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center', padding: '0.875rem' }}>
              <ArrowLeft size={18} /> Back
            </button>
          )}
          {step < STEPS.length - 1 ? (
            <button onClick={() => setStep(s => s + 1)} className="btn-primary" disabled={!canProceed()} style={{ flex: 2, justifyContent: 'center', padding: '0.875rem', opacity: canProceed() ? 1 : 0.6 }}>
              Continue <ArrowRight size={18} />
            </button>
          ) : (
            <button onClick={handleFinish} className="btn-primary" style={{ flex: 2, justifyContent: 'center', padding: '0.875rem' }}>
              Complete Profile 🎉
            </button>
          )}
        </div>

        <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', color: '#9CA3AF', fontSize: '0.875rem', cursor: 'pointer', margin: '1rem auto', display: 'block' }}>
          Skip for now
        </button>
      </div>
    </div>
  );
}
