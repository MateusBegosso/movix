import React from "react";
import "./Details.scss";
import { useParams } from "react-router-dom";

import useFetch from "../../hooks/useFetch";
import DetailsBanner from "./detailsBanner";
import Cast from "./cast";

const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  return (
    <>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
    </>
  );
};

export default Details;
