"use client";

import { useState, FormEvent, ChangeEvent } from 'react';
import { Bot, User, Send, Mic, Paperclip } from 'lucide-react';

interface Message {
  text: string;
  isUser: boolean;
}

export default function AiPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = { text: inputValue, isUser: true };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentInput }),
      });

      if (!response.ok) {
        throw new Error('Failed to get a response from the AI.');
      }

      const data = await response.json();
      
      const aiResponse: Message = { 
        text: data.reply, 
        isUser: false 
      };
      setMessages(prevMessages => [...prevMessages, aiResponse]);

    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorResponse: Message = {
        text: "Sorry, I couldn't get a response. Please try again.",
        isUser: false,
      };
      setMessages(prevMessages => [...prevMessages, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <header className="border-b border-gray-200 bg-white px-4 py-3">
        <h1 className="text-lg font-semibold text-gray-900 text-center">
          Query Build AI
        </h1>
      </header>
      <main className="flex-1 overflow-y-auto bg-gray-50">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <Bot className="w-8 h-8 text-gray-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                How can I help you today?
              </h2>
              <p className="text-gray-500">
                Ask me anything about building queries or get help with your questions.
              </p>
            </div>
          </div>
        )}
        
        {messages.map((message, index) => (
          <div key={index} className={`py-6 ${message.isUser ? 'bg-white' : 'bg-gray-50'}`}>
            <div className="max-w-3xl mx-auto px-4">
              <div className="flex items-start gap-4">
                {!message.isUser && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-gray-500 mb-1">
                    {message.isUser ? 'You' : 'Query Build AI'}
                  </div>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-gray-900 leading-relaxed whitespace-pre-wrap">
                      {message.text}
                    </p>
                  </div>
                </div>
                {message.isUser && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="py-6 bg-gray-50">
            <div className="max-w-3xl mx-auto px-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-500 mb-1">Query Build AI</div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <div className="border-t border-gray-200 bg-white p-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Message Query Build AI..."
                className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 pr-12 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                disabled={isLoading}
              />
              <div className="absolute inset-y-0 right-2 flex items-center gap-1">
                <button 
                  type="button" 
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Attach file"
                >
                  <Paperclip size={16} />
                </button>
                <button 
                  type="button" 
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Voice input"
                >
                  <Mic size={16} />
                </button>
                <button
                  type="submit"
                  className="p-1.5 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading || !inputValue.trim()}
                  title="Send message"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </form>
          <div className="text-xs text-gray-400 mt-2 text-center">
            Query Build AI can make mistakes. Consider checking important information.
          </div>
        </div>
      </div>
    </div>
  );
}