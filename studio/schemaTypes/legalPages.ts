import {defineField, defineType} from 'sanity'

const legalSectionFields = [
  {name: 'heading', title: 'Heading', type: 'string'},
  {
    name: 'blocks',
    title: 'Paragraphs',
    type: 'array',
    of: [
      {
        type: 'object',
        name: 'legalBlock',
        fields: [
          {
            name: 'lead',
            title: 'Lead (optional, rendered bold before the text)',
            type: 'string',
          },
          {name: 'text', title: 'Text', type: 'text', rows: 4},
        ],
        preview: {
          select: {title: 'text'},
          prepare: ({title}: {title?: string}) => ({
            title: title ? `${title.slice(0, 60)}…` : 'Paragraph',
          }),
        },
      },
    ],
  },
]

const legalPageFields = [
  {name: 'title', title: 'Page Title', type: 'string'},
  {name: 'lastUpdated', title: 'Last Updated Line', type: 'string'},
  {
    name: 'sections',
    title: 'Sections',
    type: 'array',
    of: [
      {
        type: 'object',
        name: 'legalSection',
        fields: legalSectionFields,
        preview: {select: {title: 'heading'}},
      },
    ],
  },
]

export const legalPages = defineType({
  name: 'legalPages',
  title: 'Legal Pages',
  type: 'document',
  fields: [
    defineField({
      name: 'terms',
      title: 'Terms of Service',
      type: 'object',
      fields: legalPageFields,
    }),
    defineField({
      name: 'privacy',
      title: 'Privacy Policy',
      type: 'object',
      fields: legalPageFields,
    }),
  ],
  preview: {prepare: () => ({title: 'Legal Pages'})},
})
