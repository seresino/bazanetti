import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { BrandSettings, fetchBrandSettings } from '../lib/sanity';

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
  emailAddress: null,
  instagramUrl: null,
  icons: {
    shop: null,
    info: null,
    works: null,
    vault: null,
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

  return (
    <BrandContext.Provider value={{ brand, loading, error, refreshBrand }}>
      {children}
    </BrandContext.Provider>
  );
}

export function useBrand() {
  return useContext(BrandContext);
}
