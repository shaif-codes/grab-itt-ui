import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Promotion } from '../types/promotion';

interface PromotionsState {
  promotions: Promotion[];
  loading: boolean;
  error: string | null;
}

const initialState: PromotionsState = {
  promotions: [],
  loading: false,
  error: null,
};

const promotionsSlice = createSlice({
  name: 'promotions',
  initialState,
  reducers: {
    setPromotions: (state, action: PayloadAction<Promotion[]>) => {
      state.promotions = action.payload;
      state.loading = false;
      state.error = null;
    },
    addPromotion: (state, action: PayloadAction<Promotion>) => {
      state.promotions.push(action.payload);
    },
    removePromotion: (state, action: PayloadAction<string>) => {
      state.promotions = state.promotions.filter(p => p.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { 
  setPromotions, 
  addPromotion, 
  removePromotion,
  setLoading,
  setError,
} = promotionsSlice.actions;

export default promotionsSlice.reducer;


