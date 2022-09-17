import React from "react";
import { Box, Container, Typography, Grid, Stack, Link } from "@mui/material";

//feedback, contact us, bact to top, privacy policy, terms and conditions, copyright
const Footer = () => {
    return (
        <Box sx={{ bgcolor: "common.black", zIndex: 1 }}>
            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Stack spacing={6}>

                    <Box>
                        <Grid item xs={6} md={3} textAlign="center">
                            <Link href="#top" underline="hover" variant="body1">
                                Back to top
                            </Link>
                        </Grid>
                    </Box>
                    <Box>
                        <Stack spacing={2} textAlign="center">
                            <Typography variant="body2" color="primary">
                                &copy;crunchBinge
                            </Typography>
                        </Stack>
                    </Box>
                </Stack>
            </Container>
        </Box>
    )
}

export default Footer;