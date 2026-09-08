import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle, XCircle, Info } from 'lucide-react';

export default function Toast() {
  const { state } = useApp();
  if (!state.toast) return null;
  const { message, type } = state.toast;
  const icons = { success: <CheckCircle size={18} className="text-green-400" />, error: <XCircle size={18} className="text-red-400" />, info: <Info size={18} className="text-brand-lavender" /> };
  const borders = { success: 'toast-success', error: 'toast-error', info: 'toast-info' };
  return (
    <div className={`toast ${borders[type] || 'toast-info'}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
      {icons[type] || icons.info}
      <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{message}</span>
    </div>
  );
}
