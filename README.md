# jeanfelis.me

A modern portfolio website built with Next.js, TypeScript, Tailwind CSS v4, and Sanity CMS. Features a one-page layout with interactive animations, showcasing experience, projects, and blog posts with full accessibility and SEO optimization.

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **CMS**: Sanity
- **Animations**: GSAP + Motion (Framer Motion)
- **Linting**: ESLint + jsx-a11y
- **Formatting**: Prettier
- **Deployment**: Netlify-ready

## 📁 Project Structure

```text
├── src/
│   ├── app/
│   │   ├── studio/[[...index]]/          # Sanity Studio access
│   │   ├── globals.css                    # Tailwind + a11y styles
│   │   ├── layout.tsx                     # SEO + a11y layout
│   │   └── page.tsx                       # One-page portfolio layout
│   ├── components/
│   │   ├── BlurText.tsx                   # Animated text blur component
│   │   ├── ScrollReveal.tsx               # GSAP scroll-triggered animations
│   │   └── StaggeredMenu.tsx              # Interactive navigation menu
│   └── sanity/
│       ├── client.ts                      # Sanity client
│       ├── config.ts                      # Sanity configuration
│       ├── fetchers.ts                    # Data fetching functions
│       ├── image.ts                       # Image URL builder
│       └── queries.ts                     # GROQ queries
├── sanity/
│   ├── schemas/
│   │   ├── documents/
│   │   │   ├── experience.ts             # Experience schema
│   │   │   ├── page.ts                   # Page schema
│   │   │   ├── person.ts                 # Person schema
│   │   │   ├── post.ts                   # Blog post schema
│   │   │   ├── project.ts                # Project schema
│   │   │   └── settings.ts               # Settings schema
│   │   └── index.ts                       # Schema exports
│   └── config.ts                          # Sanity configuration
├── Design.json                            # Design system configuration
├── .env.local                             # Environment variables
├── eslint.config.mjs                      # ESLint + jsx-a11y config
├── tsconfig.json                          # Strict TypeScript config
└── package.json                           # Dependencies & scripts
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server (localhost:3000) + Sanity Studio (/studio)

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint with a11y checks
npm run format       # Format code with Prettier
npm run typegen      # Generate Sanity TypeScript types
```

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

The `.env.local` file is already configured with:

```env
NEXT_PUBLIC_SITE_URL=https://jeanfelis.me
NEXT_PUBLIC_SANITY_PROJECT_ID=####
NEXT_PUBLIC_SANITY_DATASET=production/development
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
# SANITY_READ_TOKEN=   # optional for previews/drafts
```

### 3. Start Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### 4. Access Sanity Studio

The Sanity Studio is integrated into the main application. After running `npm run dev`, you can access it at:

Open [http://localhost:3000/studio](http://localhost:3000/studio) to manage content.

## 📝 Content Management

### Initial Content Setup

1. **Settings Document**:
   - Site title, tagline, and introduction
   - Reference to primary person

2. **Person Document**:
   - Name, portrait image, bio
   - Social links array

3. **Experience Documents**:
   - Company, role, dates, highlights
   - Tech stack array

4. **Project Documents**:
   - Title, summary, images
   - Live URL and repository links
   - Tech stack array

5. **Post Documents** (Blog):
   - Title, excerpt, main image
   - Published date and body content

## ✨ Key Features

### 🎯 Accessibility (a11y)

- Semantic HTML structure with proper landmarks
- Skip links for keyboard navigation
- Focus management with visible focus indicators
- Screen reader friendly content
- ESLint jsx-a11y plugin integration

### 🔍 SEO Optimization

- Dynamic metadata with OpenGraph tags
- Canonical URLs
- Structured data ready
- Mobile-responsive viewport
- Optimized images with Next.js Image component

### 🎨 Design & UX

- One-page layout with smooth scrolling
- Responsive design with Tailwind CSS v4
- Modern typography with Geist fonts
- Clean, professional aesthetic
- Interactive animations and micro-interactions
- Custom animated components

### ⚡ Performance

- Static generation with ISR (Incremental Static Regeneration)
- Optimized images and fonts
- Efficient GROQ queries
- Minimal bundle size
- GSAP-powered animations

### 🛡️ Code Quality

- Strict TypeScript configuration
- ESLint with accessibility rules
- Prettier code formatting
- Comprehensive error handling

### 🎭 Animation Components

- **BlurText**: Animated text with blur effects and staggered reveals
- **ScrollReveal**: GSAP-powered scroll-triggered animations
- **StaggeredMenu**: Interactive navigation with smooth transitions

## 🌐 Deployment

### Netlify Deployment

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `out` (for static export) or `.next` (for serverless)
4. Add environment variables in Netlify dashboard
5. Deploy!

### Environment Variables for Production

Ensure these are set in your deployment platform:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `npm run lint` and `npm run format`
5. Submit a pull request

---

Built with ❤️ using Next.js, Sanity, and modern web standards.
