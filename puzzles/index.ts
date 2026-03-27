// Main puzzle index - exports all puzzles

export * from './types';
export { spatialPuzzles } from './spatial';
export { routingPuzzles } from './routing';
export { breedingPuzzles } from './breeding';
export { coordinationPuzzles } from './coordination';
export { advancedPuzzles } from './advanced';

// All puzzles combined
import { spatialPuzzles } from './spatial';
import { routingPuzzles } from './routing';
import { breedingPuzzles } from './breeding';
import { coordinationPuzzles } from './coordination';
import { advancedPuzzles } from './advanced';
import { ConstraintPuzzle } from './types';

export const allPuzzles: ConstraintPuzzle[] = [
  ...spatialPuzzles,
  ...routingPuzzles,
  ...breedingPuzzles,
  ...coordinationPuzzles,
  ...advancedPuzzles
];

// Puzzle count by type
export const puzzleCounts = {
  spatial: spatialPuzzles.length,
  routing: routingPuzzles.length,
  breeding: breedingPuzzles.length,
  coordination: coordinationPuzzles.length,
  advanced: advancedPuzzles.length,
  total: allPuzzles.length
};
