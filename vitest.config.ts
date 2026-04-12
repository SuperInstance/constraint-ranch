import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['puzzles/__tests__/**/*.test.ts'],
    globals: true,
  },
});
