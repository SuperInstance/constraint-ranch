# Agent Species Documentation

This document provides detailed information about all agent species in Constraint Ranch.

---

## Overview

Agents are the core units in Constraint Ranch. Each species has unique characteristics, specialties, and optimal use cases. Understanding species traits is essential for effective puzzle solving and ranch management.

---

## Species Classification

```
┌─────────────────────────────────────────────────────────────┐
│                    SPECIES HIERARCHY                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Tier 1: Starter (Level 1)                                  │
│  └── 🐔 Chicken - Monitoring & Alerts                        │
│                                                              │
│  Tier 2: Network (Level 5-15)                               │
│  ├── 🦆 Duck - API & Network                                │
│  ├── 🐐 Goat - Debug & Navigation                           │
│  └── 🐑 Sheep - Consensus Voting                            │
│                                                              │
│  Tier 3: Heavy (Level 20-25)                                │
│  ├── 🐄 Cattle - Heavy Reasoning                            │
│  └── 🐴 Horse - Pipeline ETL                                │
│                                                              │
│  Tier 4: Specialty (Level 30+)                              │
│  ├── 🦅 Falcon - Multi-node Sync                            │
│  └── 🐗 Hog - Hardware GPIO                                 │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Species Details

### 🐔 Chicken

**The Starter Species**

| Attribute | Value |
|-----------|-------|
| Size | 5MB |
| Specialty | Monitoring, Alerts |
| Unlock Level | 1 (Starter) |
| Max Agents | Unlimited |

**Trait Ranges:**
| Trait | Min | Max | Notes |
|-------|-----|-----|-------|
| Alertness | 0.8 | 1.0 | Excellent at detecting issues |
| Speed | 0.6 | 0.8 | Quick to respond |
| Accuracy | 0.5 | 0.7 | Moderate precision |
| Endurance | 0.3 | 0.5 | Low stamina |

**Best For:**
- Monitoring dashboards
- Alert routing
- Simple threshold checks
- Coverage puzzles

**Example Use Case:**
```typescript
// Chicken agent for monitoring
const monitoringChicken = {
  species: 'chicken',
  position: { x: 100, y: 100 },
  task: 'monitor-zone-a',
  traits: { alertness: 0.95, speed: 0.75 }
};
```

**Strategy Tips:**
- Deploy Chickens in grids for maximum coverage
- Low cost makes them ideal for redundancy
- Train alertness to 0.95+ for critical monitoring
- Don't expect complex reasoning tasks

---

### 🦆 Duck

**The Network Specialist**

| Attribute | Value |
|-----------|-------|
| Size | 100MB |
| Specialty | API, Network |
| Unlock Level | 5 |
| Max Agents | 10 |

**Trait Ranges:**
| Trait | Min | Max | Notes |
|-------|-----|-----|-------|
| Connectivity | 0.7 | 1.0 | Excellent network handling |
| Throughput | 0.6 | 0.9 | High task volume |
| Latency | 0.5 | 0.8 | Good response times |
| Reliability | 0.6 | 0.8 | Solid uptime |

**Best For:**
- API endpoints
- Network routing
- Request handling
- Routing puzzles

**Example Use Case:**
```typescript
// Duck agent for API handling
const apiDuck = {
  species: 'duck',
  capacity: 500, // tasks per minute
  endpoints: ['/api/users', '/api/data'],
  traits: { connectivity: 0.9, throughput: 0.85 }
};
```

**Strategy Tips:**
- Perfect for routing puzzles with high task volumes
- Combine with Chickens for monitoring API health
- Breed for high throughput to handle burst traffic
- Use multiple Ducks for load balancing

---

### 🐐 Goat

**The Debug Navigator**

| Attribute | Value |
|-----------|-------|
| Size | 150MB |
| Specialty | Debug, Navigation |
| Unlock Level | 10 |
| Max Agents | 8 |

**Trait Ranges:**
| Trait | Min | Max | Notes |
|-------|-----|-----|-------|
| Intelligence | 0.7 | 0.9 | Good problem solving |
| Navigation | 0.8 | 1.0 | Excellent pathfinding |
| Debug | 0.7 | 0.95 | Strong error detection |
| Patience | 0.6 | 0.9 | Methodical approach |

**Best For:**
- Debugging complex issues
- Path optimization
- Error detection
- Spatial puzzles with obstacles

**Example Use Case:**
```typescript
// Goat agent for debugging
const debugGoat = {
  species: 'goat',
  task: 'trace-error',
  debugLevel: 'deep',
  traits: { intelligence: 0.85, debug: 0.9 }
};
```

**Strategy Tips:**
- Use Goats for puzzles requiring navigation around obstacles
- High intelligence makes them good at pattern recognition
- Breed with other species for hybrid debug-network agents
- Essential for advanced spatial puzzles

---

### 🐑 Sheep

**The Consensus Coordinator**

| Attribute | Value |
|-----------|-------|
| Size | 50MB |
| Specialty | Consensus Voting |
| Unlock Level | 15 |
| Max Agents | 15 |

**Trait Ranges:**
| Trait | Min | Max | Notes |
|-------|-----|-----|-------|
| Cooperation | 0.8 | 1.0 | Excellent teamwork |
| Communication | 0.7 | 0.95 | Clear messaging |
| Patience | 0.6 | 0.9 | Waits for consensus |
| Agreement | 0.7 | 0.9 | Finds common ground |

**Best For:**
- Distributed consensus
- Voting systems
- Multi-agent coordination
- Coordination puzzles

**Example Use Case:**
```typescript
// Sheep agents for Raft consensus
const sheepCluster = [
  { species: 'sheep', role: 'leader', term: 3 },
  { species: 'sheep', role: 'follower', term: 3 },
  { species: 'sheep', role: 'follower', term: 3 }
];
```

**Strategy Tips:**
- Deploy in groups of 3, 5, or 7 for quorum
- Low memory footprint allows many agents
- Perfect for learning distributed systems concepts
- Essential for coordination puzzles

---

### 🐄 Cattle

**The Heavy Reasoner**

| Attribute | Value |
|-----------|-------|
| Size | 500MB |
| Specialty | Heavy Reasoning |
| Unlock Level | 20 |
| Max Agents | 5 |

**Trait Ranges:**
| Trait | Min | Max | Notes |
|-------|-----|-----|-------|
| Intelligence | 0.8 | 1.0 | Excellent reasoning |
| Memory | 0.7 | 0.95 | Large context |
| Processing | 0.8 | 0.95 | Deep analysis |
| Speed | 0.3 | 0.6 | Slower but thorough |

**Best For:**
- Complex decision making
- Large context analysis
- Deep reasoning tasks
- Advanced puzzles requiring analysis

**Example Use Case:**
```typescript
// Cattle agent for complex analysis
const reasoningCattle = {
  species: 'cattle',
  task: 'analyze-complex-system',
  contextSize: 'large',
  traits: { intelligence: 0.95, memory: 0.9 }
};
```

**Strategy Tips:**
- Expensive but powerful - use sparingly
- Perfect for puzzles requiring deep analysis
- High memory allows processing complex scenarios
- Don't waste on simple routing tasks

---

### 🐴 Horse

**The Pipeline Runner**

| Attribute | Value |
|-----------|-------|
| Size | 200MB |
| Specialty | Pipeline ETL |
| Unlock Level | 25 |
| Max Agents | 8 |

**Trait Ranges:**
| Trait | Min | Max | Notes |
|-------|-----|-----|-------|
| Throughput | 0.8 | 1.0 | Excellent data flow |
| Reliability | 0.7 | 0.95 | Consistent execution |
| Versatility | 0.6 | 0.9 | Multiple formats |
| Stamina | 0.8 | 0.95 | Long-running tasks |

**Best For:**
- ETL pipelines
- Data transformation
- Batch processing
- Multi-stage tasks

**Example Use Case:**
```typescript
// Horse agent for ETL pipeline
const pipelineHorse = {
  species: 'horse',
  pipeline: [
    { stage: 'extract', source: 'database' },
    { stage: 'transform', type: 'sanitize' },
    { stage: 'load', destination: 'warehouse' }
  ],
  traits: { throughput: 0.95, reliability: 0.9 }
};
```

**Strategy Tips:**
- Perfect for advanced puzzles with data flow
- Chain Horses for complex pipelines
- High throughput makes them efficient batch processors
- Combine with Cattle for analysis pipelines

---

### 🦅 Falcon

**The Multi-Node Synchronizer**

| Attribute | Value |
|-----------|-------|
| Size | 5MB |
| Specialty | Multi-node Sync |
| Unlock Level | 30 |
| Max Agents | 10 |

**Trait Ranges:**
| Trait | Min | Max | Notes |
|-------|-----|-----|-------|
| Speed | 0.9 | 1.0 | Fastest species |
| Range | 0.8 | 1.0 | Long-distance communication |
| Precision | 0.7 | 0.95 | Accurate synchronization |
| Agility | 0.9 | 1.0 | Quick direction changes |

**Best For:**
- Multi-region coordination
- Clock synchronization
- Global state management
- Cross-region coordination puzzles

**Example Use Case:**
```typescript
// Falcon agents for multi-region sync
const syncFalcons = [
  { species: 'falcon', region: 'us-east', role: 'primary' },
  { species: 'falcon', region: 'eu-west', role: 'secondary' },
  { species: 'falcon', region: 'asia-pacific', role: 'secondary' }
];
```

**Strategy Tips:**
- Small size makes them cost-effective for distributed systems
- Use for achieving precise synchronization
- Essential for advanced coordination puzzles
- Breed for precision to achieve sub-millisecond sync

---

### 🐗 Hog

**The Hardware Interface**

| Attribute | Value |
|-----------|-------|
| Size | 10MB |
| Specialty | Hardware GPIO |
| Unlock Level | 35 |
| Max Agents | 5 |

**Trait Ranges:**
| Trait | Min | Max | Notes |
|-------|-----|-----|-------|
| Hardware | 0.8 | 1.0 | Excellent device control |
| Precision | 0.7 | 0.95 | Accurate timing |
| Robustness | 0.8 | 0.95 | Handles physical stress |
| Low-level | 0.9 | 1.0 | Direct hardware access |

**Best For:**
- GPIO control
- Hardware interfaces
- Sensor integration
- IoT puzzles

**Example Use Case:**
```typescript
// Hog agent for hardware control
const hardwareHog = {
  species: 'hog',
  interfaces: ['gpio', 'i2c', 'spi'],
  sensors: ['temperature', 'motion', 'light'],
  traits: { hardware: 0.95, precision: 0.9 }
};
```

**Strategy Tips:**
- Unlock at high level - late-game specialist
- Essential for hardware-related puzzles
- Small size but specialized capability
- Combine with Falcons for distributed IoT systems

---

## Cross-Species Breeding

### Compatible Pairs

```
┌─────────────────────────────────────────────────────────────┐
│                   BREEDING COMPATIBILITY                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Tier 1 → Tier 2                                            │
│  🐔 Chicken + 🦆 Duck = Network Monitor hybrid              │
│  🐔 Chicken + 🐐 Goat = Debug Monitor hybrid                │
│  🐔 Chicken + 🐑 Sheep = Alert Consensus hybrid             │
│                                                              │
│  Tier 2 → Tier 3                                            │
│  🦆 Duck + 🐄 Cattle = Heavy API Processor                  │
│  🦆 Duck + 🐴 Horse = Streaming Pipeline                    │
│  🐑 Sheep + 🐴 Horse = Consensus Pipeline                   │
│                                                              │
│  Tier 3 → Tier 4                                            │
│  🐄 Cattle + 🦅 Falcon = Distributed Reasoning              │
│  🐴 Horse + 🦅 Falcon = Multi-region Pipeline               │
│  🐄 Cattle + 🐗 Hog = Hardware Analysis                     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Hybrid Traits

