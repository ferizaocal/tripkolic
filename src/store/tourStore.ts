import { create } from 'zustand';
import { tours, Tour } from '@/constants/tours';
import { StateCreator } from 'zustand';

interface TourStore {
  filteredTours: Tour[];
  setFilteredTours: (tours: Tour[]) => void;
  resetTours: () => void;
}

const createTourStore: StateCreator<TourStore> = (set) => ({
  filteredTours: tours,
  setFilteredTours: (filteredTours: Tour[]) => set({ filteredTours }),
  resetTours: () => set({ filteredTours: tours })
});

export const useTourStore = create<TourStore>(createTourStore); 