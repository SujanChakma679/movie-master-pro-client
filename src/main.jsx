// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// import { createBrowserRouter } from "react-router";
// import { RouterProvider } from "react-router/dom";
// import RootLayout from './layouts/RootLayout.jsx';
// import Home from './components/Home/Home.jsx';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     Component: RootLayout,
//     children: [
//       {
//         index: true,
//         Component: Home
//       }
//     ]
//   },
// ]);

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//      <RouterProvider router={router} />,
//   </StrictMode>,
// )

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from "./layouts/RootLayout.jsx";
import Home from "./components/Home/Home.jsx";
import AllMovies from "./components/AllMovies/AllMovies.jsx";
import Register from "./components/Register/Register.jsx";
import MovieDetails from "./MovieDetails/MovieDetails.jsx";
import AuthProvider from "./context/AuthProvider.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/movies",
        loader: () => fetch("http://localhost:3000/movies"),
        element: <AllMovies></AllMovies>,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "movieDetails/:id",
        loader: async ({ params }) => {
          const res = await fetch(`http://localhost:3000/movies/${params.id}`);
          if (!res.ok) throw new Error("Failed to fetch movie");
          return res.json();
        },
        Component: MovieDetails,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
   <AuthProvider>
         <RouterProvider router={router} />
   </AuthProvider>
  </StrictMode>
);
