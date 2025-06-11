import { useState, useEffect } from 'react';

export interface AccessibilitySettings {
  fontSize: 'small' | 'medium' | 'large';
  darkMode: boolean;
  language: 'en' | 'hi';
  textToSpeech: boolean;
}

export function useAccessibility() {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const saved = localStorage.getItem('accessibility-settings');
    return saved ? JSON.parse(saved) : {
      fontSize: 'medium',
      darkMode: false,
      language: 'en',
      textToSpeech: false
    };
  });

  useEffect(() => {
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
    
    // Apply font size
    document.documentElement.className = document.documentElement.className
      .replace(/font-size-\w+/g, '')
      .concat(` font-size-${settings.fontSize}`);
    
    // Apply dark mode
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings]);

  const updateSettings = (newSettings: Partial<AccessibilitySettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const speakText = (text: string) => {
    if (settings.textToSpeech && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = settings.language === 'hi' ? 'hi-IN' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  return { settings, updateSettings, speakText };
}