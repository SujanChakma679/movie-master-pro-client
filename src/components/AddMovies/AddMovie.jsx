


// import React, { useState, useContext } from 'react';
// import Swal from 'sweetalert2';
// import { AuthContext } from '../../context/AuthContext';

// const AddMovie = () => {
//   const { user } = useContext(AuthContext);
//   const [movie, setMovie] = useState({
//     title: '',
//     genre: '',
//     director: '',
//     releaseYear: '',
//     rating: ''
//   });

//   const handleChange = (e) => {
//     setMovie({ ...movie, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!user?.email) {
//       Swal.fire({ icon: 'error', title: 'Error!', text: 'User not logged in' });
//       return;
//     }

//     const movieWithEmail = { ...movie, email: user.email };

//     try {
//       const res = await fetch('http://localhost:3000/movies/add', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(movieWithEmail)
//       });

//       const data = await res.json();

//       if (res.ok) {
//         Swal.fire({ icon: 'success', title: 'Success!', text: 'Movie added successfully' });
//         setMovie({ title: '', genre: '', director: '', releaseYear: '', rating: '' });
//       } else {
//         Swal.fire({ icon: 'error', title: 'Error!', text: data.message || 'Failed to add movie' });
//       }
//     } catch (error) {
//       Swal.fire({ icon: 'error', title: 'Error!', text: 'Something went wrong' });
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//       <input name="title" placeholder="Title" value={movie.title} onChange={handleChange} required />
//       <input name="genre" placeholder="Genre" value={movie.genre} onChange={handleChange} required />
//       <input name="director" placeholder="Director" value={movie.director} onChange={handleChange} required />
//       <input name="releaseYear" placeholder="Release Year" type="number" value={movie.releaseYear} onChange={handleChange} required />
//       <input name="rating" placeholder="Rating" type="number" step="0.1" value={movie.rating} onChange={handleChange} required />
//       <button type="submit">Add Movie</button>
//     </form>
//   );
// };

// export default AddMovie;



import React, { useState, useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthContext';

const AddMovie = () => {
  const { user } = useContext(AuthContext);
  const [movie, setMovie] = useState({
    title: '',
    posterUrl: '',
    genre: '',
    releaseYear: '',
    rating: ''
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
      email: user.email          // this must match backend
    };

    try {
      const res = await fetch('http://localhost:3000/movies/add', {
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

      toast.success('Movie added successfully');
      // reset form
      setMovie({
        title: '',
        posterUrl: '',
        genre: '',
        releaseYear: '',
        rating: ''
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
        <input
          name="title"
          placeholder="Title"
          value={movie.title}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          name="posterUrl"
          placeholder="Poster URL"
          value={movie.posterUrl}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          name="genre"
          placeholder="Genre"
          value={movie.genre}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          name="releaseYear"
          type="number"
          placeholder="Release Year"
          value={movie.releaseYear}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          name="rating"
          type="number"
          step="0.1"
          placeholder="Rating"
          value={movie.rating}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <button type="submit" className="btn btn-primary w-full">
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default AddMovie;


