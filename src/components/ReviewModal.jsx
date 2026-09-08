import React, { useState } from 'react';
import { Star, X, Sparkles, Check, Heart, ThumbsUp } from 'lucide-react';

const COMPANION_TAGS = [
  'Punctual ⏱️',
  'Great Planner 🗺️',
  'Fun & Friendly 😊',
  'Respectful 🤝',
  'Adventurous 🏔️',
  'Photographer 📸',
  'Budget Smart 💡',
  'Chill Vibes 🌴',
  'Safe & Reliable 🛡️',
  'Foodie Explorer 🍜',
];

const RATING_DESCRIPTIONS = {
  5: 'Outstanding Travel Companion! 🏆',
  4: 'Great Travel Buddy! 🌟',
  3: 'Good Experience 👍',
  2: 'Fair, Some Hiccups 🙂',
  1: 'Needs Improvement 😕',
};

export default function ReviewModal({ isOpen, onClose, user, onSubmit }) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState(['Fun & Friendly 😊', 'Safe & Reliable 🛡️']);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen || !user) return null;

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      setError('Please write a short review sharing your experience.');
      return;
    }
    setError('');
    setSubmitting(true);

    try {
      await onSubmit({
        rating,
        tags: selectedTags,
        comment: comment.trim(),
      });
      setComment('');
      setSelectedTags(['Fun & Friendly 😊', 'Safe & Reliable 🛡️']);
      setRating(5);
      onClose();
    } catch (err) {
      setError('Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const displayRating = hoverRating || rating;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        animation: 'fadeIn 0.2s ease-out',
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: 520,
          background: '#FFFFFF',
          borderRadius: '1.5rem',
          boxShadow: '0 20px 48px rgba(104, 96, 184, 0.28)',
          border: '1px solid rgba(143, 136, 221, 0.25)',
          overflow: 'hidden',
          padding: 0,
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            background: 'linear-gradient(135deg, #8F88DD 0%, #6860B8 100%)',
            padding: '1.5rem 1.75rem',
            color: 'white',
            position: 'relative',
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '50%',
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            <X size={16} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img
              src={user.avatar}
              alt={user.name}
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                border: '3px solid white',
                objectFit: 'cover',
                background: '#EAE8FF',
              }}
            />
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#FDE8F0' }}>
                Rate & Review Companion
              </div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '0.15rem 0', color: 'white' }}>
                {user.name}
              </h2>
              <div style={{ fontSize: '0.8125rem', opacity: 0.9 }}>@{user.username} · {user.location}</div>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} style={{ padding: '1.5rem 1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Star Rating Section */}
          <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#202024', marginBottom: '0.5rem' }}>
              How was your experience with {user.name.split(' ')[0]}?
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '0.5rem',
                margin: '0.5rem 0',
              }}
              onMouseLeave={() => setHoverRating(0)}
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.25rem',
                    transition: 'transform 0.15s ease',
                    transform: displayRating >= star ? 'scale(1.15)' : 'scale(1)',
                  }}
                >
                  <Star
                    size={32}
                    color={displayRating >= star ? '#F59E0B' : '#D1D5DB'}
                    fill={displayRating >= star ? '#F59E0B' : 'none'}
                    style={{ filter: displayRating >= star ? 'drop-shadow(0 2px 6px rgba(245, 158, 11, 0.4))' : 'none' }}
                  />
                </button>
              ))}
            </div>

            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#6860B8', minHeight: '1.25rem' }}>
              {RATING_DESCRIPTIONS[displayRating] || 'Tap a star to rate'}
            </div>
          </div>

          {/* Tags Selection */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#374151', marginBottom: '0.5rem' }}>
              Select Companion Traits (Optional):
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {COMPANION_TAGS.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    type="button"
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    style={{
                      padding: '0.35rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: isSelected ? '1.5px solid #6860B8' : '1.5px solid rgba(143, 136, 221, 0.25)',
                      background: isSelected ? 'linear-gradient(135deg, #8F88DD, #6860B8)' : '#F8F7FF',
                      color: isSelected ? 'white' : '#6860B8',
                      transition: 'all 0.15s ease',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                    }}
                  >
                    {isSelected && <Check size={12} strokeWidth={3} />}
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Review Comment Textarea */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#374151', marginBottom: '0.5rem' }}>
              Your Review & Comments <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={`Share what it was like coordinating or traveling with ${user.name.split(' ')[0]}...`}
              rows={4}
              style={{
                width: '100%',
                padding: '0.85rem 1rem',
                borderRadius: '0.875rem',
                border: error ? '2px solid #EF4444' : '1.5px solid rgba(143, 136, 221, 0.35)',
                background: '#FAFAFE',
                color: '#202024',
                fontSize: '0.875rem',
                fontFamily: 'Poppins, sans-serif',
                resize: 'vertical',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
            {error && (
              <div style={{ color: '#EF4444', fontSize: '0.75rem', marginTop: '0.35rem', fontWeight: 600 }}>
                {error}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              style={{ flex: 1, justifyContent: 'center', padding: '0.65rem', fontSize: '0.875rem' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary"
              style={{
                flex: 1.4,
                justifyContent: 'center',
                padding: '0.65rem',
                fontSize: '0.875rem',
                opacity: submitting ? 0.7 : 1,
              }}
            >
              <Sparkles size={15} /> {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
