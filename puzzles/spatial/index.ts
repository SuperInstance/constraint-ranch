// Example spatial puzzles for Constraint Ranch

import { SpatialPuzzle } from '../types';

/**
 * Tutorial Puzzle 1: Coverage Optimization
 * 
 * Teach players the basics of positioning agents on the map.
 * Goal: Cover 95% of the monitoring zone with 3 Chicken agents.
 */
export const coverageOptimization: SpatialPuzzle = {
  id: 'spatial-001',
  name: 'Coverage Optimization',
  type: 'spatial',
  difficulty: 1,
  description: 'Position 3 Chicken agents to cover 95% of the monitoring zone. Learn the basics of agent placement!',
  
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
    { level: 2, text: 'Use Dodecet coordinates for exact placement - (100, 100), (250, 300), (400, 150)' },
    { level: 3, text: 'Place agents at the center of each zone for optimal coverage' }
  ],
  
  rewards: {
    experience: 100,
    unlocks: ['spatial-002', 'routing-puzzles'],
    achievements: ['first-puzzle']
  }
};

/**
 * Puzzle 2: Triangle Formation
 * 
 * Position agents in a perfect equilateral triangle.
 * Teaches exact geometric calculations.
 */
export const triangleFormation: SpatialPuzzle = {
  id: 'spatial-002',
  name: 'Triangle Formation',
  type: 'spatial',
  difficulty: 2,
  description: 'Position 3 agents to form a perfect equilateral triangle with side length exactly 100 units.',
  
  constraints: [
    { type: 'side-length', value: 100, unit: 'units' },
    { type: 'equilateral', value: true },
    { type: 'agent-count', value: 3, unit: 'agents' }
  ],
  
  initialState: {
    mapSize: { width: 400, height: 400 },
    zones: []
  },
  
  goalState: [
    { type: 'triangle-valid', value: true },
    { type: 'side-length-match', value: 100, unit: 'units' }
  ],
  
  hints: [
    { level: 1, text: 'An equilateral triangle has three equal sides' },
    { level: 2, text: 'The height of an equilateral triangle is side × √3/2' },
    { level: 3, text: 'Try positions: (200, 100), (150, 100 + 50√3), (250, 100 + 50√3)' }
  ],
  
  rewards: {
    experience: 150,
    unlocks: ['spatial-003']
  }
};

/**
 * Puzzle 3: Perimeter Defense
 * 
 * Position agents along the perimeter of a region.
 */
export const perimeterDefense: SpatialPuzzle = {
  id: 'spatial-003',
  name: 'Perimeter Defense',
  type: 'spatial',
  difficulty: 3,
  description: 'Position 5 agents around a circular region with radius 200. Each agent must be exactly on the perimeter and evenly spaced.',
  
  constraints: [
    { type: 'on-perimeter', value: true },
    { type: 'even-spacing', value: true },
    { type: 'agent-count', value: 5, unit: 'agents' }
  ],
  
  initialState: {
    mapSize: { width: 600, height: 600 },
    zones: [
      { id: 'center-region', x: 300, y: 300, radius: 200 }
    ]
  },
  
  goalState: [
    { type: 'perimeter-coverage', value: 1.0, unit: 'percentage' },
    { type: 'equal-angular-spacing', value: 72, unit: 'degrees' }
  ],
  
  hints: [
    { level: 1, text: '5 agents evenly spaced means 360°/5 = 72° apart' },
    { level: 2, text: 'Use polar coordinates: x = cx + r×cos(θ), y = cy + r×sin(θ)' },
    { level: 3, text: 'Angles: 0°, 72°, 144°, 216°, 288° from center (300, 300)' }
  ],
  
  rewards: {
    experience: 200,
    unlocks: ['spatial-004']
  }
};

/**
 * Puzzle 4: Hexagonal Grid
 * 
 * Position agents in a hexagonal grid pattern.
 */
export const hexagonalGrid: SpatialPuzzle = {
  id: 'spatial-004',
  name: 'Hexagonal Grid',
  type: 'spatial',
  difficulty: 4,
  description: 'Position 7 agents to form a hexagonal grid with center point. Each agent should be exactly 50 units from its neighbors.',
  
  constraints: [
    { type: 'hexagonal-pattern', value: true },
    { type: 'neighbor-distance', value: 50, unit: 'units' },
    { type: 'agent-count', value: 7, unit: 'agents' }
  ],
  
  initialState: {
    mapSize: { width: 500, height: 500 },
    zones: []
  },
  
  goalState: [
    { type: 'hexagon-valid', value: true },
    { type: 'all-distances-correct', value: 50, unit: 'units' }
  ],
  
  hints: [
    { level: 1, text: 'A hexagonal grid has 6 points around a center' },
    { level: 2, text: 'Points at 60° intervals from center' },
    { level: 3, text: 'Center at (250, 250), others at angle × 50 distance' }
  ],
  
  rewards: {
    experience: 250,
    unlocks: ['spatial-005']
  }
};

/**
 * Puzzle 5: Overlapping Zones
 * 
 * Maximize coverage while minimizing overlap.
 */
export const overlappingZones: SpatialPuzzle = {
  id: 'spatial-005',
  name: 'Minimize Overlap',
  type: 'spatial',
  difficulty: 5,
  description: 'Position 4 agents to cover 4 zones. Minimize overlap while ensuring all zones are covered.',
  
  constraints: [
    { type: 'max-overlap', value: 0.1, unit: 'percentage' },
    { type: 'all-zones-covered', value: true },
    { type: 'agent-count', value: 4, unit: 'agents' }
  ],
  
  initialState: {
    mapSize: { width: 600, height: 600 },
    zones: [
      { id: 'zone-nw', x: 100, y: 100, radius: 80 },
      { id: 'zone-ne', x: 500, y: 100, radius: 80 },
      { id: 'zone-sw', x: 100, y: 500, radius: 80 },
      { id: 'zone-se', x: 500, y: 500, radius: 80 }
    ]
  },
  
  goalState: [
    { type: 'coverage', value: 1.0, unit: 'percentage' },
    { type: 'overlap-below', value: 0.1, unit: 'percentage' }
  ],
  
  hints: [
    { level: 1, text: 'Each agent should primarily cover one zone' },
    { level: 2, text: 'Position agents near zone centers to minimize overlap' },
    { level: 3, text: 'Place agents at zone centers: (100, 100), (500, 100), (100, 500), (500, 500)' }
  ],
  
  rewards: {
    experience: 300,
    unlocks: ['routing-puzzles'],
    achievements: ['spatial-master']
  }
};

export const spatialPuzzles: SpatialPuzzle[] = [
  coverageOptimization,
  triangleFormation,
  perimeterDefense,
  hexagonalGrid,
  overlappingZones
];
