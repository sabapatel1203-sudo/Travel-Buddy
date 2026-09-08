// =============================================
// SMARTMATCH AI SERVICE
// Deterministic compatibility algorithm
// =============================================

/**
 * Calculate compatibility score between two trip/user profiles
 * Weights: Destination 25%, Dates 20%, Budget 15%, Interests 15%,
 *          TravelStyle 10%, Food 5%, Pace 5%, Accommodation 5%
 */
export function calculateCompatibilityScore(userA, userB, tripA, tripB) {
  const breakdown = {};

  // 1. Destination match (25%)
  if (tripA && tripB) {
    breakdown.destination = tripA.destination.toLowerCase() === tripB.destination.toLowerCase() ? 100 : 
      areNearbyDestinations(tripA.destination, tripB.destination) ? 60 : 20;
  } else {
    breakdown.destination = 70; // default
  }

  // 2. Date compatibility (20%)
  if (tripA && tripB) {
    breakdown.dates = calculateDateOverlap(tripA.startDate, tripA.endDate, tripB.startDate, tripB.endDate);
  } else {
    breakdown.dates = 75;
  }

  // 3. Budget compatibility (15%)
  if (tripA && tripB) {
    const budgetRatio = Math.min(tripA.budget, tripB.budget) / Math.max(tripA.budget, tripB.budget);
    breakdown.budget = Math.round(budgetRatio * 100);
  } else {
    breakdown.budget = 80;
  }

  // 4. Shared interests (15%)
  const interestsA = userA.interests || [];
  const interestsB = userB.interests || [];
  const sharedInterests = interestsA.filter(i => interestsB.includes(i));
  const maxPossible = Math.max(interestsA.length, interestsB.length, 1);
  breakdown.interests = Math.round((sharedInterests.length / Math.min(maxPossible, 5)) * 100);

  // 5. Travel style (10%)
  breakdown.travelStyle = userA.travelStyle === userB.travelStyle ? 100 :
    areCompatibleStyles(userA.travelStyle, userB.travelStyle) ? 70 : 40;

  // 6. Food preference (5%)
  breakdown.food = userA.foodPreference === userB.foodPreference ? 100 :
    userA.foodPreference === 'No Preference' || userB.foodPreference === 'No Preference' ? 80 :
    areCompatibleFoods(userA.foodPreference, userB.foodPreference) ? 60 : 40;

  // 7. Travel pace (5%)
  breakdown.pace = userA.travelPace === userB.travelPace ? 100 :
    Math.abs(paceIndex(userA.travelPace) - paceIndex(userB.travelPace)) === 1 ? 70 : 40;

  // 8. Accommodation (5%)
  if (tripA && tripB) {
    breakdown.accommodation = tripA.accommodation === tripB.accommodation ? 100 : 65;
  } else {
    breakdown.accommodation = 70;
  }

  // Weighted total
  const score = Math.round(
    breakdown.destination * 0.25 +
    breakdown.dates * 0.20 +
    breakdown.budget * 0.15 +
    breakdown.interests * 0.15 +
    breakdown.travelStyle * 0.10 +
    breakdown.food * 0.05 +
    breakdown.pace * 0.05 +
    breakdown.accommodation * 0.05
  );

  return {
    score: Math.min(100, Math.max(0, score)),
    breakdown,
    sharedInterests,
  };
}

function calculateDateOverlap(startA, endA, startB, endB) {
  const a1 = new Date(startA), a2 = new Date(endA);
  const b1 = new Date(startB), b2 = new Date(endB);
  const overlapStart = Math.max(a1, b1);
  const overlapEnd = Math.min(a2, b2);
  const overlap = Math.max(0, (overlapEnd - overlapStart) / (1000 * 60 * 60 * 24));
  const durationA = (a2 - a1) / (1000 * 60 * 60 * 24);
  if (overlap <= 0) {
    const gap = Math.min(Math.abs(a1 - b2), Math.abs(b1 - a2)) / (1000 * 60 * 60 * 24);
    return gap <= 3 ? 60 : gap <= 7 ? 40 : 20;
  }
  return Math.round(Math.min(100, (overlap / durationA) * 100 + 20));
}

