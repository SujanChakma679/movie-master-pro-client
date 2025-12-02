



import React, { useState, useEffect } from "react";
import LatestMovies from "../LatestMovies/LatestMovies";
import TopRatedMovies from "../TopRatedMovies/TopRatedMovies";
import StaticCard from "../StaticCard/StaticCard";
import Genre from "../Genre/Genre";
import Slider from "../Slider/Slider";
import useAxios from "../hooks/useAxios";

const Home = () => {
  const axios = useAxios();

  const [latestMovies, setLatestMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);

        // Fetch latest movies
        const latestRes = await axios.get("/latest-movies");
        setLatestMovies(latestRes.data);

        // Fetch top rated movies
        const topRatedRes = await axios.get("/top-rated-movies");
        setTopRatedMovies(topRatedRes.data);

      } catch (err) {
        console.error(err);
        setError("Failed to load movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [axios]);

  if (loading) {
    return <p className="text-center py-10">Loading movies...</p>;
  }

  if (error) {
    return <p className="text-center py-10 text-red-500">{error}</p>;
  }

  return (
    <div className="py-10">
      <Slider />
      <Genre />

      <h2 className="text-3xl font-bold mt-8 mb-4 text-center py-10">
        Latest Movies
      </h2>
      <LatestMovies movies={latestMovies} />

      <h2 className="text-3xl font-bold mt-8 mb-4 text-center py-10">
        Top Rated Movies
      </h2>
      <TopRatedMovies movies={topRatedMovies} />

      <StaticCard />
    </div>
  );
};

export default Home;
