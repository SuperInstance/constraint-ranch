# Constraint Ranch - Technical Architecture

## System Overview

Constraint Ranch is built on a modern web architecture with a deterministic game engine powered by Constraint Theory for exact arithmetic.

```
┌─────────────────────────────────────────────────────────────────┐
│                     CONSTRAINT RANCH ARCHITECTURE                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐        │
│  │   Browser   │────▶│  Next.js    │────▶│  Game       │        │
│  │   Client    │◀────│  Frontend   │◀────│  Engine     │        │
│  └─────────────┘     └─────────────┘     └─────────────┘        │
│                              │                 │                 │
│                              ▼                 ▼                 │
│                       ┌─────────────┐   ┌─────────────┐         │
│                       │   API       │   │  Constraint │         │
│                       │   Routes    │   │  Theory     │         │
│                       └─────────────┘   └─────────────┘         │
│                              │                 │                 │
│                              ▼                 ▼                 │
│                       ┌─────────────┐   ┌─────────────┐         │
│                       │  Database   │   │  WASM/Rust  │         │
│                       │  (Prisma)   │   │  Exact Math │         │
│                       └─────────────┘   └─────────────┘         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Technology Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| Next.js 16 | React framework with App Router |
| TypeScript | Type-safe development |
| Tailwind CSS 4 | Styling and layout |
| shadcn/ui | Component library |
| Zustand | State management |
| React Query | Server state & caching |

### Backend
| Technology | Purpose |
|------------|---------|
| Next.js API Routes | Serverless functions |
| Prisma ORM | Database access |
| PostgreSQL | Primary database |
| Redis | Caching & sessions |

### Game Engine
| Technology | Purpose |
|------------|---------|
| Constraint Theory (Rust) | Exact arithmetic via WASM |
| Canvas/WebGL | Game rendering |
| Zustand | Game state management |

---

## Core Data Structures

### Ranch State

```typescript
interface RanchState {
  // Player info
  playerId: string;
  level: number;
  experience: ExactNumber;
  credits: ExactNumber;
  
  // Agents
  agents: GameAgent[];
  eggs: Egg[];
  
  // Progress
  completedPuzzles: Set<string>;
  achievements: Set<string>;
  unlocks: Set<string>;
  
  // Resources
  resources: Map<ResourceType, ExactNumber>;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}
```

### Game Agent

```typescript
interface GameAgent {
  id: string;
  species: SpeciesType;
  
  // Exact position using Dodecet coordinates
  position: DodecetCoordinate;
  
  // Traits as exact fractions
  traits: Map<TraitType, ExactNumber>;
  
  // Current state
  status: 'idle' | 'working' | 'training' | 'breeding';
  currentTask?: TaskId;
  
  // Metadata
  generation: number;
  parents?: [AgentId, AgentId];
  birthDate: Date;
  trainingHours: number;
}
```

### Constraint Puzzle

```typescript
interface ConstraintPuzzle {
  id: string;
  type: PuzzleType;
  
  // Puzzle definition
  constraints: Constraint[];
  initialState: GameState;
  goalState: Constraint[];
  
  // Validation
  validator: (solution: Solution) => ValidationResult;
  
  // Metadata
  difficulty: number;
  estimatedTime: number;
}
```

---

## Game Engine Architecture

### Deterministic Core

The game engine is built on **Constraint Theory** for exact arithmetic:

```typescript
// Example: Exact position calculation
import { Dodecet, ExactNumber } from 'constraint-theory-wasm';

// No floating-point errors!
const pos1 = new Dodecet(3, 4, 5, 'N');  // Exact position
const pos2 = new Dodecet(3, 4, 5, 'NE'); // Exact position

// Exact distance calculation
const distance = pos1.exactDistanceTo(pos2); // Returns ExactNumber
const isCollision = distance.equals(ExactNumber.ZERO);
```

### State Machine

```
┌─────────────────────────────────────────────────────────────┐
│                    GAME STATE MACHINE                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐  │
│  │  IDLE   │───▶│ PUZZLE  │───▶│ RESULT  │───▶│  IDLE   │  │
│  └─────────┘    └─────────┘    └─────────┘    └─────────┘  │
│       │              │              ▲                       │
│       │              ▼              │                       │
│       │         ┌─────────┐         │                       │
│       │         │ SOLVING │─────────┘                       │
│       │         └─────────┘                                 │
│       │              │                                      │
│       ▼              ▼                                      │
│  ┌─────────┐    ┌─────────┐                                │
│  │ BREEDING│    │  HINT   │                                │
│  └─────────┘    └─────────┘                                │
│       │                                                     │
│       ▼                                                     │
│  ┌─────────┐                                               │
│  │ TRAINING│                                               │
│  └─────────┘                                               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Validation Pipeline

