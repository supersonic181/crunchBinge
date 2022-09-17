import { useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getNowShowimgMovies
} from "../../Service/Movies/movies";
import { Category } from "./Category";
import HeroUnit from "../HeroUnit/HeroUnit";
import { getTrendingMovie } from "../../Service/Trending/Trending";

function Movies(props) {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowShowingMovies, setNowShowingMovies] = useState([]);
  const [trending, setTrending] = useState([]);

  // Fetch Trending of this week in Movie category
  useEffect(() => {
    let mounted = true;
    getTrendingMovie().then((data) => {
      if (mounted) {
        setTrending(data.results.slice(0, 1));
      }
    });
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    let mounted = true;
    getPopularMovies().then((data) => {
      if (mounted) {
        setPopularMovies(data.results);
      }
    });
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    let mounted = true;
    getTopRatedMovies().then((data) => {
      if (mounted) {
        setTopRatedMovies(data.results);
      }
    });
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    let mounted = true;
    getUpcomingMovies().then((data) => {
      if (mounted) {
        setUpcomingMovies(data.results);
      }
    });
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    let mounted = true;
    getNowShowimgMovies().then((data) => {
      if (mounted) {
        setNowShowingMovies(data.results);
      }
    });
    return () => (mounted = false);
  }, []);

  const heroUnit = trending.map((ele) => {
    return (
      <HeroUnit
        key={ele.id}
        id={ele.id}
        title={ele.title}
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
        <Category title={"Top Rated"} movieList={topRatedMovies} />
        <Category title={"Popular"} movieList={popularMovies} />
        <Category title={"Upcomings"} movieList={upcomingMovies} />
        <Category title={"Now Showing"} movieList={nowShowingMovies} />
      </Style>
      <Footer />
    </>
  );
}

export default Movies;

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
