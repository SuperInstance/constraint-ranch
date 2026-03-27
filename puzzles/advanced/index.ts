// Advanced puzzles for Constraint Ranch
// These puzzles combine multiple mechanics for complex challenges

import { AdvancedPuzzle, Constraint, Position } from '../types';

/**
 * Tutorial Puzzle 1: Supply Chain Coordination
 * 
 * Combine routing and spatial positioning for a supply chain scenario.
 */
export const supplyChainCoordination: AdvancedPuzzle = {
  id: 'advanced-001',
  name: 'Supply Chain Coordination',
  type: 'advanced',
  difficulty: 1,
  description: 'Route materials through your ranch using spatial positioning and task routing. Position agents at key points and route tasks efficiently.',
  
  constraints: [
    { type: 'all-tasks-routed', value: true },
    { type: 'max-route-distance', value: 200, unit: 'units' },
    { type: 'min-throughput', value: 100, unit: 'items/min' }
  ],
  
  subPuzzles: [
    {
      type: 'spatial',
      puzzle: {
        id: 'advanced-001-spatial',
        name: 'Position Depots',
        type: 'spatial',
        difficulty: 1,
        description: 'Position agents at optimal supply chain points',
        constraints: [
          { type: 'max-distance', value: 100, unit: 'units' },
          { type: 'agent-count', value: 3 }
        ],
        initialState: {
          mapSize: { width: 400, height: 400 },
          zones: [
            { id: 'source', x: 50, y: 200, radius: 30 },
            { id: 'process', x: 200, y: 200, radius: 40 },
            { id: 'dest', x: 350, y: 200, radius: 30 }
          ]
        },
        goalState: [
          { type: 'chain-connected', value: true }
        ],
        hints: [
          { level: 1, text: 'Position agents between each zone' },
          { level: 2, text: 'Agent 1 at source, Agent 2 at process, Agent 3 at dest' },
          { level: 3, text: 'Positions: (50,200), (200,200), (350,200)' }
        ],
        rewards: { experience: 50 }
      }
    },
    {
      type: 'routing',
      puzzle: {
        id: 'advanced-001-routing',
        name: 'Route Materials',
        type: 'routing',
        difficulty: 1,
        description: 'Route materials through the supply chain',
        constraints: [
          { type: 'max-capacity', value: 0.8 },
          { type: 'all-tasks-routed', value: true }
        ],
        initialState: {
          taskTypes: [
            { type: 'raw-material', rate: 40 },
            { type: 'processed', rate: 30 },
            { type: 'finished', rate: 20 }
          ],
          availableAgents: [
            { species: 'duck', capacity: 50 },
            { species: 'duck', capacity: 50 },
            { species: 'duck', capacity: 50 }
          ]
        },
        goalState: [
          { type: 'flow-optimized', value: true }
        ],
        hints: [
          { level: 1, text: 'Match task types to agent positions' },
          { level: 2, text: 'Route raw→agent1, processed→agent2, finished→agent3' },
          { level: 3, text: 'Each agent handles one material type at 60-80% capacity' }
        ],
        rewards: { experience: 50 }
      },
      dependencies: ['advanced-001-spatial']
    }
  ],
  
  initialState: {
    agents: [
      { id: 'duck-1', species: 'duck', position: { x: 50, y: 200 }, traits: new Map([['speed', 0.7]]) },
      { id: 'duck-2', species: 'duck', position: { x: 200, y: 200 }, traits: new Map([['speed', 0.7]]) },
      { id: 'duck-3', species: 'duck', position: { x: 350, y: 200 }, traits: new Map([['speed', 0.7]]) }
    ],
    resources: { materials: 100, capacity: 150 },
    globalConstraints: [
      { type: 'time-limit', value: 120, unit: 'seconds' }
    ]
  },
  
  goalState: [
    { type: 'complete-all-subpuzzles', value: true },
    { type: 'throughput-met', value: true }
  ],
  
  hints: [
    { level: 1, text: 'First position agents, then route tasks' },
    { level: 2, text: 'Each agent in the chain handles one stage' },
    { level: 3, text: 'Linear chain: source→process→dest with matching task routes' }
  ],
  
  rewards: {
    experience: 200,
    unlocks: ['advanced-002']
  }
};

/**
 * Puzzle 2: Breeding + Routing Factory
 * 
 * Breed specialized agents and route them to appropriate tasks.
 */
