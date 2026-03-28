# Onboarding Guide: constraint-ranch

**Repository:** https://github.com/SuperInstance/constraint-ranch
**Language:** TypeScript
**Version:** 0.2.0
**Last Updated:** 2025-01-27

---

## Welcome to Constraint Ranch

**Constraint Ranch** is a gamified constraint satisfaction platform where players breed, train, and coordinate AI agents through constraint-based puzzles. Learn constraint theory while having fun!

### What You'll Learn

1. Installation and setup
2. Game concepts: agents, species, puzzles
3. Creating and solving puzzles
4. Breeding and evolving agents
5. Building custom puzzles

---

## Prerequisites

### Required

- **Node.js 18+**
- **npm** or **yarn**
- **TypeScript 5.0+**

### Optional

- **A modern web browser** (for the game interface)

---

## Installation

```bash
# Clone repository
git clone https://github.com/SuperInstance/constraint-ranch.git
cd constraint-ranch

# Install dependencies
npm install

# Build
npm run build

# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

---

## Quick Start (5 Minutes)

### 1. Start Your First Puzzle

```typescript
import { Game, Puzzle, Agent } from 'constraint-ranch';

// Create a game instance
const game = new Game({
  player: 'newcomer',
  level: 1,
});

// Load the first puzzle
const puzzle = Puzzle.load('spatial-001');

// Position your agents to satisfy constraints
const solution = await game.solve(puzzle, {
  agents: [
    Agent.chicken({ position: [0, 0] }),
    Agent.chicken({ position: [1, 0] }),
    Agent.duck({ position: [0, 1] }),
  ],
});

console.log(`Score: ${solution.score}`);
console.log(`Constraints satisfied: ${solution.satisfied}/${puzzle.constraints.length}`);
```

### 2. Play in Browser

```
┌─────────────────────────────────────────────────────────────────┐
│                    🌾 CONSTRAINT RANCH 🌾                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Level 1: "First Herd"                                          │
│  Goal: Position 3 chickens to monitor all areas                 │
│                                                                  │
│      ┌──────────────────────────────────────────┐              │
│      │                                          │              │
│      │   🐔                                    🌾│              │
│      │              🐔                          🌾│              │
│      │   🐔                                    🌾│              │
│      │                                          │              │
│      └──────────────────────────────────────────┘              │
│                                                                  │
│  Constraints:                                                   │
│  ✅ Max distance between agents ≤ 2                            │
│  ✅ All 4 corners monitored                                    │
│  ⬜ Center area covered                                         │
│                                                                  │
│  Score: 2/3 (67%)                                               │
└─────────────────────────────────────────────────────────────────┘
```

---

## Game Concepts

### 1. Agent Species

Each species has unique capabilities organized into **four tiers**:

#### Tier 1: Starter (Level 1)
| Species | Icon | Capability | Size | Use Case |
|---------|------|------------|------|----------|
| **Chicken** | 🐔 | Monitoring, alerts | 5MB | Surveillance, early warning |

#### Tier 2: Network (Level 5-15)
| Species | Icon | Capability | Size | Use Case |
|---------|------|------------|------|----------|
| **Duck** | 🦆 | API, network | 100MB | Data fetching, webhooks |
| **Goat** | 🐐 | Debug, navigate | 150MB | Code review, exploration |
| **Sheep** | 🐑 | Consensus voting | 50MB | Multi-agent agreement |

#### Tier 3: Heavy (Level 20-25)
| Species | Icon | Capability | Size | Use Case |
|---------|------|------------|------|----------|
| **Cattle** | 🐄 | Heavy reasoning | 500MB | Complex analysis, decisions |
| **Horse** | 🐴 | Pipeline ETL | 200MB | Data processing |

#### Tier 4: Specialty (Level 30+)
| Species | Icon | Capability | Size | Use Case |
|---------|------|------------|------|----------|
| **Falcon** | 🦅 | Multi-node sync | 5MB | Distributed coordination |
| **Hog** | 🐷 | Hardware control | 10MB | GPIO, sensors |

> 📘 **See [Agent Species Documentation](./docs/AGENT_SPECIES.md)** for detailed trait ranges and breeding strategies.

### 2. Constraint Types

```typescript
import { Constraint } from 'constraint-ranch';

// Spatial constraints
Constraint.maxDistance(agents, 5);      // Max distance between agents
Constraint.minCoverage(area, 0.8);       // Cover 80% of area
Constraint.noOverlap(agents);            // Agents can't overlap

// Temporal constraints
Constraint.maxTime(30000);               // Solve within 30 seconds
Constraint.sequential(steps);            // Steps must be in order