function areNearbyDestinations(a, b) {
  const clusters = [
    ['Goa', 'Mumbai', 'Pune'],
    ['Manali', 'Shimla', 'Ladakh', 'Dharamshala'],
    ['Jaipur', 'Udaipur', 'Jodhpur', 'Agra'],
    ['Rishikesh', 'Haridwar', 'Dehradun'],
    ['Kerala', 'Coorg', 'Ooty'],
  ];
  return clusters.some(c => c.includes(a) && c.includes(b));
}

function areCompatibleStyles(a, b) {
  const compatible = {
    'Budget': ['Backpacker'],
    'Backpacker': ['Budget', 'Balanced'],
    'Balanced': ['Backpacker', 'Comfort'],
    'Comfort': ['Balanced', 'Luxury'],
    'Luxury': ['Comfort'],
  };
  return (compatible[a] || []).includes(b);
}

function areCompatibleFoods(a, b) {
  const compatible = {
    'Vegetarian': ['Vegan', 'Jain'],
    'Vegan': ['Vegetarian', 'Jain'],
    'Jain': ['Vegetarian', 'Vegan'],
    'Non-Vegetarian': ['No Preference'],
    'Halal': ['No Preference'],
  };
  return (compatible[a] || []).includes(b);
}

function paceIndex(pace) {
  return { 'Relaxed': 0, 'Balanced': 1, 'Fast-paced': 2 }[pace] ?? 1;
}

/**
 * Generate AI match explanation text
 */
export function generateMatchExplanation(userA, userB, tripA, tripB, sharedInterests) {
  const parts = [];
  if (tripA && tripB && tripA.destination === tripB.destination) {
    parts.push(`both visiting ${tripA.destination}`);
  }
  if (tripA && tripB) {
    const overlap = calculateDateOverlap(tripA.startDate, tripA.endDate, tripB.startDate, tripB.endDate);
    if (overlap >= 80) parts.push('travel on the same dates');
  }
  if (sharedInterests && sharedInterests.length >= 3) {
    parts.push(`share ${sharedInterests.length} interests (${sharedInterests.slice(0, 3).join(', ')})`);
  } else if (sharedInterests && sharedInterests.length > 0) {
    parts.push(`share interest in ${sharedInterests.join(' and ')}`);
  }
  if (userA.travelStyle === userB.travelStyle) {
    parts.push(`prefer the same ${userA.travelStyle} travel style`);
  }
  if (tripA && tripB) {
    const ratio = Math.min(tripA.budget, tripB.budget) / Math.max(tripA.budget, tripB.budget);
    if (ratio > 0.8) parts.push('have similar budgets');
  }
  if (!parts.length) return `${userB.name} is a compatible travel partner based on your preferences.`;
  const last = parts.pop();
  const sentence = parts.length ? `${parts.join(', ')} and ${last}` : last;
  return `You and ${userB.name} ${sentence} — making this a great travel match.`;
}

/**
 * Calculate group compatibility
 */
export function calculateGroupCompatibility(users, trips) {
  if (users.length < 2) return { overall: 100, breakdown: {} };
  let totalScore = 0;
  let pairs = 0;
  const budgets = trips.filter(Boolean).map(t => t.budget);
  const avgBudget = budgets.length ? budgets.reduce((a, b) => a + b, 0) / budgets.length : 0;
  const budgetVariance = budgets.length ? Math.max(...budgets) / Math.min(...budgets) : 1;

  for (let i = 0; i < users.length; i++) {
    for (let j = i + 1; j < users.length; j++) {
      const result = calculateCompatibilityScore(users[i], users[j], trips[i], trips[j]);
      totalScore += result.score;
      pairs++;
    }
  }
  const overall = pairs ? Math.round(totalScore / pairs) : 85;

  // Interest overlap
  const allInterests = users.flatMap(u => u.interests || []);
  const interestCounts = {};
  allInterests.forEach(i => { interestCounts[i] = (interestCounts[i] || 0) + 1; });
  const sharedCount = Object.values(interestCounts).filter(c => c >= Math.ceil(users.length / 2)).length;

  return {
    overall,
    breakdown: {
      budget: Math.round(100 / budgetVariance),
      interests: Math.min(100, sharedCount * 20),
      travelStyle: users.every(u => u.travelStyle === users[0].travelStyle) ? 100 : 75,
      dates: 95,
    },
    sharedInterests: Object.keys(interestCounts).filter(k => interestCounts[k] >= 2),
  };
}
