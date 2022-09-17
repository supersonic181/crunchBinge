const { default: axios } = require("axios");

// Get user profile details
export const profile = async () => {
    try {
        const config = {
            headers: {
                "Content-type": "application/json"
            },
            withCredentials: true
        }

        const response = await axios.get(
            "http://localhost:5000/api/users/getUser",
            config
        );

        return response.data;
    }
    catch (err) {
        console.log(err);
        alert("Unauthorized Access");
        window.location.href = "/";
    }
};