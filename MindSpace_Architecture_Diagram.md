# MindSpace AI - Architecture Diagram

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              USER INTERFACE LAYER                               │
├─────────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                 │
│  │   Landing Page  │  │  Authentication │  │   Navigation    │                 │
│  │    - Hero       │  │    - Sign Up    │  │    - Header     │                 │
│  │    - Features   │  │    - Sign In    │  │    - Menu       │                 │
│  │    - About      │  │    - Logout     │  │    - Routing    │                 │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                 │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                              FEATURE MODULES                                    │
├─────────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                 │
│  │ Role Play Chat  │  │  Goal Planner   │  │ Relaxation      │                 │
│  │   Simulator     │  │                 │  │   Session       │                 │
│  │                 │  │                 │  │                 │                 │
│  │ • 5 AI Personas │  │ • Goal Creation │  │ • Thought       │                 │
│  │ • Chat History  │  │ • Progress      │  │   Analysis      │                 │
│  │ • Conversations │  │   Tracking      │  │ • Image         │                 │
│  │ • Emotions      │  │ • Categories    │  │   Generation    │                 │
│  │ • Message       │  │ • Streaks       │  │ • Healing       │                 │
│  │   Threading     │  │ • Persistence   │  │   Quotes        │                 │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                 │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                            APPLICATION LOGIC LAYER                              │
├─────────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                 │
│  │   AI Service    │  │   Data Manager  │  │  State Manager  │                 │
│  │                 │  │                 │  │                 │                 │
│  │ • Persona       │  │ • localStorage  │  │ • React State   │                 │
│  │   Management    │  │   Interface     │  │ • Context API   │                 │
│  │ • Response      │  │ • Data          │  │ • Component     │                 │
│  │   Generation    │  │   Serialization │  │   State         │                 │
│  │ • Fallback      │  │ • CRUD          │  │ • User Session  │                 │
│  │   Handling      │  │   Operations    │  │   Management    │                 │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                 │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                              FRAMEWORK LAYER                                    │
├─────────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                 │
│  │    Next.js      │  │    React 18     │  │   TypeScript    │                 │
│  │                 │  │                 │  │                 │                 │
│  │ • App Router    │  │ • Components    │  │ • Type Safety   │                 │
│  │ • SSG/SSR       │  │ • Hooks         │  │ • Interfaces    │                 │
│  │ • API Routes    │  │ • Context       │  │ • Validation    │                 │
│  │ • Routing       │  │ • State Mgmt    │  │ • IntelliSense  │                 │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                 │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                              STYLING & ANIMATION                                │
├─────────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                 │
│  │  Tailwind CSS   │  │ Framer Motion   │  │ Lucide Icons    │                 │
│  │                 │  │                 │  │                 │                 │
│  │ • Utility       │  │ • Animations    │  │ • Consistent    │                 │
│  │   Classes       │  │ • Transitions   │  │   Iconography   │                 │
│  │ • Responsive    │  │ • Gestures      │  │ • SVG Icons     │                 │
│  │   Design        │  │ • Page          │  │ • Accessibility │                 │
│  │ • Theme         │  │   Transitions   │  │   Support       │                 │
│  │   System        │  │ • Micro         │  │                 │                 │
│  │                 │  │   Interactions  │  │                 │                 │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                 │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                           DATA PERSISTENCE LAYER                                │
├─────────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                 │
│  │ Browser Storage │  │  Authentication │  │   External API  │                 │
│  │                 │  │     Storage     │  │   Integration   │                 │
│  │ • localStorage  │  │                 │  │                 │                 │
│  │   - Chat        │  │ • Firebase Auth │  │ • AI Services   │                 │
│  │     History     │  │ • User Sessions │  │ • Content       │                 │
│  │   - Goals       │  │ • JWT Tokens    │  │   Generation    │                 │
│  │   - Preferences │  │ • Secure        │  │ • Fallback      │                 │
│  │ • sessionStorage│  │   Logout        │  │   Systems       │                 │
│  │   - Temp Data   │  │                 │  │                 │                 │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                 │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                           DEPLOYMENT & INFRASTRUCTURE                           │
├─────────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                 │
│  │ Firebase        │  │   Build System  │  │   Development   │                 │
│  │   Hosting       │  │                 │  │   Environment   │                 │
│  │                 │  │ • Next.js Build │  │                 │                 │
│  │ • Static Site   │  │ • Turbopack     │  │ • Hot Reload    │                 │
│  │   Hosting       │  │ • Asset         │  │ • Dev Server    │                 │
│  │ • CDN           │  │   Optimization  │  │ • Error         │                 │
│  │   Distribution  │  │ • Code          │  │   Reporting     │                 │
│  │ • SSL/TLS       │  │   Splitting     │  │ • Live Updates  │                 │
│  │ • Auto Deploy  │  │ • Tree Shaking  │  │                 │                 │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## Data Flow Architecture

```
USER INTERACTION
       │
       ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   UI Layer  │───▶│   State     │───▶│   Logic     │
│             │    │  Manager    │    │   Layer     │
│ • Input     │    │             │    │             │
│ • Display   │    │ • useState  │    │ • AI        │
│ • Events    │    │ • useEffect │    │   Processing│
└─────────────┘    │ • Context   │    │ • Business  │
       ▲           └─────────────┘    │   Rules     │
       │                  │          └─────────────┘
       │                  ▼                 │
       │           ┌─────────────┐          │
       │           │   Local     │          │
       │           │  Storage    │          │
       │           │             │          │
       │           │ • Goals     │          │
       │           │ • Chat      │          │
       │           │   History   │          │
       │           │ • User      │          │
       │           │   Prefs     │          │
       │           └─────────────┘          │
       │                  ▲                │
       │                  │                │
       └──────────────────┼────────────────┘
                          │
                   ┌─────────────┐
                   │   External  │
                   │   Services  │
                   │             │
                   │ • Firebase  │
                   │   Auth      │
                   │ • AI APIs   │
                   │ • CDN       │
                   └─────────────┘
```

