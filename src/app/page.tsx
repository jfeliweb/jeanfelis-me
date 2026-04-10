'use client';

import Image from 'next/image';
import { useState } from 'react';

import { ContactForm } from '@/components/ContactForm';
import { IconButton } from '@/components/IconButton';
import {
  ProjectModal,
  type ProjectModalProject,
} from '@/components/ProjectModal';

// Icon SVGs (inline for simplicity)
const InstagramIcon = () => (
  <svg
    className="size-5"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
  </svg>
);

const TwitterIcon = () => (
  <svg
    className="size-5"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const GitHubIcon = () => (
  <svg
    className="size-5"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      clipRule="evenodd"
    />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    className="size-5"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const EmailIcon = () => (
  <svg
    className="size-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const ResumeIcon = () => (
  <svg
    className="size-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const projects: ProjectModalProject[] = [
  {
    name: 'ReaderAI Labs',
    description:
      "AI-powered children's story app. Parents describe a theme and the app generates a personalized illustrated story with sight word highlighting, tailored to reading levels from Pre-K to 3rd grade.",
    tech: [
      'Next.js 16',
      'TypeScript',
      'Drizzle ORM',
      'PostgreSQL',
      'Stripe',
      'Better Auth',
      'Sanity CMS',
    ],
    liveUrl: 'https://readerlabs.app',
    githubUrls: ['https://github.com/jfeliweb/project-read-ai'],
    status: 'Live',
  },
  {
    name: 'Bashly',
    description:
      'Full-stack event planning SaaS with a companion React Native mobile app. Features RSVP management, song request queues, Spotify playlist export, Stripe billing, and gift registries — all in a Turborepo monorepo.',
    tech: [
      'Next.js 14',
      'TypeScript',
      'Drizzle ORM',
      'Stripe',
      'Spotify API',
      'Expo/React Native',
      'Turborepo',
    ],
    liveUrl: 'https://bashly.app',
    githubUrls: ['https://github.com/jfeliweb/bashly'],
    status: 'Live',
  },
  {
    name: 'Job Application Tracker',
    description:
      'Full-stack SaaS for tracking job applications with AI-generated cover letters. Java/Spring Boot backend with a Next.js frontend.',
    tech: [
      'Java 21',
      'Spring Boot 4',
      'Spring Security',
      'PostgreSQL',
      'Next.js 15',
      'OpenAI API',
    ],
    liveUrl: 'https://job-tracker-frontend-blush.vercel.app',
    githubUrls: [
      'https://github.com/jfeliweb/job-app-tracker-api',
      'https://github.com/jfeliweb/job-app-tracker-frontend',
    ],
    status: 'Live',
  },
  {
    name: 'Orion Miami',
    description:
      'South Florida Web Studio hired me to work on the Orion Miami website to implement a few features. I spent the majority of the time working on a custom property portfolio feature on their WordPress website. This feature allowed the user to filter through the property by clicking on a map and/or by a single tenant or multi-tenant.',
    tech: ['PHP', 'WordPress', 'JavaScript', 'Advanced Custom Fields (ACF)'],
    liveUrl: 'https://orionmiami.com',
    githubUrls: [],
    status: 'Live',
  },
];

const navLinkClass =
  'text-sm font-medium text-textSecondary transition-colors hover:text-teal dark:text-[#C2CBD4] dark:hover:text-tealDark';

const sectionBlock = 'scroll-mt-20 py-20';

export default function Home() {
  const [openProject, setOpenProject] = useState<ProjectModalProject | null>(
    null,
  );

  return (
    <div className="min-h-screen w-full">
      <nav
        className="fixed top-0 z-50 h-14 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-[#0D1117]/80"
        aria-label="Primary"
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <a
            href="#top"
            className="text-sm font-semibold text-textPrimary dark:text-[#F2F5F8]"
          >
            Jean Felisme
          </a>
          <div className="flex items-center gap-6">
            <a href="#about" className={navLinkClass}>
              About
            </a>
            <a href="#projects" className={navLinkClass}>
              Projects
            </a>
            <a href="#contact" className={navLinkClass}>
              Contact
            </a>
          </div>
        </div>
      </nav>

      <div className="flex w-full flex-col items-center px-6 pb-16 pt-14 md:pt-16">
        <section id="top" className={sectionBlock}>
          <div className="mx-auto w-full max-w-4xl">
            {/* Mobile: Stacked layout */}
            <div className="flex flex-col items-center text-center md:hidden">
              <div className="animate-fade-in-scale mb-6">
                <div
                  className="rounded-full p-[4px] dark:shadow-[0_0_20px_rgba(20,20,20,0.4)]"
                  style={{
                    background:
                      'conic-gradient(from 0deg, #4FE3C1 0deg, #FF77E9 120deg, #C69CFF 240deg, #4FE3C1 360deg)',
                  }}
                >
                  <div className="relative size-[140px] overflow-hidden rounded-full bg-white">
                    <Image
                      src="/assets/images/Jean-Felisme-profile-photo.jpg"
                      alt="Profile photo of Jean Felisme"
                      fill
                      className="object-cover"
                      priority
                      sizes="140px"
                    />
                  </div>
                </div>
              </div>

              <h1 className="mb-2 text-3xl font-semibold text-textPrimary dark:text-[#F2F5F8]">
                Jean Felisme
              </h1>

              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-textMuted dark:text-[#8A94A0]">
                Full-Stack Engineer & Creator
              </h2>

              <p className="mb-6 text-sm leading-relaxed text-textSecondary dark:text-[#C2CBD4]">
                Building AI tools, indie web apps, and digital products from
                South Florida.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <IconButton
                  href="https://instagram.com/jfeliweb"
                  ariaLabel="Instagram"
                  icon={<InstagramIcon />}
                  external
                />
                <IconButton
                  href="https://twitter.com/jfeliweb"
                  ariaLabel="X (Twitter)"
                  icon={<TwitterIcon />}
                  external
                />
                <IconButton
                  href="https://github.com/jfeliweb"
                  ariaLabel="GitHub"
                  icon={<GitHubIcon />}
                  external
                />
                <IconButton
                  href="https://linkedin.com/in/jeanfelisme"
                  ariaLabel="LinkedIn"
                  icon={<LinkedInIcon />}
                  external
                />
                <IconButton
                  href="mailto:felismej@gmail.com"
                  ariaLabel="Email"
                  icon={<EmailIcon />}
                />
                <IconButton
                  href="/jean-felisme-resume.pdf"
                  ariaLabel="Resume"
                  icon={<ResumeIcon />}
                />
              </div>
            </div>

            <div className="hidden items-center gap-12 md:flex">
              <div className="animate-fade-in-scale shrink-0">
                <div
                  className="rounded-full p-[5px] dark:shadow-[0_0_20px_rgba(20,20,20,0.4)]"
                  style={{
                    background:
                      'conic-gradient(from 0deg, #4FE3C1 0deg, #FF77E9 120deg, #C69CFF 240deg, #4FE3C1 360deg)',
                  }}
                >
                  <div className="relative size-[180px] overflow-hidden rounded-full bg-white">
                    <Image
                      src="/assets/images/Jean-Felisme-profile-photo.jpg"
                      alt="Profile photo of Jean Felisme"
                      fill
                      className="object-cover"
                      priority
                      sizes="180px"
                    />
                  </div>
                </div>
              </div>

              <div className="flex-1 text-left">
                <h1 className="mb-2 text-4xl font-semibold text-textPrimary dark:text-[#F2F5F8]">
                  Jean Felisme
                </h1>

                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-textMuted dark:text-[#8A94A0]">
                  Senior Full-Stack Engineer
                </h2>

                <p className="mb-6 text-base leading-relaxed text-textSecondary dark:text-[#C2CBD4]">
                  Building Web Platforms, SaaS Products, and AI-integrated
                  Applications from South Florida.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <IconButton
                    href="https://instagram.com/jfeliweb"
                    ariaLabel="Instagram"
                    icon={<InstagramIcon />}
                    external
                  />
                  <IconButton
                    href="https://twitter.com/jfeliweb"
                    ariaLabel="X (Twitter)"
                    icon={<TwitterIcon />}
                    external
                  />
                  <IconButton
                    href="https://github.com/jfeliweb"
                    ariaLabel="GitHub"
                    icon={<GitHubIcon />}
                    external
                  />
                  <IconButton
                    href="https://linkedin.com/in/jeanfelisme"
                    ariaLabel="LinkedIn"
                    icon={<LinkedInIcon />}
                    external
                  />
                  <IconButton
                    href="mailto:felismej@gmail.com"
                    ariaLabel="Email"
                    icon={<EmailIcon />}
                  />
                  <IconButton
                    href="/Jean_Felisme_Resume.pdf"
                    ariaLabel="Resume"
                    icon={<ResumeIcon />}
                    external
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="about"
          className={`${sectionBlock} w-full`}
          aria-labelledby="about-heading"
        >
          <div className="mx-auto w-full max-w-4xl">
            <h2
              id="about-heading"
              className="mb-8 text-center text-2xl font-semibold text-textPrimary md:text-left md:text-3xl dark:text-[#F2F5F8]"
            >
              About
            </h2>
            <div className="space-y-4 text-center text-lg font-medium leading-relaxed text-textSecondary md:text-left dark:text-[#C2CBD4]">
              <p>
                I should probably admit right up front that explaining what I do
                for a living tends to confuse people just a little. I build
                websites, fix the ones that get a little too dramatic, and every
                so often, I teach a stubborn app how to behave. I have been at
                this for more than fifteen years, which is long enough to
                remember when jQuery felt magical and also long enough to have a
                few strong opinions about it. Tech changes faster than a rumor
                at a church picnic, so I learned early that staying sharp is not
                really optional.
              </p>
              <p>
                I have always been the kind of person who pokes around anything
                broken just to see what is going on inside. That curiosity grew
                into a full career before I even had time to talk myself out of
                it. These days, I run my own creative studio called BizDots
                Media while also juggling personal projects, building AI tools,
                and sharpening whatever skills seem interesting that week. And
                yes, I talk to my code like it is a living thing. Sometimes it
                listens. Sometimes it does not, and that is when I stare at the
                screen as it owes me money.
              </p>
              <p>
                Outside of coding, I am busy being a dad, coming up with new
                ideas at inconvenient times, and chasing goals that seem to
                multiply when I am not looking. I want to create things that
                genuinely help people, things that feel good to use, and things
                that make life just a bit easier. Call it ambition or call it
                stubbornness with decent manners. I am still figuring out which
                one it is.
              </p>
            </div>
          </div>
        </section>

        <section
          id="projects"
          className={`${sectionBlock} w-full`}
          aria-labelledby="projects-heading"
        >
          <div className="mx-auto w-full max-w-4xl">
            <h2
              id="projects-heading"
              className="mb-8 text-center text-2xl font-semibold text-textPrimary md:text-left md:text-3xl dark:text-[#F2F5F8]"
            >
              Projects
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {projects.map((project) => (
                <button
                  key={project.name}
                  type="button"
                  onClick={() => setOpenProject(project)}
                  className="flex w-full cursor-pointer flex-col rounded-xl border border-gray-200 bg-white p-6 text-left transition-transform hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 dark:border-white/10 dark:bg-white/5 dark:focus-visible:ring-tealDark dark:focus-visible:ring-offset-[#0B0E12]"
                  aria-label={`View details for ${project.name}`}
                >
                  <h3 className="font-bold text-textPrimary dark:text-[#F2F5F8]">
                    {project.name}
                  </h3>
                  <p className="mt-2 line-clamp-1 text-sm text-textSecondary dark:text-[#C2CBD4]">
                    {project.description}
                  </p>
                  <ul
                    className="mt-4 flex flex-wrap gap-2"
                    aria-label={`Technologies for ${project.name}`}
                  >
                    {project.tech.slice(0, 3).map((tag) => (
                      <li key={tag}>
                        <span className="inline-block rounded-full bg-teal/10 px-2 py-1 text-xs text-teal dark:bg-tealDark/15 dark:text-tealDark">
                          {tag}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <span className="mt-4 text-sm font-medium text-teal dark:text-tealDark">
                    View Details
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <ProjectModal
          isOpen={openProject !== null}
          onCloseAction={() => setOpenProject(null)}
          project={openProject ?? projects[0]!}
        />

        <section
          id="contact"
          className={`${sectionBlock} w-full`}
          aria-labelledby="contact-heading"
        >
          <div className="mx-auto w-full max-w-4xl">
            <h2
              id="contact-heading"
              className="mb-2 text-center text-2xl font-semibold text-textPrimary md:text-left md:text-3xl dark:text-[#F2F5F8]"
            >
              Get in Touch
            </h2>
            <p className="mb-6 text-center text-sm text-textSecondary md:text-left md:text-base dark:text-[#C2CBD4]">
              Have a project in mind or just want to connect? Send me a message.
            </p>
            <div className="flex w-full flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-8 lg:gap-12">
              <div className="flex w-full justify-center md:justify-start">
                <ContactForm />
              </div>
              <aside
                className="flex flex-col items-center md:shrink-0 md:items-center md:align-middle md:pt-10"
                aria-labelledby="contact-social-heading"
              >
                <p
                  id="contact-social-heading"
                  className="mb-4 text-center text-sm font-semibold uppercase tracking-wider text-textMuted md:text-left dark:text-[#8A94A0]"
                >
                  Or connect with me on social media
                </p>
                <div className="flex items-center justify-center gap-4 md:justify-start">
                  <IconButton
                    href="https://twitter.com/jfeliweb"
                    ariaLabel="X (Twitter)"
                    icon={<TwitterIcon />}
                    external
                  />
                  <IconButton
                    href="https://linkedin.com/in/jeanfelisme"
                    ariaLabel="LinkedIn"
                    icon={<LinkedInIcon />}
                    external
                  />
                </div>
              </aside>
            </div>
          </div>
        </section>

        <footer className="mx-auto w-full max-w-4xl border-t border-gray-200 py-16 dark:border-white/10">
          <p className="text-center text-sm text-textMuted dark:text-[#8A94A0]">
            © 2026 Jean Felisme All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
