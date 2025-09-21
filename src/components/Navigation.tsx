'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User, MessageCircle, Target, Waves } from 'lucide-react';

const Navigation: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="bg-white shadow-xl shadow-gray-200/50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-300/30 transform hover:scale-105 transition-all hover:shadow-2xl hover:shadow-blue-400/40">
              <span className="text-white font-bold text-sm">🧘</span>
            </div>
            <span className="text-xl font-bold text-black">MindSpace</span>
          </Link>

          {/* Navigation Links */}
          {user && (
            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="/role-play"
                className="flex items-center space-x-2 px-4 py-2 text-black hover:text-blue-600 hover:bg-white rounded-xl shadow-lg shadow-gray-200/50 transition-all transform hover:scale-105 hover:shadow-xl hover:shadow-gray-300/60"
              >
                <MessageCircle size={20} />
                <span className="font-semibold">Role Play Chat Simulator</span>
              </Link>
              <Link
                href="/goal-planner"
                className="flex items-center space-x-2 px-4 py-2 text-black hover:text-blue-600 hover:bg-white rounded-xl shadow-lg shadow-gray-200/50 transition-all transform hover:scale-105 hover:shadow-xl hover:shadow-gray-300/60"
              >
                <Target size={20} />
                <span className="font-semibold">Goal Planner</span>
              </Link>
              <Link
                href="/relaxation"
                className="flex items-center space-x-2 px-4 py-2 text-black hover:text-blue-600 hover:bg-white rounded-xl shadow-lg shadow-gray-200/50 transition-all transform hover:scale-105 hover:shadow-xl hover:shadow-gray-300/60"
              >
                <Waves size={20} />
                <span className="font-semibold">Relaxation Session</span>
              </Link>
            </div>
          )}

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-gray-600">
                  <User size={20} />
                  <span className="hidden md:inline text-sm">{user.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut size={20} />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-black hover:text-blue-600 font-semibold transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 rounded-2xl shadow-xl shadow-blue-300/30 hover:shadow-2xl hover:shadow-blue-400/40 transition-all transform hover:scale-105 font-semibold"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {user && (
          <div className="md:hidden pb-4">
            <div className="flex justify-around">
              <Link
                href="/role-play"
                className="flex flex-col items-center space-y-1 text-black hover:text-blue-600 transition-colors"
              >
                <MessageCircle size={24} />
                <span className="text-xs font-semibold">Chat Sim</span>
              </Link>
              <Link
                href="/goal-planner"
                className="flex flex-col items-center space-y-1 text-black hover:text-blue-600 transition-colors"
              >
                <Target size={24} />
                <span className="text-xs font-semibold">Goals</span>
              </Link>
              <Link
                href="/relaxation"
                className="flex flex-col items-center space-y-1 text-black hover:text-blue-600 transition-colors"
              >
                <Waves size={24} />
                <span className="text-xs font-semibold">Relax</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
