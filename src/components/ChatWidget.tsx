import { useState, useEffect, useRef } from 'react';
import { MessageSquare, Mic, MicOff } from 'lucide-react';
import { ChatHeader } from './ChatHeader';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { SuggestedQuestions } from './SuggestedQuestions';
import { Message } from '../types';
import { searchFAQs } from '../data/faqs';
import { useAccessibility } from '../hooks/useAccessibility';

interface ChatWidgetProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function ChatWidget({ isOpen: propIsOpen, onClose }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(propIsOpen || false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { speakText } = useAccessibility();

  useEffect(() => {
    setIsOpen(propIsOpen || false);
  }, [propIsOpen]);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        handleSendMessage(transcript);
        setIsListening(false);
      };

      recognitionInstance.onerror = () => {
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized && messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        text: "👋 Hello! I'm DigiBuddy, your Digital Literacy Assistant. I can help you learn how to use digital tools like WhatsApp, Paytm, and Google Maps. You can type your questions or use the microphone to speak. What would you like to know?",
        timestamp: new Date()
      };
      
      setMessages([welcomeMessage]);
      speakText("Hello! I'm DigiBuddy, your Digital Literacy Assistant. How can I help you today?");
    }
  }, [isOpen, isMinimized, messages.length, speakText]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);
    
    setTimeout(() => {
      const botResponse = generateResponse(text);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: botResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      speakText(botResponse);
      setIsProcessing(false);
    }, 1000);
  };

  const generateResponse = (query: string): string => {
    // Handle greetings and small talk
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes('hello') || lowerQuery.includes('hi') || lowerQuery.includes('hey')) {
      return "Hello! I'm here to help you learn digital tools. You can ask me about WhatsApp, Paytm, Google Maps, or general smartphone features. What would you like to learn?";
    }
    
    if (lowerQuery.includes('thank') || lowerQuery.includes('thanks')) {
      return "You're welcome! I'm always here to help you learn. Is there anything else you'd like to know about digital tools?";
    }

    if (lowerQuery.includes('how are you')) {
      return "I'm doing great and ready to help you learn! What digital skill would you like to explore today?";
    }

    const results = searchFAQs(query);
    
    if (results.length > 0) {
      const bestMatch = results[0];
      let response = `Here's how to ${bestMatch.question.toLowerCase().replace('how do i ', '')}:\n\n`;
      
      bestMatch.answer.forEach((step, index) => {
        response += `${index + 1}. ${step}\n`;
      });
      
      response += `\nWould you like me to explain any of these steps in more detail?`;
      return response;
    }
    
    return "I'm sorry, I don't have information about that yet. Could you try asking about WhatsApp, Paytm, Google Maps features, or general smartphone usage? You can also try rephrasing your question.";
  };

  const handleToggleChat = () => {
    if (isMinimized) {
      setIsMinimized(false);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
    if (onClose) {
      onClose();
    }
  };

  const handleSuggestedQuestionClick = (question: string) => {
    handleSendMessage(question);
  };

  const toggleVoiceInput = () => {
    if (recognition) {
      if (isListening) {
        recognition.stop();
        setIsListening(false);
      } else {
        recognition.start();
        setIsListening(true);
        speakText("Listening for your question...");
      }
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={handleToggleChat}
        className="fixed bottom-6 right-6 bg-primary-500 text-white p-4 rounded-full shadow-lg hover:bg-primary-600 transition-all duration-300 z-50 animate-pulse-slow"
        aria-label="Open DigiBuddy chat assistant"
      >
        <MessageSquare size={24} />
      </button>
    );
  }

  return (
    <div 
      className={`fixed bottom-6 right-6 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-2xl z-50 flex flex-col transition-all duration-300 ${
        isMinimized 
          ? 'w-auto h-auto' 
          : 'w-[350px] sm:w-[400px] h-[600px] max-h-[80vh]'
      }`}
    >
      {isMinimized ? (
        <button 
          onClick={handleToggleChat}
          className="bg-primary-500 text-white p-4 rounded-full shadow-lg hover:bg-primary-600 transition-colors"
          aria-label="Expand DigiBuddy chat assistant"
        >
          <MessageSquare size={24} />
        </button>
      ) : (
        <>
          <ChatHeader onClose={handleClose} onMinimize={handleMinimize} />
          
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map(message => (
              <ChatMessage key={message.id} message={message} />
            ))}
            
            {isProcessing && (
              <div className="flex items-center gap-2 text-gray-500 ml-12 mb-4">
                <div className="h-2 w-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="h-2 w-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="h-2 w-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            )}
            
            {messages.length === 1 && (
              <SuggestedQuestions onQuestionClick={handleSuggestedQuestionClick} />
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-3 sticky bottom-0 w-full">
            <div className="flex items-center gap-2">
              <ChatInput 
                onSendMessage={handleSendMessage} 
                isProcessing={isProcessing} 
              />
              {recognition && (
                <button
                  onClick={toggleVoiceInput}
                  className={`p-3 rounded-full transition-colors ${
                    isListening 
                      ? 'bg-red-500 text-white animate-pulse' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  aria-label={isListening ? "Stop listening" : "Start voice input"}
                >
                  {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}