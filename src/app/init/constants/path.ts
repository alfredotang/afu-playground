import path from 'node:path'

export const PATH = {
  eslint: {
    next: path.join(__dirname, '..', 'templates/eslint/next.txt'),
    common: path.join(__dirname, '..', 'templates/eslint/common.txt'),
    ignore: path.join(__dirname, '..', 'templates/eslint/ignore.txt'),
  },
  prettier: {
    tailwindcss: path.join(
      __dirname,
      '..',
      'templates/prettier/tailwindcss.txt'
    ),
    common: path.join(__dirname, '..', 'templates/prettier/common.txt'),
    ignore: path.join(__dirname, '..', 'templates/prettier/ignore.txt'),
  },
  vscode: {
    tailwindcss: path.join(__dirname, '..', 'templates/vscode/tailwindcss.txt'),
    common: path.join(__dirname, '..', 'templates/vscode/common.txt'),
  },
}
