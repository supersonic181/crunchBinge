import * as React from 'react';
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    IconButton,
    Stack,
    Typography
} from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { addToWatched } from '../../../../Service/watchHistory';

export default function SearchResultCard(prop) {

    const watchNow = (id) => {
        window.location.href = "./Watchnow/" + id;
    }

    const addToHistory = (id) => {
        let res = addToWatched(id);
        res.then((res) => alert("Movie added to history"));
    }

    const url = "https://image.tmdb.org/t/p/w500" + prop.poster_path;
    return (
        <Card sx={{ display: 'flex', margin: 2, bgcolor: "common.black"}}>
            <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={url}
                alt={prop.title}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5" color="common.white">
                        {prop.title}
                    </Typography>
                    <Typography variant="subtitle1" color="common.white" component="div">
                        <b>Release Date:</b> {prop.release_date}
                    </Typography>
                    <Typography variant="subtitle1" color="common.white" component="div">
                        <b>Rating:</b> {prop.vote_average}
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <Stack
                        sx={{ pt: 4 }}
                        direction="row"
                        spacing={2}

                    >
                       <IconButton onClick={() => {watchNow(prop.id); addToHistory(prop.id)}}>
                            <PlayCircleOutlineIcon style={{ color: "white" }} />
                        </IconButton>
                    </Stack>
                </Box>
            </Box>

        </Card>
    );
}
