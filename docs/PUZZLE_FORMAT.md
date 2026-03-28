# Puzzle Format Specification

This document defines the standard format for all puzzles in Constraint Ranch.

> **Related:** See [ARCHITECTURE.md](./ARCHITECTURE.md) for technical implementation details, and [GAME_DESIGN.md](./GAME_DESIGN.md) for game mechanics.

---

## Base Puzzle Interface

All puzzles extend the base `BasePuzzle` interface:

```typescript
interface BasePuzzle {
  id: string;              // Unique identifier (e.g., 'spatial-001')
  name: string;            // Display name
  type: PuzzleType;        // 'spatial' | 'routing' | 'breeding' | 'coordination' | 'advanced'
  difficulty: number;      // 1-5 scale
  description: string;     // Player-facing description
  constraints: Constraint[];  // Rules that must be satisfied
  hints: Hint[];           // Progressive hint system
  rewards: PuzzleRewards;  // XP and unlocks
}
```

---

## Common Types

### Constraint

```typescript
interface Constraint {
  type: string;           // Constraint type identifier
  value: number | string | boolean;  // Constraint value
  unit?: string;          // Optional unit (e.g., 'units', 'percentage', 'ms')
  trait?: string;         // For trait-specific constraints
  tolerance?: number;     // Acceptable deviation from value
}
```

**Example Constraints:**
```typescript
{ type: 'max-distance', value: 100, unit: 'units' }
{ type: 'min-coverage', value: 0.95, unit: 'percentage' }
{ type: 'trait-threshold', value: 0.8, trait: 'polite' }
{ type: 'on-perimeter', value: true }
```

### Hint

```typescript
interface Hint {
  level: number;   // 1-3, progressively more revealing
  text: string;    // Hint content
}
```

### PuzzleRewards

```typescript
interface PuzzleRewards {
  experience: number;       // Base XP awarded
  unlocks?: string[];       // IDs of unlocked content
  achievements?: string[];  // Achievement IDs to grant
}
```

---

## Spatial Puzzles

Position agents optimally using exact geometric coordinates.

```typescript
interface SpatialPuzzle extends BasePuzzle {
  type: 'spatial';
  
  initialState: {
    mapSize: MapSize;       // Width and height of the map
    zones: Zone[];          // Monitoring zones to cover
    obstacles?: Position[]; // Optional obstacles
  };
  
  goalState: Constraint[];  // Conditions for completion
  timeLimit?: number;       // Optional time limit in seconds
}

interface MapSize {
  width: number;
  height: number;
}

interface Zone {
  id: string;
  x: number;
  y: number;
  radius: number;
}

interface Position {
  x: number;
  y: number;
}
```

**Spatial Constraint Types:**
| Type | Description | Example |
|------|-------------|---------|
| `max-distance` | Maximum distance between any two agents | `{ value: 100 }` |
| `min-coverage` | Minimum zone coverage percentage | `{ value: 0.95 }` |
| `agent-count` | Required number of agents | `{ value: 3 }` |
| `on-perimeter` | Agents must be on zone perimeter | `{ value: true }` |
| `even-spacing` | Agents must be evenly spaced | `{ value: true }` |
| `equilateral` | Form equilateral triangle | `{ value: true }` |
| `hexagonal-pattern` | Form hexagonal grid | `{ value: true }` |

---

## Routing Puzzles

Route tasks to correct agents using constraint satisfaction.

```typescript
interface RoutingPuzzle extends BasePuzzle {
  type: 'routing';
  
  initialState: {
    taskTypes: Array<{
      type: string;        // Task category
      rate: number;        // Tasks per minute
    }>;
    availableAgents: Array<{
      species: string;     // Agent species ID
      capacity: number;    // Max tasks per minute
    }>;
  };
  
  goalState: Constraint[];
}
```

**Routing Constraint Types:**
| Type | Description | Example |
|------|-------------|---------|
| `max-capacity` | Max utilization per agent | `{ value: 0.8, unit: 'percentage' }` |
| `all-tasks-routed` | All tasks must be assigned | `{ value: true }` |
| `optimal-routing` | Most efficient distribution | `{ value: true }` |
| `max-latency` | Maximum response latency | `{ value: 100, unit: 'ms' }` |
| `min-efficiency` | Minimum routing efficiency | `{ value: 0.85 }` |
| `max-cost` | Maximum operational cost | `{ value: 100, unit: 'credits/hour' }` |
| `region-affinity` | Route to nearest region | `{ value: true }` |
| `failover-ready` | Maintain backup capacity | `{ value: true }` |

---

## Breeding Puzzles

Create agents with specific trait combinations through genetic selection.

```typescript
interface BreedingPuzzle extends BasePuzzle {
  type: 'breeding';
  
  initialState: {
    parentA: Trait[];      // First parent's traits
    parentB: Trait[];      // Second parent's traits
    genePool: string[];    // Available gene types
  };
  
  goalState: {
    targetTraits: Trait[]; // Required offspring traits
  };
}

interface Trait {
  name: string;   // Trait identifier
  value: number;  // Trait value (0.0 - 1.0)
}
```

**Breeding Constraint Types:**
| Type | Description | Example |
|------|-------------|---------|
| `trait-threshold` | Minimum trait value | `{ value: 0.8, trait: 'polite' }` |
| `trait-match` | Trait within tolerance | `{ trait: 'polite', tolerance: 0.05 }` |
| `species` | Required species | `{ value: 'chicken' }` |
| `generations` | Max breeding generations | `{ value: 2 }` |
| `trait-expression` | Gene expression type | `{ trait: 'fast-response', expression: 'recessive' }` |
| `trait-exceeds-parents` | Trait must exceed both parents | `{ trait: 'accuracy' }` |

