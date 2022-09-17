const { default: axios } = require("axios");

// find user in db to let him/her login
export const login = async (email, password) => {
    console.log(email, password)
    try {
        const config = {
            headers: {
                "Content-type": "application/json"
            },
            withCredentials: true
        }

        const { data } = await axios.post(
            "http://localhost:5000/api/users/login",
            {
                email,
                password
            },
            config
        );

        return data;
    }
    catch (err) {
        return err;
    }
}
