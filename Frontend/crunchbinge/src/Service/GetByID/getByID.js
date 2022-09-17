const { default: axios } = require("axios");

export const getMovieByID = async (id) => {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=ffe1544c78a28e75a3247905c84cd3e9&language=en-US`;
    console.log(url);
    try {
        const res = await axios.get(url);
        console.log("gogo")
        console.log(res);
        return res.data;
    } catch (err) {
        const url = `https://api.themoviedb.org/3/tv/${id}?api_key=ffe1544c78a28e75a3247905c84cd3e9&language=en-US`;
        const res = await axios.get(url);
        return res.data;
    }
}


// module.exports = {
//     getMovieByID
// }