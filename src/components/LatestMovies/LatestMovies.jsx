import React from "react";
import { Link } from "react-router";
import { useTheme } from "../../context/ThemeContext";

const LatestMovies = ({ movies }) => {
  const { isDark } = useTheme();

  // const movieList = Array.isArray(movies) ? movies : []; 

  if (movies.length === 0) {
    return <p className="text-center py-10">No movies found.</p>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-11/12 mx-auto">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className={`bg-base-100 shadow-sm p-4 transition-colors ${
              isDark ? "bg-gray-900" : "bg-gray-50"
            }`}
          >
            
            <figure className="px-10 pt-10 h-96 w-full overflow-hidden">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="rounded-xl h-full w-full object-cover"
              />
            </figure>

            
            <div>
              <h2 className="text-3xl font-semibold text-center">{movie.title}</h2>
              <div className="flex items-center justify-around text-lg font-semibold p-2">
                <div>
                  <p>Genre: {movie.genre}</p>
                  <p>Release Year: {movie.releaseYear}</p>
                </div>
                <div>
                  <p className="text-amber-800">Rating: {movie.rating}</p>
                </div>
              </div>

              
              <div className="card-actions">
                <Link to={`/movieDetails/${movie._id}`} className="btn-primary !w-full">
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestMovies;
