const { default: axios } = require("axios");

export const getMovieVideoList = async (id) => {
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=ffe1544c78a28e75a3247905c84cd3e9&language=en-US`;
    try {
        const res = await axios.get(url);
        return res.data;
    } catch (err) {
        return null;
    }
}
export const getTvVideoList = async (id) => {
    const url = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=ffe1544c78a28e75a3247905c84cd3e9&language=en-US`;
    try {
        const res = await axios.get(url);
        return res.data;
    } catch (err) {
        return null;
    }
}

export const getVideoIDList = async (id) => {
    const list = await getMovieVideoList(id) || await getTvVideoList(id);
    return list;
}



// module.exports = {
//     getVideoIDList
// }