import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { BrandSettings, fetchBrandSettings } from "../lib/sanity";

interface BrandContextType {
  brand: BrandSettings;
  loading: boolean;
  error: string | null;
  refreshBrand: () => Promise<void>;
}

const defaultBrand: BrandSettings = {
  landingBackgroundGif: null,
  monogramEmblem: null,
  wordmarkLogo: null,
  bioText: null,
  emailAddress: null,
  instagramUrl: null,
  icons: {
    shop: null,
    info: null,
    works: null,
    vault: null,
    rings: null,
  },
};

const BrandContext = createContext<BrandContextType>({
  brand: defaultBrand,
  loading: true,
  error: null,
  refreshBrand: async () => {},
});

export function BrandProvider({ children }: { children: React.ReactNode }) {
  const [brand, setBrand] = useState<BrandSettings>(defaultBrand);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshBrand = useCallback(async () => {
    setLoading(true);
    const result = await fetchBrandSettings();
    setBrand(result.brand);
    setError(result.error);
    setLoading(false);
  }, []);

  useEffect(() => {
    refreshBrand();
  }, [refreshBrand]);

  // Point the favicon at the Sanity-hosted monogram once brand settings load.
  // The ?w=64&h=64&fm=png transform rasterizes to a 64px PNG; ignored for SVGs.
  useEffect(() => {
    if (!brand.monogramEmblem) return;
    const link =
      document.querySelector<HTMLLinkElement>("link[rel~='icon']") ??
      document.head.appendChild(
        Object.assign(document.createElement("link"), { rel: "icon" }),
      );
    const sep = brand.monogramEmblem.includes("?") ? "&" : "?";
    link.href = `${brand.monogramEmblem}${sep}w=64&h=64&fm=png`;
  }, [brand.monogramEmblem]);

  return (
    <BrandContext.Provider value={{ brand, loading, error, refreshBrand }}>
      {children}
    </BrandContext.Provider>
  );
}

export function useBrand() {
  return useContext(BrandContext);
}
