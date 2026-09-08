import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Eye, EyeOff, Phone, ShieldCheck, Users, Sparkles, Star, Calendar, MessageCircle, Compass } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Logo from '../../components/common/Logo';

export default function LoginPage() {
  const navigate = useNavigate();
  const { actions } = useApp();
  const [form, setForm] = useState({ email: 'sabapatel1203@gmail.com', password: 'saba4886' });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await actions.login(form.email, form.password);
    setLoading(false);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
  };

  const handleDemo = async () => {
    setLoading(true);
    await actions.loginDemo();
    navigate('/dashboard');
  };

  return (
    <div className="auth-main-container" style={{ height: '100vh', width: '100vw', display: 'flex', background: '#F8F7FF', fontFamily: "'Poppins', sans-serif", overflow: 'hidden' }}>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Poppins:wght@400;500;600;700;800;900&display=swap');

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .auth-left-panel {
            flex: 1.1 !important;
            padding: 1.75rem 2rem 1.5rem !important;
          }
          .auth-right-panel {
            flex: 1 !important;
            padding: 2rem 2.25rem !important;
          }
          .hero-sky-text {
            font-size: 1.6rem !important;
            margin-right: 1rem !important;
          }
          .hero-title-text {
            font-size: 2.1rem !important;
          }
        }

        @media (max-width: 768px) {
          .auth-main-container {
            flex-direction: column !important;
            height: auto !important;
            min-height: 100vh !important;
            overflow-y: auto !important;
          }
          .auth-left-panel {
            width: 100% !important;
            height: 380px !important;
            flex: none !important;
            padding: 1.25rem 1.25rem 1rem !important;
          }
          .auth-right-panel {
            width: 100% !important;
            height: auto !important;
            flex: none !important;
            padding: 2rem 1.25rem 3rem !important;
          }
          .auth-curve-divider {
            display: none !important;
          }
          .hero-goa-card {
            display: none !important;
          }
          .hero-sky-text {
            display: none !important;
          }
          .hero-title-text {
            font-size: 1.8rem !important;
          }
          .hero-subtitle-text {
            font-size: 0.78rem !important;
            max-width: 220px !important;
          }
          .hero-flight-arc {
            display: none !important;
          }
          .hero-quote-text {
            font-size: 1.1rem !important;
          }
          .hero-bottom-bar {
            padding: 0.5rem 0.5rem !important;
          }
          .hero-bottom-bar-title {
            font-size: 0.65rem !important;
          }
          .hero-bottom-bar-sub {
            font-size: 0.55rem !important;
          }
        }
      `}</style>

      {/* ========================================================
          LEFT PANEL — CINEMATIC HERO COMPOSITION
      ======================================================== */}
      <div
        style={{
          flex: '1.35',
          position: 'relative',
          background: 'url(/login-hero-new.png) center center / cover no-repeat',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '2.25rem 3.5rem 1.75rem 2.5rem',
          color: 'white',
          overflow: 'hidden',
          height: '100vh',
        }}
        className="auth-left-panel"
      >
        {/* Focused Gradient Overlay at Top-Left for Text Legibility without darkening photo center */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '65%',
          height: '55%',
          background: 'radial-gradient(ellipse at top left, rgba(15, 23, 42, 0.65) 0%, rgba(15, 23, 42, 0.35) 50%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }} />

        {/* Focused Gradient Overlay at Top-Right Sky */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',
          height: '45%',
          background: 'radial-gradient(ellipse at top right, rgba(15, 23, 42, 0.45) 0%, transparent 80%)',
          pointerEvents: 'none',
          zIndex: 1,
        }} />

        {/* Focused Gradient Overlay at Bottom for Feature Bar */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '35%',
          background: 'linear-gradient(0deg, rgba(15, 23, 42, 0.75) 0%, rgba(15, 23, 42, 0.3) 60%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }} />

        {/* Sweeping Organic White Curve Divider on Right Edge */}
        <div className="auth-curve-divider" style={{
          position: 'absolute',
          top: 0,
          right: '-2px',
          bottom: 0,
          width: '60px',
          zIndex: 8,
          pointerEvents: 'none',
        }}>
          <svg viewBox="0 0 100 1000" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
            <path d="M 100,0 C 10,350 0,650 100,1000 Z" fill="#FFFFFF" />
          </svg>
        </div>

        {/* Curved Flight Path Arc with Plane Icon */}
        <svg className="hero-flight-arc" viewBox="0 0 600 200" preserveAspectRatio="none" style={{ position: 'absolute', top: '13%', left: '15%', width: '70%', height: '120px', zIndex: 2, opacity: 0.85, pointerEvents: 'none' }}>
          <path d="M 10,110 Q 300,10 570,80" stroke="rgba(255,255,255,0.85)" strokeWidth="2.5" strokeDasharray="6,6" fill="none" />
          <g transform="translate(320, 42) rotate(15) scale(1.1)">
            <path d="M 0 -8 L 4 2 L 12 4 L 4 6 L 2 11 L 0 9 L -2 11 L -4 6 L -12 4 L -4 2 Z" fill="#FFFFFF" />
          </g>
        </svg>

        {/* Location Pin Accent */}
        <div className="hero-flight-arc" style={{
          position: 'absolute',
          top: '16%',
          right: '22%',
          zIndex: 3,
          background: '#FF3B82',
          width: '22px',
          height: '22px',
          borderRadius: '50% 50% 50% 0',
          transform: 'rotate(-45deg)',
          boxShadow: '0 4px 14px rgba(255, 59, 130, 0.5)',
        }} />

        {/* ----------------------------------------------------
            TOP LAYER: LOGO & HANDWRITTEN EDITORIAL HEADINGS
        ---------------------------------------------------- */}
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
          
          {/* Top Left Logo & Good People Cursive Title */}
          <div>
            <div style={{ marginBottom: '0.875rem' }}>
              <Logo size="medium" showTagline={true} lightMode={true} />
            </div>

            <div className="hero-title-text" style={{
              fontFamily: "'Caveat', cursive, sans-serif",
              fontSize: '2.5rem',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.1,
              transform: 'rotate(-3deg)',
              textShadow: '0 4px 15px rgba(0,0,0,0.6)',
            }}>
              Good People<br />
              <span style={{ color: '#FF75A8' }}>Great Journeys ♡</span>
            </div>
            
            <p className="hero-subtitle-text" style={{
              fontSize: '0.85rem',
              color: 'rgba(255,255,255,0.95)',
              marginTop: '0.5rem',
              maxWidth: '260px',
              lineHeight: 1.45,
              textShadow: '0 2px 8px rgba(0,0,0,0.7)',
              fontWeight: 500,
            }}>
              Find your travel buddy, explore new places and create unforgettable memories together.
            </p>
          </div>

          {/* Top Right Handwritten Cursive Text in Sky */}
          <div className="hero-sky-text" style={{
            fontFamily: "'Caveat', cursive, sans-serif",
            fontSize: '1.9rem',
            fontWeight: 700,
            color: '#FFFFFF',
            lineHeight: 1.15,
            transform: 'rotate(-4deg)',
            textAlign: 'center',
            marginTop: '0.875rem',
            marginRight: '2rem',
            textShadow: '0 2px 12px rgba(0,0,0,0.7), 0 0 15px rgba(30, 27, 75, 0.8)',
          }}>
            <div>New Places</div>
            <div style={{ marginLeft: '1.2rem' }}>Same Vibes</div>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              Better Stories! <span style={{ color: '#FF3B82' }}>♥</span>
              <svg viewBox="0 0 100 12" style={{ width: '100%', height: '8px', position: 'absolute', bottom: '-4px', left: 0 }}>
                <path d="M 0,6 Q 50,12 100,4 M 10,10 Q 55,14 90,8" stroke="#FFFFFF" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </svg>
            </div>
          </div>

        </div>

        {/* ----------------------------------------------------
            MIDDLE FLOATING CARDS (10K+ ACTIVE & GOA POLAROID)
        ---------------------------------------------------- */}
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', pointerEvents: 'none', margin: '0.75rem 0' }}>
          
          {/* 10K+ Active Travelers Pill Card */}
          <div className="hero-stat-card" style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderRadius: '9999px',
            padding: '0.45rem 1.25rem 0.45rem 0.65rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            boxShadow: '0 15px 35px rgba(0,0,0,0.25)',
            pointerEvents: 'auto',
          }}>
            <div style={{ display: 'flex' }}>
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" alt="Avatar" style={{ width: 28, height: 28, borderRadius: '50%', border: '2px solid white', objectFit: 'cover' }} />
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80" alt="Avatar" style={{ width: 28, height: 28, borderRadius: '50%', border: '2px solid white', marginLeft: -8, objectFit: 'cover' }} />
              <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80" alt="Avatar" style={{ width: 28, height: 28, borderRadius: '50%', border: '2px solid white', marginLeft: -8, objectFit: 'cover' }} />
            </div>
            <div>
              <div style={{ fontWeight: 900, fontSize: '0.9rem', color: '#1E1B4B', lineHeight: 1 }}>10K+</div>
              <div style={{ fontSize: '0.65rem', color: '#64748B', fontWeight: 600 }}>Active Travellers</div>
            </div>
          </div>

          {/* Goa Polaroid Destination Card */}
          <div className="hero-goa-card" style={{
            background: '#FFFFFF',
            borderRadius: '0.875rem',
            padding: '0.45rem 0.45rem 0.65rem',
            boxShadow: '0 18px 40px rgba(0,0,0,0.3)',
            transform: 'rotate(5deg)',
            width: '120px',
            position: 'relative',
            pointerEvents: 'auto',
            marginRight: '2rem',
          }}>
            <div style={{ width: '100%', height: '98px', borderRadius: '0.625rem', overflow: 'hidden', position: 'relative' }}>
              <img src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=300&q=80" alt="Goa Beach" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: 5, right: 5, background: '#FF3B82', width: 20, height: 20, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '0.65rem', color: 'white' }}>♥</span>
              </div>
            </div>
            <div style={{ marginTop: '0.4rem', padding: '0 0.2rem' }}>
              <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#1E1B4B', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                <span style={{ color: '#FF3B82' }}>📍</span> Goa
              </div>
              <div style={{ fontSize: '0.625rem', color: '#64748B', fontWeight: 600 }}>Next Stop?</div>
            </div>
          </div>

        </div>

        {/* ----------------------------------------------------
            BOTTOM BAR: 4 FEATURE PILLS & CURSIVE TEXT
        ---------------------------------------------------- */}
        <div style={{ position: 'relative', zIndex: 10, width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem' }}>
          
          {/* Bottom Left Cursive Script */}
          <div className="hero-quote-text" style={{
            fontFamily: "'Caveat', cursive, sans-serif",
            fontSize: '1.45rem',
            fontWeight: 700,
            color: '#FFFFFF',
            transform: 'rotate(-2deg)',
            textShadow: '0 2px 8px rgba(0,0,0,0.7)',
            whiteSpace: 'nowrap',
            marginBottom: '0.5rem',
          }}>
            Collect Moments Not Things ♡
          </div>

          {/* 4 Feature Dark Glass Container */}
          <div className="hero-bottom-bar" style={{
            flex: '1',
            maxWidth: '460px',
            background: 'rgba(15, 23, 42, 0.72)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderRadius: '1.25rem',
            padding: '0.875rem 1rem',
            border: '1px solid rgba(255, 255, 255, 0.22)',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0.5rem',
            alignItems: 'center',
            textAlign: 'center',
            boxShadow: '0 15px 35px rgba(0,0,0,0.35)',
          }}>
            {[
              { icon: Users, title: 'Verified', sub: 'Travellers' },
              { icon: Sparkles, title: 'AI-Powered', sub: 'Matching' },
              { icon: ShieldCheck, title: 'Safe & Secure', sub: 'Travel' },
              { icon: Star, title: 'Real People', sub: 'Real Journeys' },
            ].map(item => {
              const IconComponent = item.icon;
              return (
                <div key={item.title} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', marginBottom: '0.25rem' }}>
                    <IconComponent size={16} />
                  </div>
                  <div className="hero-bottom-bar-title" style={{ fontWeight: 700, fontSize: '0.72rem', color: '#FFFFFF', lineHeight: 1.1 }}>{item.title}</div>
                  <div className="hero-bottom-bar-sub" style={{ fontSize: '0.625rem', color: 'rgba(255,255,255,0.75)', marginTop: '0.1rem' }}>{item.sub}</div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* ========================================================
          RIGHT PANEL — ELEGANT LOGIN FORM
      ======================================================== */}
      <div className="auth-right-panel" style={{
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '2.5rem 3.5rem',
        background: '#FFFFFF',
        position: 'relative',
        height: '100vh',
        overflowY: 'auto',
      }}>
        
        {/* Top Back To Home Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#1E1B4B', fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            ← Back to Home
          </Link>
        </div>

        {/* Main Form Center Box */}
        <div style={{ maxWidth: 390, width: '100%', margin: 'auto' }}>
          
          {/* Animated Logo Header */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <Logo size="large" showTagline={true} />
          </div>

          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0F172A', marginBottom: '0.25rem', letterSpacing: '-0.02em' }}>
              Welcome Back!
            </h1>
            <p style={{ color: '#8B5CF6', fontSize: '0.925rem', fontWeight: 600 }}>
              Sign in to continue your journey
            </p>
          </div>

          {error && (
            <div style={{ background: '#FEE2E2', border: '1px solid #FECACA', borderRadius: '0.875rem', padding: '0.75rem 1rem', marginBottom: '1rem', color: '#991B1B', fontSize: '0.85rem' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.4rem' }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                <input
                  className="input"
                  style={{ paddingLeft: '2.6rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '0.875rem', height: '46px', fontSize: '0.9rem', width: '100%', color: '#0F172A' }}
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>Password</label>
                <Link to="/forgot-password" style={{ fontSize: '0.8125rem', color: '#8B5CF6', textDecoration: 'none', fontWeight: 600 }}>Forgot password?</Link>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                <input
                  className="input"
                  style={{ paddingLeft: '2.6rem', paddingRight: '2.75rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '0.875rem', height: '46px', fontSize: '0.9rem', width: '100%', color: '#0F172A' }}
                  type={showPw ? 'text' : 'password'}
                  placeholder="Your password"
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  required
                />
                <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}>
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Gradient Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                background: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '0.875rem',
                height: '48px',
                fontSize: '0.95rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 8px 20px rgba(236, 72, 153, 0.35)',
                transition: 'all 0.2s',
                marginTop: '0.375rem',
              }}
            >
              {loading ? 'Signing in…' : 'Sign In'}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.25rem 0' }}>
            <div style={{ flex: 1, height: 1, background: '#E2E8F0' }} />
            <span style={{ color: '#94A3B8', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>OR</span>
            <div style={{ flex: 1, height: 1, background: '#E2E8F0' }} />
          </div>

          {/* Social Auth Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            
            {/* Google */}
            <button onClick={handleDemo} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.625rem',
              background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '0.875rem', height: '42px',
              fontSize: '0.875rem', fontWeight: 600, color: '#334155', cursor: 'pointer',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              Continue with Google
            </button>

            {/* Apple */}
            <button onClick={handleDemo} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.625rem',
              background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '0.875rem', height: '42px',
              fontSize: '0.875rem', fontWeight: 600, color: '#334155', cursor: 'pointer',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#000000">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.63c.66-.8 1.12-1.92.99-3.03-.97.04-2.16.65-2.85 1.45-.62.72-1.16 1.87-1.01 2.97 1.09.08 2.21-.57 2.87-1.39z"/>
              </svg>
              Continue with Apple
            </button>

            {/* Phone */}
            <button onClick={handleDemo} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.625rem',
              background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '0.875rem', height: '42px',
              fontSize: '0.875rem', fontWeight: 600, color: '#334155', cursor: 'pointer',
            }}>
              <Phone size={16} color="#475569" />
              Continue with Phone
            </button>

          </div>

          {/* Register Link */}
          <p style={{ textAlign: 'center', marginTop: '1.25rem', color: '#64748B', fontSize: '0.85rem' }}>
            New to Travel Buddy?{' '}
            <Link to="/register" style={{ color: '#8B5CF6', fontWeight: 700, textDecoration: 'none' }}>Create account</Link>
          </p>

          {/* Bottom 3 Feature Pills Container */}
          <div style={{
            marginTop: '1.25rem',
            background: '#F1F0FE',
            borderRadius: '0.875rem',
            padding: '0.875rem 0.5rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0.5rem',
            textAlign: 'center',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ color: '#8B5CF6', marginBottom: '0.2rem' }}><Calendar size={18} /></div>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#334155', lineHeight: 1.1 }}>Plan Trips</div>
              <div style={{ fontSize: '0.625rem', color: '#64748B' }}>Together</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderLeft: '1px solid #E2E8F0', borderRight: '1px solid #E2E8F0' }}>
              <div style={{ color: '#8B5CF6', marginBottom: '0.2rem' }}><MessageCircle size={18} /></div>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#334155', lineHeight: 1.1 }}>Chat</div>
              <div style={{ fontSize: '0.625rem', color: '#64748B' }}>Securely</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ color: '#8B5CF6', marginBottom: '0.2rem' }}><Compass size={18} /></div>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#334155', lineHeight: 1.1 }}>Discover</div>
              <div style={{ fontSize: '0.625rem', color: '#64748B' }}>Destinations</div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

