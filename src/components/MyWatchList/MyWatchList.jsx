import React, { useEffect, useState, useContext } from 'react';

import { Link } from 'react-router';
import { AuthContext } from '../../context/AuthContext';

const MyWatchlist = () => {
  const { user } = useContext(AuthContext);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    const fetchWatchlist = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/watchlist?email=${encodeURIComponent(user.email)}`
        );
        const data = await res.json();
        setWatchlist(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, [user]);

  if (!user?.email) {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-8 text-center text-white">
        <p>Please login to view your watchlist.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-8 text-center text-white">
        <p>Loading your watchlist...</p>
      </div>
    );
  }

  if (watchlist.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-8 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">My Watchlist</h2>
        <p>Your watchlist is empty. Go add some movies!</p>
        <Link to="/movies" className="btn btn-primary mt-4">
          Browse Movies
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <h2 className="text-4xl font-bold mb-6 text-white text-center">My Watchlist</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {watchlist.map((item) => (
          <div key={item._id} className="bg-base-100 shadow-sm rounded-xl overflow-hidden">
            <figure className="px-4 pt-4 h-96 w-full overflow-hidden">
              <img
                src={item.posterUrl}
                alt={item.title}
                className="rounded-xl h-full w-full object-cover"
              />
            </figure>

            <div className="p-4">
              <h2 className="text-2xl font-semibold text-center">{item.title}</h2>
              <div className="flex items-center justify-around text-lg font-semibold mt-2">
                <div>
                  <p>Genre: {item.genre}</p>
                  <p>Release Year: {item.releaseYear}</p>
                </div>
                <div>
                  <p className="text-amber-800">Rating: {item.rating}</p>
                </div>
              </div>
              <div className="mt-4 flex justify-center">
                <Link
                  to={`/movieDetails/${item.movieId}`}
                  className="btn btn-primary !px-12 "
                >
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

export default MyWatchlist;
