"use client";

import { useState, FormEvent, ChangeEvent, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Bot, User, Send, Mic, Paperclip, Sun, Moon, Monitor, ArrowDown, Copy, ArrowLeft } from 'lucide-react';
import ChatWidget from '@/components/ChatWidget';

interface Message {
  text: string;
  isUser: boolean;
}

export default function AiPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [isDark, setIsDark] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isAtBottom, setIsAtBottom] = useState<boolean>(true);


  useEffect(() => {
    try {
      const saved = (localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null);
      if (saved === 'light' || saved === 'dark' || saved === 'system') {
        setTheme(saved);
      }
    } catch {
    
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('theme', theme);
    } catch {

    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyResolvedTheme = () => {
      const nextIsDark = theme === 'dark' || (theme === 'system' && mediaQuery.matches);
      setIsDark(nextIsDark);
    };

    applyResolvedTheme();

    if (theme === 'system') {
      mediaQuery.addEventListener('change', applyResolvedTheme);
      return () => mediaQuery.removeEventListener('change', applyResolvedTheme);
    }
  }, [theme]);
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  }, [isDark]);

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = { text: inputValue, isUser: true };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    // reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
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
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [inputValue]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (isAtBottom && chatContainerRef.current) {
      chatContainerRef.current.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isAtBottom]);

  const handleChatScroll = () => {
    const el = chatContainerRef.current;
    if (!el) return;
    const threshold = 48; // px leeway
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - threshold;
    setIsAtBottom(atBottom);
  };

  const scrollToBottom = () => {
    const el = chatContainerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // ignore copy errors
    }
  };

  return (
    <div className={`${isDark ? 'dark' : ''} flex flex-col h-screen bg-white dark:bg-neutral-900`}>
      <header className="border-b border-gray-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur px-4 py-3 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleBack}
              title="Go back"
              className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors"
            >
              <ArrowLeft size={16} />
            </button>
            <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-green-500 text-white flex items-center justify-center shadow-sm">
              <Bot size={18} />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100 leading-tight">Query Build AI</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Ask anything about building queries</p>
            </div>
            </div>
          </div>
          <div className="inline-flex items-center rounded-md border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-0.5 shadow-sm">
            <button
              type="button"
              aria-label="Light mode"
              onClick={() => setTheme('light')}
              className={`flex items-center gap-1 px-2 py-1 rounded-sm text-xs transition-colors ${theme === 'light' ? 'bg-green-500 text-white' : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'}`}
            >
              <Sun size={14} />
              Light
            </button>
            <button
              type="button"
              aria-label="System mode"
              onClick={() => setTheme('system')}
              className={`flex items-center gap-1 px-2 py-1 rounded-sm text-xs transition-colors ${theme === 'system' ? 'bg-green-500 text-white' : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'}`}
            >
              <Monitor size={14} />
              System
            </button>
            <button
              type="button"
              aria-label="Dark mode"
              onClick={() => setTheme('dark')}
              className={`flex items-center gap-1 px-2 py-1 rounded-sm text-xs transition-colors ${theme === 'dark' ? 'bg-green-500 text-white' : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'}`}
            >
              <Moon size={14} />
              Dark
            </button>
          </div>
        </div>
      </header>
      <main ref={chatContainerRef} onScroll={handleChatScroll} className="flex-1 overflow-y-auto bg-gray-50 dark:bg-neutral-950 [background-image:radial-gradient(24rem_24rem_at_120%_-10%,rgba(16,185,129,0.08),transparent_70%),radial-gradient(24rem_24rem_at_-20%_120%,rgba(16,185,129,0.06),transparent_70%)]">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center">
                <Bot className="w-8 h-8 text-gray-400 dark:text-gray-300" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                How can I help you today?
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Ask me anything about building queries or get help with your questions.
              </p>
            </div>
          </div>
        )}
        
        {messages.map((message, index) => (
          <div key={index} className={`py-4 ${message.isUser ? 'bg-white/0' : 'bg-transparent'}`}>
            <div className="max-w-3xl mx-auto px-4">
              <div className={`flex items-start gap-3 ${message.isUser ? 'justify-end' : ''}`}>
                {!message.isUser && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}
                <div className={`max-w-[80%] sm:max-w-[70%] ${message.isUser ? 'order-1' : ''}`}>
                  <div className={`group relative rounded-2xl border shadow-sm px-4 py-3 ${message.isUser 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-950 dark:bg-emerald-950/40 dark:border-emerald-900/60 dark:text-emerald-100' 
                    : 'bg-white border-gray-200 text-gray-900 dark:bg-neutral-800 dark:border-neutral-700 dark:text-gray-100'}`}>
                    {!message.isUser && (
                      <button
                        type="button"
                        onClick={() => copyToClipboard(message.text)}
                        title="Copy"
                        className="absolute -top-2 -right-2 hidden group-hover:flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 text-gray-600 hover:text-gray-900 shadow ring-1 ring-gray-200 dark:bg-neutral-700 dark:text-gray-200 dark:hover:text-white dark:ring-neutral-600"
                      >
                        <Copy size={14} />
                      </button>
                    )}
                    <div className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.text}
                    </div>
                  </div>
                  <div className={`mt-1 text-xs ${message.isUser ? 'text-emerald-600 dark:text-emerald-300/80 text-right' : 'text-gray-500 dark:text-gray-400'}`}>
                    {message.isUser ? 'You' : 'Query Build AI'}
                  </div>
                </div>
                {message.isUser && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 dark:bg-neutral-700 flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600 dark:text-gray-200" />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="py-6 bg-gray-50 dark:bg-neutral-950">
            <div className="max-w-3xl mx-auto px-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Query Build AI</div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {!isAtBottom && (
        <button
          type="button"
          onClick={scrollToBottom}
          className="fixed bottom-24 right-6 z-10 inline-flex items-center gap-1 rounded-full border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-200 px-3 py-1.5 shadow-sm hover:shadow transition-shadow"
          title="Scroll to bottom"
        >
          <ArrowDown size={16} />
          <span className="text-xs">New messages</span>
        </button>
      )}

      <div className="border-t border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    (e.currentTarget.form as HTMLFormElement | null)?.requestSubmit();
                  }
                }}
                rows={1}
                placeholder="Message Query Build AI..."
                className="w-full max-h-40 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-lg py-3 px-4 pr-12 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none overflow-hidden"
                disabled={isLoading}
              />
              <div className="absolute inset-y-0 right-2 flex items-center gap-1">
                <button 
                  type="button" 
                  className="p-1 text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                  title="Attach file"
                >
                  <Paperclip size={16} />
                </button>
                <button 
                  type="button" 
                  className="p-1 text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
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
          <div className="flex items-center justify-between mt-2 text-xs text-gray-400 dark:text-gray-500">
            <span>Query Build AI can make mistakes. Consider checking important information.</span>
            <span className="hidden sm:inline text-gray-400 dark:text-gray-500">Press Enter to send • Shift + Enter for newline</span>
          </div>
        </div>
      </div>
    </div>
  );
}