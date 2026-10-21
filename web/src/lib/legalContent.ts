// Legal page content — the fallback copy rendered if Sanity has no legalPages doc.
// Sanity is seeded from this same file via studio/scripts/seedLegalPages.ts.

export interface LegalBlock {
  lead?: string;
  text: string;
}

export interface LegalSection {
  heading: string;
  blocks: LegalBlock[];
}

export interface LegalPage {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
}

export const termsOfService: LegalPage = {
  title: "Terms of Service",
  lastUpdated: "Last updated: 20th October 2026",
  sections: [
    {
      heading: "Overview",
      blocks: [
        {
          text: 'Welcome to Bazanetti. This website is operated by Bazanetti Ltd, trading as Bazanetti. Throughout the website, the terms "we", "us" and "our" refer to Bazanetti. Bazanetti is a London-based creative studio specialising in jewellery, sculpture and objects. Through this website, we offer original designs, limited collections, made-to-order pieces and bespoke commissions.',
        },
        {
          text: 'These Terms of Service ("Terms") govern your use of our website, including the purchase of products and services offered through it. By accessing our website or placing an order, you acknowledge these Terms and agree to comply with those applicable to your purchase. Please read them alongside our Privacy Policy and Shipping & Returns Policy. Certain bespoke commissions and commercial projects may be subject to separately agreed written terms.',
        },
      ],
    },
    {
      heading: "1. Access and Use",
      blocks: [
        {
          text: "By placing an order through our website, you confirm that you are at least 18 years old or have the permission of a parent or legal guardian. You agree to provide accurate and complete information when placing an order, including your contact, billing and delivery details. If you create an account, you are responsible for maintaining the confidentiality of your login information and for any activity carried out through that account. We reserve the right to restrict access to our website where necessary to prevent misuse, unlawful activity or breaches of these Terms.",
        },
      ],
    },
    {
      heading: "2. Products and Descriptions",
      blocks: [
        {
          text: "We take care to represent our products accurately through photography, descriptions, measurements and material specifications. As many of our pieces are designed, cast, finished and assembled using a combination of traditional craftsmanship and contemporary manufacturing processes, small variations in finish, colour and surface texture may occur. Natural gemstones, patinated metals and hand-finished surfaces may display individual characteristics. These differences form part of the material qualities of each piece and do not necessarily constitute defects.",
        },
        {
          text: "Product colours may also vary slightly depending on your screen or device settings. Measurements, weights and dimensions are provided as accurately as possible. Where indicated as approximate, minor tolerances may apply.",
        },
        {
          text: "We reserve the right to amend product descriptions, specifications and availability, or discontinue designs, without prior notice. Such changes will not affect orders already accepted. Nothing in this section affects your right to receive products that conform to their descriptions and meet applicable standards of quality.",
        },
      ],
    },
    {
      heading: "3. Orders and Acceptance",
      blocks: [
        {
          text: "Placing an order constitutes an offer to purchase the selected products. Once an order has been submitted, you will receive an acknowledgement by email. This confirms that we have received your order but does not necessarily constitute acceptance. A contract is formed when we confirm acceptance of your order or dispatch the goods, whichever occurs first.",
        },
        {
          text: "We reserve the right to decline an order before acceptance where, for example, a product is unavailable, payment cannot be authorised, an obvious pricing error has occurred or we are unable to fulfil the order. If payment has already been taken and we cannot accept your order, the amount paid will be refunded.",
        },
        {
          text: "Please review your order carefully before completing checkout, particularly product dimensions, ring sizes, finishes and delivery details. If you need to make an amendment, contact us as soon as possible. We will endeavour to accommodate changes where production or dispatch has not already progressed.",
        },
      ],
    },
    {
      heading: "4. Pricing and Payment",
      blocks: [
        {
          text: "All prices are displayed in pounds sterling (GBP) unless otherwise specified. Applicable VAT is included in the displayed product price where required. Delivery charges and any additional fees will be communicated before you complete your purchase. Prices may change without notice, but changes will not affect orders already accepted.",
        },
        {
          text: "Payment must be completed using one of the payment methods made available at checkout, unless an alternative arrangement has been agreed in writing. Payments are processed through secure third-party payment providers. For bespoke commissions, wholesale orders or other individually quoted projects, payment schedules and deposits will be confirmed separately.",
        },
      ],
    },
    {
      heading: "5. Made-to-Order Jewellery",
      blocks: [
        {
          text: "Certain Bazanetti pieces are made to order rather than held in stock. Production and dispatch timeframes are provided on the relevant product page or in your order confirmation. These are estimates based on the processes involved in manufacturing and finishing each piece.",
        },
        {
          text: "Occasionally, production may be affected by material availability, casting schedules, hallmarking, specialist processes or circumstances outside our reasonable control. Should a significant delay occur, we will contact you with an updated timeframe and explain your available options.",
        },
        {
          text: "Made-to-order products selected from our standard collection, including standard sizes, materials and finishes, remain eligible for cancellation and returns in accordance with applicable consumer law.",
        },
      ],
    },
    {
      heading: "6. Bespoke and Personalised Commissions",
      blocks: [
        {
          text: "Bazanetti undertakes bespoke commissions and individual design projects, including personalised jewellery, engagement rings and objects. These projects may involve consultation, design development, digital modelling, prototyping, material sourcing and specialist manufacturing.",
        },
        {
          text: "The scope of work, specifications, pricing, payment arrangements and estimated completion dates will be agreed before work begins. Where design approval is required, production will proceed according to the specifications agreed with the client. Subsequent changes may affect costs and delivery times and will be subject to written agreement.",
        },
        {
          text: "Goods made to a customer's individual specifications or clearly personalised, including certain engravings and non-standard modifications, are generally exempt from the statutory change-of-mind cancellation right. Any additional cancellation arrangements for bespoke commissions will be set out in the relevant quotation or agreement. This does not affect your statutory rights where goods are faulty, not as described or otherwise fail to meet applicable legal requirements.",
        },
        {
          text: "Unless expressly agreed in writing, the purchase of a bespoke piece does not transfer ownership of its underlying design, drawings, CAD files or other intellectual property.",
        },
      ],
    },
    {
      heading: "7. Shipping and Delivery",
      blocks: [
        {
          text: "We offer UK and international delivery using selected postal and courier services. Available delivery methods, associated charges and estimated timeframes are provided during checkout or within our Shipping & Returns Policy.",
        },
        {
          text: "Dispatch times are separate from the estimated time taken for delivery. We endeavour to fulfil orders within the timeframes communicated at purchase. Where a longer delivery period has not been agreed, applicable statutory delivery requirements will apply. Delivery estimates may be affected by courier delays, customs processing, public holidays or circumstances beyond our reasonable control.",
        },
        {
          text: "We remain responsible for goods while they are being delivered until they come into your physical possession, or that of a person you have identified to receive them, subject to applicable legal exceptions. If your parcel arrives damaged or does not arrive, please contact us so we can investigate and arrange an appropriate resolution.",
        },
        {
          text: "International shipments may be subject to customs duties, import taxes or local charges. Where these are not included in the checkout price, they may be payable by the recipient. We will provide relevant information about these costs before purchase.",
        },
      ],
    },
    {
      heading: "8. Cancellations, Returns and Refunds",
      blocks: [
        {
          text: "We hope you are entirely satisfied with your purchase. If a piece is not quite right, returns are accepted in accordance with our Shipping & Returns Policy and your statutory consumer rights.",
        },
        {
          text: "For eligible online purchases, you have the right to cancel within 14 days of receiving your order without giving a reason. To exercise this right, you must notify us of your decision to cancel within that period. You then have a further 14 days to return the goods.",
        },
        {
          text: "Jewellery may be handled and tried on as you would in a shop. We ask that returned pieces are securely packaged and accompanied by their original packaging wherever possible. We may make a deduction for any reduction in value resulting from handling beyond what is reasonably necessary to inspect the item.",
        },
        {
          text: "Unless otherwise agreed, customers are responsible for the direct cost of returning goods following a change of mind, provided this has been communicated before purchase. Where a statutory cancellation applies, we will refund the product price and applicable standard outbound delivery charges. Refunds will be issued within the legally required timeframe, using the original payment method unless otherwise agreed.",
        },
        {
          text: "Pieces genuinely made to your individual specifications or clearly personalised are not ordinarily eligible for change-of-mind returns. For full details, please refer to our Shipping & Returns Policy.",
        },
      ],
    },
    {
      heading: "9. Faulty Goods and Statutory Rights",
      blocks: [
        {
          text: "All products supplied by Bazanetti must meet applicable legal standards, including being of satisfactory quality, fit for purpose and as described.",
        },
        {
          text: "If you believe your piece is faulty, damaged or not as described, please contact us with your order details and a description of the issue. We may request photographs or further information to help assess the problem and determine the appropriate remedy. Depending on the circumstances and applicable consumer law, you may be entitled to a repair, replacement, price reduction or refund.",
        },
        {
          text: "Normal wear, accidental damage and damage caused by improper handling or care are not necessarily manufacturing faults. Nothing in these Terms or any accompanying policy excludes or limits your statutory consumer rights under the Consumer Rights Act 2015 or other applicable legislation.",
        },
      ],
    },
    {
      heading: "10. Jewellery Care",
      blocks: [
        {
          text: "Jewellery and decorative objects require appropriate handling and care to preserve their condition and finish. Certain materials, including sterling silver, gold, plated surfaces, patinated metals and gemstones, may naturally change in appearance over time. We recommend following any care instructions supplied with your piece and avoiding unnecessary exposure to chemicals, abrasive materials and physical impact. If you require assistance with cleaning, maintenance or repairs, please contact us.",
        },
        {
          text: "Care recommendations do not limit your rights in relation to faulty goods.",
        },
      ],
    },
    {
      heading: "11. Intellectual Property",
      blocks: [
        {
          text: "All original designs, jewellery, objects, illustrations, CAD models, photographs, videos, graphics, written content and other creative material displayed on this website are owned by Bazanetti Ltd or used with permission from their respective rights holders. These materials are protected by applicable copyright, design, trademark and intellectual property laws.",
        },
        {
          text: "No content may be reproduced, distributed, commercially exploited, modified or used to create derivative works without the prior written permission of the relevant rights holder, except where permitted by law.",
        },
        {
          text: "The purchase of a product does not grant permission to reproduce its design or manufacture copies. This also applies to commissioned work unless intellectual property ownership or licensing arrangements have been expressly agreed in writing. All third-party names, trademarks and collaborative identities remain the property of their respective owners.",
        },
      ],
    },
    {
      heading: "12. Customer Content and Feedback",
      blocks: [
        {
          text: "Where you submit reviews, feedback, photographs or other material through our website, you confirm that you have the right to share that content. You agree not to submit material that is unlawful, misleading, defamatory, infringes another party's rights or contains harmful software.",
        },
        {
          text: "Where you voluntarily submit content for publication, you grant Bazanetti a non-exclusive, royalty-free licence to display and reproduce that content in connection with our website and the promotion of the relevant products, unless otherwise agreed. This does not transfer ownership of your content to Bazanetti. We reserve the right to moderate or remove material that breaches these Terms or applicable law.",
        },
      ],
    },
    {
      heading: "13. Third-Party Services and Links",
      blocks: [
        {
          text: "Our website may contain links to external websites or incorporate services operated by third parties. These may include payment providers, delivery partners, social media platforms and other technology services. We are not responsible for the content or practices of independent websites beyond our control. We encourage you to review their terms and privacy policies before using their services.",
        },
        {
          text: "Where Shopify provides the ecommerce technology supporting our website, purchases remain transactions directly between you and Bazanetti Ltd. Shopify acts as a platform and technology provider rather than the seller of our products. Your statutory rights against Bazanetti as the retailer are unaffected.",
        },
      ],
    },
    {
      heading: "14. Privacy and Personal Information",
      blocks: [
        {
          text: "We respect your privacy and handle personal information in accordance with applicable data protection legislation, including the UK General Data Protection Regulation and the Data Protection Act 2018.",
        },
        {
          text: "Personal information may be collected and processed to manage purchases, arrange delivery, respond to enquiries, maintain our website and provide relevant communications. Further information about the collection, processing, storage and sharing of personal information can be found in our Privacy Policy.",
        },
      ],
    },
    {
      heading: "15. Prohibited Use",
      blocks: [
        {
          text: "You agree not to use our website in any way that is unlawful or that interferes with its operation or security. This includes attempting to gain unauthorised access, distributing malicious software, collecting personal information without permission, or reproducing and commercially exploiting website content without authorisation.",
        },
        {
          text: "We reserve the right to restrict or terminate access where these Terms are breached, subject to applicable law.",
        },
      ],
    },
    {
      heading: "16. Website Information and Availability",
      blocks: [
        {
          text: "We make reasonable efforts to ensure that information on our website is accurate, complete and current. Occasionally, errors may occur in product descriptions, pricing, availability or other published information. We reserve the right to correct such errors and update website content. Where an error affects an order that has already been placed, we will contact you where necessary and act in accordance with applicable consumer law.",
        },
        {
          text: "We do not guarantee that our website will operate continuously or without technical interruption.",
        },
      ],
    },
    {
      heading: "17. Limitation of Liability",
      blocks: [
        {
          text: "Nothing in these Terms excludes or limits liability where doing so would be unlawful, including liability for death or personal injury caused by negligence, fraud or fraudulent misrepresentation, or any rights and remedies that cannot legally be excluded under consumer protection law.",
        },
        {
          text: "We are responsible for losses that are a foreseeable consequence of our breach of these Terms or failure to exercise reasonable care and skill. We are not responsible for losses that were not reasonably foreseeable, or for disruption caused by events beyond our reasonable control, except where applicable law provides otherwise.",
        },
        {
          text: "Our products are generally supplied for personal use. Where products are purchased for commercial purposes, any specific liability arrangements may be addressed in a separate written agreement. Nothing in this section affects your statutory rights.",
        },
      ],
    },
    {
      heading: "18. Governing Law",
      blocks: [
        {
          text: "These Terms are governed by the laws of England and Wales. Any dispute arising from your use of the website or purchases made through it will be subject to the jurisdiction of the courts applicable under relevant law.",
        },
        {
          text: "If you are a consumer residing outside England and Wales, this provision does not deprive you of mandatory consumer protections available in your place of residence.",
        },
      ],
    },
    {
      heading: "19. Changes to These Terms",
      blocks: [
        {
          text: "We may update these Terms from time to time to reflect changes to our business, website, services or applicable legal requirements. The latest version will be published on this page with an updated revision date. Changes will not retrospectively alter the terms of an order already accepted unless expressly agreed or legally required.",
        },
        {
          text: "If any provision is found to be invalid or unenforceable, the remaining provisions will continue to apply. Our failure to enforce a provision at any particular time does not constitute a waiver of our right to enforce it subsequently.",
        },
      ],
    },
    {
      heading: "20. Contact Information",
      blocks: [
        {
          text: "For questions about these Terms, an existing order or our products and services, please contact:",
        },
        {
          text: "Bazanetti Ltd\nTrading as: Bazanetti Ltd.\nEmail: info@bazanetti.com\nRegistered office: 293 Kenton Lane, Harrow, England, HA3 8RR\nRegistered in: England\nCompany No: 16414380\nVAT No: 492 0057 03",
        },
      ],
    },
    {
      heading: "Cancellation Form",
      blocks: [
        {
          text: "You may use the following form to cancel an eligible online purchase, although you are not required to use this format. Any clear statement of your decision to cancel is sufficient.",
        },
        {
          text: "To: Bazanetti Ltd\nEmail: info@bazanetti.com\n\nI hereby give notice that I cancel my contract for the purchase of the following goods:\n\nGoods ordered:\nOrder number:\nDate ordered:\nDate received:\nCustomer name:\nCustomer address:\nDate of cancellation:",
        },
      ],
    },
  ],
};

