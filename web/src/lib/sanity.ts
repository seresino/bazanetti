import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { GalleryMedia, Project, VaultItem } from "../types";

export const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || "hp05jmwr";
export const dataset = import.meta.env.VITE_SANITY_DATASET || "production";
export const apiVersion = "2024-03-01";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false to avoid CDN lag while editing/testing live
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}

export interface SanityFetchResult<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  isEmpty: boolean;
  projectId: string;
  dataset: string;
}

// Fetch Works from Sanity without mock fallback
export async function fetchSanityWorks(): Promise<SanityFetchResult<Project>> {
  try {
    const query = `*[_type in ["work", "project"]] | order(coalesce(order, 9999) asc, year desc, _createdAt desc) {
      _id,
      "slug": coalesce(slug.current, _id),
      title,
      category,
      badgeText,
      client,
      year,
      description,
      materials,
      dimensions,
      coverImage,
      "coverImageUrl": coverImage.asset->url,
      image,
      "imageUrl": image.asset->url,
      gallery,
      "galleryUrls": gallery[].asset->url,
      "galleryMedia": gallery[] {
        "_type": @._type,
        "url": coalesce(url, asset->url),
        "mimeType": asset->mimeType
      },
      detailImages,
      "detailImageUrls": detailImages[].asset->url,
      tags,
      aspectRatio
    }`;

    const rawData = await sanityClient.fetch(query);

    if (!Array.isArray(rawData)) {
      throw new Error(
        `Unexpected response format from Sanity (received ${typeof rawData})`,
      );
    }

    if (rawData.length === 0) {
      return {
        data: [],
        loading: false,
        error: null,
        isEmpty: true,
        projectId,
        dataset,
      };
    }

    const projects: Project[] = rawData.map((item, index) => {
      // Resolve cover image from either direct asset URL or image builder
      let coverImg = item.coverImageUrl || item.imageUrl;
      if (!coverImg && item.coverImage) {
        try {
          coverImg = urlFor(item.coverImage).width(1200).url();
        } catch {
          coverImg = "";
        }
      }
      if (!coverImg && item.image) {
        try {
          coverImg = urlFor(item.image).width(1200).url();
        } catch {
          coverImg = "";
        }
      }

      // Resolve detail/gallery media (images, uploaded video files, video links)
      let detailMedia: GalleryMedia[] = [];
      if (Array.isArray(item.galleryMedia) && item.galleryMedia.length > 0) {
        detailMedia = item.galleryMedia
          .map((m: any) => ({
            type:
              m?.mimeType?.startsWith("video/") ||
              ["file", "videoFile", "videoLink"].includes(m?._type)
                ? ("video" as const)
                : ("image" as const),
            url: m?.url || "",
          }))
          .filter((m: GalleryMedia) => Boolean(m.url));
      }

      if (detailMedia.length === 0) {
        // Legacy fallbacks: plain image URL arrays
        let detailImgs: string[] = [];
        if (Array.isArray(item.galleryUrls) && item.galleryUrls.length > 0) {
          detailImgs = item.galleryUrls.filter(Boolean);
        } else if (
          Array.isArray(item.detailImageUrls) &&
          item.detailImageUrls.length > 0
        ) {
          detailImgs = item.detailImageUrls.filter(Boolean);
        } else if (Array.isArray(item.gallery)) {
          detailImgs = item.gallery
            .map((img: any) => {
              try {
                return urlFor(img).width(1200).url();
              } catch {
                return "";
              }
            })
            .filter(Boolean);
        }
        detailMedia = detailImgs.map((url) => ({ type: "image", url }));
      }

      return {
        id: item._id || `sanity-project-${index}`,
        slug: item.slug || item._id || `sanity-project-${index}`,
        title: item.title || "Untitled Work",
        category: item.badgeText || item.category || "AWFC ● Champions League",
        client: item.client || "Bazanetti Atelier",
        year: item.year
          ? String(item.year)
          : new Date().getFullYear().toString(),
        coverImage: coverImg || "",
        heroImage: coverImg || "",
        description:
          item.description ||
          (Array.isArray(item.materials) ? item.materials.join(", ") : ""),
        detailMedia:
          detailMedia.length > 0
            ? detailMedia
            : coverImg
              ? [{ type: "image" as const, url: coverImg }]
              : [],
        tags: Array.isArray(item.tags) ? item.tags : ["Bespoke", "Jewellery"],
        aspectRatio: item.aspectRatio || (index === 1 ? "tall" : "square"),
      };
    });

    return {
      data: projects,
      loading: false,
      error: null,
      isEmpty: false,
      projectId,
      dataset,
    };
  } catch (err: any) {
    const errorMsg =
      err?.message ||
      String(err) ||
      "Unknown error occurred while contacting Sanity";
    return {
      data: [],
      loading: false,
      error: errorMsg,
      isEmpty: false,
      projectId,
      dataset,
    };
  }
}

