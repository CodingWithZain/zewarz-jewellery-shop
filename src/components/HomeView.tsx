import React from 'react';
import { HeroBanner } from './HeroBanner.tsx';
import { TrustBadges } from './TrustBadges.tsx';
import { BrowseCategories } from './BrowseCategories.tsx';
import { FeaturedCollections } from './FeaturedCollections.tsx';
import { ProductCatalog } from './ProductCatalog.tsx';
import { PromotionalFourGrid } from './PromotionalFourGrid.tsx';
import { CraftsmanshipSection } from './CraftsmanshipSection.tsx';
import { ConversionBanner } from './ConversionBanner.tsx';
import { InstagramFeed } from './InstagramFeed.tsx';

export const HomeView: React.FC = () => {
  return (
    <main>
      {/* 1. Hero Section with Call-To-Action overlays */}
      <HeroBanner />

      {/* 2. Trust Badges & Gemological Seals */}
      <TrustBadges />

      {/* 3. Browse Collection Section (Categories Visual Grid) */}
      <BrowseCategories />

      {/* 4. Featured Collections Grid */}
      <FeaturedCollections />

      {/* 5. Featured Products Section with Quick View Triggers */}
      <ProductCatalog />

      {/* 6. 4-Grid Promotional Block (Brand Pillars & Core Material Collections) */}
      <PromotionalFourGrid />

      {/* 7. Craftsmanship & Heritage Story */}
      <CraftsmanshipSection />

      {/* 8. Conversion CTA Banner: Private Salon & VIP Reservations */}
      <ConversionBanner />

      {/* 9. Social Proof & Global Salons Feed */}
      <InstagramFeed />
    </main>
  );
};
