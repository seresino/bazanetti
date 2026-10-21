import {getCliClient} from 'sanity/cli'
import {privacyPolicy, termsOfService} from '../../web/src/lib/legalContent'

const client = getCliClient()

const key = () => Math.random().toString(36).slice(2, 10)

const withKeys = (page: typeof termsOfService) => ({
  ...page,
  sections: page.sections.map((section) => ({
    _key: key(),
    _type: 'legalSection',
    ...section,
    blocks: section.blocks.map((block) => ({
      _key: key(),
      _type: 'legalBlock',
      ...block,
    })),
  })),
})

async function main() {
  await client.createOrReplace({
    _id: 'legalPages',
    _type: 'legalPages',
    terms: withKeys(termsOfService),
    privacy: withKeys(privacyPolicy),
  })
  console.log('legalPages document seeded')
}

main()