When breeding across species, offspring inherit traits from both:

```typescript
// Example: Chicken + Duck hybrid
const hybrid = {
  species: 'hybrid',
  parents: ['chicken', 'duck'],
  traits: {
    alertness: 0.85,   // From Chicken
    connectivity: 0.8, // From Duck
    speed: 0.75        // Average
  },
  size: '52MB', // Near Chicken's small size
  specialty: 'Network Monitoring'
};
```

---

## Night School Training

Night School allows training traits beyond genetic limits:

### Training Rules

1. **Base Limit**: Offspring cannot exceed parent trait maximums naturally
2. **Night School Bonus**: +0.05 to +0.15 trait improvement
3. **Training Time**: 4-12 hours depending on improvement amount
4. **Cost**: 100-500 credits per training session

### Example

```typescript
// Before Night School
const agent = {
  traits: { intelligence: 0.85 }, // Genetic limit from parents
  maxGenetic: { intelligence: 0.85 }
};

// Night School Training (8 hours, 300 credits)
const trained = nightSchool.train(agent, {
  trait: 'intelligence',
  target: 0.95, // +0.10 improvement
  duration: 8,
  cost: 300
});

// After Night School
console.log(trained.traits.intelligence); // 0.95
console.log(trained.trained); // ['intelligence']
```

