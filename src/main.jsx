import { StrictMode } from 'react'
import ReactDOM, { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from '../src/pages/Home/index';
import Profile from '../src/pages/Profile'
import Portfolio from './pages/Portfolio';
import Services from './pages/Services';
import Legalnotice from './pages/Legalnotice';
import ScrollToTop from './features/ScrollToTop';

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
    path: "/legalnotice",
    element: <Legalnotice />,
  },
  {
    path: "*",
    element: <Home />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

const preloader = document.getElementById('preloader');
if (preloader) {
  preloader.classList.add('fade-out');

  setTimeout(() => {
    preloader.remove();
  }, 400); 
}
