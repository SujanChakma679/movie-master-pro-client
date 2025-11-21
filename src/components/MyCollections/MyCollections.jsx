import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthContext';

const MyCollections = () => {
  const { user } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    const fetchMyMovies = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/movies/my-collection?email=${user.email}`
        );
        if (!res.ok) throw new Error('Failed to fetch movies');
        const data = await res.json();
        setMovies(data);
      } catch (error) {
        console.error(error);
        toast.error('Failed to load your collection');
      }
    };

    fetchMyMovies();
  }, [user?.email]);

  if (!user?.email) {
    return (
      <p className="text-center text-white mt-8">
        Please login to see your movie collections.
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <h2 className="text-4xl font-bold mb-6 text-white text-center">
        My Movie Collections
      </h2>

      {movies.length === 0 ? (
        <p className="text-center text-lg text-white">No movies added yet</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <div
              key={movie._id}
              className="bg-base-100 shadow-sm rounded-xl overflow-hidden"
            >
              <figure className="px-4 pt-4 h-96 w-full overflow-hidden">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="rounded-xl h-full w-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      'https://placehold.co/300x450/1f2937/d1d5db?text=No+Poster';
                  }}
                />
              </figure>

              <div className="p-4">
                <h2 className="text-2xl font-semibold text-center">
                  {movie.title}
                </h2>
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
                    className="btn btn-primary !px-12"
                  >
                    Details
                  </Link>

                  <button
                    className="btn btn-outline btn-secondary"
                    onClick={async () => {
                      try {
                        const res = await fetch(
                          `http://localhost:3000/movies/${movie._id}`,
                          { method: 'DELETE' }
                        );
                        if (!res.ok) throw new Error('Failed to delete movie');
                        setMovies((prev) =>
                          prev.filter((m) => m._id !== movie._id)
                        );
                        toast.success('Movie removed from collection');
                      } catch (err) {
                        console.error(err);
                        toast.error('Failed to remove movie');
                      }
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCollections;
