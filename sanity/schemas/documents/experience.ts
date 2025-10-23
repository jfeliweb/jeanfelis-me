import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'experience',
  type: 'document',
  title: 'Experience',
  fields: [
    defineField({
      name: 'company',
      type: 'string',
      title: 'Company',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'role',
      type: 'string',
      title: 'Role/Title',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'start',
      type: 'date',
      title: 'Start Date',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'end',
      type: 'date',
      title: 'End Date',
    }),
    defineField({
      name: 'current',
      type: 'boolean',
      title: 'Current Role',
    }),
    defineField({
      name: 'highlights',
      type: 'array',
      title: 'Highlights',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'tech',
      type: 'array',
      title: 'Tech Stack',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    select: {
      title: 'role',
      subtitle: 'company',
    },
  },
});
