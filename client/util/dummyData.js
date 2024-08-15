// util/dummyData.js
export const leaderboardData = [
    { id: '1', name: 'Alice', score: 150, age: 25, occupation: 'Engineer', dailyCarbonFootprint: '10 kg' },
    { id: '2', name: 'Bob', score: 140, age: 30, occupation: 'Designer', dailyCarbonFootprint: '12 kg' },
    { id: '3', name: 'Charlie', score: 130, age: 28, occupation: 'Teacher', dailyCarbonFootprint: '8 kg' },
    { id: '4', name: 'David', score: 120, age: 35, occupation: 'Developer', dailyCarbonFootprint: '15 kg' },
    { id: '5', name: 'Eve', score: 110, age: 22, occupation: 'Student', dailyCarbonFootprint: '7 kg' },
  ];
  

// util/offsetCarbonData.js
export const offsetCarbonData = {
    latest: [
      { id: '1', title: 'Plant Trees', image: require('../assets/tree.jpg'), description: 'Plant 100 trees to offset carbon.' },
      { id: '2', title: 'Solar Panels', image: require('../assets/solar.jpg'), description: 'Install solar panels in your home.' },
      { id: '3', title: 'Bike to Work', image: require('../assets/bike.jpg'), description: 'Use a bike for your daily commute.' },
      { id: '4', title: 'Recycle', image: require('../assets/recycle.jpg'), description: 'Participate in recycling programs.' },
      { id: '5', title: 'Use Public Transport', image: require('../assets/public_transport.jpg'), description: 'Reduce carbon footprint by using public transport.' },
    ],
    older: [
      { id: '6', title: 'Carpool', image: require('../assets/carpool.jpg'), description: 'Share rides with colleagues.' },
      { id: '7', title: 'Energy Efficient Appliances', image: require('../assets/energy_efficient.jpg'), description: 'Upgrade to energy-efficient appliances.' },
      { id: '8', title: 'Compost', image: require('../assets/compost.jpg'), description: 'Compost kitchen waste to reduce landfill.' },
      { id: '9', title: 'Reduce Meat Consumption', image: require('../assets/reduce_meat.jpg'), description: 'Cut down on meat to lower carbon footprint.' },
      { id: '10', title: 'Plant-Based Diet', image: require('../assets/plant_based.jpg'), description: 'Adopt a plant-based diet.' },
    ]
  };
  
// util/dummyData.js (or util/ecoChallengesData.js)
export const ecoChallengesData = [
    { id: '1', title: 'Plant a Tree', description: 'Plant a tree in your backyard or community.', image: require('../assets/tree.jpg') },
    { id: '2', title: 'Recycle', description: 'Recycle all your paper, plastic, and glass waste.', image: require('../assets/recycle.jpg') },
    { id: '3', title: 'Bike to Work', description: 'Use a bike for your daily commute.', image: require('../assets/bike.jpg') },
    { id: '4', title: 'Reduce Water Usage', description: 'Take shorter showers and turn off the tap while brushing.', image: require('../assets/water.jpg') },
    { id: '5', title: 'Use Reusable Bags', description: 'Carry reusable bags for your shopping.', image: require('../assets/bag.jpg') },
    { id: '6', title: 'Compost', description: 'Compost your kitchen waste.', image: require('../assets/compost.jpg') },
    { id: '7', title: 'Energy Efficient Appliances', description: 'Use energy-efficient appliances.', image: require('../assets/energy_efficient.jpg') },
    { id: '8', title: 'Public Transport', description: 'Use public transport instead of driving.', image: require('../assets/public_transport.jpg') },
    { id: '9', title: 'Plant-Based Diet', description: 'Adopt a plant-based diet.', image: require('../assets/plant_based.jpg') },
    { id: '10', title: 'Carpool', description: 'Share rides with colleagues.', image: require('../assets/carpool.jpg') },
  ];
  
  // countries.js
export const countries = [
  { code: "None", name: "Select", flag: "none" },
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "JP", name: "Japan", flag: "🇯🇵" },
  { code: "CN", name: "China", flag: "🇨🇳" },
  { code: "BR", name: "Brazil", flag: "🇧🇷" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
];

export const states = {
  US: [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 
    'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
    'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 
    'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri',
    'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
    'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
    'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
    'Washington, D.C.' // Federal District
  ],
  IN: [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 
    'Lakshadweep', 'Delhi', 'Puducherry', 'Ladakh', 'Jammu and Kashmir'
  ],
  
  // Add other countries and their states here
};


