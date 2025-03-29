import {
  createBrowserRouter, createRoutesFromElements, Navigate, Route,
} from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import App from './App';
import Catalog from './pages/Catalog';
import CircularProgress from "@mui/material/CircularProgress";

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
          )}>
            <Cart />
          </Suspense>
        )}
      />

      {/* <Route path="404" element={<NotFound />} /> */}

      {/* <Route path="*" element={<Navigate to="/404" replace />} /> */}
    </Route>,
  ),
);
