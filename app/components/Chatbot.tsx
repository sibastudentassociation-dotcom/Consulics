'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export default function Chatbot() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hi! 👋 How can I help you today? I can assist with tax filing, trucking services, or answer questions about our offerings.',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAppointmentCTA, setShowAppointmentCTA] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setShowAppointmentCTA(/appointment|schedule|book|consult|consultation/i.test(input));
    setInput('');
    setIsLoading(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: getBotResponse(input),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 500);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    if (input.includes('tax')) {
      return "We offer comprehensive tax services including individual tax filing, business taxes, self-employed taxes, and more. Would you like to learn about a specific tax service?";
    }
    if (input.includes('trucking') || input.includes('ifta') || input.includes('irp')) {
      return "We provide complete trucking solutions including IFTA registration, IRP services, DOT compliance, and company setup. What specific trucking service would you like help with?";
    }
    if (input.includes('price') || input.includes('cost') || input.includes('how much')) {
      return "Our pricing varies based on services. Check our pricing page for detailed packages, or contact us for a custom quote. Would you like to schedule a consultation?";
    }
    if (input.includes('contact') || input.includes('call') || input.includes('phone')) {
      return "You can reach us via phone at (555) 123-4567 or email at info@consulics.com. Would you like to schedule a consultation?";
    }
    if (input.includes('help') || input.includes('support')) {
      return "I can help you with information about our services. Just ask about tax services, trucking solutions, pricing, or how to get started!";
    }

    return "That's a great question! For more detailed information, please visit our resources page, contact us at info@consulics.com, or schedule a consultation with our team.";
  };

  const quickQuestions = [
    'Tax Services?',
    'Trucking Services?',
    'Pricing?',
    'How to Get Started?',
    'Book Appointment',
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-primary-700 text-white p-4 rounded-full shadow-lg hover:bg-primary-800 transition z-40"
        aria-label="Open chat"
      >
        <FiMessageCircle size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-96 bg-white rounded-lg shadow-2xl flex flex-col z-50">
      {/* Header */}
      <div className="bg-primary-700 text-white rounded-t-lg p-4 flex justify-between items-center">
        <h3 className="font-semibold">Consulics Chat</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="hover:bg-primary-600 p-2 rounded transition"
          aria-label="Close chat"
        >
          <FiX size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.type === 'user'
                  ? 'bg-primary-700 text-white rounded-br-none'
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}
            >
              <p className="text-sm">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 px-4 py-2 rounded-lg rounded-bl-none">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      {messages.length === 1 && (
        <div className="px-4 py-2 border-t border-gray-200 space-y-2">
          <p className="text-xs text-gray-500 font-semibold">Quick Questions:</p>
          <div className="grid grid-cols-2 gap-2">
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => {
                  setInput(q);
                  setTimeout(() => {
                    const form = new FormData();
                    const event = new Event('submit', { bubbles: true });
                    document.querySelector('form')?.dispatchEvent(event);
                  }, 0);
                }}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded transition"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {showAppointmentCTA && (
        <div className="px-4 py-3 border-t border-gray-200">
          <button
            type="button"
            onClick={() => router.push('/appointment')}
            className="w-full rounded-lg bg-primary-700 px-3 py-2 text-sm font-semibold text-white hover:bg-primary-800 transition"
          >
            Book Appointment
          </button>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-primary-700 text-white p-2 rounded hover:bg-primary-800 transition disabled:opacity-50"
          aria-label="Send message"
        >
          <FiSend size={18} />
        </button>
      </form>
    </div>
  );
}
