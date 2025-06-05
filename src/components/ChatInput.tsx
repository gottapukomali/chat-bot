import React, { useState, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isProcessing: boolean;
}

export function ChatInput({ onSendMessage, isProcessing }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !isProcessing) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 p-3 sticky bottom-0 w-full">
      <div className="flex items-center gap-2 relative">
        <input
          type="text"
          placeholder={isProcessing ? "Waiting for response..." : "Type your question here..."}
          className="flex-1 rounded-full border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isProcessing}
        />
        <button
          className="bg-primary-500 text-white p-3 rounded-full transition-all duration-200 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSend}
          disabled={!message.trim() || isProcessing}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}