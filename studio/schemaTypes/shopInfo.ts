import {defineField, defineType} from 'sanity'

export const shopInfo = defineType({
  name: 'shopInfo',
  title: 'Shop Info',
  type: 'document',
  fields: [
    defineField({
      name: 'returnsText',
      title: 'Returns Text',
      type: 'text',
      rows: 8,
      description: 'Shown in the product modal when the Returns button is pressed.',
    }),
    defineField({
      name: 'shippingText',
      title: 'Shipping Text',
      type: 'text',
      rows: 8,
      description: 'Shown in the product modal when the Shipping button is pressed.',
    }),
    defineField({
      name: 'sizingIntro',
      title: 'Sizing Intro Text',
      type: 'text',
      rows: 3,
      description: 'Optional line shown above the size guide tables.',
    }),
    defineField({
      name: 'ringSizes',
      title: 'Ring Sizes',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'ringSize',
          fields: [
            {name: 'label', title: 'Label (e.g. XS/S/M/L/XL)', type: 'string'},
            {name: 'uk', title: 'UK Size', type: 'string'},
            {name: 'usa', title: 'USA Size', type: 'string'},
            {name: 'eu', title: 'EU Size', type: 'number'},
            {name: 'circumferenceMm', title: 'Ring Circumference (mm)', type: 'number'},
            {name: 'diameterMm', title: 'Ring Diameter (mm)', type: 'number'},
          ],
          preview: {
            select: {title: 'uk', subtitle: 'label'},
          },
        },
      ],
    }),
    defineField({
      name: 'braceletSizes',
      title: 'Bracelet Sizes',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'braceletSize',
          fields: [
            {name: 'size', title: 'Size', type: 'string'},
            {name: 'circumferenceInch', title: 'Circumference (inch)', type: 'number'},
            {name: 'circumferenceCm', title: 'Circumference (cm)', type: 'number'},
          ],
          preview: {select: {title: 'size'}},
        },
      ],
    }),
    defineField({
      name: 'necklaceSizes',
      title: 'Necklace & Pendant Lengths',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'necklaceSize',
          fields: [
            {name: 'size', title: 'Size', type: 'string'},
            {name: 'lengthInch', title: 'Chain Length (inches)', type: 'number'},
            {name: 'lengthCm', title: 'Chain Length (cm)', type: 'number'},
          ],
          preview: {select: {title: 'size'}},
        },
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Shop Info'})},
})
