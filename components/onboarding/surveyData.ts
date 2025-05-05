export const surveyData = [
  {
    id: 'welcome',
    type: 'welcome',
    title: 'Runwae',
    description:
      'Discover breathtaking destinations and embark on unforgettable travel adventures around the world.',
    // image:
    //   'https://images.pexels.com/photos/2265876/pexels-photo-2265876.jpeg?cs=srgb&dl=pexels-vince-2265876.jpg',
    image:
      'https://images.pexels.com/photos/127905/pexels-photo-127905.jpeg?auto=compress&cs=tinysrgb&w=1200.jpg',
  },
  {
    id: 'plant-experience',
    type: 'multiple-choice',
    question: 'How would you describe your plant care skills?',
    options: [
      { id: 'beginner', text: 'Plant Beginner', icon: '🌱' },
      { id: 'intermediate', text: 'Casual Gardener', icon: '🪴' },
      { id: 'expert', text: 'Botanical Enthusiast', icon: '🌳' },
    ],
  },
  {
    id: 'plant-types',
    type: 'multiple-select',
    question: 'What types of plants do you have in your collection?',
    description: 'Select all that apply',
    options: [
      { id: 'tropical', text: 'Tropical Houseplants', icon: '🌴' },
      { id: 'flowering', text: 'Flowering Plants', icon: '🌺' },
      { id: 'succulents', text: 'Cacti & Succulents', icon: '🌵' },
      { id: 'vegetables', text: 'Vegetables & Herbs', icon: '🥬' },
      { id: 'bonsai', text: 'Bonsai & Ornamentals', icon: '🎍' },
    ],
  },
  {
    id: 'goals',
    type: 'multiple-choice',
    question: 'What do you hope to achieve with PlantPal?',
    options: [
      { id: 'monitor', text: 'Monitor plant health', icon: '🔎' },
      { id: 'troubleshoot', text: 'Troubleshoot plant problems', icon: '🔧' },
      { id: 'optimize', text: 'Optimize growing conditions', icon: '☀️' },
      { id: 'expand', text: 'Expand my plant knowledge', icon: '🧠' },
    ],
  },
  {
    id: 'frequency',
    type: 'multiple-choice',
    question: 'How often do you tend to your plants?',
    options: [
      { id: 'daily', text: 'Every day', icon: '🌞' },
      { id: 'weekly', text: 'A few times a week', icon: '📅' },
      { id: 'biweekly', text: 'Every couple of weeks', icon: '🗓️' },
      { id: 'whenever', text: 'When I remember to', icon: '💭' },
    ],
  },
  {
    id: 'premium-features',
    type: 'features',
    title: 'PlantPal Premium',
    description: 'Elevate your plant care with advanced AI-powered features',
    features: [
      { text: 'Custom watering & fertilizing schedules', icon: '💧' },
      { text: 'Early disease detection & prevention', icon: '🦠' },
      { text: 'Seasonal care adjustments & reminders', icon: '🍂' },
      { text: 'Light & humidity optimization', icon: '☀️' },
      { text: 'Plant growth milestones & journaling', icon: '📈' },
    ],
  },
];
