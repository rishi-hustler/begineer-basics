# 🐍 Neon Snake: A Modern Next.js Experience

A high-performance, visually stunning Snake game built with **Next.js 15**, **Framer Motion**, and **Tailwind CSS**. This isn't just a classic game; it's a demonstration of smooth state management and physics-based UI animations.

## ✨ Features

* **Fluid Animations:** Powered by `framer-motion` for organic movement and segment transitions.
* **Neon Aesthetic:** Cyberpunk-inspired UI with real-time glow effects and backdrop blurs.
* **Responsive Engine:** Playable on any screen size with a flexible grid coordinate system.
* **State Persistence:** High-score tracking to keep the competition alive.
* **Performance Optimized:** Leveraging React Server Components (RSC) and optimized client-side hooks for zero-lag gameplay.

---

## 🚀 Tech Stack

| Technology | Purpose |
| --- | --- |
| **Next.js** | Core Framework (App Router) |
| **Framer Motion** | Physics-based animations |
| **Tailwind CSS** | Neon styling & Responsive design |
| **Lucide React** | Minimalist iconography |
| **TypeScript** | Type-safe game logic |

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/neon-snake.git
cd neon-snake

```

### 2. Install dependencies

```bash
npm install
# or
yarn install

```

### 3. Run the development server

```bash
npm run dev

```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) with your browser to see the result.

---

## 🧠 Technical Highlights

### **The Animation Logic**

Instead of static array mapping, this project uses `AnimatePresence` from Framer Motion. This allows the snake's tail to fade out while the head "pops" into existence, creating a much smoother visual flow than traditional `canvas` based games.

### **Grid Coordinate System**

The game uses a relative coordinate system:



This ensures that the game logic remains decoupled from the CSS rendering, allowing for easy resizing of the game board.
