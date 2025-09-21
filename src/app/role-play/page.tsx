'use client';

import { useState, useEffect } from 'react';
import { Send, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { ApiService } from '@/services/api';
import type { ChatMessage, Persona } from '@/types';
import Link from 'next/link';

type EmotionState = 'happy' | 'sad' | 'surprised' | 'neutral';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const DoodleAvatar = ({ emotion }: { emotion: EmotionState }) => {
  const getEmotionStyles = () => {
    switch (emotion) {
      case 'happy':
        return { eye1: '😊', eye2: '😊', mouth: 'M10,15 Q15,20 20,15' };
      case 'sad':
        return { eye1: '😢', eye2: '😢', mouth: 'M10,20 Q15,15 20,20' };
      case 'surprised':
        return { eye1: '😮', eye2: '😮', mouth: 'M15,18 A3,3 0 1,0 15,18' };
      default:
        return { eye1: '😌', eye2: '😌', mouth: 'M10,17 Q15,19 20,17' };
    }
  };

  const styles = getEmotionStyles();

  const getSpeechMessage = () => {
    switch (emotion) {
      case 'happy':
        return "That's wonderful! 😊";
      case 'sad':
        return "I'm here for you 💙";
      case 'surprised':
        return "Tell me more! 🤔";
      default:
        return "I'm listening...";
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Speech Bubble */}
      <AnimatePresence>
        {emotion !== 'neutral' && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg border border-gray-100 mb-3"
          >
            <p className="text-gray-700 text-sm whitespace-nowrap">{getSpeechMessage()}</p>
            {/* Speech bubble tail */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-white/90" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Doodle Avatar */}
      <motion.div 
        className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center shadow-lg"
        animate={{ scale: emotion !== 'neutral' ? [1, 1.1, 1] : 1 }}
        transition={{ duration: 0.5 }}
      >
        <svg width="32" height="32" viewBox="0 0 30 30" className="text-blue-500">
          <circle cx="10" cy="12" r="2" fill="currentColor" />
          <circle cx="20" cy="12" r="2" fill="currentColor" />
          <path d={styles.mouth} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      </motion.div>
    </div>
  );
};

// Hardcoded personas for selection
const availablePersonas: Persona[] = [
  {
    role: "Supportive Therapist",
    characteristic: "Professional, empathetic, and skilled in mental health",
    behavior: "Provides therapeutic guidance, asks thoughtful questions, and helps process emotions in a safe space"
  },
  {
    role: "Caring Friend",
    characteristic: "Warm, understanding, and supportive",
    behavior: "Listens without judgment, offers encouragement, and provides emotional support like a best friend"
  },
  {
    role: "Life Coach",
    characteristic: "Motivational, goal-oriented, and inspiring",
    behavior: "Helps set goals, provides accountability, and encourages personal growth and development"
  },
  {
    role: "Meditation Guide",
    characteristic: "Calm, peaceful, and mindful",
    behavior: "Guides through mindfulness exercises, teaches breathing techniques, and promotes inner peace"
  },
  {
    role: "Wise Mentor",
    characteristic: "Experienced, patient, and insightful",
    behavior: "Shares wisdom, provides perspective on life challenges, and offers guidance based on experience"
  }
];

export default function RolePlayPage() {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [emotion, setEmotion] = useState<EmotionState>('neutral');
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [showPersonaSelection, setShowPersonaSelection] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showChatHistory, setShowChatHistory] = useState(false);
  const [chatHistory, setChatHistory] = useState<{[key: string]: {persona: string, messages: Message[], lastUpdated: string}}>({});

  // Load chat history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('mindspace-chat-history');
    if (savedHistory) {
      try {
        setChatHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
    }
  }, []);

  // Save current chat session to history
  const saveChatSession = (persona: Persona, messages: Message[]) => {
    if (messages.length <= 1) return; // Don't save if only welcome message
    
    const sessionKey = `${persona.role.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
    const newHistory = {
      ...chatHistory,
      [sessionKey]: {
        persona: persona.role,
        messages: messages,
        lastUpdated: new Date().toISOString()
      }
    };
    
    setChatHistory(newHistory);
    localStorage.setItem('mindspace-chat-history', JSON.stringify(newHistory));
  };

  const handlePersonaSelect = (persona: Persona) => {
    setSelectedPersona(persona);
    setShowPersonaSelection(false);
    
    const welcomeMessage: Message = {
      id: '1',
      text: `Hello! I'm your ${persona.role.toLowerCase()}. ${persona.behavior} How can I help you today?`,
      sender: 'ai',
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
    setEmotion('happy');
    setTimeout(() => setEmotion('neutral'), 2000);
  };

  const resetChat = () => {
    // Save current chat session before resetting
    if (selectedPersona && messages.length > 1) {
      saveChatSession(selectedPersona, messages);
    }
    
    setShowPersonaSelection(true);
    setSelectedPersona(null);
    setMessages([]);
    setMessage('');
    setEmotion('neutral');
    setShowChatHistory(false);
  };

  const handleSend = async () => {
    if (isLoading || !selectedPersona || !message.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = message;
    
    // Clear input
    setMessage('');
    setIsLoading(true);
    setEmotion('surprised');

    try {
      // Convert messages to ChatMessage format
      const chatHistory: ChatMessage[] = messages.map(msg => ({
        role: msg.sender === 'user' ? 'User' : 'AI',
        text: msg.text
      }));

      // Add current user message
      chatHistory.push({ role: 'User', text: currentMessage });

      // Get AI response or generate a contextual response
      let aiResponseText = "";
      
      try {
        const response = await ApiService.simulateRolePlayConversation(
          selectedPersona,
          chatHistory,
          currentMessage
        );
        aiResponseText = response.aiResponse;
      } catch (error) {
        // Fallback to contextual responses based on persona
        aiResponseText = generateContextualResponse(selectedPersona, currentMessage);
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponseText,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setEmotion('happy');
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble responding right now. Please try again.",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setEmotion('sad');
    } finally {
      setIsLoading(false);
      // Reset emotion after animation
      setTimeout(() => setEmotion('neutral'), 3000);
    }
  };

  // Generate contextual responses based on persona when backend is unavailable
  const generateContextualResponse = (persona: Persona, userMessage: string): string => {
    const responses: Record<string, string[]> = {
      "Supportive Therapist": [
        "I hear what you're saying. Can you tell me more about how that makes you feel?",
        "That sounds challenging. What thoughts come up for you when this happens?",
        "Thank you for sharing that with me. How would you like to work through this together?",
        "I'm here to support you. What would feel most helpful right now?"
      ],
      "Caring Friend": [
        "I'm so glad you shared that with me. You know I'm always here for you, right?",
        "That sounds really tough. Want to talk through it? I'm listening.",
        "You're so strong for dealing with this. How can I support you?",
        "I care about you so much. What do you need from me right now?"
      ],
      "Life Coach": [
        "That's an interesting perspective! What goals could we set around this?",
        "I love your awareness about this. What's one small step you could take today?",
        "You have so much potential! How can we turn this into an opportunity for growth?",
        "What would success look like for you in this situation?"
      ],
      "Meditation Guide": [
        "Let's take a moment to breathe together. What sensations do you notice in your body?",
        "I invite you to notice what's present for you right now, without judgment.",
        "Remember, this too shall pass. Can we find some calm in this moment together?",
        "Let's return to the breath. What would it feel like to approach this with compassion?"
      ],
      "Wise Mentor": [
        "I've seen many people face similar challenges. What wisdom do you already carry within you?",
        "Life has a way of teaching us what we need to know. What might this experience be showing you?",
        "In my experience, these moments often hold important lessons. What feels true for you?",
        "You have more strength than you realize. How might you draw on your inner wisdom here?"
      ]
    };
    
    const personaResponses = responses[persona.role] || responses["Supportive Therapist"];
    return personaResponses[Math.floor(Math.random() * personaResponses.length)];
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to MindSpace</h1>
            <p className="text-gray-600 mb-6">Please sign in to access your safe space</p>
            <Link
              href="/auth/login"
              className="inline-flex items-center px-8 py-3 bg-blue-500 text-white font-medium rounded-2xl hover:bg-blue-600 transition-all"
            >
              Sign In
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  if (showPersonaSelection) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl text-gray-900 mb-4 font-bold">
            Choose Your Companion
          </h1>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Select who you&apos;d like to talk with today
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {availablePersonas.map((persona, index) => (
            <motion.div
              key={persona.role}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-200 cursor-pointer"
              onClick={() => handlePersonaSelect(persona)}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3">{persona.role}</h3>
              <p className="text-sm text-gray-600 mb-4">{persona.characteristic}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{persona.behavior}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <motion.div 
        className="p-6 border-b border-gray-200"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{selectedPersona?.role}</h1>
            <p className="text-gray-600">{selectedPersona?.characteristic}</p>
          </div>
          <div className="flex items-center space-x-3">
            {/* Chat History Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowChatHistory(!showChatHistory)}
                className="flex items-center px-3 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors"
              >
                <span className="mr-1 text-sm">History</span>
                <ChevronDown 
                  size={16} 
                  className={`transition-transform duration-200 ${
                    showChatHistory ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              
              {/* Chat History Dropdown Menu */}
              <AnimatePresence>
                {showChatHistory && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 max-h-96 overflow-y-auto z-10"
                  >
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Chat History</h3>
                      {Object.keys(chatHistory).length === 0 ? (
                        <p className="text-gray-500 text-sm text-center py-8">
                          No chat history yet. Start a conversation to see your history here.
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {Object.entries(chatHistory)
                            .sort(([,a], [,b]) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
                            .map(([key, session]) => (
                            <div
                              key={key}
                              className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                              onClick={() => {
                                // Find the persona and load this chat
                                const persona = availablePersonas.find(p => p.role === session.persona);
                                if (persona) {
                                  setSelectedPersona(persona);
                                  setMessages(session.messages);
                                  setShowChatHistory(false);
                                  setEmotion('neutral');
                                }
                              }}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-gray-900 text-sm">{session.persona}</span>
                                <span className="text-xs text-gray-500">
                                  {new Date(session.lastUpdated).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-xs text-gray-600 line-clamp-2">
                                {session.messages.length > 1 && session.messages[session.messages.length - 1].text}
                              </p>
                              <div className="mt-2 text-xs text-gray-500">
                                {session.messages.length} messages
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <button
              onClick={resetChat}
              className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors"
            >
              New Chat
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-6 py-6 pb-32">
        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <DoodleAvatar emotion={emotion} />
        </div>
        
        {/* Messages */}
        <div className="flex-1 space-y-4 overflow-y-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  msg.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p>{msg.text}</p>
                <p className={`text-xs mt-1 ${
                  msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {msg.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-700 px-4 py-3 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fixed Bottom Message Bar - THIS IS THE KEY CHANGE */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            {/* NO ARROW/DROPDOWN BUTTON - DIRECT INPUT */}
            <div className="flex-1">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share what's on your mind..."
                className="w-full px-4 py-3 bg-gray-50 rounded-2xl border border-gray-200 outline-none focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all duration-200 text-gray-900 font-medium placeholder-gray-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
            </div>
            <button
              onClick={handleSend}
              className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50"
              disabled={!message.trim() || isLoading}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
