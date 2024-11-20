# Brick Breaker Game

Brick Breaker Game is developed by `alaradi0`, `alalaradi` and `ameshaim`, it is a browser-based game developed using HTML, CSS, and JavaScript. It features classic gameplay with a paddle, ball, blocks, and lives tracking. The game is organized with modular JavaScript classes and files to manage each game component, enhancing readability and maintainability.

## Table of Contents
- [Project Structure](#project-structure)
- [Installation and Setup](#installation-and-setup)
- [Game Logic and Functionality](#game-logic-and-functionality)
- [Classes and Techniques](#classes-and-techniques)
- [File Overview](#file-overview)
- [Summary](#summary)

---

## Project Structure

The game is organized as follows:
```
├── index.html # Main HTML structure 
├── style.css # Game styles and animations
├── script.js # Main game logic and setup
└── Sprite/ # Contains sprite images for ball animation
```

---

## Installation and Setup

1. Clone or download the repository.
2. Open `index.html` in a modern web browser (e.g., Chrome or Firefox).
3. The game will automatically load, and the instructions appear in a popup.
4. Start the game by clicking anywhere on the screen.


## Game Logic and Functionality

### Core Gameplay
- The player controls a **paddle** at the bottom of the screen, using the mouse to move it horizontally.
- The **ball** bounces around the screen and breaks **blocks** upon collision.
- The player’s objective is to clear all blocks in each level without losing all **lives**.
- A **timer** tracks game time, and an **FPS counter** provides real-time feedback on the game’s frame rate.

### Controls
- **Left Click**: Start the game, fire the ball.
- **Mouse Move**: Move the paddle.
- **Spacebar**: Pause or resume the game.
- **Buttons in Pause Menu**:
  - **Continue**: Resumes the game.
  - **Restart**: Reloads the game to start over.

---

## Classes and Techniques

Each major component in the game has its own class, encapsulated within its own JavaScript file. Here’s an explanation of the techniques and structures used:

### Classes and Component Design
1. **`Ball`**: Handles the ball's position, direction, speed, and collision logic.
2. **`Paddle`**: Manages paddle position and restricts movement within the game border.
3. **`Border`**: Represents the game boundary where the ball and paddle can move.
4. **`Block`**: Represents each block in the game, handling collision detection and block removal.
5. **`Timer`**: Tracks game time using intervals, updating the on-screen timer display.
6. **`FPS`**: Calculates the FPS using the Exponential Moving Average (EMA) technique to smooth out real-time FPS values.

### Exponential Moving Average (EMA)
The **FPS counter** in `fps.js` uses the EMA technique to calculate FPS smoothly. This technique calculates a moving average where more recent values have higher weight, stabilizing the FPS display without frequent fluctuations. The formula used is:

smoothedFPS = (fps * smoothingFactor) + (smoothedFPS * (1 - smoothingFactor))

A `smoothingFactor` of `0.1` ensures smoother FPS changes, providing a reliable real-time indicator of game performance.


## File Overview

### `index.html`
Provides the HTML structure of the game, including:
- Score, Lives, and FPS displays in a table at the top.
- **Border area** for game play.
- **Ball** and **paddle** elements.
- **Popups** for game instructions and pause menu.

### `style.css`
Defines styles for all game components:
- Variables for colors and dimensions.
- **Ball animation** using CSS `@keyframes` for sprite animation.
- **Paddle** and **blocks** styling, along with responsive layout adjustments.
- **Popup styling** for the game start and pause menus.

### `script.js`
The main game loop and overall logic:
1. Imports necessary classes: `Ball`, `Border`, `Paddle`, `Block`, `Timer`, and `fps.js`.
2. **Game Initialization**: Sets up instances for each component, initializes lives, score, and block levels.
3. **Game Loop (`update` function)**: Runs with `requestAnimationFrame`, updating the ball position, checking for block/paddle collisions, and monitoring level progress.
4. **Input Handling**:
   - **Mouse Move**: Moves the paddle.
   - **Mouse Click**: Fires the ball.
   - **Spacebar**: Pauses the game and show pause menu.

#### Key Functions in `script.js`
- `level(lvl)`: Generates a new set of blocks based on the level.
- `Pause()`: Pauses the game by freezing the ball and timer.
- `start()`: Starts or resumes the game when the player interacts with the screen.
- `endScreen(states)`: Displays end-game messages (e.g., "WINNER" or "YOU LOSE") based on game state.

### `Ball Class`
The **Ball** class manages:
1. **Positioning**: Updates ball’s `x` and `y` coordinates.
2. **Direction and Velocity**: Uses `direction` and `velocity` properties to control movement speed and heading.
3. **Collision Detection**:
   - Borders: Ball bounces off walls and loses a life if it passes the bottom border.
   - Paddle: Ball bounces based on collision angle.
   - Blocks: Ball bounces and destroys a block on impact.

### `Paddle Class`
The **Paddle** class manages:
1. **Position Control**: Ensures the paddle moves within the boundaries.
2. **Boundary Checks**: Limits paddle movement to prevent it from leaving the game border.
3. **Method (`paddleMove(x)`)**: Adjusts the paddle position based on mouse movement.

### `Block Class`
The **Block** class manages individual blocks:
1. **Positioning**: Creates block elements dynamically based on level layout.
2. **Collision Handling**: Removes the block and increments the score upon collision.
3. **Level Progress**: Tracks remaining blocks to determine level completion.

### `Border Class`
The **Border** class provides:
- **Boundary Rectangles**: Used for collision detection and positioning checks.
- Centralized access to game area boundaries, used by `Ball` and `Paddle`.

### `Timer Class`
The **Timer** class tracks game duration:
1. **Start, Pause, and Reset** Functions: Starts or pauses time based on game state.
2. **Interval Updates**: Updates time every 10 milliseconds, converting milliseconds to hours, minutes, and seconds for display.

### `FPS Meter`
The **FPS Counter** calculates FPS in real-time:
1. Uses **Exponential Moving Average (EMA)** to stabilize the FPS value display.
2. **`requestAnimationFrame`**: Tied to the main game loop to update FPS with each frame, improving real-time performance feedback.

---

## Summary

Ali's Brick Breaker Game is an engaging, browser-based game that demonstrates modular JavaScript programming, DOM manipulation, animation, and real-time performance tracking. With detailed component management and an organized structure.


## Thank you for your attention :) your suggestions and feedback are welcome!