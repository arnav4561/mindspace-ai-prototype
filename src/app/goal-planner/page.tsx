'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { ApiService } from '@/services/api';
import type { GoalPlan } from '@/types';
import Link from 'next/link';

type GoalCategory = 'Habit' | 'Personal' | 'Health' | 'Study';

  interface Goal {
  id: string;
  title: string;
  category: GoalCategory;
  progress: number;
  subtasks: string[];
  notes?: string;
  duration?: string;
  startDate?: string;
  targetDate?: string;
  streak?: number;
  lastUpdated?: string;
}

interface NewGoal {
  title: string;
  category: GoalCategory;
  notes: string;
  duration: string;
  customDuration: string;
}


export default function GoalsPage() {
  const { user } = useAuth();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [goalPlans, setGoalPlans] = useState<GoalPlan[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'All' | GoalCategory>('All');
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [showNewGoalModal, setShowNewGoalModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Load saved goals from localStorage on component mount
  useEffect(() => {
    const savedGoals = localStorage.getItem('mindspace-goals');
    if (savedGoals) {
      try {
        const parsedGoals = JSON.parse(savedGoals);
        setGoals(parsedGoals);
      } catch (error) {
        console.error('Error loading saved goals:', error);
        setGoals([]); // Start with empty array if parsing fails
      }
    } else {
      setGoals([]); // Start with empty array if no saved goals
    }
    setLoading(false);
  }, []);
  const [newGoal, setNewGoal] = useState<NewGoal>({
    title: '',
    category: 'Personal',
    notes: '',
    duration: '1 month',
    customDuration: ''
  });
  const [loading, setLoading] = useState(true);

  const categories: ('All' | GoalCategory)[] = ['All', 'Habit', 'Personal', 'Health', 'Study'];


  const filteredGoals = selectedCategory === 'All' 
    ? goals 
    : goals.filter(goal => goal.category === selectedCategory);

  const getCategoryColor = (category: GoalCategory) => {
    const colors = {
      'Habit': 'bg-green-100 text-green-700',
      'Personal': 'bg-blue-100 text-blue-700', 
      'Health': 'bg-pink-100 text-pink-700',
      'Study': 'bg-purple-100 text-purple-700'
    };
    return colors[category];
  };

  const generateTasksForGoal = (title: string, category: GoalCategory, duration: string): string[] => {
    const taskTemplates: Record<GoalCategory, string[]> = {
      'Health': ['Research and plan approach', 'Start with small daily habits', 'Track progress weekly', 'Adjust routine based on results'],
      'Personal': ['Define specific outcomes', 'Break into actionable steps', 'Set milestone checkpoints', 'Review and celebrate progress'],
      'Study': ['Gather learning resources', 'Create study schedule', 'Practice regularly', 'Test knowledge and skills'],
      'Habit': ['Start with 5-minute sessions', 'Gradually increase frequency', 'Track consistency', 'Maintain long-term']
    };
    
    const baseSubtasks = taskTemplates[category] || taskTemplates['Personal'];
    const durationPrefix = duration === '1 week' ? 'Day' : duration === '1 month' ? 'Week' : 'Phase';
    
    return baseSubtasks.map((task, index) => `${durationPrefix} ${index + 1}: ${task}`);
  };

  const calculateTargetDate = (duration: string, customDuration: string): string => {
    const now = new Date();
    let days = 30; // default 1 month
    
    const finalDuration = duration === 'custom' ? customDuration : duration;
    
    if (finalDuration.includes('week')) {
      const weeks = parseInt(finalDuration) || 1;
      days = weeks * 7;
    } else if (finalDuration.includes('month')) {
      const months = parseInt(finalDuration) || 1;
      days = months * 30;
    } else if (finalDuration.includes('year')) {
      const years = parseInt(finalDuration) || 1;
      days = years * 365;
    }
    
    return new Date(now.getTime() + days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  };

  const handleDeleteGoal = (goalId: string) => {
    const updatedGoals = goals.filter(goal => goal.id !== goalId);
    setGoals(updatedGoals);
    
    // Update localStorage
    localStorage.setItem('mindspace-goals', JSON.stringify(updatedGoals));
    
    setSelectedGoal(null);
  };

  const updateStreak = (goalId: string) => {
    const today = new Date().toISOString().split('T')[0];
    
    const updatedGoals = goals.map(goal => {
      if (goal.id === goalId) {
        const lastUpdated = goal.lastUpdated;
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        let newStreak = goal.streak || 0;
        
        // If last updated was yesterday, increment streak
        if (lastUpdated === yesterdayStr) {
          newStreak += 1;
        } 
        // If last updated was today, don't change streak 
        else if (lastUpdated === today) {
          return goal; // No update needed
        }
        // If more than a day ago, reset streak to 1
        else {
          newStreak = 1;
        }
        
        return {
          ...goal,
          streak: newStreak,
          lastUpdated: today,
          progress: Math.min(goal.progress + 5, 100) // Small progress bump for consistency
        };
      }
      return goal;
    });
    
    setGoals(updatedGoals);
    
    // Update localStorage
    localStorage.setItem('mindspace-goals', JSON.stringify(updatedGoals));
  };

  const handleAddGoal = async () => {
    if (!newGoal.title.trim()) return;
    
    setIsGenerating(true);
    
    // Always create local goal first for immediate feedback
    const finalDuration = newGoal.duration === 'custom' ? newGoal.customDuration : newGoal.duration;
    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      category: newGoal.category,
      progress: 0,
      subtasks: generateTasksForGoal(newGoal.title, newGoal.category, finalDuration),
      notes: newGoal.notes || `Working towards: ${newGoal.title}`,
      duration: finalDuration,
      startDate: new Date().toISOString().split('T')[0],
      targetDate: calculateTargetDate(newGoal.duration, newGoal.customDuration),
      streak: 0,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    const updatedGoals = [...goals, goal];
    setGoals(updatedGoals);
    
    // Save to localStorage for persistence
    localStorage.setItem('mindspace-goals', JSON.stringify(updatedGoals));
    
    setNewGoal({ title: '', category: 'Personal', notes: '', duration: '1 month', customDuration: '' });
    setShowNewGoalModal(false);
    setIsGenerating(false);
  };


  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 px-4">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 p-8"
          >
            <h1 className="text-3xl font-light text-gray-900 mb-4">Welcome to Goal Planner</h1>
            <p className="text-gray-600 mb-6">Please sign in to start planning your goals</p>
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6 pt-20 md:pt-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl text-gray-900 font-light">My Goals</h1>
          <button
            onClick={() => setShowNewGoalModal(true)}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <Plus size={18} className="mr-2" />
            New Goal
          </button>
        </motion.div>

        {/* Category Filters */}
        <motion.div 
          className="flex flex-wrap gap-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                  : 'bg-white/80 text-gray-600 hover:bg-white hover:shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Goals Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {loading ? (
            // Loading skeleton
            <div className="col-span-full flex justify-center py-12">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-600">Loading your goals...</p>
              </div>
            </div>
          ) : filteredGoals.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-12">
              <div className="text-center">
                <h3 className="text-xl text-gray-900 font-medium mb-2">No Goals Yet</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Start your journey by creating your first goal. Set targets, track progress, and achieve your dreams.
                </p>
              </div>
            </div>
          ) : (
            <AnimatePresence>
              {filteredGoals.map((goal, index) => (
              <motion.div
                key={goal.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-100 p-6 cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-200"
                onClick={() => setSelectedGoal(goal)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 pr-2">
                    <h3 className="text-lg text-gray-900 font-bold">{goal.title}</h3>
                    {goal.duration && (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                          {goal.duration}
                        </span>
                        {goal.targetDate && (
                          <span className="text-xs text-gray-500">
                            Due: {new Date(goal.targetDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(goal.category)}`}>
                    {goal.category}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm text-gray-900 font-medium">{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>

                {goal.notes && (
                  <p className="text-sm text-gray-600 line-clamp-2">{goal.notes}</p>
                )}
                
                <div className="flex items-center justify-between mt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateStreak(goal.id);
                    }}
                    className="flex items-center px-3 py-1 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-xs font-medium"
                    disabled={goal.lastUpdated === new Date().toISOString().split('T')[0]}
                  >
                    ✅ Daily Check-in
                  </button>
                  
                  {goal.streak !== undefined && goal.streak > 0 && (
                    <div className="text-xs text-orange-600 font-medium">
                      🔥 {goal.streak} days
                    </div>
                  )}
                </div>
              </motion.div>
              ))}
            </AnimatePresence>
          )}
        </motion.div>

        {/* Goal Detail Modal */}
        <AnimatePresence>
          {selectedGoal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedGoal(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl text-gray-900 font-medium">{selectedGoal.title}</h2>
                  <button
                    onClick={() => setSelectedGoal(null)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <X size={20} className="text-gray-600" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(selectedGoal.category)}`}>
                      {selectedGoal.category}
                    </span>
                    {selectedGoal.duration && (
                      <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        {selectedGoal.duration}
                      </span>
                    )}
                  </div>
                  
                  {selectedGoal.startDate && selectedGoal.targetDate && (
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Started: {new Date(selectedGoal.startDate).toLocaleDateString()}</span>
                      <span>Target: {new Date(selectedGoal.targetDate).toLocaleDateString()}</span>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">Progress</span>
                      <span className="text-gray-900 font-medium">{selectedGoal.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
                        style={{ width: `${selectedGoal.progress}%` }}
                      />
                    </div>
                  </div>

                  {selectedGoal.subtasks.length > 0 && (
                    <div>
                      <h3 className="text-gray-900 font-medium mb-3">Subtasks</h3>
                      <div className="space-y-2">
                        {selectedGoal.subtasks.map((subtask, index) => (
                          <div key={index} className="flex items-center text-sm text-gray-600">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                            {subtask}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedGoal.notes && (
                    <div>
                      <h3 className="text-gray-900 font-medium mb-3">Notes</h3>
                      <p className="text-gray-600">{selectedGoal.notes}</p>
                    </div>
                  )}

                  <div className="flex space-x-3 pt-4">
                    <button className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors">
                      <Edit3 size={16} className="mr-2" />
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteGoal(selectedGoal.id)}
                      className="flex-1 flex items-center justify-center px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
                    >
                      <Trash2 size={16} className="mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* New Goal Modal */}
        <AnimatePresence>
          {showNewGoalModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowNewGoalModal(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl text-gray-900 font-medium">Add New Goal</h2>
                  <button
                    onClick={() => setShowNewGoalModal(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <X size={20} className="text-gray-600" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-900 font-medium mb-2">Goal Title</label>
                    <input
                      type="text"
                      value={newGoal.title}
                      onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                      placeholder="What do you want to achieve?"
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none outline-none focus:bg-white focus:shadow-md transition-all duration-200 text-gray-900 font-medium placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-900 font-medium mb-2">Category</label>
                    <div className="grid grid-cols-2 gap-2">
                      {(['Habit', 'Personal', 'Health', 'Study'] as GoalCategory[]).map((category) => (
                        <button
                          key={category}
                          onClick={() => setNewGoal({ ...newGoal, category })}
                          className={`px-3 py-2 rounded-xl transition-all duration-200 ${
                            newGoal.category === category
                              ? getCategoryColor(category)
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-900 font-medium mb-2">Duration</label>
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        {(['1 week', '1 month', '3 months', '6 months', '1 year'] as const).map((duration) => (
                          <button
                            key={duration}
                            onClick={() => setNewGoal({ ...newGoal, duration, customDuration: '' })}
                            className={`px-3 py-2 rounded-xl text-sm transition-all duration-200 ${
                              newGoal.duration === duration
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {duration}
                          </button>
                        ))}
                        <button
                          onClick={() => setNewGoal({ ...newGoal, duration: 'custom' })}
                          className={`px-3 py-2 rounded-xl text-sm transition-all duration-200 ${
                            newGoal.duration === 'custom'
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          Custom
                        </button>
                      </div>
                      
                      {newGoal.duration === 'custom' && (
                        <input
                          type="text"
                          value={newGoal.customDuration}
                          onChange={(e) => setNewGoal({ ...newGoal, customDuration: e.target.value })}
                          placeholder="e.g., 2 weeks, 4 months"
                          className="w-full px-4 py-2 bg-gray-50 rounded-xl border-none outline-none focus:bg-white focus:shadow-md transition-all duration-200 text-gray-900 font-medium"
                        />
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-900 font-medium mb-2">Notes (Optional)</label>
                    <textarea
                      value={newGoal.notes}
                      onChange={(e) => setNewGoal({ ...newGoal, notes: e.target.value })}
                      placeholder="Any additional details..."
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none outline-none focus:bg-white focus:shadow-md transition-all duration-200 resize-none text-gray-900 font-medium placeholder-gray-500"
                    />
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={() => setShowNewGoalModal(false)}
                      className="flex-1 px-4 py-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddGoal}
                      disabled={!newGoal.title.trim() || isGenerating}
                      className="flex-1 flex items-center justify-center px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-500 transition-colors"
                    >
                      {isGenerating ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Generating with AI...
                        </>
                      ) : (
                        <>
                          <Sparkles size={16} className="mr-2" />
                          Generate Goal Plan
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
