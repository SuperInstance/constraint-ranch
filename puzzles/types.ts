// Puzzle type definitions for Constraint Ranch
// See docs/SCHEMA.md for complete JSON Schema specification

export type PuzzleType = 'spatial' | 'routing' | 'breeding' | 'coordination' | 'advanced';

export type ConstraintUnit = 
  | 'units' 
  | 'percentage' 
  | 'ms' 
  | 'seconds' 
  | 'agents' 
  | 'tasks/min' 
  | 'credits/hour' 
  | 'degrees' 
  | 'hours' 
  | 'items/min';

export type GeneExpression = 'dominant' | 'recessive' | 'additive';

export interface Constraint {
  type: string;
  value: number | string | boolean;
  unit?: ConstraintUnit;
  /** Trait name for trait-specific constraints */
  trait?: string;
  /** Acceptable deviation from value (0-1) */
  tolerance?: number;
  /** Gene expression type for breeding constraints */
  expression?: GeneExpression;
  /** Resource name for resource constraints */
  resource?: string;
  /** Task ID reference for task-specific constraints */
  taskId?: string;
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

// ============================================================================
// Agent Species Types (matches docs/SCHEMA.md AgentSpecies)
// ============================================================================

export type SpeciesId = 'chicken' | 'duck' | 'goat' | 'sheep' | 'cattle' | 'horse' | 'falcon' | 'hog';

export interface TraitRange {
  min: number;
  max: number;
  description?: string;
}

export interface AgentSpecies {
  id: SpeciesId;
  name: string;
  emoji: string;
  size: string;
  specialty: string;
  tier: 1 | 2 | 3 | 4;
  unlockLevel: number;
  maxAgents: number; // -1 for unlimited
  traits: Record<string, TraitRange>;
  bestFor?: string[];
}

// ============================================================================
// Breeding Outcome Types (matches docs/SCHEMA.md BreedingOutcome)
// ============================================================================

export type GeneType = 'additive' | 'dominant' | 'recessive';

export type InheritanceMethod = 
  | 'weighted-average' 
  | 'dominant-selection' 
  | 'recessive-expression' 
  | 'night-school-trained';

export interface TraitOutcome {
  name: string;
  value: number;
  geneType: GeneType;
  inheritanceMethod: InheritanceMethod;
  parentAContribution?: number;
  parentBContribution?: number;
  weight?: number;
  nightSchoolBonus?: number;
}

export interface BreedingParent {
  id: string;
  species: SpeciesId;
  traits: Trait[];
}

export interface BreedingOffspring {
  id: string;
  species: SpeciesId | 'hybrid';
  hybrid: boolean;
  parentSpecies?: [SpeciesId, SpeciesId];
  traits: TraitOutcome[];
  size?: string;
  specialty?: string;
}

export interface BreedingOutcome {
  parents: {
    parentA: BreedingParent;
    parentB: BreedingParent;
  };
  offspring: BreedingOffspring;
  generation: number;
  mutation?: {
    occurred: boolean;
    trait?: string;
    delta?: number;
  };
  nightSchoolApplied: boolean;
  calculationTimestamp: string;
}

// ============================================================================
// Scoring Types (matches docs/SCHEMA.md PuzzleScore)
// ============================================================================

export interface ScoreMultiplier {
  name: string;
  multiplier: number;
  applied: boolean;
  reason?: string;
}

export interface ScoreBreakdown {
  timeTakenMs: number;
  hintsUsed: number;
  constraintsVerified: Array<{
    constraint: string;
    satisfied: boolean;
    value: number | boolean | string;
  }>;
  solutionQuality: number;
}

export interface PuzzleScore {
  puzzleId: string;
  playerId?: string;
  attemptNumber: number;
  baseScore: {
    difficulty: number;
    baseXP: number;
  };
  multipliers: ScoreMultiplier[];
  bonuses: {
    firstAttempt?: { applied: boolean; multiplier: 1.5 };
    speedBonus?: { applied: boolean; timeRatio: number; multiplier: number };
    noHints?: { applied: boolean; multiplier: 1.2 };
    perfectSolution?: { applied: boolean; multiplier: 1.5 };
    dailyStreak?: { applied: boolean; streakDays: number; multiplier: 1.25 };
  };
  penalties: {
    hintLevel1?: { applied: boolean; multiplier: 0.9 };
    hintLevel2?: { applied: boolean; multiplier: 0.75 };
    hintLevel3?: { applied: boolean; multiplier: 0.5 };
    exceededTime?: { applied: boolean; multiplier: 0.8 };
  };
  breakdown: ScoreBreakdown;
  finalScore: number;
  experienceEarned: number;
  creditsEarned: number;
  completionTimestamp: string;
}

// ============================================================================
// Valid Constraint Types per Puzzle Type
// ============================================================================

export type SpatialConstraintType = 
  | 'max-distance' 
  | 'min-coverage' 
  | 'agent-count' 
  | 'on-perimeter' 
  | 'even-spacing' 
  | 'equilateral' 
  | 'hexagonal-pattern'
  | 'side-length'
  | 'neighbor-distance'
  | 'max-overlap'
  | 'all-zones-covered';

export type RoutingConstraintType = 
  | 'max-capacity' 
  | 'all-tasks-routed' 
  | 'optimal-routing' 
  | 'max-latency' 
  | 'min-efficiency' 
  | 'max-cost' 
  | 'region-affinity' 
  | 'failover-ready'
  | 'min-throughput'
  | 'urgent-priority';

export type BreedingConstraintType = 
  | 'trait-threshold' 
  | 'trait-match' 
  | 'species' 
  | 'generations' 
  | 'trait-expression' 
  | 'trait-exceeds-parents'
  | 'min-training-time';

export type CoordinationConstraintType = 
  | 'all-tasks-complete' 
  | 'max-time' 
  | 'min-efficiency' 
  | 'no-collision' 
  | 'sync-required' 
  | 'leader-designated'
  | 'quorum-reached'
  | 'log-replicated'
  | 'no-resource-conflict';

export type AdvancedConstraintType = 
  | 'complete-all-subpuzzles' 
  | 'resource-limit' 
  | 'time-limit' 
  | 'min-score' 
  | 'perfect-chain'
  | 'trait-matches-task'
  | 'min-throughput';
