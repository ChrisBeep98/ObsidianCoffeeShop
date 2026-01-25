# THE OBSIDIAN RITUAL // DESIGN SYSTEM & TOKENS

> **Philosophy:** "Darkness, Precision, and Alchemy."
> This document is the Single Source of Truth for the UI implementation.

---

## 🎨 1. ATMOSPHERE & COLOR PALETTE

Unlike Nevado (which has Day/Night), Obsidian exists primarily in **The Void**.

### 1.1 Semantic Colors (The Void Theme)

| Variable CSS | Tailwind Token | Value (HEX) | Role |
| :--- | :--- | :--- | :--- |
| `--color-void` | `bg-void` | `#0A0A0A` | **Main Canvas**. Deep, infinite black. |
| `--color-charcoal` | `bg-charcoal` | `#1A1A1D` | **Surface**. Cards, panels, modals. |
| `--color-gold` | `text-gold` / `bg-gold` | `#C9A227` | **The Alchemist's Accent**. CTAs, highlights. |
| `--color-bone` | `text-bone` | `#F5F5F0` | **Primary Text**. Warm white, not clinical. |
| `--color-ember` | `text-ember` | `#B33A3A` | **Alert/Error**. Deep red. |
| `--color-muted` | `text-muted` | `#525252` | **Secondary Text**. Subtle gray. |

### 1.2 Gradients & Overlays
*   **The Vignette:** `radial-gradient(circle at center, transparent 0%, #0A0A0A 100%)`
*   **Gold Glow:** `box-shadow: 0 0 30px rgba(201, 162, 39, 0.15)`

---

## ✒️ 2. TYPOGRAPHY (The Voice)

### 2.1 Font Families
*   **Display (The Spell):** `Cormorant Garamond` (Serif). Used for headlines and big statements.
*   **Functional (The Data):** `Space Grotesk` (Sans). Used for body, UI, and "diegetic" data.

### 2.2 Semantic Text Tokens

| Token Name | Tailwind Class | Style Spec | Usage |
| :--- | :--- | :--- | :--- |
| **HERO DISPLAY** | `.text-hero` | `font-serif text-6xl md:text-9xl leading-[0.9] tracking-tighter` | massive opening statements. |
| **SECTION TITLE** | `.text-title` | `font-serif text-4xl md:text-6xl leading-[1.0] font-light` | Section headers. |
| **RITUAL LABEL** | `.text-label` | `font-sans text-[10px] tracking-[0.2em] uppercase text-gold` | Small "technical" labels. |
| **BODY NARRATIVE**| `.text-body` | `font-sans text-base md:text-lg leading-relaxed text-bone/80` | Reading paragraphs. |
| **DATA MONO** | `.text-data` | `font-mono text-xs text-muted tracking-widest` | Diegetic numbers/coordinates. |

---

## 📐 3. SPACING & LAYOUT (The Frame)

We adopt the **"Cinematic Frame"** rule. The content never touches the edge.

| Variable | Class | Value (Mobile / Desktop) | Role |
| :--- | :--- | :--- | :--- |
| `--spacing-frame` | `.px-frame` | `20px` / `80px` | Horizontal padding for the container. |
| `--section-gap` | `.py-section` | `120px` / `240px` | Massive vertical rhythm between acts. |

---

## 🎬 4. MOTION & INTERACTION (The Physics)

### 4.1 The "Magnetic" Button
Buttons should feel heavy and attract the cursor.
*   **Physics:** `Lerp: 0.1` (Snappy but fluid).
*   **State:** Hovering pulls the button `x,y` towards the mouse.

### 4.2 Scroll Animations (GSAP)
*   **The Reveal:** Text does not "fade in". It **emerges** (Clip-path + Y-translation).
*   **The Parallax:** Backgrounds move at `speed: 0.5`. Text moves at `speed: 1.0`.

---

## 🛠️ 5. UI COMPONENTS

### 5.1 BTN-RITUAL (Primary)
*   **Border:** `1px solid var(--color-gold)`
*   **Text:** `text-gold` uppercase tracking-widest.
*   **Background:** Transparent.
*   **Hover:** Fills with `bg-gold`, text turns `black`.
*   **Shape:** Sharp corners or slight `rounded-sm` (No pills).

### 5.2 THE "DIEGETIC" HUD
Floating elements that track the "status" of the ritual.
*   *Position:* Fixed corners (Top-Left, Bottom-Right).
*   *Content:* "TEMP: 93°C", "PRESS: 9 BAR", "ORIGIN: ETHIOPIA".
*   *Style:* Tiny, monospace, low opacity (`.text-data`).

---
