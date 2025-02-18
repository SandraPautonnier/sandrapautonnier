import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from '../src/pages/Home/index';
import Profile from '../src/pages/Profile'
import Portfolio from './pages/Portfolio';
import Services from './pages/Services';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/portfolio",
    element: <Portfolio />,
  },
  {
    path: "/services",
    element: <Services />,
  },
  {
    path: "*",
    element: <Home />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
