import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  loading: Record<string, boolean>;
  errors: Record<string, string | null>;
}

const initialState: UIState = {
  loading: {},
  errors: {},
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<{ key: string; value: boolean }>) => {
      state.loading[action.payload.key] = action.payload.value;
    },
    setError: (state, action: PayloadAction<{ key: string; value: string | null }>) => {
      state.errors[action.payload.key] = action.payload.value;
    },
    clearError: (state, action: PayloadAction<string>) => {
      delete state.errors[action.payload];
    },
    clearAllErrors: (state) => {
      state.errors = {};
    },
  },
});

export const { setLoading, setError, clearError, clearAllErrors } = uiSlice.actions;
export default uiSlice.reducer;


