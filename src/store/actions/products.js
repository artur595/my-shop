import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';

export const getProductsRequest = createAsyncThunk('get/products', async (payload) => {
  const { data } = payload
    ? await Api.getProductsByCategory(payload)

    : await Api.getProducts();

  return data;
});

export const getCategoriesRequest = createAsyncThunk('get/categories', async () => {
  const { data } = await Api.getCategories();
  return data;
});

export const getCartsRequest = createAsyncThunk('get/carts', async () => {
  const [carts, products] = await Promise.all([Api.getCarts(), Api.getProducts()]);

  return carts.data.map((c) => ({
    ...c,
    products: c.products.map((product) => ({ ...product, ...products.data.find((p) => p.id === product.productId) })),
  }));
});

export const deleteCartRequest = createAsyncThunk('delete/carts', async (payload, thunkAPI) => {
  try {
    const { data } = await Api.deleteCart(payload);

    return data.id;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

export const changeQuantity = createAction('change/quantity');