// Fetch Vault items from Sanity without mock fallback
export async function fetchSanityVault(): Promise<
  SanityFetchResult<VaultItem>
> {
  try {
    const query = `*[_type in ["vaultItem", "vault"]] | order(year desc, _createdAt desc) {
      _id,
      title,
      code,
      year,
      material,
      materials,
      edition,
      status,
      image,
      "imageUrl": image.asset->url,
      coverImage,
      "coverImageUrl": coverImage.asset->url,
      model3d,
      "model3dUrl": coalesce(model3d.asset->url, model.asset->url, glb.asset->url, file.asset->url, asset3d.asset->url)
    }`;

    const rawData = await sanityClient.fetch(query);

    if (!Array.isArray(rawData)) {
      throw new Error(
        `Unexpected response format from Sanity (received ${typeof rawData})`,
      );
    }

    if (rawData.length === 0) {
      return {
        data: [],
        loading: false,
        error: null,
        isEmpty: true,
        projectId,
        dataset,
      };
    }

    const items: VaultItem[] = rawData.map((item, index) => {
      let img = item.imageUrl || item.coverImageUrl;
      if (!img && item.image) {
        try {
          img = urlFor(item.image).width(800).url();
        } catch {
          img = "";
        }
      }
      if (!img && item.coverImage) {
        try {
          img = urlFor(item.coverImage).width(800).url();
        } catch {
          img = "";
        }
      }

      const materialStr =
        item.material ||
        (Array.isArray(item.materials)
          ? item.materials.join(", ")
          : "Solid 18ct Gold");

      return {
        id: item._id || `sanity-vault-${index}`,
        code: item.code || `BZ-VLT-${String(index + 1).padStart(2, "0")}`,
        title: item.title || "Archival Vault Piece",
        year: item.year ? String(item.year) : "2024",
        material: materialStr,
        image: img || "",
        edition:
          item.edition || item.status || "Private Collection / One of One",
        model3dUrl: item.model3dUrl || "",
      };
    });

    return {
      data: items,
      loading: false,
      error: null,
      isEmpty: false,
      projectId,
      dataset,
    };
  } catch (err: any) {
    const errorMsg =
      err?.message ||
      String(err) ||
      "Unknown error occurred while contacting Sanity";
    return {
      data: [],
      loading: false,
      error: errorMsg,
      isEmpty: false,
      projectId,
      dataset,
    };
  }
}

export interface BrandIcons {
  shop: string | null;
  info: string | null;
  works: string | null;
  vault: string | null;
  rings: string | null;
}

export interface BrandSettings {
  landingBackgroundGif: string | null;
  monogramEmblem: string | null;
  wordmarkLogo: string | null;
  bioText: string | null;
  emailAddress?: string | null;
  instagramUrl?: string | null;
  icons: BrandIcons;
  wordIcons: BrandIcons;
}

