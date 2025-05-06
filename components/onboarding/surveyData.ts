export const surveyData = [
  {
    id: 'welcome',
    type: 'welcome',
    title: 'Runwae',
    description:
      'Discover breathtaking destinations and embark on unforgettable travel adventures around the world.',
    //can not decide on image
    // image:
    //   'https://images.pexels.com/photos/2265876/pexels-photo-2265876.jpeg?cs=srgb&dl=pexels-vince-2265876.jpg',
    image:
      'https://images.pexels.com/photos/127905/pexels-photo-127905.jpeg?auto=compress&cs=tinysrgb&w=1200.jpg',
  },
  {
    id: 'travel-experience',
    type: 'multiple-choice',
    question: 'How would you describe your travel experience?',
    options: [
      { id: 'beginner', text: 'First-time Traveler', icon: '🧳' },
      { id: 'intermediate', text: 'Casual Explorer', icon: '🌍' },
      { id: 'expert', text: 'Seasoned Globetrotter', icon: '✈️' },
    ],
  },
  {
    id: 'travel-types',
    type: 'multiple-select',
    question: 'What types of destinations do you enjoy?',
    description: 'Select all that apply',
    options: [
      { id: 'beach', text: 'Beaches & Islands', icon: '🏝️' },
      { id: 'mountain', text: 'Mountains & Hiking', icon: '🏔️' },
      { id: 'city', text: 'Cities & Culture', icon: '🏙️' },
      { id: 'nature', text: 'Nature & Wildlife', icon: '🌲' },
      { id: 'adventure', text: 'Adventure & Sports', icon: '🚴' },
    ],
  },
  {
    id: 'goals',
    type: 'multiple-choice',
    question: 'What do you hope to achieve with Runwae?',
    options: [
      { id: 'discover', text: 'Discover new places', icon: '🗺️' },
      { id: 'plan', text: 'Plan my trips', icon: '📝' },
      { id: 'connect', text: 'Connect with travelers', icon: '🤝' },
      { id: 'learn', text: 'Learn travel tips', icon: '📚' },
    ],
  },
  {
    id: 'frequency',
    type: 'multiple-choice',
    question: 'How often do you travel?',
    options: [
      { id: 'monthly', text: 'Every month', icon: '📆' },
      { id: 'quarterly', text: 'A few times a year', icon: '🌤️' },
      { id: 'yearly', text: 'Once a year', icon: '🗓️' },
      { id: 'rarely', text: 'Rarely', icon: '😌' },
    ],
  },
  {
    id: 'premium-features',
    type: 'features',
    title: 'Runwae Premium',
    description:
      'Elevate your journeys with exclusive travel tools and insights',
    features: [
      { text: 'Personalized itinerary planning', icon: '🗒️' },
      { text: 'Real-time travel alerts', icon: '🚨' },
      { text: 'Local experience recommendations', icon: '🍽️' },
      { text: 'Expense tracking & budgeting', icon: '💸' },
      { text: 'Travel journal & photo storage', icon: '📸' },
    ],
  },
];
