import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Animals, Extinct, Home, Regions, User, Startup, Continents } from './pages/index';
import Layout from './components/Layout/Layout';

// LayoutWrapper component to include Layout at the routes level
const LayoutWrapper = () => (
  <Layout>
    <Outlet /> {/* Renders the current route's element */}
  </Layout>
);

// Router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <Startup />,
  },
  {
    path: '/',
    element: <LayoutWrapper />, // Wrap children routes with Layout
    children: [
      { path: 'home', element: <Home /> },
      { path: 'extinct', element: <Extinct /> },
      { path: 'continents', element: <Continents /> },
      { path: 'regions', element: <Regions /> },
      { path: 'regions/:continentId', element: <Regions /> },
      { path: 'animals', element: <Animals /> },
      { path: 'user', element: <User /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
