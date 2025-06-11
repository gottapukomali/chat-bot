import { useState } from 'react';
import { Play, CheckCircle, Clock, Star, Volume2 } from 'lucide-react';
import { useProgress } from '../hooks/useProgress';
import { useAccessibility } from '../hooks/useAccessibility';

interface Tutorial {
  id: string;
  title: string;
  description: string;
  steps: string[];
  videoUrl?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  category: 'whatsapp' | 'paytm' | 'google-maps' | 'general';
}

const tutorials: Tutorial[] = [
  {
    id: 'whatsapp-basics',
    title: 'WhatsApp Basics',
    description: 'Learn to send messages, photos, and make calls',
    steps: [
      'Open WhatsApp on your phone',
      'Tap on a contact to start chatting',
      'Type your message in the text box',
      'Tap the send button (arrow icon)',
      'To send a photo, tap the attachment icon',
      'Select Gallery or Camera',
      'Choose your photo and tap send'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    difficulty: 'beginner',
    estimatedTime: '5 minutes',
    category: 'whatsapp'
  },
  {
    id: 'paytm-payment',
    title: 'Making Payments with Paytm',
    description: 'Send money and pay bills safely',
    steps: [
      'Open the Paytm app',
      'Tap on "Send Money"',
      'Enter the recipient\'s mobile number',
      'Enter the amount to send',
      'Add a note (optional)',
      'Tap "Pay" to proceed',
      'Enter your Paytm PIN to confirm'
    ],
    difficulty: 'beginner',
    estimatedTime: '7 minutes',
    category: 'paytm'
  },
  {
    id: 'google-maps-navigation',
    title: 'Navigate with Google Maps',
    description: 'Find directions and save locations',
    steps: [
      'Open Google Maps app',
      'Tap the search bar at the top',
      'Enter your destination',
      'Tap "Directions"',
      'Choose your transport mode',
      'Tap "Start" to begin navigation',
      'Follow the voice and visual directions'
    ],
    difficulty: 'beginner',
    estimatedTime: '6 minutes',
    category: 'google-maps'
  }
];

export function InteractiveTutorials() {
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const { progress, markTutorialViewed, markTutorialCompleted } = useProgress();
  const { speakText } = useAccessibility();

  const handleTutorialSelect = (tutorial: Tutorial) => {
    setSelectedTutorial(tutorial);
    setCurrentStep(0);
    markTutorialViewed(tutorial.id);
    speakText(`Starting tutorial: ${tutorial.title}`);
  };

  const handleNextStep = () => {
    if (selectedTutorial && currentStep < selectedTutorial.steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      speakText(selectedTutorial.steps[nextStep]);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      if (selectedTutorial) {
        speakText(selectedTutorial.steps[prevStep]);
      }
    }
  };

  const handleCompleteTutorial = () => {
    if (selectedTutorial) {
      markTutorialCompleted(selectedTutorial.id);
      speakText('Tutorial completed! Well done!');
      setSelectedTutorial(null);
      setCurrentStep(0);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (selectedTutorial) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="bg-primary-500 text-white p-6">
            <h2 className="text-2xl font-bold mb-2">{selectedTutorial.title}</h2>
            <p className="text-primary-100">{selectedTutorial.description}</p>
            <div className="flex items-center gap-4 mt-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(selectedTutorial.difficulty)}`}>
                {selectedTutorial.difficulty}
              </span>
              <span className="flex items-center gap-1 text-primary-100">
                <Clock size={16} />
                {selectedTutorial.estimatedTime}
              </span>
            </div>
          </div>

          <div className="p-6">
            {selectedTutorial.videoUrl && (
              <div className="mb-6">
                <iframe
                  width="100%"
                  height="315"
                  src={selectedTutorial.videoUrl}
                  title={selectedTutorial.title}
                  frameBorder="0"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            )}

            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Step {currentStep + 1} of {selectedTutorial.steps.length}
                </h3>
                <button
                  onClick={() => speakText(selectedTutorial.steps[currentStep])}
                  className="p-2 text-primary-500 hover:bg-primary-50 rounded-full transition-colors"
                  aria-label="Read step aloud"
                >
                  <Volume2 size={20} />
                </button>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed">
                  {selectedTutorial.steps[currentStep]}
                </p>
              </div>

              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-6">
                <div
                  className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / selectedTutorial.steps.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={handlePreviousStep}
                disabled={currentStep === 0}
                className="px-6 py-3 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
              >
                Previous
              </button>

              <button
                onClick={() => setSelectedTutorial(null)}
                className="px-6 py-3 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
              >
                Back to Tutorials
              </button>

              {currentStep === selectedTutorial.steps.length - 1 ? (
                <button
                  onClick={handleCompleteTutorial}
                  className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center gap-2"
                >
                  <CheckCircle size={20} />
                  Complete Tutorial
                </button>
              ) : (
                <button
                  onClick={handleNextStep}
                  className="px-6 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
                >
                  Next Step
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Interactive Tutorials</h2>
        <p className="text-gray-600 dark:text-gray-300">Learn at your own pace with step-by-step guidance</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorials.map((tutorial) => {
          const isCompleted = progress.completedTutorials.includes(tutorial.id);
          const isViewed = progress.viewedTutorials.includes(tutorial.id);

          return (
            <div
              key={tutorial.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">{tutorial.title}</h3>
                  {isCompleted && (
                    <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
                  )}
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">{tutorial.description}</p>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tutorial.difficulty)}`}>
                    {tutorial.difficulty}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <Clock size={14} />
                    {tutorial.estimatedTime}
                  </span>
                  {isViewed && !isCompleted && (
                    <span className="text-xs text-blue-500 bg-blue-100 px-2 py-1 rounded-full">
                      In Progress
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleTutorialSelect(tutorial)}
                  className="w-full bg-primary-500 text-white py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Play size={18} />
                  {isCompleted ? 'Review Tutorial' : isViewed ? 'Continue' : 'Start Tutorial'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}