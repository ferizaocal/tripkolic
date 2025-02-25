import { create } from 'zustand';
import { Tour } from '@/constants/tours';

interface FavoriteStore {
  favorites: Tour[];
  addToFavorites: (tour: Tour) => void;
  removeFromFavorites: (tourId: string) => void;
  isFavorite: (tourId: string) => boolean;
}

export const useFavoriteStore = create<FavoriteStore>((set, get) => ({
  favorites: [],
  addToFavorites: (tour: Tour) => {
    set((state) => ({
      favorites: [...state.favorites, tour],
    }));
  },
  removeFromFavorites: (tourId: string) => {
    set((state) => ({
      favorites: state.favorites.filter((tour) => tour.id !== tourId),
    }));
  },
  isFavorite: (tourId: string) => {
    return get().favorites.some((tour) => tour.id === tourId);
  },
})); 