// Fetch Brand, Identity, and Navigation Icons from Sanity
export async function fetchBrandSettings(): Promise<{
  brand: BrandSettings;
  error: string | null;
}> {
  const emptyIcons: BrandIcons = {
    shop: null,
    info: null,
    works: null,
    vault: null,
    rings: null,
  };
  const emptyWordIcons: BrandIcons = { ...emptyIcons };

  try {
    const query = `{
      "brand": *[_type in ["brandSettings", "siteSettings", "brand"]][0] {
        _id,
        landingBackgroundGif,
        "landingBackgroundGifUrl": coalesce(landingBackgroundGif.asset->url, backgroundGif.asset->url),
        monogramEmblem,
        "monogramEmblemUrl": coalesce(monogramEmblem.asset->url, bLogo.asset->url, monogram.asset->url),
        wordmarkLogo,
        "wordmarkLogoUrl": coalesce(wordmarkLogo.asset->url, wordmark.asset->url),
        bioText,
        emailAddress,
        instagramUrl,
        shopIcon,
        "shopIconUrl": shopIcon.asset->url,
        infoIcon,
        "infoIconUrl": infoIcon.asset->url,
        worksIcon,
        "worksIconUrl": worksIcon.asset->url,
        vaultIcon,
        "vaultIconUrl": vaultIcon.asset->url,
        ringsIcon,
        "ringsIconUrl": ringsIcon.asset->url,
        "iconsArray": coalesce(brandIcons, icons, icon, brandGlyphs, glyphs, navIcons)[] {
          _id,
          _type,
          name,
          title,
          key,
          "docName": coalesce(name, title, @->name, @->title, slug.current, @->slug.current),
          "iconUrl": coalesce(
            icon.asset->url,
            image.asset->url,
            asset->url,
            file.asset->url,
            svg.asset->url,
            @->icon.asset->url,
            @->image.asset->url,
            @->asset->url
          ),
          icon,
          image,
          asset
        }
      },
      "standaloneIcons": *[_type in ["icon", "glyph", "navIcon", "brandIcon", "brandGlyph"] || lower(title) in ["shop", "info", "works", "vault", "rings"] || lower(name) in ["shop", "info", "works", "vault", "rings"]] {
        _id,
        _type,
        name,
        title,
        "docName": coalesce(name, title, slug.current),
        "iconUrl": coalesce(icon.asset->url, image.asset->url, asset->url, file.asset->url, svg.asset->url),
        icon,
        image,
        asset
      }
    }`;

    const result = await sanityClient.fetch(query);
    const data = result?.brand;

    if (
      !data &&
      (!result?.standaloneIcons || result.standaloneIcons.length === 0)
    ) {
      return {
        brand: {
          landingBackgroundGif: null,
          monogramEmblem: null,
          wordmarkLogo: null,
          bioText: null,
          emailAddress: null,
          instagramUrl: null,
          icons: emptyIcons,
          wordIcons: emptyWordIcons,
        },
        error: null,
      };
    }

    // Resolve landing background gif
    let bgGif = data?.landingBackgroundGifUrl || data?.backgroundGifUrl;
    if (!bgGif && data?.landingBackgroundGif) {
      try {
        bgGif = urlFor(data.landingBackgroundGif).url();
      } catch {}
    }
    if (!bgGif && data?.backgroundGif) {
      try {
        bgGif = urlFor(data.backgroundGif).url();
      } catch {}
    }

    // Resolve monogram emblem (B logo)
    let emblem = data?.monogramEmblemUrl || data?.bLogoUrl || data?.monogramUrl;
    if (!emblem && data?.monogramEmblem) {
      try {
        emblem = urlFor(data.monogramEmblem).url();
      } catch {}
    }
    if (!emblem && data?.bLogo) {
      try {
        emblem = urlFor(data.bLogo).url();
      } catch {}
    }
    if (!emblem && data?.monogram) {
      try {
        emblem = urlFor(data.monogram).url();
      } catch {}
    }

    // Resolve wordmark logo
    let wordmark = data?.wordmarkLogoUrl || data?.wordmarkUrl;
    if (!wordmark && data?.wordmarkLogo) {
      try {
        wordmark = urlFor(data.wordmarkLogo).url();
      } catch {}
    }
    if (!wordmark && data?.wordmark) {
      try {
        wordmark = urlFor(data.wordmark).url();
      } catch {}
    }

    // Resolve icons for shop, info, works, vault
    const resolvedIcons: BrandIcons = {
      shop: data?.shopIconUrl || null,
      info: data?.infoIconUrl || null,
      works: data?.worksIconUrl || null,
      vault: data?.vaultIconUrl || null,
      rings: data?.ringsIconUrl || null,
    };
    // "Shop Word"-style entries hold the wordmark image used on hover/home
    const resolvedWordIcons: BrandIcons = { ...emptyWordIcons };

    const allIconItems = [
      ...(data?.iconsArray || []),
      ...(result?.standaloneIcons || []),
    ];

    // Also check any extra array fields in brandSettings
    if (data) {
      for (const [key, val] of Object.entries(data)) {
        if (Array.isArray(val) && key !== "iconsArray") {
          for (const item of val) {
            if (item && typeof item === "object") {
              allIconItems.push(item);
            }
          }
        }
      }
    }

    for (const item of allIconItems) {
      if (!item) continue;
      const label = (
        item.docName ||
        item.name ||
        item.title ||
        item.key ||
        item._id ||
        ""
      )
        .toLowerCase()
        .trim();
      let iconUrl = item.iconUrl || item.url;
      if (!iconUrl && item.icon) {
        try {
          iconUrl = urlFor(item.icon).url();
        } catch {}
      }
      if (!iconUrl && item.image) {
        try {
          iconUrl = urlFor(item.image).url();
        } catch {}
      }
      if (!iconUrl && item.asset) {
        try {
          iconUrl = urlFor(item.asset).url();
        } catch {}
      }

      if (iconUrl) {
        const target = label.includes("word")
          ? resolvedWordIcons
          : resolvedIcons;
        if (!target.shop && (label === "shop" || label.includes("shop"))) {
          target.shop = iconUrl;
        } else if (
          !target.info &&
          (label === "info" || label.includes("info"))
        ) {
          target.info = iconUrl;
        } else if (
          !target.works &&
          (label === "works" || label === "work" || label.includes("work"))
        ) {
          target.works = iconUrl;
        } else if (
          !target.vault &&
          (label === "vault" || label.includes("vault"))
        ) {
          target.vault = iconUrl;
        } else if (
          !target.rings &&
          (label === "rings" || label === "ring" || label.includes("ring"))
        ) {
          target.rings = iconUrl;
        }
      }
    }

    return {
      brand: {
        landingBackgroundGif: bgGif || null,
        monogramEmblem: emblem || null,
        wordmarkLogo: wordmark || null,
        bioText: data?.bioText || null,
        emailAddress: data?.emailAddress || null,
        instagramUrl: data?.instagramUrl || null,
        icons: resolvedIcons,
        wordIcons: resolvedWordIcons,
      },
      error: null,
    };
  } catch (err: any) {
    console.warn("[Sanity] Could not fetch brand settings:", err);
    return {
      brand: {
        landingBackgroundGif: null,
        monogramEmblem: null,
        wordmarkLogo: null,
        bioText: null,
        emailAddress: null,
        instagramUrl: null,
        icons: emptyIcons,
        wordIcons: emptyWordIcons,
      },
      error: err?.message || String(err),
    };
  }
}

