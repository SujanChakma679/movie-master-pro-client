

import React, { useContext, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";

const MovieDetails = () => {
  const movieData = useLoaderData();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [movie, setMovie] = useState(movieData);
  const [editingMovie, setEditingMovie] = useState(null);
  const [editData, setEditData] = useState({
    title: movie?.title || "",
    genre: movie?.genre || "",
    releaseYear: movie?.releaseYear || "",
    rating: movie?.rating || "",
    posterUrl: movie?.posterUrl || "",
    director: movie?.director || "",
    cast: movie?.cast || "",
    duration: movie?.duration || "",
    plotSummary: movie?.plotSummary || "",
    language: movie?.language || "",
    country: movie?.country || "",
  });

  const isOwner = user?.email && movie?.addedBy === user.email;

  const handleDelete = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to delete this movie?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (!result.isConfirmed) return;

      const res = await fetch(`http://localhost:3000/movies/${movie._id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete movie");

      Swal.fire("Deleted!", "Movie has been deleted.", "success");

      // Redirect to home page after deletion
      navigate("/");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to delete movie", "error");
    }
  };

  const handleEditClick = () => {
    setEditingMovie(movie);
  };

  const handleEditSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:3000/movies/${movie._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });

      if (!res.ok) throw new Error("Failed to update movie");

      setMovie({ ...movie, ...editData });
      setEditingMovie(null);
      Swal.fire("Success", "Movie updated successfully", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update movie", "error");
    }
  };

  if (!movie) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 p-8">
      <div>
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full mb-4 rounded shadow-lg"
        />
      </div>
      <div>
        <h2 className="font-bold text-4xl text-center py-4">{movie.title}</h2>
        <p className="text-center">
          <span className="font-semibold">Rating:</span>{" "}
          <span className="font-bold text-3xl text-amber-500">{movie.rating}</span>
        </p>
        <div className="space-y-2 text-lg p-4">
          <p><span className="font-semibold">Genre:</span> {movie.genre}</p>
          <p><span className="font-semibold">Release Year:</span> {movie.releaseYear}</p>
          <p><span className="font-semibold">Director:</span> {movie.director}</p>
          <p><span className="font-semibold">Cast:</span> {movie.cast}</p>
          <p><span className="font-semibold">Duration:</span> {movie.duration} min</p>
          <p><span className="font-semibold">Plot Summary:</span> {movie.plotSummary}</p>
          <p><span className="font-semibold">Language:</span> {movie.language}</p>
          <p><span className="font-semibold">Country:</span> {movie.country}</p>
        </div>

        {isOwner && (
          <div className="space-y-5 mt-4">
            <button className="btn-primary !w-full" onClick={handleEditClick}>
              Edit
            </button>
            
            <button className="btn btn-warning w-full" onClick={handleDelete}>
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingMovie && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg overflow-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold mb-4 text-center">Edit Movie</h2>

            <div className="flex flex-col space-y-3">
              {[
                "title","genre","releaseYear","rating","posterUrl",
                "director","cast","duration","plotSummary","language","country"
              ].map((field) => (
                <div key={field}>
                  <label className="font-semibold text-gray-700 capitalize">
                    {field.replace(/([A-Z])/g, ' $1')}
                  </label>
                  <input
                    className="input input-bordered w-full"
                    placeholder={field}
                    value={editData[field]}
                    onChange={(e) =>
                      setEditData({ ...editData, [field]: e.target.value })
                    }
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

export default MovieDetails;
