import React, { use } from "react";
import LatestMovies from "../LatestMovies/LatestMovies";
import TopRatedMovies from "../TopRatedMovies/TopRatedMovies";
import StaticCard from "../StaticCard/StaticCard";
import Genre from "../Genre/Genre";
import Slider from "../Slider/Slider";


const latestMoviesPromise = fetch("http://localhost:3000/latest-movies").then(
  (res) => res.json()
);

const topRatedMoviesPromise = fetch("http://localhost:3000/top-rated-movies").then((res) =>
  res.json()
);



const Home = () => {

      const topRatedMovies = use(topRatedMoviesPromise);
      

  return (
    <div className="py-10">
      
      <Slider></Slider>
      <Genre></Genre>
      <LatestMovies latestMoviesPromise={latestMoviesPromise}></LatestMovies>

        <h2 className={`text-3xl font-bold mt-8 mb-4 text-center py-10 `}>Top Rated Movies</h2>
      <TopRatedMovies movies={topRatedMovies} />

      <StaticCard></StaticCard>
    </div>
  );
};

export default Home;
