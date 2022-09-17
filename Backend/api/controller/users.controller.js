const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwt_secret_key = "qwerty123zxcv465lkjh789avi";
const sgMail = require('@sendgrid/mail')
const userModel = require("../modals/users.entity");

// Register
const userRegistration = async (req, res) => {
    console.log("working");
    // destructuring the body and getting the values
    const { userName, email, password } = req.body;

    // To check whether the user is already registered or not
    const user = await userModel.findOne({ email: email });
    if (user) {
        res.status(400).send({ "message": "Email already exists" });
        console.log("Already Registered");
    } else {
        if (userName && email && password) {
            try {
                const un = await userModel.findOne({ userName: userName });
                if (un) {
                    res.status(400).send({ "message": "username already taken" });
                }
                else {
                    const salt = await bcrypt.genSalt(10);
                    const hashPassword = await bcrypt.hash(password, salt);
                    const user = new userModel({
                        userName: userName,
                        email: email,
                        password: hashPassword
                    });
                    await user.save()
                    const saved_user = await userModel.findOne({ email: email });

                    // Generating jwt token
                    const token = jwt.sign({ userID: saved_user._id }, jwt_secret_key, { expiresIn: "10d" });
                    const details = { password, ...saved_user }
                    res.status(200).json({ ...details, token });
                    console.log("Signup Successful");
                }
            } catch (error) {
                console.log(error);
            }
        }
        else {
            console.log("All fields are required");
            res.send({ "status": "Registration failed", "message": "All fields are required" });
        }
    }
}

const userLogin = async (req, res) => {
    console.log("Login block reached");
    try {
        const { email, password } = req.body;
        if (email && password) {
            const user = await userModel.findOne({ email: email });
            if (user != null) {
                const isMatch = await bcrypt.compare(password, user.password);
                if ((user.email === email) && isMatch) {

                    // Generate JWT Token
                    const token = jwt.sign({ userID: user._id }, jwt_secret_key, { expiresIn: "10d" });
                    res.cookie("jwt", token, {
                        httpOnly: true,
                        maxAge: 24 * 60 * 60 * 1000
                    });
                    const { password, ...info } = user._doc;
                    res.status(200).json({ ...info, token });
                    console.log("Logged in Successfully");
                } else {
                    console.log("Wrong credentials");
                    res.status(400).send({ "message": "Either email or password not match" });
                }
            } else {
                console.log("User not registered");
                res.status(400).send({ "message": "User is not registered please register" });
            }
        } else {
            console.log("All fields are required");
            res.status(400).send({ "message": "All Fields are required" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({ "message": "Unable to login" });
    }
}

const verifyUser = async (req, res) => {
    try {
        const email = req.body;
        console.log(email);
        const user = await userModel.findOne({ email: email.email });
        if (user === null) {
            res.status(400).send({ "message": "User doesn't exist" });
            res.end();
        }
        else {
            res.status(200).send({ "message": "User found" });
            res.end();
        }
    }
    catch (err) {
        console.log(err);
        res.status(400);
        res.end();
    }
}

const generateOTP = async (req, res) => {
    try {
        const key = process.env.sendgrid_key;
        const otp = Math.floor(1000 + Math.random() * 9000);
        sgMail.setApiKey(key);
        const email = req.body.email;
        const msg = {
            to: email,
            from: 'shubhamshaw181@gmail.com',
            subject: 'OTP for password reset',
            html: `Your otp to change the password is <strong>${otp}</strong>`,
        }
        sgMail
            .send(msg)
            .then(() => {
                res.status(200).send({ "OTP": otp });
                res.end();
            })
            .catch((error) => {
                console.error(error);
                res.status(400);
                res.end();
            })
    }
    catch (err) {
        console.log(err);
        res.status(400);
        res.end();
    }
}

const changePass = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const query = { "email": email };
        const newVal = { "password": hashPassword };
        const result = await userModel.findOneAndUpdate(query, newVal, {
            returnOriginal: false
        });

        if (result) {
            res.status(200).send({ "message": "Password changed successfully" });
            res.end();
        }
        else {
            throw new Error('Something went wrong');
        }
    }
    catch (err) {
        console.log(err);
        res.status(400);
        res.end();
    }
}

const getUsers = async (req, res) => {
    try {
        const cookie = req.cookies["jwt"];
        const claims = jwt.verify(cookie, jwt_secret_key)

        if (!claims) {
            return res.status(401).send({
                message: "Unauthenticated"
            })
        }

        const user = await userModel.findOne({ _id: claims.userID })
        const { password, ...data } = await user.toJSON()
        res.send(data);
    } catch (error) {
        return res.status(401).send({
            message: "Unauthenticated"
        })
    }
}

const logout = async (req, res) => {

    res.clearCookie('jwt');
    res
        .status(200)
        .json({ success: true, message: 'User logged out successfully' })
}

const watchLater = async (req, res) => {
    console.log("working later");
    try {
        const { id } = req.body;
        console.log(id)
        const cookie = req.cookies["jwt"];
        const claims = jwt.verify(cookie, jwt_secret_key)

        if (!claims) {
            return res.status(401).send({
                message: "Unauthenticated"
            })
        }

        const user = await userModel.findOne({ _id: claims.userID })
        const { password, ...data } = await user.toJSON()
        let email = user.email;

        await userModel.findOneAndUpdate({
            email: email
        }, {
            $addToSet: {
                watchLater: id
            }
        });
        res.status(200).send(data);
    } catch (error) {
        return res.status(401).send({
            message: "Unauthenticated"
        })
    }
}

const removeWatchLater = async (req, res) => {
    console.log("working later");
    try {
        const { id } = req.body;
        console.log(id)
        const cookie = req.cookies["jwt"];
        const claims = jwt.verify(cookie, jwt_secret_key)

        if (!claims) {
            return res.status(401).send({
                message: "Unauthenticated"
            })
        }

        const user = await userModel.findOne({ _id: claims.userID })
        const { password, ...data } = await user.toJSON()
        let email = user.email;

        await userModel.findOneAndUpdate({
            email: email
        }, {
            $pull: {
                watchLater: id
            }
        })
    } catch (error) {
        return res.status(401).send({
            message: "Unauthenticated"
        })
    }
}

const watchHistory = async(req, res) => {
    console.log("working history");
    try {
        const {id} = req.body;
        console.log(id)
        const cookie = req.cookies["jwt"];
        const claims = jwt.verify(cookie, jwt_secret_key)
    
        if (!claims) {
            return res.status(401).send({
                message: "Unauthenticated"
            })
        }
    
        const user = await userModel.findOne({_id: claims.userID})
        const {password, ...data} = await user.toJSON()
        let email = user.email;
        
        await userModel.findOneAndUpdate({
            email: email
        }, {
            $addToSet: {
                watched: id
            }
        })
        console.log("movie added to history");
    } catch (error) {
        return res.status(401).send({
            message: "Unauthenticated"
        })
    }
}

module.exports = {
    userRegistration,
    userLogin,
    getUsers,
    logout,
    watchLater,
    verifyUser,
    generateOTP,
    changePass,
    removeWatchLater,
    watchHistory
}