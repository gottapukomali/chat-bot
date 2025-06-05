export interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export interface Tutorial {
  id: string;
  title: string;
  steps: string[];
}