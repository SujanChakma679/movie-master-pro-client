

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./layouts/RootLayout.jsx";
import Home from "./components/Home/Home.jsx";
import AllMovies from "./components/AllMovies/AllMovies.jsx";
import Register from "./components/Register/Register.jsx";
import Login from "./components/Login/Login.jsx";
import AddMovie from "./components/AddMovies/AddMovie.jsx";
import MyWatchList from "./components/MyWatchList/MyWatchList.jsx";
import MyCollections from "./components/MyCollections/MyCollections.jsx";
import MovieDetails from "./components/MovieDetails/MovieDetails.jsx";

import AuthProvider from "./context/AuthProvider.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { AppErrorBoundary } from "./components/Page/ErrorPage/AppErrorBoundary.jsx";
import NotFound from "./components/Page/ErrorPage/NotFound.jsx";
import ErrorPage from "./components/Page/ErrorPage/ErrorPage.jsx";
import useAxios from "./components/hooks/useAxios.jsx";



const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "movies",
         loader: async () => {
          const axios = useAxios();
          try {
            const res = await axios.get("/movies");
            return res.data;
          } catch (err) {
            throw new Error("Failed to fetch movies");
          }
        },
        element: <AllMovies />,
      },
      { 
        path: "login", 
        element: <Login /> 
      },
      { path: "register", 
        element: <Register /> 
      },
      {
        path: "movieDetails/:id",
        loader: async ({ params }) => {
          const axios = useAxios();
          try {
            const res = await axios.get(`/movies/${params.id}`);
            return res.data;
          } catch (err) {
            throw new Error("Failed to fetch movie details");
          }
        },
        element: <MovieDetails />,
      },
      { 
        path: "movies/my-watch-list", 
        element: (
          <ProtectedRoute>
               <MyWatchList /> 
          </ProtectedRoute>
        ),
      },
      { 
        path: "movies/add", 
        element: (
      <ProtectedRoute>
        <AddMovie />
      </ProtectedRoute>
    ), 
      },
      { 
        path: "movies/my-collections", 
        element: (
      <ProtectedRoute>
        <MyCollections />
      </ProtectedRoute>
    ), 
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
          <AuthProvider>
               <AppErrorBoundary>
                    <RouterProvider router={router} />
               </AppErrorBoundary>
          </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
