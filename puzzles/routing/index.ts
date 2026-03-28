// Example routing puzzles for Constraint Ranch

import { RoutingPuzzle } from '../types';

/**
 * Tutorial Puzzle 1: Basic Load Balancing
 * 
 * Route tasks to agents without overloading any single agent.
 */
export const basicLoadBalancing: RoutingPuzzle = {
  id: 'routing-001',
  name: 'Basic Load Balancing',
  type: 'routing',
  difficulty: 1,
  description: 'Route incoming tasks to your agents. No agent should exceed 80% capacity.',
  
  constraints: [
    { type: 'max-capacity', value: 0.8, unit: 'percentage' },
    { type: 'all-tasks-routed', value: true }
  ],
  
  initialState: {
    taskTypes: [
      { type: 'email', rate: 200 },
      { type: 'api-call', rate: 300 },
      { type: 'alert', rate: 100 }
    ],
    availableAgents: [
      { species: 'chicken', capacity: 200 },
      { species: 'duck', capacity: 400 }
    ]
  },
  
  goalState: [
    { type: 'no-overload', value: true },
    { type: 'all-tasks-handled', value: true }
  ],
  
  hints: [
    { level: 1, text: 'Distribute tasks evenly across agents' },
    { level: 2, text: 'Chicken handles alerts (low volume), Duck handles emails and API calls' },
    { level: 3, text: 'Chicken: 100 alerts (50% capacity). Duck: 200 emails + 300 API calls (62.5% capacity)' }
  ],
  
  rewards: {
    experience: 120,
    unlocks: ['routing-002']
  }
};

/**
 * Puzzle 2: Species Specialization
 * 
 * Route tasks based on agent capabilities.
 */
export const speciesSpecialization: RoutingPuzzle = {
  id: 'routing-002',
  name: 'Species Specialization',
  type: 'routing',
  difficulty: 2,
  description: 'Route tasks to the most appropriate agent species based on their specialties.',
  
  constraints: [
    { type: 'optimal-routing', value: true },
    { type: 'max-capacity', value: 0.9, unit: 'percentage' },
    { type: 'min-efficiency', value: 0.85, unit: 'percentage' }
  ],
  
  initialState: {
    taskTypes: [
      { type: 'monitoring', rate: 150 },
      { type: 'api-request', rate: 400 },
      { type: 'debug-log', rate: 250 },
      { type: 'consensus-vote', rate: 100 }
    ],
    availableAgents: [
      { species: 'chicken', capacity: 200 },  // Best for monitoring
      { species: 'duck', capacity: 500 },     // Best for API
      { species: 'goat', capacity: 300 },     // Best for debug
      { species: 'sheep', capacity: 150 }     // Best for consensus
    ]
  },
  
  goalState: [
    { type: 'all-specialized', value: true },
    { type: 'no-overload', value: true }
  ],
  
  hints: [
    { level: 1, text: 'Each species has a specialty - match tasks to specialties' },
    { level: 2, text: 'Chicken→monitoring, Duck→API, Goat→debug, Sheep→consensus' },
    { level: 3, text: 'Route monitoring to Chicken (75% cap), API to Duck (80%), debug to Goat (83%), consensus to Sheep (67%)' }
  ],
  
  rewards: {
    experience: 180,
    unlocks: ['routing-003']
  }
};

/**
 * Puzzle 3: Burst Traffic
 * 
 * Handle sudden traffic spikes with limited agents.
 */
export const burstTraffic: RoutingPuzzle = {
  id: 'routing-003',
  name: 'Burst Traffic',
  type: 'routing',
  difficulty: 3,
  description: 'Handle a traffic spike! Route 2000 tasks/minute using only your available agents.',
  
  constraints: [
    { type: 'max-capacity', value: 0.95, unit: 'percentage' },
    { type: 'min-throughput', value: 2000, unit: 'tasks/min' },
    { type: 'max-latency', value: 100, unit: 'ms' }
  ],
  
  initialState: {
    taskTypes: [
      { type: 'urgent-alert', rate: 500 },
      { type: 'standard-request', rate: 1000 },
      { type: 'background-job', rate: 500 }
    ],
    availableAgents: [
      { species: 'chicken', capacity: 300 },
      { species: 'duck', capacity: 600 },
      { species: 'goat', capacity: 400 },
      { species: 'chicken', capacity: 300 },
      { species: 'duck', capacity: 600 }
    ]
  },
  
  goalState: [
    { type: 'all-tasks-handled', value: true },
    { type: 'urgent-priority', value: true }
  ],
  
  hints: [
    { level: 1, text: 'Prioritize urgent alerts - they must be handled first' },
    { level: 2, text: 'Background jobs can be queued, but standard requests need immediate handling' },
    { level: 3, text: 'Chickens: urgent (500/600 cap). Ducks: standard (1000/1200 cap). Goat: background (500/400 cap - queue 100)' }
  ],
  
  rewards: {
    experience: 250,
    unlocks: ['routing-004']
  }
};

