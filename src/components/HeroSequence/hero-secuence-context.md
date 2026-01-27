# 🎬 Component Context: HeroSequence

## 🎯 Narrative Vision
The HeroSequence is designed as a **Cinematic Diptych** (a two-act story) driven by the user's scroll. It transitions from a commercial/informative state to an abstract/essential state.

---

## 🎭 Act I: The Invitation
**Range:** 0% - 64% of Scroll

### 📦 Elements
- **Primary Title:** `El Secreto de la Cosecha` (Serif/Urbanist Mix).
- **Meta-Data:** Technical paragraph describing standards and origin.
- **CTA:** `ver catálogo` (Magnetic, Cinematic button).

### ⚙️ Behavior
- **Stationary:** Elements are pinned while the video sequence starts.
- **The Exit:** As scroll approaches 50%, GSAP triggers a "Parting of the Red Sea" effect.
- **Transitions:** 
    - Left side titles exit to `x: -120%`.
    - Right side info/button exit to `x: 120%`.

---

## 🕯️ Act II: The Revelation
**Range:** 64% - 100% of Scroll

### 📦 Elements
- **Abstract Title:** `ORIGEN` (Light Serif, Gold-to-Transparent Gradient).
- **HUD Marker:** Floating Glass-morphism Chip (`pureza de grano`) with a technical pointer.
- **Brutalist Message:** `la alquimia de lo eterno` (Lowercase, massive scale).

### ⚙️ Behavior
- **The Reveal:** Starts strictly at **64%** scroll mark.
- **Atmosphere:** Lower opacities, ethereal gradients, and subtle movements to create a sense of mystery.
- **Final Sequence:** All elements fade out at 95% to transition into the main page content.

---

## 🛠️ Technical Implementation
- **Scroll Engine:** GSAP + ScrollTrigger (400vh duration).
- **Rendering:** HTML5 Canvas (High-DPI optimized).
- **Assets:** 162 .webp frames located in `/public/images/hero-sequence/`.
- **Layout:** 12-column Grid System.
