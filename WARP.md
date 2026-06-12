# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

A high-performance personal portfolio website built with Next.js 15, TypeScript, and TailwindCSS. The site showcases skills, achievements, projects, and professional journey with modern animations and responsive design.

## Development Commands

### Essential Commands

```bash
# Development server with Turbopack
npm run dev

# Production build with Turbopack
npm run build

# Start production server
npm start

# Lint code with ESLint
npm run lint

# Format code with Prettier
npx prettier --write .

# Type checking
npx tsc --noEmit
```

### Development Workflow

- The project uses **Turbopack** for both dev and build for faster compilation
- Development server runs on `http://localhost:3000`
- Hot reload is enabled for all file changes
- TypeScript strict mode is enabled

## Architecture Overview

### Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: TailwindCSS v4 with PostCSS
- **Animations**: Framer Motion
- **Theming**: next-themes with system preference support
- **Icons**: Lucide React
- **Font**: Inter (Google Fonts)

### Directory Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with metadata, theme provider
│   ├── page.tsx          # Home page with all sections
│   └── globals.css       # Global styles and Tailwind imports
├── components/
│   ├── layout/           # Layout components
│   │   ├── header.tsx    # Navigation with mobile menu, theme toggle
│   │   └── footer.tsx    # Site footer with social links
│   ├── providers/        # React providers
│   │   └── theme-provider.tsx  # Theme context provider
│   └── sections/         # Page sections
│       ├── hero.tsx      # Landing section with stats
│       ├── about.tsx     # Personal story and values
│       ├── resume.tsx    # Skills, experience, achievements
│       ├── projects.tsx  # Portfolio showcase
│       └── contact.tsx   # Contact form and information
├── lib/
│   └── utils.ts          # Utility functions (cn helper)
└── types/
    └── index.ts          # TypeScript type definitions
```

### Key Design Patterns

#### Component Architecture

- **Section-based layout**: Each major page area is a separate component in `src/components/sections/`
- **Layout components**: Reusable header/footer in `src/components/layout/`
- **Provider pattern**: Theme provider wraps the entire app for dark/light mode

#### State Management

- **Theme state**: Managed by `next-themes` with system preference detection
- **Mobile menu**: Local state in header component
- **Form state**: Local state in contact component (when implemented)

#### Styling Approach

- **Utility-first**: TailwindCSS for all styling
- **Responsive design**: Mobile-first approach with `sm:`, `md:`, `lg:` breakpoints
- **Dark mode**: Automatic dark/light mode with `dark:` variants
- **Animations**: Framer Motion for smooth transitions and scroll animations

#### Type Safety

- **Strict TypeScript**: All components are fully typed
- **Interface definitions**: Data structures defined in `src/types/index.ts`
- **Props typing**: All component props explicitly typed

### Key Features Implementation

#### Navigation System

- Fixed header with backdrop blur effect
- Smooth scroll to sections using anchor links (#home, #about, etc.)
- Mobile-responsive hamburger menu with slide animations
- Theme toggle with icon switching

#### Animation Strategy

- **Framer Motion**: Used for all animations
- **Scroll-triggered**: Sections animate in as they come into view
- **Staggered animations**: Elements animate with delays for polished effect
- **Hover states**: Interactive elements have smooth hover transitions

#### Content Management

- **Personal Information**: Hardcoded in component files, easy to update
- **SEO Metadata**: Centralized in `src/app/layout.tsx`
- **Social Links**: Configured in footer component
- **Projects Data**: Defined using Project interface from types

## Customization Guide

### Personal Information Updates

- **Hero section**: Update name, tagline, stats in `src/components/sections/hero.tsx`
- **SEO metadata**: Update title, description, OpenGraph data in `src/app/layout.tsx`
- **Contact details**: Update in `src/components/sections/contact.tsx`
- **Social links**: Update in `src/components/layout/footer.tsx`

### Content Structure

- **Projects**: Add/modify projects using the `Project` interface
- **Skills**: Add/modify skills using the `Skill` interface
- **Experience**: Add/modify work history using the `Experience` interface
- **Achievements**: Add/modify accomplishments using the `Achievement` interface

### Styling Customization

- **Colors**: Modify TailwindCSS theme in configuration
- **Fonts**: Change in `src/app/layout.tsx` (currently Inter)
- **Animations**: Adjust Framer Motion parameters in component files
- **Responsive breakpoints**: Standard Tailwind breakpoints (sm, md, lg, xl)

## Deployment Configuration

### Vercel Deployment

- **Framework**: Auto-detected as Next.js
- **Build command**: `npm run build` (with Turbopack)
- **Output**: `.next` directory
- **Regions**: Configured for `iad1` (US East)
- **Cache headers**: Optimized for fonts and images (1 year cache)

### Environment Setup

- **Node.js**: Requires Node.js 18.x or higher
- **Package manager**: npm (lock file present)
- **TypeScript**: Version 5.x with strict configuration

## Performance Optimizations

- **Turbopack**: Fast bundler for development and production
- **Font optimization**: Inter font with `display: swap`
- **Image optimization**: Next.js automatic image optimization
- **Code splitting**: Automatic with Next.js App Router
- **CSS optimization**: TailwindCSS with PostCSS processing
- **Cache headers**: Long-term caching for static assets via Vercel config
