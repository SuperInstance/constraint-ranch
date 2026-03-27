// Coordination puzzles for Constraint Ranch
// These puzzles teach multi-agent coordination and distributed systems concepts

import { CoordinationPuzzle } from '../types';

/**
 * Tutorial Puzzle 1: Synchronized Start
 * 
 * Learn to coordinate agents starting at the same time.
 * Teaches basic synchronization concepts.
 */
export const synchronizedStart: CoordinationPuzzle = {
  id: 'coordination-001',
  name: 'Synchronized Start',
  type: 'coordination',
  difficulty: 1,
  description: 'Three agents must start their tasks simultaneously. Ensure they all begin at exactly the same moment.',
  
  constraints: [
    { type: 'sync-required', value: true },
    { type: 'max-start-delay', value: 0, unit: 'ms' },
    { type: 'all-tasks-complete', value: true }
  ],
  
  initialState: {
    agents: [
      { id: 'agent-1', species: 'chicken', position: { x: 100, y: 100 } },
      { id: 'agent-2', species: 'chicken', position: { x: 200, y: 100 } },
      { id: 'agent-3', species: 'chicken', position: { x: 150, y: 200 } }
    ],
    tasks: [
      { id: 'task-1', requiredAgents: 1, location: { x: 300, y: 100 } },
      { id: 'task-2', requiredAgents: 1, location: { x: 300, y: 200 } },
      { id: 'task-3', requiredAgents: 1, location: { x: 300, y: 300 } }
    ]
  },
  
  goalState: [
    { type: 'sync-achieved', value: true },
    { type: 'all-tasks-complete', value: true }
  ],
  
  hints: [
    { level: 1, text: 'All agents must receive the start signal at the same time' },
    { level: 2, text: 'Use a broadcast message to synchronize all agents' },
    { level: 3, text: 'Send a single "start" command to all agents simultaneously' }
  ],
  
  rewards: {
    experience: 120,
    unlocks: ['coordination-002']
  }
};

/**
 * Puzzle 2: Multi-Agent Task
 * 
 * Coordinate multiple agents to complete a single task together.
 */
export const multiAgentTask: CoordinationPuzzle = {
  id: 'coordination-002',
  name: 'Multi-Agent Task',
  type: 'coordination',
  difficulty: 2,
  description: 'A large task requires 3 agents working together. Position them optimally and coordinate their efforts.',
  
  constraints: [
    { type: 'min-agents-per-task', value: 3 },
    { type: 'max-distance-to-task', value: 50, unit: 'units' },
    { type: 'all-tasks-complete', value: true }
  ],
  
  initialState: {
    agents: [
      { id: 'duck-1', species: 'duck', position: { x: 50, y: 50 } },
      { id: 'duck-2', species: 'duck', position: { x: 150, y: 50 } },
      { id: 'duck-3', species: 'duck', position: { x: 100, y: 150 } },
      { id: 'duck-4', species: 'duck', position: { x: 200, y: 150 } }
    ],
    tasks: [
      { id: 'heavy-task', requiredAgents: 3, location: { x: 250, y: 100 } }
    ]
  },
  
  goalState: [
    { type: 'task-completed', taskId: 'heavy-task' },
    { type: 'agents-coordinated', value: true }
  ],
  
  hints: [
    { level: 1, text: 'Select 3 agents and move them close to the task location' },
    { level: 2, text: 'All participating agents must be within 50 units of the task' },
    { level: 3, text: 'Use duck-1, duck-2, and duck-3. Position them at (200, 100), (250, 100), (300, 100)' }
  ],
  
  rewards: {
    experience: 180,
    unlocks: ['coordination-003']
  }
};

/**
 * Puzzle 3: Leader Election
 * 
 * Designate a leader agent to coordinate the team.
 */
export const leaderElection: CoordinationPuzzle = {
  id: 'coordination-003',
  name: 'Leader Election',
  type: 'coordination',
  difficulty: 3,
  description: 'Designate one agent as the leader who will coordinate all other agents. The leader must be able to communicate with all followers.',
  
  constraints: [
    { type: 'leader-designated', value: true },
    { type: 'max-leader-follower-distance', value: 100, unit: 'units' },
    { type: 'all-tasks-complete', value: true }
  ],
  
  initialState: {
    agents: [
      { id: 'sheep-1', species: 'sheep', position: { x: 100, y: 100 } },
      { id: 'sheep-2', species: 'sheep', position: { x: 200, y: 200 } },
      { id: 'sheep-3', species: 'sheep', position: { x: 300, y: 100 } },
      { id: 'sheep-4', species: 'sheep', position: { x: 200, y: 300 } }
    ],
    tasks: [
      { id: 'consensus-vote', requiredAgents: 4, location: { x: 200, y: 200 } }
    ]
  },
  
  goalState: [
    { type: 'leader-elected', value: true },
    { type: 'consensus-reached', value: true }
  ],
  
  hints: [
    { level: 1, text: 'Choose a central agent as leader - they can reach all others' },
    { level: 2, text: 'The leader should be at position (200, 200) to reach all followers' },
    { level: 3, text: 'Designate sheep-2 as leader. All followers are within 141 units (diagonal distance)' }
  ],
  
  rewards: {
    experience: 220,
    unlocks: ['coordination-004']
  }
};

