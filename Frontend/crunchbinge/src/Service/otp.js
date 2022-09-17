const { default: axios } = require("axios");

export const generateOTP = async (email) => {

    try {
        const config = {
            headers: {
                "Content-type": "application/json"
            },
            withCredentials: true
        }

        const response = await axios.post(
            "http://localhost:5000/api/users/generateOTP",
            {
                email
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
//     generateOTP
// }