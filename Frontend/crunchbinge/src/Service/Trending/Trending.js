const { default: axios } = require("axios");

export const getTrendingAll = async () => {

    try {
        const res = await axios.get("https://api.themoviedb.org/3/trending/all/week?api_key=ffe1544c78a28e75a3247905c84cd3e9");
        return res.data;
    } catch (err) {
        return err;
    }
}

export const getTrendingMovie = async () => {

    try {
        const res = await axios.get("https://api.themoviedb.org/3/trending/movie/day?api_key=ffe1544c78a28e75a3247905c84cd3e9");
        return res.data;
    } catch (err) {
        return err;
    }
}

export const getTrendingTv = async () => {

    try {
        const res = await axios.get("https://api.themoviedb.org/3/trending/tv/day?api_key=ffe1544c78a28e75a3247905c84cd3e9");
        return res.data;
    } catch (err) {
        return err;
    }
}


// module.exports = {
//     getTrendingAll,
//     getTrendingMovie,
//     getTrendingTv
// }