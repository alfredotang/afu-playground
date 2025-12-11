# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript-based CLI utility playground called "afu-playground" that provides various command-line tools and utilities. The project uses pnpm as the package manager and tsx for running TypeScript files directly.

## Key Commands

### Development Commands
- `pnpm install` - Install dependencies
- `pnpm cmd` - Interactive command selector that displays all available cmd scripts
- `pnpm build` - Regenerate package.json scripts based on src/app structure
- `pnpm format` - Format code using ESLint with --fix flag

### Available CLI Tools
- `pnpm cmd:email` - Email utility
- `pnpm cmd:generate-ts-type` - TypeScript type generation
- `pnpm cmd:id` - ID generation utility
- `pnpm cmd:init` - Project initialization tool (sets up ESLint, Prettier, VS Code settings)
- `pnpm cmd:transform-shadcn-color` - Color transformation utility

### Logging and Development
- `pnpm setup:log` - Set up log playground
- `pnpm log` - Watch and log TypeScript files to terminal
- `pnpm dev:server` - Start development server with hot reload

## Architecture

### Command Structure
All CLI commands are organized under `src/app/` with each command having its own directory containing a `main.ts` file. The build system automatically generates package.json scripts based on this structure:

- `src/app/cmd/main.ts` → `"cmd": "tsx src/app/cmd/main.ts"`
- `src/app/generate-ts-type/main.ts` → `"cmd:generate-ts-type": "tsx src/app/generate-ts-type/main.ts"`
- Nested directories like `src/app/release/desc/main.ts` → `"cmd:release:desc": "tsx src/app/release/desc/main.ts"`

### Core Utilities
- **Logger**: Uses consola for consistent logging across all commands
- **Prompt**: Interactive CLI prompts with type-safe results (text, confirm, select)
- **Package Management**: Utilities for reading/writing package.json
- **Directory Parsing**: Automatic discovery of command entry points

### Key Files
- `scripts/write-cmd-into-package-script.ts` - Automatically generates package.json scripts from src/app structure
- `src/utils/parse-app-dir/index.ts` - Recursively discovers main.ts files in src/app (excludes deprecated folders)
- `src/libs/logger/index.ts` - Standardized logging using consola
- `src/libs/prompt/index.ts` - Type-safe CLI prompts

## Development Workflow

1. Create new commands in `src/app/[command-name]/main.ts`
2. Run `pnpm build` to regenerate package.json scripts
3. Use `pnpm cmd` to interactively select and run commands
4. Use `pnpm format` to fix code formatting before committing

## External Dependencies

- **fzf**: Required for fuzzy finding functionality (install via `brew install fzf`)
- **tsx**: Used for running TypeScript files directly
- **consola**: Used for logging and interactive prompts
- **pnpm**: Package manager (version 10.12.3+)

## Testing and Linting

The project uses ESLint for code formatting. Run `pnpm format` to automatically fix formatting issues before committing changes.