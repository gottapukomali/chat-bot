import React from 'react';
import { MessageSquare, User } from 'lucide-react';
import { Message } from '../types';
import { cn } from '../lib/utils';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.type === 'bot';
  
  return (
    <div 
      className={cn(
        "flex items-start mb-4 gap-3 animate-fade-in",
        isBot ? "mr-12" : "ml-12 flex-row-reverse"
      )}
    >
      <div 
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
          isBot ? "bg-primary-100" : "bg-primary-500"
        )}
      >
        {isBot ? (
          <MessageSquare size={16} className="text-primary-500" />
        ) : (
          <User size={16} className="text-white" />
        )}
      </div>
      
      <div 
        className={cn(
          "py-3 px-4 rounded-xl max-w-[85%]",
          isBot 
            ? "bg-white border border-gray-200 text-gray-800" 
            : "bg-primary-500 text-white"
        )}
      >
        {message.text.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index < message.text.split('\n').length - 1 && <br />}
          </React.Fragment>
        ))}
        
        <div 
          className={cn(
            "text-xs mt-1",
            isBot ? "text-gray-500" : "text-primary-200"
          )}
        >
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}