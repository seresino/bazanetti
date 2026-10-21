import {defineField, defineType} from 'sanity'

export const brandSettingsType = defineType({
  name: 'brandSettings',
  title: 'Brand & Identity',
  type: 'document',
  fields: [
    defineField({
      name: 'landingBackgroundGif',
      title: 'Landing Page Background GIF / Video',
      type: 'image',
      description: 'The background animation/GIF displayed on the initial landing screen.',
      options: {
        accept: 'image/gif,image/webp,image/png,image/jpeg',
      },
    }),
    defineField({
      name: 'monogramEmblem',
      title: 'Monogram Emblem (B Logo)',
      type: 'image',
      description: 'Used in the footer and hero sections.',
    }),
    defineField({
      name: 'wordmarkLogo',
      title: 'Primary Wordmark Logo (BAZANETTI)',
      type: 'image',
      description: 'Vector SVG or high-res PNG of the Bazanetti wordmark.',
    }),
    defineField({
      name: 'brandIcons',
      title: 'Brand Icons',
      type: 'array',
      description: 'Custom iconography used throughout the site.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Icon Name (e.g. Shop, Works)',
              type: 'string',
            }),
            defineField({name: 'icon', title: 'Icon Image (SVG/PNG)', type: 'image'}),
          ],
        },
      ],
    }),
    defineField({
      name: 'bioText',
      title: 'Studio Bio (Info Page)',
      type: 'text',
      rows: 6,
      description: 'The brand bio paragraph displayed on the Info page.',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      initialValue: 'JEWELLERY & OBJECTS',
      description: 'Shown in the footer, side tickers, and Info page.',
    }),
    defineField({
      name: 'locationTagline',
      title: 'Location Tagline',
      type: 'string',
      initialValue: 'REALISED IN LONDON',
      description: 'Shown in the footer, side tickers, and Info page.',
    }),
    defineField({
      name: 'copyrightLine',
      title: 'Copyright Line',
      type: 'string',
      initialValue: '©2026 – RIGHTS RESERVED',
      description: 'Shown at the foot of the site footer.',
    }),
    defineField({
      name: 'emailAddress',
      title: 'Studio Contact Email',
      type: 'string',
      initialValue: 'studio@bazanetti.com',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram Profile URL',
      type: 'url',
      initialValue: 'https://instagram.com/bazanetti',
    }),
  ],
})