// Resource constraints
Constraint.maxAgents(10);                // Use max 10 agents
Constraint.maxEnergy(100);               // Total energy budget
Constraint.speciesLimit('cattle', 2);    // Max 2 cattle

// Logic constraints
Constraint.allOrNone(conditions);        // All or nothing
Constraint.exactly(n, conditions);       // Exactly n must be true
Constraint.implication(a, b);            // If a then b
```

### 3. Puzzle Types

Constraint Ranch features **5 puzzle types** that teach different AI concepts:

| Type | Teaches | Difficulty Range |
|------|---------|------------------|
| Spatial | Exact positioning, geometric constraints | 1-5 |
| Routing | Load balancing, agent specialization | 1-5 |
| Breeding | Genetic algorithms, optimization | 2-5 |
| Coordination | Distributed systems, consensus | 3-5 |
| Advanced | Complex system design | 4-5 |

#### Spatial Puzzles

```typescript
import { SpatialPuzzle } from 'constraint-ranch/puzzles';

const spatialPuzzle = new SpatialPuzzle({
  id: 'spatial-001',
  name: 'First Herd',
  description: 'Position agents to monitor all areas',
  
  grid: { width: 10, height: 10 },
  
  agents: [
    { species: 'chicken', count: 3 },
  ],
  
  constraints: [
    Constraint.maxDistance(agents, 5),
    Constraint.allAreasCovered(),
  ],
  
  scoring: {
    basePoints: 100,
    timeBonus: true,
    eleganceBonus: true,  // Bonus for minimal movement
  },
});
```

#### Breeding Puzzles

```typescript
import { BreedingPuzzle } from 'constraint-ranch/puzzles';

const breedingPuzzle = new BreedingPuzzle({
  id: 'breeding-001',
  name: 'Perfect Specimen',
  description: 'Breed an agent with specific traits',
  
  targetTraits: {
    politeness: 0.8,
    conciseness: 0.5,
    accuracy: 0.9,
  },
  
  availableGenes: [
    { name: 'polite_tone', effect: { politeness: +0.2 } },
    { name: 'brief_response', effect: { conciseness: +0.3 } },
    { name: 'fact_check', effect: { accuracy: +0.4 } },
  ],
  
  constraints: [
    Constraint.maxGenerations(3),
    Constraint.minDiversity(0.3),  // Avoid inbreeding
  ],
});
```

#### Routing Puzzles

```typescript
import { RoutingPuzzle } from 'constraint-ranch/puzzles';

const routingPuzzle = new RoutingPuzzle({
  id: 'routing-001',
  name: 'Duck Pond',
  description: 'Route intents to correct agents',
  
  intents: [
    { type: 'email', priority: 'high', expected: 'cattle-email' },
    { type: 'api', rate: 100, expected: 'duck-high-throughput' },
    { type: 'consensus', expected: 'sheep-voting' },
  ],
  
  agents: {
    'cattle-email': { capabilities: ['email', 'triage'] },
    'duck-high-throughput': { capabilities: ['api', 'network'], rate: 100 },
    'sheep-voting': { capabilities: ['consensus', 'voting'] },
  },
  
  constraints: [
    Constraint.correctRouting(),
    Constraint.maxLatency(100),
    Constraint.balancedLoad(),
  ],
});
```

---

## Agent Development

### 1. Creating Custom Agents

```typescript
import { Agent, AgentConfig } from 'constraint-ranch';

// Define agent configuration
const myAgent: AgentConfig = {
  species: 'cattle',
  name: 'Email-Expert-v1',
  
  // Genetic traits
  genes: {
    polite_tone: 0.8,
    json_output: 0.1,
    fact_check: 0.9,
  },
  
  // Capabilities
  capabilities: ['email', 'triage', 'reasoning'],
  
  // Constraints
  constraints: {
    maxInputSize: 10000,
    maxOutputSize: 1000,
    responseTime: 5000,
  },
};

// Create agent
const agent = Agent.create(myAgent);

// Test agent
const response = await agent.process({
  type: 'email',
  content: 'Please review this invoice...',
});

console.log(response);
```

### 2. Breeding Agents

```typescript
import { Breeder } from 'constraint-ranch';

const breeder = new Breeder();

// Select parent agents
const parent1 = Agent.load('cattle-polite-v1');
const parent2 = Agent.load('cattle-accurate-v1');

// Breed offspring
const offspring = breeder.breed(parent1, parent2, {
  crossover: 'uniform',
  mutationRate: 0.1,
  constraints: {
    minFitness: 0.7,
  },
});

