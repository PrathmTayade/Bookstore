import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [
      {
        id: 1,
        name: "Throwback Hip Bag",
        href: "#",
        color: "Salmon",
        price: "$90.00",
        quantity: 1,
        imageSrc:
          "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
        imageAlt:
          "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
      },
      {
        id: 2,
        name: "Medium Stuff Satchel",
        href: "#",
        color: "Blue",
        price: "$32.00",
        quantity: 1,
        imageSrc:
          "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
        imageAlt:
          "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
      },
    ],
  },

  reducers: {
    addToCart: (state, action) => {
      const cartItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (cartItem) {
        cartItem.quantity += 1;
        return;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((items) => items.id !== action.payload);
    },
    increase: (state, action) => {
      const cartItem = state.items.find((item) => item.id === action.payload);
      cartItem.quantity += 1;
    },
    decrease: (state, action) => {
      const cartItem = state.items.find((item) => item.id === action.payload);

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
