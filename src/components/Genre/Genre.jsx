import React from 'react';

const GENRES = [
  'Action', 'Drama', 'Comedy', 'Sci-Fi', 'Romance', 'Horror', 
  'Thriller', 'Adventure', 'Fantasy', 'Mystery', 'Animation', 
  'Documentary', 'Musical', 'Crime', 'Biography', 'Family'
];

const Genre = () => {
    return (
        <section className="p-8 text-white flex flex-col items-center bg-gradient-to-r from-emerald-900 to-emerald-600">
      <div className="max-w-4xl text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-50 mb-3">
          Explore by Genre
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Browse movies and shows by your favorite genres. Whether you love thrilling action or heartwarming romance, find your perfect pick here.
        </p>
      </div>

      <div className="w-full flex flex-wrap justify-center gap-6 p-4">
        {GENRES.map((genre, index) => (
          <div
            key={index}
            className="w-full max-w-[200px] sm:w-[180px] md:w-[150px] p-6 rounded-2xl text-white bg-gradient-to-tr from-purple-900 to-emerald-600 
                       shadow-2xl shadow-purple-900/50 transform transition-all duration-300 hover:scale-105 hover:shadow-pink-500/60 cursor-pointer text-center"
          >
            <h3 className="text-lg font-semibold tracking-wide">{genre}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Genre;