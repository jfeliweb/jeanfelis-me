import Image from 'next/image';
import { urlFor } from '../sanity/image';
import { getHeroBundle, getExperience, getProjects, getPosts } from '../sanity/fetchers';
import ScrollReveal from '../components/ScrollReveal';
import BlurText from '../components/BlurText';

export const revalidate = 60;

export default async function HomePage() {
  const [{ settings, person }, experience, projects, posts] = await Promise.all([
    getHeroBundle(),
    getExperience(),
    getProjects(),
    getPosts(),
  ]);

  const heroName = person?.name ?? 'Jean Felisme';
  const heroTagline = settings?.tagline ?? 'Software Developer';
  const heroIntro = settings?.intro ?? '';
  const heroImage = person?.image;

  return (
    <main id="main" className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24 lg:py-32">
      {/* Hero */}
      <header aria-labelledby="hero-title" className="grid md:grid-cols-2 gap-8 items-center mb-16 md:mb-24 lg:mb-32">
        <div className="space-y-4">
          <BlurText
            text={heroName}
            delay={150}
            animateBy="words"
            direction="top"
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-black"
          />
          <p className="text-lg text-gray-600 leading-relaxed">{heroTagline}</p>
          {heroIntro && <p className="text-base text-gray-600 leading-relaxed max-w-2xl">{heroIntro}</p>}
        </div>
        {heroImage && (
          <div className="flex justify-center md:justify-end">
            <Image
              src={urlFor(heroImage).width(320).height(320).url()}
              alt={`${heroName} portrait`}
              width={320}
              height={320}
              className="w-32 h-32 md:w-48 md:h-48 rounded-full ring-4 ring-gray-100"
            />
          </div>
        )}
        {person?.links?.length ? (
          <nav aria-label="Social links" className="flex gap-4">
            {person.links.map((l: any) => (
              <a
                key={l.href}
                className="text-gray-700 hover:text-red-500 transition-colors duration-200 underline focus:outline-none focus:ring-2 focus:ring-red-500"
                href={l.href}
              >
                {l.label}
              </a>
            ))}
          </nav>
        ) : null}
      </header>

      {/* Experience */}
      <section aria-labelledby="experience-title" id="experience" className="mb-16 md:mb-24 lg:mb-32">
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={5}
          blurStrength={10}
          containerClassName="mb-8"
        >
          Experience
        </ScrollReveal>
        <ul className="space-y-6 md:space-y-8">
          {experience?.map((e: any) => (
            <li key={e._id} className="bg-white rounded-lg p-6 md:p-8 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl md:text-2xl font-bold leading-snug text-black">
                {e.role} · {e.company}
              </h3>
              <p className="text-sm text-gray-500 font-medium uppercase leading-none mt-2">
                {new Date(e.start).toLocaleDateString()} —{' '}
                {e.current
                  ? 'Present'
                  : e.end
                    ? new Date(e.end).toLocaleDateString()
                    : '—'}
              </p>
              {e.highlights?.length ? (
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  {e.highlights.map((h: string, idx: number) => (
                    <li key={idx} className="text-base text-gray-600 leading-relaxed">{h}</li>
                  ))}
                </ul>
              ) : null}
              {e.tech?.length ? (
                <div className="mt-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-900 text-white">
                    {e.tech.join(', ')}
                  </span>
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      {/* Projects */}
      <section aria-labelledby="projects-title" id="projects" className="mb-16 md:mb-24 lg:mb-32">
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={5}
          blurStrength={10}
          containerClassName="mb-8"
        >
          Featured Projects
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects?.map((p: any) => (
            <article key={p._id} className="bg-white rounded-lg overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="aspect-video bg-gray-100 overflow-hidden">
                {p.image && (
                  <Image
                    src={urlFor(p.image).width(800).height(450).url()}
                    alt={`${p.title} cover`}
                    width={800}
                    height={450}
                    className="object-cover w-full h-full hover:opacity-90 transition-opacity"
                  />
                )}
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-xl md:text-2xl font-bold text-black">{p.title}</h3>
                {p.summary && <p className="text-gray-600 leading-relaxed line-clamp-2">{p.summary}</p>}
                <div className="flex gap-4">
                  {p.url && (
                    <a className="text-gray-700 hover:text-red-500 transition-colors duration-200 underline" href={p.url}>
                      Live
                    </a>
                  )}
                  {p.repo && (
                    <a className="text-gray-700 hover:text-red-500 transition-colors duration-200 underline" href={p.repo}>
                      Code
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Blog (uses Post type) */}
      <section aria-labelledby="blog-title" id="blog" className="mb-16 md:mb-24 lg:mb-32">
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={5}
          blurStrength={10}
          containerClassName="mb-8"
        >
          Blog
        </ScrollReveal>
        <ul className="space-y-6 md:space-y-8">
          {posts?.map((post: any) => (
            <li key={post._id} className="bg-white rounded-lg p-6 md:p-8 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold hover:text-red-500 transition-colors duration-200 text-black">
                {post.title}
              </h3>
              <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                <span className="font-medium uppercase leading-none">
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString()
                    : ''}
                </span>
              </div>
              {post.excerpt && <p className="mt-3 text-gray-600 leading-relaxed">{post.excerpt}</p>}
            </li>
          ))}
        </ul>
      </section>

      <footer className="flex flex-col items-center gap-4 py-8 border-t border-gray-100 mt-16 md:mt-24 lg:mt-32">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Jean Felisme
        </p>
      </footer>
    </main>
  );
}
