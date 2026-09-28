import React, { useState, useEffect } from 'react';
import { ActiveTab, Product, Project, CartItem } from './types';
import { mockProjects } from './data/mockData';
import { Navigation } from './components/Navigation';
import { SideTicker } from './components/SideTicker';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { FontUploader } from './components/FontUploader';
import { LandingView } from './views/LandingView';
import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { WorksView } from './views/WorksView';
import { ProjectDetailView } from './views/ProjectDetailView';
import { VaultView } from './views/VaultView';
import { InfoView } from './views/InfoView';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('landing');
  const [selectedProject, setSelectedProject] = useState<Project>(mockProjects[0]);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('bazanetti_cart');
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

  useEffect(() => {
    localStorage.setItem('bazanetti_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddToCart = (product: Product, size: string) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, size, quantity: 1 }];
    });
    showToast(`Added ${product.name} (${size}) to Bag`);
  };

  const handleUpdateQuantity = (id: string, size: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === id && item.size === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string, size: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.product.id === id && item.size === size))
    );
  };

  const handleCheckout = () => {
    showToast('Redirecting to secure Shopify Storefront checkout...');
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setActiveTab('project');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const showHeader = activeTab !== 'landing' && activeTab !== 'home';

  return (
    <div className="relative min-h-screen bg-white text-black selection:bg-black selection:text-white flex flex-col justify-between">
      
      {/* 1. Header: Full width across screen, only on shop, works, vault, info, project */}
      {showHeader && (
        <Navigation
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* 2. Middle Body: Ribbons fit vertically in the space between header and footer (hidden on landing) */}
      <div className="relative flex-1 w-full flex">
        {activeTab !== 'landing' && <SideTicker side="left" hasHeader={showHeader} />}

        {/* Dynamic View Presentation */}
        <main className="flex-1 w-full min-w-0">
          {activeTab === 'landing' && (
            <LandingView onEnter={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} />
          )}

          {activeTab === 'home' && (
            <HomeView 
              onSelectTab={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
            />
          )}

          {activeTab === 'shop' && (
            <ShopView onAddToCart={handleAddToCart} />
          )}

          {activeTab === 'works' && (
            <WorksView onSelectProject={handleSelectProject} />
          )}

          {activeTab === 'project' && (
            <ProjectDetailView
              project={selectedProject}
              onBack={() => {
                setActiveTab('works');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {activeTab === 'vault' && (
            <VaultView />
          )}

          {activeTab === 'info' && (
            <InfoView />
          )}
        </main>

        {activeTab !== 'landing' && <SideTicker side="right" hasHeader={showHeader} />}
      </div>

      {/* 3. Global Footer: Full width across screen (hidden on landing page) */}
      {activeTab !== 'landing' && (
        <Footer onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} />
      )}

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

      {/* Font Installer Helper (Uploads .woff2/.woff into /public/fonts) */}
      <FontUploader />
    </div>
  );
}
