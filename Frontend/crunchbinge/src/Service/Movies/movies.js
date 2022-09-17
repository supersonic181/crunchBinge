const { default: axios } = require("axios");

export const getPopularMovies = async () => {
  try {
    const res = await axios.get(
      "https://api.themoviedb.org/3/movie/popular?api_key=ffe1544c78a28e75a3247905c84cd3e9&language=en-US"
    );

    return res.data;
  } catch (err) {
    return err;
  }
};

export const getTopRatedMovies = async () => {
  try {
    const res = await axios.get(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=ffe1544c78a28e75a3247905c84cd3e9&language=en-US"
    );

    return res.data;
  } catch (err) {
    return err;
  }
};

export const getUpcomingMovies = async () => {
  try {
    const res = await axios.get(
      "https://api.themoviedb.org/3/movie/upcoming?api_key=ffe1544c78a28e75a3247905c84cd3e9&language=en-US"
    );

    return res.data;
  } catch (err) {
    return err;
  }
};

export const getNowShowimgMovies = async () => {
  try {
    const res = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=ffe1544c78a28e75a3247905c84cd3e9&language=en-US"
    );

    return res.data;
  } catch (err) {
    return err;
  }
};

export const getLatestMovie = async () => {
  try {
    const res = await axios.get(
      "https://api.themoviedb.org/3/movie/latest?api_key=ffe1544c78a28e75a3247905c84cd3e9&language=en-US"
    );

    return res.data;
  } catch (err) {
    return err;
  }
};

// module.exports = {
//   getPopularMovies,
//   getTopRatedMovies,
//   getUpcomingMovies,
//   getNowShowimgMovies,
//   getLatestMovie,
// };
