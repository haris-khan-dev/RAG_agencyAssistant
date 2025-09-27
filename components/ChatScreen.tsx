
import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';
import { PaperAirplaneIcon } from './icons/PaperAirplaneIcon';
import { ArrowPathIcon } from './icons/ArrowPathIcon';
import { SparklesIcon } from './icons/SparklesIcon';

interface ChatScreenProps {
  chatHistory: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  onSendMessage: (query: string) => void;
  onReset: () => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({
  chatHistory,
  isLoading,
  onSendMessage,
  onReset,
}) => {
  const [query, setQuery] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSendMessage(query.trim());
      setQuery('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between p-4 border-b border-slate-700">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
           <SparklesIcon className="w-6 h-6 text-blue-400" />
           Agency Assistant
        </h2>
        <button
          onClick={onReset}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition duration-300"
        >
          <ArrowPathIcon className="w-5 h-5" />
          Reset
        </button>
      </header>

      <div ref={chatContainerRef} className="flex-grow p-4 overflow-y-auto space-y-6">
        {chatHistory.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}
          >
            {msg.sender === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                <SparklesIcon className="w-5 h-5 text-white" />
              </div>
            )}
            <div
              className={`max-w-md p-3 rounded-xl whitespace-pre-wrap ${
                msg.sender === 'user'
                  ? 'bg-slate-700 text-white rounded-br-none'
                  : 'bg-slate-900 text-slate-300 rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <SparklesIcon className="w-5 h-5 text-white" />
                </div>
                <div className="max-w-md p-3 rounded-xl bg-slate-900 text-slate-300 rounded-bl-none flex items-center gap-2">
                    <span className="animate-pulse">Thinking</span>
                    <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"></div>
                </div>
            </div>
        )}
      </div>

      <div className="p-4 border-t border-slate-700">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about company policies, projects, etc."
            className="flex-grow w-full p-3 bg-slate-700 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-lg transition duration-300 flex items-center justify-center disabled:bg-slate-600 disabled:cursor-not-allowed"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
