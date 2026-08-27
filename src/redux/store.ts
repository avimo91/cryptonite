import { configureStore } from "@reduxjs/toolkit";
import { AppState } from "./app-state";
import { coinSlice } from "./coin-slice";
import { selectedCoinsSlice } from "./selected-coins-slice";
import { searchSlice } from "./search-slice";

export const store = configureStore<AppState>({
    reducer: {
        coins: coinSlice.reducer,
        selectedCoins: selectedCoinsSlice.reducer,
        searchText: searchSlice.reducer
    }
});