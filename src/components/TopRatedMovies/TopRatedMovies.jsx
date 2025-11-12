import React from 'react';

const TopRatedMovies = ({movies}) => {

     
    
    return (
        <div >
            <div className='grid grid-cols-3'>
           
            {
                movies.map((movie) =>(<div className=" bg-base-100 shadow-sm">
  <figure className="px-10 pt-10 h-150 w-100">
    <img
      src={movie.posterUrl}
      alt="Shoes"
      className="rounded-xl" />
  </figure>
  <div className="">
    <h2 className="text-3xl font-semibold text-center">{movie.title}</h2>
    <div className='flex items-center justify-around text-lg font-semibold p-2'>
        <div>
            <p>Genre: {movie.genre}</p>
             <p>Release Year: {movie.releaseYear}</p>
        </div>
        <div>
            <p className='text-amber-800'>Rating: {movie.rating}</p>
            
        </div>
    </div>
    <div className="card-actions">
      <button className="btn btn-primary w-full">Details</button>
    </div>
  </div>
</div>) )
                
            }
        </div>
        </div>
    );
};

export default TopRatedMovies;