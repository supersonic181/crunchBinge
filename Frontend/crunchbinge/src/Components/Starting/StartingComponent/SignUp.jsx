import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { signUp } from "../../../Service/signUp";
import "./css/style.css"

import {
    AppBar,
    Box,
    Button,
    Container,
    FormControl,
    Grid,
    InputAdornment,
    TextField,
    Toolbar,
    Typography,
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Footer from "../../Footer/Footer";
import { useFormik } from "formik";
import * as yup from "yup";
import LoginModal from "./LoginModel";
import Loading from "../../Loading/Loading";
import Alerts from "../../Alert/Alert";
import Success from "../../Alert/Success";

const style = {
    position: 'relative',
    width: 400,
    bgcolor: "#1b1c25",
    boxShadow: 24,
    p: 4,
    marginTop: "40px"
};

const validationSchema = yup.object({
    userName: yup
        .string("Enter username")
        .required("Username is required"),
    email: yup
        .string("Enter your mail id")
        .email()
        .required("Mail is required"),
    password: yup
        .string("Enter your password")
        .min(6, "Password should be atleast 6 charachters")
        .required("Password is required")
})

const emailValue = (email) => {
    if (email === null) {
        return "";
    } else {
        return email;
    }
}

const mailCheck = (email) => {
    if (email === "") {
        return true;
    } else {
        return false;
    }
}

const SignUp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [success, setSuccess] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const mail = mailCheck(location.state.email);
    const [showPassword, setShowPassword] = useState(false);
    const formik = useFormik({
        initialValues: {
            email: emailValue(location.state.email),
            password: "password",
            userName: ""
        },
        validationSchema: validationSchema,
        onSubmit: async ({ email, userName, password }) => {
            let err = false;
            const res = await signUp(email, userName, password);
            res
                .then((data) => setLoading(false))
                .catch((error) => {
                    err = true;
                    setError(error.response.data.message);
                    setLoading(false);
                })

            if (!err) {
                setSuccess(true);
            }
        }
    })
    return (
        <>

            <AppBar
                sx={{
                    bgcolor: "black",
                    padding: "20px 20px",
                    position: "absolute"
                }}
                elevation={0}
            >
                <Toolbar>
                    <Grid container alignItems="Center" spacing={2}>
                        <Grid item xs>
                            <Typography className="cb" variant="h2" color="primary" fontWeight="800" component="a" onClick={() => navigate("/")}>
                                crunchBinge
                            </Typography>
                        </Grid>
                        <Grid item xs="auto">
                            <Button color="primary" variant="contained" onClick={handleOpen}>
                                Sign in
                            </Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>

            <Box
                sx={{
                    position: "relative",
                    backgroundColor: "#0f0f0f",
                    width: "100%",
                    height: 650,
                    padddingTop: "10%",
                    paddingBottom: "10%",
                    display: "flex",
                    borderBottom: "8px solid #1b1c25",
                    justifyContent: "center",
                    marginTop: 12
                }}>

                <Container maxWidth="md"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "60px"
                    }}
                >

                    {/* creating a form which is handeled with the help of formik and validated with yup  */}
                    <Box sx={style} style={{ color: "#206a5d" }}>
                        <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
                            Sign Up
                        </Typography>
                        {loading && <Loading />}
                        {(error) && <Alerts error={error} />}
                        {(success) && <Success />}
                        <form onSubmit={formik.handleSubmit}>
                            <FormControl sx={{ mb: 4 }} fullWidth>
                                <TextField
                                    id="userName"
                                    name="userName"
                                    label="Enter username"
                                    variant="filled"
                                    onChange={formik.handleChange}
                                    error={formik.touched.userName && Boolean(formik.errors.userName)}
                                    helperText={formik.touched.userName && formik.errors.userName}
                                    style={{
                                        backgroundColor: "white"
                                    }}
                                />
                            </FormControl>
                            <FormControl sx={{ mb: 4 }} fullWidth>
                                <TextField
                                    disabled={!mail}
                                    required={mail}
                                    id="email"
                                    name="email"
                                    label="Enter your mail"
                                    variant="filled"
                                    value={(!mail) ? location.state.email : formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                    style={{
                                        backgroundColor: "white"
                                    }}
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <TextField
                                    required
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    label="password"
                                    variant="filled"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Button onClick={() => setShowPassword(!showPassword)}>
                                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                </Button>
                                            </InputAdornment>
                                        )
                                    }}
                                    onChange={formik.handleChange}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                    style={{
                                        backgroundColor: "white"
                                    }}
                                />
                            </FormControl>
                            <Button
                                type="S"
                                variant="contained"
                                fullWidth
                                size="large"
                            >
                                Sign Up
                            </Button>
                        </form>
                        <Grid container sx={{ my: 1 }}>
                            <Typography color="primary" variant="caption" component="a" href="#">
                                Need help?
                            </Typography>
                        </Grid>
                        <Grid>
                            <Typography component="span" color="primary">
                                Already a member{"  "}
                            </Typography>
                            <Typography color="primary" component="a" onClick={handleOpen}>
                                &nbsp;Sign in.
                            </Typography>
                        </Grid>
                    </Box>
                </Container>
            </Box>
            <Footer />
            <LoginModal
                open={open}
                closeModal={handleClose}
            />
        </>
    );
}

export default SignUp;