import React, { useState } from "react";
import ContentWrapper from "../../../components/contentWrapper";
import SwitchTabs from "../../../components/switchTabs";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel";

const Trending = () => {
  const [endpoint, setEndpoint] = useState("day");
  const { data, loading } = useFetch(
    `/trending/movie/${endpoint}?language=pt-BR`
  );
  const onTabChange = (tab) => {
    setEndpoint(tab === "Hoje" ? "day" : "week");
  };

  return (
    <section>
      <div className="carousel__section">
        <ContentWrapper>
          <span className="carousel__title">Em Alta</span>
          <SwitchTabs data={["Hoje", "Semana"]} onTabChange={onTabChange} />
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} />
      </div>
    </section>
  );
};

export default Trending;