export const breedingRoutingFactory: AdvancedPuzzle = {
  id: 'advanced-002',
  name: 'Breeding + Routing Factory',
  type: 'advanced',
  difficulty: 2,
  description: 'Breed agents with specific traits, then route them to matching factory tasks. Traits determine task efficiency.',
  
  constraints: [
    { type: 'trait-matches-task', value: true },
    { type: 'min-efficiency', value: 0.85 },
    { type: 'all-tasks-routed', value: true }
  ],
  
  subPuzzles: [
    {
      type: 'breeding',
      puzzle: {
        id: 'advanced-002-breeding',
        name: 'Breed Factory Workers',
        type: 'breeding',
        difficulty: 2,
        description: 'Breed agents with traits matching factory needs',
        constraints: [
          { type: 'trait-threshold', value: 0.8, trait: 'speed' },
          { type: 'trait-threshold', value: 0.7, trait: 'accuracy' }
        ],
        initialState: {
          parentA: [
            { name: 'speed', value: 0.9 },
            { name: 'accuracy', value: 0.5 },
            { name: 'reliability', value: 0.8 }
          ],
          parentB: [
            { name: 'speed', value: 0.6 },
            { name: 'accuracy', value: 0.9 },
            { name: 'reliability', value: 0.7 }
          ],
          genePool: ['speed', 'accuracy', 'reliability']
        },
        goalState: {
          targetTraits: [
            { name: 'speed', value: 0.8 },
            { name: 'accuracy', value: 0.75 }
          ]
        },
        hints: [
          { level: 1, text: 'Balance inheritance between both parents' },
          { level: 2, text: 'Speed from A, accuracy from B' },
          { level: 3, text: '67% weight on A for speed, 67% on B for accuracy' }
        ],
        rewards: { experience: 75 }
      }
    },
    {
      type: 'routing',
      puzzle: {
        id: 'advanced-002-routing',
        name: 'Route Factory Tasks',
        type: 'routing',
        difficulty: 2,
        description: 'Route tasks to your bred agents based on their traits',
        constraints: [
          { type: 'trait-optimized', value: true },
          { type: 'max-capacity', value: 0.9 }
        ],
        initialState: {
          taskTypes: [
            { type: 'precision-assembly', rate: 50 },
            { type: 'speed-packing', rate: 80 },
            { type: 'quality-check', rate: 30 }
          ],
          availableAgents: [
            { species: 'goat', capacity: 60 },  // High accuracy
            { species: 'goat', capacity: 80 },  // High speed
            { species: 'goat', capacity: 50 }   // Balanced
          ]
        },
        goalState: [
          { type: 'optimal-matching', value: true }
        ],
        hints: [
          { level: 1, text: 'Match task requirements to agent strengths' },
          { level: 2, text: 'Precision→accuracy agent, Speed→speed agent' },
          { level: 3, text: 'precision(50)→agent1(83%), speed(80)→agent2(100%), quality(30)→agent3(60%)' }
        ],
        rewards: { experience: 75 }
      },
      dependencies: ['advanced-002-breeding']
    }
  ],
  
  initialState: {
    agents: [
      { id: 'goat-precision', species: 'goat', position: { x: 100, y: 100 }, traits: new Map([['accuracy', 0.9]]) },
      { id: 'goat-speed', species: 'goat', position: { x: 200, y: 100 }, traits: new Map([['speed', 0.9]]) },
      { id: 'goat-balanced', species: 'goat', position: { x: 150, y: 200 }, traits: new Map([['accuracy', 0.75], ['speed', 0.75]]) }
    ],
    resources: { materials: 200, time: 180 },
    globalConstraints: [
      { type: 'min-quality', value: 0.9 }
    ]
  },
  
  goalState: [
    { type: 'complete-all-subpuzzles', value: true },
    { type: 'efficiency-target', value: 0.85 }
  ],
  
  hints: [
    { level: 1, text: 'Breed first, then route tasks to match traits' },
    { level: 2, text: 'Each agent type excels at different tasks' },
    { level: 3, text: 'Precision tasks need accuracy, speed tasks need speed' }
  ],
  
  rewards: {
    experience: 280,
    unlocks: ['advanced-003']
  }
};

/**
 * Puzzle 3: Multi-Region Coordination
 * 
 * Coordinate agents across multiple regions with spatial positioning.
 */
