import { useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import "./custom.css";
import {
  getPopularSeries,
  getTopRatedSeries,
  getNowShowimgSeries,
} from "../../Service/Series/series";
import { Category } from "../Movies/Category";
import { getTrendingTv } from "../../Service/Trending/Trending";
import HeroUnit from "../HeroUnit/HeroUnit";

function Series(props) {
  const [popularSeries, setPopularSeries] = useState([]);
  const [topRatedSeries, setTopRatedSeries] = useState([]);
  const [nowShowingSeries, setNowShowingSeries] = useState([]);
  const [trending, setTrending] = useState([]);

    // Fetch Trending of this week in tv category
    useEffect(() => {
      let mounted = true;
      getTrendingTv().then((data) => {
        if (mounted) {
          setTrending(data.results.slice(0, 1));
        }
      });
      return () => (mounted = false);
    }, []);

  useEffect(() => {
    let mounted = true;
    getPopularSeries().then((data) => {
      if (mounted) {
        setPopularSeries(data.results);
      }
    });
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    let mounted = true;
    getTopRatedSeries().then((data) => {
      if (mounted) {
        setTopRatedSeries(data.results);
      }
    });
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    let mounted = true;
    getNowShowimgSeries().then((data) => {
      if (mounted) {
        setNowShowingSeries(data.results);
      }
    });
    return () => (mounted = false);
  }, []);

  const heroUnit = trending.map((ele) => {
    return (
      <HeroUnit
        key={ele.id}
        id={ele.id}
        title={ele.name}
        description={ele.overview}
        backdrop_path={ele.backdrop_path}
      ></HeroUnit>
    );
  });

  return (
    <>
      <Style>
        <Navbar />
        {heroUnit}
        <Category title={"Top Rated"} movieList={topRatedSeries} />
        <Category title={"Popular"} movieList={popularSeries} />
        <Category title={"Now Showing"} movieList={nowShowingSeries} />
      </Style>
      <Footer />
    </>
  );
}

export default Series;

const Style = styled.div`
  padding-bottom: 2rem;
  background: #343a40;
  min-height: 100vh;
  color: white;
  h1 {
    padding-left: 1rem;
  }
  .genre {
    width: fit-content;
    padding: 1rem;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-contents: center;
    margin: 20px;
    color: white;
    .genre-title {
      text-align: center;
      font-size: 1.2rem;
      margin: 1rem;
    }
  }

  svg:not(:root).svg-inline--fa {
    overflow: visible;
  }
  .svg-inline--fa.fa-w-10 {
    width: 0.625em;
  }
`;