```typescript
interface ValidationPipeline {
  // 1. Parse solution
  parse(input: UserInput): Solution;
  
  // 2. Verify constraints
  verifyConstraints(solution: Solution): ConstraintResult[];
  
  // 3. Check exactness
  verifyExactness(solution: Solution): ExactnessResult;
  
  // 4. Calculate score
  calculateScore(solution: Solution, time: number, hints: number): Score;
  
  // 5. Apply rewards
  applyRewards(score: Score): RewardResult;
}
```

---

## API Architecture

### RESTful Endpoints

```
/api
├── /puzzles
│   ├── GET    /                 # List available puzzles
│   ├── GET    /:id              # Get puzzle details
│   ├── POST   /:id/submit       # Submit solution
│   └── GET    /:id/hint/:level  # Get hint
│
├── /agents
│   ├── GET    /                 # List player's agents
│   ├── POST   /                 # Hatch new agent
│   ├── GET    /:id              # Get agent details
│   ├── PUT    /:id              # Update agent
│   └── DELETE /:id              # Retire agent
│
├── /breeding
│   ├── POST   /                 # Breed two agents
│   └── POST   /train            # Night School training
│
├── /ranch
│   ├── GET    /                 # Get ranch state
│   └── PUT    /                 # Update ranch
│
└── /export
    └── POST   /                 # Export agent to production
```

### Real-time Updates

Using Server-Sent Events for real-time game updates:

```typescript
// Server
export async function GET(request: Request) {
  const stream = new ReadableStream({
    start(controller) {
      const sendUpdate = (event: GameEvent) => {
        controller.enqueue(`data: ${JSON.stringify(event)}\n\n`);
      };
      
      // Subscribe to game events
      gameEngine.subscribe(request.session.playerId, sendUpdate);
    }
  });
  
  return new Response(stream, {
    headers: { 'Content-Type': 'text/event-stream' }
  });
}

// Client
const eventSource = new EventSource('/api/events');
eventSource.onmessage = (event) => {
  const gameEvent = JSON.parse(event.data);
  updateGameState(gameEvent);
};
```

---

## Database Schema

### Prisma Schema

```prisma
model Player {
  id          String   @id @default(cuid())
  email       String   @unique
  name        String
  level       Int      @default(1)
  experience  BigInt   @default(0)
  credits     BigInt   @default(0)
  
  agents      Agent[]
  eggs        Egg[]
  completedPuzzles PuzzleCompletion[]
  achievements AchievementUnlock[]
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Agent {
  id          String   @id @default(cuid())
  species     String
  positionX   BigInt   // Exact number stored as BigInt
  positionY   BigInt
  status      String   @default("idle")
  generation  Int      @default(1)
  
  traits      Trait[]
  parents     Agent[]  @relation("ParentChild")
  offspring   Agent[]  @relation("ParentChild", references: [id])
  
  playerId    String
  player      Player   @relation(fields: [playerId])
  
  createdAt   DateTime @default(now())
}

model Trait {
  id          String   @id @default(cuid())
  name        String
  value       BigInt   // Exact number as BigInt numerator/denominator
  
  agentId     String
  agent       Agent    @relation(fields: [agentId])
}

model PuzzleCompletion {
  id          String   @id @default(cuid())
  puzzleId    String
  score       BigInt
  timeMs      Int
  hintsUsed   Int
  perfect     Boolean
  
  playerId    String
  player      Player   @relation(fields: [playerId])
  
  completedAt DateTime @default(now())
}

model AchievementUnlock {
  id          String   @id @default(cuid())
  achievementId String
  
  playerId    String
  player      Player   @relation(fields: [playerId])
  
  unlockedAt  DateTime @default(now())
}
```

---

## Performance Optimization

### Caching Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                     CACHING LAYERS                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  L1: Browser Cache                                           │
│  ├── Static assets (1 year)                                 │
│  └── API responses (appropriate TTL)                        │
│                                                              │
│  L2: CDN Edge Cache                                          │
│  ├── Puzzle definitions (1 hour)                            │
│  └── Leaderboards (5 minutes)                               │
│                                                              │
│  L3: Redis Cache                                             │
│  ├── Session data (24 hours)                                │
│  ├── Player state (15 minutes)                              │
│  └── Puzzle solutions (1 hour)                              │
│                                                              │
│  L4: Database                                                │
│  └── All persistent data                                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Query Optimization

