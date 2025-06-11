import { useState } from 'react';
import { Settings, Type, Moon, Sun, Volume2, VolumeX, Languages, Mic, MicOff } from 'lucide-react';
import { useAccessibility } from '../hooks/useAccessibility';

interface AccessibilityPanelProps {
  onVoiceToggle: (listening: boolean) => void;
  isVoiceListening: boolean;
}

export function AccessibilityPanel({ onVoiceToggle, isVoiceListening }: AccessibilityPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, updateSettings, speakText } = useAccessibility();

  const handleFontSizeChange = (size: 'small' | 'medium' | 'large') => {
    updateSettings({ fontSize: size });
    speakText(`Font size changed to ${size}`);
  };

  const handleDarkModeToggle = () => {
    const newMode = !settings.darkMode;
    updateSettings({ darkMode: newMode });
    speakText(newMode ? 'Dark mode enabled' : 'Light mode enabled');
  };

  const handleLanguageChange = (language: 'en' | 'hi') => {
    updateSettings({ language });
    speakText(language === 'hi' ? 'भाषा हिंदी में बदली गई' : 'Language changed to English');
  };

  const handleTextToSpeechToggle = () => {
    const newTTS = !settings.textToSpeech;
    updateSettings({ textToSpeech: newTTS });
    if (newTTS) {
      speakText('Text to speech enabled');
    }
  };

  const handleVoiceCommandToggle = () => {
    onVoiceToggle(!isVoiceListening);
    speakText(isVoiceListening ? 'Voice commands disabled' : 'Voice commands enabled');
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary-500 text-white p-3 rounded-full shadow-lg hover:bg-primary-600 transition-colors"
        aria-label="Accessibility settings"
      >
        <Settings size={20} />
      </button>

      {isOpen && (
        <div className="absolute top-14 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 w-80 border border-gray-200 dark:border-gray-700">
          <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-white">Accessibility Settings</h3>
          
          {/* Font Size */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Type size={16} className="inline mr-2" />
              Font Size
            </label>
            <div className="flex gap-2">
              {(['small', 'medium', 'large'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => handleFontSizeChange(size)}
                  className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                    settings.fontSize === size
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Dark Mode */}
          <div className="mb-4">
            <button
              onClick={handleDarkModeToggle}
              className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <span className="flex items-center text-gray-700 dark:text-gray-300">
                {settings.darkMode ? <Moon size={16} className="mr-2" /> : <Sun size={16} className="mr-2" />}
                {settings.darkMode ? 'Dark Mode' : 'Light Mode'}
              </span>
              <div className={`w-12 h-6 rounded-full transition-colors ${settings.darkMode ? 'bg-primary-500' : 'bg-gray-300'}`}>
                <div className={`w-5 h-5 bg-white rounded-full mt-0.5 transition-transform ${settings.darkMode ? 'translate-x-6' : 'translate-x-0.5'}`} />
              </div>
            </button>
          </div>

          {/* Language */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Languages size={16} className="inline mr-2" />
              Language
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => handleLanguageChange('en')}
                className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                  settings.language === 'en'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                English
              </button>
              <button
                onClick={() => handleLanguageChange('hi')}
                className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                  settings.language === 'hi'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                हिंदी
              </button>
            </div>
          </div>

          {/* Text to Speech */}
          <div className="mb-4">
            <button
              onClick={handleTextToSpeechToggle}
              className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <span className="flex items-center text-gray-700 dark:text-gray-300">
                {settings.textToSpeech ? <Volume2 size={16} className="mr-2" /> : <VolumeX size={16} className="mr-2" />}
                Text to Speech
              </span>
              <div className={`w-12 h-6 rounded-full transition-colors ${settings.textToSpeech ? 'bg-primary-500' : 'bg-gray-300'}`}>
                <div className={`w-5 h-5 bg-white rounded-full mt-0.5 transition-transform ${settings.textToSpeech ? 'translate-x-6' : 'translate-x-0.5'}`} />
              </div>
            </button>
          </div>

          {/* Voice Commands */}
          <div className="mb-4">
            <button
              onClick={handleVoiceCommandToggle}
              className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <span className="flex items-center text-gray-700 dark:text-gray-300">
                {isVoiceListening ? <Mic size={16} className="mr-2" /> : <MicOff size={16} className="mr-2" />}
                Voice Commands
              </span>
              <div className={`w-12 h-6 rounded-full transition-colors ${isVoiceListening ? 'bg-primary-500' : 'bg-gray-300'}`}>
                <div className={`w-5 h-5 bg-white rounded-full mt-0.5 transition-transform ${isVoiceListening ? 'translate-x-6' : 'translate-x-0.5'}`} />
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}