export const multiRegionCoordination: AdvancedPuzzle = {
  id: 'advanced-003',
  name: 'Multi-Region Coordination',
  type: 'advanced',
  difficulty: 3,
  description: 'Coordinate agents across 3 regions. Position regional leaders and route inter-region tasks.',
  
  constraints: [
    { type: 'region-leaders', value: 3 },
    { type: 'inter-region-sync', value: true },
    { type: 'max-cross-region-latency', value: 50, unit: 'ms' }
  ],
  
  subPuzzles: [
    {
      type: 'spatial',
      puzzle: {
        id: 'advanced-003-spatial',
        name: 'Position Regional Centers',
        type: 'spatial',
        difficulty: 2,
        description: 'Position regional coordination centers optimally',
        constraints: [
          { type: 'min-inter-region-distance', value: 150, unit: 'units' },
          { type: 'region-coverage', value: 0.9 }
        ],
        initialState: {
          mapSize: { width: 600, height: 600 },
          zones: [
            { id: 'region-north', x: 300, y: 100, radius: 80 },
            { id: 'region-west', x: 100, y: 400, radius: 80 },
            { id: 'region-east', x: 500, y: 400, radius: 80 }
          ]
        },
        goalState: [
          { type: 'all-regions-covered', value: true }
        ],
        hints: [
          { level: 1, text: 'Position centers at zone centers' },
          { level: 2, text: 'Three regions need three leaders' },
          { level: 3, text: 'North: (300,100), West: (100,400), East: (500,400)' }
        ],
        rewards: { experience: 100 }
      }
    },
    {
      type: 'coordination',
      puzzle: {
        id: 'advanced-003-coordination',
        name: 'Cross-Region Tasks',
        type: 'coordination',
        difficulty: 3,
        description: 'Coordinate tasks that span multiple regions',
        constraints: [
          { type: 'cross-region-tasks', value: true },
          { type: 'leader-coordination', value: true }
        ],
        initialState: {
          agents: [
            { id: 'falcon-north', species: 'falcon', position: { x: 300, y: 100 } },
            { id: 'falcon-west', species: 'falcon', position: { x: 100, y: 400 } },
            { id: 'falcon-east', species: 'falcon', position: { x: 500, y: 400 } }
          ],
          tasks: [
            { id: 'sync-data', requiredAgents: 3, location: { x: 300, y: 300 } },
            { id: 'north-task', requiredAgents: 1, location: { x: 300, y: 100 } },
            { id: 'west-task', requiredAgents: 1, location: { x: 100, y: 400 } },
            { id: 'east-task', requiredAgents: 1, location: { x: 500, y: 400 } }
          ]
        },
        goalState: [
          { type: 'all-regions-synced', value: true }
        ],
        hints: [
          { level: 1, text: 'Each regional leader handles local tasks' },
          { level: 2, text: 'sync-data requires all three leaders at center' },
          { level: 3, text: 'Leaders meet at center for sync, then return to regions' }
        ],
        rewards: { experience: 150 }
      },
      dependencies: ['advanced-003-spatial']
    }
  ],
  
  initialState: {
    agents: [
      { id: 'falcon-1', species: 'falcon', position: { x: 300, y: 100 }, traits: new Map([['sync', 0.9]]) },
      { id: 'falcon-2', species: 'falcon', position: { x: 100, y: 400 }, traits: new Map([['sync', 0.9]]) },
      { id: 'falcon-3', species: 'falcon', position: { x: 500, y: 400 }, traits: new Map([['sync', 0.9]]) }
    ],
    resources: { bandwidth: 1000, latency: 50 },
    globalConstraints: [
      { type: 'sync-interval', value: 30, unit: 'seconds' }
    ]
  },
  
  goalState: [
    { type: 'complete-all-subpuzzles', value: true },
    { type: 'regions-coordinated', value: true }
  ],
  
  hints: [
    { level: 1, text: 'Position regional centers first, then coordinate' },
    { level: 2, text: 'Falcons are ideal for multi-node sync tasks' },
    { level: 3, text: 'Each region needs a leader that syncs with others' }
  ],
  
  rewards: {
    experience: 350,
    unlocks: ['advanced-004']
  }
};

/**
 * Puzzle 4: Full Ecosystem Simulation
 * 
 * Combine all puzzle types in a complex ecosystem.
 */
