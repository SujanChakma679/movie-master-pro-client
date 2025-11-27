import React, { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthContext';

const AddMovie = () => {
  const { user } = useContext(AuthContext);
  const [movie, setMovie] = useState({
    title: '',
    posterUrl: '',
    genre: '',
    director: '',
    cast: '',
    releaseYear: '',
    rating: '',
    duration: '',
    plotSummary: '',
    language: '',
    country: '',
  });

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      toast.error('Please login to add a movie');
      return;
    }

    const movieData = {
      ...movie,
      releaseYear: Number(movie.releaseYear),
      rating: Number(movie.rating),
      duration: Number(movie.duration),
      addedBy: user.email,
      created_at: new Date().toISOString(),
    };

    try {
      const res = await fetch('http://localhost:3000/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || 'Failed to add movie');
      }

      // SweetAlert success message
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Movie added successfully!',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });

      // reset form
      setMovie({
        title: '',
        posterUrl: '',
        genre: '',
        director: '',
        cast: '',
        releaseYear: '',
        rating: '',
        duration: '',
        plotSummary: '',
        language: '',
        country: '',
      });
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Something went wrong');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 md:p-8">
      <h2 className="text-3xl font-bold mb-4 text-white text-center">Add a Movie</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <input
          name="title"
          placeholder="Title"
          value={movie.title}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        {/* Poster URL */}
        <input
          name="posterUrl"
          placeholder="Poster URL"
          value={movie.posterUrl}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        {/* Genre */}
        <input
          name="genre"
          placeholder="Genre (e.g. Drama)"
          value={movie.genre}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        {/* Director */}
        <input
          name="director"
          placeholder="Director"
          value={movie.director}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        {/* Cast */}
        <input
          name="cast"
          placeholder="Cast (comma separated)"
          value={movie.cast}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        {/* Release Year */}
        <input
          name="releaseYear"
          type="number"
          placeholder="Release Year"
          value={movie.releaseYear}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        {/* Rating */}
        <input
          name="rating"
          type="number"
          step="0.1"
          placeholder="Rating (e.g. 9.3)"
          value={movie.rating}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        {/* Duration */}
        <input
          name="duration"
          type="number"
          placeholder="Duration in minutes (e.g. 142)"
          value={movie.duration}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        {/* Plot Summary */}
        <textarea
          name="plotSummary"
          placeholder="Plot Summary"
          value={movie.plotSummary}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
          rows={3}
          required
        />

        {/* Language */}
        <input
          name="language"
          placeholder="Language (e.g. English)"
          value={movie.language}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        {/* Country */}
        <input
          name="country"
          placeholder="Country (e.g. USA)"
          value={movie.country}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <button type="submit" className="btn-primary !w-full">
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default AddMovie;
