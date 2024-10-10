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
   - The **current score** of the player after catching the mole.
3. **Gameplay Enhancement:** This timer introduces a dynamic challenge. Players can now track how quickly they react to catching the mole, providing an extra level of interactivity. The goal becomes not just to catch the mole, but to catch it as quickly as possible.

   Each time the mole is caught, the timer stops, and it resets when the next mole appears. This makes it possible for players to gauge and improve their reaction times over time.

