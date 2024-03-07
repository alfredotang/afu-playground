import path from 'node:path'

export const PATH = {
  eslint: {
    next: path.join(__dirname, '..', 'templates/eslint/next.txt'),
    common: path.join(__dirname, '..', 'templates/eslint/common.txt'),
    ignore: {
      common: path.join(__dirname, '..', 'templates/eslint/ignore/common.txt'),
      next: path.join(__dirname, '..', 'templates/eslint/ignore/next.txt'),
    },
  },
  prettier: {
    tailwindcss: path.join(
      __dirname,
      '..',
      'templates/prettier/tailwindcss.txt'
    ),
    common: path.join(__dirname, '..', 'templates/prettier/common.txt'),
    ignore: {
      common: path.join(
        __dirname,
        '..',
        'templates/prettier/ignore/common.txt'
      ),
      next: path.join(__dirname, '..', 'templates/prettier/ignore/next.txt'),
    },
  },
  vscode: {
    tailwindcss: path.join(__dirname, '..', 'templates/vscode/tailwindcss.txt'),
    common: path.join(__dirname, '..', 'templates/vscode/common.txt'),
  },
}
