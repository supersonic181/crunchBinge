import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from '../Navbar/Navbar';
import HeroUnit from '../HeroUnit/HeroUnit';
import CardView from './HomeComponent/CardView';
import Footer from '../Footer/Footer';
import { getTrendingAll, getTrendingMovie, getTrendingTv } from '../../Service/Trending/Trending';
import { useEffect, useState } from 'react';
import { profile } from '../../Service/profile';

const theme = createTheme();

export default function Home() {

  const [trendingMovie, setTrendingMovie] = useState([]);
  const [trendingTv, setTrendingTv] = useState([]);
  const [trending, setTrending] = useState([]);

  // Fetch Trending of this week in all category
  useEffect(() => {
    let mounted = true;
    getTrendingAll()
      .then(data => {
        if (mounted) {
          setTrending(data.results.slice(0, 1));
        }
      })
    return () => mounted = false;
  }, []);

  // // get user profile info
  // useEffect(() => {
  //   async function fetchProfile() {
  //     let mounted = true;
  //     const res = await profile();
  //     res
  //       .then((data) => {
  //         if (mounted) {
  //           console.log(data);
  //         }
  //       })
  //     return () => mounted = false;
  //   }
  //   fetchProfile();
  // });

  // Fetch Trending Movie
  useEffect(() => {
    let mounted = true;
    getTrendingMovie().then((data) => {
      if (mounted) {
        setTrendingMovie(data.results);
      }
    });
    return () => (mounted = false);
  }, []);

  // Fetch Trending Tv Shows
  useEffect(() => {
    let mounted = true;
    getTrendingTv().then((data) => {
      if (mounted) {
        setTrendingTv(data.results);
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <main
        style={{
          backgroundColor: "#1B2430",
          display: "flex",
          flexWrap: "wrap",
          overflow: "hidden",
        }}
      >
        {heroUnit}
        <CardView trending={trendingMovie} type="Movie" />
        <CardView trending={trendingTv} type="Series" />
      </main>
      <Footer />
    </ThemeProvider>
  );
}
