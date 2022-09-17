// For the Features section in the landing page
import React from "react";

// Created components used in the features page
import BorderContainer from "../../BorderedContainer/BorderContainer";

// All the material ui components used in the features.
import {
    Box,
    Container,
    Grid,
    Typography
} from "@mui/material";

// All the images used in the Features.
import tv from "../../../utils/Images/tv.png";
import mobile from "../../../utils/Images/mob.jpg"
import desktop from "../../../utils/Images/desktop.png"
import video1 from "../../../utils/videos/sacred.m4v"

// For the title of each component
const TextTitle = ({ text }) => (
    <Typography
      variant="h3"
      component="h2"
      gutterBottom
      sx={{textAlign: {xs: "center", md: "left"}}}
   >
      {text}
    </Typography>
);

// For the description of each component
const TextDescription = ( {text} ) => (
    <Typography
      variant="h5"
      component="h3"
      gutterBottom
      sx={{textAlign: {xs: "center", md: "left"}}}
   >
      {text}
    </Typography>
);


const Features = () => {
    return(
        <Box sx={{bgcolor: "black", color: "#ebecf1"}}>
            {/* For the first section in the features page containing tv image and a video */}
            <BorderContainer>
               <Container maxWidth="xl" sx={{py: 3}}>
                   <Grid container alignItems="center" columnSpacing={12}>
                       <Grid item xs={12} md={6}>
                          <TextTitle text="Binge on your TV." />
                          <TextDescription text=" Binge on Smart TVs, Playstations, Xbox, Chromecast, Apple TV, Blu-ray players and more." />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box sx={{position: "relative"}}>
                               <Box sx={{position: "relative", zIndex: 2}}>
                                  <img 
                                     src={tv}
                                     alt="tv"
                                     style={{
                                        width: "100%",
                                        height: "auto"
                                      }}
                                    />
                                </Box>
                                <Box
                                   sx={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    top: "3%",
                                    maxWidth: "86%",
                                    maxHeight: "87%"
                                   }}
                                >
                                    <video 
                                      src={video1}
                                      style={{
                                        height: "100%",
                                        width: "100%"
                                       }}
                                      autoPlay
                                      playsInline
                                      muted
                                      loop
                                    />
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </BorderContainer>

            {/* For the second section of the features page containing a mobile image */}
            <BorderContainer>
               <Container maxWidth="xl" sx={{py: 7}}>
                   <Grid container alignItems="center" columnSpacing={12}>
                   <Grid item xs={12} md={6}  sx={{order: { xs: 2, md: 1}}}>
                            <Box>
                                <img 
                                    src={mobile}
                                    alt="mobile"
                                    style={{
                                        width: "100%",
                                        height: "auto"
                                    }}
                                />
                            </Box>
                        </Grid>
                       <Grid item xs={12} md={6} sx={{order: { xs: 1, md: 2}}}>
                          <TextTitle text="Download your binge to watch offline." />
                          <TextDescription text="Download your favourites and binge whenever you want" />
                        </Grid>
                    </Grid>
                </Container>
            </BorderContainer>

            {/* For the third section of the features page containing a desktop image and a video. */}
            <BorderContainer>
               <Container maxWidth="xl" sx={{py: 7}}>
                   <Grid container alignItems="center" columnSpacing={12}>
                       <Grid item xs={12} md={6} sx={{order: { xs: 2, md: 1}}}>
                          <TextTitle text="Binge everywhere." />
                          <TextDescription text="Binge unlimited movies and TV shows on your phone, tablet, laptop and TV." />
                        </Grid>
                   <Grid item xs={12} md={6}>
                            <Box>
                                <img 
                                    src={desktop}
                                    alt="desktop"
                                    style={{
                                        width: "100%",
                                        height: "auto"
                                    }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </BorderContainer>
            
        </Box>
    )
}
export default Features;