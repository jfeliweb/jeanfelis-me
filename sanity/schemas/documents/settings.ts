import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'settings',
  type: 'document',
  title: 'Settings',
  fields: [
    defineField({
      name: 'siteTitle',
      type: 'string',
      title: 'Site Title',
    }),
    defineField({
      name: 'tagline',
      type: 'string',
      title: 'Tagline',
    }),
    defineField({
      name: 'intro',
      type: 'text',
      title: 'Introduction',
    }),
    defineField({
      name: 'primaryPerson',
      type: 'reference',
      to: [{ type: 'person' }],
      title: 'Primary Person',
    }),
  ],
  preview: {
    select: {
      title: 'siteTitle',
    },
  },
});
