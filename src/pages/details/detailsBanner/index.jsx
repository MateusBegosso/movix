import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./DetailsBanner.scss";

import ContentWrapper from "../../../components/contentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres";
import CircleRating from "../../../components/circleRating";
import Img from "../../../components/lazyLoadImage";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIcon } from "../Playbtn";
import VideoPopup from "../../../components/videoPopup";

const DetailsBanner = ({ video, crew }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);

  const { url } = useSelector((state) => state.home);

  const _genres = data?.genres?.map((g) => g.id);

  const director = crew?.filter((f) => f.job === "Director");
  const writer = crew?.filter(
    (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
  );

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  return (
    <section className="detailsBanner">
      {!loading ? (
        <>
          {!!data && (
            <React.Fragment>
              <div className="detailsBanner__backdropImg">
                <Img src={url.backdrop + data?.backdrop_path} />
              </div>
              <div className="detailsBanner__opacityLayer"></div>
              <ContentWrapper>
                <div className="detailsBanner__content">
                  <div className="detailsBanner__left">
                    {data.poster_path ? (
                      <Img
                        className="detailsBanner__posterImg"
                        src={url.backdrop + data?.poster_path}
                      />
                    ) : (
                      <Img
                        className="detailsBanner__posterImg"
                        src={PosterFallback}
                      />
                    )}
                  </div>
                  <div className="detailsBanner__right">
                    <div className="detailsBanner__title">
                      {`${data.name || data.title} (${dayjs(
                        data?.release_date
                      ).format("YYYY")})`}
                    </div>
                    <div className="detailsBanner__subtitle">
                      {data.tagline}
                    </div>
                    <Genres data={_genres} />
                    <div className="detailsBanner__row">
                      <CircleRating rating={data.vote_average.toFixed(1)} />
                      <div
                        className="detailsBanner__playbtn"
                        onClick={() => {
                          setShow(true);
                          setVideoId(video.key);
                        }}
                      >
                        <PlayIcon />
                        <span className="detailsBanner__text">
                          Assista ao trailer
                        </span>
                      </div>
                    </div>
                    <div className="detailsBanner__overview">
                      <div className="detailsBanner__heading">Sinopse</div>
                      <div className="detailsBanner__description">
                        {data.overview}
                      </div>
                    </div>
                    <div className="detailsBanner__info">
                      {data.status && (
                        <div className="detailsBanner__infoItem">
                          <span className="detailsBanner__text bold">
                            Situação:{" "}
                          </span>
                          <span className="detailsBanner__text">
                            {data.status === "Released" && "Lançado"}
                            {data.status === "Returning Series" && "Renovada"}
                            {data.status === "Ended" && "Finalizada"}
                            {data.status === "Canceled" && "Cancelada"}
                          </span>
                        </div>
                      )}
                      {(data.release_date || data.first_air_date) && (
                        <div className="detailsBanner__infoItem">
                          <span className="detailsBanner__text bold">
                            Estreia:{" "}
                          </span>
                          <span className="detailsBanner__text">
                            {dayjs(
                              data.release_date || data.first_air_date
                            ).format("DD/MM/YYYY")}
                          </span>
                        </div>
                      )}
                      {data.runtime && (
                        <div className="detailsBanner__infoItem">
                          <span className="detailsBanner__text bold">
                            Duração:{" "}
                          </span>
                          <span className="detailsBanner__text">
                            {toHoursAndMinutes(data.runtime)}
                          </span>
                        </div>
                      )}
                    </div>

                    {director?.length > 0 && (
                      <div className="detailsBanner__info">
                        <span className="detailsBanner__text bold">
                          Direção:{" "}
                        </span>
                        <span className="detailsBanner__text">
                          {director?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {director.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                    {writer?.length > 0 && (
                      <div className="detailsBanner__info">
                        <span className="detailsBanner__text bold">
                          Roteiro:{" "}
                        </span>
                        <span className="detailsBanner__text">
                          {writer?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {writer.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                    {data?.created_by?.length > 0 && (
                      <div className="detailsBanner__info">
                        <span className="detailsBanner__text bold">
                          Produção:{" "}
                        </span>
                        <span className="detailsBanner__text">
                          {data?.created_by?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {data?.created_by?.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <VideoPopup
                  show={show}
                  setShow={setShow}
                  videoId={videoId}
                  setVideoId={setVideoId}
                />
              </ContentWrapper>
            </React.Fragment>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </section>
  );
};

export default DetailsBanner;
