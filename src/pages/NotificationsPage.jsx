import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, CheckCircle, MessageCircle, Brain, MapPin, DollarSign, Users } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import { useApp } from '../context/AppContext';

const ICON_MAP = {
  match: Brain,
  message: MessageCircle,
  trip: MapPin,
  expense: DollarSign,
  group: Users,
  system: Bell,
};

const COLOR_MAP = {
  match: '#8F88DD',
  message: '#F3A9C7',
  trip: '#6860B8',
  expense: '#4ADE80',
  group: '#F59E0B',
  system: '#9CA3AF',
};

export default function NotificationsPage() {
  const { state, actions } = useApp();
  const unreadCount = state.notifications.filter(n => !n.read).length;

  return (
    <AppLayout title="Notifications" subtitle={`${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>

        {unreadCount > 0 && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
            <button onClick={() => actions.markAllNotificationsRead()} className="btn-ghost" style={{ fontSize: '0.8125rem' }}>
              <CheckCircle size={14} /> Mark all as read
            </button>
          </div>
        )}

        {state.notifications.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#9CA3AF' }}>
            <Bell size={48} style={{ marginBottom: '1rem', opacity: 0.4 }} />
            <p style={{ fontWeight: 600, color: '#202024' }}>You're all caught up!</p>
            <p style={{ fontSize: '0.875rem' }}>No notifications right now.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {state.notifications.map(notif => {
              const Icon = ICON_MAP[notif.type] || Bell;
              const color = COLOR_MAP[notif.type] || '#9CA3AF';
              return (
                <div key={notif.id} onClick={() => actions.markNotificationRead(notif.id)} style={{ display: 'flex', gap: '1rem', padding: '1rem 1.25rem', background: notif.read ? 'white' : '#F3F2FF', borderRadius: '1rem', border: `1px solid ${notif.read ? 'rgba(143,136,221,0.1)' : 'rgba(143,136,221,0.3)'}`, cursor: 'pointer', alignItems: 'flex-start', transition: 'background 0.2s' }}>
                  <div style={{ width: 42, height: 42, borderRadius: '0.875rem', background: color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={20} color={color} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: notif.read ? 500 : 700, color: '#202024', fontSize: '0.9375rem', marginBottom: '0.25rem' }}>{notif.title}</div>
                    <div style={{ fontSize: '0.875rem', color: '#6B7280', lineHeight: 1.5 }}>{notif.message}</div>
                    <div style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '0.375rem' }}>
                      {notif.timestamp ? new Date(notif.timestamp).toLocaleString() : 'Just now'}
                    </div>
                  </div>
                  {!notif.read && (
                    <div style={{ width: 10, height: 10, background: '#F3A9C7', borderRadius: '50%', flexShrink: 0, marginTop: '0.375rem' }} />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
