import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartCount } from "./0_cartType";

const initialState: CartCount = {
    cartCount: 0,
    cartSelected: []
}

export const cartSlice = createSlice({
    name: 'card/slice',
    initialState: initialState,
    reducers: {
        setCartCount: (state, action: PayloadAction<{ cartCount: number, cartSelected: number[]}>) => {
            state.cartCount = action.payload.cartCount;
            state.cartSelected = action.payload.cartSelected;
        },
        clearCartCount: (state) => {
            state.cartCount = initialState.cartCount;
            state.cartSelected = initialState.cartSelected;
        }
    }
});

export const { setCartCount, clearCartCount } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;