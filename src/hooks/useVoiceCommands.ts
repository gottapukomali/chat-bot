import { useEffect, useRef } from 'react';

interface VoiceCommandsProps {
  onNavigate: (page: string) => void;
  onFontSizeChange: (size: 'small' | 'medium' | 'large') => void;
  onOpenChat: () => void;
}

export function useVoiceCommands({ onNavigate, onFontSizeChange, onOpenChat }: VoiceCommandsProps) {
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const isListening = useRef(false);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.log('Speech recognition not supported');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const command = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
      
      // Navigation commands
      if (command.includes('home') || command.includes('go home')) {
        onNavigate('home');
      } else if (command.includes('about') || command.includes('go to about')) {
        onNavigate('about');
      } else if (command.includes('contact') || command.includes('go to contact')) {
        onNavigate('contact');
      } else if (command.includes('open chat') || command.includes('start chat')) {
        onOpenChat();
      }
      
      // Font size commands
      else if (command.includes('increase font') || command.includes('bigger text')) {
        onFontSizeChange('large');
      } else if (command.includes('decrease font') || command.includes('smaller text')) {
        onFontSizeChange('small');
      } else if (command.includes('normal font') || command.includes('medium text')) {
        onFontSizeChange('medium');
      }
    };

    recognition.onerror = (event) => {
      console.log('Speech recognition error:', event.error);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onNavigate, onFontSizeChange, onOpenChat]);

  const startListening = () => {
    if (recognitionRef.current && !isListening.current) {
      recognitionRef.current.start();
      isListening.current = true;
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening.current) {
      recognitionRef.current.stop();
      isListening.current = false;
    }
  };

  return { startListening, stopListening, isListening: isListening.current };
}