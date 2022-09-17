import { useNavigate } from "react-router-dom";

// importing all the components from material ui.
import {
    AppBar,
    Toolbar,
    Select,
    MenuItem,
    Box,
    Grid,
    Container,
    Typography,
    TextField,
    Button
} from "@mui/material";

// importing image 
import backdrop from "../../../utils/Images/backdrop3.jpg"

// importing for email validation
import { useFormik } from "formik";
import * as yup from "yup";

// creating a validation schema that will to validate email
const validationSchema = yup.object({
    email: yup
          .string("Enter your mail id")
          .email()
          .required("Mail is required")
});

const LandingHeader = ({ openModal }) => {

    // creating formik
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email : 'email'
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            navigate("/signup", {state: {email: values.email}});
        }
    })
    return(
        <Box sx={{borderBottom: "8px solid #1B1c25"}} id="top">
            {/* For the appbar which contains the crunchbinge logo the language selector and the sign in button */}
            <AppBar sx={{
                bgcolor: "transparent",
                padding: "20px 20px",
                position: "absolute"
                }}
                elevation={0}
            >
                <Toolbar>
                    <Grid container alignItems="Center" spacing={2}>
                        <Grid item xs>
                            <Typography variant="h2" color="primary" fontWeight="800">
                                crunchBinge
                            </Typography>
                        </Grid>
                        <Grid item xs="auto">
                            <Select name="lang" variant="outlined" size="small" defaultValue="EN" sx={{border: "2px solid #ebecf1", color: "#ebecf1", '& .MuiSelect-icon': {color: "#20645d"}}}>
                                <MenuItem value="HI">Hindi</MenuItem>
                                <MenuItem value="EN">English</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs="auto">
                            <Button color="primary" variant="contained" onClick={openModal}>
                                Sign in
                            </Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>

            {/* For the backdrop image and all the components in it */}
            <Box sx={{
                position: "relative",
                height: "745px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                '&::after': {
                    position: "absolute",
                    content: '""',
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                    background: 'rgba(0, 0, 0, 0.4)',
                    backgroundImage: `linear-gradient(
                        to bottom,
                        rgba(0, 0, 0, 0.7) 0,
                        rgba(0, 0, 0, 0) 60%,
                        rgba(0, 0, 0, 0.7) 100%
                    )`
                }
            }}>
               {/* backdrop image on which all the components are to be displayed. */}
               <img 
                  src={backdrop}
                  alt="backdrop crunchBinge"
                  style={{
                    // padding: 0,
                    height: "100%",
                    width: "100%",
                    objectFit: "cover"
                  }}
                />
                {/* Contains all the text and the email textfield and a button */}
                <Container maxWidth="md" sx={{position: "absolute", top: "35%", zIndex: 1000}}>
                    <Typography variant="h2" color="#ebecf1" component="h1" fontWeight="700" textAlign="center">
                        Binge unlimited Movies, Tv and Webshows.
                    </Typography>
                    <Typography variant="h5" color="#ebecf1" textAlign="center" gutterBottom>
                        Binge anywhere. Cancel anytime.
                    </Typography>
                    <Typography variant="h6" color="#ebecf1" textAlign="center" sx={{m: 4}}>
                        Ready to Binge. Enter your mail to login or Create a new account by signing up.
                    </Typography>

                    {/* creating a form which is handeled with the help of formik and validated with yup */}
                    <form onSubmit={formik.handleSubmit}>
                    <Grid container sx={{}}>
                        <Grid item xs>
                            <TextField
                                required
                                id="email"
                                name="email"
                                variant="filled"
                                label="Email address"
                                fullWidth
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                                sx={{bgcolor: "common.white"}}
                            />
                        </Grid>

                        {/* Button to login */}
                        <Grid item xs="auto">
                            <Button 
                              type="S"
                              fullWidth
                              variant="contained"
                              size="large"
                              color="primary"
                              sx={{height: "100%", width: "100%", borderRadius: "2px"}}
                            >
                                Binge
                            </Button>
                        </Grid>
                    </Grid>
                    </form>
                </Container>
            </Box>
        </Box>
    )
}

export default LandingHeader;