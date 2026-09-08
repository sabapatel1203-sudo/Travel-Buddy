import React, { useState } from 'react';
import { X, Search, Dices, Check, Sparkles, User, Compass, Heart } from 'lucide-react';
import { AVATAR_CATEGORIES, AVATAR_COLLECTION } from '../data/avatarLibrary';

export default function AvatarPickerModal({ isOpen, onClose, currentAvatarUrl, onSelectAvatar, showToast }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(() => {
    const existing = AVATAR_COLLECTION.find((a) => a.avatar === currentAvatarUrl);
    return existing || AVATAR_COLLECTION[0];
  });

  if (!isOpen) return null;

  // Filter collection based on category and search query
  const filteredAvatars = AVATAR_COLLECTION.filter((item) => {
    // Category match
    let matchCat = true;
    if (activeCategory === 'male') matchCat = item.gender === 'male';
    else if (activeCategory === 'female') matchCat = item.gender === 'female';
    else if (activeCategory === 'neutral') matchCat = item.gender === 'neutral';
    else if (activeCategory !== 'all') matchCat = item.category === activeCategory;

    // Search query match
    let matchSearch = true;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      matchSearch =
        item.name.toLowerCase().includes(q) ||
        item.style.toLowerCase().includes(q) ||
        item.personality.toLowerCase().includes(q) ||
        item.mood.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q));
    }

    return matchCat && matchSearch;
  });

  // Surprise Me handler
  const handleSurpriseMe = () => {
    const randomIndex = Math.floor(Math.random() * AVATAR_COLLECTION.length);
    const picked = AVATAR_COLLECTION[randomIndex];
    setSelectedAvatar(picked);
    if (showToast) {
      showToast(`Surprise! We picked "${picked.name}" for you 🎲`, 'success');
    }
  };

  // Confirm selection
  const handleConfirm = () => {
    onSelectAvatar(selectedAvatar);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(15, 14, 26, 0.65)',
        backdropFilter: 'blur(6px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: 820,
          maxHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          borderRadius: '1.25rem',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
          background: '#FFFFFF',
          animation: 'modalSlideIn 0.25s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid #EAE8FF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, #F8F7FF 0%, #EAE8FF 100%)',
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#202024', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Choose Your Travel Avatar ✨
            </h3>
            <p style={{ fontSize: '0.8125rem', color: '#6860B8', margin: 0, marginTop: 2 }}>
              Pick the character that feels most like you.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={handleSurpriseMe}
              className="btn-secondary"
              style={{
                padding: '0.4rem 0.875rem',
                fontSize: '0.8125rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                background: 'white',
                border: '1.5px solid #8F88DD',
                color: '#6860B8',
                fontWeight: 600,
              }}
            >
              <Dices size={16} /> 🎲 Surprise Me
            </button>
            <button
              onClick={onClose}
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                border: 'none',
                background: 'rgba(143,136,221,0.15)',
                color: '#6860B8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Search & Category Filter Tabs */}
        <div style={{ padding: '1rem 1.5rem 0.5rem 1.5rem', background: '#FAFAFE', borderBottom: '1px solid #F0EFFC' }}>
          {/* Search bar */}
          <div style={{ position: 'relative', marginBottom: '0.875rem' }}>
            <Search
              size={16}
              color="#8F88DD"
              style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              className="input"
              placeholder="Search avatars by style, mood, personality (e.g. cool, explorer, photography)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                paddingLeft: 36,
                paddingRight: searchQuery ? 36 : 12,
                height: 40,
                fontSize: '0.875rem',
                borderRadius: '0.75rem',
                borderColor: '#EAE8FF',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: 10,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  border: 'none',
                  background: 'transparent',
                  color: '#9CA3AF',
                  cursor: 'pointer',
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Categories */}
          <div
            style={{
              display: 'flex',
              gap: '0.375rem',
              overflowX: 'auto',
              paddingBottom: '0.625rem',
              scrollbarWidth: 'none',
            }}
          >
            {AVATAR_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: '2rem',
                    border: 'none',
                    background: isActive
                      ? 'linear-gradient(135deg,#8F88DD,#6860B8)'
                      : '#FFFFFF',
                    color: isActive ? '#FFFFFF' : '#6B7280',
                    fontSize: '0.8125rem',
                    fontWeight: isActive ? 700 : 500,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    boxShadow: isActive ? '0 2px 8px rgba(143,136,221,0.3)' : '0 1px 3px rgba(0,0,0,0.05)',
                    border: isActive ? 'none' : '1px solid #EAE8FF',
                    transition: 'all 0.2s',
                  }}
                >
                  <span>{cat.emoji}</span> {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Avatar Grid Area */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            overflowY: 'auto',
            flex: 1,
          }}
        >
          {filteredAvatars.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#9CA3AF' }}>
              <p style={{ fontSize: '1rem', fontWeight: 600, color: '#6860B8', marginBottom: '0.5rem' }}>No avatars found</p>
              <p style={{ fontSize: '0.875rem' }}>Try adjusting your search query or selecting another filter tab.</p>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(115px, 1fr))',
                gap: '1rem',
              }}
            >
              {filteredAvatars.map((item) => {
                const isCurrent = selectedAvatar.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedAvatar(item)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '0.75rem 0.5rem',
                      borderRadius: '1rem',
                      background: isCurrent
                        ? 'linear-gradient(135deg, #F8F7FF 0%, #EAE8FF 100%)'
                        : '#FFFFFF',
                      border: isCurrent
                        ? '2px solid #8F88DD'
                        : '1.5px solid #F0EFFC',
                      boxShadow: isCurrent
                        ? '0 6px 16px rgba(143, 136, 221, 0.35)'
                        : '0 2px 6px rgba(0, 0, 0, 0.03)',
                      cursor: 'pointer',
                      position: 'relative',
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: isCurrent ? 'scale(1.04)' : 'scale(1)',
                    }}
                  >
                    {/* Selected badge */}
                    {isCurrent && (
                      <div
                        style={{
                          position: 'absolute',
                          top: 6,
                          right: 6,
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #8F88DD, #6860B8)',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.7rem',
                          fontWeight: 800,
                          boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                        }}
                      >
                        <Check size={12} />
                      </div>
                    )}

                    {/* Avatar Image */}
                    <div style={{ position: 'relative', marginBottom: '0.5rem' }}>
                      <img
                        src={item.avatar}
                        alt={item.name}
                        style={{
                          width: 68,
                          height: 68,
                          borderRadius: '50%',
                          background: '#EAE8FF',
                          border: isCurrent
                            ? '3px solid #8F88DD'
                            : '2px solid rgba(143,136,221,0.2)',
                          objectFit: 'cover',
                        }}
                      />
                    </div>

                    {/* Title & Metadata */}
                    <div style={{ textAlign: 'center', width: '100%' }}>
                      <div
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: '#202024',
                          lineHeight: 1.2,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          marginBottom: 3,
                        }}
                      >
                        {item.name}
                      </div>

                      <div
                        style={{
                          fontSize: '0.6875rem',
                          color: '#6860B8',
                          fontWeight: 600,
                          background: isCurrent ? '#FFFFFF' : '#F8F7FF',
                          padding: '0.15rem 0.4rem',
                          borderRadius: '0.4rem',
                          display: 'inline-block',
                        }}
                      >
                        {item.personality}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Bar */}
        <div
          style={{
            padding: '1rem 1.5rem',
            borderTop: '1px solid #EAE8FF',
            display: 'flex',
            alignItems: 'center',
            justify: 'space-between',
            background: '#FAFAFE',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img
              src={selectedAvatar.avatar}
              alt=""
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                border: '2px solid #8F88DD',
                background: '#EAE8FF',
              }}
            />
            <div>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#202024' }}>
                Selected: {selectedAvatar.name}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#6860B8' }}>
                Personality: {selectedAvatar.personality} • Style: {selectedAvatar.style}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={onClose}
              className="btn-secondary"
              style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="btn-primary"
              style={{ padding: '0.5rem 1.35rem', fontSize: '0.875rem' }}
            >
              Save Avatar ✨
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