---

## Coordination Puzzles

Coordinate multiple agents to complete tasks together.

```typescript
interface CoordinationPuzzle extends BasePuzzle {
  type: 'coordination';
  
  initialState: {
    agents: Array<{
      id: string;
      species: string;
      position: Position;
    }>;
    tasks: Array<{
      id: string;
      requiredAgents: number;  // How many agents needed
      location: Position;
    }>;
  };
  
  goalState: Constraint[];
}
```

**Coordination Constraint Types:**
| Type | Description | Example |
|------|-------------|---------|
| `all-tasks-complete` | All tasks finished | `{ value: true }` |
| `max-time` | Maximum completion time | `{ value: 60, unit: 'seconds' }` |
| `min-efficiency` | Minimum coordination efficiency | `{ value: 0.9 }` |
| `no-collision` | Agents cannot collide | `{ value: true }` |
| `sync-required` | Agents must act synchronously | `{ value: true }` |
| `leader-designated` | One agent must lead | `{ value: true }` |

---

## Advanced Puzzles

Complex puzzles combining multiple mechanics.

```typescript
interface AdvancedPuzzle extends BasePuzzle {
  type: 'advanced';
  
  subPuzzles: Array<{
    type: PuzzleType;
    puzzle: ConstraintPuzzle;
    dependencies?: string[];  // IDs of prerequisite sub-puzzles
  }>;
  
  initialState: {
    agents: GameAgent[];
    resources: Record<string, number>;
    globalConstraints: Constraint[];
  };
  
  goalState: Constraint[];
}
```

**Advanced Constraint Types:**
| Type | Description | Example |
|------|-------------|---------|
| `complete-all-subpuzzles` | All sub-puzzles solved | `{ value: true }` |
| `resource-limit` | Maximum resource usage | `{ value: 500, resource: 'energy' }` |
| `time-limit` | Overall time limit | `{ value: 300, unit: 'seconds' }` |
| `min-score` | Minimum combined score | `{ value: 1000 }` |
| `perfect-chain` | All sub-puzzles perfect | `{ value: true }` |

---

## Puzzle ID Convention

Puzzle IDs follow a structured format:

```
{type}-{number}

Examples:
- spatial-001, spatial-002, ...
- routing-001, routing-002, ...
- breeding-001, breeding-002, ...
- coordination-001, coordination-002, ...
- advanced-001, advanced-002, ...
```

---

## Difficulty Guidelines

| Level | Description | Target Time | XP Range |
|-------|-------------|-------------|----------|
| 1 | Tutorial | 1-2 min | 100-150 |
| 2 | Beginner | 2-5 min | 150-200 |
| 3 | Intermediate | 5-10 min | 200-300 |
| 4 | Advanced | 10-20 min | 300-400 |
| 5 | Expert | 20+ min | 400-500 |

---

## Validation Rules

### Required Fields
All puzzles must have:
- Unique `id`
- Non-empty `name`
- Valid `type`
- `difficulty` between 1-5
- Non-empty `description`
- At least one `constraint`
- At least one `hint`
- Positive `experience` reward

### State Validation
- `initialState` must be valid for puzzle type
- `goalState` constraints must be achievable
- No conflicting constraints

### Balance Validation
- XP should scale with difficulty
- Hints should be progressively revealing
- Rewards should feel proportional to effort

---

## Example: Complete Spatial Puzzle

```typescript
export const exampleSpatialPuzzle: SpatialPuzzle = {
  id: 'spatial-001',
  name: 'Coverage Optimization',
  type: 'spatial',
  difficulty: 1,
  description: 'Position 3 Chicken agents to cover 95% of the monitoring zone.',
  
  constraints: [
    { type: 'max-distance', value: 150, unit: 'units' },
    { type: 'min-coverage', value: 0.95, unit: 'percentage' },
    { type: 'agent-count', value: 3, unit: 'agents' }
  ],
  
  initialState: {
    mapSize: { width: 500, height: 500 },
    zones: [
      { id: 'zone-a', x: 100, y: 100, radius: 100 },
      { id: 'zone-b', x: 250, y: 300, radius: 120 },
      { id: 'zone-c', x: 400, y: 150, radius: 80 }
    ]
  },
  
  goalState: [
    { type: 'coverage', value: 0.95, unit: 'percentage' }
  ],
  
  hints: [
    { level: 1, text: 'Position agents at zone intersections for maximum coverage' },
    { level: 2, text: 'Use Dodecet coordinates for exact placement' },
    { level: 3, text: 'Place agents at the center of each zone' }
  ],
  
  rewards: {
    experience: 100,
    unlocks: ['spatial-002'],
    achievements: ['first-puzzle']
  }
};
```

---

## File Structure

```
puzzles/
├── types.ts              # Type definitions
├── index.ts              # Main exports
├── spatial/
│   └── index.ts          # Spatial puzzles
├── routing/
│   └── index.ts          # Routing puzzles
├── breeding/
│   └── index.ts          # Breeding puzzles
├── coordination/
│   └── index.ts          # Coordination puzzles
└── advanced/
    └── index.ts          # Advanced puzzles
```

---

## Extending the Format

To add a new puzzle type:

1. Define the interface in `types.ts`
2. Add type to `PuzzleType` union
3. Create puzzle files in appropriate directory
4. Update `index.ts` exports
5. Add validation rules to game engine

---

*This specification ensures consistency across all Constraint Ranch puzzles.*