export interface RingSizeRow {
  label: string;
  uk: string;
  usa: string;
  eu: number;
  circumferenceMm: number;
  diameterMm: number;
}

export interface BraceletSizeRow {
  size: string;
  circumferenceInch: number;
  circumferenceCm: number;
}

export interface NecklaceSizeRow {
  size: string;
  lengthInch: number;
  lengthCm: number;
}

export interface ShopInfo {
  returnsText: string;
  shippingText: string;
  sizingIntro: string;
  ringSizes: RingSizeRow[];
  braceletSizes: BraceletSizeRow[];
  necklaceSizes: NecklaceSizeRow[];
}

// Returns / Shipping / Sizing content for the product modal
export async function fetchShopInfo(): Promise<{
  info: ShopInfo | null;
  error: string | null;
}> {
  try {
    const data = await sanityClient.fetch(
      `*[_type == "shopInfo"][0] {
        returnsText,
        shippingText,
        sizingIntro,
        ringSizes[] { label, uk, usa, eu, circumferenceMm, diameterMm },
        braceletSizes[] { size, circumferenceInch, circumferenceCm },
        necklaceSizes[] { size, lengthInch, lengthCm }
      }`,
    );
    return { info: data ?? null, error: null };
  } catch (err: any) {
    console.warn("[Sanity] Could not fetch shop info:", err);
    return { info: null, error: err?.message || String(err) };
  }
}
