# Sage Academy Design System

### 1. Overview & Creative North Star
**Creative North Star: "The Modern Archivist"**
Sage Academy is a design system built for focused, high-level learning. It eschews the chaotic energy of typical EdTech platforms for the quiet, authoritative atmosphere of a private library or a curated scientific journal. The aesthetic is defined by "Organic Professionalism"—marrying the precision of academic research with the soft, tactile feel of premium off-white paper and natural sage tones.

The system breaks the standard "SaaS grid" by utilizing expansive whitespace (Spacing Level 3), heavy-weight editorial headings, and a refined "no-line" approach to structural division.

### 2. Colors
The palette is rooted in botanical neutrals and high-contrast ink-like tones.

- **Primary Role:** `#5A7163` (Sage) acts as the primary signifier of action and brand identity. It is used for active states, navigation highlights, and key iconography.
- **Surface Hierarchy:** 
  - **Base Background:** `#F9F9F7` (Bone) serves as the primary canvas, reducing eye strain during long study sessions.
  - **Surface High/Bright:** `#ffffff` is reserved strictly for interactive cards and floating navigation bars to create a crisp "paper on desk" effect.
- **The "No-Line" Rule:** Visual sectioning should be achieved through the transition from `#F9F9F7` (Background) to `#ffffff` (Surface) or through subtle 1px `#E3E5E4` (Outline) strokes that only appear on specific component boundaries.
- **Signature Textures:** Use `5%` opacity overlays of the Primary color (`#5A7163/0.05`) for button backgrounds to create a "tinted glass" feel without the heavy weight of solid fills.

### 3. Typography
The system uses a sophisticated tri-font pairing to distinguish between narrative, data, and structural information.

- **Display & Headlines:** Cabinet Grotesk (mapped to `headline_font`). High-impact, bold weights used at **48px** for page titles to establish clear entry points.
- **Body & Narrative:** Satoshi/Inter (mapped to `body_font`). Set at **16px** with a relaxed line height for readability.
- **Metadata & Labels:** Space Grotesk (mapped to `label_font`). Used at **10px** and **11px** in All-Caps with letter-spacing (+0.05em) for secondary metadata like timestamps and difficulty levels.

**Refined Scale (Based on CSS Truth):**
- **Hero Title:** 48px / Bold
- **Section Heading:** 1.25rem (20px) / Bold
- **Body Text:** 16px / Regular
- **Utility/Button:** 11px / Bold / Uppercase
- **Micro-labels:** 10px / Bold / Uppercase

### 4. Elevation & Depth
Elevation is communicated through subtle shifts in luminosity rather than aggressive shadows.

- **The Layering Principle:** The "Stack" follows: Background (`#F9F9F7`) -> Surface Card (`#FFFFFF`) -> Interactive Hover (Primary Outline).
- **Ambient Shadows:** Only one shadow is permitted: `shadow-sm` (0 1px 2px 0 rgba(0, 0, 0, 0.05)). This is used exclusively for floating navigation or active play buttons to indicate "clickability."
- **Glassmorphism:** The `TopNavBar` utilizes a `bg-white/80` background with a `backdrop-blur-md` to maintain context while scrolling through content.

### 5. Components
- **Study Resource Cards:** Must use a 4px (`rounded-sm`) corner radius. High contrast between the white card and the off-white background is essential. Hover states must trigger a color shift in the border from `#E3E5E4` to `#5A7163`.
- **Primary Buttons:** Editorial-style buttons use a 1px border with 11px Bold Uppercase text. They rely on "hover-to-fill" interactions rather than permanent solid backgrounds.
- **Iconography:** Use "Material Symbols Outlined" with a custom weight of 400. Icons should be paired with a tinted container (`Primary 5%`) for visibility.
- **Navigation:** Vertical sidebars should be narrow (64px) and semi-transparent, acting as a "dock" rather than a structural wall.

### 6. Do's and Don'ts
- **Do:** Use All-Caps and tracking for metadata to create a "professional report" look.
- **Do:** Maintain wide margins (max-width 5xl/1024px for content) to mimic book layouts.
- **Don't:** Use heavy drop shadows or large rounded corners (pill shapes).
- **Don't:** Use solid black `#000000`. Always use `#2B302D` for text to maintain the "charcoal on paper" soft contrast.