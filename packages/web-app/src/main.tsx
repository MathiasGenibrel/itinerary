import React from 'react';
import ReactDOM from 'react-dom/client';
import './globals.css';
import { NextUIProvider } from '@nextui-org/react';
import { RouterProvider } from 'react-router-dom';
import { router } from './pages/router.tsx';
import { Header } from './components/header/Header.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <Header />
      <RouterProvider router={router} />
    </NextUIProvider>
  </React.StrictMode>
);
