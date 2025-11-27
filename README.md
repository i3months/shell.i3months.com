# 🧠 13months-web-shell

> An interactive web-based terminal portfolio with Linux-style commands

## ✨ Features

- Basic Linux commands (`ls`, `cd`, `pwd`, `echo`, `clear`, `help`)
- Custom personal commands (`linkedin`, `blog`, `hobby`, `career`)
- Command history (↑/↓) and auto-completion (Tab)
- Virtual file system navigation
- Built with React, TypeScript, and Vite

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build
```

## 🔧 Adding Custom Commands

Edit `src/entities/command/model/custom-commands.ts`:

```typescript
export const customCommands = [
  {
    name: "github",
    type: "link",
    value: "https://github.com/yourusername",
    description: "Open GitHub profile",
  },
  {
    name: "skills",
    type: "text",
    value: "React, TypeScript, Node.js",
    description: "Display technical skills",
  },
];
```

## 🏗 Tech Stack

React 18 • TypeScript • Vite • TailwindCSS • React Router
