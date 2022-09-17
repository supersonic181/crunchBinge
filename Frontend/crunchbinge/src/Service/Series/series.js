const { default: axios } = require("axios");

export const getPopularSeries = async () => {
  try {
    const res = await axios.get(
      "https://api.themoviedb.org/3/tv/popular?api_key=ffe1544c78a28e75a3247905c84cd3e9&language=en-US"
    );

    return res.data;
  } catch (err) {
    return err;
  }
};

export const getTopRatedSeries = async () => {
  try {
    const res = await axios.get(
      "https://api.themoviedb.org/3/tv/top_rated?api_key=ffe1544c78a28e75a3247905c84cd3e9&language=en-US"
    );

    return res.data;
  } catch (err) {
    return err;
  }
};

export const getNowShowimgSeries = async () => {
  try {
    const res = await axios.get(
      "https://api.themoviedb.org/3/tv/on_the_air?api_key=ffe1544c78a28e75a3247905c84cd3e9&language=en-US"
    );

    return res.data;
  } catch (err) {
    return err;
  }
};

// module.exports = {
//   getPopularSeries,
//   getTopRatedSeries,
//   getNowShowimgSeries,
// };
