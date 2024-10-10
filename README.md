# Whack-A-Mole Game

This is a simple Whack-A-Mole game built using **React 18** and **TypeScript** with a custom game engine that does not rely on any pre-built game engines.

## Game Features

- **Mole Randomization:** The mole randomly appears in one of the holes, and the time it stays visible is randomized between 200ms and 400ms.
- **Score Tracking:** Players earn points by clicking on the mole and lose points if they click on an empty hole.
- **Debounce Feature:** A debounce mechanism prevents players from spamming clicks on the same hole to gain points unfairly.

## Bonus Feature: Timer

As an added gameplay enhancement, a **timer** feature has been implemented:

1. **Timer Start:** A timer begins at 0 seconds when the game starts and increments by 1 second.
2. **Catch Time Notification:** Every time the player successfully catches the mole, an alert pops up showing:
   - The **time elapsed** (in seconds) from the moment the mole appears until the player catches it.
   - The total **clicks** require to catch the mole.
3. **Gameplay Enhancement:** This timer introduces a dynamic challenge. Players can now track how quickly they react to catching the mole, providing an extra level of interactivity. The goal becomes not just to catch the mole, but to catch it as quickly as possible.

   Each time the mole is caught, the timer stops, and it resets when the next mole appears. This makes it possible for players to gauge and improve their reaction times over time.



# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
