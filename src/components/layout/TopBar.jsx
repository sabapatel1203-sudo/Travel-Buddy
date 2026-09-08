import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, MessageCircle, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Logo from '../common/Logo';

export default function TopBar({ title, subtitle }) {
  const { state } = useApp();
  const navigate = useNavigate();
  const unreadNotifs = state.notifications?.filter(n => !n.read).length || 0;
  const unreadMessages = state.conversations?.reduce((acc, c) => {
    if (!c.participants.includes(state.currentUser?.id)) return acc;
    return acc + c.messages.filter(m => !m.read && m.senderId !== state.currentUser?.id).length;
  }, 0) || 0;

  return (
    <header className="top-bar-header" style={{
      background: 'rgba(255, 255, 255, 0.75)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      padding: '0.875rem 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1rem',
      position: 'sticky',
      top: 0,
      zIndex: 40,
      borderBottom: '1px solid rgba(143,136,221,0.15)',
    }}>
      <style>{`
        @media (max-width: 768px) {
          .top-bar-header { padding: 0.625rem 1rem !important; }
          .top-bar-search { display: none !important; }
        }
      `}</style>

      {/* Mobile logo */}
      <div className="mobile-logo" style={{ display: 'none' }}>
        <style>{`@media(max-width:768px){.mobile-logo{display:flex!important;align-items:center;gap:0.5rem;}}`}</style>
        <Logo size="small" showTagline={false} to="/dashboard" />
      </div>

      {/* Page title — desktop */}
      <div className="page-title" style={{ flex: '0 1 auto' }}>
        <style>{`@media(max-width:768px){.page-title{display:none!important;}}`}</style>
        <h1 style={{ fontWeight: 800, fontSize: '1.35rem', color: '#1E1B4B', margin: 0, letterSpacing: '-0.01em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          {title || `Welcome back, ${state.currentUser?.name?.split(' ')[0] || 'Traveler'}`} 👋
        </h1>
        <p style={{ fontSize: '0.85rem', color: '#7C3AED', margin: 0, marginTop: 2, fontWeight: 600, fontFamily: 'serif', fontStyle: 'italic', letterSpacing: '0.01em' }}>
          {subtitle || '"Same Routes. New Friends. Better Stories."'}
        </p>
      </div>

      {/* Search Input Bar Pill — center */}
      <div className="top-bar-search" style={{ flex: '0 1 420px', display: 'flex', alignItems: 'center', position: 'relative' }}>
        <Search size={16} color="#8B5CF6" style={{ position: 'absolute', left: '1.1rem', pointerEvents: 'none' }} />
        <input
          type="text"
          placeholder="Search destinations, people or vibes..."
          style={{
            width: '100%',
            height: '40px',
            paddingLeft: '2.75rem',
            paddingRight: '1rem',
            borderRadius: '9999px',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(12px)',
            fontSize: '0.85rem',
            color: '#1E1B4B',
            outline: 'none',
            boxShadow: '0 2px 10px rgba(139, 92, 246, 0.06)',
            transition: 'all 0.2s'
          }}
          onFocus={e => e.target.style.borderColor = '#8B5CF6'}
          onBlur={e => e.target.style.borderColor = 'rgba(139, 92, 246, 0.2)'}
        />
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
        <button onClick={() => navigate('/messages')} aria-label="Messages" style={{ position: 'relative', background: 'white', border: '1px solid rgba(143,136,221,0.25)', cursor: 'pointer', width: 38, height: 38, borderRadius: '50%', color: '#6860B8', boxShadow: '0 2px 8px rgba(104,96,184,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <MessageCircle size={18} />
          {unreadMessages > 0 && (
            <span style={{ position: 'absolute', top: -2, right: -2, background: '#EC4899', color: 'white', borderRadius: '9999px', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 800 }}>
              {unreadMessages}
            </span>
          )}
        </button>
        <button onClick={() => navigate('/notifications')} aria-label="Notifications" style={{ position: 'relative', background: 'white', border: '1px solid rgba(143,136,221,0.25)', cursor: 'pointer', width: 38, height: 38, borderRadius: '50%', color: '#6860B8', boxShadow: '0 2px 8px rgba(104,96,184,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Bell size={18} />
          {unreadNotifs > 0 && (
            <span style={{ position: 'absolute', top: -2, right: -2, background: '#EC4899', color: 'white', borderRadius: '9999px', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 800 }}>
              {unreadNotifs}
            </span>
          )}
        </button>
        <Link to={`/profile/${state.currentUser?.id || 'demo'}`} style={{ textDecoration: 'none', display: 'inline-flex' }}>
          <img src={state.currentUser?.avatar} alt="" style={{ width: 38, height: 38, borderRadius: '50%', background: '#EAE8FF', cursor: 'pointer', border: '2px solid #8F88DD', boxShadow: '0 2px 8px rgba(143,136,221,0.2)', objectFit: 'cover' }} />
        </Link>
      </div>
    </header>
  );
}

