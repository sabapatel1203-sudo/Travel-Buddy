import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { DEMO_USERS, DEMO_TRIPS, DEMO_MATCHES, DEMO_MESSAGES, DEMO_GROUPS, DEMO_EXPENSES, DEMO_NOTIFICATIONS, DEMO_REVIEWS } from '../data/demoData';

const AppContext = createContext();

const initialReviews = (() => {
  try {
    const stored = localStorage.getItem('tb_reviews');
    return stored ? JSON.parse(stored) : DEMO_REVIEWS;
  } catch {
    return DEMO_REVIEWS;
  }
})();

const initialState = {
  // Auth
  currentUser: DEMO_USERS.find(u => u.id === 'demo') || DEMO_USERS[0],
  isAuthenticated: true,
  isLoading: false,

  // Data
  users: DEMO_USERS,
  trips: DEMO_TRIPS,
  matches: DEMO_MATCHES,
  conversations: DEMO_MESSAGES,
  groups: DEMO_GROUPS,
  expenses: DEMO_EXPENSES,
  notifications: DEMO_NOTIFICATIONS,
  reviews: initialReviews,

  // UI
  toast: null,
  activeTrip: null,
  onboardingStep: 0,
  onboardingData: {},

  // Saved items
  savedUsers: [],
  savedTrips: [],

  // Connections
  connectedUserIds: ['u1', 'u2', 'u4', 'u8'],
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    case 'LOGIN_SUCCESS':
      return { ...state, currentUser: action.payload, isAuthenticated: true, isLoading: false };

    case 'LOGOUT':
      return { ...state, currentUser: null, isAuthenticated: false };

    case 'UPDATE_PROFILE':
      return {
        ...state,
        currentUser: { ...state.currentUser, ...action.payload },
        users: state.users.map(u => u.id === state.currentUser?.id ? { ...u, ...action.payload } : u),
      };

    case 'SHOW_TOAST':
      return { ...state, toast: action.payload };

    case 'HIDE_TOAST':
      return { ...state, toast: null };

    case 'ADD_TRIP':
      return { ...state, trips: [...state.trips, action.payload] };

    case 'UPDATE_TRIP':
      return { ...state, trips: state.trips.map(t => t.id === action.payload.id ? { ...t, ...action.payload } : t) };

    case 'ADD_MESSAGE': {
      const { conversationId, message } = action.payload;
      const existing = state.conversations.find(c => c.id === conversationId);
      if (existing) {
        return {
          ...state,
          conversations: state.conversations.map(c =>
            c.id === conversationId ? { ...c, messages: [...c.messages, message] } : c
          )
        };
      }
      return {
        ...state,
        conversations: [...state.conversations, { id: conversationId, participants: [state.currentUser?.id, action.payload.receiverId], messages: [message] }]
      };
    }

    case 'ADD_GROUP':
      return { ...state, groups: [...state.groups, action.payload] };

    case 'UPDATE_GROUP':
      return { ...state, groups: state.groups.map(g => g.id === action.payload.id ? { ...g, ...action.payload } : g) };

    case 'ADD_EXPENSE':
      return { ...state, expenses: [...state.expenses, action.payload] };

    case 'DELETE_EXPENSE':
      return { ...state, expenses: state.expenses.filter(e => e.id !== action.payload) };

    case 'UPDATE_MATCH':
      return { ...state, matches: state.matches.map(m => m.id === action.payload.id ? { ...m, ...action.payload } : m) };

    case 'ADD_MATCH':
      return { ...state, matches: [...state.matches, action.payload] };

    case 'CONNECT_TRAVELLER': {
      const { userId, conversation, notification } = action.payload;
      const alreadyConnected = (state.connectedUserIds || []).includes(userId);
      const updatedConnected = alreadyConnected ? state.connectedUserIds : [...(state.connectedUserIds || []), userId];

      const updatedMatches = state.matches.map(m =>
        (m.matchedUserId === userId || m.userId === userId) ? { ...m, status: 'connected' } : m
      );

      const existingConv = state.conversations.find(c =>
        c.participants.includes(userId) && c.participants.includes(state.currentUser?.id || 'demo')
      );
      let updatedConvs = state.conversations;
      if (!existingConv && conversation) {
        updatedConvs = [conversation, ...state.conversations];
      }

      const updatedNotifications = notification ? [notification, ...state.notifications] : state.notifications;

      return {
        ...state,
        connectedUserIds: updatedConnected,
        matches: updatedMatches,
        conversations: updatedConvs,
        notifications: updatedNotifications,
      };
    }

    case 'ADD_REVIEW': {
      const newReview = action.payload;
      const updatedReviews = [newReview, ...state.reviews];
      try {
        localStorage.setItem('tb_reviews', JSON.stringify(updatedReviews));
      } catch (e) {}

      // Recalculate reviewed user rating & review count
      const targetUser = state.users.find(u => u.id === newReview.reviewedUserId);
      let updatedUsers = state.users;
      if (targetUser) {
        const userRevs = updatedReviews.filter(r => r.reviewedUserId === newReview.reviewedUserId);
        const totalRating = userRevs.reduce((sum, r) => sum + (Number(r.rating?.overall) || Number(r.rating) || 5), 0);
        const newAvg = Number((totalRating / userRevs.length).toFixed(1));
        const updatedUser = {
          ...targetUser,
          rating: newAvg,
          reviewCount: userRevs.length,
        };
        updatedUsers = state.users.map(u => u.id === targetUser.id ? updatedUser : u);
      }

      return {
        ...state,
        reviews: updatedReviews,
        users: updatedUsers,
      };
    }

    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(n => n.id === action.payload ? { ...n, read: true } : n)
      };

    case 'MARK_ALL_NOTIFICATIONS_READ':
      return { ...state, notifications: state.notifications.map(n => ({ ...n, read: true })) };

    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [action.payload, ...state.notifications] };

    case 'TOGGLE_SAVE_USER': {
      const userId = action.payload;
      const isSaved = state.savedUsers.includes(userId);
      return { ...state, savedUsers: isSaved ? state.savedUsers.filter(id => id !== userId) : [...state.savedUsers, userId] };
    }

    case 'TOGGLE_SAVE_TRIP': {
      const tripId = action.payload;
      const isSaved = state.savedTrips.includes(tripId);
      return { ...state, savedTrips: isSaved ? state.savedTrips.filter(id => id !== tripId) : [...state.savedTrips, tripId] };
    }

    case 'SET_ONBOARDING_STEP':
      return { ...state, onboardingStep: action.payload };

    case 'UPDATE_ONBOARDING_DATA':
      return { ...state, onboardingData: { ...state.onboardingData, ...action.payload } };

    case 'SET_ACTIVE_TRIP':
      return { ...state, activeTrip: action.payload };

    case 'READ_MESSAGES': {
      const convId = action.payload;
      return {
        ...state,
        conversations: state.conversations.map(c =>
          c.id === convId
            ? { ...c, messages: c.messages.map(m => ({ ...m, read: true })) }
            : c
        )
      };
    }

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Auto-hide toast
  useEffect(() => {
    if (state.toast) {
      const timer = setTimeout(() => dispatch({ type: 'HIDE_TOAST' }), 3500);
      return () => clearTimeout(timer);
    }
  }, [state.toast]);

  // Load session from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('tb_user');
    if (saved) {
      try {
        const user = JSON.parse(saved);
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } catch {}
    }
  }, []);

  const actions = {
    login: async (email, password) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      await delay(800);
      
      const cleanEmail = (email || '').trim().toLowerCase();
      
      // Load registered users from localStorage
      let registeredUsers = [];
      try {
        const stored = localStorage.getItem('tb_registered_users');
        if (stored) registeredUsers = JSON.parse(stored);
      } catch (e) {}

      // Find in registered users, state users, or DEMO_USERS
      let user = registeredUsers.find(u => u.email?.toLowerCase() === cleanEmail) ||
                 state.users.find(u => u.email?.toLowerCase() === cleanEmail) ||
                 DEMO_USERS.find(u => u.email?.toLowerCase() === cleanEmail);

      // If user exists and password meets length requirement
      if (user && (password || '').length >= 4) {
        localStorage.setItem('tb_user', JSON.stringify(user));
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        return { success: true };
      }

      // If valid email and password provided, automatically register/authenticate profile
      if (cleanEmail.includes('@') && (password || '').length >= 4) {
        const username = cleanEmail.split('@')[0];
        const formattedName = username.charAt(0).toUpperCase() + username.slice(1);
        const newUser = {
          id: 'u_' + Date.now(),
          name: formattedName,
          username: username,
          email: cleanEmail,
          password: password,
          location: 'India',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}&backgroundColor=b6e3f4`,
          bio: 'Passionate traveller looking for friendly travel buddies and new experiences.',
          trustScore: 88,
          rating: 5.0,
          reviewCount: 1,
          trips: [],
          joinedDate: new Date().toISOString().split('T')[0],
          verification: { email: true, phone: true, identity: true },
          travelDNA: { adventure: 75, relaxation: 65, foodExplorer: 80, photography: 85, social: 90, budget: 70 },
          interests: ['Travel', 'Culture', 'Photography'],
          travelStyle: 'Balanced',
          foodPreference: 'No Preference',
          travelPace: 'Balanced',
          groupPreference: '3-4 people',
          safetyPrefs: ['Verified users only'],
        };

        registeredUsers.push(newUser);
        try {
          localStorage.setItem('tb_registered_users', JSON.stringify(registeredUsers));
          localStorage.setItem('tb_user', JSON.stringify(newUser));
        } catch (e) {}

        dispatch({ type: 'LOGIN_SUCCESS', payload: newUser });
        return { success: true, user: newUser };
      }

      dispatch({ type: 'SET_LOADING', payload: false });
      return { success: false, error: 'Invalid email or password. Password must be at least 4 characters.' };
    },

    loginDemo: async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      await delay(600);
      const demoUser = DEMO_USERS.find(u => u.id === 'demo') || DEMO_USERS[0];
      localStorage.setItem('tb_user', JSON.stringify(demoUser));
      dispatch({ type: 'LOGIN_SUCCESS', payload: demoUser });
      return { success: true };
    },

    register: async (userData) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      await delay(1000);
      const cleanEmail = (userData.email || '').trim().toLowerCase();
      const newUser = {
        id: 'u_' + Date.now(),
        ...userData,
        email: cleanEmail,
        location: userData.country || 'India',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.username || cleanEmail}&backgroundColor=b6e3f4`,
        trustScore: 88,
        rating: 5.0,
        reviewCount: 1,
        trips: [],
        joinedDate: new Date().toISOString().split('T')[0],
        verification: { email: true, phone: true, identity: false },
        travelDNA: { adventure: 75, relaxation: 60, foodExplorer: 75, photography: 70, social: 80, budget: 75 },
        interests: ['Adventure', 'Culture', 'Travel'],
        travelStyle: 'Balanced',
        foodPreference: 'No Preference',
        travelPace: 'Balanced',
        groupPreference: '3-4 people',
        safetyPrefs: ['Verified users only'],
      };

      let registeredUsers = [];
      try {
        const stored = localStorage.getItem('tb_registered_users');
        if (stored) registeredUsers = JSON.parse(stored);
      } catch (e) {}

      registeredUsers = registeredUsers.filter(u => u.email?.toLowerCase() !== cleanEmail);
      registeredUsers.push(newUser);
      
      try {
        localStorage.setItem('tb_registered_users', JSON.stringify(registeredUsers));
        localStorage.setItem('tb_user', JSON.stringify(newUser));
      } catch (e) {}

      dispatch({ type: 'LOGIN_SUCCESS', payload: newUser });
      return { success: true, user: newUser };
    },

    logout: () => {
      localStorage.removeItem('tb_user');
      dispatch({ type: 'LOGOUT' });
    },

    showToast: (message, type = 'info') => {
      dispatch({ type: 'SHOW_TOAST', payload: { message, type } });
    },

    updateProfile: (data) => {
      dispatch({ type: 'UPDATE_PROFILE', payload: data });
      const updated = { ...state.currentUser, ...data };
      localStorage.setItem('tb_user', JSON.stringify(updated));
    },

    sendMessage: async (conversationId, receiverId, text) => {
      const message = {
        id: 'msg' + Date.now(),
        senderId: state.currentUser?.id,
        text,
        timestamp: new Date().toISOString(),
        read: false,
      };
      dispatch({ type: 'ADD_MESSAGE', payload: { conversationId, receiverId, message } });
      // Simulate reply after delay
      await delay(2000 + Math.random() * 2000);
      const replies = [
        "That sounds amazing! 🙌",
        "Great idea! When should we meet to plan?",
        "Count me in! This is going to be epic.",
        "Perfect! Let me check my schedule and get back to you.",
        "Yes absolutely! Can't wait for this trip 🏖️",
      ];
      const reply = {
        id: 'msg' + Date.now(),
        senderId: receiverId,
        text: replies[Math.floor(Math.random() * replies.length)],
        timestamp: new Date().toISOString(),
        read: false,
      };
      dispatch({ type: 'ADD_MESSAGE', payload: { conversationId, message: reply } });
    },

    addTrip: (tripData) => {
      const trip = { id: 't' + Date.now(), creatorId: state.currentUser?.id, ...tripData, members: [state.currentUser?.id], status: 'planning' };
      dispatch({ type: 'ADD_TRIP', payload: trip });
      return trip;
    },

    addGroup: (groupData) => {
      const group = { id: 'g' + Date.now(), creatorId: state.currentUser?.id || 'demo', ...groupData, status: 'active' };
      dispatch({ type: 'ADD_GROUP', payload: group });
      return group;
    },

    updateGroup: (group) => {
      dispatch({ type: 'UPDATE_GROUP', payload: group });
    },

    toggleJoinGroup: (groupId) => {
      const group = state.groups.find(g => g.id === groupId);
      if (!group) return;
      const currentUserId = state.currentUser?.id || 'demo';
      const isMember = group.members?.includes(currentUserId);
      const updatedMembers = isMember
        ? group.members.filter(id => id !== currentUserId)
        : [...(group.members || []), currentUserId];
      
      const updatedGroup = { ...group, members: updatedMembers };
      dispatch({ type: 'UPDATE_GROUP', payload: updatedGroup });

      if (isMember) {
        dispatch({ type: 'SHOW_TOAST', payload: { message: `Left ${group.name}`, type: 'info' } });
      } else {
        dispatch({ type: 'SHOW_TOAST', payload: { message: `Joined ${group.name}! 🎉`, type: 'success' } });
      }
    },

    addExpense: (expenseData) => {
      const expense = { id: 'e' + Date.now(), ...expenseData, date: new Date().toISOString().split('T')[0] };
      dispatch({ type: 'ADD_EXPENSE', payload: expense });
      return expense;
    },

    deleteExpense: (id) => dispatch({ type: 'DELETE_EXPENSE', payload: id }),

    connectWithTraveller: async (userId) => {
      await delay(400);
      const targetUser = state.users.find(u => u.id === userId);
      const userName = targetUser ? targetUser.name : 'Travel Buddy';
      const myId = state.currentUser?.id || 'demo';

      const existingConv = state.conversations.find(c =>
        c.participants.includes(userId) && c.participants.includes(myId)
      );

      let newConv = null;
      if (!existingConv) {
        newConv = {
          id: 'conv_' + Date.now(),
          participants: [myId, userId],
          messages: [
            {
              id: 'msg_' + Date.now(),
              senderId: myId,
              text: `Hey ${userName.split(' ')[0]}! Saw your travel plans on Travel Buddy. Let's connect and plan our journey together! 🎒✈️`,
              timestamp: new Date().toISOString(),
              read: true,
            }
          ]
        };
      }

      const notif = {
        id: 'n_' + Date.now(),
        userId: myId,
        type: 'connection',
        title: 'New Connection! 🎉',
        message: `You and ${userName} are now connected. You can start chatting in Messages!`,
        timestamp: new Date().toISOString(),
        read: false,
        link: '/messages'
      };

      dispatch({
        type: 'CONNECT_TRAVELLER',
        payload: { userId, conversation: newConv, notification: notif }
      });

      dispatch({
        type: 'SHOW_TOAST',
        payload: { message: `Connected with ${userName}! You can now message them. 💬`, type: 'success' }
      });

      return existingConv ? existingConv.id : newConv?.id;
    },

    connectWithUser: async (matchId) => {
      await delay(400);
      const match = state.matches.find(m => m.id === matchId);
      if (match && match.matchedUserId) {
        return actions.connectWithTraveller(match.matchedUserId);
      }
      dispatch({ type: 'UPDATE_MATCH', payload: { id: matchId, status: 'connected' } });
      dispatch({ type: 'SHOW_TOAST', payload: { message: 'Connection established! 🎉', type: 'success' } });
    },

    toggleSaveUser: (userId) => dispatch({ type: 'TOGGLE_SAVE_USER', payload: userId }),
    toggleSaveTrip: (tripId) => dispatch({ type: 'TOGGLE_SAVE_TRIP', payload: tripId }),

    markNotificationRead: (id) => dispatch({ type: 'MARK_NOTIFICATION_READ', payload: id }),
    markAllNotificationsRead: () => dispatch({ type: 'MARK_ALL_NOTIFICATIONS_READ' }),
    readMessages: (convId) => dispatch({ type: 'READ_MESSAGES', payload: convId }),

    updateOnboarding: (data) => dispatch({ type: 'UPDATE_ONBOARDING_DATA', payload: data }),
    setOnboardingStep: (step) => dispatch({ type: 'SET_ONBOARDING_STEP', payload: step }),

    completeOnboarding: (data) => {
      actions.updateProfile(data);
      dispatch({ type: 'SHOW_TOAST', payload: { message: 'Your Travel Profile is ready! 🎉', type: 'success' } });
    },

    updateVerification: (data) => {
      const current = state.currentUser?.verification || {};
      const updated = { ...current, ...data };
      const verified = Object.values(updated).filter(Boolean).length;
      const newScore = Math.min(100, (state.currentUser?.trustScore || 70) + (Object.values(data)[0] ? 15 : 0));
      dispatch({ type: 'UPDATE_PROFILE', payload: { verification: updated, trustScore: newScore } });
    },

    addNotification: (notif) => {
      dispatch({ type: 'ADD_NOTIFICATION', payload: { id: 'n' + Date.now(), read: false, timestamp: new Date().toISOString(), ...notif } });
    },

    addReview: (reviewData) => {
      const review = {
        id: 'rev_' + Date.now(),
        reviewerId: state.currentUser?.id || 'demo',
        reviewedUserId: reviewData.reviewedUserId,
        rating: { overall: Number(reviewData.rating) || 5, ...reviewData.ratings },
        tags: reviewData.tags || [],
        comment: reviewData.comment || '',
        date: new Date().toISOString().split('T')[0],
      };
      dispatch({ type: 'ADD_REVIEW', payload: review });
      dispatch({ type: 'SHOW_TOAST', payload: { message: 'Review and rating submitted successfully! ⭐', type: 'success' } });
      return review;
    },
  };

  return (
    <AppContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
