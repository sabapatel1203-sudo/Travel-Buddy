import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Star, Shield, MessageCircle, UserPlus, Flag, CheckCircle, Bookmark, ChevronRight, Sparkles } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import CompatibilityScore from '../components/ui/CompatibilityScore';
import TrustBadge from '../components/ui/TrustBadge';
import AvatarPickerModal from '../components/AvatarPickerModal';
import ReviewModal from '../components/ReviewModal';
import { useApp } from '../context/AppContext';
import { calculateCompatibilityScore } from '../services/smartMatch';

export default function ProfilePage() {
  const { id } = useParams();
  const { state, actions } = useApp();
  const navigate = useNavigate();
  const [reportOpen, setReportOpen] = useState(false);
  const [reported, setReported] = useState(false);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const user = state.users.find(u => u.id === id) || state.currentUser;
  const isSelf = id === state.currentUser?.id;

  const compatibility = !isSelf ? calculateCompatibilityScore(state.currentUser, user) : null;
  const userReviews = (state.reviews || []).filter(r => r.reviewedUserId === (user?.id || id));
  const isSaved = state.savedUsers.includes(id || user?.id);
  const isConnected = (state.connectedUserIds || []).includes(user?.id || id) ||
    state.matches?.some(m => (m.matchedUserId === (user?.id || id) || m.userId === (user?.id || id)) && m.status === 'connected');

  const handleConnect = async () => {
    await actions.connectWithTraveller(user?.id || id);
  };

  const handleMessage = () => {
    navigate('/messages', { state: { userId: user?.id || id } });
  };

  const handleReport = () => {
    setReported(true);
    setReportOpen(false);
    actions.showToast('Report submitted. Our team will review it.', 'success');
  };

  if (!user) {
    return <AppLayout title="Profile"><div style={{ textAlign: 'center', padding: '3rem', color: '#9CA3AF' }}>User not found.</div></AppLayout>;
  }

  return (
    <AppLayout title={isSelf ? 'My Profile' : user.name}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>

        {/* Profile header */}
        <div className="card" style={{ marginBottom: '1.25rem', padding: '2rem', background: 'linear-gradient(135deg,#F8F7FF,#EAE8FF)' }}>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flexShrink: 0, cursor: isSelf ? 'pointer' : 'default' }} onClick={() => isSelf && setShowAvatarPicker(true)}>
              <img src={user.avatar} alt={user.name} style={{ width: 96, height: 96, borderRadius: '50%', background: '#EAE8FF', border: '4px solid white', boxShadow: '0 4px 16px rgba(143,136,221,0.2)', objectFit: 'cover' }} />
              {user.verification?.identity && (
                <div style={{ position: 'absolute', bottom: 4, right: 4, width: 26, height: 26, background: '#4ADE80', borderRadius: '50%', border: '3px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckCircle size={14} color="white" />
                </div>
              )}
              {isSelf && (
                <div style={{ position: 'absolute', top: 0, right: 0, background: 'linear-gradient(135deg,#8F88DD,#6860B8)', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '1rem', fontSize: '0.6875rem', fontWeight: 700, boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }}>
                  Change 🎨
                </div>
              )}
            </div>

            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
                <h1 style={{ fontWeight: 800, color: '#202024', fontSize: '1.5rem', margin: 0 }}>{user.name}</h1>
                <span style={{ fontSize: '0.9rem', color: '#8F88DD' }}>@{user.username}</span>
              </div>
              {user.avatarPersonality && (
                <div style={{ marginBottom: '0.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.375rem', padding: '0.15rem 0.55rem', borderRadius: '0.4rem', background: '#EAE8FF', color: '#6860B8', fontSize: '0.75rem', fontWeight: 700 }}>
                  <span>🎒</span> Personality: {user.avatarPersonality}
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#8F88DD', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                <MapPin size={14} /> <span style={{ fontSize: '0.9rem' }}>{user.location}</span>
                <span>·</span>
                <span style={{ fontSize: '0.9rem' }}>Age {user.age}</span>
              </div>
              <p style={{ color: '#6B7280', lineHeight: 1.7, marginBottom: '1rem', fontSize: '0.9375rem' }}>{user.bio}</p>

              {/* Stats row */}
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <Star size={14} color="#F59E0B" fill="#F59E0B" />
                  <span style={{ fontWeight: 700, color: '#202024' }}>{user.rating}</span>
                  <span style={{ fontSize: '0.8125rem', color: '#9CA3AF' }}>({user.reviewCount} reviews)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <MapPin size={14} color="#8F88DD" />
                  <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>{user.trips?.length || 0} trips</span>
                </div>
                <div style={{ fontSize: '0.8125rem', color: '#9CA3AF' }}>Member since {user.joinedDate?.split('-')[0]}</div>
              </div>
            </div>

            {/* Right actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', flexShrink: 0 }}>
              {isSelf ? (
                <>
                  <button onClick={() => setShowAvatarPicker(true)} className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', justifyContent: 'center' }}>
                    <Sparkles size={14} /> Change Avatar
                  </button>
                  <Link to="/settings" className="btn-secondary" style={{ textDecoration: 'none', justifyContent: 'center', padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Edit Profile</Link>
                </>
              ) : (
                <>
                  {isConnected ? (
                    <button
                      onClick={handleMessage}
                      className="btn-primary"
                      style={{
                        padding: '0.5rem 1rem',
                        fontSize: '0.875rem',
                        justifyContent: 'center',
                        background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)',
                      }}
                    >
                      <MessageCircle size={14} /> Message
                    </button>
                  ) : (
                    <button onClick={handleConnect} className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', justifyContent: 'center' }}>
                      <UserPlus size={14} /> Connect
                    </button>
                  )}
                  <button onClick={() => setShowReviewModal(true)} className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', justifyContent: 'center' }}>
                    <Star size={14} color="#F59E0B" fill="#F59E0B" /> Rate & Review
                  </button>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => actions.toggleSaveUser(id)} style={{ flex: 1, background: isSaved ? '#EAE8FF' : 'white', color: '#8F88DD', border: '1.5px solid rgba(143,136,221,0.3)', borderRadius: '0.75rem', padding: '0.5rem', cursor: 'pointer' }}>
                      <Bookmark size={16} fill={isSaved ? '#8F88DD' : 'none'} />
                    </button>
                    <button onClick={() => setReportOpen(true)} style={{ flex: 1, background: 'white', color: '#9CA3AF', border: '1.5px solid rgba(143,136,221,0.2)', borderRadius: '0.75rem', padding: '0.5rem', cursor: 'pointer' }}>
                      <Flag size={16} />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }} className="profile-grid">
          <style>{`@media(max-width:600px){.profile-grid{grid-template-columns:1fr!important;}}`}</style>

          {/* Trust & Verification */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontWeight: 700, color: '#202024', marginBottom: '1rem', fontSize: '0.9375rem' }}>🛡️ Trust & Verification</h3>
            <TrustBadge score={user.trustScore} verification={user.verification} />
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
              {[
                { label: 'Email', done: user.verification?.email },
                { label: 'Phone', done: user.verification?.phone },
                { label: 'Identity', done: user.verification?.identity },
              ].map(v => (
                <span key={v.label} className={`badge ${v.done ? 'badge-green' : 'badge-yellow'}`}>
                  {v.done ? <CheckCircle size={10} /> : '○'} {v.label}
                </span>
              ))}
            </div>
          </div>

          {/* Compatibility with current user */}
          {!isSelf && compatibility && (
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontWeight: 700, color: '#202024', marginBottom: '1rem', fontSize: '0.9375rem' }}>✨ Your Compatibility</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <CompatibilityScore score={compatibility.score} size={72} />
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#202024' }}>{compatibility.score}%</div>
                  <div style={{ fontSize: '0.8125rem', color: '#8F88DD' }}>compatibility match</div>
                  {compatibility.sharedInterests?.length > 0 && (
                    <div style={{ fontSize: '0.8125rem', color: '#166534', marginTop: '0.25rem' }}>
                      {compatibility.sharedInterests.length} shared interests
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Travel DNA */}
          <div className="card" style={{ padding: '1.5rem', gridColumn: !isSelf && compatibility ? 'auto' : 'span 1' }}>
            <h3 style={{ fontWeight: 700, color: '#202024', marginBottom: '1rem', fontSize: '0.9375rem' }}>🧬 Travel DNA</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {Object.entries(user.travelDNA || {}).map(([key, val]) => {
                const labels = { adventure: '🏔 Adventure', relaxation: '🌊 Relaxation', foodExplorer: '🍜 Food Explorer', photography: '📸 Photography', social: '🎉 Social', budget: '💰 Budget Conscious' };
                return (
                  <div key={key}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <span style={{ fontSize: '0.8125rem', color: '#6B7280', fontWeight: 500 }}>{labels[key] || key}</span>
                      <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#6860B8' }}>{val}%</span>
                    </div>
                    <div className="progress-bar" style={{ height: 5 }}>
                      <div className="progress-fill" style={{ width: `${val}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Interests */}
        <div className="card" style={{ marginBottom: '1.25rem', padding: '1.5rem' }}>
          <h3 style={{ fontWeight: 700, color: '#202024', marginBottom: '1rem', fontSize: '0.9375rem' }}>🌟 Travel Interests</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
            {user.interests?.map(i => <span key={i} className="tag">{i}</span>)}
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <span className="badge badge-purple">Style: {user.travelStyle}</span>
            <span className="badge badge-pink">Food: {user.foodPreference}</span>
            <span className="badge badge-purple">Pace: {user.travelPace}</span>
            <span className="badge badge-purple">Group: {user.groupPreference}</span>
          </div>
        </div>

        {/* Reviews */}
        <div className="card" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <h3 style={{ fontWeight: 700, color: '#202024', margin: 0, fontSize: '0.9375rem' }}>⭐ Community Reviews ({userReviews.length})</h3>
              <div style={{ fontSize: '0.8rem', color: '#8F88DD', marginTop: '0.15rem' }}>
                Overall rating: <strong style={{ color: '#202024' }}>{user.rating} / 5.0</strong> ({user.reviewCount || userReviews.length} ratings)
              </div>
            </div>
            {!isSelf && (
              <button
                onClick={() => setShowReviewModal(true)}
                className="btn-primary"
                style={{ padding: '0.45rem 1rem', fontSize: '0.8125rem' }}
              >
                <Star size={13} fill="currentColor" /> Write a Review
              </button>
            )}
          </div>

          {userReviews.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '1.5rem', background: '#F8F7FF', borderRadius: '0.875rem' }}>
              <p style={{ color: '#6B7280', fontSize: '0.875rem', marginBottom: '0.75rem' }}>No reviews yet for {user.name.split(' ')[0]}.</p>
              {!isSelf && (
                <button onClick={() => setShowReviewModal(true)} className="btn-secondary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.8125rem' }}>
                  Be the first to review
                </button>
              )}
            </div>
          ) : userReviews.map(review => {
            const reviewer = state.users.find(u => u.id === review.reviewerId);
            const overallRating = review.rating?.overall || review.rating || 5;
            return (
              <div key={review.id} style={{ padding: '1rem', background: '#F8F7FF', borderRadius: '0.875rem', marginBottom: '0.75rem', border: '1px solid rgba(143,136,221,0.15)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img
                      src={reviewer?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${review.reviewerId}&backgroundColor=b6e3f4`}
                      alt=""
                      style={{ width: 36, height: 36, borderRadius: '50%', background: '#EAE8FF', border: '1.5px solid #8F88DD' }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, color: '#202024', fontSize: '0.875rem' }}>{reviewer?.name || 'Travel Buddy'}</div>
                      <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} color="#F59E0B" fill={i < overallRating ? '#F59E0B' : 'none'} />
                        ))}
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#F59E0B', marginLeft: '0.3rem' }}>{overallRating}.0</span>
                      </div>
                    </div>
                  </div>
                  {review.date && (
                    <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>{review.date}</div>
                  )}
                </div>

                {review.tags?.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.5rem' }}>
                    {review.tags.map(t => (
                      <span key={t} style={{ fontSize: '0.6875rem', padding: '0.125rem 0.5rem', borderRadius: '9999px', background: '#EAE8FF', color: '#6860B8', fontWeight: 600 }}>
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                <p style={{ fontSize: '0.875rem', color: '#4B5563', lineHeight: 1.6, margin: 0 }}>{review.comment}</p>
              </div>
            );
          })}
        </div>

        {/* Report modal */}
        {reportOpen && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
            <div className="card" style={{ width: '100%', maxWidth: 400, padding: '1.5rem' }}>
              <h3 style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#202024' }}>Report User</h3>
              <p style={{ color: '#6B7280', fontSize: '0.9rem', marginBottom: '1.25rem' }}>Please select a reason for reporting this user. All reports are reviewed by our safety team.</p>
              {['Inappropriate content', 'Fake profile', 'Harassment', 'Spam', 'Other'].map(r => (
                <button key={r} onClick={handleReport} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.75rem 1rem', marginBottom: '0.5rem', background: '#F8F7FF', border: '1px solid rgba(143,136,221,0.2)', borderRadius: '0.75rem', cursor: 'pointer', fontSize: '0.875rem', color: '#202024', fontFamily: 'Poppins,sans-serif' }}>
                  {r}
                </button>
              ))}
              <button onClick={() => setReportOpen(false)} className="btn-ghost" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}>Cancel</button>
            </div>
          </div>
        )}

        {/* Avatar Picker Modal */}
        <AvatarPickerModal
          isOpen={showAvatarPicker}
          onClose={() => setShowAvatarPicker(false)}
          currentAvatarUrl={user?.avatar}
          showToast={actions.showToast}
          onSelectAvatar={(avatarObj) => {
            actions.updateProfile({
              avatar: avatarObj.avatar,
              avatarId: avatarObj.id,
              avatarPersonality: avatarObj.personality,
            });
            actions.showToast(`Updated avatar to "${avatarObj.name}" ✨`, 'success');
          }}
        />

        {/* Review & Rating Modal */}
        <ReviewModal
          isOpen={showReviewModal}
          onClose={() => setShowReviewModal(false)}
          user={user}
          onSubmit={async (reviewData) => {
            await actions.addReview({
              reviewedUserId: user.id,
              ...reviewData,
            });
          }}
        />
      </div>
    </AppLayout>
  );
}
