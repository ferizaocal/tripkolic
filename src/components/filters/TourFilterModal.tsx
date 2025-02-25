"use client";
import { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSearch } from "@fortawesome/free-solid-svg-icons";
import { tours } from "@/constants/tours";
import { useTourStore } from "@/store/tourStore";

interface FilterState {
  location: string;
  theme: string;
  activities: string[];
  price: number;
  startTime: string;
  groupSize: number;
  vehicle: string;
  features: string[];
}

interface TourFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TourFilterModal = ({ isOpen, onClose }: TourFilterModalProps) => {
  const setFilteredTours = useTourStore((state) => state.setFilteredTours);
  const [selectedTab, setSelectedTab] = useState("TOURS");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const defaultFilters: FilterState = {
    location: "",
    theme: "",
    activities: [],
    price: 25000,
    startTime: "17:00",
    groupSize: 40,
    vehicle: "",
    features: [],
  };

  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const uniqueData = useMemo(() => {
    const themes = new Set<string>();
    const activities = new Set<string>();
    const vehicles = new Set<string>();
    const features = new Set<string>();
    let maxPrice = 0;
    let maxGroupSize = 0;

    tours.forEach((tour) => {
      themes.add(tour.theme);
      tour.activities.forEach((activity) => activities.add(activity));
      vehicles.add(tour.vehicle);
      tour.features.forEach((feature) => features.add(feature));
      maxPrice = Math.max(maxPrice, tour.originalPrice);
      maxGroupSize = Math.max(maxGroupSize, tour.groupSize);
    });

    return {
      themes: Array.from(themes),
      activities: Array.from(activities),
      vehicles: Array.from(vehicles),
      features: Array.from(features),
      maxPrice,
      maxGroupSize,
    };
  }, []);

  const counts = useMemo(() => {
    const themeCounts: Record<string, number> = {};
    const activityCounts: Record<string, number> = {};

    tours.forEach((tour) => {
      themeCounts[tour.theme] = (themeCounts[tour.theme] || 0) + 1;

      tour.activities.forEach((activity) => {
        activityCounts[activity] = (activityCounts[activity] || 0) + 1;
      });
    });

    return { themeCounts, activityCounts };
  }, []);

  const applyFilters = useMemo(
    () => (newFilters: FilterState) => {
      return tours.filter((tour) => {
        if (
          newFilters.location &&
          !tour.location
            .toLowerCase()
            .includes(newFilters.location.toLowerCase())
        ) {
          return false;
        }
        if (newFilters.theme && tour.theme !== newFilters.theme) {
          return false;
        }
        if (
          newFilters.activities.length > 0 &&
          !newFilters.activities.some((activity) =>
            tour.activities.includes(activity)
          )
        ) {
          return false;
        }
        if ((tour.discountedPrice || tour.originalPrice) > newFilters.price) {
          return false;
        }
        const filterHour = parseInt(newFilters.startTime.split(":")[0]);
        const tourHour = parseInt(tour.startTime.split(":")[0]);
        if (tourHour > filterHour) {
          return false;
        }
        if (tour.groupSize > newFilters.groupSize) {
          return false;
        }
        if (newFilters.vehicle && tour.vehicle !== newFilters.vehicle) {
          return false;
        }
        if (
          newFilters.features.length > 0 &&
          !newFilters.features.some((feature) =>
            tour.features.includes(feature)
          )
        ) {
          return false;
        }
        return true;
      });
    },
    []
  );

  const handleLocationChange = (value: string) => {
    setFilters({ ...filters, location: value });
  };

  const handleThemeChange = (value: string) => {
    setFilters({ ...filters, theme: value });
  };

  const handlePriceChange = (value: number) => {
    setFilters({ ...filters, price: value });
  };

  const handleStartTimeChange = (value: string) => {
    setFilters({ ...filters, startTime: value });
  };

  const handleGroupSizeChange = (value: number) => {
    setFilters({ ...filters, groupSize: value });
  };

  const handleVehicleChange = (value: string) => {
    setFilters({ ...filters, vehicle: value });
  };

