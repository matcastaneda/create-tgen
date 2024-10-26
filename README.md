# Tgen Project Initializer

Welcome to the **Tgen Project Initializer**, a tool to quickly set up new projects with templates, install dependencies, init git and get started with development using various package managers.

## Installation

```bash
# Using npm
npm install -g create-tgen

# Using yarn
yarn global add create-tgen

# Using pnpm
pnpm add -g create-tgen

# Using bun
bun add -g create-tgen
```

## Usage

Use the `init` command to initialize a new project with a template

The `init` command will prompt you to select a template and package manager, and then it will install the dependencies for the template.

```bash
# Interactive mode (recommended)
pnpm create tgen init
```

## Templates

The Tgen Project Initializer comes with a few templates to get you started:

- `Next.js 15` - A Next.js 15 project with TypeScript, Tailwind CSS, and Shadcn-ui.
- `Next.js 14` - A Next.js 14 project with TypeScript, Tailwind CSS, and Shadcn-ui.
- `React (vite)` - A React project with Vite, TypeScript, Tailwind CSS, and Shadcn-ui.

## Features

- Initialize projects using predefined templates.
- Automatically install dependencies with `pnpm`, `yarn`, `npm`, or `bun`.
- Customize your project with prompts.
- Init git repository after project setup.
- Streamlined experience with prompts for package manager and template selection.

## Requirements

- Node.js v14 or higher
- One of the following package managers installed on your system:
  - `pnpm`
  - `yarn`
  - `npm`
  - `bun`

## License

Licensed under the [MIT license](https://github.com/matcastaneda/create-tgen/blob/main/LICENSE).
