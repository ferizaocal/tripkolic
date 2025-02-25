import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { FaHeart, FaRegHeart, FaMapMarkerAlt } from "react-icons/fa";
import { BsArrowDownRight } from "react-icons/bs";
import { useFavoriteStore } from "@/store/favoriteStore";
import { Tour } from "@/constants/tours";

interface TourCardProps extends Tour {}

const TourCard: React.FC<TourCardProps> = ({
  id,
  title,
  location,
  rating,
  reviewCount,
  originalPrice,
  discountedPrice,
  discount,
  imageUrl,
  theme,
  activities,
  startTime,
  groupSize,
  vehicle,
  features,
}) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavoriteStore();
  const isInFavorites = isFavorite(id);

  const handleFavoriteClick = () => {
    if (isInFavorites) {
      removeFromFavorites(id);
    } else {
      addToFavorites({
        id,
        title,
        location,
        rating,
        reviewCount,
        originalPrice,
        discountedPrice,
        discount,
        imageUrl,
        theme,
        activities,
        startTime,
        groupSize,
        vehicle,
        features,
      });
    }
  };

  return (
    <div className="relative w-full max-w-sm rounded-md overflow-hidden bg-white shadow h-[360px] flex flex-col">
      <div className="relative h-44 w-full flex-shrink-0">
        <Image src={imageUrl} alt={title} fill className="object-cover" />

        {discount && (
          <div className="absolute top-2 left-2 bg-white text-[#F2A945] px-2 py-0.5 rounded-md text-sm font-bold shadow-md">
            {discount}% OFF
          </div>
        )}

        <button 
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 p-1.5 bg-white rounded-md shadow-md transition-colors hover:bg-gray-50"
        >
          {isInFavorites ? (
            <FaHeart className="text-red-500 text-lg" />
          ) : (
            <FaRegHeart className="text-[#6C6D73] text-lg" />
          )}
        </button>

        <div className="absolute bottom-2 left-2">
          <span className="bg-[#F2A945] text-white px-3 py-1 rounded-md shadow-md text-sm font-medium">
            Tour
          </span>
        </div>
      </div>

      <div className="p-3 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center">
            <FaStar className="text-yellow-400 text-sm" />
            <span className="text-sm font-medium ml-1 text-gray-500">
              {rating}
            </span>
            <span className="text-sm text-gray-400 ml-1">({reviewCount})</span>
          </div>
          <div className="flex items-center text-gray-400 text-sm">
            <FaMapMarkerAlt className="mr-1 text-[#F2A945]" />
            <span className="truncate">{location}</span>
          </div>
        </div>

        <h3 className="text-gray-800 text-base font-bold line-clamp-2">
          {title}
        </h3>

        <div className="flex flex-col gap-1 mt-auto pt-3">
          <div className="flex items-center justify-end">
            <div className="flex items-center gap-1">
              {discountedPrice && (
                <>
                  <span className="text-red-500 line-through text-sm">
                    THB{originalPrice.toLocaleString()}
                  </span>
                  <BsArrowDownRight className="text-red-500 text-sm" />
                </>
              )}
              <span className="text-md font-semibold text-gray-900">
                THB{(discountedPrice || originalPrice).toLocaleString()}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="relative">
              <span className="text-yellow-400 text-sm border-b-2 border-yellow-400">
                Details {"-->"}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button className="bg-[#F2A945] text-white px-2 py-1.5 rounded text-sm hover:bg-orange-600 transition-colors">
                Book now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
