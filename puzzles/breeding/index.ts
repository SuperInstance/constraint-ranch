// Example breeding puzzles for Constraint Ranch

import { BreedingPuzzle } from '../types';

/**
 * Tutorial Puzzle 1: Basic Inheritance
 * 
 * Learn how traits are inherited from parents.
 */
export const basicInheritance: BreedingPuzzle = {
  id: 'breeding-001',
  name: 'Basic Inheritance',
  type: 'breeding',
  difficulty: 1,
  description: 'Breed a Chicken with high politeness. One parent is very polite, the other is moderately polite.',
  
  constraints: [
    { type: 'trait-threshold', value: 0.8, trait: 'polite' },
    { type: 'species', value: 'chicken' }
  ],
  
  initialState: {
    parentA: [
      { name: 'polite', value: 0.9 },
      { name: 'concise', value: 0.5 },
      { name: 'technical', value: 0.3 }
    ],
    parentB: [
      { name: 'polite', value: 0.7 },
      { name: 'concise', value: 0.8 },
      { name: 'technical', value: 0.6 }
    ],
    genePool: ['polite', 'concise', 'technical']
  },
  
  goalState: {
    targetTraits: [
      { name: 'polite', value: 0.8 }
    ]
  },
  
  hints: [
    { level: 1, text: 'Offspring traits are a weighted average of parents' },
    { level: 2, text: 'You can bias inheritance toward one parent' },
    { level: 3, text: 'Use 75% weight on Parent A for politeness: 0.9×0.75 + 0.7×0.25 = 0.85' }
  ],
  
  rewards: {
    experience: 100,
    unlocks: ['breeding-002']
  }
};

/**
 * Puzzle 2: Target Trait Match
 * 
 * Create an agent matching specific trait requirements.
 */
export const targetTraitMatch: BreedingPuzzle = {
  id: 'breeding-002',
  name: 'Target Trait Match',
  type: 'breeding',
  difficulty: 2,
  description: 'Breed an agent with: polite=0.85, concise=0.75, technical=0.50',
  
  constraints: [
    { type: 'trait-match', trait: 'polite', tolerance: 0.05 },
    { type: 'trait-match', trait: 'concise', tolerance: 0.05 },
    { type: 'trait-match', trait: 'technical', tolerance: 0.05 }
  ],
  
  initialState: {
    parentA: [
      { name: 'polite', value: 0.9 },
      { name: 'concise', value: 0.6 },
      { name: 'technical', value: 0.8 }
    ],
    parentB: [
      { name: 'polite', value: 0.8 },
      { name: 'concise', value: 0.9 },
      { name: 'technical', value: 0.2 }
    ],
    genePool: ['polite', 'concise', 'technical']
  },
  
  goalState: {
    targetTraits: [
      { name: 'polite', value: 0.85 },
      { name: 'concise', value: 0.75 },
      { name: 'technical', value: 0.50 }
    ]
  },
  
  hints: [
    { level: 1, text: 'Each trait can have different inheritance weights' },
    { level: 2, text: 'Solve the system: weight×A + (1-weight)×B = target' },
    { level: 3, text: 'Polite: 50% each. Concise: 75% B. Technical: 50% each.' }
  ],
  
  rewards: {
    experience: 150,
    unlocks: ['breeding-003']
  }
};

/**
 * Puzzle 3: Dominant and Recessive Genes
 * 
 * Introduces gene dominance concepts.
 */
