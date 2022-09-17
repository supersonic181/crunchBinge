// importing all the components from material ui.
import { Box, Grid, Container, Typography, TextField, Button } from "@mui/material";

// importing image 
import backdrop from "../../../../utils/Images/backdrop3.jpg";

// importing for search validation
import { useFormik } from "formik";
import * as yup from "yup";
import SearchResult from "../SearchResult/SearchResult";
import { useState } from "react";

// creating a validation schema that will to validate search
const validationSchema = yup.object({
    search: yup.string()
        .required("Input is required")
});

const SearchBar = () => {
    const [search, setSearch] = useState({ name: '' });

    // creating formik
    const formik = useFormik({
        initialValues: {
            search: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setSearch({ name: values.search });
            document.getElementById('searchResult').scrollIntoView({ behavior: 'smooth' });
        }
    })

    return (
        <>
            <Box sx={{ borderBottom: "8px solid #1B1c25" }} id="top">
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
                    {/* Contains all the text and the search textfield and a button */}
                    <Container maxWidth="md" sx={{ position: "absolute", top: "35%", zIndex: 1000 }}>
                        <Typography variant="h2" color="#ebecf1" component="h1" fontWeight="700" textAlign="center">
                            Binge unlimited Movies, Tv and Webshows.
                        </Typography>
                        <Typography variant="h6" color="#ebecf1" textAlign="center" sx={{ m: 4 }}>
                            Ready to Binge. Search for the Movie or Series here.
                        </Typography>

                        {/* creating a form which is handeled with the help of formik and validated with yup */}
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container sx={{}}>
                                <Grid item xs>
                                    <TextField
                                        required
                                        id="search"
                                        name="search"
                                        variant="filled"
                                        label="Search"
                                        fullWidth
                                        value={formik.values.search}
                                        onChange={formik.handleChange}
                                        error={formik.touched.search && Boolean(formik.errors.search)}
                                        helperText={formik.touched.search && formik.errors.search}
                                        sx={{ bgcolor: "common.white" }}
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
                                        sx={{ height: "100%", width: "100%", borderRadius: "2px" }}
                                    >
                                        Search
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Container>
                </Box>
            </Box>
            <SearchResult name={search.name} />
        </>
    )
}

export default SearchBar;