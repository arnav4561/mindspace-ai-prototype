'use client';

import { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { ApiService } from '@/services/api';
import Link from 'next/link';

const healingQuotes = [
  "Take a deep breath and let your mind find peace.",
  "You have the strength to overcome any challenge.",
  "This moment is yours - embrace its healing power.",
  "Peace flows from within, let it wash over you.",
  "Every breath brings new hope and healing.",
  "You are worthy of love, peace, and healing.",
  "Allow yourself to heal at your own pace."
];

export default function RelaxPage() {
  const { user } = useAuth();
  const [userThoughts, setUserThoughts] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentQuote, setCurrentQuote] = useState('');
  const [showQuote, setShowQuote] = useState(false);

  // Generate healing image based on user thoughts
  const generateHealingImage = async (thoughts: string) => {
    if (!thoughts.trim()) return;
    
    setIsGenerating(true);
    setShowQuote(false); // Hide any existing quote during generation
    
    try {
      // Try to get AI response from backend API
      const response = await ApiService.generateMoodBasedRelaxationSession(thoughts);
      
      // Generate a healing quote based on response
      const healingResponse = generateHealingResponse(thoughts, response.creativePrompt);
      setCurrentQuote(healingResponse);
      setShowQuote(true);
      
      // If API provides image URLs, use them
      if (response.imageUrls && response.imageUrls.length > 0) {
        setGeneratedImage(response.imageUrls[0]);
      } else {
        // Generate image using AI image generation simulation
        await generateAIImage(thoughts);
      }
      
    } catch (error) {
      console.error('Error generating healing content:', error);
      
      // Fallback: Generate local healing response and simulate image
      const healingResponse = generateHealingResponse(thoughts);
      setCurrentQuote(healingResponse);
      setShowQuote(true);
      
      // Simulate AI image generation
      await generateAIImage(thoughts);
    } finally {
      setIsGenerating(false);
      setUserThoughts('');
    }
  };

  // Generate AI image based on thoughts (simulated for demo)
  const generateAIImage = async (thoughts: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // In production, this would call AI image generation APIs like:
    // - OpenAI DALL-E 2/3
    // - Midjourney API
    // - Stable Diffusion API
    // - Adobe Firefly API
    
    const imagePrompt = `Create a peaceful, healing image that promotes wellness and tranquility based on these thoughts: "${thoughts}". The image should be calming, therapeutic, and inspire hope and healing. Style: soft, warm colors, gentle lighting, serene atmosphere.`;
    
    // For demo purposes, select from healing-focused stock images
    const healingImages = [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', // Peaceful lake
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80', // Forest path
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80', // Mountain landscape
      'https://images.unsplash.com/photo-1433838552652-f9a46b332c40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', // Ocean sunset
      'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', // Gentle meadow
    ];
    
    // Analyze thoughts to select most appropriate healing image
    const selectedImage = analyzeThoughtsForHealingImage(thoughts, healingImages);
    setGeneratedImage(selectedImage);
    
    // TODO: Replace with actual AI image generation API call:
    // const response = await fetch('/api/generate-healing-image', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ prompt: imagePrompt })
    // });
    // const { imageUrl } = await response.json();
    // setGeneratedImage(imageUrl);
  };

  // Analyze thoughts to select appropriate healing image
  const analyzeThoughtsForHealingImage = (thoughts: string, images: string[]): string => {
    const lowerThoughts = thoughts.toLowerCase();
    
    if (lowerThoughts.includes('water') || lowerThoughts.includes('calm') || lowerThoughts.includes('peace')) {
      return images[0]; // Peaceful lake
    } else if (lowerThoughts.includes('lost') || lowerThoughts.includes('path') || lowerThoughts.includes('direction')) {
      return images[1]; // Forest path
    } else if (lowerThoughts.includes('strength') || lowerThoughts.includes('overcome') || lowerThoughts.includes('challenge')) {
      return images[2]; // Mountain landscape
    } else if (lowerThoughts.includes('hope') || lowerThoughts.includes('new') || lowerThoughts.includes('beginning')) {
      return images[3]; // Ocean sunset
    } else {
      return images[4]; // Gentle meadow (default peaceful option)
    }
  };

  // Generate healing response based on thoughts
  const generateHealingResponse = (thoughts: string, aiResponse?: string): string => {
    if (aiResponse) {
      return aiResponse;
    }
    
    const responses = [
      `Your thoughts about "${thoughts}" show beautiful self-awareness. You have the power to heal and grow.`,
      `I sense your journey in "${thoughts}". Remember, healing is not linear - be gentle with yourself.`,
      `Thank you for sharing "${thoughts}" with me. Your courage to express these feelings is a step toward healing.`,
      `Your reflection on "${thoughts}" shows strength. Trust in your ability to find peace within.`,
      `"${thoughts}" - every thought you share is sacred. Allow yourself the time and space to heal.`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  // Show random healing quote on load
  useEffect(() => {
    const randomQuote = healingQuotes[Math.floor(Math.random() * healingQuotes.length)];
    setCurrentQuote(randomQuote);
    setShowQuote(true);
  }, []);

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
            <h1 className="text-3xl font-light text-gray-900 mb-4">Welcome to Healing Space</h1>
            <p className="text-gray-600 mb-6">Please sign in to access your personalized healing journey</p>
            <Link
              href="/auth/login"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium rounded-2xl shadow-xl shadow-gray-300/50 hover:shadow-2xl hover:shadow-gray-400/60 transition-all transform hover:scale-105"
            >
              Sign In
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white">
      {/* Main Content Area */}
      <div className="flex flex-col items-center justify-start min-h-screen px-6 pt-12 pb-32">
        {/* Generated Image Display - Only show when there is an image */}
        <AnimatePresence>
          {generatedImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8 }}
              className="mb-8 max-w-2xl w-full"
            >
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src={generatedImage}
                  alt="Healing Image"
                  className="w-full h-96 object-cover"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Healing Quote - Only show when not generating and has content */}
        <AnimatePresence>
          {showQuote && currentQuote && !isGenerating && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl w-full text-center mb-8"
            >
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 px-8 py-6">
                <p className="text-gray-700 text-lg font-light italic leading-relaxed">
                  &ldquo;{currentQuote}&rdquo;
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Bottom Message Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <textarea
                value={userThoughts}
                onChange={(e) => setUserThoughts(e.target.value)}
                placeholder="Share your thoughts, feelings, or what&apos;s on your mind..."
                rows={2}
                className="w-full px-4 py-3 bg-gray-50 rounded-2xl border border-gray-200 outline-none focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all duration-200 resize-none text-gray-900 placeholder-gray-500 font-medium"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    generateHealingImage(userThoughts);
                  }
                }}
              />
            </div>
            <button
              onClick={() => generateHealingImage(userThoughts)}
              disabled={!userThoughts.trim() || isGenerating}
              className="flex items-center justify-center px-6 py-3 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-500 transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 shadow-lg"
            >
              {isGenerating ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Send size={20} className="mr-2" />
                  <span className="font-medium hidden md:block">Generate</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