/**
 * Puzzle 4: Conflict Resolution
 * 
 * Resolve resource conflicts between agents.
 */
export const conflictResolution: CoordinationPuzzle = {
  id: 'coordination-004',
  name: 'Conflict Resolution',
  type: 'coordination',
  difficulty: 4,
  description: 'Two agents need access to the same resource. Coordinate their access to prevent collision and ensure both complete their tasks.',
  
  constraints: [
    { type: 'no-collision', value: true },
    { type: 'no-resource-conflict', value: true },
    { type: 'all-tasks-complete', value: true },
    { type: 'max-time', value: 30, unit: 'seconds' }
  ],
  
  initialState: {
    agents: [
      { id: 'goat-1', species: 'goat', position: { x: 50, y: 150 } },
      { id: 'goat-2', species: 'goat', position: { x: 350, y: 150 } }
    ],
    tasks: [
      { id: 'shared-resource', requiredAgents: 1, location: { x: 200, y: 150 } },
      { id: 'task-north', requiredAgents: 1, location: { x: 200, y: 50 } },
      { id: 'task-south', requiredAgents: 1, location: { x: 200, y: 250 } }
    ]
  },
  
  goalState: [
    { type: 'all-tasks-complete', value: true },
    { type: 'no-conflicts', value: true }
  ],
  
  hints: [
    { level: 1, text: 'Schedule agents so they don\'t access the shared resource at the same time' },
    { level: 2, text: 'One agent uses the resource first, then moves away. The other follows.' },
    { level: 3, text: 'Goat-1: shared-resource → task-north. Goat-2: wait → shared-resource → task-south' }
  ],
  
  rewards: {
    experience: 280,
    unlocks: ['coordination-005']
  }
};

/**
 * Puzzle 5: Distributed Consensus
 * 
 * Achieve consensus among multiple agents using the Raft algorithm.
 */
export const distributedConsensus: CoordinationPuzzle = {
  id: 'coordination-005',
  name: 'Distributed Consensus',
  type: 'coordination',
  difficulty: 5,
  description: 'Coordinate 5 Sheep agents to achieve consensus on a decision. Implement leader election, log replication, and commit.',
  
  constraints: [
    { type: 'quorum-reached', value: 3 },
    { type: 'leader-elected', value: true },
    { type: 'log-replicated', value: true },
    { type: 'all-tasks-complete', value: true }
  ],
  
  initialState: {
    agents: [
      { id: 'sheep-alpha', species: 'sheep', position: { x: 150, y: 150 } },
      { id: 'sheep-beta', species: 'sheep', position: { x: 250, y: 150 } },
      { id: 'sheep-gamma', species: 'sheep', position: { x: 150, y: 250 } },
      { id: 'sheep-delta', species: 'sheep', position: { x: 250, y: 250 } },
      { id: 'sheep-epsilon', species: 'sheep', position: { x: 200, y: 200 } }
    ],
    tasks: [
      { id: 'consensus-decision', requiredAgents: 5, location: { x: 200, y: 200 } },
      { id: 'replication-check', requiredAgents: 3, location: { x: 200, y: 100 } },
      { id: 'commit-log', requiredAgents: 3, location: { x: 200, y: 300 } }
    ]
  },
  
  goalState: [
    { type: 'consensus-achieved', value: true },
    { type: 'majority-agreement', value: 3 },
    { type: 'all-nodes-synced', value: true }
  ],
  
  hints: [
    { level: 1, text: 'First elect a leader (sheep-epsilon is central). Then replicate the decision to a majority.' },
    { level: 2, text: 'Leader sends AppendEntries to all followers. Need 3 confirmations for quorum.' },
    { level: 3, text: '1) sheep-epsilon becomes leader. 2) Broadcast decision. 3) Wait for 2 acknowledgments. 4) Commit.' }
  ],
  
  rewards: {
    experience: 400,
    unlocks: ['advanced-puzzles'],
    achievements: ['coordination-master']
  }
};

export const coordinationPuzzles: CoordinationPuzzle[] = [
  synchronizedStart,
  multiAgentTask,
  leaderElection,
  conflictResolution,
  distributedConsensus
];