  const toggleArrayFilter = (key: "activities" | "features", value: string) => {
    const currentArray = filters[key];
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value];
    setFilters({ ...filters, [key]: newArray });
  };

  const handleSubmit = () => {
    const filteredTours = applyFilters(filters);
    setFilteredTours(filteredTours);
    onClose();
  };

  const handleReset = () => {
    setFilters(defaultFilters);
    const filteredTours = applyFilters(defaultFilters);
    setFilteredTours(filteredTours);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center overflow-y-auto">
      <div className="bg-white w-full max-w-md mt-20 rounded-3xl p-6 mb-20">
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <div className="relative flex items-center gap-6">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between w-40 px-4 py-2 rounded-xl bg-[#FFF8F3] text-[#F78410] text-sm font-normal hover:bg-[#FFF0E5] transition-colors duration-200"
              >
                <span className="capitalize">{selectedTab.toLowerCase()}</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 text-[#F78410] ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <h2 className="text-xl font-semibold text-gray-800">Filter</h2>
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-100 rounded-xl shadow-lg z-50">
                  {["tours", "tickets", "rent", "transfer"]
                    .filter((tab) => tab.toUpperCase() !== selectedTab)
                    .map((tab) => (
                      <button
                        key={tab}
                        onClick={() => {
                          setSelectedTab(tab.toUpperCase());
                          setIsDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2.5 text-left hover:bg-[#FFF8F3] text-gray-600 first:rounded-t-xl last:rounded-b-xl capitalize text-sm"
                      >
                        {tab}
                      </button>
                    ))}
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-7 h-7 rounded-full border-2 border-gray-400 hover:border-gray-600 transition-colors duration-200"
            >
              <FontAwesomeIcon
                icon={faTimes}
                className="w-3.5 h-3.5 text-gray-500"
              />
            </button>
          </div>
        </div>

        <div className="mt-8 mb-6">
          <label className="block text-sm mb-2">Location</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Where you wanna visit? (Pri phi island, Chafeng temple...)"
              className="w-full py-3 px-3 border border-gray-300 rounded-lg pr-8 text-xs"
              value={filters.location}
              onChange={(e) => handleLocationChange(e.target.value)}
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute right-5 top-1/2 transform -translate-y-1/2 text-yellow-500"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-2">Theme</label>
          <div className="flex flex-wrap gap-2">
            {uniqueData.themes.map((theme) => (
              <button
                key={theme}
                onClick={() =>
                  handleThemeChange(filters.theme === theme ? "" : theme)
                }
                className={`px-4 py-2 rounded-full border ${
                  filters.theme === theme
                    ? "bg-[#E07516] text-white border-[#E07516]"
                    : "bg-white text-gray-900 border-gray-300"
                }`}
              >
                {theme} ({counts.themeCounts[theme] || 0})
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <label className="block text-sm">Activity</label>
          </div>
          <div className="flex flex-wrap gap-2">
            {uniqueData.activities.map((activity) => (
              <button
                key={activity}
                onClick={() => toggleArrayFilter("activities", activity)}
                className={`px-4 py-2 rounded-full border ${
                  filters.activities.includes(activity)
                    ? "bg-[#E07516] text-white border-[#E07516]"
                    : "bg-white text-gray-900 border-gray-300"
                }`}
              >
                {activity} ({counts.activityCounts[activity] || 0})
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-2">Price</label>
          <div className="flex items-center gap-4 relative">
            <div className="w-[300px] h-2 bg-gray-200 rounded-full">
              <div
                className="absolute w-[300px]"
                style={{
                  top: "50%",
                  transform: "translateY(-60%)",
                }}
              >
                <input
                  type="range"
                  min="0"
                  max={uniqueData.maxPrice}
                  value={filters.price}
                  onChange={(e) => handlePriceChange(Number(e.target.value))}
                  className="w-full h-2 appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#E07516]"
                />
              </div>
            </div>
            <span className="text-sm min-w-[80px] text-center border border-gray-300 rounded-lg px-3 py-1">
              {filters.price}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-2">Start time</label>
          <div className="flex items-center gap-4 relative">
            <div className="w-[300px] h-2 bg-gray-200 rounded-full">
              <div
                className="absolute w-[300px]"
                style={{
                  top: "50%",
                  transform: "translateY(-60%)",
                }}
              >
                <input
                  type="range"
                  min="0"
                  max="24"
                  value={Number(filters.startTime.split(":")[0])}
                  onChange={(e) =>
                    handleStartTimeChange(`${e.target.value}:00`)
                  }
                  className="w-full h-2 appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#E07516]"
                />
              </div>
            </div>
            <span className="text-sm min-w-[80px] text-center border border-gray-300 rounded-lg px-3 py-1">
              {filters.startTime}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-2">Group size</label>
          <div className="flex items-center gap-4 relative">
            <div className="w-[300px] h-2 bg-gray-200 rounded-full">
              <div
                className="absolute w-[300px]"
                style={{
                  top: "50%",
                  transform: "translateY(-60%)",
                }}
              >
                <input
                  type="range"
                  min="0"
                  max={uniqueData.maxGroupSize}
                  value={filters.groupSize}
                  onChange={(e) =>
                    handleGroupSizeChange(Number(e.target.value))
                  }
                  className="w-full h-2 appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#E07516]"
                />
              </div>
            </div>
            <span className="text-sm min-w-[80px] text-center border border-gray-300 rounded-lg px-3 py-1">
              {filters.groupSize}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-2">Vehicle</label>
          <div className="flex flex-wrap gap-2">
            {uniqueData.vehicles.map((vehicle) => (
              <button
                key={vehicle}
                onClick={() =>
                  handleVehicleChange(
                    filters.vehicle === vehicle ? "" : vehicle
                  )
                }
                className={`px-4 py-2 rounded-full ${
                  filters.vehicle === vehicle
                    ? "bg-[#E07516] text-white"
                    : "border border-gray-300"
                }`}
              >
                {vehicle}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-sm mb-2">Features</label>
          <div className="flex flex-wrap gap-2">
            {uniqueData.features.map((feature) => (
              <button
                key={feature}
                onClick={() => toggleArrayFilter("features", feature)}
                className={`px-4 py-2 rounded-full ${
                  filters.features.includes(feature)
                    ? "bg-[#E07516] text-white"
                    : "border border-gray-300"
                }`}
              >
                {feature}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleReset}
            className="flex-1 py-3 rounded-xl border-2 border-[#F78410] text-[#F78410] text-sm font-semibold hover:bg-[#FFF8F3] transition-colors duration-200"
          >
            RESET
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-3 rounded-xl bg-[#F78410] text-white text-sm font-semibold hover:bg-[#E07516] transition-colors duration-200 shadow-sm"
          >
            SEARCH
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourFilterModal;
