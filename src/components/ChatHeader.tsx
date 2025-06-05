import React from 'react';
import { MessageSquare, X, Minimize2 } from 'lucide-react';

interface ChatHeaderProps {
  onClose: () => void;
  onMinimize: () => void;
}

export function ChatHeader({ onClose, onMinimize }: ChatHeaderProps) {
  return (
    <div className="bg-primary-500 text-white p-4 rounded-t-xl flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <MessageSquare size={24} className="text-primary-100" />
        <div>
          <h1 className="font-bold">Chart breakot</h1>
          <p className="text-xs text-primary-100">Learn to use digital tools with ease</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button 
          onClick={onMinimize} 
          className="p-1 hover:bg-primary-600 rounded-full transition-colors"
          aria-label="Minimize chat"
        >
          <Minimize2 size={18} />
        </button>
        <button 
          onClick={onClose} 
          className="p-1 hover:bg-primary-600 rounded-full transition-colors"
          aria-label="Close chat"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}