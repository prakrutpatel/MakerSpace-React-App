import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
//
import DashboardApp from './pages/DashboardApp';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <DashboardApp /> },
      ],
    },
    {
      path: '/',
      children: [
        { path: '/', element: <Navigate to="/" /> },
      ],
    },
    { path: '*', element: <Navigate to="/" replace /> },
  ]);
}
