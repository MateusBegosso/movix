import React from "react";
import "./Details.scss";
import { useParams } from "react-router-dom";

import useFetch from "../../hooks/useFetch";
import DetailsBanner from "./detailsBanner";
import Cast from "./cast";
import VideosSection from "./videosSection";
import Recommendation from "./carousels/Recommendation";

const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(
    `/${mediaType}/${id}/videos?language=pt-BR`
  );
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  return (
    <>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      {data?.results?.length > 0 && (
        <>
          <VideosSection data={data} loading={loading} />
        </>
      )}
      <Recommendation mediaType={mediaType} id={id} />
    </>
  );
};

export default Details;