export const dominantRecessive: BreedingPuzzle = {
  id: 'breeding-003',
  name: 'Dominant & Recessive',
  type: 'breeding',
  difficulty: 3,
  description: 'Breed an agent with a recessive trait expression. The "fast-response" trait is recessive.',
  
  constraints: [
    { type: 'trait-expression', trait: 'fast-response', expression: 'recessive' },
    { type: 'trait-value', trait: 'fast-response', value: 0.9 }
  ],
  
  initialState: {
    parentA: [
      { name: 'fast-response', value: 0.9 },  // Homozygous dominant
      { name: 'accuracy', value: 0.7 }
    ],
    parentB: [
      { name: 'fast-response', value: 0.5 },  // Heterozygous
      { name: 'accuracy', value: 0.8 }
    ],
    genePool: ['fast-response', 'accuracy']
  },
  
  goalState: {
    targetTraits: [
      { name: 'fast-response', value: 0.9 }
    ]
  },
  
  hints: [
    { level: 1, text: 'Recessive traits only express when inherited from both parents' },
    { level: 2, text: 'Select the recessive gene variant during breeding' },
    { level: 3, text: 'Choose the recessive allele from Parent A and the hidden recessive from Parent B' }
  ],
  
  rewards: {
    experience: 200,
    unlocks: ['breeding-004']
  }
};

/**
 * Puzzle 4: Multi-Generational Breeding
 * 
 * Breed across multiple generations.
 */
export const multiGenerational: BreedingPuzzle = {
  id: 'breeding-004',
  name: 'Multi-Generational',
  type: 'breeding',
  difficulty: 4,
  description: 'Create the perfect agent through two generations of breeding.',
  
  constraints: [
    { type: 'generations', value: 2 },
    { type: 'final-traits', tolerance: 0.03 }
  ],
  
  initialState: {
    parentA: [
      { name: 'polite', value: 0.95 },
      { name: 'technical', value: 0.4 },
      { name: 'speed', value: 0.6 }
    ],
    parentB: [
      { name: 'polite', value: 0.3 },
      { name: 'technical', value: 0.9 },
      { name: 'speed', value: 0.8 }
    ],
    genePool: ['polite', 'technical', 'speed']
  },
  
  goalState: {
    targetTraits: [
      { name: 'polite', value: 0.9 },
      { name: 'technical', value: 0.85 },
      { name: 'speed', value: 0.75 }
    ]
  },
  
  hints: [
    { level: 1, text: 'First generation: focus on combining traits. Second: refine.' },
    { level: 2, text: 'Gen 1: Get polite and technical high. Gen 2: Add speed.' },
    { level: 3, text: 'Gen 1: 80% A for polite, 80% B for technical. Gen 2: Breed with high-speed partner.' }
  ],
  
  rewards: {
    experience: 300,
    unlocks: ['breeding-005']
  }
};

/**
 * Puzzle 5: Night School Breeding
 * 
 * Advanced breeding with mutation.
 */
export const nightSchoolBreeding: BreedingPuzzle = {
  id: 'breeding-005',
  name: 'Night School Breeding',
  type: 'breeding',
  difficulty: 5,
  description: 'Use Night School to train an agent with a trait beyond parent limits.',
  
  constraints: [
    { type: 'trait-exceeds-parents', trait: 'accuracy' },
    { type: 'min-training-time', value: 8, unit: 'hours' }
  ],
  
  initialState: {
    parentA: [
      { name: 'accuracy', value: 0.85 },
      { name: 'speed', value: 0.7 },
      { name: 'reliability', value: 0.9 }
    ],
    parentB: [
      { name: 'accuracy', value: 0.8 },
      { name: 'speed', value: 0.9 },
      { name: 'reliability', value: 0.7 }
    ],
    genePool: ['accuracy', 'speed', 'reliability']
  },
  
  goalState: {
    targetTraits: [
      { name: 'accuracy', value: 0.95 },  // Exceeds both parents!
      { name: 'speed', value: 0.85 },
      { name: 'reliability', value: 0.85 }
    ]
  },
  
  hints: [
    { level: 1, text: 'Night School can boost traits beyond genetic limits' },
    { level: 2, text: 'Focus training on accuracy. Balance speed and reliability through breeding.' },
    { level: 3, text: 'Breed for speed=0.85 and reliability=0.85. Train accuracy from 0.82 to 0.95 in Night School.' }
  ],
  
  rewards: {
    experience: 500,
    unlocks: ['coordination-puzzles'],
    achievements: ['master-breeder']
  }
};

export const breedingPuzzles: BreedingPuzzle[] = [
  basicInheritance,
  targetTraitMatch,
  dominantRecessive,
  multiGenerational,
  nightSchoolBreeding
];
