import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Users, Sparkles, MessageCircle, Shield, MapPin, Calendar, Train, Bus,
  Plane, Car, Bike, Backpack, Compass, ArrowRight, ChevronDown, ChevronUp,
  UserCheck, ShieldCheck, Zap, Heart, CheckCircle2, MessageSquare, AlertTriangle
} from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import CompatibilityScore from '../components/ui/CompatibilityScore';
import { useApp } from '../context/AppContext';
import { DEMO_USERS } from '../data/demoData';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { state, actions } = useApp();
  const user = state.currentUser;

  // State for search form
  const [destination, setDestination] = useState('Manali');
  const [dates, setDates] = useState('Dec 12 – Dec 16');
  const [selectedMode, setSelectedMode] = useState('Train');
  const [activePeopleFilter, setActivePeopleFilter] = useState('All');

  // Expanded "Why this match?" cards tracker
  const [expandedMatchId, setExpandedMatchId] = useState(null);

  // Connection request feedback tracker
  const [connectedUsers, setConnectedUsers] = useState({});

  const handleConnect = (userId, name) => {
    setConnectedUsers(prev => ({ ...prev, [userId]: true }));
    actions.showToast(`Connection request sent to ${name}! 🎉`, 'success');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/discover?destination=${encodeURIComponent(destination)}&mode=${encodeURIComponent(selectedMode)}`);
  };

  // Demo Buddies Going Your Way
  const companionMatches = [
    {
      id: 'm1',
      userId: 'u1',
      name: 'Rohan Sharma',
      age: 25,
      location: 'Mumbai',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      destination: 'Goa',
      dates: 'Dec 12–16',
      mode: 'Train',
      budget: '₹8k–12k',
      matchScore: 96,
      verified: true,
      interests: ['Trekking', 'Photography', 'Food'],
      breakdown: { Destination: '100%', Dates: '100%', TravelPace: '94%', Interests: '92%', Budget: '90%', TravelMode: '95%' }
    },
    {
      id: 'm2',
      userId: 'u2',
      name: 'Aisha Verma',
      age: 23,
      location: 'Pune',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
      destination: 'Goa',
      dates: 'Dec 12–16',
      mode: 'Flight',
      budget: '₹12k–15k',
      matchScore: 92,
      verified: true,
      interests: ['Culture', 'Beaches', 'Nightlife'],
      breakdown: { Destination: '100%', Dates: '100%', TravelPace: '90%', Interests: '95%', Budget: '88%', TravelMode: '85%' }
    },
    {
      id: 'm3',
      userId: 'u3',
      name: 'Rahul Mehta',
      age: 27,
      location: 'Delhi',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      destination: 'Goa',
      dates: 'Dec 12–16',
      mode: 'Train',
      budget: '₹10k–14k',
      matchScore: 88,
      verified: true,
      interests: ['Road Trips', 'Music', 'Camping'],
      breakdown: { Destination: '100%', Dates: '100%', TravelPace: '88%', Interests: '87%', Budget: '92%', TravelMode: '96%' }
    }
  ];

  const filteredMatches = activePeopleFilter === 'All'
    ? companionMatches
    : companionMatches.filter(m => m.mode.toLowerCase().includes(activePeopleFilter.toLowerCase()) || activePeopleFilter === 'Solo');

  return (
    <AppLayout>
      <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.75rem', position: 'relative' }}>

        {/* ========================================================
            LEFT GUTTER FLOATING SIDE PANEL (FILLS LEFT BLANK SPACE)
        ======================================================== */}
        <div
          className="left-gutter-panel"
          style={{
            position: 'absolute',
            left: '-215px',
            top: '20px',
            width: '190px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            pointerEvents: 'none',
            zIndex: 1,
            userSelect: 'none'
          }}
        >
          <style>{`@media(max-width:1580px){.left-gutter-panel{display:none!important;}}`}</style>

          {/* Airmail Stamp */}
          <div style={{
            background: '#FFFFFF',
            border: '2px dashed #EC4899',
            borderRadius: '0.85rem',
            padding: '0.6rem 0.85rem',
            transform: 'rotate(-5deg)',
            boxShadow: '0 8px 22px rgba(236,72,153,0.15)',
            width: 'fit-content'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.68rem', fontWeight: 900, color: '#4F46E5', letterSpacing: '0.08em' }}>
              ✈️ PAR AVION
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#BE123C', fontFamily: "'Caveat', cursive, serif", marginTop: '0.1rem' }}>
              Travel Buddy Pass
            </div>
            <div style={{ fontSize: '0.62rem', color: '#94A3B8', fontWeight: 700, marginTop: '0.15rem' }}>
              POSTMARK • 12 DEC 2026
            </div>
          </div>

          {/* Mini Polaroid Card */}
          <div style={{
            background: '#FFFFFF',
            padding: '0.5rem 0.5rem 0.65rem 0.5rem',
            borderRadius: '0.85rem',
            boxShadow: '0 12px 30px rgba(99, 102, 241, 0.18)',
            transform: 'rotate(4deg)',
            width: '155px',
            border: '1.5px solid #EEF2FF',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '-8px',
              left: '50%',
              transform: 'translateX(-50%) rotate(-2deg)',
              width: '45px',
              height: '14px',
              background: 'rgba(244, 114, 182, 0.45)',
              backdropFilter: 'blur(4px)',
              borderRadius: '2px'
            }} />
            <div style={{
              height: '90px',
              borderRadius: '0.5rem',
              backgroundImage: 'url(/hero_banner_photo.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.2)'
            }} />
            <div style={{ marginTop: '0.35rem', textAlign: 'center', fontFamily: "'Caveat', cursive, serif" }}>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1E1B4B', lineHeight: 1 }}>
                Wanderlust 💕
              </div>
              <div style={{ fontSize: '0.65rem', fontFamily: 'sans-serif', color: '#64748B', fontWeight: 700, marginTop: '0.1rem' }}>
                Himalayas • Road Trip
              </div>
            </div>
          </div>

          {/* Route Badge */}
          <div style={{
            background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)',
            border: '1px solid #C7D2FE',
            borderRadius: '9999px',
            padding: '0.35rem 0.85rem',
            fontSize: '0.72rem',
            fontWeight: 800,
            color: '#4338CA',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.12)',
            transform: 'rotate(-2deg)',
            width: 'fit-content'
          }}>
            📍 Mumbai ➔ Goa
          </div>

          {/* Mountain & Pine Forest Landscape Artwork */}
          <div style={{ position: 'relative', width: '100%', minHeight: '230px', marginTop: '1rem' }}>
            <div style={{
              position: 'relative',
              zIndex: 3,
              transform: 'rotate(-4deg)',
              fontFamily: "'Caveat', cursive, serif",
              lineHeight: 1.1,
              userSelect: 'none',
              marginBottom: '0.5rem'
            }}>
              <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#1E1B4B', letterSpacing: '-0.01em' }}>
                Good
              </div>
              <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#312E81', paddingLeft: '0.9rem' }}>
                People
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#4C1D95', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <span>Great Journeys.</span>
                <span style={{ color: '#F43F5E', fontSize: '1.35rem', filter: 'drop-shadow(0 2px 6px rgba(244,63,94,0.4))' }}>♥</span>
              </div>
            </div>

            <svg
              viewBox="0 0 190 190"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: '100%', height: '150px', opacity: 0.95 }}
            >
              <defs>
                <linearGradient id="lgPanelSky" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#F3E8FF" stopOpacity="0" />
                  <stop offset="100%" stopColor="#DDD6FE" stopOpacity="0.75" />
                </linearGradient>
                <linearGradient id="lgPanelMtn1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C084FC" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#818CF8" stopOpacity="0.7" />
                </linearGradient>
                <linearGradient id="lgPanelMtn2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#A855F7" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity="0.85" />
                </linearGradient>
                <linearGradient id="lgPanelMtn3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6D28D9" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#3730A3" stopOpacity="0.98" />
                </linearGradient>
              </defs>

              <rect width="190" height="190" fill="url(#lgPanelSky)" />
              <path d="M-10 190 L40 85 L105 190 Z" fill="url(#lgPanelMtn1)" />
              <path d="M50 190 L125 65 L190 190 Z" fill="url(#lgPanelMtn1)" />
              <path d="M0 190 L75 100 L145 190 Z" fill="url(#lgPanelMtn2)" />
              <path d="M75 190 L140 85 L200 190 Z" fill="url(#lgPanelMtn3)" />

              <polygon points="4,190 11,150 18,190" fill="#1E1B4B" opacity="0.9" />
              <polygon points="14,190 20,158 26,190" fill="#1E1B4B" opacity="0.95" />
              <polygon points="22,190 30,142 38,190" fill="#1E1B4B" opacity="0.9" />
              <polygon points="70,190 78,140 86,190" fill="#1E1B4B" opacity="0.9" />
              <polygon points="82,190 89,152 96,190" fill="#1E1B4B" opacity="0.95" />
              <polygon points="92,190 100,132 108,190" fill="#1E1B4B" opacity="0.9" />
              <polygon points="135,190 143,138 151,190" fill="#1E1B4B" opacity="0.95" />
              <polygon points="147,190 154,150 161,190" fill="#1E1B4B" opacity="0.9" />
              <polygon points="157,190 166,128 175,190" fill="#1E1B4B" opacity="0.95" />
            </svg>
          </div>
        </div>

        {/* ========================================================
            RIGHT GUTTER FLOATING SIDE PANEL (FILLS RIGHT BLANK SPACE)
        ======================================================== */}
        <div
          className="right-gutter-panel"
          style={{
            position: 'absolute',
            right: '-215px',
            top: '20px',
            width: '190px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            pointerEvents: 'none',
            zIndex: 1,
            userSelect: 'none'
          }}
        >
          <style>{`@media(max-width:1580px){.right-gutter-panel{display:none!important;}}`}</style>

          {/* Direction Signpost */}
          <div style={{ position: 'relative', width: '100%' }}>
            <div style={{
              position: 'absolute',
              left: '50%',
              top: '-10px',
              transform: 'translateX(-50%)',
              width: '8px',
              height: '160px',
              background: 'linear-gradient(180deg, #DDD6FE 0%, #A78BFA 60%, #7C3AED 100%)',
              borderRadius: '9999px',
              boxShadow: '2px 4px 10px rgba(124, 58, 237, 0.15)',
              zIndex: 1
            }} />

            <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingTop: '0.5rem' }}>
              <div style={{
                transform: 'rotate(-4deg) translateX(4px)',
                background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
                color: '#FFFFFF',
                padding: '0.35rem 0.8rem 0.35rem 1rem',
                borderRadius: '0.4rem 1rem 1rem 0.4rem',
                fontWeight: 800,
                fontSize: '0.72rem',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                boxShadow: '0 4px 10px rgba(79, 70, 229, 0.28)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}>
                <span>📍</span> New Places
              </div>

              <div style={{
                transform: 'rotate(3deg) translateX(-8px)',
                background: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
                color: '#FFFFFF',
                padding: '0.35rem 1rem 0.35rem 0.8rem',
                borderRadius: '1rem 0.4rem 0.4rem 1rem',
                fontWeight: 800,
                fontSize: '0.72rem',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                boxShadow: '0 4px 10px rgba(236, 72, 153, 0.28)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}>
                <span>Same Vibes</span> <span>✨</span>
              </div>

              <div style={{
                transform: 'rotate(-2deg) translateX(4px)',
                background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                color: '#FFFFFF',
                padding: '0.35rem 0.8rem 0.35rem 1rem',
                borderRadius: '0.4rem 1rem 1rem 0.4rem',
                fontWeight: 800,
                fontSize: '0.72rem',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                boxShadow: '0 4px 10px rgba(139, 92, 246, 0.28)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}>
                <span>👥</span> Better People
              </div>
            </div>
          </div>

          {/* Travel More Worry Less Card */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '2px dashed rgba(236, 72, 153, 0.35)',
            borderRadius: '1.1rem',
            padding: '0.65rem 0.9rem',
            transform: 'rotate(4deg)',
            boxShadow: '0 8px 24px rgba(139, 92, 246, 0.1)',
            textAlign: 'center',
            fontFamily: "'Caveat', cursive, serif",
            width: 'fit-content',
            alignSelf: 'center'
          }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#4F46E5', lineHeight: 1 }}>
              Travel
            </div>
            <div style={{ fontSize: '1.55rem', fontWeight: 800, color: '#EC4899', lineHeight: 1.05 }}>
              More
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#7C3AED', lineHeight: 1 }}>
              Worry
            </div>
            <div style={{ fontSize: '1.55rem', fontWeight: 800, color: '#E11D48', lineHeight: 1.05 }}>
              Less ♥
            </div>
          </div>
        </div>


        {/* ========================================================
            1. HERO SEARCH / COMPANION FINDER BANNER (PERFECT MOCKUP ALIGNMENT)
        ======================================================== */}
        <div style={{
          borderRadius: '1.75rem',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '400px',
          boxShadow: '0 20px 45px rgba(13, 16, 39, 0.35)',
          background: '#0D1027'
        }}>
          {/* Sunset Background Photo */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/hero_banner_photo.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center right',
            zIndex: 1
          }} />

          {/* Dark Navy Fading Overlay Gradient from left to right */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, rgba(13, 16, 39, 0.96) 0%, rgba(13, 16, 39, 0.90) 42%, rgba(13, 16, 39, 0.45) 68%, rgba(13, 16, 39, 0.05) 100%)',
            zIndex: 2
          }} />

          {/* Main Hero Content Container */}
          <div style={{
            position: 'relative',
            zIndex: 3,
            padding: '2.5rem 3rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '400px'
          }}>

            <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
              
              {/* TOP PORTION: Header & Text */}
              <div style={{ maxWidth: '540px' }}>
                {/* Companion Search Tag & Social Proof Pill */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#EC4899', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    <Sparkles size={15} color="#EC4899" /> COMPANION SEARCH
                  </div>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.14)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '9999px',
                    padding: '0.25rem 0.75rem',
                    color: '#E2E8F0',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}>
                    👥 1,200+ travellers found their buddy!
                  </div>
                </div>

                {/* Main Heading */}
                <h1 style={{ fontSize: '2.85rem', fontWeight: 900, color: '#FFFFFF', margin: 0, marginBottom: '0.65rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                  Find someone <br />
                  going <span style={{
                    background: 'linear-gradient(135deg, #EC4899 0%, #D946EF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 2px 10px rgba(236,72,153,0.5))'
                  }}>your way.</span>
                </h1>

                {/* Subtitle */}
                <p style={{ color: '#CBD5E1', fontSize: '0.925rem', marginBottom: '2rem', maxWidth: '480px', lineHeight: 1.5, fontWeight: 500 }}>
                  Match with compatible travel partners for your next train, bus, flight, or solo adventure.
                </p>
              </div>

              {/* MIDDLE PORTION: Input Fields Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', maxWidth: '620px', marginBottom: '1.5rem' }}>
                
                {/* Where input pill */}
                <div>
                  <label style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94A3B8', display: 'block', marginBottom: '0.4rem' }}>WHERE ARE YOU GOING?</label>
                  <div style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    background: 'rgba(165, 180, 215, 0.35)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    borderRadius: '1rem',
                    padding: '0.25rem 0.5rem',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                  }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '0.5rem', flexShrink: 0, boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
                      <MapPin size={16} color="#6366F1" />
                    </div>
                    <input
                      type="text"
                      value={destination}
                      onChange={e => setDestination(e.target.value)}
                      placeholder="Manali"
                      style={{ width: '100%', background: 'transparent', border: 'none', color: '#0F172A', fontSize: '0.95rem', fontWeight: 800, outline: 'none' }}
                    />
                  </div>
                </div>

                {/* When input pill */}
                <div>
                  <label style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94A3B8', display: 'block', marginBottom: '0.4rem' }}>WHEN?</label>
                  <div style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    background: 'rgba(165, 180, 215, 0.35)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    borderRadius: '1rem',
                    padding: '0.25rem 0.5rem',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                  }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '0.5rem', flexShrink: 0, boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
                      <Calendar size={16} color="#6366F1" />
                    </div>
                    <input
                      type="text"
                      value={dates}
                      onChange={e => setDates(e.target.value)}
                      placeholder="Dec 12 – Dec 16"
                      style={{ width: '100%', background: 'transparent', border: 'none', color: '#0F172A', fontSize: '0.95rem', fontWeight: 800, outline: 'none' }}
                    />
                  </div>
                </div>

              </div>

              {/* BOTTOM PORTION: Travel Mode Row + CTA Button */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                
                {/* Travel Mode Pills */}
                <div>
                  <label style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94A3B8', display: 'block', marginBottom: '0.45rem' }}>TRAVEL MODE</label>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {[
                      { id: 'Train', label: '🚆 Train' },
                      { id: 'Flight', label: '✈️ Flight' },
                      { id: 'Bus', label: '🚌 Bus' },
                      { id: 'Road Trip', label: '🚗 Road Trip' },
                      { id: 'Bike', label: '🏍️ Bike' },
                      { id: 'Solo Travel', label: '🎒 Solo Travel' },
                    ].map(mode => {
                      const isActive = selectedMode === mode.id;
                      return (
                        <button
                          key={mode.id}
                          type="button"
                          onClick={() => setSelectedMode(mode.id)}
                          style={{
                            padding: '0.5rem 1.1rem',
                            borderRadius: '9999px',
                            border: isActive ? 'none' : '1px solid rgba(255,255,255,0.15)',
                            background: isActive ? '#EC4899' : 'rgba(22, 28, 65, 0.65)',
                            color: 'white',
                            fontSize: '0.825rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            boxShadow: isActive ? '0 4px 14px rgba(236, 72, 153, 0.5)' : 'none',
                            transition: 'all 0.2s',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem'
                          }}
                        >
                          {mode.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Primary CTA Button on lower right */}
                <div>
                  <button
                    type="submit"
                    style={{
                      background: 'linear-gradient(135deg, #FF2E93 0%, #A855F7 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '9999px',
                      padding: '0.85rem 2.25rem',
                      fontSize: '1rem',
                      fontWeight: 900,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.625rem',
                      boxShadow: '0 8px 25px rgba(255, 46, 147, 0.5)',
                      transition: 'all 0.2s',
                      letterSpacing: '0.01em'
                    }}
                  >
                    Find My Buddy <ArrowRight size={18} />
                  </button>
                </div>

              </div>

            </form>

            {/* Decorative Sky Calligraphy Text */}
            <div style={{
              position: 'absolute',
              top: '2rem',
              left: '57%',
              transform: 'translateX(-50%) rotate(-3deg)',
              fontFamily: 'serif',
              fontStyle: 'italic',
              fontSize: '1.4rem',
              fontWeight: 800,
              color: '#FFFFFF',
              textShadow: '0 2px 12px rgba(0,0,0,0.6)',
              pointerEvents: 'none',
              zIndex: 3
            }} className="sky-calligraphy">
              <style>{`@media(max-width:1050px){.sky-calligraphy{display:none!important;}}`}</style>
              Collect Moments <br />
              Not Things 💕
            </div>

            {/* Floating Polaroid Card Overlay shifted to Top Right Corner in Curved Rotation */}
            <div style={{
              position: 'absolute',
              top: '1.75rem',
              right: '2.5rem',
              background: '#FFFFFF',
              padding: '0.6rem 0.6rem 0.85rem 0.6rem',
              borderRadius: '0.875rem',
              boxShadow: '0 18px 40px rgba(0,0,0,0.45)',
              transform: 'rotate(8deg)',
              width: 175,
              pointerEvents: 'auto',
              zIndex: 4,
              border: '2px solid rgba(255,255,255,0.9)'
            }} className="polaroid-overlay">
              <style>{`@media(max-width:1100px){.polaroid-overlay{display:none!important;}}`}</style>
              <img src="/manali_polaroid.png" alt="Manali" style={{ width: '100%', height: 125, objectFit: 'cover', borderRadius: '0.4rem' }} />
              <div style={{ marginTop: '0.45rem', textAlign: 'center' }}>
                <div style={{ fontWeight: 900, fontSize: '0.95rem', color: '#0F172A', letterSpacing: '-0.01em' }}>Manali</div>
                <div style={{ fontSize: '0.78rem', color: '#EC4899', fontWeight: 800, marginTop: '0.1rem' }}>Here we go! 💕</div>
              </div>
            </div>

          </div>

        </div>

        {/* ========================================================
            2. 4 STAT CARDS ROW
        ======================================================== */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
          
          {/* Card 1: Potential Buddies */}
          <Link to="/discover" style={{ textDecoration: 'none' }}>
            <div className="card" style={{ padding: '1.35rem 1.5rem', background: '#FFFFFF', borderRadius: '1.25rem', border: '1px solid rgba(143,136,221,0.14)', boxShadow: '0 8px 24px rgba(104, 96, 184, 0.05)', display: 'flex', flexDirection: 'column', gap: '0.6rem', height: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ width: 44, height: 44, borderRadius: '0.875rem', background: '#E0F2FE', color: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Users size={22} />
                </div>
                <span style={{ fontSize: '2.1rem', fontWeight: 900, color: '#0F172A' }}>24</span>
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0F172A' }}>Potential Buddies</div>
                <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '0.15rem', fontWeight: 500 }}>People matching your travel preferences</div>
              </div>
              {/* Avatar Stack */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
                <div style={{ display: 'flex' }}>
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" alt="" style={{ width: 26, height: 26, borderRadius: '50%', border: '2px solid white', objectFit: 'cover' }} />
                  <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80" alt="" style={{ width: 26, height: 26, borderRadius: '50%', border: '2px solid white', marginLeft: -8, objectFit: 'cover' }} />
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80" alt="" style={{ width: 26, height: 26, borderRadius: '50%', border: '2px solid white', marginLeft: -8, objectFit: 'cover' }} />
                </div>
                <span style={{ background: '#EEF2FF', color: '#4F46E5', borderRadius: '9999px', padding: '0.15rem 0.5rem', fontSize: '0.72rem', fontWeight: 800 }}>+20</span>
              </div>
            </div>
          </Link>

          {/* Card 2: High Compatibility */}
          <Link to="/matches" style={{ textDecoration: 'none' }}>
            <div className="card" style={{ padding: '1.35rem 1.5rem', background: '#FFFFFF', borderRadius: '1.25rem', border: '1px solid rgba(143,136,221,0.14)', boxShadow: '0 8px 24px rgba(104, 96, 184, 0.05)', display: 'flex', flexDirection: 'column', gap: '0.6rem', height: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ width: 44, height: 44, borderRadius: '0.875rem', background: '#FCE7F3', color: '#EC4899', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Heart size={22} />
                </div>
                <span style={{ fontSize: '2.1rem', fontWeight: 900, color: '#EC4899' }}>8</span>
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0F172A' }}>High Compatibility</div>
                <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '0.15rem', fontWeight: 500 }}>Strong mindset & travel-style matches</div>
              </div>
              {/* Avatar Stack */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
                <div style={{ display: 'flex' }}>
                  <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80" alt="" style={{ width: 26, height: 26, borderRadius: '50%', border: '2px solid white', objectFit: 'cover' }} />
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" alt="" style={{ width: 26, height: 26, borderRadius: '50%', border: '2px solid white', marginLeft: -8, objectFit: 'cover' }} />
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80" alt="" style={{ width: 26, height: 26, borderRadius: '50%', border: '2px solid white', marginLeft: -8, objectFit: 'cover' }} />
                </div>
                <span style={{ background: '#FCE7F3', color: '#DB2777', borderRadius: '9999px', padding: '0.15rem 0.5rem', fontSize: '0.72rem', fontWeight: 800 }}>+5</span>
              </div>
            </div>
          </Link>

          {/* Card 3: Unread Conversations */}
          <Link to="/messages" style={{ textDecoration: 'none' }}>
            <div className="card" style={{ padding: '1.35rem 1.5rem', background: '#FFFFFF', borderRadius: '1.25rem', border: '1px solid rgba(143,136,221,0.14)', boxShadow: '0 8px 24px rgba(104, 96, 184, 0.05)', display: 'flex', flexDirection: 'column', gap: '0.6rem', height: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ width: 44, height: 44, borderRadius: '0.875rem', background: '#F3E8FF', color: '#A855F7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MessageCircle size={22} />
                </div>
                <span style={{ fontSize: '2.1rem', fontWeight: 900, color: '#A855F7' }}>5</span>
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0F172A' }}>Unread Conversations</div>
                <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '0.15rem', fontWeight: 500 }}>People waiting to connect</div>
              </div>
              {/* Avatar Stack */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
                <div style={{ display: 'flex' }}>
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80" alt="" style={{ width: 26, height: 26, borderRadius: '50%', border: '2px solid white', objectFit: 'cover' }} />
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" alt="" style={{ width: 26, height: 26, borderRadius: '50%', border: '2px solid white', marginLeft: -8, objectFit: 'cover' }} />
                  <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80" alt="" style={{ width: 26, height: 26, borderRadius: '50%', border: '2px solid white', marginLeft: -8, objectFit: 'cover' }} />
                </div>
                <span style={{ background: '#F3E8FF', color: '#9333EA', borderRadius: '9999px', padding: '0.15rem 0.5rem', fontSize: '0.72rem', fontWeight: 800 }}>+3</span>
              </div>
            </div>
          </Link>

          {/* Card 4: Trust Score */}
          <Link to="/safety" style={{ textDecoration: 'none' }}>
            <div className="card" style={{ padding: '1.35rem 1.5rem', background: '#FFFFFF', borderRadius: '1.25rem', border: '1px solid rgba(143,136,221,0.14)', boxShadow: '0 8px 24px rgba(104, 96, 184, 0.05)', display: 'flex', flexDirection: 'column', gap: '0.6rem', height: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ width: 44, height: 44, borderRadius: '0.875rem', background: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldCheck size={22} />
                </div>
                <span style={{ fontSize: '1.9rem', fontWeight: 900, color: '#16A34A' }}>88<span style={{ fontSize: '0.95rem', color: '#64748B', fontWeight: 600 }}>/100</span></span>
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0F172A' }}>Trust Score</div>
                <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '0.15rem', fontWeight: 500 }}>Your verified travel reputation</div>
              </div>
              {/* Progress Bar & Subtitle */}
              <div style={{ marginTop: '0.2rem' }}>
                <div style={{ width: '100%', height: 6, background: '#E2E8F0', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: '88%', height: '100%', background: '#22C55E', borderRadius: '9999px' }} />
                </div>
                <div style={{ fontSize: '0.68rem', color: '#64748B', marginTop: '0.3rem', fontWeight: 600 }}>
                  Keep going! You're awesome! ✨
                </div>
              </div>
            </div>
          </Link>

        </div>

        {/* ========================================================
            3. QUICK JOURNEY TYPES ("Looking for a travel buddy?")
        ======================================================== */}
        <div className="card" style={{ padding: '1.5rem', background: '#FFFFFF', borderRadius: '1.25rem', border: '1px solid rgba(143,136,221,0.14)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>
              Looking for a travel buddy?
            </h3>
            <Link to="/discover" style={{ color: '#8B5CF6', fontWeight: 800, fontSize: '0.85rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              See all <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.875rem' }}>
            {[
              { title: 'Train Journey', desc: 'Find someone on your route', link: '/discover?mode=Train', img: 'https://images.unsplash.com/photo-1543832923-44667a44c804?auto=format&fit=crop&w=300&q=80' },
              { title: 'Bus Journey', desc: 'Make long rides less boring', link: '/discover?mode=Bus', img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=300&q=80' },
              { title: 'Flight Buddy', desc: 'Meet someone flying your way', link: '/discover?mode=Flight', img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80' },
              { title: 'Road Trip', desc: 'Share the road & experience', link: '/discover?mode=RoadTrip', img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=300&q=80' },
              { title: 'Bike Journey', desc: 'Ride with someone compatible', link: '/discover?mode=Bike', img: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=300&q=80' },
              { title: 'Solo Trip', desc: 'Find a compatible companion', link: '/discover?mode=Solo', img: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=300&q=80' },
              { title: 'Adventure', desc: 'Find people who match your vibe', link: '/discover?mode=Adventure', img: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=300&q=80' },
            ].map((j, idx) => (
              <Link key={idx} to={j.link} style={{ textDecoration: 'none' }}>
                <div style={{
                  borderRadius: '1rem',
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  overflow: 'hidden',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#8B5CF6'; e.currentTarget.style.boxShadow = '0 6px 18px rgba(139,92,246,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div style={{ height: 75, overflow: 'hidden' }}>
                    <img src={j.img} alt={j.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '0.75rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0F172A', marginBottom: '0.15rem' }}>{j.title}</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 500, lineHeight: 1.25 }}>{j.desc}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ========================================================
            4. MAIN SECTION — PEOPLE GOING YOUR WAY
        ======================================================== */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0F172A', margin: 0, letterSpacing: '-0.01em' }}>
                People Going Your Way
              </h2>
              <p style={{ fontSize: '0.825rem', color: '#64748B', fontWeight: 500, margin: '0.2rem 0 0 0' }}>
                Travelers whose destination, dates and travel style match yours.
              </p>
            </div>

            {/* Filter Tabs + View All */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ display: 'flex', gap: '0.35rem', background: '#F1F5F9', padding: '0.25rem', borderRadius: '9999px' }}>
                {['All', 'Train', 'Flight', 'Road Trip', 'Solo'].map(tab => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActivePeopleFilter(tab)}
                    style={{
                      padding: '0.35rem 0.85rem',
                      borderRadius: '9999px',
                      border: 'none',
                      background: activePeopleFilter === tab ? '#EC4899' : 'transparent',
                      color: activePeopleFilter === tab ? 'white' : '#64748B',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <Link to="/matches" style={{ color: '#8B5CF6', fontWeight: 800, fontSize: '0.85rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                View All <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '1.25rem' }}>
            {filteredMatches.map(m => {
              const isExpanded = expandedMatchId === m.id;
              const isConnected = connectedUsers[m.userId];
              return (
                <div key={m.id} className="card" style={{ padding: '1.35rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid #E2E8F0', background: '#FFFFFF', borderRadius: '1.25rem' }}>
                  
                  <div>
                    {/* Top User Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
                        <div style={{ position: 'relative' }}>
                          <img src={m.avatar} alt={m.name} style={{ width: 54, height: 54, borderRadius: '50%', objectFit: 'cover', border: '2px solid #8B5CF6' }} />
                          {m.verified && (
                            <div style={{ position: 'absolute', bottom: -2, right: -2, background: '#0284C7', color: 'white', width: 18, height: 18, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', border: '1.5px solid white' }}>✓</div>
                          )}
                        </div>
                        <div>
                          <div style={{ fontWeight: 900, fontSize: '1.05rem', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            {m.name}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>{m.age} • {m.location}</div>
                        </div>
                      </div>

                      {/* Match Badge Pill */}
                      <div style={{ background: '#DCFCE7', color: '#15803D', borderRadius: '9999px', padding: '0.3rem 0.75rem', textAlign: 'center', border: '1px solid #86EFAC' }}>
                        <div style={{ fontWeight: 900, fontSize: '0.825rem' }}>{m.matchScore}% Match</div>
                      </div>
                    </div>

                    {/* Journey Specs Grid */}
                    <div style={{ background: '#F8FAFC', borderRadius: '0.875rem', padding: '0.75rem 1rem', marginBottom: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.78rem' }}>
                      <div><strong style={{ color: '#64748B' }}>📍 Destination:</strong> <span style={{ color: '#0F172A', fontWeight: 700 }}>{m.destination}</span></div>
                      <div><strong style={{ color: '#64748B' }}>📅 Dates:</strong> <span style={{ color: '#0F172A', fontWeight: 700 }}>{m.dates}</span></div>
                      <div><strong style={{ color: '#64748B' }}>🚆 Mode:</strong> <span style={{ color: '#0F172A', fontWeight: 700 }}>{m.mode}</span></div>
                      <div><strong style={{ color: '#64748B' }}>💰 Budget:</strong> <span style={{ color: '#0F172A', fontWeight: 700 }}>{m.budget}</span></div>
                    </div>

                    {/* Interests Tags */}
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                      {m.interests.map((tag, idx) => (
                        <span key={idx} style={{ background: '#F1F0FE', color: '#7C3AED', borderRadius: '9999px', padding: '0.2rem 0.65rem', fontSize: '0.72rem', fontWeight: 700 }}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Buttons */}
                  <div style={{ display: 'flex', gap: '0.625rem', marginTop: '0.5rem' }}>
                    <Link to={`/profile/${m.userId}`} style={{ flex: 1, textDecoration: 'none' }}>
                      <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center', padding: '0.55rem', fontSize: '0.825rem', fontWeight: 700, borderRadius: '0.75rem' }}>
                        View Profile
                      </button>
                    </Link>

                    <button
                      type="button"
                      disabled={isConnected}
                      onClick={() => handleConnect(m.userId, m.name)}
                      style={{
                        flex: 1,
                        background: isConnected ? '#22C55E' : 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.75rem',
                        padding: '0.55rem',
                        fontSize: '0.825rem',
                        fontWeight: 800,
                        cursor: isConnected ? 'default' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.35rem'
                      }}
                    >
                      {isConnected ? <>Connected <CheckCircle2 size={14} /></> : <>Connect <Sparkles size={14} /></>}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </AppLayout>
  );
}