## Component Hierarchy

```
App
├── AuthProvider
│   ├── Navigation
│   ├── Home
│   │   ├── Hero
│   │   ├── Features
│   │   └── Footer
│   ├── Authentication
│   │   ├── Login
│   │   └── Signup
│   ├── RolePlayPage
│   │   ├── PersonaSelection
│   │   ├── ChatInterface
│   │   │   ├── DoodleAvatar
│   │   │   ├── MessageList
│   │   │   ├── ChatHistory
│   │   │   └── MessageInput
│   │   └── ChatHistoryModal
│   ├── GoalPlannerPage
│   │   ├── GoalGrid
│   │   ├── CategoryFilter
│   │   ├── GoalCard
│   │   ├── GoalModal
│   │   └── NewGoalModal
│   └── RelaxationPage
│       ├── ImageDisplay
│       ├── HealingQuote
│       └── ThoughtInput
```

## Security Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    SECURITY LAYERS                          │
├─────────────────────────────────────────────────────────────┤
│ Frontend Security                                           │
│ ┌─────────────────┐  ┌─────────────────┐                   │
│ │ Input Validation│  │   XSS Protection│                   │
│ │ • Form Sanitize │  │   • Content     │                   │
│ │ • Type Checking │  │     Security    │                   │
│ │ • Data Bounds   │  │   • Script      │                   │
│ └─────────────────┘  │     Filtering   │                   │
│                      └─────────────────┘                   │
├─────────────────────────────────────────────────────────────┤
│ Data Security                                               │
│ ┌─────────────────┐  ┌─────────────────┐                   │
│ │ Local Storage   │  │  Authentication │                   │
│ │ • Client-side   │  │  • Firebase     │                   │
│ │   Encryption    │  │    Secure Auth  │                   │
│ │ • Data Privacy  │  │  • JWT Tokens   │                   │
│ │ • No Tracking   │  │  • Session Mgmt │                   │
│ └─────────────────┘  └─────────────────┘                   │
├─────────────────────────────────────────────────────────────┤
│ Transport Security                                          │
│ ┌─────────────────┐  ┌─────────────────┐                   │
│ │ HTTPS/TLS       │  │   CORS Policy   │                   │
│ │ • SSL Certs     │  │   • Origin      │                   │
│ │ • Encrypted     │  │     Control     │                   │
│ │   Transmission  │  │   • Header      │                   │
│ └─────────────────┘  │     Security    │                   │
│                      └─────────────────┘                   │
└─────────────────────────────────────────────────────────────┘
```

## Performance Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                  PERFORMANCE OPTIMIZATION                   │
├─────────────────────────────────────────────────────────────┤
│ Build Optimization                                          │
│ ┌─────────────────┐  ┌─────────────────┐                   │
│ │ Code Splitting  │  │  Asset          │                   │
│ │ • Route-based   │  │  Optimization   │                   │
│ │ • Dynamic       │  │  • Image        │                   │
│ │   Imports       │  │    Compression  │                   │
│ │ • Bundle Size   │  │  • Tree Shaking │                   │
│ │   Optimization  │  │  • Minification │                   │
│ └─────────────────┘  └─────────────────┘                   │
├─────────────────────────────────────────────────────────────┤
│ Runtime Optimization                                        │
│ ┌─────────────────┐  ┌─────────────────┐                   │
│ │ React           │  │   Caching       │                   │
│ │ Optimization    │  │   Strategy      │                   │
│ │ • Memo          │  │   • Browser     │                   │
│ │ • Callback      │  │     Cache       │                   │
│ │ • Effect        │  │   • Service     │                   │
│ │   Dependencies  │  │     Worker      │                   │
│ └─────────────────┘  └─────────────────┘                   │
└─────────────────────────────────────────────────────────────┘
```

## Deployment Pipeline

```
Developer
    │
    ▼
┌─────────────┐
│   Local     │
│ Development │
│             │
│ • Hot       │
│   Reload    │
│ • Dev       │
│   Server    │
└─────────────┘
    │
    ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Build     │───▶│   Deploy    │───▶│ Production  │
│  Process    │    │  Pipeline   │    │   Server    │
│             │    │             │    │             │
│ • npm run   │    │ • Firebase  │    │ • Firebase  │
│   build     │    │   CLI       │    │   Hosting   │
│ • Next.js   │    │ • Auto      │    │ • CDN       │
│   Compile   │    │   Deploy    │    │   Global    │
│ • Asset     │    │ • Version   │    │ • SSL/TLS   │
│   Bundle    │    │   Control   │    │   Security  │
└─────────────┘    └─────────────┘    └─────────────┘
                          │
                          ▼
                   ┌─────────────┐
                   │   Live      │
                   │  Website    │
                   │             │
                   │ • Real-time │
                   │   Updates   │
                   │ • Global    │
                   │   Access    │
                   │ • 24/7      │
                   │   Uptime    │
                   └─────────────┘
```

---

**Architecture Summary:**
- **Frontend**: Next.js + React + TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **State Management**: React Context + Local State
- **Data Persistence**: Browser localStorage + Firebase Auth
- **Deployment**: Firebase Hosting with CI/CD
- **Security**: Client-side encryption + HTTPS + Input validation
- **Performance**: Code splitting + Asset optimization + Caching
