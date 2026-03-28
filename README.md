# Constraint Ranch 🎮

> **Breed. Train. Coordinate. A gamified multi-agent system with constraint-based puzzles.**

[![GitHub stars](https://img.shields.io/github/stars/SuperInstance/constraint-ranch?style=social)](https://github.com/SuperInstance/constraint-ranch)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Discord](https://img.shields.io/discord/your-server?color=7289da)](https://discord.gg/constraint-ranch)

🌐 **Play Now:** [constraint-theory-web.pages.dev](https://constraint-theory-web.pages.dev)

---

## 🎯 What Is This?

A **gamified AI ecosystem** where you breed, train, and coordinate AI agents through constraint-based puzzles. Built on [Constraint Theory](https://github.com/SuperInstance/constraint-theory-core) for exact geometric positioning and deterministic agent coordination.

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   🎮 Traditional AI: "Configure temperature to 0.7..."     │
│                      (Hours of trial and error)            │
│                                                             │
│   🐔 Constraint Ranch: Start with 3 chickens               │
│                        Solve puzzles, unlock species       │
│                        Learn AI by playing!                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start (30 Seconds)

**Prerequisites:** Node.js 18+, npm 9+

```bash
# Clone and play
git clone https://github.com/SuperInstance/constraint-ranch.git
cd constraint-ranch
npm install && npm run dev

# Open http://localhost:3000
# Your ranch awaits! 🤠
```

**Or play online:** [constraint-theory-web.pages.dev](https://constraint-theory-web.pages.dev)

**Troubleshooting:**
```bash
# Port 3000 in use?
npm run dev -- --port 3001

# npm install failing?
rm -rf node_modules package-lock.json && npm install
```

---

## 🎮 Gameplay Overview

### 🎯 Core Loop

```
┌─────────────────────────────────────────────────────┐
│                  YOUR RANCH                          │
├─────────────────────────────────────────────────────┤
│                                                      │
│   1. 🐣 HATCH agents from eggs                      │
│   2. 🧩 SOLVE puzzles to earn experience            │
│   3. 🧬 BREED agents with desired traits            │
│   4. 🏆 COMPETE on leaderboards                     │
│   5. 🚀 EXPORT agents to production                 │
│                                                      │
└─────────────────────────────────────────────────────┘
```

<!-- 📸 Screenshot placeholder: Main ranch overview showing agents and puzzles -->
> **Screenshot:** *Main ranch view with agent collection and puzzle selection* (see [assets/screenshots](./assets/screenshots/))

### 🐄 Agent Species (8 Types)

| Species | Size | Specialty | Unlock Level | Tier |
|---------|------|-----------|--------------|------|
| 🐔 **Chicken** | 5MB | Monitoring, Alerts | 1 (Starter) | Starter |
| 🦆 **Duck** | 100MB | API, Network | 5 | Network |
| 🐐 **Goat** | 150MB | Debug, Navigation | 10 | Network |
| 🐑 **Sheep** | 50MB | Consensus Voting | 15 | Network |
| 🐄 **Cattle** | 500MB | Heavy Reasoning | 20 | Heavy |
| 🐴 **Horse** | 200MB | Pipeline ETL | 25 | Heavy |
| 🦅 **Falcon** | 5MB | Multi-node Sync | 30 | Specialty |
| 🐗 **Hog** | 10MB | Hardware GPIO | 35 | Specialty |

> 📘 **See [Agent Species Documentation](./docs/AGENT_SPECIES.md)** for detailed trait ranges, breeding compatibility, and strategy tips for each species.

### 🧩 Puzzle Types (5 Categories)

#### Spatial Puzzles 📍
Position agents optimally using exact geometric coordinates:
```
Goal: Place 5 agents such that:
├── Max distance between any two ≤ 100 units
├── Each agent covers unique monitoring zone
└── Total coverage ≥ 95% of map

Solution: Dodecet-encoded positions guarantee exact placement
```

**Key Constraints:** `max-distance`, `min-coverage`, `agent-count`, `on-perimeter`, `even-spacing`

#### Routing Puzzles 🔀
Route tasks to correct agents using constraint satisfaction:
```
Incoming: 1000 tasks/minute
├── Email tasks → Cattle agents
├── API calls → Duck agents  
├── Alerts → Chicken agents
└── Constraint: No agent exceeds 80% capacity
```

**Key Constraints:** `max-capacity`, `all-tasks-routed`, `optimal-routing`, `max-latency`

#### Breeding Puzzles 🧬
Create agents with specific trait combinations:
```
Target: Agent with {polite: 0.9, concise: 0.7, technical: 0.5}
├── Parent A: {polite: 0.8, concise: 0.4, technical: 0.9}
├── Parent B: {polite: 1.0, concise: 0.9, technical: 0.1}
└── Breed strategy: Select gene weights for target
```

**Key Constraints:** `trait-threshold`, `trait-match`, `generations`, `trait-exceeds-parents`

#### Coordination Puzzles 🤝
Multi-agent collaboration and consensus:
```
Task: Complete distributed computation
├── 5 Sheep agents for voting consensus
├── 1 Falcon for synchronization
└── Constraint: Achieve quorum within 60 seconds
```

**Key Constraints:** `all-tasks-complete`, `sync-required`, `leader-designated`, `no-collision`

#### Advanced Puzzles 🏆
Complex multi-stage challenges combining all mechanics:
```
Challenge: Build a production-ready agent system
├── Stage 1: Spatial placement (coverage)
├── Stage 2: Routing configuration (load balancing)
├── Stage 3: Breeding optimization (traits)
└── Constraint: Complete all stages perfectly
```

**Key Constraints:** `complete-all-subpuzzles`, `resource-limit`, `perfect-chain`

> 📘 **See [Puzzle Format Specification](./docs/PUZZLE_FORMAT.md)** for complete constraint types and puzzle definitions.

### Difficulty Ratings

| Rating | Name | Target Time | XP Range | Example Puzzles |
|--------|------|-------------|----------|-----------------|
| ⭐ | Tutorial | 1-2 min | 100-150 | Coverage basics |
| ⭐⭐ | Beginner | 2-5 min | 150-200 | Triangle formation |
| ⭐⭐⭐ | Intermediate | 5-10 min | 200-300 | Load balancing |
| ⭐⭐⭐⭐ | Advanced | 10-20 min | 300-400 | Multi-region routing |
| ⭐⭐⭐⭐⭐ | Expert | 20+ min | 400-500 | Distributed consensus |

---

## 💡 Why Constraint Theory?

Traditional game AI uses floating-point math, leading to:

```
Agent A position: (100.0000001, 50.0000002)
Agent B position: (100.0000000, 50.0000000)
Distance: 0.0000002... or is it 0?
Collision detection: "Maybe?"
```

**Constraint Ranch uses exact arithmetic:**

```
Agent A: Dodecet(3, 4, 5, N)  // Exact position
Agent B: Dodecet(3, 4, 5, NE) // Exact position
Distance: Exactly √2 units
Collision: NO (deterministic)
```

**Every puzzle has ONE correct answer. No floating-point ambiguity.**

---

## 📈 Progression System

### Levels & Unlocks

| Level | Title | Unlocks | XP Required |
|-------|-------|---------|-------------|
| 1-4 | Ranch Hand | 🐔 Chickens, Basic puzzles | 0 - 1,000 |
| 5-9 | Drover | 🦆 Ducks, Routing puzzles | 1,000 - 5,000 |
| 10-14 | Trail Boss | 🐐 Goats, Debug tools | 5,000 - 15,000 |
| 15-19 | Wrangler | 🐑 Sheep, Consensus puzzles | 15,000 - 30,000 |
| 20-24 | Rancher | 🐄 Cattle, Heavy reasoning | 30,000 - 50,000 |
| 25-29 | Overseer | 🐴 Horses, Pipeline automation | 50,000 - 80,000 |
| 30-34 | Trailblazer | 🦅 Falcons, Multi-node sync | 80,000 - 120,000 |
| 35+ | Ranch Master | All species, Night School breeding | 120,000+ |

### Scoring System

**Base Score Calculation:**
```
Final Score = Base Points × Bonuses × Penalties

Base Points = Puzzle difficulty (1-5) × 100
```

**Bonuses:**
| Bonus | Multiplier | Condition |
|-------|------------|-----------|
| First Attempt | ×1.5 | Solve on first try |
| Speed Run | ×1.3 | Complete in <50% time limit |
| No Hints | ×1.2 | Solve without hints |
| Perfect Solution | ×1.5 | Optimal solution found |
| Streak | ×1.1 per win | Consecutive wins (max ×2.0) |

**Penalties:**
| Penalty | Multiplier | Condition |
|---------|------------|-----------|
| Hint Level 1 | ×0.9 | Used basic hint |
| Hint Level 2 | ×0.75 | Used specific hint |
| Hint Level 3 | ×0.5 | Used solution hint |
| Time Exceeded | ×0.8 | Over time limit |

### Achievements

- 🥇 **Perfect Score**: Solve puzzle with optimal solution
- 🏃 **Speed Run**: Complete level in under 5 minutes
- 🧬 **Master Breeder**: Create agent with 0.95+ fitness
- 🤝 **Coordinator**: Successfully route 10,000 tasks
- 📊 **Analyst**: Export agent to production environment

---

## 🚀 Export to Production

Trained agents can be exported to:

```bash
# Export to pasture-ai
constraint-ranch export cattle-email-v1 --format=pasture-ai

# Export to constraint-flow (business)
constraint-ranch export duck-api-v2 --format=constraint-flow

# Export as breed.md (universal)
constraint-ranch export sheep-consensus-v1 --format=breed
```

**Your trained agents work in real systems.**

---

## 🏗️ Technical Architecture

```typescript
// Game State
interface RanchState {
  level: number;
  agents: GameAgent[];
  constraints: Constraint[];
  score: ExactNumber;  // Constraint Theory exact arithmetic
}

// Agent with exact positioning
interface GameAgent {
  species: Species;
  position: DodecetCoordinate;  // Exact geometric position
  traits: Map<Trait, ExactNumber>;
  fitness: ExactNumber;
}

// Puzzle definition
interface ConstraintPuzzle {
  type: 'spatial' | 'routing' | 'breeding' | 'coordination' | 'advanced';
  constraints: Constraint[];
  initialState: GameState;
  goalState: Constraint[];  // Must all be satisfied
}
```

---

## 🎓 For Educators

### 🧭 Decision Tree: Is This For You?

```
                    ┌─────────────────────────────────┐
                    │   Want to learn AI by playing?  │
                    └─────────────┬───────────────────┘
                                  │
         ┌────────────────────────┼────────────────────────┐
         │                        │                        │
    ┌────▼────┐              ┌────▼────┐             ┌────▼────┐
    │ GAMER   │              │ TEACHER │             │ DEV     │
    └────┬────┘              └────┬────┘             └────┬────┘
         │                        │                        │
         ▼                        ▼                        ▼
    ┌─────────┐             ┌──────────┐            ┌──────────┐
    │ ✓ Play  │             │ ✓ Teach  │            │ ✓ Export │
    │ & learn │             │ concepts │            │ agents   │
    └─────────┘             └──────────┘            └──────────┘
```

**Learning Outcomes:**
- Understand constraint satisfaction through hands-on puzzles
- Learn exact arithmetic vs floating-point approximation
- Experience multi-agent coordination patterns
- Practice optimization and resource allocation
- Apply genetic algorithm concepts through breeding

**Classroom Use:**
- Works in any browser — no installation needed
- Progressive difficulty for different skill levels
- Export agents for real-world applications

### 📚 Educational Value

**CS Concepts Taught:**
| Concept | How It's Taught | Puzzle Type |
|---------|-----------------|-------------|
| Constraint Satisfaction | Position agents to satisfy multiple constraints | Spatial |
| Load Balancing | Distribute tasks without overloading agents | Routing |
| Genetic Algorithms | Breed agents with desired traits | Breeding |
| Distributed Consensus | Coordinate agents for group decisions | Coordination |
| System Design | Combine all concepts in complex scenarios | Advanced |

**Research Foundations:**
This game is built on [Constraint Theory](https://github.com/SuperInstance/constraint-theory-core), which enables:
- **Exact arithmetic**: No floating-point errors in calculations
- **Deterministic solutions**: Every puzzle has exactly one correct answer
- **Snapping**: Automatic alignment to valid positions

> 📘 **Learn more:** See [constraint-theory-core](https://github.com/SuperInstance/constraint-theory-core) for the mathematical foundations.

---

## 💰 Monetization (Fair Play)

| Feature | Free | Premium |
|---------|------|---------|
| Agent Slots | 5 | Unlimited |
| Puzzle Levels | 1-10 | All levels |
| Night School | Manual | Auto-breed |
| Agent Export | 1/month | Unlimited |
| Custom Puzzles | ❌ | ✅ |
| Global Leaderboards | ❌ | ✅ |

**No pay-to-win. Premium unlocks convenience, not advantages.**

---

## 🌟 Ecosystem

Constraint Ranch is part of the Constraint Theory ecosystem:

| Repo | What It Does | Connection to Ranch |
|------|--------------|---------------------|
| **[constraint-theory-core](https://github.com/SuperInstance/constraint-theory-core)** | Rust crate - exact arithmetic | Powers exact positioning & snapping |
| **[constraint-theory-python](https://github.com/SuperInstance/constraint-theory-python)** | Python bindings | For analysis and research |
| **[constraint-ranch](https://github.com/SuperInstance/constraint-ranch)** | This repo - Gamified AI | Learn by playing! |
| **[constraint-flow](https://github.com/SuperInstance/constraint-flow)** | Business automation | Export agents to workflows |
| **[pasture-ai](https://github.com/SuperInstance/pasture-ai)** | Production agent system | Deploy trained agents |

### Workflow Integration

```
┌─────────────────────────────────────────────────────────────────────┐
│                     CONSTRAINT ECOSYSTEM WORKFLOW                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌─────────────────┐     ┌─────────────────┐     ┌───────────────┐  │
│  │ constraint-     │     │ constraint-     │     │ pasture-ai    │  │
│  │ theory-core     │────▶│ ranch           │────▶│ (production)  │  │
│  │ (Rust/WASM)     │     │ (learn & train) │     │               │  │
│  └─────────────────┘     └─────────────────┘     └───────────────┘  │
│         │                        │                       │           │
│         │                        ▼                       │           │
│         │                 ┌─────────────────┐            │           │
│         │                 │ constraint-     │────────────┘           │
│         │                 │ flow            │                        │
│         │                 │ (automation)    │                        │
│         │                 └─────────────────┘                        │
│         │                        │                                   │
│         ▼                        ▼                                   │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                   Exact Arithmetic Foundation                   │  │
│  │   • No floating-point errors                                   │  │
│  │   • Deterministic solutions                                    │  │
│  │   • Cross-platform consistency                                 │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🤝 Contributing

**[Good First Issues](https://github.com/SuperInstance/constraint-ranch/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)** · **[CONTRIBUTING.md](CONTRIBUTING.md)**

We welcome contributions:

- 🎮 **New Puzzles** - Design challenging constraint puzzles
- 🐄 **New Species** - Add new agent types with unique abilities
- 🎨 **Art & UI** - Improve visual experience
- 📝 **Translations** - Make the ranch global

---

## 📜 License

MIT — see [LICENSE](LICENSE).

---

<div align="center">

**Ready to run your ranch? Let's play! 🤠**

**[Star this repo](https://github.com/SuperInstance/constraint-ranch)** · **[Play Now](https://constraint-theory-web.pages.dev)**

</div>
