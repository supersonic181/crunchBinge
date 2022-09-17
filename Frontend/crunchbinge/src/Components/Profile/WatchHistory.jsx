import React, { useEffect, useState } from "react";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  IconButton,
  Stack,
  Typography
} from "@mui/material";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { getMovieByID } from "../../Service/GetByID/getByID";


function WatchHistory({id}) {

  const [detail, setDetail] = useState([]);

  useEffect(() => {
    async function fetchDetail() {
      let mounted = true;
      await getMovieByID(id)
      .then(data => {
        if (mounted) {
          setDetail(data)
        }
      });
      return () => mounted = false;
    }
    fetchDetail();
  }, [id]);

  const certificate = (detail.adult) ? "A" : "UA";
    
  const url = "http://image.tmdb.org/t/p/w500" + detail.poster_path;

  const watchNow = (id) => {
    window.location.href = "./Watchnow/" + id;
}

  return (
  <Container style={{padding: "10px"}}>
  <Card sx={{ display: 'flex', margin: 2, bgcolor: "black" }}>
            <CardMedia
                component="img"
                sx={{ width: 160 }}
                image={url}
                alt={detail.title}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto'}}>
                    <Typography component="div" variant="h5" color="common.white">
                        {detail.title || detail.name}
                    </Typography>
                    <Typography variant="subtitle1" color="common.white" component="div">
                        <b>{certificate}</b>
                    </Typography>
                    <Typography variant="subtitle1" color="common.white" component="div">
                        <b>Release Date:</b> {detail.release_date || detail.first_air_date}
                    </Typography>
                    <Typography variant="subtitle1" color="common.white" component="div">
                        <b>Rating:</b> {detail.vote_average}
                    </Typography>
                    <Typography variant="subtitle1" color="common.white" component="div">
                        <b>About:</b> {detail.overview}
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <Stack
                        sx={{ pt: 4 }}
                        direction="row"
                        spacing={2}

                    >
                        <IconButton onClick={() => {watchNow(detail.id)}}>
                            <PlayCircleOutlineIcon style={{ color: "white", width: "50px", height: "25px" }} />
                        </IconButton>
                    </Stack>
                </Box>
            </Box>
  </Card>
</Container>
  );
}

export default WatchHistory;

