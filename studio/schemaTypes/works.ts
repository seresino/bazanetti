import {defineField, defineType} from 'sanity'

export const workType = defineType({
  name: 'work',
  title: 'Work Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}}),
    defineField({name: 'year', title: 'Year', type: 'string'}),
    defineField({name: 'client', title: 'Client / Commissioner', type: 'string'}),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
    defineField({name: 'description', title: 'Description', type: 'text'}),
    defineField({name: 'materials', title: 'Materials', type: 'array', of: [{type: 'string'}]}),
  ],
})
