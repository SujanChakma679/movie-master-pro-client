
import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { AuthContext } from "../../context/AuthContext";

const GENRES = [
  "Action",
  "Drama",
  "Comedy",
  "Sci-Fi",
  "Romance",
  "Horror",
  "Thriller",
  "Adventure",
  "Fantasy",
  "Mystery",
  "Animation",
  "Documentary",
  "Musical",
  "Crime",
  "Biography",
  "Family",
  "History",
  "War",
  "Western",
  "Superhero",
  "Anime",
];

const Genre = () => {
  const { user } = useContext(AuthContext);

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [minRating, setMinRating] = useState("");
  const [maxRating, setMaxRating] = useState("");
  const [movies, setMovies] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // click on a genre card -> toggle in selectedGenres
  const handleGenreClick = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    );
  };

  const fetchMovies = async () => {
    try {
      setIsLoading(true);

      const params = new URLSearchParams();

      if (selectedGenres.length > 0) {
        params.append("genres", selectedGenres.join(","));
      }
      if (minRating) params.append("minRating", minRating);
      if (maxRating) params.append("maxRating", maxRating);

      const url =
        params.toString().length > 0
          ? `http://localhost:3000/movies?${params.toString()}`
          : "http://localhost:3000/movies";
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await res.json();

      // Normalize genre to array
      const normalized = data.map((movie) => ({
        ...movie,
        genre: Array.isArray(movie.genre) ? movie.genre : [movie.genre],
      }));

      setMovies(normalized);
      setHasSearched(true);

      if (normalized.length === 0) {
        Swal.fire({
          icon: "warning",
          title: "No movies found",
          text: "Try changing your filters.",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Movies loaded",
          text: `Found ${normalized.length} movie(s).`,
          timer: 1400,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while loading movies.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMovies();
  };

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
      const res = await fetch("http://localhost:3000/watchlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
        Swal.fire({
          icon: "info",
          title: "Already Added",
          text: "This movie is already in your watchlist",
          confirmButtonColor: "#3085d6",
        });
        return;
      }

      if (!res.ok) throw new Error("Failed to add to watchlist");

      Swal.fire({
        icon: "success",
        title: "Added!",
        text: "Movie added to your watchlist successfully",
        confirmButtonColor: "#3085d6",
      });
    } catch (error) {
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
    <section className="p-8 flex flex-col items-center bg-gradient-to-r from-emerald-900 to-emerald-600">
      {/* Title / description */}
      <div className="max-w-4xl text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-50 mb-3">
          Explore by Genre
        </h2>
        <p className="text-gray-200 text-xl max-w-2xl mx-auto">
          Browse movies by your favorite genres. Select one or multiple genres,
          set a rating range, and discover your next watch.
        </p>
      </div>

      {/* Genre cards */}
      <div className="w-full flex flex-wrap justify-center gap-6 p-4">
        {GENRES.map((genre, index) => {
          const isActive = selectedGenres.includes(genre);
          return (
            <button
              key={index}
              type="button"
              onClick={() => handleGenreClick(genre)}
              className={`w-full max-w-[200px] sm:w-[180px] md:w-[150px] p-6 rounded-full text-white 
                bg-gradient-to-tr from-purple-900 to-emerald-600 shadow-2xl shadow-purple-900/50 
                transform transition-all duration-300 hover:scale-105 hover:shadow-pink-500/60 
                cursor-pointer text-center border 
                ${isActive ? "border-yellow-300 ring-2 ring-yellow-300" : "border-transparent"}`}
            >
              <h3 className="text-lg font-semibold tracking-wide">{genre}</h3>
            </button>
          );
        })}
      </div>

      {/* Rating + Search form */}
      <form
        onSubmit={handleSubmit}
        className="mt-6 w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold block mb-2 text-black">Min Rating</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="10"
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
              className="input input-bordered w-full"
              
            />
          </div>
          <div>
            <label className="font-semibold block mb-2 text-black">Max Rating</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="10"
              value={maxRating}
              onChange={(e) => setMaxRating(e.target.value)}
              className="input input-bordered w-full"
              
            />
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            className="btn-primary px-10"
            disabled={isLoading}
          >
            {isLoading ? "Searching..." : "Search Movies"}
          </button>
        </div>
      </form>

      {/* Results section */}
      {hasSearched && (
        <div className="w-full max-w-7xl mt-10">
          {movies.length === 0 ? (
            <div className="text-center text-white mt-4">
              <h3 className="text-2xl font-semibold">No movies found</h3>
            </div>
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
                          "https://placehold.co/300x450/1f2937/d1d5db?text=No+Poster";
                      }}
                    />
                  </figure>

                  <div className="p-4">
                    <h2 className="text-2xl font-semibold text-center">
                      {movie.title}
                    </h2>
                    <div className="flex items-center justify-around text-lg font-semibold mt-2">
                      <div>
                        <p>
                          Genre:{" "}
                          {Array.isArray(movie.genre)
                            ? movie.genre.join(", ")
                            : movie.genre}
                        </p>
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
          )}
        </div>
      )}
    </section>
  );
};

export default Genre;
