import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Compass, Users, Map, MessageCircle, LayoutDashboard,
  Bell, Bookmark, Settings, Shield, DollarSign, LogOut,
  PlusCircle, ChevronRight, UserCheck, Sparkles
} from 'lucide-react';
import Logo from '../common/Logo';

const mainNavItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
  { to: '/discover', icon: Compass, label: 'Discover Buddies' },
  { to: '/matches', icon: Sparkles, label: 'My Matches' },
  { to: '/messages', icon: MessageCircle, label: 'Messages' },
  { to: '/groups', icon: Users, label: 'Groups' },
];

const secondaryNavItems = [
  { to: '/saved', icon: Bookmark, label: 'Saved' },
  { to: '/safety', icon: Shield, label: 'Safety' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state, actions } = useApp();
  const unreadNotifs = state.notifications.filter(n => !n.read).length;
  const unreadMessages = state.conversations.reduce((acc, c) => {
    if (!c.participants.includes(state.currentUser?.id)) return acc;
    return acc + c.messages.filter(m => !m.read && m.senderId !== state.currentUser?.id).length;
  }, 0);

  return (
    <aside style={{
      width: 240,
      height: '100vh',
      background: 'rgba(255, 255, 255, 0.96)',
      backdropFilter: 'blur(16px)',
      borderRight: '1px solid rgba(234, 232, 255, 0.8)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '1.25rem 1rem 1rem 1rem',
      boxShadow: '4px 0 20px rgba(104, 96, 184, 0.04)',
      overflowY: 'auto',
      boxSizing: 'border-box'
    }}>
      {/* TOP SECTION: Logo + Create Journey CTA + Main & Tools Nav */}
      <div>
        {/* Logo */}
        <div style={{ marginBottom: '1.25rem' }}>
          <Logo size="small" showTagline={true} to="/dashboard" />
        </div>

        {/* Create Journey CTA */}
        <Link to="/create-trip" style={{ textDecoration: 'none', display: 'block', marginBottom: '1rem' }}>
          <button
            style={{
              width: '100%',
              padding: '0.6rem 1rem',
              borderRadius: '9999px',
              border: 'none',
              background: 'linear-gradient(135deg, #FCE7F3 0%, #FBCFE8 100%)',
              color: '#9D174D',
              fontWeight: 800,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.45rem',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(244, 114, 182, 0.25)',
              transition: 'all 0.2s ease-in-out',
            }}
          >
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(157, 23, 77, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PlusCircle size={14} color="#9D174D" />
            </div>
            Create Journey
          </button>
        </Link>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          {mainNavItems.map(item => {
            const isActive = location.pathname === item.to || (item.to !== '/dashboard' && location.pathname.startsWith(item.to));
            return (
              <Link key={item.to + item.label} to={item.to} style={{ textDecoration: 'none' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.55rem 0.85rem',
                  borderRadius: '9999px',
                  background: isActive ? 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)' : 'transparent',
                  color: isActive ? '#FFFFFF' : '#475569',
                  fontWeight: isActive ? 800 : 600,
                  fontSize: '0.85rem',
                  boxShadow: isActive ? '0 4px 14px rgba(79, 70, 229, 0.3)' : 'none',
                  transition: 'all 0.2s'
                }}>
                  <item.icon size={17} color={isActive ? '#FFFFFF' : '#64748B'} />
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {item.label === 'Messages' && (
                    <span style={{ background: isActive ? '#EC4899' : '#EC4899', color: 'white', borderRadius: '9999px', padding: '0.1rem 0.45rem', fontSize: '0.7rem', fontWeight: 800 }}>5</span>
                  )}
                </div>
              </Link>
            );
          })}

          <div style={{ margin: '0.65rem 0 0.35rem 0', height: 1, background: 'rgba(234, 232, 255, 0.8)' }} />

          <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0.15rem 0.75rem', marginBottom: '0.1rem' }}>
            TOOLS & SAFETY
          </div>
          {secondaryNavItems.map(item => {
            const isActive = location.pathname === item.to;
            return (
              <Link key={item.to + item.label} to={item.to} style={{ textDecoration: 'none' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.48rem 0.85rem',
                  borderRadius: '9999px',
                  background: isActive ? 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)' : 'transparent',
                  color: isActive ? '#FFFFFF' : '#475569',
                  fontWeight: isActive ? 800 : 600,
                  fontSize: '0.825rem',
                  transition: 'all 0.2s'
                }}>
                  <item.icon size={17} color={isActive ? '#FFFFFF' : '#64748B'} />
                  <span style={{ flex: 1 }}>{item.label}</span>
                </div>
              </Link>
            );
          })}

          {/* Notifications item */}
          <Link to="/notifications" style={{ textDecoration: 'none' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.48rem 0.85rem',
              borderRadius: '9999px',
              background: location.pathname === '/notifications' ? 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)' : 'transparent',
              color: location.pathname === '/notifications' ? '#FFFFFF' : '#475569',
              fontWeight: location.pathname === '/notifications' ? 800 : 600,
              fontSize: '0.825rem',
              transition: 'all 0.2s'
            }}>
              <Bell size={17} color={location.pathname === '/notifications' ? '#FFFFFF' : '#64748B'} />
              <span style={{ flex: 1 }}>Notifications</span>
              <span style={{ background: '#EC4899', color: 'white', borderRadius: '9999px', padding: '0.1rem 0.45rem', fontSize: '0.7rem', fontWeight: 800 }}>2</span>
            </div>
          </Link>
        </nav>
      </div>

      {/* BOTTOM SECTION: User Profile + Sign Out + Decorative Postcard Artwork */}
      <div style={{ paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', marginTop: 'auto' }}>
        {/* User profile card */}
        <Link to={`/profile/${state.currentUser?.id}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '0.55rem 0.65rem', borderRadius: '0.875rem', background: '#F8FAFC', cursor: 'pointer', border: '1px solid #E2E8F0' }}>
          <img src={state.currentUser?.avatar} alt="" style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover', border: '2px solid #6366F1' }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 800, fontSize: '0.825rem', color: '#0F172A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{state.currentUser?.name || 'Saba Patel'}</div>
            <div style={{ fontSize: '0.7rem', color: '#16A34A', fontWeight: 700 }}>Trust 88/100</div>
          </div>
          <ChevronRight size={14} color="#94A3B8" />
        </Link>
        
        {/* Sign Out button */}
        <button onClick={actions.logout} style={{ background: 'none', border: 'none', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', color: '#94A3B8', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', padding: '0.15rem' }}>
          Sign Out
        </button>

        {/* Decorative Handwritten Postcard Sticker at bottom */}
        <div style={{
          borderRadius: '1.1rem',
          background: 'linear-gradient(180deg, #F5ECFE 0%, #FFEBF1 100%)',
          border: '1.5px dashed rgba(192, 132, 252, 0.4)',
          padding: '0.65rem 0.65rem 0.45rem 0.65rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 6px 18px rgba(124, 58, 237, 0.08)'
        }}>
          {/* Soft SVG Mountain & Pine Forest Background Art */}
          <svg viewBox="0 0 200 65" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50px', opacity: 0.45, pointerEvents: 'none' }}>
            <defs>
              <linearGradient id="sbMtn1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#6366F1" />
              </linearGradient>
              <linearGradient id="sbMtn2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EC4899" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>

            {/* Mountains */}
            <path d="M-10 65 L45 20 L100 65 Z" fill="url(#sbMtn1)" />
            <path d="M60 65 L125 12 L190 65 Z" fill="url(#sbMtn2)" opacity="0.8" />
            <path d="M120 65 L165 30 L215 65 Z" fill="url(#sbMtn1)" opacity="0.6" />

            {/* Pine Trees Silhouettes */}
            <polygon points="20,65 26,45 32,65" fill="#312E81" opacity="0.8" />
            <polygon points="28,65 33,48 38,65" fill="#312E81" opacity="0.9" />
            <polygon points="85,65 91,40 97,65" fill="#312E81" opacity="0.85" />
            <polygon points="140,65 146,46 152,65" fill="#312E81" opacity="0.75" />
          </svg>

          {/* Handwritten Phrase */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{
              fontSize: '1.15rem',
              fontWeight: 800,
              color: '#4C1D95',
              fontFamily: "'Caveat', cursive, serif",
              lineHeight: 1.15,
              letterSpacing: '0.02em'
            }}>
              Good People. <br/>
              <span style={{ color: '#EC4899' }}>Great Journeys. ♥</span>
            </div>
            <div style={{ fontSize: '0.62rem', color: '#6B21A8', fontWeight: 700, marginTop: '0.25rem', display: 'flex', justifyContent: 'center', gap: '0.35rem', letterSpacing: '0.1em' }}>
              ✈️ 📍 🏔️ ✨ 💕
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
