import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Compass, ArrowRight, Shield, Brain, Users, Star, CheckCircle,
  MapPin, Calendar, DollarSign, Heart, Zap, Globe, Search, Menu, X,
  Lock, Sparkles, Plane, Activity, UserCheck, ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import Logo from '../components/common/Logo';
import MobileExperienceSection from '../components/home/MobileExperienceSection';


const STEPS = [
  { icon: MapPin, title: 'Create Profile', desc: 'Set your destination, dates, budget and travel style.' },
  { icon: Search, title: 'Post / Discover', desc: 'Browse curated trips or post your upcoming journey.' },
  { icon: Brain, title: 'AI Matching', desc: 'SmartMatch AI ranks companions by true compatibility.' },
  { icon: ShieldCheck, title: 'Connect & Chat', desc: 'Verify identity, chat securely, and evaluate trust.' },
  { icon: Globe, title: 'Travel Together', desc: 'Form your group, split expenses, and enjoy the trip.' },
];

const FEATURES = [
  {
    icon: Brain,
    title: 'SmartMatch AI',
    desc: 'Weighted algorithm matching travel partners based on 8 core compatibility dimensions.',
    color: '#8F88DD',
    tag: '96% Accuracy',
  },
  {
    icon: ShieldCheck,
    title: 'TrustGuard',
    desc: 'Multi-layer ID verification, community reviews, and trust scores for safer travel.',
    color: '#F3A9C7',
    tag: 'Safety First',
  },
  {
    icon: Zap,
    title: 'TripCraft AI',
    desc: 'Generate complete itineraries in seconds — schedules, budget estimates, and tips.',
    color: '#6860B8',
    tag: 'Instant Itinerary',
  },
  {
    icon: Users,
    title: 'GroupSync',
    desc: 'Form group trips, coordinate schedules, and manage shared group expenses effortlessly.',
    color: '#4ADE80',
    tag: 'Group Travel',
  },
];

const SAMPLE_MATCH = {
  name: 'Rohan Sharma',
  age: 25,
  location: 'Mumbai',
  destination: 'Goa',
  dates: '12–16 Dec',
  budget: '₹18,000',
  style: 'Adventure',
  score: 96,
  interests: ['Beaches', 'Photography', 'Trekking'],
  reasons: ['Same destination', 'Matching travel dates', 'Similar budget', '4 shared interests'],
  trustScore: 94,
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
};

const SAMPLE_AISHA = {
  name: 'Aisha Varma',
  age: 23,
  location: 'Pune',
  score: 92,
  avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
};

