import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, Eye, EyeOff, Mail, Lock, User, MapPin, ArrowRight } from 'lucide-react';
import Logo from '../../components/common/Logo';
import { useApp } from '../../context/AppContext';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { actions } = useApp();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', username: '', email: '', password: '', age: '', country: '', bio: '' });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!form.name || !form.email || !form.password) { setError('Please fill all required fields.'); return; }
      if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
      setError(''); setStep(2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await actions.register(form);
    setLoading(false);
    if (result.success) {
      navigate('/onboarding');
    } else {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#F8F7FF', fontFamily: 'Poppins,sans-serif', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: 460 }}>
        <div style={{ marginBottom: '2rem' }}>
          <Logo size="medium" showTagline={true} />
        </div>

        {/* Progress */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
          {[1,2].map(s => (
            <div key={s} style={{ flex: 1, height: 4, borderRadius: 9999, background: step >= s ? 'linear-gradient(90deg,#8F88DD,#6860B8)' : '#EAE8FF', transition: 'background 0.3s' }} />
          ))}
        </div>

        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#202024', marginBottom: '0.5rem' }}>
          {step === 1 ? 'Create Your Account' : 'Tell Us About Yourself'}
        </h2>
        <p style={{ color: '#8F88DD', marginBottom: '2rem' }}>
          {step === 1 ? 'Start finding your perfect travel companion.' : 'Help us personalize your matching experience.'}
        </p>

        {error && (
          <div style={{ background: '#FEE2E2', borderRadius: '0.75rem', padding: '0.875rem 1rem', marginBottom: '1.25rem', color: '#991B1B', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleNext} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#202024', display: 'block', marginBottom: '0.5rem' }}>Full Name *</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                <input className="input" style={{ paddingLeft: '2.5rem' }} type="text" placeholder="Your full name" value={form.name} onChange={e => set('name', e.target.value)} required />
              </div>
            </div>
            <div>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#202024', display: 'block', marginBottom: '0.5rem' }}>Username</label>
              <input className="input" type="text" placeholder="@username" value={form.username} onChange={e => set('username', e.target.value.toLowerCase().replace(/\s/g,''))} />
            </div>
            <div>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#202024', display: 'block', marginBottom: '0.5rem' }}>Email Address *</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                <input className="input" style={{ paddingLeft: '2.5rem' }} type="email" placeholder="you@example.com" value={form.email} onChange={e => set('email', e.target.value)} required />
              </div>
            </div>
            <div>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#202024', display: 'block', marginBottom: '0.5rem' }}>Password *</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                <input className="input" style={{ paddingLeft: '2.5rem', paddingRight: '2.75rem' }} type={showPw ? 'text' : 'password'} placeholder="Min 6 characters" value={form.password} onChange={e => set('password', e.target.value)} required />
                <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF' }}>
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <button type="submit" className="btn-primary" style={{ justifyContent: 'center', padding: '0.875rem', fontSize: '1rem', width: '100%', marginTop: '0.5rem' }}>
              Continue <ArrowRight size={18} />
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#202024', display: 'block', marginBottom: '0.5rem' }}>Age</label>
                <input className="input" type="number" placeholder="24" min="18" max="70" value={form.age} onChange={e => set('age', e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#202024', display: 'block', marginBottom: '0.5rem' }}>Country</label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                  <input className="input" style={{ paddingLeft: '2.5rem' }} type="text" placeholder="India" value={form.country} onChange={e => set('country', e.target.value)} />
                </div>
              </div>
            </div>
            <div>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#202024', display: 'block', marginBottom: '0.5rem' }}>Short Bio</label>
              <textarea className="input" style={{ resize: 'vertical', minHeight: 80 }} placeholder="Tell other travellers a bit about yourself…" value={form.bio} onChange={e => set('bio', e.target.value)} />
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button type="button" onClick={() => setStep(1)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center', padding: '0.875rem' }}>
                Back
              </button>
              <button type="submit" className="btn-primary" disabled={loading} style={{ flex: 2, justifyContent: 'center', padding: '0.875rem', fontSize: '1rem' }}>
                {loading ? 'Creating account…' : 'Create Account'}
                {!loading && <ArrowRight size={18} />}
              </button>
            </div>
          </form>
        )}

        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#6B7280', fontSize: '0.9rem' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#6860B8', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
