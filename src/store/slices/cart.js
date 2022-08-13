import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cartService } from "../../services/api";
import { cookie } from "../../services";

const initialState = {
  products: [],
  cartPrice: 0,
  status: "idle", // "idle" | "loading" | "succeeded" | "error",
  error: null,
};

const initialCart = {
  products: [],
  cartPrice: 0,
};

export const fetchCartData = createAsyncThunk(
  "cart/fetchCartData",
  async () => {
    const userToken = cookie.getCookie("token");
    if (!userToken)
      return await new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            const cart =
              JSON.parse(localStorage.getItem("cart")) || initialCart;
            resolve(cart);
          } catch (e) {
            reject(e);
          }
        }, 500);
      });
    return await cartService.getCartData(userToken);
  }
);

export const clearCartData = createAsyncThunk(
  "cart/clearCartItems",
  async () => {
    const userToken = cookie.getCookie("token");
    if (!userToken) {
      return await new Promise((resolve) => {
        setTimeout(() => {
          localStorage.setItem("cart", JSON.stringify(initialCart));
          resolve(initialCart);
        }, 500);
      });
    }
    return await cartService.updateCartData(userToken, {
      products: [],
      cartPrice: 0,
    });
  }
);

export const saveCartItem = createAsyncThunk(
  "cart/saveCartItem",
  async (payload) => {
    const userToken = cookie.getCookie("token");
    if (!userToken) {
      return await new Promise((resolve) => {
        setTimeout(() => {
          const { quantity, ...product } = payload;
          const cart = JSON.parse(localStorage.getItem("cart")) || initialCart;
          const cartProducts = cart.products;
          const existingCartIndex = cartProducts.findIndex(
            (cartProduct) => cartProduct.product._id === payload._id
          );
          const existingCartProduct = cartProducts[existingCartIndex];
          const newCartProduct = {
            product: { ...product },
            quantity,
          };
          if (existingCartIndex === -1) {
            // Create new Cart Product
            cart.products.push(newCartProduct);
            cart.cartPrice += product.price * quantity;
          } else {
            // Replace Existing Cart Product
            cart.products[existingCartIndex] = newCartProduct;
            cart.cartPrice +=
              (quantity - existingCartProduct.quantity) *
              existingCartProduct.product.price;
          }
          localStorage.setItem("cart", JSON.stringify(cart));
          resolve(cart);
        }, 500);
      });
    }
    return cartService.postCartItem(userToken, payload._id, payload.quantity);
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async (payload) => {
    const userToken = cookie.getCookie("token");
    if (!userToken)
      return await new Promise((resolve, reject) => {
        setTimeout(() => {
          const { _id, quantity } = payload;
          const cart = JSON.parse(localStorage.getItem("cart")) || initialCart;
          const cartProducts = cart.products;
          const existingCartIndex = cartProducts.findIndex(
            (cartProduct) => cartProduct.product._id === _id
          );
          const existingCartProduct = cartProducts[existingCartIndex];
          if (existingCartIndex === -1) return reject("Product doesn't exist.");
          else {
            // Replace Existing Cart Product
            const newCartProduct = {
              product: { ...existingCartProduct.product },
              quantity,
            };
            cart.products[existingCartIndex] = newCartProduct;
            // console.log(existingCartProduct.quantity, quantity);
            cart.cartPrice +=
              (quantity - existingCartProduct.quantity) *
              existingCartProduct.product.price;
          }
          localStorage.setItem("cart", JSON.stringify(cart));
          resolve(cart);
        }, 500);
      });
    return cartService.updateCartItem(userToken, payload._id, payload.quantity);
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (_id) => {
    const userToken = cookie.getCookie("token");
    if (!userToken)
      return await new Promise((resolve, reject) => {
        setTimeout(() => {
          const cart = JSON.parse(localStorage.getItem("cart")) || initialCart;
          const cartProducts = cart.products;
          const cartPrice = cart.cartPrice;
          const existingCartIndex = cartProducts.findIndex(
            (cartProduct) => cartProduct.product._id === _id
          );
          const existingCartProduct = cartProducts[existingCartIndex];

          if (existingCartIndex === -1) reject("Product doesn't exist");
          else {
            // Delete cart product
            cart.products.splice(existingCartIndex, 1);
            cart.cartPrice -=
              existingCartProduct.quantity * existingCartProduct.product.price;
            localStorage.setItem("cart", JSON.stringify(cart));
            resolve(cart);
          }
        }, 500);
      });
    return cartService.deleteCartItem(userToken, _id);
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCartItem: {
      reducer(state, { payload }) {
        const { id, newQuantity } = payload;
        const existingCartItemIndex = state.products.findIndex(
          (cartProduct) => cartProduct._id === id
        );
        const existingCartItem = state.products[existingCartItemIndex];
        state.cartPrice +=
          (newQuantity - existingCartItem.quantity) * existingCartItem.price;
        state.products[existingCartItemIndex].quantity = newQuantity;
      },
      prepare(id, quantity) {
        return {
          payload: {
            id,
            newQuantity: quantity,
          },
        };
      },
    },
  },
  extraReducers: {
    // Fetch Cart Data
    [fetchCartData.pending]: (state) => {
      state.status = "loading";
    },
    [fetchCartData.fulfilled]: (state, { payload: cart }) => {
      state.status = "succeeded";
      state.error = null;
      state.products = cart.products.map((cartProduct) => ({
        ...cartProduct.product,
        quantity: cartProduct.quantity,
      }));
      state.cartPrice = cart.cartPrice;
    },
    [fetchCartData.rejected]: (state, { error }) => {
      state.status = "error";
      // console.log(error.message);
      state.error = error.message;
    },
    // Save Cart Item
    [saveCartItem.pending]: (state) => {
      state.status = "loading";
    },
    [saveCartItem.fulfilled]: (state, { payload: cart }) => {
      state.status = "succeeded";
      state.error = null;
      // console.log(state.products);
      state.products = cart.products.map((cartProduct) => ({
        ...cartProduct.product,
        quantity: cartProduct.quantity,
      }));
      state.cartPrice = cart.cartPrice;
    },
    [saveCartItem.rejected]: (state, { error }) => {
      state.status = "error";
      // console.log(error.message);
      state.error = error.message;
    },
    // Update Cart Item
    [updateCartItem.pending]: (state) => {
      state.status = "loading";
    },
    [updateCartItem.fulfilled]: (state, { payload: cart }) => {
      state.status = "succeeded";
      state.error = null;
      state.products = cart.products.map((cartProduct) => ({
        ...cartProduct.product,
        quantity: cartProduct.quantity,
      }));
      state.cartPrice = cart.cartPrice;
    },
    [updateCartItem.rejected]: (state, { error }) => {
      state.status = "error";
      // console.log(error.message);
      state.error = error.message;
    },
    // Clear Cart Data
    [clearCartData.pending]: (state) => {
      state.status = "loading";
    },
    [clearCartData.fulfilled]: (state, { payload: cart }) => {
      state.status = "succeeded";
      state.error = null;
      state.products = cart.products.map((cartProduct) => ({
        ...cartProduct.product,
        quantity: cartProduct.quantity,
      }));
      state.cartPrice = cart.cartPrice;
    },
    [clearCartData.rejected]: (state, { error }) => {
      state.status = "error";
      // console.log(error.message);
      state.error = error.message;
    },
    // Delete Cart Item
    [deleteCartItem.pending]: (state) => {
      state.status = "loading";
    },
    [deleteCartItem.fulfilled]: (state, { payload: cart }) => {
      state.status = "succeeded";
      state.error = null;
      state.products = cart.products.map((cartProduct) => ({
        ...cartProduct.product,
        quantity: cartProduct.quantity,
      }));
      state.cartPrice = cart.cartPrice;
    },
    [deleteCartItem.rejected]: (state, { error }) => {
      state.status = "error";
      // console.log(error.message);
      state.error = error.message;
    },
  },
});

export default cartSlice;
// export const { updateCartItem } = cartSlice.actions;
export const selectAllCartItems = (state) => state.cart.products;
export const selectTotalPrice = (state) => state.cart.cartPrice;
export const selectStatus = (state) => state.cart.status;
export const selectError = (state) => state.cart.error;
export const selectCartID = (state) => state.cart.id;

export const cartReducer = cartSlice.reducer;
