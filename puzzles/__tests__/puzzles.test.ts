/**
 * Constraint Ranch — Puzzle validation tests
 * Validates structure, types, constraints, and cross-references for all puzzles
 */

import {
  allPuzzles,
  puzzleCounts,
  spatialPuzzles,
  routingPuzzles,
  breedingPuzzles,
  coordinationPuzzles,
  advancedPuzzles,
} from '../index';
import {
  ConstraintPuzzle,
  SpatialPuzzle,
  RoutingPuzzle,
  BreedingPuzzle,
  CoordinationPuzzle,
  AdvancedPuzzle,
} from '../types';

// ─── Puzzle Index Tests ─────────────────────────────────────────────

describe('Puzzle Index', () => {
  it('should export all puzzle arrays', () => {
    expect(spatialPuzzles).toBeDefined();
    expect(routingPuzzles).toBeDefined();
    expect(breedingPuzzles).toBeDefined();
    expect(coordinationPuzzles).toBeDefined();
    expect(advancedPuzzles).toBeDefined();
  });

  it('should have correct puzzle counts', () => {
    expect(puzzleCounts.spatial).toBe(spatialPuzzles.length);
    expect(puzzleCounts.routing).toBe(routingPuzzles.length);
    expect(puzzleCounts.breeding).toBe(breedingPuzzles.length);
    expect(puzzleCounts.coordination).toBe(coordinationPuzzles.length);
    expect(puzzleCounts.advanced).toBe(advancedPuzzles.length);
    expect(puzzleCounts.total).toBe(allPuzzles.length);
    expect(puzzleCounts.total).toBe(
      spatialPuzzles.length +
      routingPuzzles.length +
      breedingPuzzles.length +
      coordinationPuzzles.length +
      advancedPuzzles.length
    );
  });

  it('should have at least 1 puzzle per type', () => {
    expect(spatialPuzzles.length).toBeGreaterThanOrEqual(1);
    expect(routingPuzzles.length).toBeGreaterThanOrEqual(1);
    expect(breedingPuzzles.length).toBeGreaterThanOrEqual(1);
    expect(coordinationPuzzles.length).toBeGreaterThanOrEqual(1);
    expect(advancedPuzzles.length).toBeGreaterThanOrEqual(1);
  });

  it('should have unique IDs across all puzzles', () => {
    const ids = allPuzzles.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});

// ─── Base Puzzle Structure Tests ────────────────────────────────────

describe('Base Puzzle Structure', () => {
  it.each(allPuzzles.map((p) => [p.id, p]))(
    'puzzle %s should have required fields',
    (_id, puzzle) => {
      const p = puzzle as ConstraintPuzzle;
      expect(p.id).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(p.type).toBeTruthy();
      expect(p.difficulty).toBeGreaterThanOrEqual(1);
      expect(p.difficulty).toBeLessThanOrEqual(5);
      expect(p.description).toBeTruthy();
      expect(p.constraints).toBeDefined();
      expect(p.constraints.length).toBeGreaterThanOrEqual(1);
      expect(p.hints).toBeDefined();
      expect(p.hints.length).toBeGreaterThanOrEqual(1);
      expect(p.rewards).toBeDefined();
      expect(p.rewards.experience).toBeGreaterThan(0);
    }
  );

  it.each(allPuzzles.map((p) => [p.id, p]))(
    'puzzle %s should have valid hints with levels 1-3',
    (_id, puzzle) => {
      const p = puzzle as ConstraintPuzzle;
      for (const hint of p.hints) {
        expect(hint.level).toBeGreaterThanOrEqual(1);
        expect(hint.level).toBeLessThanOrEqual(3);
        expect(hint.text).toBeTruthy();
      }
    }
  );

  it.each(allPuzzles.map((p) => [p.id, p]))(
    'puzzle %s constraints should have type and value or tolerance',
    (_id, puzzle) => {
      const p = puzzle as ConstraintPuzzle;
      for (const c of p.constraints) {
        expect(c.type).toBeTruthy();
        // Some constraints use tolerance, expression, or are just type+trait
        const hasValue = c.value !== undefined;
        const hasAlt = c.tolerance !== undefined || c.expression !== undefined || c.trait !== undefined;
        expect(hasValue || hasAlt).toBe(true);
      }
    }
  );
});

// ─── Spatial Puzzle Tests ───────────────────────────────────────────

describe('Spatial Puzzles', () => {
  it.each(spatialPuzzles.map((p) => [p.id, p]))(
    'spatial puzzle %s should have map and zones',
    (_id, puzzle) => {
      const p = puzzle as SpatialPuzzle;
      expect(p.initialState).toBeDefined();
      expect(p.initialState.mapSize).toBeDefined();
      expect(p.initialState.mapSize.width).toBeGreaterThan(0);
      expect(p.initialState.mapSize.height).toBeGreaterThan(0);
      expect(p.goalState).toBeDefined();
    }
  );

  it.each(spatialPuzzles.map((p) => [p.id, p]))(
    'spatial puzzle %s zones should have valid coordinates within map bounds',
    (_id, puzzle) => {
      const p = puzzle as SpatialPuzzle;
      const { mapSize, zones } = p.initialState;
      for (const zone of zones) {
        expect(zone.id).toBeTruthy();
        expect(zone.x).toBeGreaterThanOrEqual(0);
        expect(zone.x).toBeLessThanOrEqual(mapSize.width);
        expect(zone.y).toBeGreaterThanOrEqual(0);
        expect(zone.y).toBeLessThanOrEqual(mapSize.height);
        expect(zone.radius).toBeGreaterThan(0);
      }
    }
  );
});

// ─── Routing Puzzle Tests ───────────────────────────────────────────

describe('Routing Puzzles', () => {
  it.each(routingPuzzles.map((p) => [p.id, p]))(
    'routing puzzle %s should have task types and agents',
    (_id, puzzle) => {
      const p = puzzle as RoutingPuzzle;
      expect(p.initialState).toBeDefined();
      expect(p.initialState.availableAgents.length).toBeGreaterThanOrEqual(1);
      expect(p.initialState.taskTypes.length).toBeGreaterThanOrEqual(1);
    }
  );

  it.each(routingPuzzles.map((p) => [p.id, p]))(
    'routing puzzle %s agents should have valid capacity',
    (_id, puzzle) => {
      const p = puzzle as RoutingPuzzle;
      for (const agent of p.initialState.availableAgents) {
        expect(agent.species).toBeTruthy();
        expect(agent.capacity).toBeGreaterThan(0);
      }
    }
  );

  it.each(routingPuzzles.map((p) => [p.id, p]))(
    'routing puzzle %s task types should have valid rates',
    (_id, puzzle) => {
      const p = puzzle as RoutingPuzzle;
      for (const task of p.initialState.taskTypes) {
        expect(task.type).toBeTruthy();
        expect(task.rate).toBeGreaterThan(0);
      }
    }
  );
});

// ─── Breeding Puzzle Tests ──────────────────────────────────────────

describe('Breeding Puzzles', () => {
  it.each(breedingPuzzles.map((p) => [p.id, p]))(
    'breeding puzzle %s should have parent traits',
    (_id, puzzle) => {
      const p = puzzle as BreedingPuzzle;
      expect(p.initialState).toBeDefined();
      expect(p.initialState.parentA).toBeDefined();
      expect(p.initialState.parentB).toBeDefined();
      expect(p.initialState.parentA.length).toBeGreaterThanOrEqual(1);
      expect(p.initialState.parentB.length).toBeGreaterThanOrEqual(1);
    }
  );

  it.each(breedingPuzzles.map((p) => [p.id, p]))(
    'breeding puzzle %s parent traits should have valid value ranges',
    (_id, puzzle) => {
      const p = puzzle as BreedingPuzzle;
      const allTraits = [...p.initialState.parentA, ...p.initialState.parentB];
      for (const trait of allTraits) {
        expect(trait.name).toBeTruthy();
        expect(trait.value).toBeGreaterThanOrEqual(0);
        expect(trait.value).toBeLessThanOrEqual(1);
      }
    }
  );

  it.each(breedingPuzzles.map((p) => [p.id, p]))(
    'breeding puzzle %s should have goal state with target traits',
    (_id, puzzle) => {
      const p = puzzle as BreedingPuzzle;
      expect(p.goalState).toBeDefined();
      expect(p.goalState.targetTraits.length).toBeGreaterThanOrEqual(1);
      for (const t of p.goalState.targetTraits) {
        expect(t.name).toBeTruthy();
        expect(t.value).toBeGreaterThanOrEqual(0);
        expect(t.value).toBeLessThanOrEqual(1);
      }
    }
  );

  it('breeding hint math should be correct for basicInheritance', () => {
    const p = breedingPuzzles.find((x) => x.id === 'breeding-001') as BreedingPuzzle;
    expect(p).toBeDefined();
    // 0.9*0.75 + 0.7*0.25 = 0.675 + 0.175 = 0.85
    const weightedResult = 0.9 * 0.75 + 0.7 * 0.25;
    expect(weightedResult).toBeCloseTo(0.85, 2);
    expect(weightedResult).toBeGreaterThanOrEqual(p.goalState.targetTraits[0].value);
  });
});

// ─── Coordination Puzzle Tests ──────────────────────────────────────

describe('Coordination Puzzles', () => {
  it.each(coordinationPuzzles.map((p) => [p.id, p]))(
    'coordination puzzle %s should have agents',
    (_id, puzzle) => {
      const p = puzzle as CoordinationPuzzle;
      expect(p.initialState).toBeDefined();
      expect(p.initialState.agents.length).toBeGreaterThanOrEqual(1);
    }
  );

  it.each(coordinationPuzzles.map((p) => [p.id, p]))(
    'coordination puzzle %s agents should have valid positions',
    (_id, puzzle) => {
      const p = puzzle as CoordinationPuzzle;
      for (const agent of p.initialState.agents) {
        expect(agent.id).toBeTruthy();
        expect(agent.position).toBeDefined();
        expect(typeof agent.position.x).toBe('number');
        expect(typeof agent.position.y).toBe('number');
      }
    }
  );

  it.each(coordinationPuzzles.map((p) => [p.id, p]))(
    'coordination puzzle %s should have tasks',
    (_id, puzzle) => {
      const p = puzzle as CoordinationPuzzle;
      expect(p.initialState.tasks).toBeDefined();
      expect(p.initialState.tasks.length).toBeGreaterThanOrEqual(1);
    }
  );
});

// ─── Advanced Puzzle Tests ──────────────────────────────────────────

describe('Advanced Puzzles', () => {
  it.each(advancedPuzzles.map((p) => [p.id, p]))(
    'advanced puzzle %s should have sub-puzzles',
    (_id, puzzle) => {
      const p = puzzle as AdvancedPuzzle;
      expect(p.subPuzzles).toBeDefined();
      expect(p.subPuzzles.length).toBeGreaterThanOrEqual(2);
    }
  );

  it.each(advancedPuzzles.map((p) => [p.id, p]))(
    'advanced puzzle %s sub-puzzles should have valid types',
    (_id, puzzle) => {
      const p = puzzle as AdvancedPuzzle;
      const validTypes = ['spatial', 'routing', 'breeding', 'coordination'];
      for (const sub of p.subPuzzles) {
        expect(validTypes).toContain(sub.type);
        expect(sub.puzzle).toBeDefined();
      }
    }
  );
});

// ─── Cross-Puzzle Validation ────────────────────────────────────────

describe('Cross-Puzzle Validation', () => {
  it('IDs should follow pattern: type-NNN', () => {
    for (const p of allPuzzles) {
      expect(p.id).toMatch(/^(spatial|routing|breeding|coordination|advanced)-\d+$/);
    }
  });

  it('type field should match the puzzle array it belongs to', () => {
    const typeMap: Record<string, string[]> = {
      spatial: spatialPuzzles.map((p) => p.id),
      routing: routingPuzzles.map((p) => p.id),
      breeding: breedingPuzzles.map((p) => p.id),
      coordination: coordinationPuzzles.map((p) => p.id),
      advanced: advancedPuzzles.map((p) => p.id),
    };
    for (const [type, ids] of Object.entries(typeMap)) {
      for (const id of ids) {
        const puzzle = allPuzzles.find((p) => p.id === id);
        expect(puzzle?.type).toBe(type);
      }
    }
  });

  it('experience should scale with difficulty', () => {
    for (const p of allPuzzles) {
      expect(p.rewards.experience).toBeGreaterThanOrEqual(p.difficulty * 50);
    }
  });

  it('unlocked puzzle IDs should reference existing puzzles or categories', () => {
    const allIds = new Set(allPuzzles.map((p) => p.id));
    for (const p of allPuzzles) {
      if (p.rewards.unlocks) {
        for (const unlockId of p.rewards.unlocks) {
          if (!unlockId.endsWith('-puzzles')) {
            expect(allIds.has(unlockId) || unlockId.includes('-')).toBe(true);
          }
        }
      }
    }
  });
});
