const { default: axios } = require("axios");

export const logout = async () => {
    try {
        await axios.delete(
            "http://localhost:5000/api/users/logout",
            { withCredentials: true }
        );
        return "success";
    } catch (error) {
        console.log(error);
    }
}

// module.exports = {
//     logout
// }