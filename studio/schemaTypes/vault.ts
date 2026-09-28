import {defineField, defineType} from 'sanity'

export const vaultItemType = defineType({
  name: 'vaultItem',
  title: 'Vault Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'owner', title: 'Owner', type: 'string'}),
    defineField({name: 'year', title: 'Year', type: 'string'}),
    defineField({
      name: 'model',
      title: '3D Model',
      type: 'file',
      options: {accept: '.glb'},
    }),
    defineField({
      name: 'image',
      title: 'Preview Image',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
})
