"use client";

import { useEffect, useRef, useState, FormEvent, ChangeEvent } from "react";
import { Bot, MessageSquare, Send, X, Maximize2, Paperclip, Mic, Copy } from "lucide-react";
import { useRouter } from "next/navigation";

interface Message {
  text: string;
  isUser: boolean;
  timestampMs: number;
  isError?: boolean;
}

interface ChatWidgetProps {
  defaultOpen?: boolean;
}

export default function ChatWidget({ defaultOpen = false }: ChatWidgetProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasUnread, setHasUnread] = useState<boolean>(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const lastPromptRef = useRef<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = { text: inputValue, isUser: true, timestampMs: Date.now() };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    lastPromptRef.current = currentInput;
    setInputValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentInput }),
      });

      if (!response.ok) {
        throw new Error("Failed to get a response from the AI.");
      }

      const data = await response.json();
      const aiResponse: Message = { text: data.reply, isUser: false, timestampMs: Date.now() };
      setMessages((prev) => [...prev, aiResponse]);
    } catch {
      const errorResponse: Message = {
        text: "Sorry, I couldn't get a response. Please try again.",
        isUser: false,
        isError: true,
        timestampMs: Date.now(),
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // ignore
    }
  };

  // auto scroll on new messages
  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, isOpen]);

  // unread indicator when closed and AI replies arrive
  useEffect(() => {
    if (!isOpen && messages.length > 0) {
      const last = messages[messages.length - 1];
      if (!last.isUser) setHasUnread(true);
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) setHasUnread(false);
  }, [isOpen]);

  // auto-grow textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(160, el.scrollHeight)}px`;
  }, [inputValue]);

  // ESC to close
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // Persist messages
  useEffect(() => {
    try {
      const raw = localStorage.getItem("chatWidget.v1.messages");
      if (raw) {
        const parsed = JSON.parse(raw) as Message[];
        if (Array.isArray(parsed)) setMessages(parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("chatWidget.v1.messages", JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  return (
    <>
      {/* Floating button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 shadow-lg"
          title="Chat with Query Build AI"
        >
          <MessageSquare size={18} />
          <span className="hidden sm:inline">Chat</span>
          {hasUnread && <span className="ml-1 inline-block w-2.5 h-2.5 rounded-full bg-red-500" />}
        </button>
      )}

      {/* Panel */}
      {isOpen && (
        <div ref={panelRef} className="fixed bottom-6 right-6 z-50 w-[92vw] max-w-sm sm:max-w-md">
          <div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-emerald-400/60 via-emerald-500/30 to-transparent shadow-2xl">
            <div className="rounded-2xl border border-gray-200 bg-white/90 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/90">
          {/* Header */}
          <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-gray-200/80 dark:border-neutral-800/80">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-emerald-600 text-white flex items-center justify-center">
                <Bot size={16} />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Query Build AI</div>
                <div className="text-[11px] text-gray-500 dark:text-gray-400">Ask anything about building queries</div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => router.push("/ai")}
                className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs border border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-900/60 dark:text-emerald-200 dark:hover:bg-emerald-900/30"
                title="Open full chat"
              >
                <Maximize2 size={14} /> Full
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center justify-center w-7 h-7 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-neutral-700 dark:text-gray-300 dark:hover:bg-neutral-800"
                title="Close"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={listRef} className="h-72 overflow-y-auto bg-gray-50/60 dark:bg-neutral-950/40 px-3 py-3 space-y-3">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                  Start a conversation with Query Build AI
                </div>
              </div>
            ) : (
              messages.map((m, idx) => (
                <div key={idx} className={`flex ${m.isUser ? "justify-end" : "justify-start"}`}>
                  <div className="group relative max-w-[80%]">
                    <div
                      className={`rounded-2xl px-3 py-2 text-sm border shadow-sm ${
                        m.isUser
                          ? "bg-gradient-to-br from-emerald-600 to-green-600 text-white border-transparent"
                          : "bg-white border-gray-200 text-gray-900 dark:bg-neutral-800 dark:border-neutral-700 dark:text-gray-100"
                      }`}
                    >
                      {m.text}
                    </div>
                    {!m.isUser && (
                      <button
                        type="button"
                        onClick={() => copyToClipboard(m.text)}
                        className="absolute -top-2 -right-2 hidden group-hover:flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 text-gray-600 hover:text-gray-900 shadow ring-1 ring-gray-200 dark:bg-neutral-700 dark:text-gray-200 dark:hover:text-white dark:ring-neutral-600"
                        title="Copy"
                      >
                        <Copy size={14} />
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                  <Bot size={10} />
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3">
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    (e.currentTarget.form as HTMLFormElement | null)?.requestSubmit();
                  }
                  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                    (e.currentTarget.form as HTMLFormElement | null)?.requestSubmit();
                  }
                }}
                rows={1}
                placeholder="Type your message..."
                className="w-full max-h-32 bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 rounded-lg py-2.5 pl-3 pr-24 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none overflow-hidden"
                disabled={isLoading}
              />
              <div className="absolute right-1.5 bottom-1.5 flex items-center gap-1">
                <button
                  type="button"
                  className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-neutral-700 dark:text-gray-300 dark:hover:bg-neutral-800"
                  title="Attach"
                >
                  <Paperclip size={14} />
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-neutral-700 dark:text-gray-300 dark:hover:bg-neutral-800"
                  title="Voice"
                >
                  <Mic size={14} />
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50"
                  disabled={isLoading || !inputValue.trim()}
                  title="Send"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


