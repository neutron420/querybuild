"use client";

import { useState, FormEvent, ChangeEvent } from 'react';
import { Bot, User, CornerDownLeft, Mic, Paperclip } from 'lucide-react';

// Define the structure for a message in the chat
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
      // Call the backend API you created
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
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4 shadow-md z-10">
        <h1 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
          Query Build AI
        </h1>
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message, index) => (
          <div key={index} className={`flex items-start gap-4 ${message.isUser ? 'justify-end' : ''}`}>
            {!message.isUser && (
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center">
                <Bot size={24} />
              </div>
            )}
            <div className={`max-w-md p-4 rounded-2xl ${message.isUser ? 'bg-blue-600 rounded-br-none' : 'bg-gray-700 rounded-bl-none'}`}>
              <p className="text-base">{message.text}</p>
            </div>
            {message.isUser && (
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                <User size={24} />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center">
              <Bot size={24} />
            </div>
            <div className="max-w-md p-4 rounded-2xl bg-gray-700 rounded-bl-none flex items-center space-x-2">
              <span className="h-2 w-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></span>
              <span className="h-2 w-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '200ms' }}></span>
              <span className="h-2 w-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '400ms' }}></span>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-gray-800 p-4 shadow-inner">
        <form onSubmit={handleSubmit} className="flex items-center gap-4 max-w-4xl mx-auto">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Ask Query Build anything..."
              className="w-full bg-gray-700 border-2 border-transparent rounded-full py-3 px-6 pr-24 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              disabled={isLoading}
            />
            <div className="absolute inset-y-0 right-4 flex items-center gap-2">
              <button type="button" className="text-gray-400 hover:text-white transition-colors">
                <Mic size={20} />
              </button>
              <button type="button" className="text-gray-400 hover:text-white transition-colors">
                <Paperclip size={20} />
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full p-3 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading || !inputValue.trim()}
          >
            <CornerDownLeft size={24} />
          </button>
        </form>
      </footer>
    </div>
  );
}