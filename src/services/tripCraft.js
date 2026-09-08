// =============================================
// TRIPCRAFT AI SERVICE
// Deterministic trip planner
// =============================================

const ACTIVITY_TEMPLATES = {
  Beach: {
    morning: ['Golden hour sunrise at {beach}', 'Morning swim and yoga on {beach}', 'Beach walk at {beach}'],
    afternoon: ['Water sports (parasailing, jet ski) at {beach}', 'Snorkelling and kayaking', 'Beach volleyball and sunbathing'],
    evening: ['Sunset cocktails at beachside café', 'Bonfire night at {beach}', 'Night market near {beach}'],
  },
  Mountains: {
    morning: ['Sunrise trek to {viewpoint}', 'Valley walk through pine forests', 'Morning meditation at mountaintop'],
    afternoon: ['Snow activities / Paragliding', 'Visit to {local_spot}', 'Riverside picnic'],
    evening: ['Bonfire and local music', 'Café hopping in {town}', 'Star gazing from the valley'],
  },
  City: {
    morning: ['Explore {market} local market', 'Heritage walk in old city', 'Museum / gallery visit'],
    afternoon: ['Street food tour', 'Shopping at {market}', 'Archaeological site visit'],
    evening: ['Rooftop dinner with city views', 'Night bazaar', 'Cultural show/performance'],
  },
  Spiritual: {
    morning: ['Sunrise aarti at {temple}', 'Yoga session by the river', 'Meditation and temple visit'],
    afternoon: ['Boat ride on {river}', 'Ashram visit', 'Nature walk'],
    evening: ['Evening aarti ceremony', 'Spiritual lecture or workshop', 'Sattvic dinner'],
  },
};

const DESTINATION_DATA = {
  Goa: {
    type: 'Beach',
    beaches: ['Calangute', 'Baga', 'Vagator', 'Palolem', 'Anjuna'],
    food: ['Goan fish curry', 'Prawn balchão', 'Bebinca dessert', 'Cafreal chicken', 'Sol kadi'],
    places: ['Old Goa Churches', 'Dudhsagar Falls', 'Spice Plantation', 'Fort Aguada', 'Saturday Night Market'],
    budgetPerDay: { Budget: 2000, Backpacker: 2500, Balanced: 3500, Comfort: 5000, Luxury: 8000 },
  },
  Manali: {
    type: 'Mountains',
    peaks: ['Rohtang Pass', 'Solang Valley', 'Hampta Pass', 'Chandrakhani'],
    food: ['Siddu', 'Chha ghost', 'Thukpa', 'Momos', 'Dham'],
    places: ['Hadimba Temple', 'Old Manali', 'Naggar Castle', 'Solang Valley', 'Rohtang Pass'],
    budgetPerDay: { Budget: 2500, Backpacker: 3000, Balanced: 4000, Comfort: 6000, Luxury: 10000 },
  },
  Jaipur: {
    type: 'City',
    markets: ['Johari Bazaar', 'Bapu Bazaar', 'Tripolia Bazaar'],
    food: ['Dal baati churma', 'Laal maas', 'Ghewar', 'Pyaaz kachori', 'Rajasthani thali'],
    places: ['Amber Fort', 'City Palace', 'Hawa Mahal', 'Jantar Mantar', 'Nahargarh Fort'],
    budgetPerDay: { Budget: 1800, Backpacker: 2200, Balanced: 3000, Comfort: 5000, Luxury: 9000 },
  },
  Rishikesh: {
    type: 'Spiritual',
    activities: ['White water rafting', 'Bungee jumping', 'Camping', 'Yoga retreat'],
    food: ['Chhole bhature', 'Aloo puri', 'Banana lassi', 'Organic café food'],
    places: ['Laxman Jhula', 'Ram Jhula', 'Triveni Ghat', 'Beatles Ashram', 'Neelkanth Temple'],
    budgetPerDay: { Budget: 1500, Backpacker: 2000, Balanced: 3000, Comfort: 5000, Luxury: 8000 },
  },
  Kerala: {
    type: 'Beach',
    beaches: ['Kovalam', 'Varkala', 'Alleppey Backwaters'],
    food: ['Kerala fish curry', 'Appam stew', 'Puttu kadala', 'Karimeen', 'Payasam'],
    places: ['Munnar Tea Gardens', 'Alleppey Backwaters', 'Periyar Wildlife', 'Kovalam Beach', 'Kochi Fort'],
    budgetPerDay: { Budget: 2000, Backpacker: 2500, Balanced: 3500, Comfort: 5500, Luxury: 9000 },
  },
};

