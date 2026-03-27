// Puzzle type definitions for Constraint Ranch

export type PuzzleType = 'spatial' | 'routing' | 'breeding' | 'coordination' | 'advanced';

export interface Constraint {
  type: string;
  value: number | string;
  unit?: string;
}

export interface Zone {
  id: string;
  x: number;
  y: number;
  radius: number;
}

export interface MapSize {
  width: number;
  height: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface Trait {
  name: string;
  value: number;
}

export interface AgentSpecies {
  id: string;
  name: string;
  emoji: string;
  size: string;
  specialty: string;
  traits: Record<string, [number, number]>;
}

export interface PuzzleRewards {
  experience: number;
  unlocks?: string[];
  achievements?: string[];
}

export interface Hint {
  level: number; // 1-3, progressively revealing
  text: string;
}

export interface BasePuzzle {
  id: string;
  name: string;
  type: PuzzleType;
  difficulty: number; // 1-5
  description: string;
  constraints: Constraint[];
  hints: Hint[];
  rewards: PuzzleRewards;
}

export interface SpatialPuzzle extends BasePuzzle {
  type: 'spatial';
  initialState: {
    mapSize: MapSize;
    zones: Zone[];
    obstacles?: Position[];
  };
  goalState: Constraint[];
  timeLimit?: number; // seconds
}

export interface RoutingPuzzle extends BasePuzzle {
  type: 'routing';
  initialState: {
    taskTypes: Array<{
      type: string;
      rate: number; // tasks per minute
    }>;
    availableAgents: Array<{
      species: string;
      capacity: number;
    }>;
  };
  goalState: Constraint[];
}

export interface BreedingPuzzle extends BasePuzzle {
  type: 'breeding';
  initialState: {
    parentA: Trait[];
    parentB: Trait[];
    genePool: string[];
  };
  goalState: {
    targetTraits: Trait[];
  };
}

export interface CoordinationPuzzle extends BasePuzzle {
  type: 'coordination';
  initialState: {
    agents: Array<{
      id: string;
      species: string;
      position: Position;
    }>;
    tasks: Array<{
      id: string;
      requiredAgents: number;
      location: Position;
    }>;
  };
  goalState: Constraint[];
}

export interface AdvancedPuzzle extends BasePuzzle {
  type: 'advanced';
  subPuzzles: Array<{
    type: PuzzleType;
    puzzle: ConstraintPuzzle;
    dependencies?: string[];
  }>;
  initialState: {
    agents: Array<{
      id: string;
      species: string;
      position: Position;
      traits: Map<string, number>;
    }>;
    resources: Record<string, number>;
    globalConstraints: Constraint[];
  };
  goalState: Constraint[];
}

export type ConstraintPuzzle = 
  | SpatialPuzzle 
  | RoutingPuzzle 
  | BreedingPuzzle 
  | CoordinationPuzzle
  | AdvancedPuzzle;