---

## Species Selection Guide

### By Puzzle Type

| Puzzle Type | Best Species | Why |
|-------------|--------------|-----|
| Spatial | Chicken, Goat | Coverage and navigation |
| Routing | Duck, Horse | High throughput |
| Breeding | Any (breed for traits) | All species can breed |
| Coordination | Sheep, Falcon | Consensus and sync |
| Advanced | Cattle, Horse | Complex reasoning and pipelines |

### By Task Volume

| Volume | Best Species | Notes |
|--------|--------------|-------|
| Low (<100/min) | Chicken | Cost-effective |
| Medium (100-500/min) | Duck, Goat | Balanced |
| High (>500/min) | Horse, Cattle | High capacity |
| Distributed | Falcon, Sheep | Multi-node |

---

## Best Practices

### Agent Deployment

1. **Start Small**: Begin with Chickens for monitoring
2. **Specialize**: Add species based on puzzle requirements
3. **Hybridize**: Breed for custom capabilities
4. **Train**: Use Night School for edge cases
5. **Retire**: Archive agents when no longer needed

### Resource Management

```
┌─────────────────────────────────────────────────────────────┐
│                 MEMORY ALLOCATION GUIDE                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Starter Ranch (Level 1-10)                                 │
│  ├── 5 Chickens = 25MB                                      │
│  └── Total: 25MB                                            │
│                                                              │
│  Growing Ranch (Level 10-20)                                │
│  ├── 3 Chickens = 15MB                                      │
│  ├── 2 Ducks = 200MB                                        │
│  ├── 2 Goats = 300MB                                        │
│  └── Total: 515MB                                           │
│                                                              │
│  Advanced Ranch (Level 20+)                                 │
│  ├── 2 Chickens = 10MB                                      │
│  ├── 3 Ducks = 300MB                                        │
│  ├── 2 Goats = 300MB                                        │
│  ├── 2 Sheep = 100MB                                        │
│  ├── 1 Cattle = 500MB                                       │
│  ├── 1 Horse = 200MB                                        │
│  └── Total: 1,410MB                                         │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

*Master your species, master your ranch! 🤠*
