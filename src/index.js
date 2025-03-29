import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider } from 'react-router-dom';
import store from './store';
import router from './router';

const reactRoot = document.querySelector('#root');

const root = ReactDOM.createRoot(reactRoot);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />

    <ToastContainer />
  </Provider>,
);