/**
 * Puzzle 4: Multi-Region Routing
 * 
 * Route tasks to agents in different regions.
 */
export const multiRegionRouting: RoutingPuzzle = {
  id: 'routing-004',
  name: 'Multi-Region Routing',
  type: 'routing',
  difficulty: 4,
  description: 'Route tasks to agents across 3 regions while minimizing latency.',
  
  constraints: [
    { type: 'max-latency', value: 50, unit: 'ms' },
    { type: 'region-affinity', value: true },
    { type: 'failover-ready', value: true }
  ],
  
  initialState: {
    taskTypes: [
      { type: 'us-east-request', rate: 400 },
      { type: 'eu-west-request', rate: 300 },
      { type: 'asia-pacific-request', rate: 350 }
    ],
    availableAgents: [
      { species: 'duck', capacity: 500 },   // US-East
      { species: 'duck', capacity: 400 },   // EU-West
      { species: 'duck', capacity: 400 }    // Asia-Pacific
    ]
  },
  
  goalState: [
    { type: 'optimal-latency', value: true },
    { type: 'balanced-regions', value: true }
  ],
  
  hints: [
    { level: 1, text: 'Route requests to agents in the same region for lowest latency' },
    { level: 2, text: 'Keep backup capacity in each region for failover' },
    { level: 3, text: 'US-East: 400/500 (80%). EU-West: 300/400 (75%). APAC: 350/400 (87.5%)' }
  ],
  
  rewards: {
    experience: 300,
    unlocks: ['routing-005']
  }
};

/**
 * Puzzle 5: Cost Optimization
 * 
 * Route tasks while minimizing operational cost.
 */
export const costOptimization: RoutingPuzzle = {
  id: 'routing-005',
  name: 'Cost Optimization',
  type: 'routing',
  difficulty: 5,
  description: 'Route 3000 tasks/minute while keeping operational costs under budget.',
  
  constraints: [
    { type: 'max-cost', value: 100, unit: 'credits/hour' },
    { type: 'min-throughput', value: 3000, unit: 'tasks/min' },
    { type: 'min-reliability', value: 0.99, unit: 'percentage' }
  ],
  
  initialState: {
    taskTypes: [
      { type: 'batch-process', rate: 1500 },
      { type: 'realtime-api', rate: 1000 },
      { type: 'scheduled-job', rate: 500 }
    ],
    availableAgents: [
      { species: 'cattle', capacity: 800 },   // Cost: 30 credits/hr
      { species: 'horse', capacity: 600 },    // Cost: 25 credits/hr
      { species: 'duck', capacity: 500 },     // Cost: 15 credits/hr
      { species: 'chicken', capacity: 200 }   // Cost: 5 credits/hr
    ]
  },
  
  goalState: [
    { type: 'under-budget', value: true },
    { type: 'all-tasks-handled', value: true },
    { type: 'sla-met', value: true }
  ],
  
  hints: [
    { level: 1, text: 'Balance cost vs capability. Cattle are expensive but powerful.' },
    { level: 2, text: 'Use cheaper agents for non-critical tasks' },
    { level: 3, text: 'Cattle: realtime (1000/800, slight overflow to Horse). Horse: batch (900/600). Duck: batch remainder (600/500). Chicken: scheduled (500/200, queue non-urgent)' }
  ],
  
  rewards: {
    experience: 400,
    unlocks: ['breeding-puzzles'],
    achievements: ['routing-master']
  }
};

export const routingPuzzles: RoutingPuzzle[] = [
  basicLoadBalancing,
  speciesSpecialization,
  burstTraffic,
  multiRegionRouting,
  costOptimization
];
