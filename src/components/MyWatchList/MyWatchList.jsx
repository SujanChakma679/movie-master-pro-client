

import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const MyWatchlist = () => {
  const { user } = useContext(AuthContext);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingIds, setRemovingIds] = useState(new Set());

  const { isDark } = useTheme();

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
        if (!res.ok) throw new Error('Failed to fetch watchlist');
        const data = await res.json();
        setWatchlist(data);
      } catch (error) {
        console.error('Error fetching watchlist:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, [user]);

  const handleRemove = async (id) => {
    if (!user?.email) return;

    // SweetAlert confirmation
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to remove this movie from your watchlist?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) return;

    const previous = watchlist;
    const newList = previous.filter((item) => item._id !== id);
    setWatchlist(newList);
    setRemovingIds((prev) => new Set(prev).add(id));

    try {
      const res = await fetch(
        `http://localhost:3000/watchlist/${encodeURIComponent(
          id
        )}?email=${encodeURIComponent(user.email)}`,
        { method: 'DELETE' }
      );

      const resultData = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(resultData?.error || `Delete failed with status ${res.status}`);
      }

      // SweetAlert success message
      Swal.fire({
        icon: 'success',
        title: 'Removed!',
        text: 'Movie removed from your watchlist.',
        confirmButtonColor: '#3085d6',
      });
    } catch (err) {
      console.error('Failed to remove from watchlist:', err);
      setWatchlist(previous);

      // SweetAlert error message
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Could not remove the movie. Please try again.',
        confirmButtonColor: '#3085d6',
      });
    } finally {
      setRemovingIds((prev) => {
        const s = new Set(prev);
        s.delete(id);
        return s;
      });
    }
  };

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
    <div className={`max-w-7xl mx-auto p-4 md:p-8 transition-colors ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <h2 className="text-4xl font-bold mb-6 text-center">My Watchlist</h2>

      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 `}>
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
                <button
                  className="btn-primary !px-12"
                  onClick={() => handleRemove(item._id)}
                  disabled={removingIds.has(item._id)}
                >
                  {removingIds.has(item._id) ? 'Removing...' : 'Remove'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

{/* <button
  className={`
    inline-flex items-center justify-center
    px-6 py-2.5
    rounded-full
    text-sm font-semibold
    text-white
    bg-gradient-to-r from-emerald-500 to-purple-600
    shadow-lg shadow-emerald-500/30
    hover:shadow-purple-500/40
    hover:scale-[1.03]
    active:scale-[0.98]
    transition-all duration-200
    border border-white/10
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400
    disabled:opacity-60 disabled:cursor-not-allowed
  `}
>
  Click Me
</button> */}


    </div>
  );
};

export default MyWatchlist;
