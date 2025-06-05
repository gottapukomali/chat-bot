export interface FAQ {
  id: string;
  question: string;
  answer: string[];
  tool: 'whatsapp' | 'paytm' | 'google-maps' | 'general';
  tags: string[];
}

export const faqs: FAQ[] = [
  {
    id: 'whatsapp-send-photo',
    question: 'How do I send a photo on WhatsApp?',
    answer: [
      'Open the chat with the person you want to send a photo to.',
      'Tap the attachment (paperclip) icon in the message bar.',
      'Select "Gallery" or "Camera" depending on whether you want to send an existing photo or take a new one.',
      'Select the photo you want to send.',
      'Add a caption if you want (optional).',
      'Tap the send button (arrow icon).'
    ],
    tool: 'whatsapp',
    tags: ['photo', 'image', 'send', 'share', 'picture', 'whatsapp']
  },
  {
    id: 'whatsapp-video-call',
    question: 'How do I make a video call on WhatsApp?',
    answer: [
      'Open the chat with the person you want to video call.',
      'Tap the video call icon (camera) at the top right of the screen.',
      'Wait for the person to answer.',
      'To end the call, tap the red hang up button.'
    ],
    tool: 'whatsapp',
    tags: ['video', 'call', 'chat', 'whatsapp']
  },
  {
    id: 'whatsapp-group',
    question: 'How do I create a group on WhatsApp?',
    answer: [
      'Open WhatsApp and go to the Chats tab.',
      'Tap the "New Chat" icon (message icon) at the bottom right.',
      'Select "New Group".',
      'Select the contacts you want to add to the group.',
      'Tap the arrow icon at the bottom right after selecting contacts.',
      'Enter a group name and optional group icon.',
      'Tap "Create" or the checkmark to finish.'
    ],
    tool: 'whatsapp',
    tags: ['group', 'create', 'multiple', 'contacts', 'whatsapp']
  },
  {
    id: 'paytm-money-transfer',
    question: 'How do I send money using Paytm?',
    answer: [
      'Open the Paytm app on your phone.',
      'Tap on "Send Money" on the home screen.',
      'Enter the mobile number or select a contact from your phonebook.',
      'Enter the amount you want to send.',
      'Add a message (optional).',
      'Tap "Pay" to proceed.',
      'Confirm the payment using your Paytm PIN or biometric authentication.'
    ],
    tool: 'paytm',
    tags: ['money', 'transfer', 'send', 'payment', 'paytm']
  },
  {
    id: 'paytm-bill-payment',
    question: 'How do I pay bills with Paytm?',
    answer: [
      'Open the Paytm app on your phone.',
      'Scroll down or search for "Bill Payments".',
      'Select the type of bill you want to pay (Electricity, Water, Gas, etc.).',
      'Select your service provider.',
      'Enter your customer ID or billing details.',
      'The bill amount will be fetched automatically.',
      'Tap "Proceed to Pay".',
      'Complete the payment using your preferred payment method.'
    ],
    tool: 'paytm',
    tags: ['bill', 'payment', 'utility', 'paytm']
  },
  {
    id: 'paytm-recharge',
    question: 'How do I recharge my mobile on Paytm?',
    answer: [
      'Open the Paytm app on your phone.',
      'Tap on "Mobile Recharge" on the home screen.',
      'Enter your mobile number or select from saved numbers.',
      'Select your operator and circle (location).',
      'Choose a recharge plan or enter the amount.',
      'Tap "Proceed to Recharge".',
      'Complete the payment using your preferred payment method.'
    ],
    tool: 'paytm',
    tags: ['recharge', 'mobile', 'prepaid', 'paytm']
  },
  {
    id: 'gmaps-navigation',
    question: 'How do I navigate to a place using Google Maps?',
    answer: [
      'Open the Google Maps app on your phone.',
      'Tap on the search bar at the top.',
      'Enter the destination address or name.',
      'Tap on "Directions".',
      'Choose your mode of transport (driving, public transit, walking, etc.).',
      'Tap "Start" to begin navigation.',
      'Follow the voice and visual directions to reach your destination.'
    ],
    tool: 'google-maps',
    tags: ['navigation', 'directions', 'route', 'maps', 'google']
  },
  {
    id: 'gmaps-save-location',
    question: 'How do I save a location on Google Maps?',
    answer: [
      'Open the Google Maps app on your phone.',
      'Search for the location you want to save.',
      'Tap on the location to open its details.',
      'Tap on the "Save" button (bookmark icon).',
      'Choose a list to save to (Favorites, Want to go, Starred places, etc.).',
      'The location will now be saved in your Google Maps account.'
    ],
    tool: 'google-maps',
    tags: ['save', 'bookmark', 'favorite', 'location', 'maps', 'google']
  },
  {
    id: 'gmaps-offline',
    question: 'How do I use Google Maps offline?',
    answer: [
      'Open the Google Maps app on your phone.',
      'Tap on your profile picture or initial in the top right.',
      'Tap "Offline maps".',
      'Tap "Select your own map".',
      'Adjust the area you want to download by pinching and zooming.',
      'Tap "Download".',
      'The selected area will be available offline for 30 days.'
    ],
    tool: 'google-maps',
    tags: ['offline', 'download', 'no internet', 'maps', 'google']
  },
  {
    id: 'general-wifi',
    question: 'How do I connect to WiFi?',
    answer: [
      'On your phone, go to Settings.',
      'Tap on "WiFi" or "Connections" and then "WiFi".',
      'Toggle WiFi on if it\'s off.',
      'Wait for the list of available networks to appear.',
      'Tap on the network you want to connect to.',
      'Enter the password if required.',
      'Tap "Connect" or "Join".'
    ],
    tool: 'general',
    tags: ['wifi', 'internet', 'connect', 'network']
  },
  {
    id: 'general-bluetooth',
    question: 'How do I connect Bluetooth devices?',
    answer: [
      'On your phone, go to Settings.',
      'Tap on "Bluetooth" or "Connections" and then "Bluetooth".',
      'Toggle Bluetooth on if it\'s off.',
      'Make sure your Bluetooth device is in pairing mode (refer to the device\'s manual).',
      'Wait for the device to appear in the list of available devices.',
      'Tap on the device name to connect.',
      'Follow any additional instructions if prompted.'
    ],
    tool: 'general',
    tags: ['bluetooth', 'connect', 'pair', 'device']
  }
];

export const suggestedQuestions = [
  'How do I send a photo on WhatsApp?',
  'How do I send money using Paytm?',
  'How do I navigate to a place using Google Maps?',
  'How do I connect to WiFi?'
];

export function searchFAQs(query: string): FAQ[] {
  if (!query.trim()) return [];
  
  const searchTerms = query.toLowerCase().split(' ');
  
  return faqs.filter(faq => {
    // Search in question
    const questionMatch = searchTerms.some(term => 
      faq.question.toLowerCase().includes(term)
    );
    
    // Search in tags
    const tagMatch = searchTerms.some(term => 
      faq.tags.some(tag => tag.includes(term))
    );
    
    // Search in tool
    const toolMatch = searchTerms.some(term => 
      faq.tool.includes(term)
    );
    
    return questionMatch || tagMatch || toolMatch;
  });
}