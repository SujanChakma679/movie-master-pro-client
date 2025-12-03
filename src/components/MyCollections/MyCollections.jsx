


import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
import { useTheme } from "../../context/ThemeContext";
import useAxios from "../hooks/useAxios";


const MyCollections = () => {
  const { isDark } = useTheme();
  const { user } = useContext(AuthContext);
  const axios = useAxios();

  const [movies, setMovies] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    genre: "",
    releaseYear: "",
    rating: "",
    posterUrl: "",
  });

  // Fetch user's movies
  useEffect(() => {
    if (!user?.email) return;

    const fetchMyMovies = async () => {
      try {
        const res = await axios.get("/movies");
        const myMovies = res.data.filter((movie) => movie.addedBy === user.email);
        setMovies(myMovies);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to load your collection", "error");
      }
    };

    fetchMyMovies();
  }, [user?.email, axios]);

  // Remove a movie
  const handleRemove = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to remove this movie from your collection?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, remove it!",
        cancelButtonText: "Cancel",
      });

      if (!result.isConfirmed) return;

      await axios.delete(`/movies/${id}`);
      setMovies((prev) => prev.filter((m) => m._id !== id));
      Swal.fire("Removed!", "Movie removed from collection.", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to remove movie.", "error");
    }
  };

  // Edit a movie
  const handleEditSubmit = async () => {
    try {
      await axios.patch(`/movies/${editingMovie._id}`, editData);

      setMovies((prev) =>
        prev.map((m) => (m._id === editingMovie._id ? { ...m, ...editData } : m))
      );

      setEditingMovie(null);
      Swal.fire("Success", "Movie updated successfully", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update movie", "error");
    }
  };

  // Open edit modal
  const handleEditClick = (movie) => {
    setEditingMovie(movie);
    setEditData({
      title: movie.title,
      genre: movie.genre,
      releaseYear: movie.releaseYear,
      rating: movie.rating,
      posterUrl: movie.posterUrl,
    });
  };

  if (!user?.email)
    return <p className="text-center text-white mt-8">Please login to see your collection</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">My Movie Collections</h2>

      {movies.length === 0 ? (
        <p className="text-center">No movies added yet</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <div
              key={movie._id}
              className={`bg-base-100 shadow-sm rounded-xl overflow-hidden transition-colors ${
                isDark ? "bg-gray-900" : "bg-gray-50"
              }`}
            >
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="h-96 w-full object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-center">{movie.title}</h2>
                <div className="flex justify-between items-center text-md font-semibold">
                  <div>
                    <p>Genre: {movie.genre}</p>
                    <p>Year: {movie.releaseYear}</p>
                  </div>
                  <p className="text-amber-800 font-semibold text-lg">Rating: {movie.rating}</p>
                </div>

                <div className="flex justify-between mt-4">
                  <button className="btn-primary !px-10" onClick={() => handleEditClick(movie)}>
                    Edit
                  </button>
                  <button className="btn-primary" onClick={() => handleRemove(movie._id)}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingMovie && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Edit Movie</h2>

            <div className="flex flex-col space-y-3">
              {["title", "genre", "releaseYear", "rating", "posterUrl"].map((field) => (
                <div key={field}>
                  <label className="font-semibold text-gray-700">{field[0].toUpperCase() + field.slice(1)}</label>
                  <input
                    className="input input-bordered w-full"
                    placeholder={field[0].toUpperCase() + field.slice(1)}
                    value={editData[field]}
                    onChange={(e) => setEditData({ ...editData, [field]: e.target.value })}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-6 space-x-3">
              <button
                className="btn btn-outline btn-secondary"
                onClick={() => setEditingMovie(null)}
              >
                Cancel
              </button>
              <button className="btn-primary" onClick={handleEditSubmit}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCollections;
