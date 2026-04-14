import { useState } from 'react';

export type MessageRole = 'user' | 'bot';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
}

export function useChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'bot',
      content: 'Namaste! Main Shreyash ka AI assistant hoon. Main aapki kaise madad kar sakta hoon?',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isWakingUp, setIsWakingUp] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // We use a relative path here to bypass CORS issues entirely!
  // In development, Vite's proxy (vite.config.ts) handles this request.
  // In production, Vercel's rewrite rules (vercel.json) handle this request.
  const API_URL = '/api/bot/webhook';

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setIsWakingUp(false);
    setError(null);

    // Render free tier instances go to sleep after inactivity.
    // Show a "waking up" indicator if the request takes more than 4 seconds.
    const wakeupTimer = setTimeout(() => {
      setIsWakingUp(true);
    }, 4000);

    try {
      // The API payload as expected by PersonalBot webhook format
      const payload = {
        query: {
          sender: "WebUser",
          message: content.trim(),
          isGroup: false
        }
      };

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Clear waking up timer instantly when we get any response
      clearTimeout(wakeupTimer);
      setIsWakingUp(false);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      // Support both { replies: [{ message: "..." }] } and { message: "..." } formats documented
      let botResponse = "Sorry, I couldn't understand that.";
      if (data.replies && data.replies.length > 0 && data.replies[0].message) {
        botResponse = data.replies[0].message;
      } else if (data.message) {
        botResponse = data.message;
      }

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: botResponse,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      clearTimeout(wakeupTimer);
      setIsWakingUp(false);
      console.error('Chatbot API error:', err);
      setError('Connection failed. Please try again.');
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: 'Maaf kijiye, abhi server se connect nahi ho paa raha hoon. (Connection failed)',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    isWakingUp,
    error,
    sendMessage,
  };
}