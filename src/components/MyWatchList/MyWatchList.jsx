import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import useAxios from '../hooks/useAxios';

const MyWatchlist = () => {
  const { user } = useContext(AuthContext);
  const axios = useAxios();

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
        const res = await axios.get(`/watchlist?email=${encodeURIComponent(user.email)}`);
        setWatchlist(res.data);
      } catch (error) {
        console.error('Error fetching watchlist:', error);
        Swal.fire('Error', 'Failed to load your watchlist', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, [user?.email, axios]);

  // Remove movie from watchlist
  const handleRemove = async (id) => {
    if (!user?.email) return;

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
    setWatchlist(previous.filter((item) => item._id !== id));
    setRemovingIds((prev) => new Set(prev).add(id));

    try {
      await axios.delete(`/watchlist/${id}?email=${encodeURIComponent(user.email)}`);

      Swal.fire({
        icon: 'success',
        title: 'Removed!',
        text: 'Movie removed from your watchlist.',
        confirmButtonColor: '#3085d6',
      });
    } catch (err) {
      console.error('Failed to remove from watchlist:', err);
      setWatchlist(previous);

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
      <div className="max-w-4xl mx-auto p-4 md:p-8 text-center">
        <p>Please login to view your watchlist.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-8 text-center">
        <p>
          Loading your watchlist...
          <span className="loading loading-spinner text-error"></span>
        </p>
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
    <div
      className={`max-w-7xl mx-auto p-4 md:p-8 transition-colors ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      <h2 className="text-4xl font-bold mb-6 text-center">My Watchlist</h2>

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
    </div>
  );
};

export default MyWatchlist;
