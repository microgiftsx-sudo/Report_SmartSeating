# Legal Pages - Smart Seating Engine

## Overview

Two modern, interactive legal pages have been added to the Smart Seating Engine application:

1. **Terms of Service** (`/terms`)
2. **Privacy Policy** (`/privacy`)

## Features

### Terms of Service Page
- **Interactive Accordion**: Click-to-expand sections for each term
- **Sticky Navigation**: Quick jump links to each section
- **Scroll Progress Bar**: Visual indicator showing reading progress
- **Modern Animations**: Smooth transitions and hover effects
- **Responsive Design**: Works on all device sizes
- **Glass-morphism UI**: Beautiful translucent card design

### Privacy Policy Page
- **Tabbed Interface**: Easy navigation between privacy sections
- **Visual Data Flow**: Interactive statistics cards
- **Timeline Display**: Security measures shown in timeline format
- **User Rights Section**: Clear explanation of user rights with action buttons
- **Animated Background**: Floating orbs with gradient effects

## Design Highlights

- **No Emojis**: Modern SVG icons used throughout
- **Dark Theme**: Professional dark gradient background
- **Glass-morphism**: Translucent cards with blur effects
- **Smooth Animations**: CSS animations for enhanced UX
- **Interactive Elements**: Hover states, click effects, scroll animations

## Accessing the Pages

### Development Server
1. Start the dev server:
   ```bash
   npm run dev
   ```

2. Navigate to:
   - **Terms of Service**: http://localhost:3000/terms
   - **Privacy Policy**: http://localhost:3000/privacy

### Direct Links
- Home page has a navigation bar at the bottom with links to both pages
- Each page has cross-links to the other in the footer

## Technical Details

### Files Created
```
src/app/
├── terms/
│   ├── terms.component.ts
│   ├── terms.component.html
│   └── terms.component.css
└── privacy/
    ├── privacy.component.ts
    ├── privacy.component.html
    └── privacy.component.css
```

### Files Modified
- `src/app.component.ts` - Added routing support
- `src/app.component.html` - Added router outlet and navigation
- `src/app.routes.ts` - Route definitions
- `index.tsx` - Router provider setup

## Routing Configuration

Routes are configured in `src/app.routes.ts`:
```typescript
export const routes: Routes = [
  { path: '', component: AppComponent, pathMatch: 'full' },
  { path: 'terms', component: TermsComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: '**', redirectTo: '' }
];
```

## Customization

### Colors
Main color scheme:
- Primary: `#6366f1` (Indigo)
- Secondary: `#8b5cf6` (Purple)
- Accent: `#06b6d4` (Cyan)
- Highlight: `#ec4899` (Pink)

### Typography
- Font Family: Inter (UI), Fira Code (code)
- Base Size: 16px
- Scale: Modular scale with responsive clamping

### Animations
- Fade In: 0.6s ease-out
- Slide Up: 0.8s cubic-bezier
- Hover: 0.3s cubic-bezier(0.16, 1, 0.3, 1)

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile: ✅ Responsive design

## Performance

- Lazy loaded components
- Optimized animations (GPU accelerated)
- Minimal external dependencies
- Pure CSS animations (no JS animation libraries)

## Future Enhancements

Potential additions:
- Multi-language support
- Print-optimized versions
- Accessibility improvements (ARIA labels)
- Dark/light theme toggle
- Search functionality within legal pages

## Legal Content

**Note**: The actual legal content in these pages is placeholder text. For production use, replace with:
- Actual terms of service reviewed by legal counsel
- Real privacy policy compliant with applicable laws (GDPR, CCPA, etc.)
- Accurate data collection and usage information
- Correct contact information

---

Generated with modern design principles and best practices for 2025 web standards.
