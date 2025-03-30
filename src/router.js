import {
  createBrowserRouter, createRoutesFromElements, Navigate, Route,
} from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import App from './App';
import Catalog from './pages/Catalog';

const Cart = lazy(() => import('./pages/Cart'));

export default createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Navigate to="/catalog" replace />} />

      <Route path="catalog" element={<Catalog />} />

      <Route
        path="cart"
        element={(
          <Suspense fallback={(
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            >
              <CircularProgress size={60} />
            </div>
          )}
          >
            <Cart />
          </Suspense>
        )}
      />

    </Route>,
  ),
  { basename: '/my-shop' },
);
