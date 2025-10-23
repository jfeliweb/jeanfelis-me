import { client } from './client';
import { heroQuery, experienceQuery, projectsQuery, postsQuery } from './queries';

export async function getHeroBundle() {
  return client.fetch(heroQuery, {}, { next: { revalidate: 60, tags: ['sanity-content'] } });
}

export async function getExperience() {
  return client.fetch(experienceQuery, {}, { next: { revalidate: 60, tags: ['sanity-content'] } });
}

export async function getProjects() {
  return client.fetch(projectsQuery, {}, { next: { revalidate: 60, tags: ['sanity-content'] } });
}

export async function getPosts() {
  return client.fetch(postsQuery, {}, { next: { revalidate: 60, tags: ['sanity-content'] } });
}
