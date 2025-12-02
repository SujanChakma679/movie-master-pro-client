import React, { useContext } from "react";
import { Link, useLoaderData } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import useAxios from "../hooks/useAxios";


const AllMovies = () => {
  const movies = useLoaderData();
  const { user } = useContext(AuthContext);
   const { isDark } = useTheme();

  if (!movies || movies.length === 0) {
    return (
      <div className="text-center text-white mt-20">
        <h2 className="text-3xl font-semibold">No movies found</h2>
      </div>
    );
  }


  const handleAddToWatchlist = async (movie) => {
  const axiosInstance = useAxios();

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


  return (
    <div className={`max-w-7xl mx-auto p-4 md:p-8 transition-colors ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <h2 className="text-4xl font-bold mb-6 text-center">All Movies</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <div key={movie._id} className="bg-base-100 shadow-sm rounded-xl overflow-hidden">
            <figure className="px-4 pt-4 h-96 w-full overflow-hidden">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="rounded-xl h-full w-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/300x450/1f2937/d1d5db?text=No+Poster";
                }}
              />
            </figure>

            <div className="p-4">
              <h2 className="text-2xl font-semibold text-center">{movie.title}</h2>
              <div className="flex items-center justify-around text-lg font-semibold mt-2">
                <div>
                  <p>Genre: {movie.genre}</p>
                  <p>Release Year: {movie.releaseYear}</p>
                </div>
                <div>
                  <p className="text-amber-800">Rating: {movie.rating}</p>
                </div>
              </div>

              <div className="mt-4 flex space-x-2 justify-between">
                <Link
                  to={`/movieDetails/${movie._id}`}
                  className=" btn-primary px-12"
                >
                  Details
                </Link>

                <button
                  onClick={() => handleAddToWatchlist(movie)}
                  className=" btn-primary"
                >
                  Add to WatchList
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllMovies;
