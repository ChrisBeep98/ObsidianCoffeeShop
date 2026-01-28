# GEMINI Context: The Obsidian Ritual (CoffeeShop2)

This document provides the essential context, architectural principles, and technical standards for the **CoffeeShop2** project, also known as **The Obsidian Ritual**.

## 1. Project Overview
A high-end, cinematic web experience for a luxury coffee brand. The project focuses on **sensory storytelling** through advanced motion, scroll-triggered sequences, and a "Diegetic UI" (interfaces that exist within the narrative world).

### Core Stack
- **Framework:** Next.js (App Router)
- **Frontend:** React 19
- **Animations:** GSAP + ScrollTrigger (Cinematic physics)
- **Styling:** Tailwind CSS 4 (using CSS variable-based tokens)
- **Language:** TypeScript
- **Assets:** WebP frame sequences for scroll-driven "video" effects.

---

## 2. The Obsidian Design System

### Color Tokens (`src/app/globals.css`)
- **Void (`--color-void`):** `#0A0A0A` (The primary canvas)
- **Gold (`--color-gold`):** `#C9A227` (The alchemical accent)
- **Bone (`--color-bone`):** `#F5F5F0` (Primary typography)
- **Charcoal (`--color-charcoal`):** `#1A1A1D` (Surfaces)

all this tokens are extracted from @OBSIDIAN-DESIGN_SYSTEM.md file



### Typography
- **Serif (Display):** `Cormorant Garamond` (The "Spell" - for headlines)
- **Sans (Functional):** `Space Grotesk` / `Urbanist` (The "Data" - for UI/Narrative)

### Semantic Utilities
- `.text-hero`: Massive headlines (12rem).
- `.text-hero-sub`: Large gold uppercase tracking.
- `.text-cinematic-display`: Massive transparent background-clip text.
- `.text-label`: Technical/Diegetic gold labels.
- `.px-frame`: Global horizontal padding (20px mobile / 80px desktop).
- `.py-section`: Massive vertical gaps (240px desktop).

---

## 3. Architectural Principles (The Obsidian Architect)

When modifying or adding to this project, adhere to these mandates:

1.  **Concept Over Layout:** Before coding, identify the metaphor (e.g., "The Vessel", "The Awakening").
2.  **Diegetic UI:** UI elements should feel like tools for a master roaster (e.g., coordinates, tickers, technical labels).
3.  **The 60fps Rule:** Animations must be buttery smooth. Use `will-change: transform` and `gsap.context()` for cleanup.
4.  **Cinematic Framing:** Content should rarely touch the edges; use the `.px-frame` and `.py-section` utilities to maintain breathing room.
5.  **Magnetic Physics:** Buttons and interactive elements should "attract" the cursor using Lerp-based motion.

---

## 4. Key Components & Patterns

### `HeroSequence`
Handles the scroll-triggered frame-by-frame animation of WebP images located in `public/images/hero-sequence`.
- **Usage:** Wraps the initial content, using GSAP to scrub through frames based on scroll depth.

### `TransmutationSection`
Handles the transition from the hero into the narrative triptych. Focuses on "The Alchemy of the Pure."

### GSAP Patterns
Always use the following pattern in `useEffect` for ScrollTrigger:
```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    // ScrollTrigger logic here
  }, containerRef);
  return () => ctx.revert();
}, []);
```

---

## 5. Development Workflow

- **Run Dev:** `npm run dev`
- **Build:** `npm run build`
- **Lint:** `npm run lint`
- **Styles:** Tailwind 4 is configured via `globals.css`. Do not look for a `tailwind.config.ts`.
- **New Components:** Should be placed in `src/components/[ComponentName]` with their own sub-structure if needed.

---

## 6. Instructional Prompting
When asking Gemini for help, use the "Obsidian Architect" persona:
*"[Task]. Follow the Obsidian Architect principles. Atmosphere: [Atmosphere Name]. Focus: [Anchor Object]."*

> **Note:** The project lives in "The Void". High contrast, deep shadows, and gold highlights are non-negotiable.
