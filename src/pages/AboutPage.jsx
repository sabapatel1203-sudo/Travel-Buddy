import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Brain, Shield, Zap, Globe, Award, ArrowRight, Compass } from 'lucide-react';

const TEAM = [
  { name: 'Rohan Mehta', role: 'Founder & CEO', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rohan&backgroundColor=b6e3f4', bio: 'Ex-Airbnb engineer. Solo traveller. Built Travel Buddy to solve his own problem.' },
  { name: 'Sneha Iyer', role: 'Head of Product', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sneha&backgroundColor=ffdfbf', bio: 'UX researcher & traveller. Spent 2 years travelling across 30 countries.' },
  { name: 'Arjun Kapoor', role: 'AI/ML Engineer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun&backgroundColor=c0aede', bio: 'PhD in ML. Built SmartMatch AI and TripCraft algorithms.' },
];

export default function AboutPage() {
  return (
    <div style={{ fontFamily: 'Poppins,sans-serif', background: '#F8F7FF', minHeight: '100vh' }}>
      {/* Nav */}
      <nav style={{ background: 'white', borderBottom: '1px solid rgba(143,136,221,0.12)', padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: '1rem', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 1px 8px rgba(143,136,221,0.06)' }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: 36, height: 36, borderRadius: '10px', background: 'linear-gradient(135deg,#8F88DD,#6860B8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Compass size={20} color="white" />
          </div>
          <span style={{ fontWeight: 800, color: '#202024' }}>Travel Buddy</span>
        </Link>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.75rem' }}>
          <Link to="/login" className="btn-secondary" style={{ textDecoration: 'none', padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Login</Link>
          <Link to="/register" className="btn-primary" style={{ textDecoration: 'none', padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: '5rem 2rem', textAlign: 'center', background: 'linear-gradient(135deg,#EAE8FF,#F8F7FF)' }}>
        <p className="section-label">OUR STORY</p>
        <h1 style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 900, color: '#202024', margin: '0.75rem 0 1.25rem', lineHeight: 1.15 }}>
          Making Travel More Human,<br />
          <span style={{ background: 'linear-gradient(135deg,#8F88DD,#6860B8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>One Buddy at a Time.</span>
        </h1>
        <p style={{ color: '#6B7280', fontSize: '1.125rem', maxWidth: 640, margin: '0 auto 2rem', lineHeight: 1.7 }}>
          Travel Buddy was born from a simple belief: that the right travel companion can transform an ordinary trip into an extraordinary life experience.
        </p>
      </section>

      {/* Mission */}
      <section style={{ padding: '4rem 2rem', background: 'white' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
          <div>
            <p className="section-label">OUR MISSION</p>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#202024', margin: '0.75rem 0 1rem' }}>Connect. Trust. Explore.</h2>
            <p style={{ color: '#6B7280', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              We use AI-powered matching, multi-layer trust verification and collaborative planning tools to ensure that every travel connection is compatible, safe and unforgettable.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {['Safe connections through TrustGuard verification', 'AI compatibility scoring across 8 dimensions', 'Collaborative trip planning with TripCraft AI', 'Fair expense splitting with GroupSync'].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9375rem', color: '#202024' }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ color: '#4ADE80', fontSize: '0.75rem' }}>✓</span>
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[
              { value: '10K+', label: 'Travellers Connected' },
              { value: '92%', label: 'Match Satisfaction' },
              { value: '150+', label: 'Destinations' },
              { value: '4.8★', label: 'Average Rating' },
            ].map(stat => (
              <div key={stat.label} style={{ background: 'linear-gradient(135deg,#EAE8FF,#F3F2FF)', borderRadius: '1rem', padding: '1.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: '#6860B8' }}>{stat.value}</div>
                <div style={{ fontSize: '0.8125rem', color: '#8F88DD', fontWeight: 500 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '4rem 2rem', background: '#F8F7FF' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <p className="section-label">THE PEOPLE</p>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#202024', margin: '0.75rem 0 2.5rem' }}>Meet the Team</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '1.5rem' }}>
            {TEAM.map(member => (
              <div key={member.name} className="card" style={{ padding: '1.75rem', textAlign: 'center' }}>
                <img src={member.avatar} alt="" style={{ width: 72, height: 72, borderRadius: '50%', background: '#EAE8FF', margin: '0 auto 1rem' }} />
                <h3 style={{ fontWeight: 700, color: '#202024', marginBottom: '0.25rem' }}>{member.name}</h3>
                <p style={{ fontSize: '0.8125rem', color: '#8F88DD', fontWeight: 600, marginBottom: '0.75rem' }}>{member.role}</p>
                <p style={{ color: '#6B7280', fontSize: '0.875rem', lineHeight: 1.6 }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '4rem 2rem', background: 'linear-gradient(135deg,#8F88DD,#6860B8)', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>Join the Journey</h2>
        <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '2rem' }}>Start finding your perfect travel buddy today.</p>
        <Link to="/register" style={{ background: 'white', color: '#6860B8', fontWeight: 700, padding: '0.875rem 2rem', borderRadius: '9999px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          Get Started Free <ArrowRight size={18} />
        </Link>
      </section>

      <footer style={{ background: '#202024', padding: '1.5rem 2rem', textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}>
        © 2024 Travel Buddy · <Link to="/contact" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Contact Us</Link>
      </footer>
    </div>
  );
}
