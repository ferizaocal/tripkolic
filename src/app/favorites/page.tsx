"use client";

import TourCard from "@/components/TourCard";
import { useFavoriteStore } from "@/store/favoriteStore";
import Link from "next/link";

export default function FavoritesPage() {
  const favorites = useFavoriteStore((state) => state.favorites);

  return (
    <main className="min-h-screen bg-[#f5f5f5] p-6 pt-15">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">My Favorites</h1>

        {favorites.length > 0 ? (
          <div
            key={favorites.length}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {favorites.map((tour) => (
              <TourCard key={tour.id} {...tour} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              No favorites yet
            </h2>
            <p className="text-gray-600 mb-8">
              Start exploring tours and add some to your favorites!
            </p>
            <Link
              href="/"
              className="px-6 py-3 bg-[#F78410] text-white rounded-lg font-semibold hover:bg-[#E07516] transition-colors"
            >
              Explore Tours
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
