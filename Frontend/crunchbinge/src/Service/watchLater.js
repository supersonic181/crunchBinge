const { default: axios } = require("axios");

export const getList = async () => {
    
    try {
        const config = {
            headers: {
              "Content-type":"application/json"
            },
            withCredentials: true
          }

        const response = await axios.get(
            "http://localhost:5000/api/users/getUser",
            config
        );
        const data = await response.data;
        console.log(data.watchLater);
        return data.watchLater;
    } catch (err) {
        return err;
    }
}
export const addToList = async (id) => {
    try {
        const config = {
            headers: {
                "Content-type":"application/json"
            },
            withCredentials: true
        }
        const response = await axios.post(
            "http://localhost:5000/api/users/watchLater", {
                id: id
            },
            config
        );
        console.log("added");
        return response;
    } catch (err) {
        return err;
    }
}

export const removeID = async (id) => {
    try {
        const config = {
            headers: {
                "Content-type":"application/json"
            },
            withCredentials: true
        }
        const response = await axios.post(
            "http://localhost:5000/api/users/removeWatchLater", {
                id: id
            },
            config
        );
        console.log("removed");
        return response;
    } catch (err) {
        return err;
    }
}
// module.exports = {
//     getList,
//     addToList,
//     removeID
// }