import groq from 'groq';

// Use Settings + Person for hero.
// Assumes Settings has fields like siteTitle, tagline, intro, and a reference to the primary Person record.
// If not present, adjust to match the template's actual fields.
export const heroQuery = groq`
{
  "settings": *[_type == "settings"][0]{ siteTitle, tagline, intro, primaryPerson-> { _id, name, slug, image, bio, links } },
  "person": *[_type == "person"][0]{ _id, name, slug, image, bio, links }
}
`;

// Experience list
export const experienceQuery = groq`*[_type == "experience"] | order(coalesce(end, now()) desc){
  _id, company, role, start, end, current, highlights, tech
}`;

// Projects grid
export const projectsQuery = groq`*[_type == "project"] | order(title asc){
  _id, title, slug, summary, image, url, repo, tech
}`;

// Blog posts (keep the template's Post type)
export const postsQuery = groq`*[_type == "post"] | order(publishedAt desc){
  _id, title, slug, excerpt, mainImage, publishedAt
}`;
