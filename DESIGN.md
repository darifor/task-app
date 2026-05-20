# Lumina Productivity Hub - Design System

**Design System Name:** Productive Clarity  
**Device Target:** MOBILE  
**Base Theme:** LIGHT  

---

## 🎨 Color Palette

### Base Colors
- **Primary:** `#4648d4` (Indigo)
- **Secondary:** `#b4136d` (Pink/Violet)
- **Tertiary:** `#006c49` (Green)
- **Background:** `#f8f9ff`
- **Surface:** `#f8f9ff`
- **Error:** `#ba1a1a`

### Surface & Containers
- **surface-dim:** `#cbdbf5`
- **surface-bright:** `#f8f9ff`
- **surface-container-lowest:** `#ffffff`
- **surface-container-low:** `#eff4ff`
- **surface-container:** `#e5eeff`
- **surface-container-high:** `#dce9ff`
- **surface-container-highest:** `#d3e4fe`
- **surface-variant:** `#d3e4fe`
- **surface-tint:** `#494bd6`
- **inverse-surface:** `#213145`

### On-Colors (Text/Icons on Backgrounds)
- **on-primary:** `#ffffff`
- **on-secondary:** `#ffffff`
- **on-tertiary:** `#ffffff`
- **on-background:** `#0b1c30`
- **on-surface:** `#0b1c30`
- **on-surface-variant:** `#464554`
- **on-error:** `#ffffff`
- **inverse-on-surface:** `#eaf1ff`

### Outlines
- **outline:** `#767586`
- **outline-variant:** `#c7c4d7`

*(For extended containers and fixed colors, refer to the full JSON definition in the source).*

---

## ✍️ Typography

**Primary Font Family:** Inter

| Style | Font Size | Font Weight | Line Height | Letter Spacing |
|---|---|---|---|---|
| **headline-lg** | 32px | 700 (Bold) | 40px | -0.02em |
| **headline-lg-mobile**| 28px | 700 (Bold) | 36px | -0.01em |
| **headline-md** | 24px | 600 (Semi-Bold) | 32px | 0 |
| **headline-sm** | 20px | 600 (Semi-Bold) | 28px | 0 |
| **body-lg** | 16px | 400 (Regular) | 24px | 0 |
| **body-md** | 14px | 400 (Regular) | 20px | 0 |
| **label-lg** | 14px | 600 (Semi-Bold) | 20px | 0.1px |
| **label-md** | 12px | 500 (Medium) | 16px | 0.5px |
| **label-sm** | 11px | 500 (Medium) | 16px | 0 |

---

## 📏 Spacing Scale

- **xs:** 4px
- **sm (base):** 8px
- **md:** 16px
- **lg:** 24px
- **xl:** 32px
- **gutter-mobile:** 16px
- **margin-mobile:** 16px
- **max-width-mobile:** 100%

---

## 🔲 Shapes (Border Radius)

- **sm:** 0.25rem (4px)
- **DEFAULT:** 0.5rem (8px)
- **md:** 0.75rem (12px)
- **lg:** 1rem (16px)
- **xl:** 1.5rem (24px)
- **full:** 9999px (Circular)

---

## 📱 Screens

The project contains the following screens mapped out in the design files (both Light and Dark modes available for most):

1. **Onboarding**
2. **Dashboard** 
3. **Lista de Tareas**
4. **Calendario**
5. **Estadísticas**
6. **Crear Tarea**
7. **Configuración**

---

## 📖 Style Guidelines

### Brand & Style
The design system is centered on the concept of "Effortless Focus." It prioritizes cognitive ease by blending **Minimalism** with **Modern Corporate** sensibilities, heavily influenced by Material Design 3 (MD3). The goal is to create a digital environment that feels spacious and calm, yet highly functional for power users of task management and note-taking apps.

The aesthetic utilizes expansive whitespace, subtle motion, and a clear visual hierarchy to reduce friction. It targets professionals and students who require a tool that feels "light" enough for quick capture but "structured" enough for complex project organization. The emotional response should be one of quiet confidence and organized control.

### Layout & Spacing
The layout follows an 8-point grid system to ensure visual consistency and mathematical harmony across all screen sizes. 

- **Mobile:** Uses a fluid layout with a 16px margin on both sides. Content is organized in a single column or simple 2-column grids for dashboard views.
- **Spacing Rhythm:** 16px (md) is the default for most component internal padding and vertical gaps between list items. 24px (lg) is used to separate distinct logical sections.
- **Alignment:** All text and icons are vertically centered within their hit areas to maintain the "clean" aesthetic.

### Elevation & Depth
This design system uses a combination of **Tonal Layers** and **Ambient Shadows** to communicate hierarchy.

1.  **Level 0 (Base):** The main background. In light mode, this is off-white (#F8FAFC); in dark mode, a deep slate.
2.  **Level 1 (Card/Surface):** Elements like task cards or list containers. These use a white background with a very soft, diffused shadow (15% opacity, 12px blur, 4px Y-offset) to appear slightly lifted.
3.  **Level 2 (Overlay/FAB):** Floating Action Buttons and Modals. These use a higher elevation with a more pronounced shadow and the primary color to indicate they are at the top of the stack.
4.  **Glassmorphism:** Navigation bars and bottom sheets use a `backdrop-filter: blur(10px)` with 80% opacity to maintain context of the content underneath while providing a clear surface for interaction.

### Components

- **Checkboxes:** Instead of traditional square boxes, use a "Circle-to-Fill" interaction. When unchecked, it is a subtle 2px ring. When checked, it fills with the primary color and triggers a slight haptic pulse and a "strike-through" animation on the task text.
- **Floating Action Button (FAB):** A large, circular button in the bottom right corner using the primary Indigo. It contains a "plus" icon. On scroll, it may shrink into a smaller circle or extend into a "pill" shape with the label "New Task."
- **Task Cards:** Cards should have no border, relying instead on the "Level 1" elevation. They include a horizontal progress bar at the bottom if the task contains sub-tasks.
- **Input Fields:** Use the MD3 "Filled" style with a subtle background tint and a high-contrast bottom indicator line that expands from the center when focused.
- **Progress Indicators:** Use circular "rings" for overall daily productivity and linear bars for project-specific progress. Both should use a smooth spring animation when updating.
- **Chips/Tags:** Small, pill-shaped elements with low-saturation background tints corresponding to the tag color, ensuring text remains the primary focus.