```typescript
// Optimized puzzle fetching with caching
async function getPuzzle(id: string): Promise<Puzzle> {
  // Check Redis cache first
  const cached = await redis.get(`puzzle:${id}`);
  if (cached) return JSON.parse(cached);
  
  // Fetch from database
  const puzzle = await db.puzzle.findUnique({
    where: { id },
    include: { hints: true, rewards: true }
  });
  
  // Cache for future requests
  await redis.setex(`puzzle:${id}`, 3600, JSON.stringify(puzzle));
  
  return puzzle;
}
```

### WASM Performance

```typescript
// Initialize WASM module once
let wasmModule: ConstraintTheoryWasm | null = null;

async function getWasm(): Promise<ConstraintTheoryWasm> {
  if (!wasmModule) {
    wasmModule = await initConstraintTheory();
  }
  return wasmModule;
}

// Use in hot path
async function validateSolution(solution: Solution): Promise<boolean> {
  const wasm = await getWasm();
  // WASM calls are ~10x faster than JS for arithmetic
  return wasm.validateExact(solution);
}
```

---

## Security

### Authentication Flow

```
┌──────────┐     ┌──────────┐     ┌──────────┐
│  Login   │────▶│  OAuth   │────▶│  JWT     │
│  Page    │     │  Provider│     │  Token   │
└──────────┘     └──────────┘     └──────────┘
                      │                 │
                      ▼                 ▼
                 ┌──────────┐     ┌──────────┐
                 │ Session  │     │  API     │
                 │  Cookie  │     │  Access  │
                 └──────────┘     └──────────┘
```

### Input Validation

```typescript
// Zod schema for puzzle submission
const PuzzleSubmissionSchema = z.object({
  puzzleId: z.string().regex(/^puzzle-[a-z]+-\d+$/),
  solution: z.object({
    agentPositions: z.array(z.object({
      agentId: z.string().uuid(),
      x: z.number().int().min(0).max(10000),
      y: z.number().int().min(0).max(10000)
    })),
    // ... other solution fields
  }),
  timeTaken: z.number().positive(),
  hintsUsed: z.number().int().min(0).max(3)
});
```

### Rate Limiting

```typescript
// Rate limit puzzle submissions
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // 30 requests per minute
  keyGenerator: (req) => req.session.playerId
});

app.use('/api/puzzles/:id/submit', limiter);
```

---

## Deployment

### Infrastructure

```
┌─────────────────────────────────────────────────────────────┐
│                    PRODUCTION ARCHITECTURE                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐   │
│  │   Cloud     │────▶│   Vercel    │────▶│  Next.js    │   │
│  │  flare CDN  │     │   Edge      │     │  App        │   │
│  └─────────────┘     └─────────────┘     └─────────────┘   │
│                              │                               │
│                              ▼                               │
│                       ┌─────────────┐                       │
│                       │  Supabase   │                       │
│                       │  PostgreSQL │                       │
│                       └─────────────┘                       │
│                              │                               │
│                              ▼                               │
│                       ┌─────────────┐                       │
│                       │    Redis    │                       │
│                       │   (Upstash) │                       │
│                       └─────────────┘                       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Environment Configuration

```bash
# Required environment variables
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://constraint-ranch.superinstance.ai

# Constraint Theory WASM
CONSTRAINT_THEORY_WASM_URL=https://cdn.../constraint-theory.wasm

# OAuth providers
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
```

---

## Monitoring & Observability

### Metrics

```typescript
// Key performance indicators
const metrics = {
  // Latency
  puzzleSubmitLatency: histogram('puzzle_submit_latency_ms'),
  apiLatency: histogram('api_latency_ms'),
  
  // Throughput
  puzzlesCompleted: counter('puzzles_completed_total'),
  agentsBred: counter('agents_bred_total'),
  
  // Errors
  validationErrors: counter('validation_errors_total'),
  apiErrors: counter('api_errors_total'),
  
  // Business
  dailyActivePlayers: gauge('daily_active_players'),
  averageSessionLength: gauge('average_session_length_minutes')
};
```

### Logging

```typescript
// Structured logging
logger.info('Puzzle completed', {
  playerId,
  puzzleId,
  score,
  timeMs,
  hintsUsed,
  perfect: score === maxScore
});

logger.error('Validation failed', {
  puzzleId,
  error: error.message,
  solution: redactSensitive(solution)
});
```

---

## Future Architecture

### Planned Improvements

1. **WebRTC Multiplayer**: Real-time coordination puzzles
2. **Service Workers**: Offline puzzle support
3. **WebGPU**: Hardware-accelerated rendering
4. **Edge Computing**: Distributed puzzle validation
5. **GraphQL**: Flexible API queries

---

*This architecture ensures Constraint Ranch is scalable, deterministic, and performant.*
