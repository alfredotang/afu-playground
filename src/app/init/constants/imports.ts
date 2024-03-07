const ESLINT_BASE = [
  'eslint@latest',
  'eslint-config-prettier@latest',
  'eslint-plugin-prettier@latest',
  'eslint-plugin-simple-import-sort@latest',
  '@typescript-eslint/eslint-plugin@latest',
  '@typescript-eslint/parser@latest',
  'eslint-plugin-import',
]

export const ESLINT = {
  NEXT: [...ESLINT_BASE, 'eslint-config-next@latest'],
  COMMON: [...ESLINT_BASE, 'eslint-plugin-react-hooks@latest'],
}

const PRETTIER_BASE = ['prettier@latest']

export const PRETTIER = {
  COMMON: PRETTIER_BASE,
  TAILWINDCSS: [...PRETTIER_BASE, 'prettier-plugin-tailwindcss@latest'],
}

export const TAILWINDCSS = {
  dependencies: [
    'tailwind-merge@latest',
    'tailwindcss-animate@latest',
    'class-variance-authority@latest',
    'clsx@latest',
  ],
  devDependencies: [
    'tailwindcss@latest',
    'postcss@latest',
    'autoprefixer@latest',
  ],
}

export const VITE = {
  devDependencies: ['vite-plugin-checker@latest'],
}

export const BASE = {
  devDependencies: [
    'vite@latest',
    'vitest@latest',
    'vite-tsconfig-paths@latest',
  ],
}
