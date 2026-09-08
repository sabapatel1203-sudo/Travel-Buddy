import React, { useState } from 'react';
import { Zap, MapPin, Calendar, Sun, Coffee, Moon, Bot, Send, ChevronDown, ChevronUp, Navigation, Users, Compass, Sparkles, Check, RefreshCw } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import { useApp } from '../context/AppContext';
import { generateItinerary } from '../services/tripCraft';
import { getTravelAssistantResponse, SUGGESTED_QUESTIONS } from '../services/travelAssistant';
import { DESTINATIONS, TRAVEL_STYLES, FOOD_PREFS } from '../data/demoData';
import { DEMO_ITINERARY } from '../data/demoData';
import { getTripCountdownText, getFutureDateStr } from '../utils/dateUtils';

const SLOT_ICONS = { Morning: Sun, Afternoon: Coffee, Evening: Moon };
const TYPE_COLORS = { adventure: '#8F88DD', beach: '#F3A9C7', culture: '#6860B8', leisure: '#4ADE80', food: '#F59E0B', nature: '#10B981', transport: '#9CA3AF', shopping: '#EC4899' };

const STARTING_CITIES = ['Mumbai', 'Delhi', 'Bengaluru', 'Pune', 'Hyderabad', 'Chennai', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Chandigarh'];
const GROUP_TYPES = ['Solo Traveler 👤', 'Couple ❤️', 'Friends Crew 👥', 'Family with Kids 👨‍👩‍👧', 'Work / Business 💼'];
const ACCOMMODATION_TYPES = ['Hostels & Backpackers 🎒', '3-Star & Boutique Hotels 🏨', 'Luxury Resorts & Villas 🏰', 'Homestays & Heritage 🏡', 'Camping & Eco Tents ⛺'];
const TRANSPORT_MODES = ['Flights & Cabs ✈️', 'Train Journey 🚆', 'Road Trip / Self-Drive 🚗', 'Bus & Local Transit 🚌', 'Mix of All 🚴'];
const TRAVEL_PACES = ['Relaxed & Slow ☕', 'Balanced & Flexible ⚖️', 'Fast-Paced & Packed ⚡'];

const ALL_INTEREST_CHIPS = [
  { label: 'Beaches', emoji: '🏖️' },
  { label: 'Mountains', emoji: '⛰️' },
  { label: 'Adventure', emoji: '🏔️' },
  { label: 'Nightlife', emoji: '🎉' },
  { label: 'Heritage', emoji: '🏰' },
  { label: 'Photography', emoji: '📸' },
  { label: 'Foodie', emoji: '🍜' },
  { label: 'Nature', emoji: '🌿' },
  { label: 'Shopping', emoji: '🛍️' },
  { label: 'Trekking', emoji: '🥾' },
  { label: 'Spiritual', emoji: '🕉️' },
  { label: 'Wellness', emoji: '🧘' },
];

const QUICK_PRESETS = [
  {
    title: '🏖️ Goa Beach Party',
    startingLocation: 'Mumbai',
    destination: 'Goa',
    startDate: getFutureDateStr(20),
    days: 5,
    budget: 18000,
    travelStyle: 'Backpacker',
    foodPreference: 'Vegetarian',
    groupType: 'Friends Crew 👥',
    accommodation: 'Hostels & Backpackers 🎒',
    transportMode: 'Train Journey 🚆',
    travelPace: 'Balanced & Flexible ⚖️',
    interests: ['Beaches', 'Adventure', 'Nightlife', 'Photography'],
  },
  {
    title: '🏔️ Manali Snow & Trek',
    startingLocation: 'Delhi',
    destination: 'Manali',
    startDate: getFutureDateStr(15),
    days: 6,
    budget: 25000,
    travelStyle: 'Balanced',
    foodPreference: 'Non-Vegetarian',
    groupType: 'Solo Traveler 👤',
    accommodation: '3-Star & Boutique Hotels 🏨',
    transportMode: 'Bus & Local Transit 🚌',
    travelPace: 'Fast-Paced & Packed ⚡',
    interests: ['Mountains', 'Adventure', 'Trekking', 'Photography'],
  },
  {
    title: '🕉️ Rishikesh Yoga Retreat',
    startingLocation: 'Delhi',
    destination: 'Rishikesh',
    startDate: getFutureDateStr(10),
    days: 4,
    budget: 12000,
    travelStyle: 'Budget',
    foodPreference: 'Vegetarian',
    groupType: 'Solo Traveler 👤',
    accommodation: 'Homestays & Heritage 🏡',
    transportMode: 'Train Journey 🚆',
    travelPace: 'Relaxed & Slow ☕',
    interests: ['Spiritual', 'Wellness', 'Nature', 'Trekking'],
  },
  {
    title: '🌿 Kerala Backwaters',
    startingLocation: 'Bengaluru',
    destination: 'Kerala',
    startDate: getFutureDateStr(25),
    days: 7,
    budget: 22000,
    travelStyle: 'Comfort',
    foodPreference: 'Non-Vegetarian',
    groupType: 'Couple ❤️',
    accommodation: 'Homestays & Heritage 🏡',
    transportMode: 'Flights & Cabs ✈️',
    travelPace: 'Relaxed & Slow ☕',
    interests: ['Nature', 'Foodie', 'Beaches', 'Photography'],
  },
  {
    title: '🏰 Jaipur Royal Heritage',
    startingLocation: 'Delhi',
    destination: 'Jaipur',
    startDate: getFutureDateStr(30),
    days: 4,
    budget: 15000,
    travelStyle: 'Balanced',
    foodPreference: 'Vegetarian',
    groupType: 'Family with Kids 👨‍👩‍👧',
    accommodation: '3-Star & Boutique Hotels 🏨',
    transportMode: 'Road Trip / Self-Drive 🚗',
    travelPace: 'Balanced & Flexible ⚖️',
    interests: ['Heritage', 'Shopping', 'Foodie', 'Photography'],
  },
];

export default function TripPlannerPage() {
  const { state, actions } = useApp();
  const [form, setForm] = useState({
    startingLocation: 'Mumbai',
    destination: 'Goa',
    startDate: getFutureDateStr(20),
    days: 5,
    budget: 18000,
    currency: 'INR',
    travelStyle: 'Backpacker',
    groupType: 'Friends Crew 👥',
    accommodation: 'Hostels & Backpackers 🎒',
    transportMode: 'Train Journey 🚆',
    travelPace: 'Balanced & Flexible ⚖️',
    foodPreference: 'Vegetarian',
    interests: ['Beaches', 'Adventure', 'Photography'],
  });

  const [itinerary, setItinerary] = useState(() => generateItinerary(form));
  const [loading, setLoading] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiHistory, setAiHistory] = useState([
    { role: 'assistant', text: "👋 Hi! I'm your AI Travel Assistant. Ask me anything about your trip — food, activities, safety, budget tips and more!" }
  ]);
  const [aiInput, setAiInput] = useState('');
  const [expandedDays, setExpandedDays] = useState([0]);

  const handleAiSend = async () => {
    if (!aiInput.trim()) return;
    const userMsg = aiInput.trim();
    setAiHistory(h => [...h, { role: 'user', text: userMsg }]);
    setAiInput('');
    await new Promise(r => setTimeout(r, 800));
    const response = getTravelAssistantResponse(userMsg, form);
    setAiHistory(h => [...h, { role: 'assistant', text: response }]);
  };

  const toggleDay = (i) => setExpandedDays(d => d.includes(i) ? d.filter(x => x !== i) : [...d, i]);

  return (
    <AppLayout title="TripCraft AI" subtitle="Explore your AI-powered travel itinerary.">
      <div style={{ maxWidth: 960, margin: '0 auto' }}>

        {/* Generated itinerary */}
        {itinerary && (
          <>
            {/* Budget summary */}
            <div className="card" style={{ marginBottom: '1.25rem', padding: '1.5rem', background: 'linear-gradient(135deg,#8F88DD,#6860B8)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h3 style={{ fontWeight: 700, color: 'white', fontSize: '1rem', margin: 0 }}>📊 Estimated Budget Breakdown</h3>
                {form.startDate && getTripCountdownText(form.startDate) && (
                  <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#202024', background: 'white', padding: '0.3rem 0.75rem', borderRadius: '9999px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                    {getTripCountdownText(form.startDate)} ({form.startDate})
                  </span>
                )}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(120px,1fr))', gap: '1rem' }}>
                {[
                  { label: 'Accommodation', amount: itinerary.totalBudget.accommodation },
                  { label: 'Food', amount: itinerary.totalBudget.food },
                  { label: 'Transport', amount: itinerary.totalBudget.transport },
                  { label: 'Activities', amount: itinerary.totalBudget.activities },
                  { label: 'Emergency', amount: itinerary.totalBudget.emergency },
                ].map(item => (
                  <div key={item.label} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.15)', borderRadius: '0.875rem', padding: '0.875rem' }}>
                    <div style={{ fontSize: '1.125rem', fontWeight: 800, color: '#F3A9C7' }}>₹{item.amount?.toLocaleString()}</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)', marginTop: '0.25rem' }}>{item.label}</div>
                  </div>
                ))}
                <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.25)', borderRadius: '0.875rem', padding: '0.875rem', border: '2px solid rgba(255,255,255,0.4)' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white' }}>₹{itinerary.totalBudget.total?.toLocaleString()}</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)' }}>Total</div>
                </div>
              </div>
            </div>

            {/* Day-by-day */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              {itinerary.itinerary.map((day, di) => (
                <div key={di} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                  <button onClick={() => toggleDay(di)} style={{ width: '100%', padding: '1.25rem 1.5rem', background: expandedDays.includes(di) ? 'linear-gradient(135deg,#8F88DD22,#EAE8FF)' : 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'Poppins,sans-serif' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: 44, height: 44, borderRadius: '0.875rem', background: 'linear-gradient(135deg,#8F88DD,#6860B8)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '1rem' }}>
                        {day.day}
                      </div>
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontWeight: 700, color: '#202024' }}>Day {day.day}</div>
                        <div style={{ fontSize: '0.875rem', color: '#8F88DD' }}>{day.theme}</div>
                      </div>
                    </div>
                    {expandedDays.includes(di) ? <ChevronUp size={20} color="#8F88DD" /> : <ChevronDown size={20} color="#8F88DD" />}
                  </button>

                  {expandedDays.includes(di) && (
                    <div style={{ padding: '0 1.5rem 1.5rem' }}>
                      {day.slots?.map((slot, si) => {
                        const Icon = SLOT_ICONS[slot.time] || Sun;
                        const color = TYPE_COLORS[slot.type] || '#8F88DD';
                        return (
                          <div key={si} style={{ display: 'flex', gap: '1rem', padding: '1rem 0', borderBottom: si < day.slots.length - 1 ? '1px dashed rgba(143,136,221,0.2)' : 'none' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', flexShrink: 0, width: 44 }}>
                              <div style={{ width: 36, height: 36, borderRadius: '0.625rem', background: color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Icon size={16} color={color} />
                              </div>
                              <span style={{ fontSize: '0.7rem', color: '#9CA3AF', fontWeight: 600 }}>{slot.time}</span>
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: 600, color: '#202024', marginBottom: '0.25rem', fontSize: '0.9375rem' }}>{slot.activity}</div>
                              <div style={{ fontSize: '0.8125rem', color: '#8F88DD', marginBottom: '0.5rem' }}>📍 {slot.location}</div>
                              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', fontSize: '0.8rem' }}>
                                <span style={{ color: '#166534' }}>💰 ₹{slot.estimatedCost?.toLocaleString()}</span>
                                {slot.travelTime && <span style={{ color: '#6B7280' }}>🕐 {slot.travelTime}</span>}
                              </div>
                              {slot.food && (
                                <div style={{ marginTop: '0.375rem', fontSize: '0.8125rem', color: '#F59E0B' }}>🍽️ {slot.food}</div>
                              )}
                              {slot.safetyTip && (
                                <div style={{ marginTop: '0.375rem', fontSize: '0.8125rem', color: '#6860B8', background: '#EAE8FF', padding: '0.25rem 0.625rem', borderRadius: '9999px', display: 'inline-block' }}>
                                  🛡️ {slot.safetyTip}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* AI Assistant floating */}
        <div style={{ position: 'fixed', bottom: '2rem', right: '1.5rem', zIndex: 50 }} className="ai-float">
          <style>{`@media(max-width:768px){.ai-float{bottom:5rem!important;}}`}</style>
          {aiOpen && (
            <div className="card animate-fade-in" style={{ width: 320, marginBottom: '0.75rem', padding: 0, overflow: 'hidden', maxHeight: 420 }}>
              <div style={{ background: 'linear-gradient(135deg,#8F88DD,#6860B8)', padding: '0.875rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Bot size={18} color="white" />
                <span style={{ fontWeight: 700, color: 'white', fontSize: '0.9rem' }}>AI Travel Assistant</span>
              </div>
              <div style={{ height: 200, overflowY: 'auto', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {aiHistory.map((msg, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                    <div style={{ maxWidth: '85%', padding: '0.5rem 0.875rem', borderRadius: msg.role === 'user' ? '1rem 1rem 0.25rem 1rem' : '1rem 1rem 1rem 0.25rem', background: msg.role === 'user' ? 'linear-gradient(135deg,#8F88DD,#6860B8)' : '#F8F7FF', color: msg.role === 'user' ? 'white' : '#202024', fontSize: '0.8125rem', lineHeight: 1.5, border: msg.role === 'assistant' ? '1px solid rgba(143,136,221,0.15)' : 'none' }}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ padding: '0.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', borderTop: '1px solid rgba(143,136,221,0.1)' }}>
                {SUGGESTED_QUESTIONS.slice(0, 3).map(q => (
                  <button key={q} onClick={() => setAiInput(q)} style={{ background: '#EAE8FF', color: '#6860B8', border: 'none', borderRadius: '9999px', padding: '0.25rem 0.625rem', fontSize: '0.7rem', cursor: 'pointer', fontFamily: 'Poppins,sans-serif' }}>{q}</button>
                ))}
              </div>
              <div style={{ padding: '0.75rem', borderTop: '1px solid rgba(143,136,221,0.1)', display: 'flex', gap: '0.5rem' }}>
                <input value={aiInput} onChange={e => setAiInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAiSend()} placeholder="Ask anything…" style={{ flex: 1, border: '1.5px solid rgba(143,136,221,0.3)', borderRadius: '0.75rem', padding: '0.5rem 0.75rem', fontFamily: 'Poppins,sans-serif', fontSize: '0.8125rem', outline: 'none', background: '#F8F7FF' }} />
                <button onClick={handleAiSend} style={{ background: 'linear-gradient(135deg,#8F88DD,#6860B8)', color: 'white', border: 'none', borderRadius: '0.75rem', padding: '0.5rem 0.75rem', cursor: 'pointer' }}>
                  <Send size={14} />
                </button>
              </div>
            </div>
          )}
          <button onClick={() => setAiOpen(!aiOpen)} style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg,#8F88DD,#6860B8)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(104,96,184,0.4)', marginLeft: 'auto' }}>
            <Bot size={24} color="white" />
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
