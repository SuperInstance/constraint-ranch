// Main puzzle index - exports all puzzles

export * from './types';
export { spatialPuzzles } from './spatial';
export { routingPuzzles } from './routing';
export { breedingPuzzles } from './breeding';

// All puzzles combined
import { spatialPuzzles } from './spatial';
import { routingPuzzles } from './routing';
import { breedingPuzzles } from './breeding';
import { ConstraintPuzzle } from './types';

export const allPuzzles: ConstraintPuzzle[] = [
  ...spatialPuzzles,
  ...routingPuzzles,
  ...breedingPuzzles
];

// Puzzle count by type
export const puzzleCounts = {
  spatial: spatialPuzzles.length,
  routing: routingPuzzles.length,
  breeding: breedingPuzzles.length,
  total: allPuzzles.length
};
