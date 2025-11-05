# Mobile Responsive Quick Reference Guide

## Common Tailwind Responsive Patterns

### Layout Patterns

#### Flex Direction (Stack on mobile, row on desktop)
```jsx
// Before: <div className="flex gap-8">
// After:
<div className="flex flex-col md:flex-row gap-4 md:gap-8">
```

#### Width Distribution
```jsx
// Before: <div className="w-1/4"> (25% width - breaks on mobile)
// After:
<div className="w-full md:w-1/4">
  // Full width on mobile, 25% on desktop
</div>

// Three-column layout
<div className="flex flex-col md:flex-row gap-4">
  <div className="w-full md:w-1/3">Column 1</div>
  <div className="w-full md:w-1/3">Column 2</div>
  <div className="w-full md:w-1/3">Column 3</div>
</div>
```

#### Height Adjustments
```jsx
// Before: <div className="h-96"> (fixed 384px - too tall for mobile)
// After:
<div className="h-auto md:h-96">
  // Auto height on mobile, fixed height on desktop
</div>
```

### Spacing Patterns

#### Padding
```jsx
// Before: <div className="p-6">
// After:
<div className="p-3 md:p-6">
  // Smaller padding on mobile, larger on desktop
</div>

// Horizontal padding
<div className="px-3 md:px-6">
</div>

// Vertical padding
<div className="py-4 md:py-6">
</div>
```

#### Gaps
```jsx
// Before: <div className="flex gap-8">
// After:
<div className="flex gap-4 md:gap-8">
  // Smaller gaps on mobile
</div>
```

#### Margins
```jsx
// Before: <div className="mt-8">
// After:
<div className="mt-4 md:mt-8">
</div>
```

### Positioning Patterns

#### Fixed Positioning
```jsx
// Before: <div className="fixed top-6 left-6">
// After:
<div className="fixed top-3 md:top-6 left-3 md:left-6">
  // Closer to edges on mobile
</div>
```

### Text Patterns

#### Font Sizes
```jsx
// Before: <h1 className="text-2xl">
// After:
<h1 className="text-xl md:text-2xl lg:text-3xl">
  // Responsive text sizes
</h1>

// Important: Always ensure minimum 16px on mobile
<p className="text-base md:text-lg">
  // Base is 16px (text-base), prevents iOS zoom
</p>
```

### Visibility Patterns

#### Show/Hide Elements
```jsx
// Hide on mobile, show on desktop
<div className="hidden md:block">Desktop Only</div>

// Show on mobile, hide on desktop
<div className="block md:hidden">Mobile Only</div>
```

### Button Patterns

#### Touch-Friendly Buttons
```jsx
// Before: <button className="px-4 py-2">
// After:
<button className="px-4 py-3 md:py-2 min-h-[44px] md:min-h-0">
  // Minimum 44px height for touch targets
</button>
```

### Image Patterns

#### Responsive Images
```jsx
// Before: <img className="h-12 w-12">
// After:
<img className="h-8 w-8 md:h-12 md:w-12">
  // Smaller on mobile
</img>
```

---

## Component-Specific Patterns

### Dashboard Cards
```jsx
// Before:
<NeumorphicCard className="w-1/5 h-96 p-6">
  <PomodoroTimer />
</NeumorphicCard>

// After:
<NeumorphicCard className="w-full md:w-1/5 h-auto md:h-96 p-4 md:p-6">
  <PomodoroTimer />
</NeumorphicCard>
```

### MoodBoard Widget
```jsx
// Before:
<div className="flex gap-8 w-full">
  <div className="w-1/4">VoiceAI</div>
  <div className="w-1/3">Calendar</div>
  <div className="w-5/12">Stats</div>
</div>

// After:
<div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full">
  <div className="w-full md:w-1/4">VoiceAI</div>
  <div className="w-full md:w-1/3">Calendar</div>
  <div className="w-full md:w-5/12">Stats</div>
</div>
```