/**
 * Generate a complete trip itinerary
 */
export function generateItinerary(params) {
  const { destination, days, budget, travelStyle, interests, foodPreference } = params;
  const data = DESTINATION_DATA[destination] || DESTINATION_DATA.Goa;
  const dailyBudget = data.budgetPerDay[travelStyle] || 3000;

  const itinerary = [];
  for (let d = 1; d <= days; d++) {
    const dayThemes = getDayTheme(d, days, interests, data.type);
    itinerary.push({
      day: d,
      theme: dayThemes.theme,
      slots: [
        generateSlot('Morning', d, data, dayThemes, foodPreference, dailyBudget * 0.3),
        generateSlot('Afternoon', d, data, dayThemes, foodPreference, dailyBudget * 0.4),
        generateSlot('Evening', d, data, dayThemes, foodPreference, dailyBudget * 0.3),
      ]
    });
  }

  const totalBudget = {
    accommodation: Math.round(dailyBudget * days * 0.4),
    food: Math.round(dailyBudget * days * 0.25),
    transport: Math.round(dailyBudget * days * 0.15),
    activities: Math.round(dailyBudget * days * 0.15),
    emergency: Math.round(dailyBudget * days * 0.05),
    total: Math.round(dailyBudget * days),
  };

  return { itinerary, totalBudget, destination, days, travelStyle };
}

function getDayTheme(day, totalDays, interests, destType) {
  if (day === 1) return { theme: 'Arrival & Orientation', isArrival: true };
  if (day === totalDays) return { theme: 'Final Memories & Departure', isDeparture: true };
  const themes = {
    Beach: ['Beach Bliss & Water Sports', 'Heritage & Culture Day', 'Island Hopping & Photography', 'Markets & Local Life'],
    Mountains: ['Valley Exploration', 'Adventure & Trekking', 'Snow Activities', 'Local Culture Day'],
    City: ['Historical Heritage Walk', 'Market & Food Safari', 'Art & Culture Day', 'Local Life Immersion'],
    Spiritual: ['Morning Rituals & Meditation', 'Riverside & Nature Walk', 'Ashram & Workshop Day', 'Healing & Wellness'],
  };
  const options = themes[destType] || themes.Beach;
  return { theme: options[(day - 2) % options.length] };
}

function generateSlot(time, day, data, dayTheme, foodPref, budget) {
  const templates = ACTIVITY_TEMPLATES[data.type] || ACTIVITY_TEMPLATES.Beach;
  const options = templates[time.toLowerCase()] || [];
  const activity = options[day % options.length] || 'Explore the local area';
  const beach = data.beaches ? data.beaches[day % data.beaches.length] : '';
  const place = data.places ? data.places[day % data.places.length] : '';
  const food = data.food ? data.food[day % data.food.length] : 'Local cuisine';

  return {
    time,
    activity: activity.replace('{beach}', beach).replace('{viewpoint}', place).replace('{local_spot}', place).replace('{town}', data.type === 'Mountains' ? 'the town' : '').replace('{market}', data.markets ? data.markets[0] : 'local market').replace('{temple}', place).replace('{river}', 'the river'),
    location: beach || place || 'Local area',
    estimatedCost: Math.round(budget),
    food: getFoodRecommendation(foodPref, food),
    safetyTip: getSafetyTip(time, data.type),
    type: getActivityType(time, data.type),
  };
}

function getFoodRecommendation(pref, defaultFood) {
  if (pref === 'Vegetarian') return `Vegetarian option: ${defaultFood} (veg)`;
  if (pref === 'Vegan') return `Vegan-friendly local café`;
  if (pref === 'Jain') return `Jain food available at local restaurants`;
  return defaultFood;
}

function getSafetyTip(time, type) {
  const tips = {
    Morning: ['Start early to avoid heat', 'Share your day plan with your group', 'Carry water and sunscreen'],
    Afternoon: ['Stay hydrated in the heat', 'Keep valuables secure', 'Travel in groups'],
    Evening: ['Stay in well-lit areas', 'Pre-book transport for late evenings', 'Inform someone of your location'],
  };
  return (tips[time] || tips.Morning)[Math.floor(Math.random() * 3)];
}

function getActivityType(time, destType) {
  const map = { Morning: 'leisure', Afternoon: 'adventure', Evening: 'food' };
  return map[time] || 'leisure';
}
