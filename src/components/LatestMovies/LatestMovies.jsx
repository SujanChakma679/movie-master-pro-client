import React, { use } from 'react';
import LatestMovieCard from '../LatestMoviesCard/LatestMovieCard';

const LatestMovies = ({latestMoviesPromise}) => {

    const movies = use(latestMoviesPromise);
    console.log(movies)
    return (
        <div>
            <h2 className='text-5xl text-center py-10'>Recently Added Movies</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-11/12 mx-auto'>
                {
                movies.map(movie => <LatestMovieCard
                key={movie._id}
                movie={movie}
                ></LatestMovieCard>)
            }
            </div>
        </div>
    );
};

export default LatestMovies;