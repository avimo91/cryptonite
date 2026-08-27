import { createSlice, PayloadAction } from "@reduxjs/toolkit";

function setSearchText(_currentState: string, action: PayloadAction<string>): string {
    return action.payload;
}

export const searchSlice = createSlice({
    name: "search-slice",
    initialState: "" as string,
    reducers: { setSearchText }
});