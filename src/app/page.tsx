"use client";

import { useState } from "react";
import TourCard from "@/components/TourCard";
import TourFilterModal from "@/components/filters/TourFilterModal";
import { useTourStore } from "@/store/tourStore";

export default function Home() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const filteredTours = useTourStore((state) => state.filteredTours);

  return (
    <main className="min-h-screen bg-[#f5f5f5] p-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTours.map((tour) => (
            <TourCard
              key={tour.id}
              title={tour.title}
              location={tour.location}
              rating={tour.rating}
              reviewCount={tour.reviewCount}
              originalPrice={tour.originalPrice}
              discountedPrice={tour.discountedPrice}
              discount={tour.discount}
              imageUrl={tour.imageUrl}
            />
          ))}
        </div>
      </div>

      <TourFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
      />
    </main>
  );
}
