# Contributing to Constraint Ranch 🤠

Thank you for your interest in making Constraint Ranch better! This guide will help you contribute effectively.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Ways to Contribute](#ways-to-contribute)
  - [🎮 New Puzzles](#-new-puzzles)
  - [🐄 New Agent Species](#-new-agent-species)
  - [🎨 Art & UI](#-art--ui)
  - [📝 Documentation](#-documentation)
  - [🐛 Bug Reports](#-bug-reports)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)

---

## Code of Conduct

Be respectful, inclusive, and constructive. We're all here to build something fun and educational.

---

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Install dependencies: `npm install`
4. Start the dev server: `npm run dev`
5. Open http://localhost:3000

---

## Ways to Contribute

### 🎮 New Puzzles

Puzzles are the heart of Constraint Ranch. Here's how to add one:

#### Puzzle Definition Format

Create a new file in `puzzles/` following this schema:

```typescript
// puzzles/spatial/coverage-optimization.ts
import { ConstraintPuzzle } from '../types';

export const coverageOptimization: ConstraintPuzzle = {
  id: 'spatial-001',
  name: 'Coverage Optimization',
  type: 'spatial',
  difficulty: 1, // 1-5
  description: 'Position 3 Chicken agents to cover 95% of the monitoring zone',
  
  constraints: [
    { type: 'max-distance', value: 100, unit: 'units' },
    { type: 'min-coverage', value: 0.95, unit: 'percentage' },
    { type: 'agent-count', value: 3, species: 'chicken' }
  ],
  
  initialState: {
    mapSize: { width: 500, height: 500 },
    zones: [
      { id: 'zone-a', x: 50, y: 50, radius: 80 },
      { id: 'zone-b', x: 250, y: 250, radius: 100 },
      { id: 'zone-c', x: 450, y: 400, radius: 60 }
    ]
  },
  
  goalState: [
    { type: 'coverage', target: 0.95 }
  ],
  
  hints: [
    'Position agents at zone intersections',
    'Use Dodecet coordinates for exact placement'
  ],
  
  rewards: {
    experience: 100,
    unlocks: ['routing-puzzles']
  }
};
```

#### Puzzle Types

| Type | Description | Example |
|------|-------------|---------|
| `spatial` | Position agents on a map | Coverage optimization |
| `routing` | Route tasks to correct agents | Load balancing |
| `breeding` | Create agents with target traits | Trait inheritance |
| `coordination` | Multi-agent collaboration | Consensus voting |

#### Puzzle Guidelines

- ✅ Puzzles must have **one unique solution** (deterministic)
- ✅ Use **exact arithmetic** (Constraint Theory)
- ✅ Provide progressive hints
- ✅ Include clear success criteria
- ❌ No floating-point ambiguity
- ❌ No random elements in solutions

---

### 🐄 New Agent Species

Add a new agent type to expand gameplay:

#### Species Definition

```typescript
// species/owl.ts
import { Species } from '../types';

export const owl: Species = {
  id: 'owl',
  name: 'Owl',
  emoji: '🦉',
  
  // Size affects memory allocation in production
  size: '25MB',
  
  // Special abilities
  specialty: 'Night Operations',
  abilities: [
    'nocturnal-monitoring',
    'silent-alerts',
    'long-range-detection'
  ],
  
  // Unlock requirements
  unlockLevel: 40,
  unlockMethod: 'Complete all night puzzles',
  
  // Trait ranges (min, max)
  traits: {
    speed: [0.6, 0.9],
    accuracy: [0.8, 1.0],
    range: [0.7, 1.0],
    stealth: [0.9, 1.0]
  },
  
  // Visual appearance
  appearance: {
    primaryColor: '#4A4A4A',
    accentColor: '#FFD700',
    animation: 'hover'
  }
};
```

#### Species Checklist

- [ ] Unique specialty that fills a gap
- [ ] Balanced trait ranges
- [ ] Appropriate unlock level
- [ ] Visual assets (SVG preferred)
- [ ] Test puzzles that showcase abilities

---

### 🎨 Art & UI

We welcome visual improvements!

#### What We Need

- **Agent sprites** - Animated SVGs for each species
- **UI components** - Buttons, modals, progress bars
- **Backgrounds** - Ranch landscapes, puzzle environments
- **Icons** - Achievement badges, resource icons

#### Asset Guidelines

- Use SVG format when possible (scalable, small)
- Follow the color palette:
  ```
  Primary:   #2D5016 (Ranch Green)
  Secondary: #8B4513 (Saddle Brown)
  Accent:    #FFD700 (Gold)
  Background: #F5F5DC (Beige)
  ```
- Include dark mode variants
- Keep animations subtle (60fps target)

#### Contributing Art

1. Create assets in `assets/` directory
2. Include both light and dark variants
3. Add to `assets/index.ts` exports
4. Update any affected components

---

### 📝 Documentation

Help others understand and use Constraint Ranch:

#### Documentation Needed

- **Tutorials** - Step-by-step guides for new players
- **API Docs** - For developers integrating with the platform
- **Translations** - Make the ranch global
- **Blog Posts** - Explainers, tutorials, announcements

#### Style Guide

- Use clear, simple language
- Include code examples
- Add diagrams for complex concepts
- Link to related documentation

---

### 🐛 Bug Reports

Found something broken? Help us fix it!

#### Before Reporting

1. Check existing issues
2. Try the latest version
3. Clear browser cache

#### Bug Report Template

```markdown
**Description**
A clear description of the bug.

**Steps to Reproduce**
1. Go to...
2. Click on...
3. See error

**Expected Behavior**
What should happen?

**Actual Behavior**
What actually happened?

**Screenshots**
If applicable, add screenshots.

**Environment**
- OS: [e.g., macOS 14]
- Browser: [e.g., Chrome 120]
- Version: [e.g., 1.0.0]
```

---

## Development Setup

### Prerequisites

- Node.js 18+
- npm 9+
- Git

### Local Development

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/constraint-ranch.git
cd constraint-ranch

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

### Project Structure

```
constraint-ranch/
├── puzzles/           # Puzzle definitions
│   ├── spatial/       # Position-based puzzles
│   ├── routing/       # Task routing puzzles
│   └── breeding/      # Trait inheritance puzzles
├── species/           # Agent species definitions
├── assets/            # Visual assets (SVG, images)
├── components/        # UI components
├── lib/               # Core game logic
│   ├── constraint/    # Constraint Theory integration
│   ├── agents/        # Agent management
│   └── puzzles/       # Puzzle engine
├── pages/             # Next.js pages
└── styles/            # Global styles
```

---

## Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow style guidelines
   - Add tests for new features
   - Update documentation

3. **Test thoroughly**
   ```bash
   npm test
   npm run lint
   npm run build
   ```

4. **Commit with clear messages**
   ```bash
   git commit -m "feat: add owl species with nocturnal abilities"
   ```

5. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **PR Requirements**
   - [ ] Tests pass
   - [ ] Documentation updated
   - [ ] No merge conflicts
   - [ ] Linked to relevant issues

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Formatting, no code changes
- `refactor:` Code restructuring
- `test:` Adding/updating tests
- `chore:` Maintenance tasks

---

## Style Guidelines

### TypeScript

- Use strict mode
- Prefer interfaces over types for objects
- Document public functions with JSDoc
- Use meaningful variable names

### React

- Use functional components
- Prefer hooks over class components
- Keep components focused and small
- Use TypeScript for props

### CSS

- Use Tailwind CSS classes
- Follow mobile-first approach
- Maintain consistent spacing
- Support dark mode

---

## Questions?

- Open a [Discussion](https://github.com/SuperInstance/constraint-ranch/discussions)
- Join our [Discord](https://discord.gg/constraint-ranch)
- Email: support@superinstance.ai

---

**Thank you for helping make Constraint Ranch awesome! 🎮🤠**
