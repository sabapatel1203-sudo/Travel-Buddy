import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Send, MoreVertical, Phone, Video, Shield, Flag, ArrowLeft } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import { useApp } from '../context/AppContext';

export default function MessagesPage() {
  const { state, actions } = useApp();
  const [activeConv, setActiveConv] = useState(null);
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const activeUserId = state.currentUser?.id || 'demo';
  const userConvs = state.conversations.filter(c => c.participants.includes(activeUserId));
  const myConvs = userConvs.length > 0 ? userConvs : state.conversations;

  const targetUserId = location.state?.userId;
  const targetConvId = location.state?.convId;

  useEffect(() => {
    if (targetConvId) {
      setActiveConv(targetConvId);
      actions.readMessages(targetConvId);
      return;
    }
    if (targetUserId) {
      const matchConv = state.conversations.find(c =>
        c.participants.includes(targetUserId) && c.participants.includes(activeUserId)
      );
      if (matchConv) {
        setActiveConv(matchConv.id);
        actions.readMessages(matchConv.id);
        return;
      }
    }
    if (myConvs.length > 0 && !activeConv) {
      setActiveConv(myConvs[0].id);
    }
  }, [targetUserId, targetConvId, myConvs, activeConv]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConv, state.conversations]);

  const currentConv = state.conversations.find(c => c.id === activeConv);

  const getPeerUser = (conv) => {
    if (!conv || !conv.participants || conv.participants.length === 0) return state.users[0];
    if (conv.participants.includes(activeUserId)) {
      const peerId = conv.participants.find(p => p !== activeUserId);
      return state.users.find(u => u.id === peerId) || state.users[0];
    }
    const nonDemoId = conv.participants.find(p => p !== 'demo') || conv.participants[1] || conv.participants[0];
    return state.users.find(u => u.id === nonDemoId) || state.users[0];
  };

  const otherUser = getPeerUser(currentConv);

  const handleSend = async () => {
    if (!text.trim() || !activeConv || !otherUser) return;
    setSending(true);
    actions.readMessages(activeConv);
    await actions.sendMessage(activeConv, otherUser.id, text.trim());
    setText('');
    setSending(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const getUnread = (conv) => conv.messages.filter(m => !m.read && m.senderId !== activeUserId).length;

  return (
    <AppLayout title="Messages">
      <div style={{ maxWidth: 1000, margin: '0 auto', height: 'calc(100vh - 120px)', display: 'flex', gap: '1rem', overflow: 'hidden' }}>

        {/* Conversations list */}
        <div style={{ width: 280, flexShrink: 0, background: 'white', borderRadius: '1.25rem', border: '1px solid rgba(143,136,221,0.15)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }} className="conv-list">
          <style>{`@media(max-width:640px){.conv-list{width:100%!important;display:${activeConv ? 'none' : 'flex'}!important;}}`}</style>
          <div style={{ padding: '1rem 1rem 0.5rem', borderBottom: '1px solid rgba(143,136,221,0.12)' }}>
            <h3 style={{ fontWeight: 700, color: '#202024' }}>Conversations</h3>
          </div>
          <div style={{ overflow: 'auto', flex: 1 }}>
            {myConvs.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#9CA3AF', fontSize: '0.875rem' }}>No conversations yet.</div>
            ) : myConvs.map(conv => {
              const peer = getPeerUser(conv);
              const last = conv.messages[conv.messages.length - 1];
              const unread = getUnread(conv);
              if (!peer) return null;
              return (
                <div key={conv.id} onClick={() => { setActiveConv(conv.id); actions.readMessages(conv.id); }}
                  style={{ padding: '0.875rem 1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', background: activeConv === conv.id ? '#EAE8FF' : 'transparent', borderLeft: activeConv === conv.id ? '3px solid #6860B8' : '3px solid transparent' }}>
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <img src={peer.avatar} alt="" style={{ width: 44, height: 44, borderRadius: '50%', background: '#EAE8FF', border: '2px solid rgba(143,136,221,0.2)' }} />
                    <div style={{ position: 'absolute', bottom: 2, right: 2, width: 10, height: 10, background: '#4ADE80', borderRadius: '50%', border: '2px solid white' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: unread > 0 ? 800 : 700, color: '#202024', fontSize: '0.875rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {peer.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#6860B8', fontWeight: 500, marginBottom: '0.1rem' }}>
                      @{peer.username}
                    </div>
                    <div style={{ fontSize: '0.775rem', color: '#6B7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{last?.text}</div>
                  </div>
                  {unread > 0 && (
                    <span style={{ background: '#EC4899', color: 'white', borderRadius: '9999px', padding: '0.1rem 0.45rem', fontSize: '0.7rem', fontWeight: 800 }}>{unread}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Chat window */}
        {activeConv && otherUser ? (
          <div style={{ flex: 1, background: 'white', borderRadius: '1.25rem', border: '1px solid rgba(143,136,221,0.15)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Chat header */}
            <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid rgba(143,136,221,0.12)', display: 'flex', alignItems: 'center', gap: '0.875rem', position: 'relative' }}>
              <button onClick={() => setActiveConv(null)} className="mobile-back" style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'none' }}>
                <style>{`@media(max-width:640px){.mobile-back{display:block!important;}}`}</style>
                <ArrowLeft size={20} color="#6860B8" />
              </button>
              <img src={otherUser.avatar} alt="" style={{ width: 40, height: 40, borderRadius: '50%', background: '#EAE8FF', border: '2px solid #8F88DD' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: '#202024', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  {otherUser.name}
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6860B8', background: '#EAE8FF', padding: '0.1rem 0.5rem', borderRadius: '9999px' }}>
                    @{otherUser.username}
                  </span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#4ADE80', fontWeight: 500 }}>● Online</div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', position: 'relative' }}>
                <Link to={`/profile/${otherUser.id}`} style={{ background: '#EAE8FF', color: '#6860B8', padding: '0.5rem', borderRadius: '0.75rem', display: 'flex', textDecoration: 'none' }} title="Trust & Verification">
                  <Shield size={16} />
                </Link>
                <button onClick={() => setShowMenu(!showMenu)} style={{ background: '#EAE8FF', color: '#6860B8', padding: '0.5rem', borderRadius: '0.75rem', border: 'none', cursor: 'pointer' }} title="Options">
                  <MoreVertical size={16} />
                </button>

                {showMenu && (
                  <div className="animate-fade-in" style={{ position: 'absolute', top: '100%', right: 0, marginTop: '0.5rem', background: '#FFFFFF', borderRadius: '0.875rem', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', border: '1px solid rgba(143,136,221,0.2)', padding: '0.5rem', minWidth: 160, zIndex: 50 }}>
                    <button onClick={() => { navigate(`/profile/${otherUser.id}`); setShowMenu(false); }} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '0.5rem 0.75rem', fontSize: '0.8125rem', color: '#202024', cursor: 'pointer', borderRadius: '0.5rem', fontWeight: 500 }}>
                      👤 View Profile
                    </button>
                    <button onClick={() => { actions.showToast(`${otherUser.name}'s identity & email are 100% verified! ✓`, 'success'); setShowMenu(false); }} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '0.5rem 0.75rem', fontSize: '0.8125rem', color: '#166534', cursor: 'pointer', borderRadius: '0.5rem', fontWeight: 500 }}>
                      🛡️ Trust Status
                    </button>
                    <button onClick={() => { actions.showToast('Report submitted. Safety team will review.', 'info'); setShowMenu(false); }} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '0.5rem 0.75rem', fontSize: '0.8125rem', color: '#DC2626', cursor: 'pointer', borderRadius: '0.5rem', fontWeight: 500 }}>
                      🚩 Report Profile
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflow: 'auto', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {currentConv?.messages.map(msg => {
                const isMine = msg.senderId === activeUserId || (msg.senderId === 'demo' && otherUser.id !== 'demo');
                const senderUser = state.users.find(u => u.id === msg.senderId);
                return (
                  <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: isMine ? 'flex-end' : 'flex-start' }}>
                    {!isMine && (
                      <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#6860B8', marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <img src={senderUser?.avatar} alt="" style={{ width: 16, height: 16, borderRadius: '50%' }} />
                        {senderUser?.name} <span style={{ color: '#9CA3AF', fontWeight: 400 }}>@{senderUser?.username}</span>
                      </div>
                    )}
                    <div className={isMine ? 'bubble-sent' : 'bubble-received'} style={{ fontFamily: 'Poppins,sans-serif' }}>
                      {msg.text}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#9CA3AF', marginTop: '0.25rem' }}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      {isMine && <span style={{ marginLeft: '0.25rem' }}>{msg.read ? '✓✓' : '✓'}</span>}
                    </div>
                  </div>
                );
              })}
              {sending && (
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <div style={{ background: '#EAE8FF', borderRadius: '1rem', padding: '0.625rem 1rem', fontSize: '0.875rem', color: '#9CA3AF' }}>
                    <span className="animate-pulse-soft">Sending…</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            <div style={{ padding: '0.5rem 1.25rem', display: 'flex', gap: '0.5rem', overflowX: 'auto' }} className="hide-scrollbar">
              {["Let's plan together! 🗺️", "What dates work for you?", "Check out this itinerary 📋"].map(s => (
                <button key={s} onClick={() => setText(s)} style={{ flexShrink: 0, background: '#EAE8FF', color: '#6860B8', borderRadius: '9999px', padding: '0.35rem 0.875rem', border: 'none', cursor: 'pointer', fontSize: '0.8125rem', fontWeight: 500, fontFamily: 'Poppins,sans-serif' }}>{s}</button>
              ))}
            </div>

            {/* Input */}
            <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid rgba(143,136,221,0.12)', display: 'flex', gap: '0.75rem', alignItems: 'flex-end' }}>
              <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message… (Enter to send)"
                rows={1}
                style={{ flex: 1, resize: 'none', border: '1.5px solid rgba(143,136,221,0.3)', borderRadius: '1rem', padding: '0.75rem 1rem', fontFamily: 'Poppins,sans-serif', fontSize: '0.9375rem', outline: 'none', background: '#F8F7FF', color: '#202024', maxHeight: 120, overflowY: 'auto' }}
              />
              <button onClick={handleSend} disabled={!text.trim() || sending} className="btn-primary" style={{ padding: '0.75rem', borderRadius: '1rem', flexShrink: 0, opacity: !text.trim() ? 0.5 : 1 }}>
                <Send size={18} />
              </button>
            </div>
          </div>
        ) : (
          <div style={{ flex: 1, background: 'white', borderRadius: '1.25rem', border: '1px solid rgba(143,136,221,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: '#9CA3AF', gap: '0.75rem' }} className="desktop-placeholder">
            <style>{`@media(max-width:640px){.desktop-placeholder{display:none!important;}}`}</style>
            <Shield size={48} style={{ opacity: 0.3 }} />
            <p style={{ fontWeight: 600 }}>Select a conversation</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
