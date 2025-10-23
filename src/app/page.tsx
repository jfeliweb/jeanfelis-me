import Image from 'next/image';
import { urlFor } from '../sanity/image';
import { getHeroBundle, getExperience, getProjects, getPosts } from '../sanity/fetchers';

export const revalidate = 60;

export default async function HomePage() {
  const [{ settings, person }, experience, projects, posts] = await Promise.all([
    getHeroBundle(),
    getExperience(),
    getProjects(),
    getPosts(),
  ]);

  const heroName = person?.name ?? 'Jean Felis';
  const heroTagline = settings?.tagline ?? 'Software Developer';
  const heroIntro = settings?.intro ?? '';
  const heroImage = person?.image;

  return (
    <main id="main" className="mx-auto max-w-5xl px-4 py-12">
      {/* Hero */}
      <header aria-labelledby="hero-title" className="mb-16">
        <h1 id="hero-title" className="text-3xl sm:text-5xl font-bold tracking-tight">
          {heroName}
        </h1>
        <p className="mt-2 text-lg text-gray-700">{heroTagline}</p>
        {heroIntro && <p className="mt-4 max-w-2xl">{heroIntro}</p>}
        {heroImage && (
          <div className="mt-6">
            <Image
              src={urlFor(heroImage).width(320).height(320).url()}
              alt={`${heroName} portrait`}
              width={320}
              height={320}
              className="rounded-full"
            />
          </div>
        )}
        {person?.links?.length ? (
          <nav aria-label="Social links" className="mt-6 flex gap-4">
            {person.links.map((l: any) => (
              <a
                key={l.href}
                className="underline focus:outline-none focus:ring-2"
                href={l.href}
              >
                {l.label}
              </a>
            ))}
          </nav>
        ) : null}
      </header>

      {/* Experience */}
      <section aria-labelledby="experience-title" id="experience" className="mb-16">
        <h2 id="experience-title" className="text-2xl font-semibold mb-6">
          Experience
        </h2>
        <ul className="space-y-6">
          {experience?.map((e: any) => (
            <li key={e._id}>
              <h3 className="text-lg font-semibold">
                {e.role} · {e.company}
              </h3>
              <p className="text-sm text-gray-600">
                {new Date(e.start).toLocaleDateString()} —{' '}
                {e.current
                  ? 'Present'
                  : e.end
                    ? new Date(e.end).toLocaleDateString()
                    : '—'}
              </p>
              {e.highlights?.length ? (
                <ul className="list-disc pl-6 mt-2">
                  {e.highlights.map((h: string, idx: number) => (
                    <li key={idx}>{h}</li>
                  ))}
                </ul>
              ) : null}
              {e.tech?.length ? (
                <p className="mt-1 text-sm">Tech: {e.tech.join(', ')}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      {/* Projects */}
      <section aria-labelledby="projects-title" id="projects" className="mb-16">
        <h2 id="projects-title" className="text-2xl font-semibold mb-6">
          Projects
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {projects?.map((p: any) => (
            <article key={p._id} className="rounded-xl border p-4">
              <h3 className="text-lg font-semibold">{p.title}</h3>
              {p.image && (
                <Image
                  src={urlFor(p.image).width(800).height(450).url()}
                  alt={`${p.title} cover`}
                  width={800}
                  height={450}
                  className="mt-2 rounded-lg"
                />
              )}
              {p.summary && <p className="mt-2 text-sm">{p.summary}</p>}
              <div className="mt-3 flex gap-4">
                {p.url && (
                  <a className="underline" href={p.url}>
                    Live
                  </a>
                )}
                {p.repo && (
                  <a className="underline" href={p.repo}>
                    Code
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Blog (uses Post type) */}
      <section aria-labelledby="blog-title" id="blog">
        <h2 id="blog-title" className="text-2xl font-semibold mb-6">
          Blog
        </h2>
        <ul className="space-y-4">
          {posts?.map((post: any) => (
            <li key={post._id}>
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-600">
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString()
                  : ''}
              </p>
              {post.excerpt && <p className="mt-1">{post.excerpt}</p>}
            </li>
          ))}
        </ul>
      </section>

      <footer className="mt-16 pt-8 border-t">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} Jean Felis
        </p>
      </footer>
    </main>
  );
}
