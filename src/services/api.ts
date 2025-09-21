import { httpsCallable } from 'firebase/functions';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  updateDoc, 
  query, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { functions, firestore } from '@/lib/firebase';
import type {
  Persona,
  ChatMessage,
  CreateGoalPlanResponse,
  UpdateTaskStatusResponse,
  SimulateConversationResponse,
  GenerateRelaxationSessionResponse,
  GoalPlan,
} from '@/types';

// Role Play Chat Simulator
export const simulateConversation = functions ? httpsCallable<
  { persona: Persona; chatHistory: ChatMessage[]; userMessage: string },
  SimulateConversationResponse
>(functions, 'simulateConversation') : null;

// Goal Planner
export const createGoalPlan = functions ? httpsCallable<
  { goal: string },
  CreateGoalPlanResponse
>(functions, 'createGoalPlan') : null;

export const updateTaskStatus = functions ? httpsCallable<
  { planId: string; taskIndex: number; isCompleted: boolean },
  UpdateTaskStatusResponse
>(functions, 'updateTaskStatus') : null;

// Relaxation Sessions
export const generateRelaxationSession = functions ? httpsCallable<
  { mood: string },
  GenerateRelaxationSessionResponse
>(functions, 'generateRelaxationSession') : null;

// Wrapper functions with error handling
export class ApiService {
  static async simulateRolePlayConversation(
    persona: Persona,
    chatHistory: ChatMessage[],
    userMessage: string
  ) {
    if (!simulateConversation) {
      throw new Error('Firebase not initialized');
    }
    try {
      const result = await simulateConversation({
        persona,
        chatHistory,
        userMessage,
      });
      return result.data;
    } catch (error) {
      console.error('Error simulating conversation:', error);
      throw error;
    }
  }

  static async createNewGoalPlan(goal: string) {
    if (!createGoalPlan) {
      throw new Error('Firebase not initialized');
    }
    try {
      const result = await createGoalPlan({ goal });
      return result.data;
    } catch (error) {
      console.error('Error creating goal plan:', error);
      throw error;
    }
  }

  static async updateTaskCompletion(
    planId: string,
    taskIndex: number,
    isCompleted: boolean
  ) {
    if (!updateTaskStatus) {
      throw new Error('Firebase not initialized');
    }
    try {
      const result = await updateTaskStatus({ planId, taskIndex, isCompleted });
      return result.data;
    } catch (error) {
      console.error('Error updating task status:', error);
      throw error;
    }
  }

  static async generateMoodBasedRelaxationSession(mood: string) {
    if (!generateRelaxationSession) {
      throw new Error('Firebase not initialized');
    }
    try {
      const result = await generateRelaxationSession({ mood });
      return result.data;
    } catch (error) {
      console.error('Error generating relaxation session:', error);
      throw error;
    }
  }

  // Firestore Goal Management
  static async getUserGoalPlans(userId: string): Promise<GoalPlan[]> {
    if (!firestore) {
      throw new Error('Firestore not initialized');
    }
    
    try {
      const plansRef = collection(firestore, 'users', userId, 'plans');
      const q = query(plansRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const plans: GoalPlan[] = [];
      querySnapshot.forEach((doc) => {
        plans.push({ id: doc.id, ...doc.data() } as GoalPlan);
      });
      
      return plans;
    } catch (error) {
      console.error('Error fetching goal plans:', error);
      throw error;
    }
  }

  static async updateGoalPlanTask(
    userId: string,
    planId: string,
    taskIndex: number,
    completed: boolean
  ) {
    if (!firestore) {
      throw new Error('Firestore not initialized');
    }
    
    try {
      const planRef = doc(firestore, 'users', userId, 'plans', planId);
      const planDoc = await getDoc(planRef);
      
      if (planDoc.exists()) {
        const planData = planDoc.data();
        const tasks = [...planData.tasks];
        tasks[taskIndex] = { ...tasks[taskIndex], completed };
        
        // Calculate streak
        const allCompleted = tasks.every(task => task.completed);
        const updatedData: Record<string, unknown> = { tasks };
        
        if (allCompleted && !planData.completed) {
          updatedData.completed = true;
          updatedData.completedAt = serverTimestamp();
          updatedData.streak = (planData.streak || 0) + 1;
        }
        
        await updateDoc(planRef, updatedData);
        
        // Also call the backend function for additional processing
        if (updateTaskStatus) {
          await updateTaskStatus({ planId, taskIndex, isCompleted: completed });
        }
      }
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }

  static async getGoalPlan(userId: string, planId: string): Promise<GoalPlan | null> {
    if (!firestore) {
      throw new Error('Firestore not initialized');
    }
    
    try {
      const planRef = doc(firestore, 'users', userId, 'plans', planId);
      const planDoc = await getDoc(planRef);
      
      if (planDoc.exists()) {
        return { id: planDoc.id, ...planDoc.data() } as GoalPlan;
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching goal plan:', error);
      throw error;
    }
  }
}
