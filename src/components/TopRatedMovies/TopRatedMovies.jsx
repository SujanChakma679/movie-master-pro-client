import React from "react";
import { Link } from "react-router";

const TopRatedMovies = ({ movies }) => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-6 w-11/12 mx-auto">
        {movies.map((movie) => (
          <div className=" bg-base-100 shadow-sm p-4">
            <figure className="px-10 pt-10 h-96 w-full overflow-hidden">
                <img
                    src={movie.posterUrl}
                    alt={movie.title} 
                    className="rounded-xl h-full w-full object-cover" 
                />
            </figure>
            <div className="">
              <h2 className="text-3xl font-semibold text-center">
                {movie.title}
              </h2>
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
                <Link to={`/movieDetails/${movie._id}`} className="btn btn-primary !w-full">Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRatedMovies;
