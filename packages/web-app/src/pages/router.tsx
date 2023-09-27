import { createBrowserRouter } from 'react-router-dom';
import { App } from './App';
import Register from './register/page.tsx';
import Login from './login/page.tsx';
import Dashboard from './dashboard/page.tsx';
import Profile from './profile/page.tsx';
import { Layout } from '../components/layout/Layout.tsx';

export enum ApplicationPath {
  HOME = '/',
  REGISTER = '/register',
  LOGIN = '/login',
  DASHBOARD = '/dashboard',
  PROFILE = '/profile',
}

export const router = createBrowserRouter([
  {
    path: ApplicationPath.HOME,
    element: <Layout />,
    children: [
      {
        path: ApplicationPath.HOME,
        element: <App />,
      },
      {
        path: ApplicationPath.LOGIN,
        element: <Login />,
      },
      {
        path: ApplicationPath.REGISTER,
        element: <Register />,
      },
      {
        path: ApplicationPath.DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: ApplicationPath.PROFILE,
        element: <Profile />,
      },
    ],
  },
]);