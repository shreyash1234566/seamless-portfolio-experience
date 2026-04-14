
## Portfolio Conversion & Enhancement Plan

### Overview
Convert the uploaded "Avery Sketch" HTML portfolio into a full React/Vite project with component-based architecture, then enhance it with a parallax hero section and a real 3D laptop project showcase.

---

### 1. React Component Architecture
Break the monolithic HTML into clean React components:
- **Layout**: `Navbar`, `Footer`, `ScrollProgress`, `CustomCursor`
- **Sections**: `HeroSection`, `AboutSection`, `SkillsSection`, `ProjectsSection`, `TimelineSection`, `TestimonialsSection`, `ContactSection`
- **Shared**: `SectionHeader`, `WavyDivider`, `SkillsMarquee`

Port all CSS into Tailwind + CSS modules where needed. Import Google Fonts (Caveat, Playfair Display, Space Mono) via `index.css`.

---

### 2. Parallax Hero (GTA-style, inspired by just-a-web-developer.com)
- Large illustrated portrait on the **right side** that has a subtle parallax effect on scroll (moves slower than content)
- Hero text on the left scrolls normally while the portrait stays anchored with depth
- Use **Framer Motion** `useScroll` + `useTransform` for smooth parallax
- Keep the sketchy/handmade aesthetic — the portrait will use the existing SVG illustration scaled up with a parallax wrapper

---

### 3. Sticky Scroll About Section
- Left column: scrollable "chapters" that animate in as you scroll
- Right column: sticky illustrated portrait that rotates/transforms based on which chapter is active
- Implemented with Framer Motion scroll-linked animations + Intersection Observer

---

### 4. 3D Laptop Project Showcase (inspired by masontywong.com)
- Replace the CSS-only laptop with a **React Three Fiber** 3D laptop model
- The laptop screen displays project screenshots/colors that change as users navigate between projects
- Subtle idle rotation animation + mouse-follow tilt
- Below the laptop: project details with title, description, tech stack, and links
- Navigation dots to cycle through projects

---

### 5. OS Window Section
- Keep the macOS-style window containing the laptop scene
- Left sidebar with bio note, resume link, and social links
- Right side contains the 3D laptop + project carousel

---

### 6. Scroll-Driven Animations Throughout
- **Framer Motion** for all scroll-triggered reveals (fade-up, scale-in)
- Skills corkboard cards with 3D tilt on hover
- Timeline items that draw in as you scroll
- Testimonial cards with perspective tilt
- Smooth scroll progress bar

---

### 7. Additional Polish
- Custom pencil cursor (kept from original)
- Back-to-top button with scroll visibility
- Skills marquee ticker
- Wavy SVG dividers with draw-on animation
- Full responsive design (mobile: hide portrait, collapse sidebar, etc.)

### Libraries to Install
- `framer-motion` — scroll animations & parallax
- `@react-three/fiber@^8.18` + `@react-three/drei@^9.122.0` + `three@^0.160` — 3D laptop scene