console.log(`Offspring fitness: ${offspring.fitness}`);
console.log(`Offspring genes: ${offspring.genes}`);
```

### 3. Night School (Evolution)

```typescript
import { NightSchool } from 'constraint-ranch';

const school = new NightSchool({
  population: 100,
  generations: 10,
  fitnessFunction: async (agent) => {
    // Evaluate agent performance
    const testResults = await runTests(agent);
    return testResults.accuracy * 0.5 + 
           testResults.speed * 0.3 + 
           testResults.efficiency * 0.2;
  },
});

// Evolve population
const bestAgents = await school.evolve();

console.log(`Best fitness: ${bestAgents[0].fitness}`);
console.log(`Best genes: ${bestAgents[0].genes}`);
```

---

## Level Progression

### Level Structure

| Levels | Title | Unlocks | XP Range |
|--------|-------|---------|----------|
| 1-4 | Ranch Hand | 🐔 Chickens, Basic spatial puzzles | 0 - 1,000 |
| 5-9 | Drover | 🦆 Ducks, Routing puzzles | 1,000 - 5,000 |
| 10-14 | Trail Boss | 🐐 Goats, Debug tools | 5,000 - 15,000 |
| 15-19 | Wrangler | 🐑 Sheep, Consensus puzzles | 15,000 - 30,000 |
| 20-24 | Rancher | 🐄 Cattle, Heavy reasoning | 30,000 - 50,000 |
| 25-29 | Overseer | 🐴 Horses, Pipeline automation | 50,000 - 80,000 |
| 30-34 | Trailblazer | 🦅 Falcons, Multi-node sync | 80,000 - 120,000 |
| 35+ | Ranch Master | All species, Night School | 120,000+ |

### Level Themes

```
Level 1-4:   "First Steps"
├── 3 chicken agents
├── Basic spatial puzzles
└── Learn: constraint basics, snapping

Level 5-9:   "Duck Pond"
├── Unlock duck agents
├── Routing puzzles
└── Learn: geometric routing, API handling

Level 10-14:  "Goat Trails"
├── Unlock goat agents
├── Debug puzzles
└── Learn: navigation, error detection

Level 15-19: "Sheep Meadow"
├── Unlock sheep agents
├── Consensus puzzles
└── Learn: distributed voting, coordination

Level 20-24: "Cattle Drive"
├── Unlock cattle agents
├── Complex reasoning puzzles
└── Learn: heavy analysis, optimization

Level 25-29: "Horse Corral"
├── Unlock horse agents
├── Pipeline puzzles
└── Learn: ETL, data flow

Level 30-34: "Falcon's Nest"
├── Unlock falcon agents
├── Multi-node puzzles
└── Learn: distributed sync

Level 35+:   "Ranch Master"
├── All species unlocked
├── Night School access
└── Learn: advanced optimization, meta-constraints
```

### Scoring System

```typescript
interface Score {
  // Base scoring
  constraintsSatisfied: number;  // Points per constraint
  timeBonus: number;            // Speed bonus
  eleganceBonus: number;        // Efficiency bonus
  
  // Multipliers
  difficultyMultiplier: number;  // Higher levels = higher multiplier
  streakMultiplier: number;      // Consecutive wins
  
  // Total
  total: number;
}

// Example scoring
const score: Score = {
  constraintsSatisfied: 300,  // 3 constraints × 100 points
  timeBonus: 50,              // Completed quickly
  eleganceBonus: 30,          // Minimal agent movement
  difficultyMultiplier: 1.5,  // Level 5
  streakMultiplier: 1.2,      // 3 wins in a row
  total: (300 + 50 + 30) * 1.5 * 1.2,  // 684 points
};
```

---

## Creating Custom Puzzles

### 1. Define Puzzle

```typescript
import { Puzzle, Constraint } from 'constraint-ranch';

const myPuzzle = new Puzzle({
  id: 'custom-001',
  name: 'My Custom Puzzle',
  description: 'A puzzle I created',
  difficulty: 'medium',
  
  // Grid/game board
  grid: {
    width: 8,
    height: 8,
    obstacles: [
      { x: 3, y: 3, type: 'wall' },
      { x: 4, y: 4, type: 'water' },
    ],
  },
  
  // Available agents
  agents: [
    { species: 'chicken', count: 2 },
    { species: 'duck', count: 1 },
  ],
  
  // Constraints to satisfy
  constraints: [
    Constraint.maxDistance(agents, 4),
    Constraint.allAreasCovered(),
    Constraint.noAgentInObstacle(),
  ],
  
  // Win condition
  winCondition: {
    constraintsSatisfied: 1.0,  // All must be satisfied
  },
  
  // Scoring
  scoring: {
    basePoints: 200,
    timeLimit: 60000,  // 1 minute
    penalties: {
      hint: -20,
      restart: -50,
    },
  },
});
```

### 2. Validate Puzzle

```typescript
// Ensure puzzle is solvable
const validation = myPuzzle.validate();

