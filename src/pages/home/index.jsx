import React from "react";
import "./Home.scss";
import HeroBanner from "./heroBanner";
import Trending from "./trending";
import Popular from "./popular";
import TopRated from "./topRated";

const Home = () => {
  return (
    <section className="homePage">
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
    </section>
  );
};

export default Home;
