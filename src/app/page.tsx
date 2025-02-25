"use client";
import TourCard from "@/components/TourCard";
import { useTourStore } from "@/store/tourStore";

export default function Home() {
 
  const filteredTours = useTourStore((state) => state.filteredTours);
  const resetTours = useTourStore((state) => state.resetTours);

  return (
    <main className="min-h-screen bg-[#f5f5f5] p-6">
      <div className="container mx-auto">
        {filteredTours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTours.map((tour) => (
              <TourCard
                key={tour.id}
                id={tour.id}
                title={tour.title}
                location={tour.location}
                rating={tour.rating}
                reviewCount={tour.reviewCount}
                originalPrice={tour.originalPrice}
                discountedPrice={tour.discountedPrice}
                discount={tour.discount}
                imageUrl={tour.imageUrl}
                theme={tour.theme}
                activities={tour.activities}
                startTime={tour.startTime}
                groupSize={tour.groupSize}
                vehicle={tour.vehicle}
                features={tour.features}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">No tours found</h2>
            <p className="text-gray-600 mb-8">No tours match your current filter criteria.</p>
            <button
              onClick={resetTours}
              className="px-6 py-3 bg-[#F78410] text-white rounded-lg font-semibold hover:bg-[#E07516] transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      
    </main>
  );
}
