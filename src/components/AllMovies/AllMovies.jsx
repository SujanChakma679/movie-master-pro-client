// import React from 'react';
// import { Link, useLoaderData } from 'react-router';

// const AllMovies = () => {
//   const movies = useLoaderData();
//   console.log(movies);

//   return (
//     <div className="max-w-7xl mx-auto p-4 md:p-8">
//       <h2 className="text-4xl font-bold mb-6 text-white text-center">All Movies</h2>
      
//       {/* Grid container with 3 columns */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {movies.map((movie) => (
//           <div key={movie._id} className="bg-base-100 shadow-sm rounded-xl overflow-hidden">
//             <figure className="px-4 pt-4 h-96 w-full overflow-hidden">
//               <img
//                 src={movie.posterUrl}
//                 alt={movie.title}
//                 className="rounded-xl h-full w-full object-cover"
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src = 'https://placehold.co/300x450/1f2937/d1d5db?text=No+Poster';
//                 }}
//               />
//             </figure>

//             <div className="p-4">
//               <h2 className="text-2xl font-semibold text-center">{movie.title}</h2>
//               <div className="flex items-center justify-around text-lg font-semibold mt-2">
//                 <div>
//                   <p>Genre: {movie.genre}</p>
//                   <p>Release Year: {movie.releaseYear}</p>
//                 </div>
//                 <div>
//                   <p className="text-amber-800">Rating: {movie.rating}</p>
//                 </div>
//               </div>
//               <div className="mt-4 flex space-x-2 justify-between">
//                 <div>
//                   <Link to={`/movieDetails/${movie._id}`} className="btn btn-primary !px-12 ">Details</Link>
//                 </div>
//                 <Link to={`/movies/my-watch-list`} className="btn btn-primary ">Add to WatchList</Link>
                
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllMovies;


import React, { useContext } from 'react';
import { Link, useLoaderData } from 'react-router';
import toast from 'react-hot-toast'; 
import { AuthContext } from '../../context/AuthContext';

const AllMovies = () => {
  const movies = useLoaderData();
  const { user } = useContext(AuthContext); // user?.email
  console.log(movies);

  const handleAddToWatchlist = async (movie) => {
    // if user not logged in
    if (!user?.email) {
      toast.error('Please login to add to watchlist');
      // alert('Please login to add to watchlist');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/watchlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: user.email,
          movieId: movie._id,
          title: movie.title,
          posterUrl: movie.posterUrl,
          genre: movie.genre,
          releaseYear: movie.releaseYear,
          rating: movie.rating,
        }),
      });

      if (res.status === 409) {
        // toast('Already in your watchlist');
        alert('Already in your watchlist');
        return;
      }

      if (!res.ok) {
        throw new Error('Failed to add to watchlist');
      }

      toast.success('Added to your watchlist');
      // alert('Added to your watchlist');
    } catch (error) {
      console.error(error);
      // toast.error('Something went wrong');
      alert('Something went wrong while adding to watchlist');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <h2 className="text-4xl font-bold mb-6 text-white text-center">All Movies</h2>

      {/* Grid container with 3 columns */}
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
                <div>
                  <Link
                    to={`/movieDetails/${movie._id}`}
                    className="btn btn-primary !px-12 "
                  >
                    Details
                  </Link>
                </div>

                {/* 🔁 changed from Link → button */}
                <button
                  onClick={() => handleAddToWatchlist(movie)}
                  className="btn btn-primary"
                >
                  Add to WatchList
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Optional: a button to go to My Watchlist page */}
      <div className="mt-8 text-center">
        <Link to="/movies/my-watch-list" className="btn btn-outline btn-secondary">
          Go to My Watchlist
        </Link>
      </div>
    </div>
  );
};

export default AllMovies;

