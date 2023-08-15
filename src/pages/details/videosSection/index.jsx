import React, { useState } from "react";

import "./VideosSection.scss";

import ContentWrapper from "../../../components/contentWrapper";
import VideoPopup from "../../../components/videoPopup";
import Img from "../../../components/lazyLoadImage";
import { PlayIcon } from "../Playbtn";

const VideosSection = ({ data, loading }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const loadingSkeleton = () => {
    return (
      <div className="skItem">
        <div className="thumb skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  return (
    <section className="videosSection">
      <ContentWrapper>
        <div className="videosSection__heading">Vídeos</div>
        {!loading ? (
          <div className="videosSection__videos">
            {data?.results?.map((video) => (
              <div
                key={video.id}
                className="videosSection__videoItem"
                onClick={() => {
                  setVideoId(video.key);
                  setShow(true);
                }}
              >
                <div className="videosSection__videoThumbnail">
                  <Img
                    src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                  />
                  <PlayIcon />
                </div>
                <div className="videosSection__videoTitle">{video.name}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="videoSkeleton">
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
          </div>
        )}
      </ContentWrapper>
      <VideoPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </section>
  );
};

export default VideosSection;
