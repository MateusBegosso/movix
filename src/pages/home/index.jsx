import React from "react";
import "./Home.scss";
import HeroBanner from "./heroBanner";
import Trending from "./trending";

const Home = () => {
  return (
    <section className="homePage">
      <HeroBanner />
      <Trending />
      <div style={{ height: 1000 }}></div>
    </section>
  );
};

export default Home;
