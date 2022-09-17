import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { verifyUser } from '../../Service/verifyUser';
import { useState } from 'react';
import { generateOTP } from '../../Service/otp';
import { changePass } from '../../Service/changePass';
import { logout } from '../../Service/logout';

const validationSchema = yup.object({
    email: yup
        .string('Enter your registered email')
        .email('Not a proper email')
        .required('Firstname is required')
});

const validationSchema1 = yup.object({
    otp: yup
        .number()
        .required("This field is requried")
});

const validationSchema2 = yup.object({
    password: yup.string().required('Password is required'),
    cpassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function Reset() {

    logout();

    const [otpNum, setOTP] = useState(null);
    const [email, setEmail] = useState(null);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [open1, setOpen1] = React.useState(false);
    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: validationSchema,
        onSubmit: (value) => {
            const verify = verifyUser(value.email)
            verify
                .then((res) => {
                    if (res !== 200) alert("User not found");
                    else {
                        generateOTP(value.email)
                            .then((res) => {
                                if (res.status !== 200) alert("Failed to send OTP, try again");
                                else {
                                    setOTP(res.data.OTP);
                                    setEmail(value.email);
                                    handleOpen();
                                }
                            })
                            .catch((error) => console.log(error));
                    }
                })
                .catch((err) => console.log(err));
        }
    });

    const formik2 = useFormik({
        initialValues: {
            otp: '',
        },
        validationSchema: validationSchema1,
        onSubmit: (value) => {
            if (otpNum === value.otp) {
                handleClose();
                handleOpen1();
                console.log("Otp matched");
            }
            else {
                alert("Invalid Otp");
            }
        }
    });

    const formik3 = useFormik({
        initialValues: {
            password: '',
            cpassword: ''
        },
        validationSchema: validationSchema2,
        onSubmit: (value) => {

            changePass(email, value.cpassword)
                .then((res) => {
                    if (res.status !== 200) alert("Failed to update password, try again");
                    else {
                        alert("Password updated successfully!");
                        window.location.href = "/";
                    }
                })
                .catch((error) => console.log(error));
        }
    });

    return (
        <React.Fragment>
            <Grid container sx={{ mx: 5 }}>
                <Button color="primary" variant="standard"  href="/">
                    Login
                </Button>
            </Grid>
            <Typography variant="h6" gutterBottom sx={{ px: 5 }}>
                Reset your password
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3} sx={{ px: 10 }}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="email"
                            name="email"
                            label="Email ID"
                            fullWidth
                            variant="standard"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type='S' variant="contained" color="success">
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={formik2.handleSubmit}>
                        <Grid container spacing={3} sx={{ px: 10 }}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id="otp"
                                    name="otp"
                                    label="One Time Password"
                                    fullWidth
                                    variant="standard"
                                    value={formik2.values.otp}
                                    onChange={formik2.handleChange}
                                    error={formik2.touched.otp && Boolean(formik2.errors.otp)}
                                    helperText={formik2.touched.otp && formik2.errors.otp}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type='S' variant="contained" color="success">
                                    Submit
                                </Button>
                            </Grid>

                        </Grid>
                    </form>
                </Box>
            </Modal>

            <Modal
                open={open1}
                onClose={handleClose1}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={formik3.handleSubmit}>
                        <Grid container spacing={3} sx={{ px: 10 }}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id="password"
                                    name="password"
                                    label="Password"
                                    fullWidth
                                    variant="standard"
                                    value={formik3.values.password}
                                    onChange={formik3.handleChange}
                                    error={formik3.touched.password && Boolean(formik3.errors.password)}
                                    helperText={formik3.touched.password && formik3.errors.password}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id="cpassword"
                                    name="cpassword"
                                    label="Confirm Password"
                                    type="password"
                                    fullWidth
                                    variant="standard"
                                    value={formik3.values.cpassword}
                                    onChange={formik3.handleChange}
                                    error={formik3.touched.cpassword && Boolean(formik3.errors.cpassword)}
                                    helperText={formik3.touched.cpassword && formik3.errors.cpassword}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type='S' variant="contained" color="success">
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Modal>

        </React.Fragment>
    );
}


export default Reset;