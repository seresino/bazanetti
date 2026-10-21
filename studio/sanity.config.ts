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
            // Singleton for Shop Info (returns / shipping / sizing)
            S.listItem()
              .title('Shop Info')
              .id('shopInfo')
              .child(S.document().schemaType('shopInfo').documentId('shopInfo')),
            S.divider(),
            // Singleton for Legal Pages (terms / privacy)
            S.listItem()
              .title('Legal Pages')
              .id('legalPages')
              .child(S.document().schemaType('legalPages').documentId('legalPages')),
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
