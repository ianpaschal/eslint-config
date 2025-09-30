# @ianpaschal/eslint-config

Shared ESLint 9 flat config for TypeScript and React projects.

## Installation

All plugins are bundled as dependencies, no additional installs required.

```bash
npm install --save-dev @ianpaschal/eslint-config
```

## Usage

The package exports three named configs that can be composed, plus a default export that includes all three.

### Full config (TypeScript + React)

```js
// eslint.config.mjs
import ianpaschal from '@ianpaschal/eslint-config';

export default [
  { ignores: ['dist/**'] },
  ...ianpaschal,
];
```

### TypeScript only (no React)

```js
// eslint.config.mjs
import { base, typescript } from '@ianpaschal/eslint-config';

export default [
  { ignores: ['dist/**'] },
  ...base,
  ...typescript,
];
```

### With project-specific overrides

```js
// eslint.config.mjs
import ianpaschal from '@ianpaschal/eslint-config';

export default [
  { ignores: ['dist/**'] },
  ...ianpaschal,
  {
    files: ['src/server/**/*.ts'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'error',
    },
  },
];
```

## Exports

| Export | Contents |
|--------|----------|
| `default` | `[...base, ...typescript, ...react]` |
| `base` | JS stylistic rules, import sorting, misc. rules |
| `typescript` | TypeScript parser + `typescript-eslint` recommended rules |
| `react` | React, React Hooks, and React Refresh rules |

## License

MIT
