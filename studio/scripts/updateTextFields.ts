import {getCliClient} from 'sanity/cli'

const client = getCliClient()

const handmadeNote = `Please note, each piece is individually handcrafted. Due to this unique process, the jewellery you receive will vary slightly from the photo on the website. No two pieces are the same.
If you want to change the metal or gemstones please contact us to discuss a bespoke version.`

async function main() {
  await client.patch('shopInfo').set({handmadeNote}).commit()
  console.log('shopInfo.handmadeNote set')

  await client
    .patch('brandSettings')
    .setIfMissing({
      tagline: 'JEWELLERY & OBJECTS',
      locationTagline: 'REALISED IN LONDON',
      copyrightLine: '©2026 – RIGHTS RESERVED',
    })
    .set({emailAddress: 'info@bazanetti.com'})
    .commit()
  console.log('brandSettings text fields set')
}

main()
