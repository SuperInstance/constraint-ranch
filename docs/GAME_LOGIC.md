# Constraint Ranch - Game Logic Specification

This document provides detailed specifications for game logic, constraint validation, progression systems, and achievements.

> **Related:** [SCHEMA.md](./SCHEMA.md) | [PUZZLE_FORMAT.md](./PUZZLE_FORMAT.md) | [GAME_DESIGN.md](./GAME_DESIGN.md)

---

## Table of Contents

1. [Constraint Type Validation](#constraint-type-validation)
2. [Breeding Formulas](#breeding-formulas)
3. [Level Progression System](#level-progression-system)
4. [Achievement Schema](#achievement-schema)

---

## Constraint Type Validation

### Spatial Constraints

| Constraint Type | Value Type | Validation Rule |
|----------------|------------|-----------------|
| `max-distance` | number | `max(agentDistances) <= value` |
| `min-coverage` | number (0-1) | `coveredArea / totalArea >= value` |
| `agent-count` | integer | `agents.length === value` |
| `on-perimeter` | boolean | All agents must be at `distance(center, agent) ≈ radius` (within tolerance) |
| `even-spacing` | boolean | `stdDev(angularDistances) < tolerance` |
| `equilateral` | boolean | All sides equal: `side1 ≈ side2 ≈ side3` (within tolerance) |
| `hexagonal-pattern` | boolean | Agents form hexagonal grid with `neighborDistance` |
| `side-length` | number | Triangle sides equal `value` |
| `neighbor-distance` | number | Adjacent agents at exactly `value` distance |
| `max-overlap` | number (0-1) | `overlapArea / totalArea <= value` |
| `all-zones-covered` | boolean | Every zone has at least one agent within `radius` |

### Routing Constraints

| Constraint Type | Value Type | Validation Rule |
|----------------|------------|-----------------|
| `max-capacity` | number (0-1) | `tasksAssigned / agentCapacity <= value` for all agents |
| `all-tasks-routed` | boolean | `sum(routedTasks) === totalTasks` |
| `optimal-routing` | boolean | Total cost minimized (NP-hard verification, uses threshold) |
| `max-latency` | number (ms) | `responseTime <= value` for all routes |
| `min-efficiency` | number (0-1) | `effectiveWork / totalWork >= value` |
| `max-cost` | number | `totalOperatingCost <= value` |
| `region-affinity` | boolean | Tasks routed to nearest regional agent |
| `failover-ready` | boolean | Each agent has backup capacity >= 20% |
| `min-throughput` | number | `tasksPerMinute >= value` |
| `urgent-priority` | boolean | Urgent tasks processed before standard |

### Breeding Constraints

| Constraint Type | Value Type | Validation Rule |
|----------------|------------|-----------------|
| `trait-threshold` | number (0-1) | `offspringTrait[trait] >= value` |
| `trait-match` | number (0-1) | `abs(offspringTrait[trait] - target) <= tolerance` |
| `species` | string | `offspring.species === value` |
| `generations` | integer | `offspring.generation <= value` |
| `trait-expression` | string | Gene expresses as specified (`dominant`/`recessive`) |
| `trait-exceeds-parents` | boolean | `offspringTrait > max(parentA, parentB)` |
| `min-training-time` | number (hours) | Night School training >= value hours |

### Coordination Constraints

| Constraint Type | Value Type | Validation Rule |
|----------------|------------|-----------------|
| `all-tasks-complete` | boolean | All tasks marked complete |
| `max-time` | number (seconds) | `totalTime <= value` |
| `min-efficiency` | number (0-1) | `(workTime / totalTime) >= value` |
| `no-collision` | boolean | No two agents occupy same position at same time |
| `sync-required` | boolean | All agents start within tolerance of same timestamp |
| `leader-designated` | boolean | Exactly one agent has `role === 'leader'` |
| `quorum-reached` | integer | `agreements >= value` |
| `log-replicated` | boolean | Log entries copied to majority of nodes |
| `no-resource-conflict` | boolean | No concurrent access to same resource |

### Advanced Constraints

| Constraint Type | Value Type | Validation Rule |
|----------------|------------|-----------------|
| `complete-all-subpuzzles` | boolean | All sub-puzzles solved |
| `resource-limit` | number | `resourceUsed[resource] <= value` |
| `time-limit` | number (seconds) | `totalTime <= value` |
| `min-score` | number | `totalScore >= value` |
| `perfect-chain` | boolean | All sub-puzzles achieved perfect score |
| `trait-matches-task` | boolean | Agent traits match task requirements |
| `min-throughput` | number | Combined throughput >= value |

---

## Breeding Formulas

### Inheritance Model

The breeding system uses three gene expression types:

#### 1. Additive Inheritance (Default)

```typescript
/**
 * Weighted average of parent traits.
 * Used for most traits: speed, accuracy, endurance, etc.
 */
function additiveInheritance(
  parentAValue: number,
  parentBValue: number,
  weight: number // 0.0 to 1.0, bias toward parent A
): number {
  return (weight * parentAValue) + ((1 - weight) * parentBValue);
}

// Examples:
// 50/50 split: (0.5 * 0.9) + (0.5 * 0.6) = 0.75
// 70% A bias:  (0.7 * 0.9) + (0.3 * 0.6) = 0.81
```

#### 2. Dominant Inheritance

```typescript
/**
 * Takes value from the parent with dominant gene.
 * Used for: fast-response, certain special traits.
 */
function dominantInheritance(
  parentAValue: number,
  parentBValue: number,
  parentAHasDominant: boolean
): number {
  return parentAHasDominant ? parentAValue : parentBValue;
}

// Probability: 75% dominant, 25% recessive expression
// if both parents are heterozygous (Aa)
```

#### 3. Recessive Inheritance

```typescript
/**
 * Only expresses when both parents contribute recessive allele.
 * Used for: rare abilities, special traits.
 */
function recessiveInheritance(
  parentAValue: number,
  parentBValue: number,
  bothParentsCarryRecessive: boolean
): number | null {
  if (!bothParentsCarryRecessive) {
    return null; // Trait doesn't express
  }
  return Math.max(parentAValue, parentBValue);
}

// Probability: 25% if both parents are heterozygous (Aa)
```

### Mutation System

```typescript
/**
 * Random trait variation during breeding.
 * 10% chance per trait, ±0.05 to ±0.15 deviation.
 */
function applyMutation(baseValue: number): { value: number; mutated: boolean } {
  const MUTATION_CHANCE = 0.10;
  
  if (Math.random() > MUTATION_CHANCE) {
    return { value: baseValue, mutated: false };
  }
  
  // Random delta between ±0.05 and ±0.15
  const magnitude = 0.05 + (Math.random() * 0.10);
  const direction = Math.random() > 0.5 ? 1 : -1;
  const delta = magnitude * direction;
  
  // Clamp to valid range
  const mutatedValue = Math.max(0, Math.min(1, baseValue + delta));
  
  return { value: mutatedValue, mutated: true };
}
```

### Night School Training

```typescript
/**
 * Train traits beyond genetic limits.
 * Maximum improvement: +0.15 at 12 hours.
 */
interface NightSchoolResult {
  trait: string;
  baseValue: number;
  trainedValue: number;
  improvement: number;
  trainingHours: number;
  cost: number;
}

function nightSchoolTrain(
  trait: string,
  baseValue: number,
  targetValue: number,
  maxHours: number = 12
): NightSchoolResult {
  // Maximum possible improvement
  const maxImprovement = maxHours * 0.0125; // 0.15 at 12 hours
  
  // Calculate actual improvement needed
  const neededImprovement = Math.min(targetValue - baseValue, maxImprovement);
  
  // Training hours required (4 hour minimum)
  const hoursNeeded = Math.max(4, Math.ceil(neededImprovement / 0.0125));
  
  // Cost calculation: base + improvement + time
  const cost = Math.round(
    100 +                    // Base cost
    (neededImprovement * 1000) + // Improvement premium
    (hoursNeeded * 20)       // Time cost
  );
  
  return {
    trait,
    baseValue,
    trainedValue: Math.min(1, baseValue + neededImprovement),
    improvement: neededImprovement,
    trainingHours: hoursNeeded,
    cost
  };
}

// Example:
// Base intelligence: 0.85
// Target: 0.95 (need +0.10)
// Hours: 8 (8 * 0.0125 = 0.10)
// Cost: 100 + (0.10 * 1000) + (8 * 20) = 360 credits
```

### Hybrid Breeding

```typescript
/**
 * Cross-species breeding produces hybrids.
 * Hybrids inherit averaged traits and combined specialties.
 */
interface HybridResult {
  species: 'hybrid';
  parentSpecies: [string, string];
  size: number; // Average of parents (in MB)
  specialties: string[];
  traitRanges: Record<string, { min: number; max: number }>;
}

function calculateHybrid(parentA: Species, parentB: Species): HybridResult {
  // Size is average of parents
  const size = (parseSize(parentA.size) + parseSize(parentB.size)) / 2;
  
  // Combine specialties
  const specialties = [parentA.specialty, parentB.specialty];
  
  // Trait ranges expand for hybrids
  const traitRanges: Record<string, { min: number; max: number }> = {};
  
  const allTraits = new Set([
    ...Object.keys(parentA.traits),
    ...Object.keys(parentB.traits)
  ]);
  
  for (const trait of allTraits) {
    const rangeA = parentA.traits[trait] || { min: 0.5, max: 0.5 };
    const rangeB = parentB.traits[trait] || { min: 0.5, max: 0.5 };
    
    traitRanges[trait] = {
      min: Math.min(rangeA.min, rangeB.min),
      max: Math.max(rangeA.max, rangeB.max)
    };
  }
  
  return { species: 'hybrid', parentSpecies: [parentA.id, parentB.id], size, specialties, traitRanges };
}
```

### Compatible Breeding Pairs

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     BREEDING COMPATIBILITY MATRIX                        │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  Tier 1 → Tier 2 (Must breed within tier or adjacent)                   │
│  ┌─────────────┬─────────────┬─────────────┬─────────────┐              │
│  │             │ Duck        │ Goat        │ Sheep       │              │
│  ├─────────────┼─────────────┼─────────────┼─────────────┤              │
│  │ Chicken     │ ✓ Network   │ ✓ Debug     │ ✓ Alert     │              │
│  │             │   Monitor   │   Monitor   │   Consensus │              │
│  └─────────────┴─────────────┴─────────────┴─────────────┘              │
│                                                                          │
│  Tier 2 → Tier 3                                                         │
│  ┌─────────────┬─────────────┬─────────────┐                            │
│  │             │ Cattle      │ Horse       │                            │
│  ├─────────────┼─────────────┼─────────────┤                            │
│  │ Duck        │ ✓ Heavy API │ ✓ Streaming │                            │
│  │ Goat        │ ✓ Debug     │ ✓ Pipeline  │                            │
│  │ Sheep       │ ✓ Consensus │ ✓ Pipeline  │                            │
│  └─────────────┴─────────────┴─────────────┘                            │
│                                                                          │
│  Tier 3 → Tier 4                                                         │
│  ┌─────────────┬─────────────┬─────────────┐                            │
│  │             │ Falcon      │ Hog         │                            │
│  ├─────────────┼─────────────┼─────────────┤                            │
│  │ Cattle      │ ✓ Distributed│ ✓ Hardware │                            │
│  │             │   Reasoning │   Analysis  │                            │
│  │ Horse       │ ✓ Multi-    │ ✓ Pipeline  │                            │
│  │             │   region    │   GPIO      │                            │
│  └─────────────┴─────────────┴─────────────┘                            │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Level Progression System

### XP Requirements

```typescript
/**
 * XP required to reach each level.
 * Uses exponential curve: base * (level ^ 1.5)
 */
const XP_PER_LEVEL: Record<number, number> = {
  1: 0,        // Starting level
  2: 100,
  3: 283,
  4: 520,
  5: 812,      // Unlock Ducks
  6: 1155,
  7: 1549,
  8: 1993,
  9: 2486,
  10: 3027,    // Unlock Goats
  11: 3617,
  12: 4255,
  13: 4941,
  14: 5674,
  15: 6455,    // Unlock Sheep
  16: 7283,
  17: 8158,
  18: 9080,
  19: 10048,
  20: 10964,   // Unlock Cattle
  21: 11925,
  22: 12932,
  23: 13985,
  24: 15084,
  25: 16228,   // Unlock Horses
  26: 17418,
  27: 18652,
  28: 19932,
  29: 21257,
  30: 22527,   // Unlock Falcons
  31: 23841,
  32: 25200,
  33: 26604,
  34: 28052,
  35: 29544,   // Unlock Hogs, Night School
  36: 31080,
  37: 32660,
  38: 34284,
  39: 35952,
  40: 37663,
};

function getTotalXPForLevel(level: number): number {
  let total = 0;
  for (let l = 2; l <= level; l++) {
    total += XP_PER_LEVEL[l] || Math.floor(100 * Math.pow(l, 1.5));
  }
  return total;
}
```

### Player Titles

| Level Range | Title | Description |
|-------------|-------|-------------|
| 1-4 | Ranch Hand | Learning the basics |
| 5-9 | Drover | Managing multiple agent types |
| 10-14 | Trail Boss | Debug tools and optimization |
| 15-19 | Wrangler | Consensus and coordination |
| 20-24 | Rancher | Heavy reasoning agents |
| 25-29 | Overseer | Pipeline automation |
| 30-34 | Trailblazer | Multi-node synchronization |
| 35-39 | Ranch Master | Full ecosystem mastery |
| 40+ | Constraint Sage | Legendary status |

### Content Unlocks

```typescript
interface LevelUnlock {
  level: number;
  type: 'species' | 'puzzle' | 'feature' | 'cosmetic';
  id: string;
  name: string;
  description: string;
}

const LEVEL_UNLOCKS: LevelUnlock[] = [
  // Level 1 - Tutorial
  { level: 1, type: 'species', id: 'chicken', name: 'Chicken', description: 'Monitoring & Alerts agent' },
  { level: 1, type: 'puzzle', id: 'spatial', name: 'Spatial Puzzles', description: 'Position agents optimally' },
  
  // Level 5 - Network Tier
  { level: 5, type: 'species', id: 'duck', name: 'Duck', description: 'API & Network specialist' },
  { level: 5, type: 'puzzle', id: 'routing', name: 'Routing Puzzles', description: 'Task distribution challenges' },
  
  // Level 10 - Debug Tier
  { level: 10, type: 'species', id: 'goat', name: 'Goat', description: 'Debug & Navigation expert' },
  { level: 10, type: 'feature', id: 'debug-tools', name: 'Debug Tools', description: 'Advanced debugging features' },
  
  // Level 15 - Consensus Tier
  { level: 15, type: 'species', id: 'sheep', name: 'Sheep', description: 'Consensus & Voting coordinator' },
  { level: 15, type: 'puzzle', id: 'coordination', name: 'Coordination Puzzles', description: 'Multi-agent synchronization' },
  
  // Level 20 - Heavy Tier
  { level: 20, type: 'species', id: 'cattle', name: 'Cattle', description: 'Heavy Reasoning processor' },
  { level: 20, type: 'feature', id: 'deep-analysis', name: 'Deep Analysis', description: 'Complex reasoning tasks' },
  
  // Level 25 - Pipeline Tier
  { level: 25, type: 'species', id: 'horse', name: 'Horse', description: 'Pipeline ETL runner' },
  { level: 25, type: 'puzzle', id: 'advanced', name: 'Advanced Puzzles', description: 'Combined mechanics challenges' },
  
  // Level 30 - Multi-node Tier
  { level: 30, type: 'species', id: 'falcon', name: 'Falcon', description: 'Multi-node Synchronizer' },
  { level: 30, type: 'feature', id: 'multi-region', name: 'Multi-Region', description: 'Cross-region coordination' },
  
  // Level 35 - Hardware Tier
  { level: 35, type: 'species', id: 'hog', name: 'Hog', description: 'Hardware GPIO interface' },
  { level: 35, type: 'feature', id: 'night-school', name: 'Night School', description: 'Train traits beyond genetic limits' },
  { level: 35, type: 'puzzle', id: 'breeding', name: 'Breeding Puzzles', description: 'Trait inheritance challenges' },
];
```

### Puzzle Difficulty by Level

| Player Level | Available Difficulties | XP Multiplier |
|--------------|------------------------|---------------|
| 1-4 | 1 only | ×1.0 |
| 5-9 | 1-2 | ×1.0 |
| 10-14 | 1-3 | ×1.0 |
| 15-19 | 1-4 | ×1.0 |
| 20-24 | 1-5 | ×1.0 |
| 25+ | All | ×1.1 (bonus for high-level puzzles) |

---

## Achievement Schema

### Achievement Definition

```typescript
interface Achievement {
  id: string;
  name: string;
  description: string;
  category: AchievementCategory;
  tier: AchievementTier;
  icon: string;
  hidden: boolean;
  requirements: AchievementRequirement[];
  rewards: AchievementReward;
  progress?: ProgressTracker;
}

type AchievementCategory = 
  | 'puzzle' 
  | 'breeding' 
  | 'coordination' 
  | 'progression' 
  | 'social' 
  | 'special';

type AchievementTier = 'bronze' | 'silver' | 'gold' | 'platinum';

interface AchievementRequirement {
  type: 'puzzle-complete' | 'puzzle-perfect' | 'breed-agents' | 'reach-level' | 'streak' | 'count';
  target: string | number;
  count?: number;
}

interface AchievementReward {
  experience: number;
  credits: number;
  unlocks?: string[];
  cosmetics?: string[];
}

interface ProgressTracker {
  current: number;
  target: number;
  unit: string;
}
```

### Complete Achievement List

```json
{
  "achievements": [
    {
      "id": "first-puzzle",
      "name": "First Steps",
      "description": "Complete your first puzzle",
      "category": "puzzle",
      "tier": "bronze",
      "icon": "🧩",
      "hidden": false,
      "requirements": [
        { "type": "puzzle-complete", "target": "any", "count": 1 }
      ],
      "rewards": {
        "experience": 50,
        "credits": 25
      }
    },
    {
      "id": "spatial-master",
      "name": "Spatial Master",
      "description": "Complete all spatial puzzles",
      "category": "puzzle",
      "tier": "silver",
      "icon": "📐",
      "hidden": false,
      "requirements": [
        { "type": "puzzle-complete", "target": "spatial", "count": 5 }
      ],
      "rewards": {
        "experience": 200,
        "credits": 100,
        "unlocks": ["cosmetic-spatial-badge"]
      }
    },
    {
      "id": "routing-master",
      "name": "Traffic Controller",
      "description": "Complete all routing puzzles",
      "category": "puzzle",
      "tier": "silver",
      "icon": "🔀",
      "hidden": false,
      "requirements": [
        { "type": "puzzle-complete", "target": "routing", "count": 5 }
      ],
      "rewards": {
        "experience": 250,
        "credits": 125,
        "unlocks": ["cosmetic-router-hat"]
      }
    },
    {
      "id": "master-breeder",
      "name": "Master Breeder",
      "description": "Complete all breeding puzzles",
      "category": "breeding",
      "tier": "gold",
      "icon": "🧬",
      "hidden": false,
      "requirements": [
        { "type": "puzzle-complete", "target": "breeding", "count": 5 }
      ],
      "rewards": {
        "experience": 400,
        "credits": 200,
        "unlocks": ["cosmetic-lab-coat"]
      }
    },
    {
      "id": "coordination-master",
      "name": "Team Leader",
      "description": "Complete all coordination puzzles",
      "category": "coordination",
      "tier": "gold",
      "icon": "🤝",
      "hidden": false,
      "requirements": [
        { "type": "puzzle-complete", "target": "coordination", "count": 5 }
      ],
      "rewards": {
        "experience": 400,
        "credits": 200,
        "unlocks": ["cosmetic-leader-badge"]
      }
    },
    {
      "id": "ecosystem-manager",
      "name": "Ecosystem Manager",
      "description": "Complete the Full Ecosystem Simulation",
      "category": "puzzle",
      "tier": "platinum",
      "icon": "🏔️",
      "hidden": false,
      "requirements": [
        { "type": "puzzle-complete", "target": "advanced-004", "count": 1 }
      ],
      "rewards": {
        "experience": 500,
        "credits": 300,
        "unlocks": ["cosmetic-ranch-gold"]
      }
    },
    {
      "id": "night-school-master",
      "name": "Night School Graduate",
      "description": "Train an agent to exceed genetic limits",
      "category": "breeding",
      "tier": "gold",
      "icon": "🌙",
      "hidden": false,
      "requirements": [
        { "type": "breed-agents", "target": "night-school-trained", "count": 1 }
      ],
      "rewards": {
        "experience": 300,
        "credits": 150
      }
    },
    {
      "id": "impossible-coordinator",
      "name": "Impossible Coordinator",
      "description": "Complete the Night School Master Challenge",
      "category": "puzzle",
      "tier": "platinum",
      "icon": "⭐",
      "hidden": false,
      "requirements": [
        { "type": "puzzle-complete", "target": "advanced-005", "count": 1 }
      ],
      "rewards": {
        "experience": 800,
        "credits": 500,
        "unlocks": ["cosmetic-master-cape"]
      }
    },
    {
      "id": "constraint-ranch-legend",
      "name": "Constraint Ranch Legend",
      "description": "Complete all puzzles with perfect scores",
      "category": "special",
      "tier": "platinum",
      "icon": "👑",
      "hidden": true,
      "requirements": [
        { "type": "puzzle-perfect", "target": "all", "count": 25 }
      ],
      "rewards": {
        "experience": 1000,
        "credits": 1000,
        "unlocks": ["cosmetic-legend-aura", "title-legend"]
      }
    },
    {
      "id": "streak-week",
      "name": "Dedicated Rancher",
      "description": "Play 7 days in a row",
      "category": "progression",
      "tier": "bronze",
      "icon": "📅",
      "hidden": false,
      "requirements": [
        { "type": "streak", "target": "daily", "count": 7 }
      ],
      "rewards": {
        "experience": 100,
        "credits": 50
      }
    },
    {
      "id": "streak-month",
      "name": "Loyal Rancher",
      "description": "Play 30 days in a row",
      "category": "progression",
      "tier": "silver",
      "icon": "🗓️",
      "hidden": false,
      "requirements": [
        { "type": "streak", "target": "daily", "count": 30 }
      ],
      "rewards": {
        "experience": 300,
        "credits": 150
      }
    },
    {
      "id": "level-20",
      "name": "Rancher",
      "description": "Reach level 20",
      "category": "progression",
      "tier": "silver",
      "icon": "⬆️",
      "hidden": false,
      "requirements": [
        { "type": "reach-level", "target": 20 }
      ],
      "rewards": {
        "experience": 0,
        "credits": 200
      }
    },
    {
      "id": "level-35",
      "name": "Ranch Master",
      "description": "Reach level 35",
      "category": "progression",
      "tier": "gold",
      "icon": "🏆",
      "hidden": false,
      "requirements": [
        { "type": "reach-level", "target": 35 }
      ],
      "rewards": {
        "experience": 0,
        "credits": 500,
        "unlocks": ["title-ranch-master"]
      }
    },
    {
      "id": "breeder-10",
      "name": "Hobby Breeder",
      "description": "Breed 10 agents",
      "category": "breeding",
      "tier": "bronze",
      "icon": "🐣",
      "hidden": false,
      "requirements": [
        { "type": "breed-agents", "target": "any", "count": 10 }
      ],
      "rewards": {
        "experience": 75,
        "credits": 40
      }
    },
    {
      "id": "breeder-100",
      "name": "Professional Breeder",
      "description": "Breed 100 agents",
      "category": "breeding",
      "tier": "gold",
      "icon": "🥚",
      "hidden": false,
      "requirements": [
        { "type": "breed-agents", "target": "any", "count": 100 }
      ],
      "rewards": {
        "experience": 400,
        "credits": 250,
        "unlocks": ["cosmetic-golden-egg"]
      }
    }
  ]
}
```

### Achievement Tier XP Values

| Tier | XP Reward Range | Visual |
|------|-----------------|--------|
| Bronze | 50-100 | 🥉 |
| Silver | 150-300 | 🥈 |
| Gold | 300-500 | 🥇 |
| Platinum | 500-1000 | 💎 |

---

## Workflow Patterns from constraint-flow

Constraint Ranch puzzles teach workflow patterns that directly apply to [constraint-flow](https://github.com/SuperInstance/constraint-flow) automation.

### Pattern Mapping: Game to Production

```
┌─────────────────────────────────────────────────────────────────────────┐
│                GAME PUZZLES → PRODUCTION WORKFLOWS                       │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  Spatial Puzzles              constraint-flow Application                │
│  ├── Agent positioning    →   Service deployment locations              │
│  ├── Coverage optimization →  Monitoring coverage                       │
│  └── Geometric constraints →  Infrastructure layout                      │
│                                                                          │
│  Routing Puzzles             constraint-flow Application                 │
│  ├── Task distribution    →   Intent routing to agents                  │
│  ├── Load balancing       →   Request distribution                      │
│  └── Priority handling    →   SLA-based prioritization                  │
│                                                                          │
│  Breeding Puzzles            constraint-flow Application                 │
│  ├── Trait inheritance    →   Agent capability inheritance              │
│  ├── Optimization         →   Performance tuning                        │
│  └── Night School         →   Fine-tuning and training                  │
│                                                                          │
│  Coordination Puzzles        constraint-flow Application                 │
│  ├── Multi-agent sync     →   Distributed consensus                     │
│  ├── Leader election      →   Primary selection                         │
│  └── Resource sharing     →   Shared state management                   │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### Workflow Pattern Examples

#### 1. Routing Pattern → Intent Distribution

**In-Game (Routing Puzzle):**
```typescript
// Game routing puzzle
const routingPuzzle = {
  type: 'routing',
  intents: [
    { type: 'email', rate: 100 },
    { type: 'api', rate: 500 },
    { type: 'alert', rate: 50 }
  ],
  agents: [
    { species: 'duck', capacity: 400, specialties: ['api'] },
    { species: 'cattle', capacity: 100, specialties: ['email'] },
    { species: 'chicken', capacity: 50, specialties: ['alert'] }
  ],
  constraints: [
    { type: 'max-capacity', value: 0.8 },
    { type: 'all-tasks-routed', value: true }
  ]
};
```

**Production Equivalent (constraint-flow):**
```yaml
# constraint-flow/workflows/intent-routing.yaml
name: intent-routing
description: Route intents to specialized agents (learned in Routing Puzzles)

routing:
  rules:
    - intent: email
      target: cattle-email-agent
      priority: normal
    - intent: api
      target: duck-api-agent  
      priority: high
    - intent: alert
      target: chicken-alert-agent
      priority: critical

constraints:
  max_capacity: 0.8
  failover: true
  latency_ms: 100
```

#### 2. Coordination Pattern → Distributed Consensus

**In-Game (Coordination Puzzle):**
```typescript
// Game coordination puzzle
const coordinationPuzzle = {
  type: 'coordination',
  agents: [
    { species: 'sheep', id: 'sheep-1', role: 'follower' },
    { species: 'sheep', id: 'sheep-2', role: 'follower' },
    { species: 'sheep', id: 'sheep-3', role: 'leader' },
    { species: 'falcon', id: 'falcon-1', role: 'sync' }
  ],
  task: 'distributed-decision',
  constraints: [
    { type: 'quorum-reached', value: 2 },
    { type: 'sync-required', value: true },
    { type: 'max-time', value: 5000, unit: 'ms' }
  ]
};
```

**Production Equivalent (constraint-flow):**
```yaml
# constraint-flow/workflows/consensus.yaml
name: distributed-consensus
description: Multi-agent consensus (learned in Coordination Puzzles)

consensus:
  protocol: raft
  nodes:
    - id: sheep-1
      role: follower
      species: sheep
    - id: sheep-2
      role: follower
      species: sheep
    - id: sheep-3
      role: leader
      species: sheep
    - id: falcon-1
      role: sync
      species: falcon

constraints:
  quorum: 2
  timeout_ms: 5000
  sync_required: true
```

#### 3. Breeding Pattern → Agent Configuration

**In-Game (Breeding Puzzle):**
```typescript
// Game breeding puzzle
const breedingPuzzle = {
  type: 'breeding',
  targetTraits: {
    politeness: 0.8,
    conciseness: 0.6,
    accuracy: 0.9
  },
  parents: [
    { traits: { politeness: 0.9, conciseness: 0.4, accuracy: 0.7 } },
    { traits: { politeness: 0.7, conciseness: 0.8, accuracy: 0.95 } }
  ],
  constraints: [
    { type: 'generations', value: 3 },
    { type: 'trait-threshold', trait: 'accuracy', value: 0.85 }
  ]
};
```

**Production Equivalent (constraint-flow/breed.md):**
```markdown
# breed.md - Agent Configuration

## Agent: customer-service-v1

### Traits (from breeding optimization)
| Trait | Value | Source |
|-------|-------|--------|
| politeness | 0.80 | Parent A: 0.90, Parent B: 0.70 |
| conciseness | 0.60 | Parent A: 0.40, Parent B: 0.80 |
| accuracy | 0.90 | Exceeds parents via Night School |

### Constraints
- max_response_time: 2s
- min_accuracy: 0.85
- generation: 3

### Export Path
Learned in: Constraint Ranch → Breeding Puzzles
Deployed to: pasture-ai production
```

---

## Agent Coordination Patterns

Constraint Ranch teaches multi-agent coordination through hands-on puzzles. These patterns apply directly to production systems.

### Coordination Types

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    COORDINATION PATTERN TAXONOMY                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  SYMMETRIC COORDINATION (All agents equal)                              │
│  ├── Peer-to-peer communication                                         │
│  ├── Gossip protocol for state propagation                              │
│  └── Example: Chickens monitoring different zones                       │
│                                                                          │
│  ASYMMETRIC COORDINATION (Leader/follower)                              │
│  ├── Leader election (Raft-style)                                       │
│  ├── Follower replication                                               │
│  └── Example: Sheep consensus with designated leader                    │
│                                                                          │
│  HIERARCHICAL COORDINATION (Multi-level)                                │
│  ├── Regional coordinators (Falcons)                                    │
│  ├── Local workers (Ducks, Goats)                                       │
│  └── Example: Multi-region monitoring system                            │
│                                                                          │
│  HYBRID COORDINATION (Mixed patterns)                                   │
│  ├── Consensus for critical decisions                                   │
│  ├── Peer-to-peer for data propagation                                  │
│  └── Example: Full ecosystem simulation                                 │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### Leader Election Implementation

**Game Mechanic:**
```typescript
// Leader election in coordination puzzle
interface LeaderElectionState {
  candidates: Agent[];
  currentLeader: AgentId | null;
  term: number;
  votes: Map<AgentId, AgentId[]>; // candidate -> voters
}

function electLeader(state: LeaderElectionState): AgentId {
  // Agents vote for candidate with best leadership traits
  const candidates = state.candidates.filter(a => a.capable);
  
  // Each agent votes
  for (const agent of state.candidates) {
    const vote = selectBestCandidate(candidates, agent.preferences);
    state.votes.get(vote.id).push(agent.id);
  }
  
  // Majority wins
  const winner = [...state.votes.entries()]
    .reduce((best, [candidate, voters]) => 
      voters.length > best.votes ? { candidate, votes: voters.length } : best,
      { candidate: null, votes: 0 }
    );
  
  state.currentLeader = winner.candidate;
  return winner.candidate;
}
```

**Production Equivalent:**
```typescript
// pasture-ai leader election
interface ClusterState {
  nodes: AgentNode[];
  leader: string | null;
  term: number;
}

async function electLeaderCluster(state: ClusterState): Promise<string> {
  // Same Raft-style election learned in game
  const term = state.term + 1;
  
  // Request votes from all nodes
  const votes = await Promise.all(
    state.nodes.map(node => requestVote(node, term))
  );
  
  // Count votes
  const voteCounts = votes.reduce((counts, vote) => {
    counts[vote.candidate] = (counts[vote.candidate] || 0) + 1;
    return counts;
  }, {});
  
  // Find majority winner
  const majority = Math.floor(state.nodes.length / 2) + 1;
  const winner = Object.entries(voteCounts)
    .find(([_, count]) => count >= majority);
  
  if (winner) {
    state.leader = winner[0];
    state.term = term;
    return winner[0];
  }
  
  // No majority - start new election
  return electLeaderCluster(state);
}
```

### Distributed State Synchronization

**Game Mechanic (Falcon Agent):**
```typescript
// Falcons synchronize state across regions
interface FalconSyncState {
  regions: Map<RegionId, RegionalState>;
  syncInterval: number;
  lastSync: number;
}

async function synchronizeState(falcon: FalconAgent): Promise<void> {
  const states = await Promise.all(
    [...falcon.regions].map(([region, state]) => 
      fetchRegionalState(region)
    )
  );
  
  // Find consensus state
  const consensusState = findConsensus(states);
  
  // Propagate to all regions
  await Promise.all(
    [...falcon.regions].map(([region]) => 
      propagateState(region, consensusState)
    )
  );
  
  falcon.lastSync = Date.now();
}
```

---

## Business Logic Patterns

Constraint Ranch puzzles teach business logic patterns used in constraint-flow.

### Pattern: Intent Classification and Routing

**Game Example (Routing Puzzle):**
```
Incoming Intents:
├── "Check order status" → classify: order-query
├── "I need a refund" → classify: refund-request
└── "What are your hours?" → classify: info-request

Agent Selection:
├── order-query → Duck (fast API access)
├── refund-request → Cattle (complex reasoning)
└── info-request → Chicken (simple retrieval)
```

**Production Pattern:**
```yaml
# constraint-flow/patterns/intent-routing.yaml
pattern: intent-classification-routing
learned_in: Routing Puzzles (Level 5-9)

classification:
  model: intent-classifier-v1
  fallback: human-escalation

routing_table:
  order-query:
    agent: duck-api-agent
    priority: normal
    timeout: 5s
  refund-request:
    agent: cattle-reasoning-agent
    priority: high
    timeout: 30s
  info-request:
    agent: chicken-retrieval-agent
    priority: low
    timeout: 2s
```

### Pattern: Resource Allocation

**Game Example (Spatial Puzzle):**
```
Available Agents: 5 Chickens (25MB total)
Zones to Monitor: 4 zones

Allocation Strategy:
├── Zone A (critical): 2 Chickens
├── Zone B (normal): 1 Chicken
├── Zone C (normal): 1 Chicken
└── Zone D (low): 1 Chicken (can share with Zone C)

Constraints:
├── Max memory: 25MB
├── Min coverage: 95%
└── Failover ready: true
```

**Production Pattern:**
```yaml
# constraint-flow/patterns/resource-allocation.yaml
pattern: constrained-resource-allocation
learned_in: Spatial Puzzles (Level 1-4)

resources:
  agents:
    - type: chicken
      count: 5
      memory_per: 5MB

constraints:
  max_memory: 25MB
  min_coverage: 0.95
  failover_ready: true

allocation:
  zone-a:
    priority: critical
    agents: 2
  zone-b:
    priority: normal
    agents: 1
  zone-c:
    priority: normal
    agents: 1
  zone-d:
    priority: low
    agents: 1
    shared_with: zone-c
```

### Pattern: SLA-Based Prioritization

**Game Example (Routing Puzzle):**
```
SLA Tiers:
├── Platinum: < 100ms response, 99.9% uptime
├── Gold: < 500ms response, 99.5% uptime
└── Silver: < 2000ms response, 99% uptime

Agent Assignment:
├── Platinum intents → Falcon + Cattle (fast + smart)
├── Gold intents → Duck + Goat (balanced)
└── Silver intents → Chicken (basic)
```

**Production Pattern:**
```yaml
# constraint-flow/patterns/sla-prioritization.yaml
pattern: sla-based-prioritization
learned_in: Routing Puzzles (Level 7-9)

sla_tiers:
  platinum:
    max_response_ms: 100
    availability: 0.999
    agents: [falcon, cattle]
  gold:
    max_response_ms: 500
    availability: 0.995
    agents: [duck, goat]
  silver:
    max_response_ms: 2000
    availability: 0.99
    agents: [chicken]

prioritization:
  queue_strategy: priority-queue
  preemption: true
  load_shedding: silver-first
```

---

## Real-World Examples

### Example 1: E-Commerce Customer Service

**Scenario:** Design an agent system for e-commerce customer service.

**Game Skills Applied:**

| Game Puzzle | Real-World Application |
|-------------|------------------------|
| Routing (Level 5) | Intent classification and routing |
| Breeding (Level 20) | Agent trait optimization |
| Coordination (Level 15) | Multi-agent handoff |

**Implementation:**

```typescript
// Learned in Constraint Ranch
const ecommerceSystem = {
  // From Routing Puzzles: Intent routing
  routing: {
    intents: [
      { type: 'order-status', agent: 'duck-order-api', priority: 'high' },
      { type: 'product-question', agent: 'cattle-catalog', priority: 'normal' },
      { type: 'complaint', agent: 'cattle-empathy', priority: 'critical' },
      { type: 'return', agent: 'cattle-returns', priority: 'high' }
    ],
    constraints: [
      { type: 'max-latency', value: 500, unit: 'ms' },
      { type: 'customer-satisfaction-min', value: 0.9 }
    ]
  },
  
  // From Breeding Puzzles: Trait optimization
  agents: {
    'cattle-empathy': {
      traits: { empathy: 0.95, patience: 0.9, politeness: 0.85 },
      trained: ['empathy'] // Night School
    },
    'duck-order-api': {
      traits: { speed: 0.9, accuracy: 0.95 }
    }
  },
  
  // From Coordination Puzzles: Handoff
  handoff: {
    rules: [
      { from: 'duck', to: 'cattle', when: 'complex-issue' },
      { from: 'cattle', to: 'sheep', when: 'consensus-needed' }
    ]
  }
};
```

### Example 2: Distributed Monitoring System

**Scenario:** Monitor a distributed microservices architecture.

**Game Skills Applied:**

| Game Puzzle | Real-World Application |
|-------------|------------------------|
| Spatial (Level 1-4) | Agent placement for coverage |
| Coordination (Level 15-19) | Consensus for alerting |
| Advanced (Level 25+) | Multi-region deployment |

**Implementation:**

```typescript
const monitoringSystem = {
  // From Spatial Puzzles: Coverage optimization
  deployment: {
    regions: [
      { name: 'us-east', agents: ['chicken-1', 'chicken-2', 'falcon-1'] },
      { name: 'eu-west', agents: ['chicken-3', 'chicken-4', 'falcon-2'] },
      { name: 'asia-pacific', agents: ['chicken-5', 'chicken-6', 'falcon-3'] }
    ],
    constraints: [
      { type: 'min-coverage', value: 0.99 },
      { type: 'max-detection-time', value: 30, unit: 's' }
    ]
  },
  
  // From Coordination Puzzles: Consensus alerting
  alerting: {
    quorum: 3, // Need 3 agents to agree
    agents: ['sheep-1', 'sheep-2', 'sheep-3'],
    leader: 'sheep-1',
    sync: 'falcon-1'
  },
  
  // From Advanced Puzzles: Multi-region failover
  failover: {
    enabled: true,
    regions: ['us-east', 'eu-west', 'asia-pacific'],
    syncInterval: 1000 // ms
  }
};
```

### Example 3: Content Moderation Pipeline

**Scenario:** Multi-stage content moderation with escalating complexity.

**Game Skills Applied:**

| Game Puzzle | Real-World Application |
|-------------|------------------------|
| Routing (Level 5-9) | Content type routing |
| Breeding (Level 20-24) | Moderation traits |
| Advanced (Level 25+) | Pipeline orchestration |

**Implementation:**

```yaml
# constraint-flow/workflows/content-moderation.yaml
name: content-moderation-pipeline
learned_in:
  - Routing Puzzles (Level 5-9)
  - Breeding Puzzles (Level 20-24)
  - Advanced Puzzles (Level 25+)

pipeline:
  stages:
    # Stage 1: Fast classification (Duck - learned in Routing)
    - name: classify
      agent: duck-classifier
      traits:
        speed: 0.95
        accuracy: 0.85
      timeout_ms: 100
      
    # Stage 2: Context analysis (Cattle - learned in Advanced)
    - name: analyze
      agent: cattle-analyzer
      traits:
        reasoning: 0.95
        context: 0.90
      timeout_ms: 5000
      
    # Stage 3: Consensus decision (Sheep - learned in Coordination)
    - name: decide
      agents: [sheep-1, sheep-2, sheep-3]
      quorum: 2
      timeout_ms: 1000

routing:
  # From Routing Puzzles
  rules:
    - content_type: text
      pipeline: [classify, analyze, decide]
    - content_type: image
      pipeline: [classify, analyze]
    - content_type: video
      pipeline: [classify]  # Fast-track for volume

constraints:
  max_latency_ms: 6000
  min_accuracy: 0.95
  false_positive_rate: 0.01
```

---

## Export Integration

Trained agents from Constraint Ranch can be exported directly to production systems.

### Export Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    AGENT EXPORT PIPELINE                                 │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  Constraint Ranch                                                        │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  Trained Agent                                                   │   │
│  │  ├── Species: cattle                                             │   │
│  │  ├── Traits: { accuracy: 0.95, politeness: 0.85 }               │   │
│  │  ├── Training: Night School (8 hours)                           │   │
│  │  └── Puzzles Completed: 47                                       │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                              │                                           │
│                              ▼                                           │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  Export Command                                                  │   │
│  │  $ constraint-ranch export cattle-email-v1 --format=pasture-ai  │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                              │                                           │
│                              ▼                                           │
│  pasture-ai / constraint-flow                                           │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  breed.md                                                        │   │
│  │  ```markdown                                                     │   │
│  │  # Agent: cattle-email-v1                                        │   │
│  │  ## Traits                                                       │   │
│  │  - accuracy: 0.95                                                │   │
│  │  - politeness: 0.85                                              │   │
│  │  ## Training                                                     │   │
│  │  - night_school: 8 hours                                         │   │
│  │  - puzzles: 47                                                   │   │
│  │  ## Source                                                       │   │
│  │  - constraint-ranch: level 35                                    │   │
│  │  ```                                                             │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### Export Formats

| Format | Target System | Use Case |
|--------|---------------|----------|
| `pasture-ai` | pasture-ai | Production agent deployment |
| `constraint-flow` | constraint-flow | Business workflow automation |
| `breed.md` | Universal | Human-readable specification |
| `json` | API | Programmatic integration |

---

*This game logic specification ensures consistent implementation of all Constraint Ranch mechanics.*
