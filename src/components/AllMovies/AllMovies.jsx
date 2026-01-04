import React, { useContext, useState, useEffect } from "react";
import { Link, useLoaderData } from "react-router";
import Swal from "sweetalert2";


import useAxios from "../hooks/useAxios";
import { AuthContext } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

const AllMovies = () => {
  const loaderMovies = useLoaderData();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AuthContext);
  const { isDark } = useTheme();
  const axiosInstance = useAxios();

  // ✅ PAGINATION STATE
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // ✅ SET MOVIES FROM LOADER
  useEffect(() => {
    if (loaderMovies) {
      setMovies(loaderMovies);
      setLoading(false);
    }
  }, [loaderMovies]);

  // ✅ RESET PAGE IF MOVIE COUNT CHANGES
  useEffect(() => {
    setCurrentPage(1);
  }, [movies.length]);

  // ✅ PAGINATION CALCULATION
  const totalPages = Math.ceil(movies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMovies = movies.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // ✅ ADD TO WATCHLIST
  const handleAddToWatchlist = async (movie) => {
    if (!user?.email) {
      Swal.fire({
        icon: "warning",
        title: "Oops!",
        text: "Please login to add to watchlist",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    try {
      await axiosInstance.post("/watchlist", {
        userEmail: user.email,
        movieId: movie._id,
        title: movie.title,
        posterUrl: movie.posterUrl,
        genre: movie.genre,
        releaseYear: movie.releaseYear,
        rating: movie.rating,
      });

      Swal.fire({
        icon: "success",
        title: "Added!",
        text: "Movie added to your watchlist successfully",
        confirmButtonColor: "#3085d6",
      });
    } catch (error) {
      if (error.response?.status === 409) {
        Swal.fire({
          icon: "info",
          title: "Already Added",
          text: "This movie is already in your watchlist",
          confirmButtonColor: "#3085d6",
        });
        return;
      }

      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while adding to watchlist",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  // ✅ LOADING STATE
  if (loading) {
    return (
      <div className="text-center text-white mt-20">
        <h2 className="text-xl font-semibold">
          Loading movies...
          <span className="loading loading-spinner text-error ml-2"></span>
        </h2>
      </div>
    );
  }

  // ✅ EMPTY STATE
  if (!movies.length) {
    return (
      <div className="text-center text-white mt-20">
        <h2 className="text-3xl font-semibold">No movies found</h2>
      </div>
    );
  }

  return (
    <div
      className={`max-w-7xl mx-auto p-4 md:p-8 transition-colors ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">All Movies</h2>

      {/* 🎬 MOVIE GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {currentMovies.map((movie) => (
          <div
            key={movie._id}
            className="bg-base-100 shadow-sm rounded-xl overflow-hidden"
          >
            <figure className="h-56 w-full overflow-hidden p-2">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="rounded-xl h-full w-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/300x450/1f2937/d1d5db?text=No+Poster";
                }}
              />
            </figure>

            <div className="p-3">
              <h2 className="text-md font-semibold text-center">
                {movie.title}
              </h2>

              <div className="flex justify-between text-xs font-semibold mt-1">
                <div>
                  <p>Genre: {movie.genre}</p>
                  <p>Year: {movie.releaseYear}</p>
                </div>
                <p className="text-amber-600">
                  Rating: {movie.rating}
                </p>
              </div>

              <div className="mt-4">
                <Link
                  to={`/movieDetails/${movie._id}`}
                  className="btn-primary text-xs w-full mb-2"
                >
                  Details
                </Link>

                <button
                  onClick={() => handleAddToWatchlist(movie)}
                  className="btn-primary text-xs w-full"
                >
                  Add to WatchList
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ PAGINATION */}
      <div className="flex justify-center mt-6 gap-2">
        <button
          className="btn btn-sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          Prev
        </button>

        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page}
            className={`btn btn-sm border-none ${
              currentPage === page + 1 ? "btn-primary" : ""
            }`}
            onClick={() => setCurrentPage(page + 1)}
          >
            {page + 1}
          </button>
        ))}

        <button
          className="btn btn-sm"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllMovies;
