'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';

type Page = 'chat' | 'goals' | 'relax';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navigateTo = (page: Page) => {
    const routes = {
      chat: '/role-play',
      goals: '/goal-planner', 
      relax: '/relaxation'
    };
    router.push(routes[page]);
    closeMenu();
  };

  const getCurrentPage = (): Page | null => {
    if (pathname?.includes('/role-play')) return 'chat';
    if (pathname?.includes('/goal-planner')) return 'goals';
    if (pathname?.includes('/relaxation')) return 'relax';
    return null;
  };

  const currentPage = getCurrentPage();

  // Don't show navigation on auth pages or homepage
  if (pathname === '/' || pathname?.includes('/auth/')) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background relative">
      {/* Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={closeMenu}
        />
      )}

      {/* Navigation Menu */}
      <nav className={`
        fixed top-0 left-0 h-full w-72 bg-white/95 backdrop-blur-lg z-50 
        transform transition-transform duration-300 ease-out shadow-xl
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg text-gray-900">MindSpace</h2>
            <button
              onClick={closeMenu}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => navigateTo('chat')}
              className={`
                w-full text-left px-4 py-3 rounded-xl transition-all duration-200
                ${currentPage === 'chat' 
                  ? 'bg-blue-50 text-blue-600 shadow-sm' 
                  : 'text-gray-700 hover:bg-gray-50'
                }
              `}
            >
              Chat
            </button>
            <button
              onClick={() => navigateTo('goals')}
              className={`
                w-full text-left px-4 py-3 rounded-xl transition-all duration-200
                ${currentPage === 'goals' 
                  ? 'bg-blue-50 text-blue-600 shadow-sm' 
                  : 'text-gray-700 hover:bg-gray-50'
                }
              `}
            >
              Goals
            </button>
            <button
              onClick={() => navigateTo('relax')}
              className={`
                w-full text-left px-4 py-3 rounded-xl transition-all duration-200
                ${currentPage === 'relax' 
                  ? 'bg-blue-50 text-blue-600 shadow-sm' 
                  : 'text-gray-700 hover:bg-gray-50'
                }
              `}
            >
              Relax
            </button>
          </div>

          {user && (
            <div className="mt-12 pt-8 border-t border-gray-100">
              <div className="space-y-3">
                <div className="px-4 py-2">
                  <p className="text-sm text-gray-600">Signed in as</p>
                  <p className="text-sm font-medium text-gray-900">{user.email}</p>
                </div>
                <button 
                  onClick={logout}
                  className="w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  Sign Out
                </button>
                <button 
                  onClick={() => router.push('/')}
                  className="w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  Home
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hamburger Menu Button */}
      <button
        onClick={toggleMenu}
        className="fixed top-6 left-6 z-30 p-3 bg-white/80 backdrop-blur-lg rounded-xl shadow-lg border border-gray-100"
      >
        <Menu size={20} className="text-gray-700" />
      </button>

      {/* Main Content */}
      <main className="w-full">
        {children}
      </main>
    </div>
  );
}
