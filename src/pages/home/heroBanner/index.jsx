import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useFetch from "../../../hooks/useFetch";
import Img from "../../../components/lazyLoadImage";
import ContentWrapper from "../../../components/contentWrapper";
import "./HeroBanner.scss";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);
  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="heroBanner__backdrop-image">
          <Img src={background} />
        </div>
      )}

      <div className="heroBanner__opacity-layer"></div>

      <ContentWrapper>
        <div className="heroBanner__container">
          <span className="heroBanner__title">Bem-vindo!</span>
          <span className="heroBanner__subtitle">
            Milhões de filmes, séries e pessoas para descobrir. <br /> Comece a
            explorar.
          </span>
          <div className="heroBanner__search">
            <input
              type="text"
              placeholder="Pesquise por um filme ou série..."
              onChange={(event) => setQuery(event.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <button>Pesquisar</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
