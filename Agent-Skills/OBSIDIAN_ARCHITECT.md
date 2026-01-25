# The Obsidian Architect (Mastery of High-End Sensory Experiences)

> "The screen is not a document; it is a sanctum for the ritual."

This skill definition instructs the agent to go beyond "creative motion" and embrace the role of a **Cinematic Technologist**. It captures the workflow used to build complex, narrative-driven interfaces for **The Obsidian Ritual**.

## 1. The Mindset: Concept Over Layout
Don't start with columns and rows. Start with a **Metaphor**.
*   **The Vessel:** A deep, obsidian container where the content "pours" in.
*   **The Sensory Ledger:** A HUD overlay that treats the user as a Master Roaster identifying the soul of the bean.
*   **The Awakening:** A masking effect where the user looks *through* the darkness into the golden crema.

**Directive:** Always name the concept before writing the code. "I am building [Concept Name]."

## 2. Advanced Techniques & "The Secret Sauce"

### Diegetic UI (Narrative Interfaces)
Don't just add a "Scroll Down" text. Make it part of the ritual.
*   *Instead of:* A simple arrow.
*   *Do this:* A vertical line with harvest data (`ALT: 1800m`) and an "EQUILIBRIUM ACHIEVED" ticker.
*   *Why:* It turns the user into the connoisseur.

### DOM-Based 3D (The "No-Canvas" 3D)
You don't always need Three.js. You can achieve AAA results with CSS3D + GSAP.
*   **The Sandwich Technique:** Layer elements in Z-space (`translateZ`).
    *   *Back:* Blurred Hero Sequence (`-200px`)
    *   *Middle:* Floating Aroma Particles (`0px`)
    *   *Front:* Sharp Typography (`+100px`)
*   **The Tilt:** Bind mouse coordinates to `rotateX` and `rotateY` of a container with `perspective: 1000px`. Use `gsap.quickTo` for zero-lag physics.

### The "Submersion" Transition
The most powerful scroll effect is **Scale + Penetration**.
*   Start with a framed cup or bean.
*   As the user scrolls, scale it to cover the viewport (`width: 100vw`, `height: 100vh`).
*   Fade out the world and enter the liquid texture.
*   *Result:* The user feels they have physically entered the coffee.

## 3. Performance & Optimization (The "60fps Rule")
A beautiful animation that lags is a failure.
*   **Math-Based Smoothing:** Use `gsap.quickTo` or Linear Interpolation (Lerp) for mouse reactions.
*   **Will-Change:** Essential for 3D transforms (`will-change: transform`).
*   **Clean Up:** Stop render loops and hide elements that are not in the viewport.

## 4. The "Director" Workflow
1.  **Establish the Atmosphere (Theme):** "The Smoked Sanctum" (Deep shadows and light refractions) or "The Golden Pour" (High contrast, liquid highlights).
2.  **Define the Anchor:** What is the single object the user should stare at? (The Espresso Drop).
3.  **Add Life:** Small, autonomous movements (drifting gold dust, breathing glows, updating roast profile tickers) make the interface feel alive.
4.  **Direct the Camera:** Use scroll to zoom, pan, and focus. Treat the browser as a camera lens.

## 5. Example Prompt for the AI
*"Refactor this hero section. Use the 'Obsidian Architect' skill. I want a concept called 'The Golden Extraction'. Dark void atmosphere, floating aroma notes reacting to the mouse, and a central drop that expands to fill the screen as we scroll down."*