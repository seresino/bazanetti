import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ActiveTab, Product, Project, CartItem } from "./types";
import { fetchSanityWorks } from "./lib/sanity";
import { buildShopifyCartUrl, shopifyConfigured } from "./lib/shopify";
import { Navigation } from "./components/Navigation";
import { SideTicker } from "./components/SideTicker";
import { Footer } from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";
import { LandingView } from "./views/LandingView";
import { HomeView } from "./views/HomeView";
import { ShopView } from "./views/ShopView";
import { WorksView } from "./views/WorksView";
import { ProjectDetailView } from "./views/ProjectDetailView";
import { VaultView } from "./views/VaultView";
import { InfoView, InfoMasthead } from "./views/InfoView";

const tabToPath: Record<ActiveTab, string> = {
  landing: "/",
  home: "/home",
  shop: "/shop",
  works: "/works",
  vault: "/vault",
  info: "/info",
  project: "/works", // detail pages live under /works/:slug
};

function pathToTab(pathname: string): ActiveTab {
  if (pathname === "/home") return "home";
  if (pathname === "/shop") return "shop";
  if (pathname === "/vault") return "vault";
  if (pathname === "/info") return "info";
  if (pathname === "/works" || pathname === "/works/") return "works";
  if (pathname.startsWith("/works/")) return "project";
  return "landing";
}

// Resolves /works/:slug into a Project so shared links work on a fresh load
function ProjectDetailRoute({ onBack }: { onBack: () => void }) {
  const location = useLocation();
  const slug = decodeURIComponent(
    location.pathname.split("/works/")[1]?.replace(/\/+$/, "") || "",
  );
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    fetchSanityWorks().then((res) => {
      const lower = slug.toLowerCase();
      const found = res.data.find(
        (p) =>
          p.slug === slug || p.id === slug || p.slug.toLowerCase() === lower,
      );
      setProject(found ?? null);
      setNotFound(!found);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="w-full py-24 text-center text-xs font-bold uppercase tracking-wider text-black/50">
        Loading project…
      </div>
    );
  }

  if (notFound || !project) {
    return (
      <div className="w-full py-24 text-center space-y-6">
        <p className="text-xs font-black uppercase tracking-widest text-black/60">
          Project not found
        </p>
        <button
          onClick={onBack}
          className="text-xs font-black uppercase tracking-widest underline cursor-pointer"
        >
          Back to Works
        </button>
      </div>
    );
  }

  return <ProjectDetailView project={project} onBack={onBack} />;
}

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = pathToTab(location.pathname);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("bazanetti_cart");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [swipeIn, setSwipeIn] = useState(false);

  useEffect(() => {
    localStorage.setItem("bazanetti_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddToCart = (product: Product, size: string) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.size === size,
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      const variantId = product.variants?.find((v) => v.title === size)?.id;
      return [...prev, { product, size, quantity: 1, variantId }];
    });
    showToast(`Added ${product.name} (${size}) to Bag`);
  };

  const handleUpdateQuantity = (id: string, size: string, delta: number) => {
    setCartItems(
      (prev) =>
        prev
          .map((item) => {
            if (item.product.id === id && item.size === size) {
              const newQty = item.quantity + delta;
              return newQty > 0 ? { ...item, quantity: newQty } : null;
            }
            return item;
          })
          .filter(Boolean) as CartItem[],
    );
  };

  const handleRemoveItem = (id: string, size: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.product.id === id && item.size === size)),
    );
  };

  const handleCheckout = () => {
    const url = buildShopifyCartUrl(cartItems);
    if (!url) {
      showToast(
        shopifyConfigured()
          ? "Bag items can't be checked out — missing product variants"
          : "Shop is not connected to Shopify yet",
      );
      return;
    }
    showToast("Redirecting to secure Shopify checkout...");
    window.location.href = url;
  };

  const selectTab = (tab: ActiveTab) => navigate(tabToPath[tab]);

  const handleSelectProject = (project: Project) =>
    navigate(`/works/${project.slug}`);

  // Scroll to top whenever the route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const totalCartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
  const showHeader = activeTab !== "landing" && activeTab !== "home";

  return (
    <>
      {/* During the landing→home transition, keep the landing page mounted
          underneath so the homepage visibly swipes up over it */}
      {swipeIn && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
        >
          <LandingView onEnter={() => {}} />
        </div>
      )}
      <div
        className={`relative bg-white text-black selection:bg-black selection:text-white flex flex-col justify-between ${
          swipeIn ? "animate-page-swipe-up " : ""
        }min-h-screen`}
      >
        {/* 1. Header: Full width across screen, only on shop, works, vault, info, project */}
        {showHeader && (
          <Navigation activeTab={activeTab} onSelectTab={selectTab} />
        )}

        {/* 2. Middle Body: On Info, the BAZANETTI masthead spans the full viewport width
          and the ribbons only begin beneath it; elsewhere ribbons fill the space
          between header and footer (hidden on landing) */}
        <div className="relative flex-1 w-full flex flex-col">
          {activeTab === "info" && <InfoMasthead />}
          <div className="relative flex-1 w-full flex">
            {activeTab !== "landing" && <SideTicker side="left" />}

            {/* Dynamic View Presentation */}
            <main className="flex-1 w-full min-w-0">
              {activeTab === "landing" && (
                <LandingView
                  onEnter={() => {
                    setSwipeIn(true);
                    navigate("/home");
                    setTimeout(() => setSwipeIn(false), 700);
                  }}
                />
              )}

              {activeTab === "home" && <HomeView onSelectTab={selectTab} />}

              {activeTab === "shop" && (
                <ShopView
                  onAddToCart={handleAddToCart}
                  onOpenCart={() => setIsCartOpen(true)}
                />
              )}

              {activeTab === "works" && (
                <WorksView onSelectProject={handleSelectProject} />
              )}

              {activeTab === "project" && (
                <ProjectDetailRoute onBack={() => navigate("/works")} />
              )}

              {activeTab === "vault" && <VaultView />}

              {activeTab === "info" && <InfoView />}
            </main>

            {activeTab !== "landing" && <SideTicker side="right" />}
          </div>
        </div>

        {/* 3. Global Footer: Full width across screen (hidden on landing page) */}
        {activeTab !== "landing" && <Footer onSelectTab={selectTab} />}

        {/* Slide-over Cart Drawer */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onCheckout={handleCheckout}
        />

        {/* Floating Notification Toast */}
        {toastMessage && (
          <div
            role="status"
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-black text-white text-xs font-bold uppercase tracking-wider px-5 py-3 shadow-2xl border border-white/20 animate-fade-in flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </>
  );
}