if (validation.valid) {
  console.log('Puzzle is valid!');
  console.log(`Estimated difficulty: ${validation.difficulty}`);
  console.log(`Solution hint: ${validation.hint}`);
} else {
  console.error('Puzzle is invalid:');
  validation.errors.forEach(err => console.error(`  - ${err}`));
}
```

### 3. Share Puzzle

```typescript
// Export puzzle
const puzzleJson = myPuzzle.toJSON();

// Share with others
const shareUrl = `https://constraint.ranch/puzzle/${myPuzzle.id}`;

// Or submit to community
await Puzzle.submit(myPuzzle);
```

---

## API Reference

### Game

```typescript
class Game {
  constructor(config: GameConfig);
  
  // Start game
  start(): void;
  pause(): void;
  resume(): void;
  
  // Puzzle management
  loadPuzzle(puzzleId: string): Promise<Puzzle>;
  solve(puzzle: Puzzle, solution: Solution): Promise<SolutionResult>;
  
  // Progress
  getProgress(): Progress;
  unlockLevel(level: number): void;
  
  // Events
  on(event: GameEvent, handler: EventHandler): void;
}
```

### Agent

```typescript
class Agent {
  // Creation
  static create(config: AgentConfig): Agent;
  static load(id: string): Agent;
  
  // Properties
  species: Species;
  name: string;
  genes: Record<string, number>;
  fitness: number;
  
  // Operations
  process(input: AgentInput): Promise<AgentOutput>;
  evaluate(): Promise<FitnessScore>;
  
  // Breeding
  breed(other: Agent, config?: BreedConfig): Agent;
  mutate(config?: MutationConfig): Agent;
}
```

### Puzzle

```typescript
class Puzzle {
  // Loading
  static load(id: string): Promise<Puzzle>;
  static fromJSON(json: object): Puzzle;
  
  // Properties
  id: string;
  name: string;
  difficulty: Difficulty;
  constraints: Constraint[];
  
  // Validation
  validate(): ValidationResult;
  isSolvedBy(solution: Solution): boolean;
  
  // Export
  toJSON(): object;
}
```

---

## Examples

### Run Examples

```bash
npm run example:basic-puzzle
npm run example:breeding
npm run example:routing
npm run example:multi-agent
```

### Example: Basic Puzzle

```typescript
// examples/basic-puzzle.ts
import { Game, Puzzle, Agent, Constraint } from 'constraint-ranch';

async function main() {
  // Create game
  const game = new Game({ player: 'demo' });
  
  // Load puzzle
  const puzzle = await Puzzle.load('spatial-001');
  console.log(`Puzzle: ${puzzle.name}`);
  console.log(`Constraints: ${puzzle.constraints.length}`);
  
  // Create solution
  const solution = {
    agents: [
      Agent.chicken({ position: [2, 2] }),
      Agent.chicken({ position: [7, 2] }),
      Agent.chicken({ position: [5, 7] }),
    ],
  };
  
  // Solve
  const result = await game.solve(puzzle, solution);
  
  console.log(`\nResult:`);
  console.log(`  Satisfied: ${result.satisfied}/${puzzle.constraints.length}`);
  console.log(`  Score: ${result.score}`);
  console.log(`  Time: ${result.time}ms`);
}

main();
```

---

## Resources

### Documentation

- [Game Design](./docs/GAME_DESIGN.md) - Game mechanics and progression
- [Puzzle Format](./docs/PUZZLE_FORMAT.md) - Puzzle definitions and constraints
- [Agent Species](./docs/AGENT_SPECIES.md) - Species details and traits
- [Architecture](./docs/ARCHITECTURE.md) - Technical implementation

### Ecosystem

- [constraint-theory-core](https://github.com/SuperInstance/constraint-theory-core) - Exact arithmetic foundation (Rust/WASM)
- [constraint-flow](https://github.com/SuperInstance/constraint-flow) - Business automation workflows
- [pasture-ai](https://github.com/SuperInstance/pasture-ai) - Production agent deployment

---

## License

MIT License - See [LICENSE](./LICENSE) for details.

---

## Next Steps

1. ✅ Install and start the dev server
2. ✅ Complete Level 1 in the browser
3. 🎮 Try the puzzle examples
4. 🧩 Create your first puzzle!

**Welcome to the Ranch!** 🌾🐄
