# MindSpace AI - Use Case Diagram

## Mental Wellness Platform Use Cases

```
                    MindSpace AI Mental Wellness Platform
                              Use Case Diagram
                              
    ┌──────────────────────────────────────────────────────────────────┐
    │                         System Boundary                          │
    │                                                                  │
    │  ┌─────────────────────────────────────────────────────────────┐ │
    │  │                 Authentication System                        │ │
    │  │                                                             │ │
    │  │  ✓ Sign Up            ✓ Sign In           ✓ Sign Out       │ │
    │  │  ✓ User Management    ✓ Profile Setup    ✓ Session Mgmt   │ │
    │  └─────────────────────────────────────────────────────────────┘ │
    │                                                                  │
    │  ┌─────────────────────────────────────────────────────────────┐ │
    │  │              Role Play Chat Simulator                       │ │
    │  │                                                             │ │
    │  │  ✓ Select AI Persona    ✓ Chat with AI     ✓ Save Sessions │ │
    │  │    - Therapist           - Text Chat        - Chat History   │ │
    │  │    - Friend              - Real-time        - Session Resume │ │
    │  │    - Life Coach          - Context Aware    - Persona Switch │ │
    │  │    - Meditation Guide    - Empathetic      - New Conversation │ │
    │  │    - Wise Mentor         - Supportive                        │ │
    │  └─────────────────────────────────────────────────────────────┘ │
    │                                                                  │
    │  ┌─────────────────────────────────────────────────────────────┐ │
    │  │                    Goal Planner                             │ │
    │  │                                                             │ │
    │  │  ✓ Create Goals        ✓ Track Progress    ✓ Goal Management│ │
    │  │    - Set Title          - Progress %        - Edit Goals     │ │
    │  │    - Choose Category    - Visual Progress   - Delete Goals   │ │
    │  │    - Set Duration       - Milestone Track   - View Details   │ │
    │  │    - Add Notes          - Streak Counter    - Categorize     │ │
    │  │    - AI Subtasks        - Daily Check-ins   - Persistent     │ │
    │  └─────────────────────────────────────────────────────────────┘ │
    │                                                                  │
    │  ┌─────────────────────────────────────────────────────────────┐ │
    │  │                 Relaxation Session                          │ │
    │  │                                                             │ │
    │  │  ✓ Share Thoughts      ✓ Generate Content  ✓ Healing Exp   │ │
    │  │    - Mood Expression    - AI Healing Images - Calming Visuals │ │
    │  │    - Emotional Input    - Therapeutic Quotes - Peaceful Env  │ │
    │  │    - Mindful Sharing    - Context-Aware     - Serene Content │ │
    │  │                        - Visual Therapy    - Wellness Focus │ │
    │  └─────────────────────────────────────────────────────────────┘ │
    │                                                                  │
    │  ┌─────────────────────────────────────────────────────────────┐ │
    │  │                    Core Features                             │ │
    │  │                                                             │ │
    │  │  ✓ Navigation         ✓ Data Persistence   ✓ UI/UX         │ │
    │  │    - Feature Access    - Local Storage     - Clean Design   │ │
    │  │    - Menu System       - Session State     - 3D Shadows     │ │
    │  │    - Mobile Responsive - User Preferences  - Calm Aesthetic │ │
    │  │    - Page Routing      - Cross-Session     - White Theme    │ │
    │  └─────────────────────────────────────────────────────────────┘ │
    │                                                                  │
    └──────────────────────────────────────────────────────────────────┘

    ┌─────────────┐                                      ┌─────────────┐
    │    User     │──────────────────────────────────────│   System    │
    │ (Primary    │                                      │ (Secondary  │
    │  Actor)     │                                      │   Actor)    │
    └─────────────┘                                      └─────────────┘
           │                                                     │
           │                                                     │
      ┌────▼────┐                                       ┌────────▼────────┐
      │ Mental  │                                       │  AI Services    │
      │Wellness │                                       │                 │
      │ Seeker  │                                       │ • Chat AI       │
      │         │                                       │ • Image Gen AI  │
      │ Goals:  │                                       │ • NLP Analysis  │
      │• Express│                                       │ • Context       │
      │• Heal   │                                       │   Understanding │
      │• Grow   │                                       │ • Response Gen  │
      │• Track  │                                       │ • Mood Analysis │
      └─────────┘                                       └─────────────────┘


═══════════════════════════════════════════════════════════════════════════
                              DETAILED USE CASES
═══════════════════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────────────┐
│                        UC01: ROLE PLAY CHAT SIMULATOR                   │
├─────────────────────────────────────────────────────────────────────────┤
│ Primary Actor: Mental Wellness Seeker                                   │
│ Precondition: User is authenticated and logged in                       │
│ Trigger: User selects "Role Play Chat Simulator" from main navigation   │
│                                                                         │
│ Main Success Scenario:                                                  │
│ 1. System displays persona selection screen                             │
│ 2. User selects preferred AI persona (Therapist/Friend/Coach/etc.)      │
│ 3. System initiates chat session with chosen persona                    │
│ 4. AI provides personalized welcome message based on persona            │
│ 5. User types message expressing thoughts/feelings                       │
│ 6. System processes input and generates contextual, empathetic response  │
│ 7. Conversation continues with AI maintaining persona characteristics    │
│ 8. User can save session, view history, or start new conversation       │
│                                                                         │
│ Extensions:                                                             │
│ • 2a. User changes persona mid-session                                  │
│ • 4a. System loads previous chat history                                │
│ • 6a. AI service unavailable - fallback to predefined responses         │
│ • 8a. User accesses chat history from previous sessions                 │
│                                                                         │
│ Postcondition: Chat session is saved, user feels heard and supported   │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                           UC02: GOAL PLANNER                            │
├─────────────────────────────────────────────────────────────────────────┤
│ Primary Actor: Mental Wellness Seeker                                   │
│ Precondition: User is authenticated and logged in                       │
│ Trigger: User selects "Goal Planner" from main navigation               │
│                                                                         │
│ Main Success Scenario:                                                  │
│ 1. System displays goal dashboard with existing goals (if any)          │
│ 2. User clicks "New Goal" to create a wellness goal                     │
│ 3. User inputs goal title, selects category, sets duration              │
│ 4. System generates AI-powered subtasks and milestones                  │
│ 5. Goal is created and added to user's goal list                        │
│ 6. User performs daily check-ins to update progress                     │
│ 7. System tracks streak, calculates progress percentage                 │
│ 8. User can edit, delete, or view detailed goal information             │
│                                                                         │
│ Extensions:                                                             │
│ • 1a. First-time user sees empty state with encouragement               │
│ • 3a. User sets custom duration beyond preset options                   │
│ • 4a. System provides contextual subtasks based on goal category        │
│ • 6a. User maintains streak for consecutive daily check-ins              │
│ • 7a. Progress visualization updates in real-time                       │
│                                                                         │
│ Postcondition: Goals persist across sessions, progress is trackable     │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                        UC03: RELAXATION SESSION                         │
├─────────────────────────────────────────────────────────────────────────┤
│ Primary Actor: Mental Wellness Seeker                                   │
│ Precondition: User is authenticated and logged in                       │
│ Trigger: User selects "Relaxation Session" from main navigation         │
│                                                                         │
│ Main Success Scenario:                                                  │
│ 1. System displays calm interface with healing quote                    │
│ 2. User shares current thoughts, feelings, or mental state              │
│ 3. System analyzes emotional context and generates healing response     │
│ 4. AI creates therapeutic, calming image based on user's input          │
│ 5. System displays healing image with supportive, encouraging message   │
│ 6. User experiences visual and textual therapy for emotional healing    │
│ 7. Session provides peaceful moment for reflection and self-care        │
│                                                                         │
│ Extensions:                                                             │
│ • 1a. Random healing quote displayed on page load                       │
│ • 3a. System provides fallback healing responses if AI unavailable      │
│ • 4a. Image selection algorithm chooses based on emotional keywords     │
│ • 5a. Healing quotes adapt to user's expressed emotional state          │
│ • 6a. User can generate multiple healing images in single session       │
│                                                                         │
│ Postcondition: User feels calmer, more centered, emotionally supported  │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                     UC04: AUTHENTICATION & PROFILE                      │
├─────────────────────────────────────────────────────────────────────────┤
│ Primary Actor: Mental Wellness Seeker                                   │
│ Precondition: User accesses MindSpace platform                          │
│ Trigger: User attempts to access protected features                      │
│                                                                         │
│ Main Success Scenario:                                                  │
│ 1. System presents authentication options (Sign Up/Sign In)             │
│ 2. User creates account or logs in with existing credentials            │
│ 3. System validates credentials and creates secure session              │
│ 4. User gains access to all mental wellness features                    │
│ 5. Session persists across browser tabs and reasonable time periods     │
│ 6. User can sign out when finished with session                         │
│                                                                         │
│ Extensions:                                                             │
│ • 1a. Unauthenticated user sees limited public content                  │
│ • 2a. New user onboarding with platform introduction                    │
│ • 3a. Invalid credentials prompt re-entry                               │
│ • 4a. Welcome screen guides user through available features             │
│ • 5a. Session timeout requires re-authentication                        │
│                                                                         │
│ Postcondition: User has secure, persistent access to wellness tools     │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                          UC05: DATA PERSISTENCE                         │
├─────────────────────────────────────────────────────────────────────────┤
│ Primary Actor: System (Background Process)                              │
│ Secondary Actor: Mental Wellness Seeker                                 │
│ Trigger: User creates, modifies, or accesses personal data              │
│                                                                         │
│ Main Success Scenario:                                                  │
│ 1. User performs action that generates or modifies personal data        │
│ 2. System automatically saves data to local browser storage             │
│ 3. Data includes goals, chat history, preferences, progress tracking    │
│ 4. System retrieves saved data when user returns to platform           │
│ 5. All user progress and content persists across browser sessions       │
│ 6. Data remains available until manually deleted by user               │
│                                                                         │
│ Extensions:                                                             │
│ • 2a. System handles storage quota limitations gracefully               │
│ • 4a. Data migration between different browsers/devices (future)        │
│ • 5a. Backup/export functionality for user data (future)                │
│ • 6a. Privacy controls for data retention preferences                   │
│                                                                         │
│ Postcondition: User data is reliably preserved for continued wellness   │
└─────────────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════════
                              ACTOR RELATIONSHIPS
═══════════════════════════════════════════════════════════════════════════

PRIMARY ACTOR: Mental Wellness Seeker
├── Persona: Individual seeking emotional support, personal growth, healing
├── Goals: Express feelings safely, track personal progress, find peace
├── Needs: Empathetic AI interaction, progress visualization, calming experiences
└── Behaviors: Regular check-ins, goal setting, emotional expression

SECONDARY ACTOR: AI Services System
├── Chat AI: Provides contextual, empathetic conversational responses
├── Image Generation AI: Creates therapeutic, healing visual content
├── Natural Language Processing: Analyzes user emotional context
└── Context Understanding: Maintains conversation history and user state

═══════════════════════════════════════════════════════════════════════════
                               SYSTEM QUALITIES
═══════════════════════════════════════════════════════════════════════════

✓ Empathy-First Design: Every interaction prioritizes user emotional wellbeing
✓ Privacy & Safety: All conversations and data treated with highest confidentiality  
✓ Accessibility: Clean, calm interface accessible across devices and abilities
✓ Reliability: Graceful degradation when AI services unavailable
✓ Personalization: Adaptive responses based on user context and history
✓ Therapeutic Value: Each feature designed to promote genuine mental wellness

═══════════════════════════════════════════════════════════════════════════
```
