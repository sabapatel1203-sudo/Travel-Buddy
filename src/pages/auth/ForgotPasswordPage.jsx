import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import Logo from '../../components/common/Logo';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setSent(true);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8F7FF', fontFamily: 'Poppins,sans-serif', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ marginBottom: '2rem' }}>
          <Logo size="medium" showTagline={true} />
        </div>

        {!sent ? (
          <>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#202024', marginBottom: '0.5rem' }}>Forgot Password?</h2>
            <p style={{ color: '#8F88DD', marginBottom: '2rem' }}>Enter your email and we'll send you a reset link.</p>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                <input className="input" style={{ paddingLeft: '2.5rem' }} type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <button type="submit" className="btn-primary" disabled={loading} style={{ justifyContent: 'center', padding: '0.875rem' }}>
                {loading ? 'Sending…' : 'Send Reset Link'}
              </button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <CheckCircle size={36} color="#4ADE80" />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#202024', marginBottom: '0.75rem' }}>Check Your Email</h2>
            <p style={{ color: '#6B7280', marginBottom: '2rem' }}>We've sent a reset link to <strong>{email}</strong>. Check your inbox.</p>
          </div>
        )}

        <Link to="/login" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6860B8', textDecoration: 'none', fontWeight: 500, marginTop: '1.5rem', justifyContent: 'center' }}>
          <ArrowLeft size={16} /> Back to Login
        </Link>
      </div>
    </div>
  );
}
