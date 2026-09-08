import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Users, MessageCircle, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const items = [
  { to: '/dashboard', icon: Home, label: 'Home' },
  { to: '/discover', icon: Compass, label: 'Find Buddy' },
  { to: '/groups', icon: Users, label: 'Groups' },
  { to: '/messages', icon: MessageCircle, label: 'Chat' },
  { to: '/profile/demo', icon: User, label: 'Profile' },
];

export default function MobileNav() {
  const location = useLocation();
  const { state } = useApp();

  return (
    <nav className="bottom-nav">
      {items.map(item => {
        const isActive = location.pathname === item.to || (item.to !== '/dashboard' && location.pathname.startsWith(item.to));
        const to = item.to === '/profile/demo' ? `/profile/${state.currentUser?.id || 'demo'}` : item.to;
        return (
          <Link key={item.to} to={to} className={`bottom-nav-item ${isActive ? 'active' : ''}`}>
            <item.icon size={20} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

