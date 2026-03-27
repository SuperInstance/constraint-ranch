# Constraint Ranch 🎮

> **Breed. Train. Coordinate. A gamified multi-agent system with constraint-based puzzles.**

[![GitHub stars](https://img.shields.io/github/stars/SuperInstance/constraint-ranch?style=social)](https://github.com/SuperInstance/constraint-ranch)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Discord](https://img.shields.io/discord/your-server?color=7289da)](https://discord.gg/constraint-ranch)

🌐 **Play Now:** [constraint-ranch.superinstance.ai](https://constraint-ranch.superinstance.ai)

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

**Or play online:** [constraint-ranch.superinstance.ai](https://constraint-ranch.superinstance.ai)

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

### 🐄 Agent Species (8 Types)

| Species | Size | Specialty | Unlock Level |
|---------|------|-----------|--------------|
| 🐔 **Chicken** | 5MB | Monitoring, Alerts | 1 (Starter) |
| 🦆 **Duck** | 100MB | API, Network | 5 |
| 🐐 **Goat** | 150MB | Debug, Navigation | 10 |
| 🐑 **Sheep** | 50MB | Consensus Voting | 15 |
| 🐄 **Cattle** | 500MB | Heavy Reasoning | 20 |
| 🐴 **Horse** | 200MB | Pipeline ETL | 25 |
| 🦅 **Falcon** | 5MB | Multi-node Sync | 30 |
| 🐗 **Hog** | 10MB | Hardware GPIO | 35 |

### 🧩 Puzzle Types (3 Categories)

#### Spatial Puzzles 📍
Position agents optimally using exact geometric coordinates:
```
Goal: Place 5 agents such that:
├── Max distance between any two ≤ 100 units
├── Each agent covers unique monitoring zone
└── Total coverage ≥ 95% of map

Solution: Dodecet-encoded positions guarantee exact placement
```

#### Routing Puzzles 🔀
Route tasks to correct agents using constraint satisfaction:
```
Incoming: 1000 tasks/minute
├── Email tasks → Cattle agents
├── API calls → Duck agents  
├── Alerts → Chicken agents
└── Constraint: No agent exceeds 80% capacity
```

#### Breeding Puzzles 🧬
Create agents with specific trait combinations:
```
Target: Agent with {polite: 0.9, concise: 0.7, technical: 0.5}
├── Parent A: {polite: 0.8, concise: 0.4, technical: 0.9}
├── Parent B: {polite: 1.0, concise: 0.9, technical: 0.1}
└── Breed strategy: Select gene weights for target
```

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

| Level | Title | Unlocks |
|-------|-------|---------|
| 1-4 | Ranch Hand | 🐔 Chickens, Basic puzzles |
| 5-9 | Drover | 🦆 Ducks, Routing puzzles |
| 10-14 | Trail Boss | 🐐 Goats, Debug tools |
| 15-19 | Wrangler | 🐑 Sheep, Consensus puzzles |
| 20-24 | Rancher | 🐄 Cattle, Heavy reasoning |
| 25-29 | Overseer | 🐴 Horses, Pipeline automation |
| 30-34 | Trailblazer | 🦅 Falcons, Multi-node sync |
| 35+ | Ranch Master | All species, Night School breeding |

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
  type: 'spatial' | 'routing' | 'breeding';
  constraints: Constraint[];
  initialState: GameState;
  goalState: Constraint[];  // Must all be satisfied
}
```

---

## 🎓 For Educators

**Learning Outcomes:**
- Understand constraint satisfaction through hands-on puzzles
- Learn exact arithmetic vs floating-point approximation
- Experience multi-agent coordination patterns
- Practice optimization and resource allocation

**Classroom Use:**
- Works in any browser — no installation needed
- Progressive difficulty for different skill levels
- Export agents for real-world applications

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

| Repo | What It Does |
|------|--------------|
| **[constraint-theory-core](https://github.com/SuperInstance/constraint-theory-core)** | Rust crate - exact arithmetic |
| **[constraint-theory-python](https://github.com/SuperInstance/constraint-theory-python)** | Python bindings |
| **[constraint-ranch](https://github.com/SuperInstance/constraint-ranch)** | This repo - Gamified AI |
| **[constraint-flow](https://github.com/SuperInstance/constraint-flow)** | Business automation |
| **[pasture-ai](https://github.com/SuperInstance/pasture-ai)** | Production agent system |

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

**[Star this repo](https://github.com/SuperInstance/constraint-ranch)** · **[Play Now](https://constraint-ranch.superinstance.ai)**

</div>
