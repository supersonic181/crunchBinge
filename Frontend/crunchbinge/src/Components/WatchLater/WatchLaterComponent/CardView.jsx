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
import { getMovieByID } from '../../../Service/GetByID/getByID';
import { removeID } from '../../../Service/watchLater';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const removeThis = (id) => 
{
    removeID(id);
    window.location.reload(true);
}

export default function WatchLaterCard(prop) {

    const [detail, setDetail] = React.useState([]);
    
    React.useEffect(() => {
        async function fetchDetail() {
            let mounted = true;
            await getMovieByID(prop.id)
            .then(data => {
                if (mounted) {
                    setDetail(data);
                }
            })
            return () => mounted = false;
        }
        fetchDetail();
    }, [prop.id])

    const watchNow = (id) => {
        window.location.href = "./Watchnow/"+id;
    }

    const url = "https://image.tmdb.org/t/p/w500" + detail.poster_path;
    const certificate = (detail.adult) ? "A" : "UA";
    return (
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
                            <PlayCircleOutlineIcon style={{ color: "white" }} />
                        </IconButton>
                        <IconButton onClick={() => {removeThis(detail.id)}}>
                            <DeleteOutlineIcon style={{ color: "white" }} />
                        </IconButton>
                    </Stack>
                </Box>
            </Box>

        </Card>
    );
}
