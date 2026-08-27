import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CoinModel } from "../models/coin-model";

function initCoins(_currentState: CoinModel[], action: PayloadAction<CoinModel[]>): CoinModel[] {
    const coinsToInit = action.payload;
    return coinsToInit;
}

export const coinSlice = createSlice({
    name: "coin-slice",
    initialState: [] as CoinModel[],
    reducers: { initCoins }
});