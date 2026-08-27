import { CoinModel } from "../models/coin-model";
import { SelectedCoinsState } from "./selected-coins-slice";

export type AppState = {
    coins: CoinModel[];
    selectedCoins: SelectedCoinsState;
    searchText: string;
};