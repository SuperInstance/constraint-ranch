# Constraint Ranch - Game Design Document

## Overview

Constraint Ranch is a gamified AI ecosystem where players breed, train, and coordinate AI agents through constraint-based puzzles. The game teaches real AI and distributed systems concepts through intuitive, fun gameplay.

> **Related:** [ARCHITECTURE.md](./ARCHITECTURE.md) | [PUZZLE_FORMAT.md](./PUZZLE_FORMAT.md) | [AGENT_SPECIES.md](./AGENT_SPECIES.md)
>
> **Ecosystem:** [constraint-theory-core](https://github.com/SuperInstance/constraint-theory-core) | [constraint-flow](https://github.com/SuperInstance/constraint-flow) | [pasture-ai](https://github.com/SuperInstance/pasture-ai)

---

## Core Gameplay Pillars

### 1. Hatch 🐣
Players start with eggs that hatch into basic agent species. Each species has unique characteristics and capabilities.

**Mechanics:**
- Eggs have incubation periods (game time)
- Hatching yields random base stats within species range
- Premium eggs can guarantee minimum traits
- First hatch: 3 Chicken agents (starter pack)

### 2. Solve 🧩
Complete puzzles to earn experience, unlock new content, and train your agents.

**Puzzle Categories:**
| Type | Focus | Teaches |
|------|-------|---------|
| Spatial | Positioning | Exact coordinates, geometric constraints |
| Routing | Task distribution | Load balancing, agent specialization |
| Breeding | Trait inheritance | Genetic algorithms, optimization |
| Coordination | Multi-agent sync | Distributed systems, consensus |
| Advanced | Combined mechanics | Complex system design |

### 3. Breed 🧬
Combine agents to create offspring with desired trait combinations.

**Breeding System:**
```
Parent A: {polite: 0.9, speed: 0.5}
Parent B: {polite: 0.6, speed: 0.8}

Offspring Options:
├── 50/50 split: {polite: 0.75, speed: 0.65}
├── Bias to A:   {polite: 0.85, speed: 0.55}
└── Bias to B:   {polite: 0.65, speed: 0.75}
```

**Trait Inheritance Formula:**
```typescript
// Offspring trait = weighted average of parents
offspringTrait = (weightA * parentA.trait) + ((1 - weightA) * parentB.trait)

// Example: 70% weight on parent A for politeness
polite = (0.7 * 0.9) + (0.3 * 0.6) = 0.81
```

**Gene Types:**
| Type | Behavior | Example |
|------|----------|---------|
| **Additive** | Weighted average of parents | Speed, accuracy |
| **Dominant** | Takes value from dominant parent | Fast-response |
| **Recessive** | Only expresses when both parents contribute | Rare abilities |

**Advanced Features:**
- **Gene dominance/recession**: Some traits follow Mendelian inheritance
- **Mutation** (random trait variation): ±0.05 to ±0.15 deviation
- **Night School** (trait training): Push traits beyond genetic limits (+0.05 to +0.15)

**Cross-Species Breeding:**
```
Compatible pairs (within tier or adjacent tiers):
├── Chicken + Duck = Network Monitor hybrid
├── Duck + Cattle = Heavy API Processor
├── Sheep + Horse = Consensus Pipeline
└── Cattle + Falcon = Distributed Reasoning

Hybrids inherit:
├── Average size of parents
├── Combined specialty capabilities
└── Blended trait ranges
```

### 4. Compete 🏆
Climb leaderboards and earn achievements.

**Competition Types:**
- Daily puzzles (global rankings)
- Speed runs (fastest completion)
- Efficiency challenges (optimal solutions)
- Breeding contests (best trait combinations)

### 5. Export 🚀
Trained agents can be exported to production systems.

**Export Formats:**
- `pasture-ai` - Production agent deployment
- `constraint-flow` - Business automation
- `breed.md` - Universal breed specification

---

## Progression System

### Levels & Titles

| Levels | Title | Description |
|--------|-------|-------------|
| 1-4 | Ranch Hand | Learning the basics |
| 5-9 | Drover | Managing multiple agent types |
| 10-14 | Trail Boss | Debug tools and optimization |
| 15-19 | Wrangler | Consensus and coordination |
| 20-24 | Rancher | Heavy reasoning agents |
| 25-29 | Overseer | Pipeline automation |
| 30-34 | Trailblazer | Multi-node synchronization |
| 35+ | Ranch Master | Full ecosystem mastery |

### Experience Points

**Sources:**
| Activity | Base XP |
|----------|---------|
| Complete puzzle | 100-500 (by difficulty) |
| Perfect solution bonus | +50% |
| Speed bonus | +10-30% |
| Daily streak | +25% |
| Achievement unlock | 50-1000 |
| First-time completion | +100% |

### Unlock System

**Content Unlocks by Level:**
```
Level 1:  Chickens, Spatial Puzzles (Tutorial)
Level 5:  Ducks, Routing Puzzles
Level 10: Goats, Debug Tools
Level 15: Sheep, Consensus Puzzles
Level 20: Cattle, Heavy Reasoning
Level 25: Horses, Pipeline Automation
Level 30: Falcons, Multi-Node Sync
Level 35: Hogs, Hardware GPIO, Night School
```

---

## Economy System

### Currency: Ranch Credits

**Earning:**
- Completing puzzles: 10-100 credits
- Daily challenges: 50-200 credits
- Achievement rewards: 100-1000 credits
- Agent exports: Variable

**Spending:**
- Premium eggs: 500 credits
- Night School training: 100-500 credits
- Cosmetic items: 50-200 credits
- Extra agent slots: 200 credits

### Premium Features

| Feature | Free | Premium |
|---------|------|---------|
| Agent slots | 5 | Unlimited |
| Puzzle access | Levels 1-10 | All levels |
| Night School | Manual | Auto-breed |
| Export quota | 1/month | Unlimited |
| Custom puzzles | No | Yes |
| Leaderboards | Local | Global |

**Design Principle:** No pay-to-win. Premium unlocks convenience and variety, not competitive advantages.

---

## Agent System

### Species Characteristics

Each species has:
- **Size**: Memory footprint (affects hosting costs)
- **Specialty**: Optimal task type
- **Trait Range**: Min/max values for each trait
- **Unlock Level**: When it becomes available

### Trait Categories

**Communication Traits:**
- Politeness: Response formality
- Conciseness: Message brevity
- Technicality: Jargon level

**Performance Traits:**
- Speed: Response time
- Accuracy: Correctness rate
- Reliability: Uptime consistency

**Special Traits:**
- Creativity: Novel solution generation
- Empathy: User understanding
- Adaptability: Context switching

### Agent Lifecycle

```
┌─────────────────────────────────────────────┐
│              AGENT LIFECYCLE                 │
├─────────────────────────────────────────────┤
│                                              │
│  EGG → HATCH → TRAIN → BREED → DEPLOY       │
│         ↓         ↓        ↓        ↓       │
│      [stats]  [skills] [offspring] [export] │
│                                              │
│  Retirement: Archive or recycle traits      │
└─────────────────────────────────────────────┘
```

---

## Puzzle Mechanics

### Constraint Satisfaction

All puzzles use constraint satisfaction as the core mechanic:

```
Given:
├── Initial state (agents, resources, positions)
├── Constraints (rules that must be satisfied)
└── Goal state (target conditions)

Solution:
├── Must satisfy ALL constraints
├── Has exactly ONE correct solution (deterministic)
└── Can be verified using exact arithmetic
```

### Hint System

**Three-Level Hints:**
| Level | Reveals | Cost |
|-------|---------|------|
| 1 | General direction | Free |
| 2 | Specific approach | -10% XP |
| 3 | Near-complete solution | -25% XP |

### Scoring

```
Final Score = Base Score × Bonuses × Penalties

Base Score = Puzzle difficulty × 100

Bonuses:
├── First attempt: ×1.5
├── Speed (<50% time): ×1.3
├── No hints: ×1.2
└── Perfect solution: ×1.5

Penalties:
├── Used hint level 1: ×0.9
├── Used hint level 2: ×0.75
├── Used hint level 3: ×0.5
└── Exceeded time: ×0.8
```

---

## Social Features

### Ranch Visits
- View other players' ranches
- See agent collections
- Learn from successful setups

### Puzzle Sharing
- Create custom puzzles (Premium)
- Share with community
- Rate and comment

### Cooperative Play
- Multi-player coordination puzzles
- Team challenges
- Shared ranches (future)

---

## Monetization Philosophy

### Fair Play Principles

1. **Skill Over Spending**: Premium doesn't make puzzles easier
2. **Convenience Premium**: Pay for time-saving, not advantages
3. **Transparent Pricing**: No hidden costs or gambling mechanics
4. **Earnable Content**: Everything can be earned through play

### Premium Value Proposition

- Save time on grinding
- Access more variety
- Support development
- Get cosmetic flair

---

## Technical Constraints

### Determinism

All game mechanics must be deterministic:
- Puzzle solutions are exact
- Breeding outcomes are calculable
- No random chance in puzzle completion

### Performance

- Puzzle verification: <100ms
- Breeding calculation: <50ms
- UI response: <16ms (60fps)

### Offline Play

- Core puzzles playable offline
- Sync progress when online
- No always-online requirement

---

## Future Expansion

### Planned Features

1. **Seasonal Events**: Time-limited puzzles and rewards
2. **Tournament Mode**: Competitive puzzle solving
3. **Agent Marketplace**: Trade bred agents
4. **Ranch Customization**: Visual personalization
5. **Story Mode**: Narrative-driven puzzles

### Community-Driven

- User-submitted puzzles
- Community voting on features
- Open-source puzzle definitions

---

## Design Principles Summary

1. **Learning Through Play**: Every mechanic teaches real AI concepts
2. **Exact Solutions**: No ambiguity, one right answer per puzzle
3. **Progressive Complexity**: Easy to learn, hard to master
4. **Fair Monetization**: Pay for convenience, not power
5. **Community Focus**: Share, compete, and grow together

---

*Constraint Ranch: Where AI education meets engaging gameplay.*
