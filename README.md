A high-performance personal portfolio website built with Next.js, TypeScript, and TailwindCSS. This website serves as a personal brand hub showcasing skills, achievements, projects, and professional journey.

 Features

- **Modern Tech Stack**: Next.js 15, TypeScript, TailwindCSS
- **Responsive Design**: Fully responsive across all devices
- **Dark/Light Mode**: Theme toggle with system preference support
- **Smooth Animations**: Framer Motion for professional animations
- **SEO Optimized**: Meta tags, OpenGraph, and Twitter cards
- **Performance Focused**: Optimized Core Web Vitals
- **Accessible**: Following WCAG guidelines

Sections

1. **Hero Section**: Introduction with call-to-action buttons
2. **About Me**: Personal story, values, and journey map
3. **Resume & Skills**: Interactive skills bars and experience timeline
4. **Projects Portfolio**: Categorized project showcase
5. **Contact Form**: Collaboration opportunities and contact methods

Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Theme**: next-themes
- **Icons**: Lucide React
- **Deployment**: Vercel

Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production
```bash
npm run build
npm run start
```
Customization

Personal Information
Update the following files with your personal information:

- `src/components/sections/hero.tsx` - Name, tagline, and stats
- `src/components/sections/about.tsx` - Personal story and values
- `src/components/sections/resume.tsx` - Skills, experience, and achievements
- `src/components/sections/projects.tsx` - Your projects and portfolio
- `src/components/sections/contact.tsx` - Contact information
- `src/components/layout/footer.tsx` - Social media links

SEO & Metadata
Update metadata in `src/app/layout.tsx`:
- Site title and description
- OpenGraph images and URLs
- Keywords and author information

Deployment

Deploy to Vercel (Recommended)

1. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js and configure build settings

2. **Environment Variables**:
   If needed, add environment variables in Vercel dashboard

3. **Custom Domain**:
   - Add your custom domain in Vercel project settings
   - Update DNS records as instructed

Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

Key Features Implemented

- ✅ Responsive navigation with mobile menu
- ✅ Dark/light mode toggle
- ✅ Smooth scroll animations
- ✅ Interactive skill progress bars
- ✅ Project filtering (categories)
- ✅ Contact form with validation
- ✅ SEO optimization
- ✅ Performance optimization

Contact

For questions or collaboration opportunities:
- Email: your.email@example.com
- LinkedIn: [linkedin.com/in/yourusername](https://linkedin.com/in/yourusername)
- GitHub: [github.com/yourusername](https://github.com/yourusername)
