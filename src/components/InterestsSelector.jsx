import React, { useState } from 'react';
import { Search, X, Check, ChevronRight, Sparkles, Film, Gamepad2, Tv, Trophy, Clapperboard } from 'lucide-react';
import {
  INTERESTS_LIST,
  ENTERTAINMENT_SPORTS_CATEGORIES,
  ANIME_ITEMS,
  SERIES_ITEMS,
  MOVIE_GENRES,
  MOVIE_FRANCHISES,
  MARVEL_ITEMS,
  DC_ITEMS,
  CARTOON_ITEMS,
  GAME_ITEMS,
  SPORTS_ITEMS,
  SPORT_TEAMS,
} from '../data/demoData';

export default function InterestsSelector({ interests = [], onChange }) {
  const [activeCategoryModal, setActiveCategoryModal] = useState(null); // 'anime' | 'series' | 'movies' | 'games' | 'sports' | null
  const [searchQuery, setSearchQuery] = useState('');

  // Helper to check if an item is selected
  const isSelected = (item) => interests.includes(item);

  // Helper to toggle an interest item
  const toggleInterest = (item, parentCategoryLabel = null) => {
    let next = [...interests];
    if (next.includes(item)) {
      next = next.filter((i) => i !== item);
    } else {
      next.push(item);
      // If adding a sub-item, ensure parent category label is also included if present
      if (parentCategoryLabel && !next.includes(parentCategoryLabel)) {
        next.push(parentCategoryLabel);
      }
    }
    onChange(next);
  };

  // Helper to get count of selected sub-items for a category
  const getCategoryCount = (categoryId) => {
    let items = [];
    if (categoryId === 'anime') items = ANIME_ITEMS;
    else if (categoryId === 'series') items = SERIES_ITEMS;
    else if (categoryId === 'movies') {
      items = [
        ...MOVIE_GENRES,
        ...MOVIE_FRANCHISES,
        ...MARVEL_ITEMS,
        ...DC_ITEMS,
        ...CARTOON_ITEMS,
      ];
    } else if (categoryId === 'games') items = GAME_ITEMS;
    else if (categoryId === 'sports') {
      items = [...SPORTS_ITEMS];
      Object.values(SPORT_TEAMS).forEach((teams) => items.push(...teams));
    }
    return interests.filter((i) => items.includes(i)).length;
  };

  // Filter items based on search query
  const filterBySearch = (list) => {
    if (!searchQuery.trim()) return list;
    return list.filter((item) =>
      item.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Render Category Modal Content
  const renderModalContent = () => {
    if (!activeCategoryModal) return null;

    const cat = ENTERTAINMENT_SPORTS_CATEGORIES.find(
      (c) => c.id === activeCategoryModal
    );

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
          justify: 'center',
          padding: '1rem',
        }}
        onClick={() => {
          setActiveCategoryModal(null);
          setSearchQuery('');
        }}
      >
        <div
          className="card"
          style={{
            width: '100%',
            maxWidth: 680,
            maxHeight: '85vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            borderRadius: '1.25rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '1.75rem' }}>{cat?.emoji}</span>
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#202024', margin: 0 }}>
                  Choose your favourite {cat?.label}
                </h3>
                <p style={{ fontSize: '0.8125rem', color: '#6860B8', margin: 0, marginTop: 2 }}>
                  Select titles & categories to boost compatibility with like-minded travellers
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setActiveCategoryModal(null);
                setSearchQuery('');
              }}
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
                transition: 'all 0.2s',
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Search Bar */}
          <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #F0EFFC', background: '#FAFAFE' }}>
            <div style={{ position: 'relative' }}>
              <Search
                size={16}
                color="#8F88DD"
                style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                type="text"
                className="input"
                placeholder={`Search ${cat?.label}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  paddingLeft: 36,
                  paddingRight: searchQuery ? 36 : 12,
                  height: 42,
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
          </div>

          {/* Body Content */}
          <div
            style={{
              padding: '1.5rem',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              flex: 1,
            }}
          >
            {/* ANIME */}
            {activeCategoryModal === 'anime' && (
              <div>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#6860B8', marginBottom: '0.75rem' }}>
                  Popular Anime Titles
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {filterBySearch(ANIME_ITEMS).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleInterest(item, 'Anime')}
                      className={`interest-chip ${isSelected(item) ? 'selected' : ''}`}
                    >
                      {isSelected(item) && <Check size={12} style={{ marginRight: 4 }} />}
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* SERIES */}
            {activeCategoryModal === 'series' && (
              <div>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#6860B8', marginBottom: '0.75rem' }}>
                  Popular TV & Web Series
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {filterBySearch(SERIES_ITEMS).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleInterest(item, 'Series')}
                      className={`interest-chip ${isSelected(item) ? 'selected' : ''}`}
                    >
                      {isSelected(item) && <Check size={12} style={{ marginRight: 4 }} />}
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* MOVIES */}
            {activeCategoryModal === 'movies' && (
              <>
                {/* Movie Genres */}
                <div>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#6860B8', marginBottom: '0.75rem' }}>
                    Movie Genres & Industries
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {filterBySearch(MOVIE_GENRES).map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleInterest(item, 'Movies')}
                        className={`interest-chip ${isSelected(item) ? 'selected' : ''}`}
                      >
                        {isSelected(item) && <Check size={12} style={{ marginRight: 4 }} />}
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Movie Franchises */}
                <div>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#6860B8', marginBottom: '0.75rem' }}>
                    Franchises & Universes
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {filterBySearch(MOVIE_FRANCHISES).map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleInterest(item, 'Movies')}
                        className={`interest-chip ${isSelected(item) ? 'selected' : ''}`}
                      >
                        {isSelected(item) && <Check size={12} style={{ marginRight: 4 }} />}
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Marvel Sub-Category */}
                <div style={{ padding: '1rem', background: '#F8F7FF', borderRadius: '0.875rem', border: '1px solid #EAE8FF' }}>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#DC2626', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    🦸 Marvel Favorites
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {filterBySearch(MARVEL_ITEMS).map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleInterest(item, 'Movies')}
                        className={`interest-chip ${isSelected(item) ? 'selected' : ''}`}
                      >
                        {isSelected(item) && <Check size={12} style={{ marginRight: 4 }} />}
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* DC Sub-Category */}
                <div style={{ padding: '1rem', background: '#F8F7FF', borderRadius: '0.875rem', border: '1px solid #EAE8FF' }}>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#2563EB', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    🦇 DC Favorites
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {filterBySearch(DC_ITEMS).map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleInterest(item, 'Movies')}
                        className={`interest-chip ${isSelected(item) ? 'selected' : ''}`}
                      >
                        {isSelected(item) && <Check size={12} style={{ marginRight: 4 }} />}
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cartoons */}
                <div style={{ padding: '1rem', background: '#F8F7FF', borderRadius: '0.875rem', border: '1px solid #EAE8FF' }}>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#D97706', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    🎨 Cartoons
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {filterBySearch(CARTOON_ITEMS).map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleInterest(item, 'Movies')}
                        className={`interest-chip ${isSelected(item) ? 'selected' : ''}`}
                      >
                        {isSelected(item) && <Check size={12} style={{ marginRight: 4 }} />}
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* GAMES */}
            {activeCategoryModal === 'games' && (
              <div>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#6860B8', marginBottom: '0.75rem' }}>
                  Popular Games & Esports
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {filterBySearch(GAME_ITEMS).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleInterest(item, 'Games')}
                      className={`interest-chip ${isSelected(item) ? 'selected' : ''}`}
                    >
                      {isSelected(item) && <Check size={12} style={{ marginRight: 4 }} />}
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* SPORTS */}
            {activeCategoryModal === 'sports' && (
              <>
                <div>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#6860B8', marginBottom: '0.75rem' }}>
                    Sports Categories
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {filterBySearch(SPORTS_ITEMS).map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleInterest(item, 'Sports')}
                        className={`interest-chip ${isSelected(item) ? 'selected' : ''}`}
                      >
                        {isSelected(item) && <Check size={12} style={{ marginRight: 4 }} />}
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sport-specific teams */}
                {Object.entries(SPORT_TEAMS).map(([sport, teams]) => {
                  if (!isSelected(sport)) return null;
                  return (
                    <div
                      key={sport}
                      style={{
                        padding: '1rem',
                        background: '#F8F7FF',
                        borderRadius: '0.875rem',
                        border: '1px solid #EAE8FF',
                      }}
                    >
                      <h4
                        style={{
                          fontSize: '0.875rem',
                          fontWeight: 700,
                          color: '#166534',
                          marginBottom: '0.75rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                        }}
                      >
                        ⚽ Favorite {sport} Teams
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {filterBySearch(teams).map((team) => (
                          <button
                            key={team}
                            type="button"
                            onClick={() => toggleInterest(team, 'Sports')}
                            className={`interest-chip ${isSelected(team) ? 'selected' : ''}`}
                          >
                            {isSelected(team) && <Check size={12} style={{ marginRight: 4 }} />}
                            {team}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>

          {/* Modal Footer */}
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
            <span style={{ fontSize: '0.8125rem', color: '#6B7280', fontWeight: 500 }}>
              {getCategoryCount(activeCategoryModal)} selected in {cat?.label}
            </span>
            <button
              type="button"
              className="btn-primary"
              style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}
              onClick={() => {
                setActiveCategoryModal(null);
                setSearchQuery('');
              }}
            >
              Done & Save
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Helper to render summary chip text
  const getSummaryText = (catId) => {
    let items = [];
    if (catId === 'anime') items = ANIME_ITEMS;
    else if (catId === 'series') items = SERIES_ITEMS;
    else if (catId === 'movies') {
      items = [
        ...MOVIE_GENRES,
        ...MOVIE_FRANCHISES,
        ...MARVEL_ITEMS,
        ...DC_ITEMS,
        ...CARTOON_ITEMS,
      ];
    } else if (catId === 'games') items = GAME_ITEMS;
    else if (catId === 'sports') {
      items = [...SPORTS_ITEMS];
      Object.values(SPORT_TEAMS).forEach((t) => items.push(...t));
    }
    const selectedSub = interests.filter((i) => items.includes(i));
    if (selectedSub.length === 0) return null;
    return selectedSub.join(' • ');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* 1. Main Standard Travel Interests */}
      <div>
        <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#202024', display: 'block', marginBottom: '0.625rem' }}>
          Travel & Lifestyle Interests
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {INTERESTS_LIST.map((item) => {
            const selected = isSelected(item.label);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleInterest(item.label)}
                className={`interest-chip ${selected ? 'selected' : ''}`}
              >
                {item.emoji} {item.label} {selected && '✓'}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. New Entertainment & Sports Main Categories */}
      <div style={{ paddingTop: '0.5rem', borderTop: '1px border #EAE8FF' }}>
        <label
          style={{
            fontSize: '0.8125rem',
            fontWeight: 700,
            color: '#6860B8',
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            marginBottom: '0.625rem',
          }}
        >
          <Sparkles size={14} color="#8F88DD" /> Entertainment & Sports AI Match Preferences
        </label>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {ENTERTAINMENT_SPORTS_CATEGORIES.map((cat) => {
            const count = getCategoryCount(cat.id);
            const mainSelected = isSelected(cat.label) || count > 0;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  toggleInterest(cat.label);
                  setActiveCategoryModal(cat.id);
                }}
                className={`interest-chip ${mainSelected ? 'selected' : ''}`}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  border: mainSelected
                    ? 'none'
                    : '1.5px solid rgba(143,136,221,0.4)',
                }}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
                {count > 0 ? (
                  <span
                    style={{
                      background: mainSelected ? 'rgba(255,255,255,0.25)' : '#EAE8FF',
                      color: mainSelected ? '#FFF' : '#6860B8',
                      padding: '0.1rem 0.45rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                    }}
                  >
                    ✓ {count}
                  </span>
                ) : mainSelected ? (
                  <span style={{ fontSize: '0.75rem' }}>✓</span>
                ) : (
                  <ChevronRight size={14} color="#8F88DD" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Selected Summary Box (Clean & Compact) */}
      {ENTERTAINMENT_SPORTS_CATEGORIES.some((cat) => getCategoryCount(cat.id) > 0) && (
        <div
          style={{
            padding: '0.875rem 1rem',
            background: 'linear-gradient(135deg, #F8F7FF 0%, #FAFAFE 100%)',
            borderRadius: '0.875rem',
            border: '1px solid #EAE8FF',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#8F88DD', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Selected Entertainment & Sports Preferences
          </div>
          {ENTERTAINMENT_SPORTS_CATEGORIES.map((cat) => {
            const count = getCategoryCount(cat.id);
            const summary = getSummaryText(cat.id);
            if (count === 0) return null;
            return (
              <div
                key={cat.id}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '0.5rem',
                  fontSize: '0.8125rem',
                  flexWrap: 'wrap',
                }}
              >
                <span style={{ fontWeight: 700, color: '#202024', minWidth: 70 }}>
                  {cat.emoji} {cat.label} ({count}):
                </span>
                <span style={{ color: '#6860B8', fontWeight: 500 }}>
                  {summary}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveCategoryModal(cat.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#8F88DD',
                    fontSize: '0.75rem',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    padding: 0,
                    marginLeft: 'auto',
                  }}
                >
                  Edit
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Render Modal */}
      {renderModalContent()}
    </div>
  );
}
