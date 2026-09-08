import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, CheckCircle, Compass } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  };

  return (
    <div style={{ fontFamily: 'Poppins,sans-serif', background: '#F8F7FF', minHeight: '100vh' }}>
      <nav style={{ background: 'white', borderBottom: '1px solid rgba(143,136,221,0.12)', padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: '1rem', position: 'sticky', top: 0, zIndex: 50 }}>
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

      <section style={{ padding: '4rem 2rem', textAlign: 'center', background: 'linear-gradient(135deg,#EAE8FF,#F8F7FF)' }}>
        <p className="section-label">GET IN TOUCH</p>
        <h1 style={{ fontSize: 'clamp(1.75rem,4vw,2.75rem)', fontWeight: 900, color: '#202024', margin: '0.75rem 0 1rem' }}>Contact Us</h1>
        <p style={{ color: '#6B7280', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>We're here to help. Have a question, feedback or partnership inquiry? Drop us a message.</p>
      </section>

      <section style={{ padding: '3rem 2rem', maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
        <div>
          <h2 style={{ fontWeight: 700, color: '#202024', marginBottom: '1.5rem' }}>Reach Us</h2>
          {[
            { icon: Mail, label: 'hello@travelbuddy.app', sub: 'General inquiries' },
            { icon: Phone, label: '+91 98765 43210', sub: 'Mon–Fri, 9am–6pm IST' },
            { icon: MapPin, label: 'Bengaluru, India', sub: 'India HQ' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', alignItems: 'flex-start' }}>
              <div style={{ width: 44, height: 44, borderRadius: '0.875rem', background: '#EAE8FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <item.icon size={20} color="#8F88DD" />
              </div>
              <div>
                <div style={{ fontWeight: 600, color: '#202024' }}>{item.label}</div>
                <div style={{ fontSize: '0.875rem', color: '#9CA3AF' }}>{item.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="card" style={{ padding: '2rem' }}>
          {!sent ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem' }}>
                <div>
                  <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#202024', display: 'block', marginBottom: '0.375rem' }}>Name</label>
                  <input className="input" placeholder="Your name" value={form.name} onChange={e => set('name', e.target.value)} required />
                </div>
                <div>
                  <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#202024', display: 'block', marginBottom: '0.375rem' }}>Email</label>
                  <input className="input" type="email" placeholder="you@email.com" value={form.email} onChange={e => set('email', e.target.value)} required />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#202024', display: 'block', marginBottom: '0.375rem' }}>Subject</label>
                <input className="input" placeholder="What's this about?" value={form.subject} onChange={e => set('subject', e.target.value)} required />
              </div>
              <div>
                <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#202024', display: 'block', marginBottom: '0.375rem' }}>Message</label>
                <textarea className="input" style={{ minHeight: 100, resize: 'vertical' }} placeholder="Tell us more…" value={form.message} onChange={e => set('message', e.target.value)} required />
              </div>
              <button type="submit" disabled={loading} className="btn-primary" style={{ justifyContent: 'center', padding: '0.875rem' }}>
                <Send size={16} /> {loading ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <CheckCircle size={52} color="#4ADE80" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontWeight: 800, color: '#202024', marginBottom: '0.5rem' }}>Message Sent!</h3>
              <p style={{ color: '#6B7280' }}>We'll get back to you within 24 hours. 🙏</p>
            </div>
          )}
        </div>
      </section>

      <footer style={{ background: '#202024', padding: '1.5rem 2rem', textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}>
        © 2024 Travel Buddy
      </footer>
    </div>
  );
}
