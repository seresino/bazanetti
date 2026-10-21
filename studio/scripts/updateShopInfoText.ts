import {getCliClient} from 'sanity/cli'

const client = getCliClient()

const shippingText = `We offer complimentary UK delivery via Royal Mail First Class. International delivery is available from £30 via DHL Express.

All orders are fully insured and tracked.

Ready-to-ship pieces are dispatched within 1–5 working days.

Made-to-order pieces are dispatched within 2–3 weeks.

Delivery times vary depending on destination and are additional to the dispatch times stated above. Tracking information will be provided by email once your order has been dispatched.

For international orders, applicable import duties and taxes are calculated at checkout and paid in advance, ensuring no unexpected customs charges upon delivery.`

const returnsText = `All sales are final.

Returns or exchanges are only accepted if an item arrives damaged or incorrect due to our error. Please check your order, shipping details and size carefully before completing checkout, as we can only accept exchanges for items that are held in stock.

If you're unsure about sizing before ordering, get in touch and we'll help. For any return enquiries, please contact us via the contact page.`

async function main() {
  await client.patch('shopInfo').set({shippingText, returnsText}).commit()
  console.log('shopInfo text updated')
}

main()