export const privacyPolicy: LegalPage = {
  title: "Privacy Policy",
  lastUpdated: "Last updated: 20 October 2026",
  sections: [
    {
      heading: "Overview",
      blocks: [
        {
          text: 'Bazanetti Ltd ("Bazanetti", "we", "us" or "our") respects your privacy and is committed to protecting your personal information. This Privacy Policy describes how we collect, use, store and share personal information when you visit our website, purchase our products, commission work, subscribe to communications or otherwise interact with us.',
        },
        {
          text: "Our online store is supported by Shopify, which provides ecommerce technology and associated services. We process personal information in accordance with applicable UK data protection legislation, including the UK General Data Protection Regulation (UK GDPR), the Data Protection Act 2018 and the Privacy and Electronic Communications Regulations 2003.",
        },
        {
          text: "Please read this policy to understand how your information is handled and the rights available to you.",
        },
      ],
    },
    {
      heading: "1. Information We Collect",
      blocks: [
        {
          text: "Depending on how you interact with Bazanetti, we may collect the following personal information.",
        },
        {
          lead: "Contact information",
          text: "Your name, email address, telephone number, billing address, delivery address and other contact details provided when placing an order or making an enquiry.",
        },
        {
          lead: "Order and transaction information",
          text: "Details of purchases, products ordered, payment confirmations, delivery information, returns, refunds and transaction history. Payments are handled through third-party payment providers. We do not ordinarily receive or store complete payment card details ourselves.",
        },
        {
          lead: "Bespoke commission information",
          text: "Where you enquire about or commission bespoke jewellery or objects, we may collect relevant design specifications, measurements, ring sizes, reference images, engraving details and other information necessary to develop and complete your project.",
        },
        {
          lead: "Communications",
          text: "Information contained in emails, enquiries and other correspondence with Bazanetti.",
        },
        {
          lead: "Technical and website information",
          text: "When you access our website, Shopify and other necessary technology providers may process technical information, including IP addresses, browser information, device identifiers and information about your interaction with the website. Cookies and similar technologies may also be used, as explained below.",
        },
      ],
    },
    {
      heading: "2. How We Collect Information",
      blocks: [
        { text: "We obtain personal information:" },
        {
          text: "Directly from you when you make a purchase, contact us, request a commission or subscribe to communications.",
        },
        {
          text: "Automatically through our website and its supporting technologies.",
        },
        {
          text: "From payment processors, delivery partners and other service providers involved in fulfilling your order.",
        },
        {
          text: "From third parties where necessary for a project or commercial relationship and where we have a lawful basis to process the information.",
        },
      ],
    },
    {
      heading: "3. How We Use Your Information",
      blocks: [
        {
          text: "We use personal information for the following purposes and lawful bases.",
        },
        {
          lead: "Orders and fulfilment",
          text: "To process transactions, prepare and manufacture products, arrange deliveries, manage returns and provide customer support. Lawful basis: Performance of a contract.",
        },
        {
          lead: "Bespoke commissions",
          text: "To respond to enquiries, prepare quotations, develop designs, communicate about projects and fulfil commissions. Lawful basis: Performance of a contract, steps taken before entering into a contract, or legitimate interests in managing enquiries.",
        },
        {
          lead: "Business administration",
          text: "To maintain financial records, meet accounting and tax requirements, manage payments and comply with applicable legislation. Lawful basis: Legal obligation.",
        },
        {
          lead: "Website operation and security",
          text: "To maintain website functionality, prevent fraud, ensure security and address technical problems. Lawful basis: Legitimate interests or legal obligation, as applicable.",
        },
        {
          lead: "Website improvement",
          text: "To understand and improve the functionality of our online services, where permitted. Lawful basis: Legitimate interests or consent, depending on the activity and technologies involved.",
        },
        {
          lead: "Marketing",
          text: "To send information about new collections, projects, releases and other studio updates where you have subscribed or where another lawful marketing permission applies. Lawful basis: Consent or legitimate interests where permitted by applicable electronic marketing rules. You may unsubscribe from marketing communications at any time.",
        },
      ],
    },
    {
      heading: "4. Sharing Personal Information",
      blocks: [
        {
          text: "We may share information with trusted third parties where necessary to operate our business. These include:",
        },
        { text: "Shopify, our ecommerce platform." },
        { text: "Payment providers responsible for processing transactions." },
        { text: "Postal and courier services responsible for deliveries." },
        {
          text: "Specialist manufacturers and production partners involved in fulfilling commissions.",
        },
        {
          text: "Website hosting, technical support and communications providers.",
        },
        {
          text: "Accountants, legal advisers and other professional service providers.",
        },
        { text: "Public authorities where disclosure is legally required." },
        {
          text: "We share information only where reasonably necessary for the relevant purpose and apply appropriate safeguards where required. We do not independently sell customer contact lists to third parties. However, certain Shopify services may process and share personal information for their own purposes, as explained in the following section.",
        },
      ],
    },
    {
      heading: "5. Shopify and Network Intelligence",
      blocks: [
        {
          text: "Our online store uses Shopify to provide ecommerce functionality, process orders, support customer interactions and maintain the operation of our website. Information submitted through our store may be transmitted to Shopify and its authorised service providers.",
        },
        {
          text: "We currently have Shopify Network Intelligence enabled. This allows Shopify to use information about interactions with our store alongside information collected through other merchants and Shopify services to provide enhanced features. These features may include improvements to shopping experiences, fraud prevention, business insights, personalisation and advertising services. Certain processing may involve information collected from interactions with other Shopify merchants.",
        },
        {
          text: "Where required by law, consent is obtained for the use of non-essential cookies and technologies associated with personalised advertising and related activities. Shopify may process personal information independently in connection with these enhanced services and is responsible for responding to certain requests concerning its own processing.",
        },
        {
          text: "For further information, please review the Shopify Consumer Privacy Policy and the Shopify Privacy Portal. Through Shopify's Privacy Portal, you can learn about your rights concerning Shopify's processing of personal information, including withdrawing consent or objecting to certain uses of your information.",
        },
      ],
    },
    {
      heading: "6. Cookies and Similar Technologies",
      blocks: [
        {
          text: "Our website uses cookies and related technologies to support essential website functionality and, where enabled, additional features. These may include:",
        },
        {
          lead: "Essential cookies",
          text: "Required for website security, navigation, shopping basket functionality, checkout and other necessary services.",
        },
        {
          lead: "Functional cookies",
          text: "Used to remember preferences and support certain website features.",
        },
        {
          lead: "Analytics cookies",
          text: "Where enabled, used to understand website performance and visitor interactions.",
        },
        {
          lead: "Marketing cookies",
          text: "Where enabled, used for advertising measurement, personalisation and related purposes.",
        },
        {
          text: "Our Shopify store has automated cookie privacy settings enabled. Where consent is required by law, non-essential cookies and related technologies must not be activated until the relevant permission has been obtained. You may manage or withdraw your consent through the cookie preference controls made available on our website.",
        },
        {
          text: "You can also manage certain cookies through your browser settings, although disabling essential cookies may affect website functionality. For further information about Shopify's use of cookies, please refer to the Shopify Cookie Policy.",
        },
      ],
    },
    {
      heading: "7. Marketing Communications",
      blocks: [
        {
          text: "You may choose to receive emails from Bazanetti about collections, creative projects, product releases and other relevant studio news. We will send marketing communications only where we have the appropriate legal permission.",
        },
        {
          text: "You may withdraw consent or unsubscribe at any time using the link included in marketing emails or by contacting us directly. Unsubscribing from marketing will not prevent essential communications about orders, commissions or other services you have requested.",
        },
      ],
    },
    {
      heading: "8. International Data Transfers",
      blocks: [
        {
          text: "Some of our service providers, including Shopify, may store or process personal information outside the United Kingdom. Where international transfers take place, we will ensure that appropriate safeguards apply as required by UK data protection legislation. These may include transfers to countries recognised as providing adequate protection or the use of approved contractual safeguards.",
        },
        {
          text: "You may contact us for further information about applicable international transfer arrangements.",
        },
      ],
    },
    {
      heading: "9. Data Retention",
      blocks: [
        {
          text: "We retain personal information only for as long as reasonably necessary for the purposes for which it was collected, including any applicable legal, accounting or regulatory requirements.",
        },
        {
          lead: "Transaction and accounting records",
          text: "Generally retained for six years from the end of the relevant company financial year, or longer where legally required.",
        },
        {
          lead: "Order and customer information",
          text: "Retained as reasonably necessary to fulfil purchases, manage customer service enquiries, deal with disputes and comply with legal obligations.",
        },
        {
          lead: "Bespoke commission information",
          text: "Design specifications and correspondence may be retained where reasonably necessary for the completion, servicing or documentation of commissioned work, or the establishment, exercise or defence of legal claims.",
        },
        {
          lead: "Marketing information",
          text: "Retained for as long as we have a valid legal basis for its use. Customers may unsubscribe or object to direct marketing at any time.",
        },
        {
          lead: "Enquiries and correspondence",
          text: "Retained only for as long as needed to respond to enquiries, manage relevant relationships or meet legal requirements.",
        },
        {
          text: "When personal information is no longer required, we will take appropriate steps to delete or anonymise it.",
        },
      ],
    },
    {
      heading: "10. Information Security",
      blocks: [
        {
          text: "We take appropriate technical and organisational measures to protect personal information against unauthorised access, loss, misuse, alteration or disclosure. These measures may include secure payment systems, restricted access to business information and the use of established service providers.",
        },
        {
          text: "No electronic system or method of transmission can be guaranteed to be completely secure. We recommend avoiding the transmission of sensitive payment information through unsecured communication channels.",
        },
      ],
    },
    {
      heading: "11. Your Rights",
      blocks: [
        {
          text: "Under applicable data protection legislation, you may have the right to:",
        },
        { text: "Request access to personal information held about you." },
        { text: "Request correction of inaccurate or incomplete information." },
        {
          text: "Request deletion of personal information in certain circumstances.",
        },
        { text: "Request restrictions on how your information is processed." },
        {
          text: "Request the transfer of certain information to another provider.",
        },
        { text: "Object to certain processing based on legitimate interests." },
        { text: "Withdraw consent where processing relies on consent." },
        {
          text: "You have an unconditional right to object to the processing of your personal information for direct marketing purposes. You may also have rights relating to certain significant decisions made solely through automated processing.",
        },
        {
          text: "To exercise any of these rights, please contact us using the details below. We may need to verify your identity before responding and will handle requests within the timeframes required by applicable law.",
        },
      ],
    },
    {
      heading: "12. Children's Privacy",
      blocks: [
        {
          text: "Our website and products are not specifically directed towards children. We do not knowingly collect personal information from children where doing so would be unlawful. If you believe a child has provided personal information inappropriately, please contact us so that we can investigate and take appropriate action.",
        },
      ],
    },
    {
      heading: "13. Third-Party Websites",
      blocks: [
        {
          text: "Our website may contain links to external websites, social media platforms and other independently operated services. These third parties may have their own privacy policies and data handling practices.",
        },
        {
          text: "Bazanetti is not responsible for the privacy practices of websites or services outside our control. We recommend reviewing the relevant privacy policies before sharing information with third parties.",
        },
      ],
    },
    {
      heading: "14. Complaints",
      blocks: [
        {
          text: "If you have concerns about how your personal information has been handled, please contact us at info@bazanetti.com. We will acknowledge data protection complaints within 30 days, take appropriate steps to investigate and communicate the outcome without undue delay, keeping you informed as appropriate.",
        },
        {
          text: "You also have the right to raise a complaint with the Information Commissioner's Office (ICO), the UK's independent data protection authority.\n\nInformation Commissioner's Office\nwww.ico.org.uk",
        },
      ],
    },
    {
      heading: "15. Changes to This Policy",
      blocks: [
        {
          text: "We may update this Privacy Policy to reflect changes to our services, business operations, technology providers or applicable legislation. The latest version will be published on this website together with its revision date. Where legally required, we will provide additional notice before making material changes to the way personal information is processed.",
        },
      ],
    },
    {
      heading: "16. Contact Information",
      blocks: [
        {
          text: "For questions, privacy enquiries or requests concerning your personal information, please contact:",
        },
        {
          text: "Bazanetti Ltd\nRegistered office: 293 Kenton Lane, Harrow, England, HA3 8RR\nEmail: info@bazanetti.com\nCompany registration number: 16414380\nRegistered in England and Wales.",
        },
        {
          text: "For the purposes of applicable UK data protection legislation, Bazanetti Ltd is the data controller of personal information processed for its own business purposes.",
        },
      ],
    },
  ],
};

