# Constraint Ranch - Technical Architecture

## System Overview

Constraint Ranch is built on a modern web architecture with a deterministic game engine powered by Constraint Theory for exact arithmetic.

> **Related Docs:** [GAME_DESIGN.md](./GAME_DESIGN.md) | [PUZZLE_FORMAT.md](./PUZZLE_FORMAT.md) | [AGENT_SPECIES.md](./AGENT_SPECIES.md)
>
> **Ecosystem:** [constraint-theory-core](https://github.com/SuperInstance/constraint-theory-core) | [constraint-flow](https://github.com/SuperInstance/constraint-flow) | [pasture-ai](https://github.com/SuperInstance/pasture-ai)

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

### Snapping System

Agents automatically snap to valid positions using Constraint Theory:

```typescript
// Snapping configuration
interface SnapConfig {
  // Snap to grid intersections
  gridSnap: boolean;
  gridSize: ExactNumber;
  
  // Snap to zone perimeters
  perimeterSnap: boolean;
  
  // Snap to other agents (formation)
  formationSnap: boolean;
  formationDistance: ExactNumber;
}

// Example: Snap agent to nearest valid position
const snappedPosition = constraintTheory.snap(
  agentPosition,
  validPositions,
  { gridSnap: true, gridSize: ExactNumber.from(10) }
);
```

#### Constraint Snapping in Gameplay

The snapping system is central to puzzle mechanics:

```
┌─────────────────────────────────────────────────────────────────┐
│                    CONSTRAINT SNAPPING FLOW                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. Player drags agent to approximate position                  │
│     └── Agent position: (123.456, 789.012) [floating point]    │
│                                                                  │
│  2. System identifies valid snap targets                        │
│     ├── Grid intersections                                      │
│     ├── Zone perimeters                                         │
│     ├── Formation positions                                     │
│     └── Constraint-allowed regions                              │
│                                                                  │
│  3. Constraint Theory calculates EXACT nearest valid position   │
│     └── Snapped position: Dodecet(123, 789, N) [exact]         │
│                                                                  │
│  4. Agent snaps with visual feedback                            │
│     └── Player sees agent "click" into place                    │
│                                                                  │
│  5. Constraint validation runs on exact coordinates             │
│     └── NO floating-point ambiguity in results!                 │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Snapping Target Types:**

| Target Type | Description | Use Case |
|-------------|-------------|----------|
| `grid` | Grid line intersections | Basic positioning puzzles |
| `perimeter` | Zone boundary points | Coverage optimization |
| `formation` | Relative to other agents | Multi-agent patterns |
| `constraint` | Points satisfying specific constraints | Advanced puzzles |
| `manifold` | Pythagorean manifold points | Geometric puzzles |

**Game Integration Example:**

```typescript
// In-game snapping with visual feedback
function handleAgentDrag(agent: GameAgent, targetPos: Position): void {
  // Get valid snap targets for current puzzle
  const snapTargets = puzzleEngine.getSnapTargets(agent, targetPos);
  
  // Snap using Constraint Theory
  const snapResult = constraintTheory.snapToNearest(
    targetPos,
    snapTargets,
    {
      maxSnapDistance: 50, // Maximum pixels to snap
      preferConstraint: true, // Prefer constraint-satisfying positions
      visualFeedback: true // Show snap indicator
    }
  );
  
  // Apply exact position
  agent.position = snapResult.snappedPosition;
  
  // Update constraint satisfaction display
  updateConstraintIndicators(snapResult.constraintsAffected);
  
  // Visual feedback
  if (snapResult.snapped) {
    showSnapEffect(agent, snapResult.originalPosition, snapResult.snappedPosition);
  }
}
```

> 📘 **Learn more:** See [constraint-theory-core](https://github.com/SuperInstance/constraint-theory-core) for the full API documentation.

---

### Pythagorean Manifold Integration

Constraint Ranch uses **Pythagorean manifolds** for geometric puzzle validation, enabling exact distance and angle calculations.

#### What is a Pythagorean Manifold?

A Pythagorean manifold is a mathematical structure where all distances are computed using exact Pythagorean arithmetic:

```typescript
import { PythagoreanManifold, ExactNumber } from 'constraint-theory-wasm';

// Create a 2D manifold with exact distance calculations
const manifold = new PythagoreanManifold(2); // 2-dimensional

// Define points with exact coordinates
const pointA = manifold.point(3, 4);  // Exact representation
const pointB = manifold.point(0, 0);  // Origin

// Exact distance: √(3² + 4²) = 5 (exactly, not approximately!)
const distance = manifold.exactDistance(pointA, pointB);
console.log(distance.toString()); // "5" (exact)
console.log(distance.isExact()); // true
```

#### Usage in Puzzles

```typescript
// Spatial puzzle using Pythagorean manifold
interface SpatialPuzzleState {
  manifold: PythagoreanManifold;
  agents: Map<AgentId, ManifoldPoint>;
  constraints: ManifoldConstraint[];
}

// Constraint: Agents must form equilateral triangle
function validateEquilateralTriangle(
  agents: [GameAgent, GameAgent, GameAgent],
  manifold: PythagoreanManifold
): ValidationResult {
  // Calculate exact distances
  const d1 = manifold.exactDistance(agents[0].point, agents[1].point);
  const d2 = manifold.exactDistance(agents[1].point, agents[2].point);
  const d3 = manifold.exactDistance(agents[2].point, agents[0].point);
  
  // Check exact equality (no tolerance needed!)
  const isEquilateral = d1.equals(d2) && d2.equals(d3);
  
  return {
    satisfied: isEquilateral,
    sideLength: d1, // Exact value
    deviation: isEquilateral ? ExactNumber.ZERO : null
  };
}
```

#### Manifold Types in Ranch

| Manifold Type | Use Case | Example Constraints |
|---------------|----------|---------------------|
| **Euclidean 2D** | Standard spatial puzzles | Distance, area, perimeter |
| **Euclidean 3D** | 3D positioning (advanced) | Volume, surface area |
| **Circular** | Radial patterns | Angular spacing, arc length |
| **Hexagonal** | Hex grid puzzles | Neighbor distance, coverage |

#### Performance Characteristics

```
┌─────────────────────────────────────────────────────────────────┐
│               MANIFOLD OPERATION PERFORMANCE                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Operation          │ JS (approx) │ WASM (exact) │ Speedup      │
│  ───────────────────┼─────────────┼──────────────┼───────────── │
│  Distance 2D        │ ~50ns       │ ~5ns         │ 10x          │
│  Distance 3D        │ ~80ns       │ ~8ns         │ 10x          │
│  Angle calculation  │ ~200ns      │ ~15ns        │ 13x          │
│  Area (polygon)     │ ~500ns      │ ~30ns        │ 17x          │
│  Snapping (100 pts) │ ~5ms        │ ~0.1ms       │ 50x          │
│  Batch validation   │ ~10ms       │ ~0.2ms       │ 50x          │
│                                                                  │
│  Note: All WASM operations are EXACT (no floating-point error)  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

### Rust Performance Integration

Constraint Ranch leverages Rust-compiled WASM for computationally intensive operations.

#### Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    RUST/WASM INTEGRATION                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────┐     WASM     ┌─────────────────────────┐   │
│  │  constraint-    │─────────────▶│  Browser (V8)           │   │
│  │  theory-core    │              │  ┌───────────────────┐  │   │
│  │  (Rust crate)   │              │  │ WASM Module       │  │   │
│  │                 │              │  │ ┌───────────────┐ │  │   │
│  │  • ExactNumber  │              │  │ │ExactNumber    │ │  │   │
│  │  • Dodecet      │              │  │ │Dodecet        │ │  │   │
│  │  • Manifold     │              │  │ │Manifold       │ │  │   │
│  │  • Snapping     │              │  │ │SnapEngine     │ │  │   │
│  │  • Validation   │              │  │ └───────────────┘ │  │   │
│  └─────────────────┘              │  └───────────────────┘  │   │
│         │                         └─────────────────────────┘   │
│         │ source                                                │
│         ▼                                                        │
│  ┌─────────────────┐                                            │
│  │  constraint-    │                                            │
│  │  theory-python  │                                            │
│  │  (Python)       │                                            │
│  │                 │                                            │
│  │  Server-side    │                                            │
│  │  validation     │                                            │
│  └─────────────────┘                                            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

#### WASM Loading and Caching

```typescript
// Singleton WASM loader with caching
class WasmLoader {
  private static instance: ConstraintTheoryWasm | null = null;
  private static loading: Promise<ConstraintTheoryWasm> | null = null;
  
  static async load(): Promise<ConstraintTheoryWasm> {
    // Return cached instance
    if (this.instance) {
      return this.instance;
    }
    
    // Wait for in-progress load
    if (this.loading) {
      return this.loading;
    }
    
    // Start loading
    this.loading = (async () => {
      const module = await import('constraint-theory-wasm');
      this.instance = await module.default();
      return this.instance;
    })();
    
    return this.loading;
  }
  
  // Preload for faster initial game start
  static preload(): void {
    // Start loading WASM before game initializes
    this.load().catch(console.error);
  }
}

// Preload WASM in head of document
if (typeof window !== 'undefined') {
  WasmLoader.preload();
}
```

#### Performance-Critical Paths

| Operation | Implementation | Why Rust |
|-----------|----------------|----------|
| Exact arithmetic | Rust/WASM | No floating-point errors |
| Distance calculations | Rust/WASM | 10x+ speedup |
| Constraint validation | Rust/WASM | Batch processing efficiency |
| Snapping algorithm | Rust/WASM | Complex geometric calculations |
| Batch processing | Rust/WASM | Memory efficiency |

---

### Batch Processing

Constraint Ranch supports efficient batch processing for multiple constraint validations.

#### Batch Validation API

```typescript
// Batch validate multiple solutions
interface BatchValidationRequest {
  puzzleId: string;
  solutions: Solution[];
}

interface BatchValidationResult {
  results: ValidationResult[];
  totalProcessed: number;
  processingTimeMs: number;
  averageTimePerSolution: number;
}

async function batchValidate(
  request: BatchValidationRequest
): Promise<BatchValidationResult> {
  const wasm = await WasmLoader.load();
  
  // Use WASM batch API for efficiency
  const results = wasm.validateBatch(
    request.puzzleId,
    request.solutions.map(s => JSON.stringify(s))
  );
  
  return {
    results: results.map(r => JSON.parse(r)),
    totalProcessed: request.solutions.length,
    processingTimeMs: results.processingTime,
    averageTimePerSolution: results.processingTime / request.solutions.length
  };
}
```

#### Use Cases

**1. Leaderboard Validation**

```typescript
// Validate leaderboard submissions in batch
async function processLeaderboardSubmissions(
  puzzleId: string,
  submissions: LeaderboardSubmission[]
): Promise<ProcessedLeaderboard> {
  const results = await batchValidate({
    puzzleId,
    solutions: submissions.map(s => s.solution)
  });
  
  // Filter valid submissions
  const validSubmissions = submissions.filter((_, i) => 
    results.results[i].valid
  );
  
  // Sort by score
  return validSubmissions.sort((a, b) => b.score - a.score);
}
```

**2. Tournament Processing**

```typescript
// Process tournament round
async function processTournamentRound(
  match: TournamentMatch
): Promise<MatchResult> {
  // Validate all player solutions simultaneously
  const batchResult = await batchValidate({
    puzzleId: match.puzzleId,
    solutions: match.playerSubmissions
  });
  
  // Determine winner
  const scores = batchResult.results.map((r, i) => ({
    playerId: match.players[i].id,
    score: r.valid ? calculateScore(r) : 0,
    time: match.playerSubmissions[i].timeMs
  }));
  
  return {
    winner: scores.reduce((best, curr) => 
      curr.score > best.score ? curr : best
    ),
    allScores: scores
  };
}
```

**3. Analytics Processing**

```typescript
// Batch process puzzle analytics
async function generatePuzzleAnalytics(
  puzzleId: string,
  allSolutions: HistoricalSolution[]
): Promise<PuzzleAnalytics> {
  // Re-validate all historical solutions
  const batchResult = await batchValidate({
    puzzleId,
    solutions: allSolutions.map(s => s.solution)
  });
  
  // Calculate statistics
  return {
    totalAttempts: allSolutions.length,
    validSolutions: batchResult.results.filter(r => r.valid).length,
    averageScore: calculateAverage(batchResult.results),
    averageTime: calculateAverageTime(allSolutions),
    commonMistakes: identifyPatterns(batchResult.results)
  };
}
```

#### Batch Performance

```
┌─────────────────────────────────────────────────────────────────┐
│                    BATCH PROCESSING BENCHMARKS                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Batch Size │ Sequential │ Batch WASM │ Improvement │ Memory   │
│  ───────────┼────────────┼────────────┼─────────────┼──────────│
│  10         │ ~500ms     │ ~50ms      │ 10x         │ +2KB     │
│  100        │ ~5s        │ ~200ms     │ 25x         │ +20KB    │
│  1,000      │ ~50s       │ ~1.5s      │ 33x         │ +200KB   │
│  10,000     │ ~8min      │ ~12s       │ 40x         │ +2MB     │
│                                                                  │
│  Memory: WASM uses linear memory for batch efficiency           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
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
