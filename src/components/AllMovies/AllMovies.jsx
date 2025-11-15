import React from 'react';
import { Link, useLoaderData } from 'react-router';

const AllMovies = () => {
  const movies = useLoaderData();
  console.log(movies);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <h2 className="text-4xl font-bold mb-6 text-white text-center">All Movies</h2>
      
      {/* Grid container with 3 columns */}
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
                  e.target.src = 'https://placehold.co/300x450/1f2937/d1d5db?text=No+Poster';
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
              <div className="mt-4">
                <Link to={`/movieDetails/${movie._id}`} className="btn btn-primary w-full">Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllMovies;
