"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faGlobe,
  faHeart,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import TourFilterModal from "./filters/TourFilterModal";
import { useFavoriteStore } from "@/store/favoriteStore";

const Navbar = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [hasActiveFilters, setHasActiveFilters] = useState(false);
  const favorites = useFavoriteStore((state) => state.favorites);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white">
        <div className="container mx-auto px-1">
          <nav className="h-14 flex items-center justify-between">
            <div className="flex items-center gap-3 ">
              <button
                className={`hover:text-gray-600 ${
                  hasActiveFilters ? "text-[#F78410]" : "text-gray-800"
                }`}
                onClick={() => setIsFilterOpen(true)}
              >
                <FontAwesomeIcon icon={faFilter} className="w-5 h-5" />
              </button>
              <span className="text-gray-800 text-sm font-medium">
                Traveller&rsquo;s local market
              </span>
            </div>

            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Link href="/" title="Home Page">
                <Image
                  src="/icon.png"
                  alt="Logo"
                  width={24}
                  height={24}
                  className="w-6 h-6 object-contain"
                  priority
                />
              </Link>
            </div>

            <div className="flex items-center gap-6">
              <Link href="#" className="text-gray-800 hover:text-gray-600">
                <FontAwesomeIcon icon={faGlobe} className="w-4 h-4" />
              </Link>
              <Link href="/favorites" className="text-red-500 hover:text-red-600 relative">
                <FontAwesomeIcon icon={faHeart} className="w-4 h-4" />
                {favorites.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#F78410] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Link>
              <Link href="#" className="text-gray-800 hover:text-gray-600">
                <FontAwesomeIcon icon={faShoppingCart} className="w-4 h-4" />
              </Link>
              <Link href="#" className="text-gray-800 hover:text-gray-600">
                <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <TourFilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onFiltersChange={setHasActiveFilters}
      />
    </>
  );
};

export default Navbar;
