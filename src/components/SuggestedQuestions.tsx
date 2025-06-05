import React from 'react';
import { suggestedQuestions } from '../data/faqs';

interface SuggestedQuestionsProps {
  onQuestionClick: (question: string) => void;
}

export function SuggestedQuestions({ onQuestionClick }: SuggestedQuestionsProps) {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium text-gray-500 mb-2">Suggested questions:</h3>
      <div className="flex flex-wrap gap-2">
        {suggestedQuestions.map((question, index) => (
          <button
            key={index}
            onClick={() => onQuestionClick(question)}
            className="text-sm bg-primary-50 text-primary-700 px-3 py-2 rounded-full hover:bg-primary-100 transition-colors"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}