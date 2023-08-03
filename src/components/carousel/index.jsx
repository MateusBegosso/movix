import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper";
import Img from "../lazyLoadImage";
import PosterFallback from "../../assets/no-poster.png";

import "./Carousel.scss";

const Carousel = ({ data, loading }) => {
  const carouselContainer = useRef();
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();

  const navigation = (dir) => {};

  const skItem = () => {
    return (
      <div className="carousel__skeletonItem">
        <div className="carousel__posterBlock skeleton"></div>
        <div className="carousel__textBlock">
          <div className="carousel__title skeleton"></div>
          <div className="carousel__date skeleton"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="carousel">
      <ContentWrapper>
        <BsFillArrowLeftCircleFill
          className="carousel__leftNav carousel__arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carousel__rightNav carousel__arrow"
          onClick={() => navigation("right")}
        />
        {!loading ? (
          <div className="carousel__items">
            {data?.map((item) => {
              const posterUrl = item.poster_path
                ? url.poster + item.poster_path
                : PosterFallback;
              return (
                <div key={item.id} className="carousel__item">
                  <div className="carousel__posterBlock">
                    <Img src={posterUrl} />
                  </div>
                  <div className="carousel__textBlock">
                    <span className="carousel__title">
                      {item.title || item.name}
                    </span>
                    <span className="carousel__date">
                      {dayjs(item.release_Date).format("DD/MM/YYYY")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="carousel__loadingSkeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
