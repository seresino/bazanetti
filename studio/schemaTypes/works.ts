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
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers appear first on the Works page. Leave blank to sort by year.',
    }),
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
      title: 'Gallery Media',
      type: 'array',
      of: [
        {type: 'image', options: {hotspot: true}},
        defineField({
          name: 'videoFile',
          title: 'Video (Upload)',
          type: 'file',
          options: {accept: 'video/*'},
        }),
        defineField({
          name: 'videoLink',
          title: 'Video (External URL — mp4/webm, YouTube or Vimeo)',
          type: 'object',
          fields: [
            defineField({
              name: 'url',
              title: 'Video URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({name: 'description', title: 'Description', type: 'text'}),
    defineField({name: 'materials', title: 'Materials', type: 'array', of: [{type: 'string'}]}),
  ],
})
