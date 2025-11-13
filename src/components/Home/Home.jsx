import React, { use } from "react";
import LatestMovies from "../LatestMovies/LatestMovies";
import TopRatedMovies from "../TopRatedMovies/TopRatedMovies";
import StaticCard from "../StaticCard/StaticCard";

const latestMoviesPromise = fetch("http://localhost:3000/latest-movies").then(
  (res) => res.json()
);

const topRatedMoviesPromise = fetch("http://localhost:3000/top-rated-movies").then((res) =>
  res.json()
);



const Home = () => {

      const topRatedMovies = use(topRatedMoviesPromise);

  return (
    <div>
      <h2>this is home</h2>
      <LatestMovies latestMoviesPromise={latestMoviesPromise}></LatestMovies>

        <h2 className="text-3xl font-bold mt-8 mb-4">Top Rated Movies</h2>
      <TopRatedMovies movies={topRatedMovies} />

      <StaticCard></StaticCard>
    </div>
  );
};

export default Home;