export const fullEcosystemSimulation: AdvancedPuzzle = {
  id: 'advanced-004',
  name: 'Full Ecosystem Simulation',
  type: 'advanced',
  difficulty: 4,
  description: 'Manage a complete ranch ecosystem: position agents, breed specialists, route tasks, and coordinate activities.',
  
  constraints: [
    { type: 'complete-all-subpuzzles', value: true },
    { type: 'ecosystem-balance', value: true },
    { type: 'resource-sustainability', value: true }
  ],
  
  subPuzzles: [
    {
      type: 'spatial',
      puzzle: {
        id: 'advanced-004-spatial',
        name: 'Ranch Layout',
        type: 'spatial',
        difficulty: 3,
        description: 'Design the optimal ranch layout with all facilities',
        constraints: [
          { type: 'facility-coverage', value: 0.95 },
          { type: 'path-efficiency', value: 0.8 },
          { type: 'agent-count', value: 8 }
        ],
        initialState: {
          mapSize: { width: 800, height: 600 },
          zones: [
            { id: 'barn', x: 200, y: 300, radius: 60 },
            { id: 'pasture', x: 400, y: 200, radius: 100 },
            { id: 'pond', x: 600, y: 300, radius: 50 },
            { id: 'coop', x: 200, y: 150, radius: 40 }
          ]
        },
        goalState: [
          { type: 'all-facilities-covered', value: true }
        ],
        hints: [
          { level: 1, text: 'Position agents near each facility' },
          { level: 2, text: 'Ensure paths between facilities are covered' },
          { level: 3, text: '2 agents per major facility, overlapping coverage' }
        ],
        rewards: { experience: 100 }
      }
    },
    {
      type: 'breeding',
      puzzle: {
        id: 'advanced-004-breeding',
        name: 'Specialist Breeding',
        type: 'breeding',
        difficulty: 3,
        description: 'Breed agents for specific ranch roles',
        constraints: [
          { type: 'role-traits', value: true },
          { type: 'generations', value: 2 }
        ],
        initialState: {
          parentA: [
            { name: 'speed', value: 0.9 },
            { name: 'endurance', value: 0.7 },
            { name: 'intelligence', value: 0.6 }
          ],
          parentB: [
            { name: 'speed', value: 0.5 },
            { name: 'endurance', value: 0.9 },
            { name: 'intelligence', value: 0.8 }
          ],
          genePool: ['speed', 'endurance', 'intelligence']
        },
        goalState: {
          targetTraits: [
            { name: 'speed', value: 0.75 },
            { name: 'endurance', value: 0.85 },
            { name: 'intelligence', value: 0.75 }
          ]
        },
        hints: [
          { level: 1, text: 'Balance traits across two generations' },
          { level: 2, text: 'First gen focuses on endurance, second adds speed' },
          { level: 3, text: 'Gen 1: 70% B for endurance. Gen 2: Cross with high-speed partner.' }
        ],
        rewards: { experience: 100 }
      }
    },
    {
      type: 'routing',
      puzzle: {
        id: 'advanced-004-routing',
        name: 'Daily Operations',
        type: 'routing',
        difficulty: 3,
        description: 'Route daily ranch tasks efficiently',
        constraints: [
          { type: 'all-tasks-routed', value: true },
          { type: 'max-capacity', value: 0.85 },
          { type: 'time-windows', value: true }
        ],
        initialState: {
          taskTypes: [
            { type: 'feeding', rate: 50 },
            { type: 'monitoring', rate: 100 },
            { type: 'maintenance', rate: 30 },
            { type: 'collection', rate: 40 }
          ],
          availableAgents: [
            { species: 'cattle', capacity: 80 },
            { species: 'horse', capacity: 100 },
            { species: 'goat', capacity: 60 },
            { species: 'duck', capacity: 40 }
          ]
        },
        goalState: [
          { type: 'all-operations-scheduled', value: true }
        ],
        hints: [
          { level: 1, text: 'Match task complexity to agent capability' },
          { level: 2, text: 'Heavy tasks to Cattle, routine to Horse' },
          { level: 3, text: 'feeding→horse(50%), monitoring→duck(100%), maintenance→goat(50%), collection→cattle(50%)' }
        ],
        rewards: { experience: 100 }
      },
      dependencies: ['advanced-004-spatial', 'advanced-004-breeding']
    },
    {
      type: 'coordination',
      puzzle: {
        id: 'advanced-004-coordination',
        name: 'Team Activities',
        type: 'coordination',
        difficulty: 4,
        description: 'Coordinate team activities across the ranch',
        constraints: [
          { type: 'all-tasks-complete', value: true },
          { type: 'no-schedule-conflicts', value: true }
        ],
        initialState: {
          agents: [
            { id: 'cattle-1', species: 'cattle', position: { x: 200, y: 300 } },
            { id: 'horse-1', species: 'horse', position: { x: 400, y: 200 } },
            { id: 'goat-1', species: 'goat', position: { x: 600, y: 300 } },
            { id: 'duck-1', species: 'duck', position: { x: 200, y: 150 } }
          ],
          tasks: [
            { id: 'herding', requiredAgents: 2, location: { x: 400, y: 200 } },
            { id: 'inspection', requiredAgents: 3, location: { x: 200, y: 300 } },
            { id: 'water-management', requiredAgents: 2, location: { x: 600, y: 300 } }
          ]
        },
        goalState: [
          { type: 'all-activities-complete', value: true }
        ],
        hints: [
          { level: 1, text: 'Schedule activities to avoid conflicts' },
          { level: 2, text: 'Some agents participate in multiple activities' },
          { level: 3, text: 'herding: cattle+horse, inspection: cattle+goat+duck, water: horse+goat' }
        ],
        rewards: { experience: 100 }
      },
      dependencies: ['advanced-004-routing']
    }
  ],
  
  initialState: {
    agents: [
      { id: 'cattle-main', species: 'cattle', position: { x: 200, y: 300 }, traits: new Map([['strength', 0.9]]) },
      { id: 'horse-main', species: 'horse', position: { x: 400, y: 200 }, traits: new Map([['speed', 0.85]]) },
      { id: 'goat-main', species: 'goat', position: { x: 600, y: 300 }, traits: new Map([['intelligence', 0.8]]) },
      { id: 'duck-main', species: 'duck', position: { x: 200, y: 150 }, traits: new Map([['alertness', 0.9]]) }
    ],
    resources: { feed: 500, water: 300, energy: 1000 },
    globalConstraints: [
      { type: 'daily-cycle', value: 24, unit: 'hours' },
      { type: 'sustainability', value: true }
    ]
  },
  
  goalState: [
    { type: 'complete-all-subpuzzles', value: true },
    { type: 'ecosystem-thriving', value: true }
  ],
  
  hints: [
    { level: 1, text: 'Complete each sub-puzzle in order. Dependencies matter!' },
    { level: 2, text: 'Spatial → Breeding → Routing → Coordination is the logical flow' },
    { level: 3, text: 'Optimize each step: good positions enable good breeding, which enables routing, enabling coordination' }
  ],
  
  rewards: {
    experience: 500,
    unlocks: ['advanced-005'],
    achievements: ['ecosystem-manager']
  }
};

