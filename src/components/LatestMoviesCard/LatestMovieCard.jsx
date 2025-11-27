

import React from 'react';
import { Link } from 'react-router';
import { useTheme } from '../../context/ThemeContext';

const LatestMovieCard = ({movie}) => {
    const {_id, title, genre, posterUrl, rating, releaseYear } = movie;

    const { isDark } = useTheme();
    return (
        
        <div className={`bg-base-100 shadow-sm p-4 transition-colors ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <figure className="px-10 pt-10 h-96 w-full overflow-hidden">
                <img
                    src={posterUrl}
                    alt={title} 
                    className="rounded-xl h-full w-full object-cover" 
                />
            </figure>
            <div className="">
                <h2 className="text-3xl font-semibold text-center">{title}</h2>
                <div className='flex items-center justify-around text-lg font-semibold p-2'>
                    <div>
                        <p>Genre: {genre}</p>
                        <p>Release Year: {releaseYear}</p>
                    </div>
                    <div>
                        <p className='text-amber-800'>Rating: {rating}</p>
                    </div>
                </div>
                <div className="card-actions">
                    <Link to={`/movieDetails/${_id}`} className="btn-primary !w-full">Details</Link>
                </div>
            </div>
        </div>
    );
};

export default LatestMovieCard;