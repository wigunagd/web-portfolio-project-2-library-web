import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartCount } from "./0_cartType";

const initialState: CartCount = {
    cartCount: 0
}

export const cartSlice = createSlice({
    name: 'card/slice',
    initialState: initialState,
    reducers: {
        setCartCount: (state, action: PayloadAction<{ cartCount: number}>) => {
            state.cartCount = action.payload.cartCount;
        },
        clearCartCount: (state) => {
            state.cartCount = initialState.cartCount;
        }
    }
});

export const { setCartCount, clearCartCount } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;