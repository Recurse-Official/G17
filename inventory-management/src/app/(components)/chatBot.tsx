'use client';

import React, { useRef, useState, useEffect } from 'react';
import { MessageCircle, X, Send, ArrowRight } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [streamingMessage, setStreamingMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingMessage]);

  const handleQuickQuestion = (question: string) => {
    setShowWelcome(false);
    handleSubmit(new Event('submit') as any, question);
  };

  const processStream = async (reader: ReadableStreamDefaultReader<Uint8Array>) => {
    const decoder = new TextDecoder();
    let streamingContent = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value);
        streamingContent += text;
        setStreamingMessage(streamingContent);
      }

      // When stream is complete, add the message
      setMessages(prev => [...prev, { role: 'assistant', content: streamingContent }]);
      setStreamingMessage('');
    } catch (error) {
      console.error('Error reading stream:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent, overrideInput?: string) => {
    e.preventDefault();
    const messageContent = overrideInput || input;
    if (!messageContent.trim() || isLoading) return;

    setShowWelcome(false);
    setMessages(prev => [...prev, { role: 'user', content: messageContent }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: messageContent }]
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error('Failed to fetch response');
      }

      const reader = response.body.getReader();
      await processStream(reader);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      }]);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-blue-50 rounded-2xl shadow-xl w-[400px] h-[600px] flex flex-col">
          {/* Header */}
          <div className="bg-blue-600 p-6 rounded-t-2xl">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-white text-xl">Store Support</h3>
              <button 
                onClick={() => {
                  setIsOpen(false);
                  setShowWelcome(true);
                }}
                className="text-white hover:text-blue-100 transition"
              >
                <X size={24} />
              </button>
            </div>
            <p className="text-white text-lg">How can we help?</p>
          </div>

          {/* Messages */}
          <div className="flex-1 p-6 overflow-y-auto bg-white">
            {showWelcome ? (
              <div className="space-y-4">
                <button
                  onClick={() => handleQuickQuestion("How do i determine popular products?")}
                  className="w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl flex items-center justify-between group transition-colors"
                >
                  <span className="text-gray-700 text-lg">How do i determine popular products?</span>
                  <ArrowRight size={20} className="text-blue-500 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button
                  onClick={() => handleQuickQuestion("how do i get purchase summary?")}
                  className="w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl flex items-center justify-between group transition-colors"
                >
                  <span className="text-gray-700 text-lg">how do i get purchase summary?</span>
                  <ArrowRight size={20} className="text-blue-500 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ) : (
              <>
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-4 ${
                      message.role === 'user' ? 'text-right' : 'text-left'
                    }`}
                  >
                    <div
                      className={`inline-block p-4 rounded-2xl text-lg ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-blue-50 text-gray-800'
                      } max-w-[85%]`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {streamingMessage && (
                  <div className="mb-4 text-left">
                    <div className="inline-block p-4 rounded-2xl text-lg bg-blue-50 text-gray-800 max-w-[85%]">
                      {streamingMessage}
                    </div>
                  </div>
                )}
                {isLoading && !streamingMessage && (
                  <div className="text-center text-blue-600">
                    <div className="animate-pulse text-lg">Typing...</div>
                  </div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 bg-white border-t">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Send a message..."
                className="flex-1 p-4 text-lg rounded-xl bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200 border-none placeholder-gray-500"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-4 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={24} />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <MessageCircle size={28} />
        </button>
      )}
    </div>
  );
};

export default ChatBot;