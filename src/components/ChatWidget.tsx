import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare } from 'lucide-react';
import { ChatHeader } from './ChatHeader';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { SuggestedQuestions } from './SuggestedQuestions';
import { Message } from '../types';
import { searchFAQs } from '../data/faqs';

interface ChatWidgetProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function ChatWidget({ isOpen: propIsOpen, onClose }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(propIsOpen || false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsOpen(propIsOpen || false);
  }, [propIsOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized && messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        text: "👋 Hello! I'm your Digital Literacy Assistant. I can help you learn how to use digital tools like WhatsApp, Paytm, and Google Maps. What would you like to know?",
        timestamp: new Date()
      };
      
      setMessages([welcomeMessage]);
    }
  }, [isOpen, isMinimized, messages.length]);

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
      setIsProcessing(false);
    }, 1000);
  };

  const generateResponse = (query: string): string => {
    const results = searchFAQs(query);
    
    if (results.length > 0) {
      const bestMatch = results[0];
      let response = `Here's how to ${bestMatch.question.toLowerCase().replace('how do i ', '')}:\n\n`;
      
      bestMatch.answer.forEach((step, index) => {
        response += `${index + 1}. ${step}\n`;
      });
      
      return response;
    }
    
    return "I'm sorry, I don't have information about that yet. Could you try asking about WhatsApp, Paytm, or Google Maps features?";
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

  if (!isOpen) {
    return (
      <button 
        onClick={handleToggleChat}
        className="fixed bottom-6 right-6 bg-primary-500 text-white p-4 rounded-full shadow-lg hover:bg-primary-600 transition-all duration-300 z-50 animate-pulse-slow"
        aria-label="Open chat assistant"
      >
        <MessageSquare size={24} />
      </button>
    );
  }

  return (
    <div 
      className={`fixed bottom-6 right-6 bg-gray-50 rounded-xl shadow-2xl z-50 flex flex-col transition-all duration-300 ${
        isMinimized 
          ? 'w-auto h-auto' 
          : 'w-[350px] sm:w-[400px] h-[600px] max-h-[80vh]'
      }`}
    >
      {isMinimized ? (
        <button 
          onClick={handleToggleChat}
          className="bg-primary-500 text-white p-4 rounded-full shadow-lg hover:bg-primary-600 transition-colors"
          aria-label="Expand chat assistant"
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
                <div className="h-2 w-2 bg-primary-400 rounded-full animate-bounce\" style={{ animationDelay: '0ms' }}></div>
                <div className="h-2 w-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="h-2 w-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            )}
            
            {messages.length === 1 && (
              <SuggestedQuestions onQuestionClick={handleSuggestedQuestionClick} />
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <ChatInput 
            onSendMessage={handleSendMessage} 
            isProcessing={isProcessing} 
          />
        </>
      )}
    </div>
  );
}