### Header Elements
```jsx
// Logo + Theme Dropdown
<div className="fixed top-3 md:top-6 left-3 md:left-6 z-50 flex items-center gap-2 md:gap-4">
  <img className="h-8 w-8 md:h-12 md:w-12" />
  <ThemeDropdown />
</div>

// User Dropdown
<div className="fixed top-3 md:top-6 right-3 md:right-6 z-50">
  <UserDropdown />
</div>

// Toggle Switch (Study/Wellness)
<div className="fixed top-16 md:top-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%] md:w-auto max-w-xs md:max-w-none">
  {/* Toggle content */}
</div>
```

---

## Common Issues & Quick Fixes

### Issue: Horizontal Scrolling
```jsx
// Add to body or main container
<div className="overflow-x-hidden">
```

### Issue: Content Too Wide
```jsx
// Wrap content
<div className="w-full max-w-full overflow-x-auto">
  {/* Content */}
</div>
```

### Issue: Fixed Elements Overlapping
```jsx
// Increase top spacing on mobile
<div className="fixed top-16 md:top-6">
  // More space on mobile
</div>
```

### Issue: Text Too Small
```jsx
// Ensure minimum 16px
<p className="text-base md:text-lg">
  // text-base = 16px minimum
</p>
```

### Issue: Buttons Too Small
```jsx
// Add minimum touch target size
<button className="min-h-[44px] min-w-[44px] px-4 py-3">
  // 44px minimum for touch
</button>
```

---

## Breakpoint Reference

Tailwind CSS Breakpoints:
- **Default (mobile):** 0px - 639px
- **sm:** 640px+
- **md:** 768px+
- **lg:** 1024px+
- **xl:** 1280px+
- **2xl:** 1536px+

### Usage
```jsx
// Mobile only (default)
className="text-sm"

// Small screens and up (640px+)
className="sm:text-base"

// Medium screens and up (768px+)
className="md:text-lg"

// Large screens and up (1024px+)
className="lg:text-xl"

// Chain multiple breakpoints
className="text-sm md:text-base lg:text-lg xl:text-xl"
```

---

## Testing Checklist

### Mobile Testing (375px - 430px)
- [ ] No horizontal scrolling
- [ ] All text readable (min 16px)
- [ ] All buttons touchable (min 44x44px)
- [ ] Cards stack vertically
- [ ] Header elements don't overlap
- [ ] Overlays work correctly
- [ ] Forms are usable

### Tablet Testing (768px - 1024px)
- [ ] Layout adapts to 2-column
- [ ] Spacing is appropriate
- [ ] Touch targets still adequate
- [ ] Navigation works smoothly

### Desktop Testing (1024px+)
- [ ] Original layout preserved
- [ ] All features work as before
- [ ] No regression in functionality

---

## Performance Tips

### Reduce Animations on Mobile
```jsx
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
const starCount = isMobile ? 3 : 8
```

### Lazy Load Heavy Components
```jsx
import { lazy, Suspense } from 'react'

const World = lazy(() => import('./components/World'))

// In component
{window.innerWidth >= 768 && (
  <Suspense fallback={<div>Loading...</div>}>
    <World />
  </Suspense>
)}
```

---

## Quick Copy-Paste Templates

### Responsive Card Container
```jsx
<div className="flex flex-col md:flex-row gap-4 md:gap-6 p-3 md:p-6">
  {/* Cards */}
</div>
```

### Responsive Card
```jsx
<div className="w-full md:w-1/3 h-auto md:h-96 p-4 md:p-6">
  {/* Content */}
</div>
```

### Responsive Header
```jsx
<div className="fixed top-3 md:top-6 left-3 md:left-6 z-50">
  {/* Header content */}
</div>
```

### Responsive Button
```jsx
<button className="px-4 py-3 md:py-2 min-h-[44px] text-base md:text-lg">
  Click Me
</button>
```

---

## Next Steps

1. Start with `App.jsx` - Make header responsive
2. Then `study.jsx` and `wellness.jsx` - Main dashboards
3. Then `moodboard.jsx` - MoodBoard widgets
4. Then individual components
5. Test frequently on real devices

Remember: **Mobile-first** - Start with mobile styles, then add desktop styles with `md:`, `lg:`, etc.

