import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    FormControl,
    Grid,
    InputAdornment,
    Modal,
    TextField,
    Typography
} from "@mui/material";

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useFormik } from "formik";
import * as yup from "yup";
import Loading from "../../Loading/Loading";
import Alerts from "../../Alert/Alert";
import { login } from "../../../Service/login";

const validationSchema = yup.object({
    email: yup
        .string("Enter your mail id")
        .email()
        .required("Mail is required"),
    password: yup
        .string("Enter your password")
        .min(6, "Password should be atleast 6 charachters")
        .required("Password is required")
})

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'rgba(0, 0, 0, .8)',
    boxShadow: 24,
    p: 4,
};

const LoginModal = ({ open, closeModal, history }) => {

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (redirect) {
            navigate("/home");
        }
    });

    const formik = useFormik({
        initialValues: {
            email: "email",
            password: "password"
        },
        validationSchema: validationSchema,
        onSubmit: async ({ email, password }) => {
            console.log(email, password);
            login(email, password)
                .then((data) => {
                    console.log(data);
                    setRedirect(true);
                    setLoading(false);
                })
                .catch((error) => {
                    setError(error.response.data.message);
                    setLoading(false);
                });
        }
    });

    return (
        <Modal
            open={open}
            onClose={closeModal}
        >
            <Box sx={style} style={{ color: "#206a5d" }}>
                <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
                    Sign In
                </Typography>
                {loading && <Loading />}
                {error && <Alerts error={error} />}

                <form onSubmit={formik.handleSubmit}>
                    <FormControl sx={{ mb: 4 }} fullWidth>
                        <TextField
                            required
                            id="email"
                            name="email"
                            label="Enter your mail"
                            variant="filled"
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
                    >Sign in</Button>
                </form>
                <Grid container sx={{ my: 1 }}>
                    <Typography color="primary" variant="caption" component="a" href="/Reset-Password">
                        Forget Password?
                    </Typography>
                </Grid>
                <Grid>
                    <Typography component="span" color="primary">
                        New to crunchBinge?{"  "}
                    </Typography>
                    <Typography color="primary" component="a" onClick={() => navigate("/signup", { state: { email: "" } })}>
                        &nbsp;Sign up now.
                    </Typography>
                </Grid>
            </Box>
        </Modal>
    );
}

export default LoginModal;