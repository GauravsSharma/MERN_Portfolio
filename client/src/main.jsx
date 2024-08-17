import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Projects from './pages/Projects.jsx'; // Import the Layout component
import Layout from './components/Layout.jsx';
import AddProjectDialogBox from './components/AddProjectDialogBox.jsx';
import ContactForm from './components/ContactForm.jsx';
import "./responsive.css"
import "../src/components/loaders/loader.css"
import Loader from './components/loaders/Loader.jsx';
import Education from './pages/Education.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/education",
        element: <Education/>,
      },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
