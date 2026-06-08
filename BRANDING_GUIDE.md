# GreenPulse Branding Guide

## Logo Components Overview

The GreenPulse project now includes three professional logo variants designed to work seamlessly across different contexts.

### 1. **GreenPulseLogo** (Default Icon Logo)
**File:** `src/components/GreenPulseLogo.jsx`

The primary logo component used throughout the application.

**Features:**
- Compact icon design with optional text
- Responsive sizing
- Gradient green color scheme (#22c55e to #059669)
- Leaf and pulse heartbeat elements
- Drop shadow effect

**Usage:**
```jsx
import GreenPulseLogo from './components/GreenPulseLogo';

// Icon only
<GreenPulseLogo size={32} showText={false} />

// Icon with text (default)
<GreenPulseLogo size={28} showText={true} />

// Custom styling
<GreenPulseLogo className="my-custom-class" />
```

**Props:**
- `size` (number): Logo icon size in pixels. Default: `28`
- `showText` (boolean): Show "GreenPulse" text. Default: `true`
- `className` (string): Custom CSS class name

**Best For:**
- Navigation bars
- Favicons
- Header branding
- Social media profiles

---

### 2. **HorizontalLogo** (Compact Navbar Logo)
**File:** `src/components/HorizontalLogo.jsx`

A compact horizontal variant optimized for navigation bars and tight spaces.

**Features:**
- Horizontal layout with integrated badge background
- Icon + text in a single component
- Subtle background blur effect
- Medium-sized font for navbar usage

**Usage:**
```jsx
import HorizontalLogo from './components/HorizontalLogo';

<HorizontalLogo size={24} />
<HorizontalLogo className="nav-logo" />
```

**Props:**
- `size` (number): Logo icon size in pixels. Default: `28`
- `className` (string): Custom CSS class name

**Best For:**
- Navigation headers
- Top app bars
- Compact branding areas
- Authentication pages

---

### 3. **FullLogo** (Hero & Marketing Logo)
**File:** `src/components/FullLogo.jsx`

A larger, more prominent logo with tagline for hero sections and marketing materials.

**Features:**
- Larger icon with accompanying text
- Tagline support ("Snap • Sort • Grow")
- Prominent gradient text
- Ideal for landing pages and hero sections

**Usage:**
```jsx
import FullLogo from './components/FullLogo';

// Default size
<FullLogo />

// Custom size
<FullLogo size={120} />

// With custom styling
<FullLogo className="hero-logo" />
```

**Props:**
- `size` (number): Logo icon size in pixels. Default: `80`
- `className` (string): Custom CSS class name

**Best For:**
- Hero sections
- Landing pages
- About pages
- Marketing materials
- Loading screens

---

## Favicon

The favicon has been updated to a professional, scalable SVG format.

**File:** `public/favicon.svg`

**Displays as:**
- Browser tab icon
- Bookmarks
- Address bar
- Apple touch icon

The favicon automatically appears in:
- `index.html` (configured with `<link rel="icon" href="/favicon.svg" />`)
- Apple devices (via `rel="apple-touch-icon"`)

---

## Color Palette

The entire GreenPulse brand uses this carefully chosen color palette:

| Color | Hex Value | Usage |
|-------|-----------|-------|
| Primary Green | `#22c55e` | Main brand color, light gradient |
| Deep Green | `#059669` | Dark gradient, secondary accents |
| Accent Green | `#16a34a` | Leaf details, highlights |
| Light Green | `#bbf7d0` | Gradient highlights |
| Medium Green | `#4ade80` | Gradient transitions |
| Stem Green | `#10b981` | Leaf stems |

---

## Design Elements

### Logo Components Include:
- **Leaf shapes**: Representing eco-friendliness and growth
- **Pulse line**: Representing the "Pulse" brand and vitality
- **Gradient fills**: Modern, dynamic feel
- **Rounded corners**: Friendly, approachable design
- **Drop shadows**: Depth and polish

### Design Principles:
- 🌱 **Green-focused**: Eco-friendly aesthetics
- ✨ **Modern**: Clean, contemporary design
- 📱 **Responsive**: Works at any size
- ♿ **Accessible**: High contrast, readable
- 🎨 **Consistent**: Unified across all components

---

## Implementation Examples

### In Navigation Component
```jsx
import HorizontalLogo from './components/HorizontalLogo';

export function Navbar() {
  return (
    <nav className="navbar">
      <HorizontalLogo />
      {/* Navigation items */}
    </nav>
  );
}
```

### In Hero Section
```jsx
import FullLogo from './components/FullLogo';

export function Hero() {
  return (
    <section className="hero">
      <FullLogo size={100} />
      <h1>Welcome to GreenPulse</h1>
    </section>
  );
}
```

### In Settings/Profile
```jsx
import GreenPulseLogo from './components/GreenPulseLogo';

export function ProfileHeader() {
  return (
    <header>
      <GreenPulseLogo size={40} showText={true} />
    </header>
  );
}
```

---

## Responsive Sizing Guide

| Context | Component | Size | showText |
|---------|-----------|------|----------|
| Mobile Navbar | HorizontalLogo | 24-28 | N/A |
| Desktop Navbar | GreenPulseLogo | 32-40 | true |
| Hero Section | FullLogo | 100-150 | N/A |
| Small Icon | GreenPulseLogo | 16-20 | false |
| Tab/Favicon | Favicon SVG | N/A | N/A |

---

## Export & Usage Notes

All logo components:
- ✅ Export as default exports
- ✅ Accept inline styling via props
- ✅ Use gradient fills for modern appearance
- ✅ Include drop shadows for depth
- ✅ Are fully responsive

To use in your pages:
```jsx
// Import the component you need
import GreenPulseLogo from './components/GreenPulseLogo';
import HorizontalLogo from './components/HorizontalLogo';
import FullLogo from './components/FullLogo';

// Use in your JSX
<GreenPulseLogo size={32} showText={true} />
```

---

## Future Enhancements

Possible additions:
- Animated logo variant (pulsing animation)
- Dark mode logo version
- Monochrome logo for grayscale contexts
- Logo with background color variants

