import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

const api = axios.create({
  baseURL: REACT_APP_API_URL,
});

class Api {
  static getProducts(params) {
    return api.get('/products', { params });
  }

  static getProductsByCategory(currentCategory) {
    return api.get(`/products/category/${currentCategory}`);
  }

  static getCarts() {
    return api.get('/carts');
  }

  static getCategories() {
    return api.get('/products/categories');
  }

  static addToCart(data) {
    return api.post('/carts', data);
  }

  static deleteCart(id) {
    return api.delete(`/carts/${id}`);
  }
}

export default Api;
