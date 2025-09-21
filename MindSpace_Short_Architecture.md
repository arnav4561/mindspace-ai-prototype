# MindSpace AI - Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    USER INTERFACE                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │ Role Play   │  │ Goal        │  │ Relaxation  │     │
│  │ Chat        │  │ Planner     │  │ Session     │     │
│  │ Simulator   │  │             │  │             │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────┐
│               APPLICATION LAYER                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │ AI Service  │  │ State       │  │ Local       │     │
│  │ • Personas  │  │ Management  │  │ Storage     │     │
│  │ • Responses │  │ • React     │  │ • Goals     │     │
│  │ • Fallbacks │  │ • Context   │  │ • History   │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────┐
│                TECHNOLOGY STACK                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │ Next.js 15  │  │ React 18    │  │ TypeScript  │     │
│  │ • Routing   │  │ • Hooks     │  │ • Type      │     │
│  │ • SSG/SSR   │  │ • Components│  │   Safety    │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────┐
│              DEPLOYMENT & SECURITY                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │ Firebase    │  │ HTTPS/SSL   │  │ Local Data  │     │
│  │ Hosting     │  │ Security    │  │ Privacy     │     │
│  │ • CDN       │  │ • Auth      │  │ • No Cloud  │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────────────────────────────────────┘
```

## Data Flow

```
User Input → React State → AI Processing → Local Storage
    ↓             ↑              ↓              ↑
UI Update  ←  Response  ←  Persona Logic  ←  Data Fetch
```

## Core Components

### **Frontend Stack**
- **Next.js 15** - Framework & routing
- **React 18** - UI components & state
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations

### **Features**
- **Role Play Chat** - 5 AI personas with chat history
- **Goal Planner** - Persistent goal tracking with categories
- **Relaxation** - AI-generated calming content

### **Data & Security**
- **localStorage** - Client-side data persistence
- **Firebase Auth** - Secure user authentication
- **Privacy-First** - No sensitive data leaves device

### **Deployment**
- **Firebase Hosting** - Static site hosting
- **CI/CD Pipeline** - Automated deployments
- **Global CDN** - Fast worldwide access

---

**Live URL:** https://gencrewprototype.web.app

**Architecture Type:** Client-side SPA with local data storage
