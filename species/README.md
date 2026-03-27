# Species Definitions

This directory contains agent species definitions for Constraint Ranch.

## Adding a New Species

1. Create a new TypeScript file: `your-species.ts`
2. Export a `Species` object following the type definition
3. Add to `index.ts` exports
4. Create visual assets in `assets/species/`

## Example Species

```typescript
// species/example.ts
import { Species } from '../puzzles/types';

export const example: Species = {
  id: 'example',
  name: 'Example',
  emoji: '🦊',
  size: '50MB',
  specialty: 'Example Specialty',
  traits: {
    speed: [0.5, 0.8],
    accuracy: [0.7, 0.9]
  }
};
```

## Current Species

See [README.md](../README.md) for the full list of available species.
