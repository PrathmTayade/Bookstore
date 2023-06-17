import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  userInfo: {}, // for user object
  userToken: null, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
};
export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {},
});

// console.log(cartSlice);
// export const cartSelector = (state) => state.cart;

export const { addToCart, removeFromCart, increase, decrease, calculateTotal } =
  authSlice.actions;
export default authSlice.reducer;
