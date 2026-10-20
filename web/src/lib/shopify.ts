import { CartItem, Product, ProductVariant } from "../types";

// Storefront API — the public token is designed for client-side use.
const storeDomain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || "";
const storefrontToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || "";
const apiVersion = "2024-10";

export function shopifyConfigured(): boolean {
  return Boolean(storeDomain && storefrontToken);
}

const currencySymbols: Record<string, string> = {
  GBP: "£",
  USD: "$",
  EUR: "€",
};

function toCurrencyPrefix(code: string): string {
  return currencySymbols[code] ?? `${code} `;
}

// Fallbacks for material/gemstones if metafields aren't exposed:
// product tags like "material: 9ct Gold" / "gemstones: Sapphire"
function tagValue(tags: string[], keys: string[]): string {
  for (const key of keys) {
    const tag = tags.find((t) => t.toLowerCase().startsWith(`${key}:`));
    if (tag) return tag.slice(tag.indexOf(":") + 1).trim();
  }
  return "";
}

const numericVariantId = (gid: string) => gid.split("/").pop() || gid;

export async function fetchShopifyProducts(): Promise<{
  products: Product[];
  error: string | null;
}> {
  if (!shopifyConfigured()) {
    return {
      products: [],
      error:
        "Shopify is not connected yet (missing VITE_SHOPIFY_STORE_DOMAIN / VITE_SHOPIFY_STOREFRONT_TOKEN).",
    };
  }

  const query = `{
    products(first: 50, sortKey: CREATED_AT) {
      edges {
        node {
          id
          title
          description
          tags
          featuredImage { url altText }
          images(first: 3) { edges { node { url altText } } }
          options { name }
          priceRange { minVariantPrice { amount currencyCode } }
          variants(first: 50) {
            edges {
              node {
                id
                title
                availableForSale
                price { amount currencyCode }
              }
            }
          }
          materialMetafield: metafield(namespace: "custom", key: "material") { value }
          gemstonesMetafield: metafield(namespace: "custom", key: "gemstones") { value }
        }
      }
    }
  }`;

  try {
    const res = await fetch(
      `https://${storeDomain}/api/${apiVersion}/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": storefrontToken,
        },
        body: JSON.stringify({ query }),
      },
    );

    if (!res.ok) throw new Error(`Shopify API error: ${res.status}`);

    const json = await res.json();
    if (json.errors?.length) {
      throw new Error(json.errors[0].message || "Shopify GraphQL error");
    }

    const products: Product[] = (json.data?.products?.edges ?? []).map(
      ({ node }: any) => {
        const variants: ProductVariant[] = (node.variants?.edges ?? []).map(
          ({ node: v }: any) => ({
            id: numericVariantId(v.id),
            title: v.title,
            availableForSale: Boolean(v.availableForSale),
            price: parseFloat(v.price?.amount ?? "0"),
          }),
        );

        // A lone "Default Title" variant means no real purchase options
        const isDefaultVariant =
          variants.length === 1 && variants[0].title === "Default Title";
        const sizes = isDefaultVariant
          ? ["One Size"]
          : variants.map((v) => v.title);
        const variantLabel = isDefaultVariant
          ? undefined
          : node.options?.[0]?.name || undefined;

        const images: string[] = (node.images?.edges ?? [])
          .map((e: any) => e.node?.url)
          .filter(Boolean);
        const image = node.featuredImage?.url || images[0] || "";
        const tags: string[] = node.tags ?? [];

        return {
          id: node.id,
          name: node.title || "Untitled Product",
          price: parseFloat(node.priceRange?.minVariantPrice?.amount ?? "0"),
          currency: toCurrencyPrefix(
            node.priceRange?.minVariantPrice?.currencyCode || "GBP",
          ),
          image,
          altImage: images[1] || undefined,
          images,
          material:
            node.materialMetafield?.value ||
            tagValue(tags, ["material", "materials"]) ||
            "—",
          gemstones:
            node.gemstonesMetafield?.value ||
            tagValue(tags, ["gemstones", "stones"]) ||
            "—",
          sizes,
          variantLabel,
          description: node.description || "",
          inStock: variants.some((v) => v.availableForSale),
          variants,
        };
      },
    );

    return { products, error: null };
  } catch (err: any) {
    return { products: [], error: err?.message || String(err) };
  }
}

// Shopify cart permalinks open a prefilled cart on the store domain
export function buildShopifyCartUrl(items: CartItem[]): string | null {
  if (!storeDomain) return null;
  const lines = items
    .map((item) => {
      const variantId =
        item.variantId ||
        item.product.variants?.find((v) => v.title === item.size)?.id;
      return variantId ? `${variantId}:${item.quantity}` : null;
    })
    .filter(Boolean);
  if (lines.length === 0) return null;
  return `https://${storeDomain}/cart/${lines.join(",")}`;
}
