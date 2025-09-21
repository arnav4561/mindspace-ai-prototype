'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { MessageCircle, Target, Waves, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const { user } = useAuth();

  const features = [
    {
      icon: MessageCircle,
      title: 'Role Play Chat Simulator',
      description: 'Express yourself through multiple communication modes with our empathetic AI companion.',
      href: '/role-play',
      color: 'from-blue-500 to-purple-500'
    },
    {
      icon: Target,
      title: 'Goal Planner',
      description: 'Plan and track your personal growth journey with beautiful, interactive goal setting.',
      href: '/goal-planner',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Waves,
      title: 'Relaxation Session',
      description: 'Immerse yourself in serene environments with calming visuals and motivational quotes.',
      href: '/relaxation',
      color: 'from-green-500 to-blue-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-gray-400/40 transform hover:scale-105 transition-all hover:shadow-3xl hover:shadow-gray-500/50">
              <span className="text-4xl">🧘</span>
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-6xl font-light mb-8 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="block">MindSpace</span>
            <span className="block text-4xl md:text-5xl mt-2 text-gray-600">
              Your Digital Sanctuary
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            A safe space where AI-powered tools gently guide you through personalized wellness journeys. 
            Express, explore, and grow at your own pace.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {user ? (
              <Link
                href="/role-play"
                className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium rounded-2xl shadow-xl shadow-gray-400/40 hover:shadow-2xl hover:shadow-gray-500/50 transition-all transform hover:scale-105"
              >
                Continue Your Journey
                <ArrowRight className="ml-3" size={20} />
              </Link>
            ) : (
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium rounded-2xl shadow-xl shadow-gray-400/40 hover:shadow-2xl hover:shadow-gray-500/50 transition-all transform hover:scale-105"
                >
                  Start Your Journey
                  <ArrowRight className="ml-3" size={20} />
                </Link>
                <Link
                  href="/auth/login"
                  className="inline-flex items-center px-10 py-4 bg-white/80 backdrop-blur-lg text-gray-900 font-medium rounded-2xl shadow-xl shadow-gray-300/50 hover:shadow-2xl hover:shadow-gray-400/60 transition-all transform hover:scale-105 border border-gray-100"
                >
                  Sign In
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="text-4xl font-light text-gray-900 mb-4">
              Three Paths to
              <span className="block text-gray-700 mt-2">
                Inner Peace
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Each tool is thoughtfully designed to nurture your mental wellness journey with AI-powered guidance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
                  className="group bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl hover:shadow-gray-400/50 transition-all transform hover:scale-105 hover:-translate-y-2"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all`}>
                    <Icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                  {user && (
                    <Link
                      href={feature.href}
                      className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
                    >
                      Begin this journey
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
