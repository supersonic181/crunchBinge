import React, { useRef } from "react";
import styled from "styled-components";
import { LeftArrow, RightArrow } from "./Arrows";
import { MovieItem } from "./MovieItem";

export const Category = ({ title, movieList = [] }) => {
  const ref = useRef();
  const [slideValue, setSlideValue] = React.useState(0);
  return (
    <Style className="collection-overview">
      <div
        className="react-reveal collection-preview"
        style={{
          animationFillMode: "both",
          animationDuration: "1000ms",
          animationDelay: "0ms",
          animationIterationCount: "1",
          opacity: 1,
          animationName: "react-reveal-580829225166339-1",
        }}
      >
        <h1 className="collection-preview__title" style={{ opacity: 1 }}>
          {title}
        </h1>
        <div className="collection-preview__box">
          <LeftArrow
            onClick={() => {
              if (slideValue < 0) {
                setSlideValue((old) => old + 300);
              }
            }}
          />
          <RightArrow
            onClick={() => {

              if (
                slideValue > -(movieList.length * 300 - window.innerWidth - 300)
              )
                setSlideValue((old) => old - 300);
            }}
          />
          <div
            className="collection-preview__inner slider"
            ref={ref}
            style={{ transform: `translateX(${slideValue}px)` }}
          >
            {movieList.map((movie) => (
              <MovieItem
                key={movie.id}
                id={movie.id}
                title={movie.title || movie.name}
                text={movie.overview}
                backdrop={movie.backdrop_path}
                img={movie.poster_path}
                release={movie.release_date}
                lang={movie.original_language}
                rating={movie.vote_average}
              />
            ))}
          </div>
        </div>
      </div>
    </Style>
  );
};

const Style = styled.div``;