/**
 * Puzzle 5: Night School Master Challenge
 * 
 * The ultimate challenge combining breeding with advanced coordination.
 */
export const nightSchoolMasterChallenge: AdvancedPuzzle = {
  id: 'advanced-005',
  name: 'Night School Master Challenge',
  type: 'advanced',
  difficulty: 5,
  description: 'Train agents in Night School to exceed genetic limits, then coordinate them for an impossible task. Only a master can succeed!',
  
  constraints: [
    { type: 'trait-exceeds-genetic-max', value: true },
    { type: 'impossible-task', value: true },
    { type: 'perfect-coordination', value: true }
  ],
  
  subPuzzles: [
    {
      type: 'breeding',
      puzzle: {
        id: 'advanced-005-breeding',
        name: 'Elite Breeding',
        type: 'breeding',
        difficulty: 5,
        description: 'Breed agents with near-perfect traits, then enhance in Night School',
        constraints: [
          { type: 'trait-threshold', value: 0.95, trait: 'intelligence' },
          { type: 'trait-threshold', value: 0.9, trait: 'coordination' },
          { type: 'night-school-training', value: 10, unit: 'hours' }
        ],
        initialState: {
          parentA: [
            { name: 'intelligence', value: 0.9 },
            { name: 'coordination', value: 0.7 },
            { name: 'endurance', value: 0.8 }
          ],
          parentB: [
            { name: 'intelligence', value: 0.7 },
            { name: 'coordination', value: 0.95 },
            { name: 'endurance', value: 0.75 }
          ],
          genePool: ['intelligence', 'coordination', 'endurance']
        },
        goalState: {
          targetTraits: [
            { name: 'intelligence', value: 0.95 },
            { name: 'coordination', value: 0.92 }
          ]
        },
        hints: [
          { level: 1, text: 'Breed close to target, then Night School to exceed limits' },
          { level: 2, text: 'Initial breeding: 70% A for intelligence, 80% B for coordination' },
          { level: 3, text: 'Breed for 0.85/0.85 base, Night School adds +0.10/+0.07' }
        ],
        rewards: { experience: 200 }
      }
    },
    {
      type: 'coordination',
      puzzle: {
        id: 'advanced-005-coordination',
        name: 'Impossible Coordination',
        type: 'coordination',
        difficulty: 5,
        description: 'Coordinate elite agents for a task requiring perfect synchronization',
        constraints: [
          { type: 'sync-tolerance', value: 1, unit: 'ms' },
          { type: 'all-agents-required', value: true },
          { type: 'zero-failure', value: true }
        ],
        initialState: {
          agents: [
            { id: 'elite-1', species: 'falcon', position: { x: 100, y: 100 } },
            { id: 'elite-2', species: 'falcon', position: { x: 500, y: 100 } },
            { id: 'elite-3', species: 'falcon', position: { x: 100, y: 500 } },
            { id: 'elite-4', species: 'falcon', position: { x: 500, y: 500 } },
            { id: 'elite-5', species: 'falcon', position: { x: 300, y: 300 } }
          ],
          tasks: [
            { id: 'sync-point', requiredAgents: 5, location: { x: 300, y: 300 } },
            { id: 'precision-op-1', requiredAgents: 2, location: { x: 100, y: 100 } },
            { id: 'precision-op-2', requiredAgents: 2, location: { x: 500, y: 500 } },
            { id: 'final-sync', requiredAgents: 5, location: { x: 300, y: 300 } }
          ]
        },
        goalState: [
          { type: 'perfect-sync-achieved', value: true },
          { type: 'all-precision-ops-complete', value: true }
        ],
        hints: [
          { level: 1, text: 'All agents must meet at center with millisecond precision' },
          { level: 2, text: 'Split for precision ops, then re-sync at center' },
          { level: 3, text: 'All to center (t=0), split to corners (t=100ms), precision ops (t=200ms), return to center (t=300ms)' }
        ],
        rewards: { experience: 200 }
      },
      dependencies: ['advanced-005-breeding']
    }
  ],
  
  initialState: {
    agents: [
      { id: 'falcon-elite-1', species: 'falcon', position: { x: 100, y: 100 }, traits: new Map([['intelligence', 0.95], ['coordination', 0.92]]) },
      { id: 'falcon-elite-2', species: 'falcon', position: { x: 500, y: 100 }, traits: new Map([['intelligence', 0.95], ['coordination', 0.92]]) },
      { id: 'falcon-elite-3', species: 'falcon', position: { x: 100, y: 500 }, traits: new Map([['intelligence', 0.95], ['coordination', 0.92]]) },
      { id: 'falcon-elite-4', species: 'falcon', position: { x: 500, y: 500 }, traits: new Map([['intelligence', 0.95], ['coordination', 0.92]]) },
      { id: 'falcon-elite-5', species: 'falcon', position: { x: 300, y: 300 }, traits: new Map([['intelligence', 0.98], ['coordination', 0.95]]) }
    ],
    resources: { training: 100, sync-precision: 1 },
    globalConstraints: [
      { type: 'night-school-certified', value: true },
      { type: 'master-level', value: true }
    ]
  },
  
  goalState: [
    { type: 'complete-all-subpuzzles', value: true },
    { type: 'master-challenge-complete', value: true },
    { type: 'perfect-score', value: true }
  ],
  
  hints: [
    { level: 1, text: 'This requires mastery of all game mechanics' },
    { level: 2, text: 'Night School training is essential - genetic limits must be exceeded' },
    { level: 3, text: 'Breed 0.85/0.85 base → Night School +0.10/+0.07 → Coordinate with 1ms sync tolerance' }
  ],
  
  rewards: {
    experience: 800,
    unlocks: ['master-tier'],
    achievements: ['night-school-master', 'impossible-coordinator', 'constraint-ranch-legend']
  }
};

export const advancedPuzzles: AdvancedPuzzle[] = [
  supplyChainCoordination,
  breedingRoutingFactory,
  multiRegionCoordination,
  fullEcosystemSimulation,
  nightSchoolMasterChallenge
];
