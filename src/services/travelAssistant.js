// =============================================
// TRAVEL ASSISTANT AI SERVICE (Mock)
// =============================================

const RESPONSE_TEMPLATES = {
  food: [
    "For dinner tonight, I'd recommend trying the local seafood shack near your beach — they're famous for fresh catch and authentic flavours. Budget: ₹400-600/person.",
    "Based on your vegetarian preference, Artjuna Café in North Goa is perfect for a sunset dinner with great organic food and a relaxed atmosphere.",
    "The Saturday Night Market has amazing international food stalls — great for the group! Budget around ₹300-500/person.",
  ],
  activities: [
    "For tomorrow, I suggest starting with Dudhsagar Falls early morning (7am), then visiting the spice plantation for lunch, and ending with Palolem Beach sunset. Total cost: ~₹1,500/person.",
    "Based on your photography interest, golden hour at Vagator Beach (6-7am) is unmissable. Then head to Fort Aguada for historical shots.",
    "Since you love adventure, book the white-water rafting experience at Rishikesh first thing tomorrow — slots fill up fast!",
  ],
  budget: [
    "To reduce budget: cook breakfast at your hostel (saves ₹200/day), take local buses instead of taxis (saves ₹300/day), and choose beach shacks over restaurants (saves ₹400/day). Total daily saving: ~₹900/person.",
    "Your biggest expense is accommodation. Switching from hotel to hostel dorm saves ₹800/night. Group cooking for one dinner saves ~₹600. These changes bring your daily budget down by 25%.",
    "Tip: Book activities directly with local operators rather than through hotels — you'll save 20-30% on water sports and tours.",
  ],
  packing: [
    "For your trip, pack: lightweight clothes (3-4 sets), a rain jacket (just in case), reef-safe sunscreen, a reusable water bottle, power bank, basic first aid kit, and your travel documents. For beaches, add flip flops and a dry bag.",
    "Essential packing list: quick-dry towel, mosquito repellent, cash (ATMs can be scarce), universal adapter, a good book for lazy afternoons, and a small backpack for day trips.",
    "Don't forget: travel insurance documents, emergency contacts written down, spare phone charger, and copies of your ID. For mountains: thermal layers, sturdy trekking shoes, and altitude sickness tablets.",
  ],
  safety: [
    "Safest areas in the area include the main tourist zones and beach roads. Avoid isolated beaches after dark. Always travel in your group, share your location, and use in-app communication for sharing plans.",
    "Safety signals show this destination has a generally safe travel environment. Recommended: book through verified operators, keep digital copies of documents, and have the local emergency number saved (+91-112).",
    "Keep your group informed of your plans. Use Travel Buddy's location sharing feature (coming soon). Book all transport in advance for late-night travel.",
  ],
  default: [
    "Great question! Based on your trip details and interests, here's my recommendation: explore the local markets in the morning for authentic experiences, try the local cuisine for lunch, and save the main attraction for afternoon when crowds thin out.",
    "I've analysed your trip profile. The key to making the most of this destination is balancing popular spots with hidden gems. I can suggest a detailed plan — just tell me more about what you'd like to prioritise!",
    "Interesting! Based on similar trips by our community, travellers with your profile love mixing adventure activities in the morning with cultural experiences in the afternoon. Want me to build a day-by-day plan around that?",
  ],
};

/**
 * Get AI assistant response based on message context
 */
export function getTravelAssistantResponse(message, tripContext) {
  const msg = message.toLowerCase();

  if (msg.includes('eat') || msg.includes('food') || msg.includes('restaurant') || msg.includes('dinner') || msg.includes('lunch')) {
    return getRandomResponse('food');
  }
  if (msg.includes('tomorrow') || msg.includes('activity') || msg.includes('do') || msg.includes('visit')) {
    return getRandomResponse('activities');
  }
  if (msg.includes('budget') || msg.includes('cheap') || msg.includes('cost') || msg.includes('save') || msg.includes('money') || msg.includes('reduce')) {
    return getRandomResponse('budget');
  }
  if (msg.includes('pack') || msg.includes('bring') || msg.includes('carry') || msg.includes('bag')) {
    return getRandomResponse('packing');
  }
  if (msg.includes('safe') || msg.includes('danger') || msg.includes('area') || msg.includes('trust')) {
    return getRandomResponse('safety');
  }
  if (msg.includes('replace') || msg.includes('change') || msg.includes('alternative')) {
    return `For an alternative, I'd suggest ${tripContext?.destination || 'your destination'} has plenty of options. Based on your interests, you could swap this for a local cultural experience or a photography walk — both are highly rated by similar travellers.`;
  }

  return getRandomResponse('default');
}

function getRandomResponse(category) {
  const responses = RESPONSE_TEMPLATES[category] || RESPONSE_TEMPLATES.default;
  return responses[Math.floor(Math.random() * responses.length)];
}

// Suggested questions for the AI assistant
export const SUGGESTED_QUESTIONS = [
  "Where should we eat tonight?",
  "What should we do tomorrow morning?",
  "How can we reduce our daily budget?",
  "What should I pack for this trip?",
  "What are the safest areas to visit?",
  "Can we replace any activity in Day 2?",
  "Best time to visit the main attraction?",
  "Any local tips for this destination?",
];
