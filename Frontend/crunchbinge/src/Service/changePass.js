const { default: axios } = require("axios");

export const changePass = async (email, password) => {

    try {
        const config = {
            headers: {
                "Content-type": "application/json"
            },
            withCredentials: true
        }

        const response = await axios.post(
            "http://localhost:5000/api/users/changePass",
            {
                email,
                password
            },
            config
        );
        return response;
    }
    catch (err) {
        // console.log("Catch Block",err.response.status);
        return err.response;
    }
}

// module.exports = {
//     changePass
// }