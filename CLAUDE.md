# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a presentation created using Impress.js for a UCI guest lecture on career development in tech. The presentation covers:
- Personal career journey from UCI to becoming Head of Engineering at GoLinks
- Job search strategies for new graduates
- Industry trends and technology insights
- Networking and personal branding advice

## Commands

### Running the Presentation
```bash
# Open the presentation locally
open index.html

# Or use a local web server
python -m http.server 8000
# Then open http://localhost:8000/index.html
```

### Development
```bash
# No build process required - static HTML/CSS/JS
# Edit HTML files directly and refresh browser to see changes
```

## Architecture

### Presentation Framework
- **Impress.js**: 3D presentation framework used for slide transitions and effects
- Located in `lecture/impress2.js`
- Slides are positioned using x, y, z coordinates and scale attributes

### Key Files
- `index.html`: Main presentation file with newer content and styling
- `presentation.html`: Alternative presentation file with different content structure
- `lecture/styles.css`: Shared CSS styles
- `lecture/d3-graphics.js` & `lecture/svg-graphics.js`: Visualization libraries for dynamic graphics

### Slide Structure
- Each slide is a `<div>` with class `step`
- Positioning controlled by `data-x`, `data-y`, `data-z`, and `data-scale` attributes
- Header slides: same `data-y` location, 3000 pixels apart on `data-x`
- Sub-slides: same `data-x`, 2000 pixels apart on `data-y`

### Assets
- Images stored in `lecture/photos/`
- Custom graphics and visualizations using D3.js and SVG.js
- Bootstrap-inspired styling for consistent typography and components

## Important Notes
- The presentation is optimized for desktop viewing (1024px viewport)
- Loading overlay provides smooth initial experience
- Fallback message for unsupported browsers
- Navigate using spacebar, arrow keys, or touch on mobile