const { default: axios } = require("axios");

export const searchByName = async (name) => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=ffe1544c78a28e75a3247905c84cd3e9&query=${name}`;
    try {
        const res = await axios.get(url);
        return res.data;
    } catch (err) {
        return err;
    }
}


// module.exports = {
//     searchByName
// }