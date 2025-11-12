import React from 'react';
import LatestMovies from '../LatestMovies/LatestMovies';

const latestMoviesPromise = fetch('http://localhost:3000/latest-movies').then(res =>res.json());

const Home = () => {
    return (
        <div>
            <h2>this is home</h2>
            <LatestMovies latestMoviesPromise ={latestMoviesPromise}></LatestMovies>
        </div>
    );
};

export default Home;