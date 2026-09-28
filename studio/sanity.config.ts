import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Bazanetti Studio',
  projectId: 'hp05jmwr',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singleton for Brand Settings
            S.listItem()
              .title('Brand & Identity')
              .id('brandSettings')
              .child(S.document().schemaType('brandSettings').documentId('brandSettings')),
            S.divider(),
            // Regular document lists for Works and Vault
            S.documentTypeListItem('work').title('Works & Projects'),
            S.documentTypeListItem('vaultItem').title('Vault Pieces'),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
