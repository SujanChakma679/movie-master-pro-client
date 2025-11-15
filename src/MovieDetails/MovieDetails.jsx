import React from "react";
import { useLoaderData } from "react-router";

const MovieDetails = () => {
  const movie = useLoaderData();
  console.log(movie);
  return (
    <div className="grid grid-cols-2 items-center">
      <div>
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full mb-4 p-8 rounded shadow-lg"
        />
      </div>
      <div>
        <h2 className="font-bold text-4xl text-center py-4">{movie.title}</h2>
        <p className="text-center"><span className="font-semibold ">Rating:</span> <span className="font-bold text-2xl text-amber-500">{movie.rating}</span></p>
        <div className="space-y-2 text-lg p-8">
        <p><span className="font-semibold">Genre:</span> {movie.genre}</p>
        <p><span className="font-semibold">Release Year:</span> {movie.releaseYear}</p>
        <p><span className="font-semibold">Director:</span> {movie.director}</p>
        <p><span className="font-semibold">Cast:</span> {movie.cast}</p>
        
        <p><span className="font-semibold">Duration:</span> {movie.duration} min</p>
        <p><span className="font-semibold">Plot Summary:</span> {movie.plotSummary}</p>
        <p><span className="font-semibold">Language:</span> {movie.language}</p>
        <p><span className="font-semibold">Country:</span> {movie.country}</p>
        <button className="btn btn-success w-full">Edit</button>
        <br />
        <button className="btn btn-warning w-full">Delete</button>
      </div>
      </div>
    </div>
  );
};

export default MovieDetails;
