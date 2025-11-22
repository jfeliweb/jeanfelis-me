# Jean Felisme - Personal Portfolio Website

Personal portfolio website for Jean Felisme, a full-stack engineer and creator based in South Florida. Built with Next.js 14+ App Router, Tailwind CSS 3, and TypeScript.

## About

This is a modern, responsive portfolio website showcasing professional information, social links, and resume. The site features a clean design with dark mode support and custom gradient animations.

## Tech Stack

- **Framework:** [Next.js 14+](https://nextjs.org) with App Router
- **Styling:** [Tailwind CSS 3](https://tailwindcss.com) with custom design system
- **Language:** [TypeScript](https://www.typescriptlang.org)
- **Code Quality:** ESLint, Prettier, Husky, Lint-staged
- **SEO:** Built-in metadata API support with Open Graph and Twitter cards

## Features

- Modern, responsive design with mobile-first approach
- Dark mode support with custom color scheme
- Custom gradient animations and cinematic background effects
- Optimized images with Next.js Image component
- Social media links (Instagram, Twitter, GitHub, LinkedIn, Email)
- Downloadable resume
- SEO optimized with metadata
- Type-safe with TypeScript
- Accessible and semantic HTML

## Project Philosophy

- Clean, minimal design
- Performance-first
- SEO-friendly
- Accessible
- Production-ready

## Requirements

- Node.js 18+ and npm

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/jfeliweb/jeanfelis-me.git
cd jeanfelis-me
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier and ESLint
- `npm run check-types` - Run TypeScript type checking
- `npm run clean` - Clean build artifacts

## Project Structure

```
.
├── README.md                    # Project documentation
├── next.config.js               # Next.js configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies and scripts
├── design-system.json           # Design system tokens
├── .eslintrc                    # ESLint configuration
├── postcss.config.js            # PostCSS configuration
│
├── public/                      # Static assets
│   ├── favicon.ico              # Site favicon
│   ├── apple-touch-icon.png     # Apple touch icon
│   ├── android-chrome-*.png     # Android icons
│   ├── jean-felisme-resume.pdf  # Downloadable resume
│   └── assets/
│       └── images/              # Image assets
│           └── jean-felisme-profile-photo.jpeg
│
└── src/                         # Source code
    ├── app/                     # Next.js App Router
    │   ├── layout.tsx           # Root layout with metadata
    │   ├── page.tsx             # Homepage component
    │   └── components/          # App-specific components
    │       └── PremiumCinematicBackground.tsx
    │
    ├── components/              # Reusable components
    │   ├── IconButton.tsx       # Social link button component
    │   └── sections/            # Section components (reserved)
    │
    └── styles/                  # Global styles
        └── global.css           # Global CSS with Tailwind directives
```

### Key Directories

- **`src/app/`** - Next.js App Router directory containing pages and layouts
  - `layout.tsx` - Root layout with SEO metadata and global structure
  - `page.tsx` - Homepage with profile information and social links
  - `components/` - Components specific to the app router pages

- **`src/components/`** - Reusable React components
  - `IconButton.tsx` - Custom icon button component for social links
  - `sections/` - Reserved for future section components

- **`public/`** - Static files served directly
  - Favicon and app icons
  - Resume PDF
  - Image assets

- **`src/styles/`** - Global styles and Tailwind configuration
  - Custom color schemes for light and dark modes
  - Global CSS reset and utilities

## Customization

### Personal Information
- **Profile Photo:** Replace `/public/assets/images/jean-felisme-profile-photo.jpeg`
- **Resume:** Replace `/public/jean-felisme-resume.pdf`
- **Social Links:** Update in `src/app/page.tsx` (lines 134-169 for mobile, 216-252 for desktop)
- **Bio & Tagline:** Update in `src/app/page.tsx` (lines 118-130)

### SEO & Metadata
- **Site Metadata:** Update in `src/app/layout.tsx` (lines 7-34)
  - Title, description, keywords
  - Open Graph tags
  - Twitter card information

### Styling
- **Global Styles:** Edit `src/styles/global.css`
- **Tailwind Config:** Modify `tailwind.config.js` for custom colors and themes
- **Design Tokens:** Update `design-system.json` for consistent design values
- **Background Effects:** Customize in `src/app/components/PremiumCinematicBackground.tsx`

### Favicons
Generate custom favicons using [favicon.io](https://favicon.io/favicon-converter/) and replace:
- `public/favicon.ico`
- `public/favicon-16x16.png`
- `public/favicon-32x32.png`
- `public/apple-touch-icon.png`
- `public/android-chrome-192x192.png`
- `public/android-chrome-512x512.png`

## Deployment

### Build for Production

1. Create an optimized production build:
```bash
npm run build
```

2. Test the production build locally:
```bash
npm run start
```

The build process:
- Minifies HTML, CSS, and JavaScript
- Optimizes images
- Removes unused CSS from Tailwind
- Generates static files in `.next` directory

### Deployment Options

This Next.js application can be deployed to various platforms:

- **Vercel** (recommended) - Zero-configuration deployment for Next.js
- **Netlify** - Configure build command: `npm run build` and publish directory: `.next`
- **AWS Amplify** - Supports Next.js SSR and SSG
- **Docker** - Containerize the application for any cloud provider
- **Traditional hosting** - Build and serve the `.next` directory with Node.js

For Vercel deployment, simply connect your GitHub repository and Vercel will automatically detect Next.js and configure the build settings.

## Development Tools

### VSCode Integration

This project includes VSCode configuration for an enhanced development experience:

- **Extensions:** Recommended extensions are listed in `.vscode/extensions.json`
- **Settings:** Pre-configured workspace settings in `.vscode/settings.json`
- **Debug:** Debug configurations for frontend debugging
- **Tasks:** Build tasks for TypeScript type checking

**Pro tip:** Press <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>B</kbd> (Mac) or <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>B</kbd> (Windows) for project-wide TypeScript type checking.

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check the issues page if you want to contribute.

## License

Licensed under the MIT License, Copyright © 2025

See [LICENSE](LICENSE) for more information.

---

**Built by Jean Felisme** | [Website](https://jeanfelis.me) | [Twitter](https://twitter.com/jfeliweb) | [GitHub](https://github.com/jfeliweb)
