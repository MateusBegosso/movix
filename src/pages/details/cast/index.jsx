import React from "react";
import { useSelector } from "react-redux";

import "./Cast.scss";

import ContentWrapper from "../../../components/contentWrapper";
import Img from "../../../components/lazyLoadImage";
import avatar from "../../../assets/avatar.png";

const Cast = ({ data, loading }) => {
  const { url } = useSelector((state) => state.home);

  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };
  return (
    <div className="castSection">
      <ContentWrapper>
        <div className="castSection__sectionHeading">Elenco principal</div>
        {!loading ? (
          <div className="castSection__listItems">
            {data?.map((item) => {
              let imgUrl = item.profile_path
                ? url.profile + item.profile_path
                : avatar;
              return (
                <div key={item.id} className="castSection__listItem">
                  <div className="castSection__profileImg">
                    <Img src={imgUrl} />
                  </div>
                  <div className="castSection__name">{item.name}</div>
                  <div className="castSection__character">{item.character}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="castSkeleton">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Cast;
