import React from 'react';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import TopBar from './TopBar';

export default function AppLayout({ children, title, subtitle }) {
  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #EEF2FF 0%, #F5ECFE 40%, #FFEBF1 75%, #FFF0F5 100%)',
      position: 'relative'
    }}>
      {/* Sidebar — Fixed viewport-height navigation rail */}
      <div style={{ display: 'none', width: 240, height: '100vh', flexShrink: 0, zIndex: 100 }} className="sidebar-wrapper">
        <Sidebar />
      </div>
      <style>{`
        @media(min-width:769px){
          .sidebar-wrapper { display: block !important; }
        }
      `}</style>

      {/* Main content — Independently scrollable right section */}
      <main style={{
        flex: 1,
        minWidth: 0,
        height: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 10
      }} className="main-content-scroll">
        {/* Top bar (mobile + desktop) */}
        <TopBar title={title} subtitle={subtitle} />

        <div style={{ flex: 1, padding: '1.5rem', paddingBottom: '5rem' }} className="main-content">
          <style>{`@media(min-width:769px){.main-content{padding-bottom:1.5rem!important;}}`}</style>
          {children}
        </div>
      </main>

      {/* Mobile bottom navigation */}
      <MobileNav />
    </div>
  );
}