export default function LandingPage() {
  const navigate = useNavigate();
  const { actions } = useApp();
  const [demoLoading, setDemoLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchDestination, setSearchDestination] = useState('');
  const [searchDates, setSearchDates] = useState('');

  const handleDemo = async () => {
    setDemoLoading(true);
    await actions.loginDemo();
    navigate('/dashboard');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/discover?destination=${encodeURIComponent(searchDestination)}`);
  };

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif', background: '#F8F7FF', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      
      {/* NAVBAR */}
      <header style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(143, 136, 221, 0.15)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        height: '76px',
        display: 'flex',
        alignItems: 'center',
      }}>
        <div className="tb-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          
          {/* LEFT: LOGO */}
          <Logo size="medium" showTagline={true} />

          {/* CENTER: DESKTOP NAV LINKS */}
          <nav className="hidden md:flex" style={{ display: 'flex', alignItems: 'center', gap: '2.25rem' }}>
            {[
              { name: 'Home', path: '/', active: true },
              { name: 'How It Works', path: '#how-it-works' },
              { name: 'Destinations', path: '/discover' },
              { name: 'Safety', path: '/safety' },
              { name: 'Blog', path: '/about' },
              { name: 'About', path: '/about' },
            ].map(link => (
              <a
                key={link.name}
                href={link.path}
                style={{
                  textDecoration: 'none',
                  color: link.active ? '#6860B8' : '#4B4870',
                  fontWeight: link.active ? 800 : 600,
                  fontSize: '0.9375rem',
                  position: 'relative',
                  paddingBottom: '0.25rem',
                }}
              >
                {link.name}
                {link.active && (
                  <span style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: '#6860B8', borderRadius: '9999px' }} />
                )}
              </a>
            ))}
          </nav>

          {/* RIGHT: ACTIONS & SEARCH ICON */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={() => navigate('/discover')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#202024', padding: '0.4rem', display: 'flex', alignItems: 'center' }}>
              <Search size={20} />
            </button>
            <Link to="/login" className="btn-secondary" style={{ textDecoration: 'none', padding: '0.55rem 1.35rem', fontSize: '0.875rem', borderRadius: '9999px' }}>
              Log In
            </Link>
            <Link to="/register" className="btn-primary" style={{ textDecoration: 'none', padding: '0.55rem 1.35rem', fontSize: '0.875rem', borderRadius: '9999px', background: 'linear-gradient(135deg, #6860B8, #E979AA)', border: 'none' }}>
              Sign Up
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem',
                color: '#6860B8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              className="md:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

        </div>

        {/* MOBILE NAVIGATION DRAWER */}
        {mobileMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '76px',
            left: 0,
            right: 0,
            background: 'white',
            borderBottom: '2px solid rgba(143, 136, 221, 0.2)',
            boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
            padding: '1.5rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            zIndex: 99,
          }}>
            {[
              { name: 'Home', path: '/' },
              { name: 'How It Works', path: '#how-it-works' },
              { name: 'Destinations', path: '/discover' },
              { name: 'Safety', path: '/safety' },
              { name: 'Blog', path: '/about' },
              { name: 'About', path: '/about' },
            ].map(link => (
              <a
                key={link.name}
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  textDecoration: 'none',
                  color: '#202024',
                  fontWeight: 600,
                  fontSize: '1rem',
                }}
              >
                {link.name}
              </a>
            ))}
            <hr style={{ border: 'none', borderTop: '1px solid #EAE8FF', margin: '0.5rem 0' }} />
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="btn-secondary" style={{ flex: 1, textDecoration: 'none', justifyContent: 'center', borderRadius: '9999px' }}>
                Log In
              </Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="btn-primary" style={{ flex: 1, textDecoration: 'none', justifyContent: 'center', borderRadius: '9999px', background: 'linear-gradient(135deg, #6860B8, #E979AA)' }}>
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section style={{
        position: 'relative',
        width: '100%',
        minHeight: '660px',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #F8F7FF 0%, #EDE9FF 50%, #F8F7FF 100%)',
        padding: '3rem 0 4.5rem',
      }}>
        {/* Background Decorative Ambient Blobs */}
        <div style={{ position: 'absolute', top: '-6rem', right: '-4rem', width: 500, height: 500, borderRadius: '50%', background: 'rgba(143,136,221,0.15)', filter: 'blur(40px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-8rem', left: '-4rem', width: 600, height: 600, borderRadius: '50%', background: 'rgba(243,169,199,0.15)', filter: 'blur(40px)', pointerEvents: 'none' }} />

        {/* Faint Bottom Mountain Vector Silhouette */}
        <svg viewBox="0 0 1440 160" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '110px', pointerEvents: 'none', opacity: 0.12, zIndex: 0 }}>
          <path d="M0 160 L0 120 L140 75 L280 115 L420 55 L560 100 L700 35 L840 90 L980 45 L1120 95 L1260 50 L1440 105 L1440 160 Z" fill="#6860B8" />
        </svg>

        <div className="tb-container" style={{ position: 'relative', zIndex: 5 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 0.95fr) minmax(0, 1.05fr)',
            alignItems: 'center',
            gap: '30px',
          }} className="hero-grid">
            <style>{`
              @media (max-width: 992px) {
                .hero-grid { grid-template-columns: 1fr !important; gap: 2rem !important; text-align: center; }
                .hero-left-content { margin: 0 auto; display: flex; flex-direction: column; align-items: center; }
                .hero-search-form { width: 100% !important; flex-direction: column !important; border-radius: 1.25rem !important; padding: 1rem !important; }
                .hero-visual { transform: scale(0.85); transform-origin: top center; min-height: 520px !important; margin-bottom: -50px; }
              }
              @media (max-width: 640px) {
                .hero-visual { transform: scale(0.68); transform-origin: top center; min-height: 440px !important; margin-bottom: -110px; }
              }
              @media (max-width: 420px) {
                .hero-visual { transform: scale(0.58); transform-origin: top center; min-height: 380px !important; margin-bottom: -140px; }
              }
            `}</style>

            {/* HERO LEFT SIDE */}
            <div className="hero-left-content" style={{ zIndex: 10 }}>
              
              {/* Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: '#EAE8FF',
                border: '1px solid rgba(143,136,221,0.35)',
                borderRadius: '9999px',
                padding: '0.45rem 1.2rem',
                marginBottom: '1.5rem',
              }}>
                <Sparkles size={16} color="#6860B8" />
                <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#6860B8' }}>
                  AI-Powered Travel Companion Platform
                </span>
              </div>

              {/* Main Heading */}
              <h1 style={{
                fontSize: 'clamp(2.6rem, 4.8vw, 4.4rem)',
                fontWeight: 900,
                color: '#202024',
                lineHeight: 1.04,
                letterSpacing: '-0.02em',
                marginBottom: '1.25rem',
                maxWidth: '700px',
              }}>
                Don’t Travel<br />
                Alone.<br />
                Travel With The<br />
                <span style={{
                  background: 'linear-gradient(135deg, #6860B8 0%, #E979AA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Right Buddy.
                </span>
              </h1>

              {/* Description */}
              <p style={{
                fontSize: '1.05rem',
                color: '#5F6275',
                lineHeight: 1.65,
                marginBottom: '2rem',
                maxWidth: '560px',
              }}>
                Find compatible travel companions based on your destination, dates, budget, interests and travel style. Powered by AI for safer, smarter and more meaningful journeys.
              </p>

              {/* Hero Search Bar */}
              <form onSubmit={handleSearchSubmit} className="hero-search-form" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: '#FFFFFF',
                padding: '0.5rem 0.625rem 0.5rem 1.25rem',
                borderRadius: '9999px',
                boxShadow: '0 12px 36px rgba(104, 96, 184, 0.14)',
                border: '1.5px solid rgba(143, 136, 221, 0.25)',
                marginBottom: '1.75rem',
                maxWidth: '580px',
                width: '100%',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
                  <Search size={18} color="#6860B8" />
                  <input
                    type="text"
                    placeholder="Where to? (e.g. Goa, Manali)"
                    value={searchDestination}
                    onChange={(e) => setSearchDestination(e.target.value)}
                    style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontSize: '0.875rem', fontWeight: 500 }}
                  />
                </div>
                <div style={{ width: 1, height: 24, background: '#EAE8FF' }} className="hidden sm:block" />
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }} className="hidden sm:flex">
                  <Calendar size={18} color="#6860B8" />
                  <input
                    type="text"
                    placeholder="Travel Dates"
                    value={searchDates}
                    onChange={(e) => setSearchDates(e.target.value)}
                    style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontSize: '0.875rem', fontWeight: 500 }}
                  />
                </div>
                <button type="submit" className="btn-primary" style={{ padding: '0.65rem 1.35rem', borderRadius: '9999px', background: 'linear-gradient(135deg, #E979AA, #6860B8)', border: 'none', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Search size={16} />
                  <span>Find Buddy</span>
                </button>
              </form>

              {/* Action Buttons & Badges */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                <button onClick={handleDemo} disabled={demoLoading} className="btn-secondary" style={{ padding: '0.65rem 1.5rem', borderRadius: '9999px', fontSize: '0.875rem' }}>
                  {demoLoading ? 'Launching Demo…' : '🎮 Explore Interactive Demo'}
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <ShieldCheck size={18} color="#22C55E" />
                  <span style={{ fontSize: '0.84rem', color: '#5F6275', fontWeight: 600 }}>94% Verified Trust Index</span>
                </div>
              </div>

              {/* STATS STRIP (Matching Screenshot 1:1) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#EDE9FF', color: '#6860B8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Users size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: '0.95rem', color: '#202024', lineHeight: 1.1 }}>1,200+</div>
                    <div style={{ fontSize: '0.72rem', color: '#5F6275', fontWeight: 600 }}>Happy Travellers</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#EDE9FF', color: '#6860B8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Plane size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: '0.95rem', color: '#202024', lineHeight: 1.1 }}>50+</div>
                    <div style={{ fontSize: '0.72rem', color: '#5F6275', fontWeight: 600 }}>Amazing Destinations</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#EDE9FF', color: '#6860B8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: '0.95rem', color: '#202024', lineHeight: 1.1 }}>94%</div>
                    <div style={{ fontSize: '0.72rem', color: '#5F6275', fontWeight: 600 }}>Verified Profiles</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#EDE9FF', color: '#6860B8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Heart size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: '0.95rem', color: '#202024', lineHeight: 1.1 }}>4.8/5</div>
                    <div style={{ fontSize: '0.72rem', color: '#5F6275', fontWeight: 600 }}>User Rating</div>
                  </div>
                </div>
              </div>

            </div>

            {/* HERO RIGHT VISUAL CONTAINER (1:1 EXACT MATCH OF UPLOADED REFERENCE IMAGE) */}
            <div style={{ position: 'relative', width: '100%', minHeight: '640px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="hero-visual">
              
              {/* SVG Organic Silhouette Definition - Exact Bezier Curve Matching Reference Image */}
              <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none', width: 0, height: 0 }}>
                <defs>
                  <clipPath id="heroOrganicSilhouette" clipPathUnits="objectBoundingBox">
                    <path d="M 0.12,0.22 C 0.25,0.05 0.48,0.15 0.72,0.04 C 0.88,0.10 0.98,0.28 0.94,0.56 C 0.90,0.80 0.72,0.92 0.50,0.90 C 0.28,0.88 0.12,0.96 0.04,0.78 C -0.03,0.58 0.02,0.38 0.12,0.22 Z" />
                  </clipPath>
                </defs>
              </svg>

              {/* Layer 1: Soft Pastel Lavender Ambient Glow */}
              <div style={{
                position: 'absolute',
                width: '560px',
                height: '560px',
                background: 'radial-gradient(circle, rgba(234, 232, 255, 0.95) 0%, rgba(243, 169, 199, 0.45) 65%, transparent 100%)',
                borderRadius: '50%',
                filter: 'blur(35px)',
                zIndex: 0,
                pointerEvents: 'none',
              }} />

              {/* Top Community Pill: "1,200+ travellers found their buddy! >" */}
              <div style={{
                position: 'absolute',
                top: '-5px',
                left: '270px',
                transform: 'translateX(-50%)',
                background: '#FFFFFF',
                borderRadius: '9999px',
                padding: '0.5rem 1.25rem',
                boxShadow: '0 8px 24px rgba(104, 96, 184, 0.12)',
                zIndex: 25,
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                whiteSpace: 'nowrap',
              }}>
                <div style={{ display: 'flex' }}>
                  {['u1','u3','u5'].map((seed, idx) => (
                    <img key={seed} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`} alt="" style={{ width: 28, height: 28, borderRadius: '50%', border: '2px solid #FFFFFF', marginLeft: idx ? -8 : 0, background: '#EAE8FF' }} />
                  ))}
                </div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#202024' }}>
                  <span style={{ fontWeight: 800 }}>1,200+ travellers</span> found their buddy!
                </div>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#EAE8FF', color: '#6860B8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 800 }}>
                  ›
                </div>
              </div>

              {/* Curved Dotted Flight Route Graphic */}
              <svg style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, pointerEvents: 'none', zIndex: 1 }}>
                <path d="M 160 175 Q 260 120 530 215" stroke="#B8B0ED" strokeWidth="2.5" strokeDasharray="6,6" fill="none" opacity="0.75" />
              </svg>

              {/* Black Airplane Icon on Dotted Flight Path */}
              <div style={{
                position: 'absolute',
                top: '128px',
                left: '255px',
                transform: 'rotate(18deg)',
                color: '#171827',
                zIndex: 15,
                fontSize: '1.25rem',
              }}>
                ✈️
              </div>

              {/* Layer 2: CENTRAL ORGANIC SILHOUETTE TWO-TRAVELER VISUAL */}
              <div style={{
                position: 'relative',
                width: 'min(530px, 90vw)',
                height: '510px',
                zIndex: 2,
                filter: 'drop-shadow(0 20px 40px rgba(104, 96, 184, 0.22))',
              }}>
                {/* Soft Glowing Background Shadow Mask */}
                <div style={{
                  position: 'absolute',
                  inset: '-8px',
                  background: 'linear-gradient(135deg, #8F88DD, #F3A9C7, #6860B8)',
                  WebkitClipPath: 'url(#heroOrganicSilhouette)',
                  clipPath: 'url(#heroOrganicSilhouette)',
                  filter: 'blur(10px)',
                  opacity: 0.85,
                  zIndex: 0,
                }} />

                {/* Main Photo Container with Organic Silhouette Mask */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  WebkitClipPath: 'url(#heroOrganicSilhouette)',
                  clipPath: 'url(#heroOrganicSilhouette)',
                  background: '#FFFFFF',
                  zIndex: 1,
                }}>
                  {/* Photo of Two Travelers (Male in cap & Female in travel hat pointing) facing sunset viewpoint */}
                  <img
                    src="/hero-travelers.png"
                    alt="Two travelers looking at scenic mountain sunset viewpoint"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      display: 'block',
                    }}
                  />
                </div>

                {/* White Contour Outline Overlay */}
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 4 }}>
                  <path
                    d="M 12,22 C 25,5 48,15 72,4 C 88,10 98,28 94,56 C 90,80 72,92 50,90 C 28,88 12,96 4,78 C -3,58 2,38 12,22 Z"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="3"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>

              {/* Pink Location Pin Accent on Flight Path near Manali Card */}
              <div style={{
                position: 'absolute',
                top: '210px',
                right: '160px',
                zIndex: 22,
                background: '#FF3B82',
                width: '20px',
                height: '20px',
                borderRadius: '50% 50% 50% 0',
                transform: 'rotate(-45deg)',
                boxShadow: '0 4px 14px rgba(255, 59, 130, 0.45)',
              }} />

              {/* 1. ROHAN, 25 CARD (Upper-Left as in Reference Image) */}
              <div style={{
                position: 'absolute',
                top: '15px',
                left: '-40px',
                width: '280px',
                padding: '1.25rem',
                zIndex: 20,
                boxShadow: '0 16px 40px rgba(104, 96, 184, 0.16)',
                borderRadius: '1.5rem',
                background: '#FFFFFF',
                transform: 'rotate(-3deg)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ position: 'relative' }}>
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" alt="Rohan Profile" style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover' }} />
                      <span style={{ position: 'absolute', bottom: 2, right: 2, width: 10, height: 10, borderRadius: '50%', background: '#22C55E', border: '2px solid white' }} />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.65rem', background: '#DCFCE7', color: '#166534', padding: '0.15rem 0.5rem', borderRadius: '9999px', fontWeight: 700 }}>● Online</span>
                    </div>
                  </div>
                  <button style={{ border: '1px solid #FFE4E6', background: '#FFF1F2', width: 34, height: 34, borderRadius: '50%', color: '#E11D48', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <Heart size={16} fill="#E11D48" color="#E11D48" />
                  </button>
                </div>

                <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#202024', marginBottom: '0.15rem' }}>Rohan, 25</div>
                <div style={{ fontSize: '0.78rem', color: '#6860B8', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.75rem' }}>
                  <MapPin size={13} color="#6860B8" /> Mumbai
                </div>

                {/* Interest Tags */}
                <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.85rem' }}>
                  {['Trekking', 'Photography', 'Food'].map((tag) => (
                    <span key={tag} style={{ background: '#F5F3FF', color: '#6860B8', fontSize: '0.7rem', fontWeight: 700, padding: '0.25rem 0.6rem', borderRadius: '9999px' }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Match Score & Progress Bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8125rem', fontWeight: 800, color: '#202024', marginBottom: '0.35rem' }}>
                  <span>96% Match</span>
                </div>
                <div style={{ width: '100%', height: '7px', background: '#F3E8FF', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: '96%', height: '100%', background: 'linear-gradient(90deg, #E979AA, #625BB7)', borderRadius: '9999px' }} />
                </div>
              </div>

              {/* 2. AISHA, 23 CARD (Lower-Right as in Reference Image) */}
              <div style={{
                position: 'absolute',
                bottom: '75px',
                right: '-50px',
                width: '275px',
                padding: '1.15rem 1.2rem',
                zIndex: 20,
                boxShadow: '0 16px 40px rgba(104, 96, 184, 0.16)',
                borderRadius: '1.5rem',
                background: '#FFFFFF',
                transform: 'rotate(3deg)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ position: 'relative' }}>
                      <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80" alt="Aisha Profile" style={{ width: 46, height: 46, borderRadius: '50%', objectFit: 'cover' }} />
                      <span style={{ position: 'absolute', bottom: 2, right: 2, width: 10, height: 10, borderRadius: '50%', background: '#22C55E', border: '2px solid white' }} />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.65rem', background: '#DCFCE7', color: '#166534', padding: '0.15rem 0.5rem', borderRadius: '9999px', fontWeight: 700 }}>● Online</span>
                    </div>
                  </div>
                  <button style={{ border: '1px solid #FFE4E6', background: '#FFF1F2', width: 32, height: 32, borderRadius: '50%', color: '#E11D48', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <Heart size={16} color="#E11D48" />
                  </button>
                </div>

                <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#202024', marginBottom: '0.15rem' }}>Aisha, 23</div>
                <div style={{ fontSize: '0.78rem', color: '#6860B8', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.65rem' }}>
                  <MapPin size={13} color="#6860B8" /> Pune
                </div>

                {/* Interest Tags */}
                <div style={{ display: 'flex', gap: '0.35rem', marginBottom: '0.75rem' }}>
                  {['Beaches', 'Culture', 'Nightlife'].map((tag) => (
                    <span key={tag} style={{ background: '#F5F3FF', color: '#6860B8', fontSize: '0.68rem', fontWeight: 700, padding: '0.2rem 0.55rem', borderRadius: '9999px' }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Match Bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8125rem', fontWeight: 800, color: '#202024', marginBottom: '0.35rem' }}>
                  <span>92% Match</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: '#F3E8FF', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: '92%', height: '100%', background: 'linear-gradient(90deg, #625BB7, #E979AA)', borderRadius: '9999px' }} />
                </div>
              </div>

              {/* 3. TRUST SCORE CARD (Upper-Right) */}
              <div style={{
                position: 'absolute',
                top: '25px',
                right: '-30px',
                background: '#FFFFFF',
                borderRadius: '1.25rem',
                padding: '0.75rem 1.25rem',
                boxShadow: '0 12px 32px rgba(0,0,0,0.1)',
                zIndex: 20,
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}>
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldCheck size={22} color="#166534" />
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#5F6275', fontWeight: 600 }}>Trust Score</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#202024' }}>94/100</div>
                  <div style={{ fontSize: '0.68rem', color: '#166534', fontWeight: 700 }}>✓ Verified</div>
                </div>
              </div>

              {/* 4. DESTINATION CARD — MANALI (Upper-Right Tilted Card) */}
              <div style={{
                position: 'absolute',
                top: '185px',
                right: '-60px',
                width: '165px',
                background: '#FFFFFF',
                padding: '0.4rem',
                borderRadius: '1.25rem',
                boxShadow: '0 16px 36px rgba(0,0,0,0.14)',
                transform: 'rotate(7deg)',
                zIndex: 18,
              }}>
                <img
                  src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=400&q=80"
                  alt="Manali Mountains"
                  style={{ width: '100%', height: '110px', objectFit: 'cover', borderRadius: '0.95rem' }}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.4rem 0.4rem 0.2rem', fontSize: '0.85rem', fontWeight: 800, color: '#202024' }}>
                  <MapPin size={14} color="#625BB7" /> Manali
                </div>
              </div>

              {/* 5. DESTINATION CARD — GOA (Lower-Left Tilted Card) */}
              <div style={{
                position: 'absolute',
                bottom: '105px',
                left: '-65px',
                width: '175px',
                background: '#FFFFFF',
                padding: '0.4rem',
                borderRadius: '1.25rem',
                boxShadow: '0 16px 36px rgba(0,0,0,0.14)',
                transform: 'rotate(-8deg)',
                zIndex: 18,
              }}>
                <img
                  src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=400&q=80"
                  alt="Goa Beach"
                  style={{ width: '100%', height: '115px', objectFit: 'cover', borderRadius: '0.95rem' }}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.4rem 0.4rem 0.2rem', fontSize: '0.85rem', fontWeight: 800, color: '#202024' }}>
                  <MapPin size={14} color="#625BB7" /> Goa
                </div>
              </div>

              {/* 6. PLAN TOGETHER TRAVEL TOGETHER CARD (Bottom Center Pill) */}
              <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '48%',
                transform: 'translateX(-50%)',
                background: '#FFFFFF',
                borderRadius: '9999px',
                padding: '0.55rem 1.25rem',
                boxShadow: '0 12px 32px rgba(104, 96, 184, 0.18)',
                zIndex: 25,
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                whiteSpace: 'nowrap',
              }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="" style={{ width: 28, height: 28, borderRadius: '50%', border: '2px solid white' }} />
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="" style={{ width: 28, height: 28, borderRadius: '50%', border: '2px solid white', marginLeft: -8 }} />
                  <span style={{ width: 28, height: 28, borderRadius: '50%', background: '#EDE9FF', color: '#625BB7', fontSize: '0.72rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: -8, border: '2px solid white' }}>+3</span>
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#202024' }}>
                  Plan Together <span style={{ color: '#625BB7', fontWeight: 600 }}>Travel Together</span>
                </div>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#EDE9FF', color: '#625BB7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 800 }}>
                  ›
                </div>
              </div>

              {/* 7. DARK COMMUNITY CARD (Lower-Left Pill as in Reference Image) */}
              <div style={{
                position: 'absolute',
                bottom: '-18px',
                left: '-15px',
                background: '#171827',
                color: 'white',
                borderRadius: '9999px',
                padding: '0.55rem 1.1rem',
                boxShadow: '0 12px 32px rgba(0,0,0,0.3)',
                zIndex: 26,
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                whiteSpace: 'nowrap',
              }}>
                <div style={{ display: 'flex' }}>
                  {['u1','u3','u5'].map((seed, idx) => (
                    <img key={seed} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`} alt="" style={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid #171827', marginLeft: idx ? -7 : 0, background: '#EDE9FF' }} />
                  ))}
                </div>
                <div style={{ fontSize: '0.78rem', fontWeight: 600 }}>
                  <span style={{ fontWeight: 800, color: '#F29BC2' }}>1,200+ travellers</span> found buddies!
                </div>
              </div>

              {/* 8. HANDWRITTEN HERO ANNOTATION (Bottom-Right) */}
              <div style={{
                position: 'absolute',
                bottom: '-45px',
                right: '-35px',
                fontFamily: "'Caveat', cursive, sans-serif",
                fontSize: '1.45rem',
                fontWeight: 700,
                color: '#625BB7',
                lineHeight: 1.15,
                transform: 'rotate(-6deg)',
                pointerEvents: 'none',
                textAlign: 'right',
                zIndex: 25,
              }}>
                Good People<br />
                <span style={{ color: '#E979AA' }}>Great Journeys ♡</span>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* WHY TRAVEL BUDDY SECTION */}
      <section style={{ padding: '5rem 0', background: '#FFFFFF' }}>
        <div className="tb-container">
          
          <div style={{ textAlign: 'center', marginBottom: '3.5rem', maxWidth: '800px', marginInline: 'auto' }}>
            <p className="section-label">WHY TRAVEL BUDDY</p>
            <h2 style={{
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              fontWeight: 800,
              color: '#202024',
              marginTop: '0.5rem',
              lineHeight: 1.15,
              whiteSpace: 'normal',
            }}>
              More Than Just a Travel App
            </h2>
            <p style={{ color: '#5F6275', marginTop: '0.875rem', fontSize: '1.0625rem', lineHeight: 1.6 }}>
              Find compatible travel companions, plan intelligent itineraries with AI, and manage group expenses effortlessly in one unified platform.
            </p>
          </div>

          {/* 5-COLUMN FEATURE GRID */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
          }}>
            {FEATURES.map(f => (
              <div key={f.title} className="card" style={{
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '260px',
              }}>
                <div>
                  <div style={{ width: 50, height: 50, borderRadius: '1rem', background: f.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                    <f.icon size={26} color={f.color} />
                  </div>
                  <span style={{ background: f.color + '20', color: f.color, borderRadius: '9999px', padding: '0.25rem 0.75rem', fontSize: '0.75rem', fontWeight: 700 }}>
                    {f.tag}
                  </span>
                  <h3 style={{ fontWeight: 700, color: '#202024', margin: '1rem 0 0.5rem', fontSize: '1.125rem' }}>{f.title}</h3>
                  <p style={{ color: '#5F6275', fontSize: '0.875rem', lineHeight: 1.65 }}>{f.desc}</p>
                </div>
              </div>
            ))}

            {/* 5TH CARD: CTA CARD */}
            <div className="card" style={{
              background: 'linear-gradient(135deg, #8F88DD, #6860B8)',
              color: 'white',
              padding: '1.75rem',
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between',
              minHeight: '260px',
            }}>
              <div>
                <div style={{ width: 50, height: 50, borderRadius: '1rem', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <Sparkles size={26} color="white" />
                </div>
                <h3 style={{ fontWeight: 800, color: 'white', fontSize: '1.125rem', marginBottom: '0.5rem' }}>Ready to Start?</h3>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.875rem', lineHeight: 1.65 }}>
                  Join thousands of smart travellers meeting ideal partners daily.
                </p>
              </div>
              <Link to="/register" style={{
                background: '#FFFFFF',
                color: '#6860B8',
                fontWeight: 700,
                padding: '0.625rem 1.25rem',
                borderRadius: '9999px',
                textDecoration: 'none',
                textAlign: 'center',
                fontSize: '0.875rem',
                marginTop: '1rem',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.375rem',
              }}>
                Get Started <ArrowRight size={16} />
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* NEW SECTION: "TRAVEL BUDDY IN YOUR POCKET" MOBILE EXPERIENCE */}
      <MobileExperienceSection />

      {/* SMARTMATCH SECTION ("INTELLIGENT COMPATIBILITY") */}
      <section style={{ padding: '5.5rem 0', background: '#F8F7FF' }}>
        <div className="tb-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="smartmatch-grid">
            <style>{`@media(max-width: 992px){ .smartmatch-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; } }`}</style>
            
            {/* LEFT CONTENT */}
            <div>
              <p className="section-label">INTELLIGENT COMPATIBILITY</p>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#202024', marginTop: '0.5rem', lineHeight: 1.15 }}>
                How SmartMatch AI Evaluates Compatibility
              </h2>
              <p style={{ color: '#5F6275', marginTop: '1rem', fontSize: '1.0625rem', lineHeight: 1.65 }}>
                Our proprietary AI evaluates personality profiles, travel pace, budget parameters, and safety requirements to match you with companions who complement your journey.
              </p>

              <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { title: 'Budget & Accommodation Alignment', desc: 'Ensures matching spending expectations for stays & dining.' },
                  { title: 'Pace & Travel Style Balance', desc: 'Aligns fast-paced sightseeing vs. relaxed leisure preferences.' },
                  { title: 'Interests & Activity Overlap', desc: 'Identifies shared passions like photography, hiking, or food.' },
                  { title: 'Safety & Verification Verification', desc: 'Prioritizes verified profiles with high TrustGuard ratings.' },
                ].map(item => (
                  <div key={item.title} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
                    <div style={{ padding: '0.25rem', background: '#DCFCE7', borderRadius: '50%', color: '#166534', marginTop: '0.2rem' }}>
                      <CheckCircle size={18} />
                    </div>
                    <div>
                      <h4 style={{ fontWeight: 700, color: '#202024', fontSize: '1rem' }}>{item.title}</h4>
                      <p style={{ fontSize: '0.875rem', color: '#5F6275', marginTop: '0.125rem' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: COMPATIBILITY CARD DEMO */}
            <div className="card" style={{ padding: '2rem', background: '#FFFFFF', borderRadius: '1.75rem', boxShadow: '0 12px 40px rgba(104, 96, 184, 0.15)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #EAE8FF' }}>
                <div>
                  <h3 style={{ fontWeight: 800, fontSize: '1.25rem', color: '#202024' }}>Rohan & You</h3>
                  <p style={{ fontSize: '0.8125rem', color: '#6860B8', fontWeight: 600 }}>Trip to Goa • 12–16 Dec</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#6860B8' }}>96%</div>
                  <div style={{ fontSize: '0.7rem', color: '#E890B5', fontWeight: 800 }}>OVERALL MATCH</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                {[
                  { label: 'Budget & Accommodation Match', pct: 98 },
                  { label: 'Travel Pace & Style', pct: 94 },
                  { label: 'Activity & Interest Overlap', pct: 95 },
                  { label: 'Food Preference Compatibility', pct: 92 },
                ].map(dim => (
                  <div key={dim.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: 600, color: '#202024', marginBottom: '0.35rem' }}>
                      <span>{dim.label}</span>
                      <span style={{ color: '#6860B8', fontWeight: 700 }}>{dim.pct}%</span>
                    </div>
                    <div className="progress-bar" style={{ height: 10 }}>
                      <div className="progress-fill" style={{ width: `${dim.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid #EAE8FF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8125rem', color: '#5F6275', fontWeight: 500 }}>High Compatibility Recommended</span>
                <Link to="/register" className="btn-primary" style={{ textDecoration: 'none', padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}>
                  Connect Now
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* HOW TRAVEL BUDDY WORKS SECTION */}
      <section id="how-it-works" style={{ padding: '5.5rem 0', background: '#FFFFFF' }}>
        <div className="tb-container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem', maxWidth: '700px', marginInline: 'auto' }}>
            <p className="section-label">THE JOURNEY</p>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#202024', marginTop: '0.5rem' }}>
              How Travel Buddy Works
            </h2>
            <p style={{ color: '#5F6275', marginTop: '0.75rem', fontSize: '1.0625rem' }}>
              From planning to travelling — we've got every step covered.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
          }}>
            {STEPS.map((step, i) => (
              <div key={step.title} style={{ textAlign: 'center', padding: '1.75rem 1.25rem' }} className="card">
                <div style={{
                  width: 60,
                  height: 60,
                  borderRadius: '1.25rem',
                  background: i % 2 === 0 ? 'linear-gradient(135deg, #8F88DD, #6860B8)' : 'linear-gradient(135deg, #F3A9C7, #E890B5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem',
                  boxShadow: '0 8px 20px rgba(104, 96, 184, 0.25)',
                }}>
                  <step.icon size={28} color="white" />
                </div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#E890B5', letterSpacing: '0.08em', marginBottom: '0.35rem' }}>
                  STEP 0{i + 1}
                </div>
                <h3 style={{ fontWeight: 700, color: '#202024', marginBottom: '0.5rem', fontSize: '1.0625rem' }}>{step.title}</h3>
                <p style={{ color: '#5F6275', fontSize: '0.875rem', lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRAVEL DNA PREVIEW */}
      <section style={{ padding: '5.5rem 0', background: '#F8F7FF' }}>
        <div className="tb-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="dna-grid">
            <style>{`@media(max-width: 992px){ .dna-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; } }`}</style>
            
            <div>
              <p className="section-label">UNIQUE TO YOU</p>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#202024', margin: '0.5rem 0 1rem' }}>
                Discover Your Travel DNA
              </h2>
              <p style={{ color: '#5F6275', lineHeight: 1.7, marginBottom: '1.75rem', fontSize: '1.0625rem' }}>
                Your unique travel personality profile — built from your preferences — helps our AI find companions who truly complement your travel style and pace.
              </p>
              <Link to="/register" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', padding: '0.875rem 2rem' }}>
                Create Your Profile <ArrowRight size={18} />
              </Link>
            </div>

            <div className="card" style={{ padding: '2rem', background: '#FFFFFF', borderRadius: '1.75rem' }}>
              <h4 style={{ fontWeight: 800, color: '#202024', marginBottom: '1.5rem', fontSize: '1.125rem' }}>🧬 Your Travel DNA Breakdown</h4>
              {[
                { label: '🏔 Adventure', pct: 82 },
                { label: '🌊 Relaxation', pct: 64 },
                { label: '🍜 Food Explorer', pct: 91 },
                { label: '📸 Photography', pct: 76 },
                { label: '🎉 Social & Nightlife', pct: 70 },
                { label: '💰 Budget Conscious', pct: 85 },
              ].map(item => (
                <div key={item.label} style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#202024' }}>{item.label}</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#6860B8' }}>{item.pct}%</span>
                  </div>
                  <div className="progress-bar" style={{ height: 8 }}><div className="progress-fill" style={{ width: `${item.pct}%` }} /></div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ padding: '5rem 0', background: 'linear-gradient(135deg, #8F88DD, #6860B8)' }}>
        <div className="tb-container" style={{ textAlign: 'center' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: 'white', marginBottom: '1rem', lineHeight: 1.15 }}>
              Ready to Find Your Travel Buddy?
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.125rem', marginBottom: '2.25rem', lineHeight: 1.6 }}>
              Join thousands of travellers who found their perfect companion through AI-powered matching.
            </p>
            <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/register" style={{
                background: '#FFFFFF',
                color: '#6860B8',
                fontWeight: 800,
                padding: '0.875rem 2.25rem',
                borderRadius: '9999px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                fontSize: '1rem',
              }}>
                Get Started Free <ArrowRight size={20} />
              </Link>
              <button onClick={handleDemo} style={{
                background: 'rgba(255,255,255,0.15)',
                color: 'white',
                fontWeight: 700,
                padding: '0.875rem 2.25rem',
                borderRadius: '9999px',
                border: '2px solid rgba(255,255,255,0.5)',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
                fontSize: '1rem',
              }}>
                Try Demo Mode
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#202024', padding: '4rem 0 2.5rem', color: 'rgba(255,255,255,0.7)' }}>
        <div className="tb-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>
            <div>
              <div style={{ marginBottom: '1rem' }}>
                <Logo size="medium" showTagline={true} lightMode={true} />
              </div>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.65)' }}>
                Meet. Match. Travel. Smart companion matching, trusted connections, and AI-powered trip planning.
              </p>
            </div>
            {[
              { title: 'Product', links: ['About Us', 'How It Works', 'Trust & Safety', 'Pricing'] },
              { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'] },
              { title: 'Support', links: ['Contact Support', 'Help Center', 'Community Guidelines'] },
            ].map(col => (
              <div key={col.title}>
                <h4 style={{ color: 'white', fontWeight: 700, marginBottom: '1rem', fontSize: '1rem' }}>{col.title}</h4>
                {col.links.map(link => (
                  <div key={link} style={{ marginBottom: '0.625rem' }}>
                    <Link to="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.875rem' }}
                      onMouseEnter={e => e.target.style.color = '#FFFFFF'}
                      onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
                    >{link}</Link>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.75rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ fontSize: '0.8125rem' }}>© 2026 Travel Buddy. All rights reserved.</p>
            <p style={{ fontSize: '0.8125rem' }}>Meet. Match. Travel. Safe Companion AI Platform.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
