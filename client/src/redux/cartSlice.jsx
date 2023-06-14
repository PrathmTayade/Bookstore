import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },

  reducers: {
    addToCart: (state, action) => {
      const cartItem = state.items.find(
        (item) => item._id === action.payload._id
      );

      if (cartItem) {
        cartItem.quantity++;
        return;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((items) => items._id !== action.payload);
    },
    increase: (state, action) => {
      const cartItem = state.items.find((item) => item._id === action.payload);
      cartItem.quantity += 1;
    },
    decrease: (state, action) => {
      const cartItem = state.items.find((item) => item._id === action.payload);

      if (cartItem.quantity <= 1) {
        return;
      }
      cartItem.quantity -= 1;
    },
    calculateTotal: (state) => {
      let amount = 0;
      let total = 0;
      state.items.forEach((item) => {
        amount = item.quantity * item.price;
        total += amount;
      });
      state.total = total;
    },
  },
});

// console.log(cartSlice);
export const cartSelector = (state) => state.cart;
export const { addToCart, removeFromCart, increase, decrease, calculateTotal } =
  cartSlice.actions;
export default cartSlice.reducer;
