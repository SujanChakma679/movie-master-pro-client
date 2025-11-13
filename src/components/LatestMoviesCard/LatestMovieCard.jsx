// import React from 'react';

// const LatestMovieCard = ({movie}) => {
//     const {title, genre, posterUrl, rating, releaseYear } = movie;
//     return (
//         <div className=" bg-base-100 shadow-sm">
//   <figure className="px-10 pt-10 h-150 w-100">
//     <img
//       src={posterUrl}
//       alt="Shoes"
//       className="rounded-xl" />
//   </figure>
//   <div className="">
//     <h2 className="text-3xl font-semibold text-center">{title}</h2>
//     <div className='flex items-center justify-around text-lg font-semibold p-2'>
//         <div>
//             <p>Genre: {genre}</p>
//              <p>Release Year: {releaseYear}</p>
//         </div>
//         <div>
//             <p className='text-amber-800'>Rating: {rating}</p>
            
//         </div>
//     </div>
//     <div className="card-actions">
//       <button className="btn btn-primary w-full">Details</button>
//     </div>
//   </div>
// </div>
//     );
// };

// export default LatestMovieCard;

import React from 'react';

const LatestMovieCard = ({movie}) => {
    const {title, genre, posterUrl, rating, releaseYear } = movie;
    return (
        
        <div className="bg-base-100 shadow-sm">
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
                    <button className="btn btn-primary w-full">Details</button>
                </div>
            </div>
        </div>
    );
};

export default LatestMovieCard;