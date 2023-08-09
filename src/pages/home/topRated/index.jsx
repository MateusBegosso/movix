import React, { useState } from "react";
import ContentWrapper from "../../../components/contentWrapper";
import SwitchTabs from "../../../components/switchTabs";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel";

const TopRated = () => {
  const [endpoint, setEndpoint] = useState("movie");
  const { data, loading } = useFetch(`/${endpoint}/top_rated`);
  const onTabChange = (tab) => {
    setEndpoint(tab === "Filmes" ? "movie" : "tv");
  };

  return (
    <section>
      <div className="carousel">
        <ContentWrapper>
          <span className="carousel__title">Os mais bem avaliados</span>
          <SwitchTabs data={["Filmes", "TV shows"]} onTabChange={onTabChange} />
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
      </div>
    </section>
  );
};

export default TopRated;
