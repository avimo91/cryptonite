import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CoinModel } from "../models/coin-model";

export type SelectedCoinsState = {
  coins: CoinModel[];
  pendingCoin: CoinModel | null;
};

function loadFromStorage(): CoinModel[] {
  const json = localStorage.getItem("selectedCoins");

  if (!json) {
    return [];
  }

  return JSON.parse(json);
}

function saveToStorage(coins: CoinModel[]): void {
  localStorage.setItem("selectedCoins", JSON.stringify(coins));
}

const initialState: SelectedCoinsState = {
  coins: loadFromStorage(),
  pendingCoin: null,
};

// Add or remove a coin while enforcing the five-coin limit:
function toggleSelectedCoin(
  currentState: SelectedCoinsState,
  action: PayloadAction<CoinModel>,
): SelectedCoinsState {
  const coin = action.payload;
  const index = currentState.coins.findIndex((c) => c.id === coin.id);

  if (index >= 0) {
    const newCoins = [...currentState.coins];
    newCoins.splice(index, 1);

    saveToStorage(newCoins);

    return {
      coins: newCoins,
      pendingCoin: null,
    };
  }

  if (currentState.coins.length >= 5) {
    return {
      ...currentState,
      pendingCoin: coin,
    };
  }

  const newCoins = [...currentState.coins];
  newCoins.push(coin);

  saveToStorage(newCoins);

  return {
    coins: newCoins,
    pendingCoin: null,
  };
}

// Replace a selected coin with the pending coin:
function removeCoinAndAddPending(
  currentState: SelectedCoinsState,
  action: PayloadAction<string>,
): SelectedCoinsState {
  const idToRemove = action.payload;
  const newCoins = currentState.coins.filter((c) => c.id !== idToRemove);

  if (currentState.pendingCoin) {
    newCoins.push(currentState.pendingCoin);
  }

  saveToStorage(newCoins);

  return {
    coins: newCoins,
    pendingCoin: null,
  };
}

export const selectedCoinsSlice = createSlice({
  name: "selected-coins-slice",
  initialState,
  reducers: {
    toggleSelectedCoin,
    removeCoinAndAddPending,
  },
});
