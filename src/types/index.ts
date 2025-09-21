// Types matching the backend interfaces

export interface Persona {
  role: string;
  characteristic: string;
  behavior: string;
}

export interface ChatMessage {
  role: "User" | "AI";
  text: string;
}

export interface GoalPlan {
  id?: string;
  title: string;
  tasks: Task[];
  createdAt: unknown;
  streak: number;
  completed?: boolean;
  completedAt?: unknown;
}

export interface Task {
  text: string;
  completed: boolean;
}

export interface RelaxationSession {
  creativePrompt: string;
  imageUrls: string[];
}

// API Response types
export interface CreateGoalPlanResponse {
  planId: string;
  message: string;
}

export interface UpdateTaskStatusResponse {
  message: string;
}

export interface SimulateConversationResponse {
  aiResponse: string;
}

export interface GenerateRelaxationSessionResponse {
  creativePrompt: string;
  imageUrls: string[];
}
