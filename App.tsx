
import React, { useState, useCallback } from 'react';
import { DataInputScreen } from './components/DataInputScreen';
import { ChatScreen } from './components/ChatScreen';
import type { ChatMessage } from './types';
import { getAnswer } from './services/geminiService';

const App: React.FC = () => {
  const [agencyInfo, setAgencyInfo] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSaveInfo = (info: string) => {
    setAgencyInfo(info);
    setChatHistory([
      {
        id: '1',
        sender: 'ai',
        text: 'Information saved. I am ready to answer questions about your agency. How can I help you?',
      },
    ]);
  };

  const handleReset = () => {
    setAgencyInfo(null);
    setChatHistory([]);
    setError(null);
    setIsLoading(false);
  };

  const handleSendMessage = useCallback(async (query: string) => {
    if (!agencyInfo) return;

    const userMessage: ChatMessage = { id: Date.now().toString(), sender: 'user', text: query };
    setChatHistory(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const aiResponseText = await getAnswer(agencyInfo, query);
      const aiMessage: ChatMessage = { id: (Date.now() + 1).toString(), sender: 'ai', text: aiResponseText };
      setChatHistory(prev => [...prev, aiMessage]);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred.';
      setError(`Error: ${errorMessage}. Please try again.`);
      const aiErrorMessage: ChatMessage = { id: (Date.now() + 1).toString(), sender: 'ai', text: `Sorry, I encountered an error. ${errorMessage}` };
      setChatHistory(prev => [...prev, aiErrorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [agencyInfo]);

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl h-[90vh] max-h-[800px] bg-slate-800 rounded-2xl shadow-2xl shadow-blue-500/10 flex flex-col">
        {!agencyInfo ? (
          <DataInputScreen onSave={handleSaveInfo} />
        ) : (
          <ChatScreen
            chatHistory={chatHistory}
            isLoading={isLoading}
            error={error}
            onSendMessage={handleSendMessage}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
};

export default App;
