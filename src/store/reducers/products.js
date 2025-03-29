import { createReducer } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  changeQuantity, deleteCartRequest, getCartsRequest, getCategoriesRequest, getProductsRequest,
} from '../actions/products';

const initialState = {
  products: [],
  categories: [],
  cart: [],
  cartLoading: true,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(getProductsRequest.fulfilled, (state, { payload }) => {
      state.products = payload;
    })

    .addCase(getCategoriesRequest.fulfilled, (state, { payload }) => {
      state.categories = payload;
    })

    .addCase(getCartsRequest.pending, (state) => {
      state.cartLoading = true;
    })

    .addCase(getCartsRequest.fulfilled, (state, { payload }) => {
      state.cart = payload;
      state.cartLoading = false;
    })

    .addCase(deleteCartRequest.fulfilled, (state, { payload }) => {
      state.cart = state.cart.filter((c) => c.id !== payload);
      toast.success('Successfully deleted');
    })

    .addCase(changeQuantity, (state, { payload }) => {
      const { cartId, productId, newQuantity } = payload;
      if (newQuantity < 1) return;

      const cart = state.cart.find((c) => c.id === cartId);

      if (cart) {
        const product = cart.products.find((p) => +p.productId === +productId);

        if (product) {
          product.quantity = newQuantity;
        }
      }
    });
});
