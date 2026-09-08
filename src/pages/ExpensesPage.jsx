import React, { useState } from 'react';
import { Plus, DollarSign, CheckCircle, X, Users, PieChart, TrendingUp, Receipt } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import { useApp } from '../context/AppContext';
import { PieChart as RechartsPie, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const COLORS = ['#8F88DD', '#F3A9C7', '#6860B8', '#4ADE80', '#F59E0B', '#EC4899'];
const CATEGORIES = ['Accommodation', 'Food', 'Transport', 'Activities', 'Shopping', 'Emergency', 'Other'];

export default function ExpensesPage() {
  const { state, actions } = useApp();
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({ title: '', amount: '', category: 'Food', paidBy: '', splitBetween: [] });
  const [activeGroup, setActiveGroup] = useState(state.groups.find(g => g.members?.includes(state.currentUser?.id))?.id || null);
  const [adding, setAdding] = useState(false);

  const myGroups = state.groups.filter(g => g.members?.includes(state.currentUser?.id));
  const groupExpenses = state.expenses.filter(e => e.groupId === activeGroup);
  const activeGroupData = state.groups.find(g => g.id === activeGroup);
  const groupMembers = activeGroupData?.members?.map(id => state.users.find(u => u.id === id)).filter(Boolean) || [];

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleSplit = (uid) => setForm(f => ({
    ...f,
    splitBetween: f.splitBetween.includes(uid) ? f.splitBetween.filter(id => id !== uid) : [...f.splitBetween, uid]
  }));

  const handleAdd = async () => {
    if (!form.title || !form.amount || !form.paidBy) { actions.showToast('Fill title, amount and payer.', 'error'); return; }
    setAdding(true);
    await new Promise(r => setTimeout(r, 600));
    const splitBetween = form.splitBetween.length ? form.splitBetween : groupMembers.map(m => m.id);
    actions.addExpense({
      ...form,
      amount: Number(form.amount),
      groupId: activeGroup,
      splitBetween,
      date: new Date().toISOString().split('T')[0],
    });
    setForm({ title: '', amount: '', category: 'Food', paidBy: '', splitBetween: [] });
    setAddOpen(false);
    setAdding(false);
    actions.showToast('Expense added!', 'success');
  };

  // Summary calculations
  const totalSpent = groupExpenses.reduce((a, e) => a + Number(e.amount), 0);

  const byCategory = CATEGORIES.map(cat => ({
    name: cat,
    value: groupExpenses.filter(e => e.category === cat).reduce((a, e) => a + Number(e.amount), 0),
  })).filter(c => c.value > 0);

  // Per-person balance
  const balances = groupMembers.map(member => {
    const paid = groupExpenses.filter(e => e.paidBy === member.id).reduce((a, e) => a + Number(e.amount), 0);
    const owed = groupExpenses.reduce((a, e) => {
      if ((e.splitBetween || []).includes(member.id)) return a + Number(e.amount) / (e.splitBetween.length || 1);
      return a;
    }, 0);
    return { member, paid, owed, net: paid - owed };
  });

  // Settlements
  const settlements = [];
  const pos = balances.filter(b => b.net > 0).map(b => ({ ...b }));
  const neg = balances.filter(b => b.net < 0).map(b => ({ ...b }));
  pos.forEach(creditor => {
    neg.forEach(debtor => {
      if (creditor.net > 0 && debtor.net < 0) {
        const amount = Math.min(creditor.net, -debtor.net);
        if (amount > 0.5) {
          settlements.push({ from: debtor.member, to: creditor.member, amount: Math.round(amount) });
          creditor.net -= amount;
          debtor.net += amount;
        }
      }
    });
  });

  return (
    <AppLayout title="Expense Splitter" subtitle="Track and split group travel expenses fairly.">
      <div style={{ maxWidth: 900, margin: '0 auto' }}>

        {/* Group selector */}
        {myGroups.length > 0 && (
          <div style={{ display: 'flex', gap: '0.625rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            {myGroups.map(g => (
              <button key={g.id} onClick={() => setActiveGroup(g.id)} className={activeGroup === g.id ? 'btn-primary' : 'btn-secondary'} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                {g.name}
              </button>
            ))}
          </div>
        )}

        {!activeGroup ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#9CA3AF' }}>
            <DollarSign size={48} style={{ marginBottom: '1rem', opacity: 0.4 }} />
            <p style={{ fontWeight: 600, color: '#202024' }}>No groups yet.</p>
            <p>Create a travel group first to track shared expenses.</p>
          </div>
        ) : (
          <>
            {/* Summary cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                { label: 'Total Spent', value: `₹${totalSpent.toLocaleString()}`, icon: DollarSign, color: '#8F88DD' },
                { label: 'Expenses', value: groupExpenses.length, icon: Receipt, color: '#F3A9C7' },
                { label: 'Members', value: groupMembers.length, icon: Users, color: '#6860B8' },
                { label: 'Per Person', value: groupMembers.length ? `₹${Math.round(totalSpent / groupMembers.length).toLocaleString()}` : '₹0', icon: TrendingUp, color: '#4ADE80' },
              ].map(stat => (
                <div key={stat.label} className="card" style={{ padding: '1.25rem' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '0.625rem', background: stat.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.625rem' }}>
                    <stat.icon size={18} color={stat.color} />
                  </div>
                  <div style={{ fontSize: '1.375rem', fontWeight: 800, color: '#202024' }}>{stat.value}</div>
                  <div style={{ fontSize: '0.8rem', color: '#8F88DD', fontWeight: 500 }}>{stat.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }} className="exp-grid">
              <style>{`@media(max-width:700px){.exp-grid{grid-template-columns:1fr!important;}}`}</style>

              {/* Pie chart */}
              {byCategory.length > 0 && (
                <div className="card" style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontWeight: 700, color: '#202024', marginBottom: '1rem', fontSize: '0.9375rem' }}>
                    <PieChart size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />Spending by Category
                  </h3>
                  <ResponsiveContainer width="100%" height={180}>
                    <RechartsPie>
                      <Pie data={byCategory} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                        {byCategory.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Pie>
                      <Tooltip formatter={v => `₹${Number(v).toLocaleString()}`} />
                    </RechartsPie>
                  </ResponsiveContainer>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {byCategory.map((c, i) => (
                      <span key={c.name} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: '#6B7280' }}>
                        <span style={{ width: 10, height: 10, background: COLORS[i % COLORS.length], borderRadius: '50%', display: 'inline-block' }} />
                        {c.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Settlements */}
              <div className="card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontWeight: 700, color: '#202024', marginBottom: '1rem', fontSize: '0.9375rem' }}>💸 Who Owes Who</h3>
                {settlements.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '1.5rem 0', color: '#9CA3AF' }}>
                    <CheckCircle size={32} color="#4ADE80" style={{ marginBottom: '0.5rem' }} />
                    <p style={{ fontWeight: 600, color: '#166534' }}>All settled up!</p>
                  </div>
                ) : settlements.map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: '#FFF7ED', borderRadius: '0.875rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                    <img src={s.from.avatar} alt="" style={{ width: 32, height: 32, borderRadius: '50%', background: '#EAE8FF' }} />
                    <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>owes</span>
                    <img src={s.to.avatar} alt="" style={{ width: 32, height: 32, borderRadius: '50%', background: '#EAE8FF' }} />
                    <span style={{ fontWeight: 700, color: '#202024', fontSize: '0.9375rem' }}>₹{s.amount.toLocaleString()}</span>
                    <button onClick={() => actions.showToast(`Payment reminder sent to ${s.from.name}!`, 'success')} className="btn-secondary" style={{ marginLeft: 'auto', padding: '0.3rem 0.75rem', fontSize: '0.75rem' }}>
                      Remind
                    </button>
                  </div>
                ))}

                {/* Balance per person */}
                <div style={{ marginTop: '1rem', borderTop: '1px dashed rgba(143,136,221,0.2)', paddingTop: '0.875rem' }}>
                  {balances.map(b => (
                    <div key={b.member.id} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.5rem' }}>
                      <img src={b.member.avatar} alt="" style={{ width: 28, height: 28, borderRadius: '50%', background: '#EAE8FF' }} />
                      <span style={{ flex: 1, fontSize: '0.8125rem', color: '#202024', fontWeight: 500 }}>{b.member.name}</span>
                      <span style={{ fontSize: '0.875rem', fontWeight: 700, color: b.net >= 0 ? '#166534' : '#DC2626' }}>
                        {b.net >= 0 ? '+' : ''}₹{Math.round(b.net).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Expense list */}
            <div className="card" style={{ marginBottom: '1.5rem', padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ fontWeight: 700, color: '#202024', fontSize: '0.9375rem' }}>All Expenses</h3>
                <button onClick={() => setAddOpen(true)} className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                  <Plus size={14} /> Add Expense
                </button>
              </div>

              {groupExpenses.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#9CA3AF' }}>
                  <p>No expenses recorded yet. Add your first expense!</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {groupExpenses.map(exp => {
                    const payer = state.users.find(u => u.id === exp.paidBy);
                    const perPerson = Math.round(Number(exp.amount) / (exp.splitBetween?.length || 1));
                    return (
                      <div key={exp.id} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '0.875rem', background: '#F8F7FF', borderRadius: '0.875rem', flexWrap: 'wrap' }}>
                        <div style={{ width: 40, height: 40, borderRadius: '0.75rem', background: COLORS[CATEGORIES.indexOf(exp.category) % COLORS.length] + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Receipt size={18} color={COLORS[CATEGORIES.indexOf(exp.category) % COLORS.length]} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: 600, color: '#202024', fontSize: '0.9rem' }}>{exp.title}</div>
                          <div style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>
                            {exp.category} · {exp.date}
                            {payer && ` · Paid by ${payer.name}`}
                          </div>
                        </div>
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                          <div style={{ fontWeight: 700, color: '#202024', fontSize: '1rem' }}>₹{Number(exp.amount).toLocaleString()}</div>
                          <div style={{ fontSize: '0.75rem', color: '#8F88DD' }}>₹{perPerson.toLocaleString()}/person</div>
                        </div>
                        <span style={{ padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, background: COLORS[CATEGORIES.indexOf(exp.category) % COLORS.length] + '22', color: COLORS[CATEGORIES.indexOf(exp.category) % COLORS.length] }}>
                          {exp.category}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}

        {/* Add Expense Modal */}
        {addOpen && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
            <div className="card" style={{ width: '100%', maxWidth: 460, padding: '1.5rem', maxHeight: '90vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem', alignItems: 'center' }}>
                <h3 style={{ fontWeight: 700, color: '#202024' }}>Add Expense</h3>
                <button onClick={() => setAddOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} color="#9CA3AF" /></button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#202024', display: 'block', marginBottom: '0.375rem' }}>Title *</label>
                  <input className="input" placeholder="e.g. Beach dinner" value={form.title} onChange={e => set('title', e.target.value)} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#202024', display: 'block', marginBottom: '0.375rem' }}>Amount (₹) *</label>
                    <input className="input" type="number" placeholder="1500" value={form.amount} onChange={e => set('amount', e.target.value)} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#202024', display: 'block', marginBottom: '0.375rem' }}>Category</label>
                    <select className="input" value={form.category} onChange={e => set('category', e.target.value)} style={{ appearance: 'none' }}>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#202024', display: 'block', marginBottom: '0.375rem' }}>Paid By *</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {groupMembers.map(m => (
                      <div key={m.id} onClick={() => set('paidBy', m.id)} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0.75rem', borderRadius: '0.75rem', border: `2px solid ${form.paidBy === m.id ? '#6860B8' : 'rgba(143,136,221,0.2)'}`, background: form.paidBy === m.id ? '#EAE8FF' : 'white', cursor: 'pointer' }}>
                        <img src={m.avatar} alt="" style={{ width: 28, height: 28, borderRadius: '50%', background: '#EAE8FF' }} />
                        <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#202024' }}>{m.name}</span>
                        {form.paidBy === m.id && <CheckCircle size={16} color="#6860B8" style={{ marginLeft: 'auto' }} />}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#202024', display: 'block', marginBottom: '0.375rem' }}>Split Between</label>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {groupMembers.map(m => (
                      <button key={m.id} type="button" onClick={() => toggleSplit(m.id)} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.35rem 0.75rem', borderRadius: '9999px', border: `1.5px solid ${form.splitBetween.includes(m.id) ? '#6860B8' : 'rgba(143,136,221,0.25)'}`, background: form.splitBetween.includes(m.id) ? '#EAE8FF' : 'white', color: form.splitBetween.includes(m.id) ? '#6860B8' : '#6B7280', fontSize: '0.8125rem', fontWeight: 500, cursor: 'pointer', fontFamily: 'Poppins,sans-serif' }}>
                        {m.name.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                  <p style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '0.375rem' }}>Leave unselected to split equally among all members.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button onClick={() => setAddOpen(false)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>Cancel</button>
                <button onClick={handleAdd} disabled={adding} className="btn-primary" style={{ flex: 2, justifyContent: 'center' }}>
                  {adding ? 'Adding…' : 'Add Expense'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
