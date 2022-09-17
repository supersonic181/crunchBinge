import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { addToList } from '../../Service/watchLater';
import { addToWatched } from '../../Service/watchHistory';
import AlertWatchLater from '../Alert/AlertWatchLater';
import { profile } from "../../Service/profile";


function HeroUnit(detail) {

    const url = "https://image.tmdb.org/t/p/original" + detail.backdrop_path;
    const style = {
        trendingPoster: {
            // backgroundColor: "black",
            backgroundImage: `url(${url})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            height: "650px",
            width: "100%",
            opacity: 0.7,
        }
    }

    const [user, setUser] = React.useState("");
    const [later, setLater] = React.useState(false);
    var wL = [];

    React.useEffect(() => {
        async function fetchProfile() {
            let mounted = true;
            const data = await profile();
            if (mounted) {
                setUser(data.watchLater);
            }
            return () => mounted = false;
        }
        fetchProfile();
    }, []);

    const watchLater = (id) => {
        if (user.includes(id) || wL.includes(id)) {
            setLater(true);
            console.log("Already exists");
        } else {
            let res = addToList(id);
            res
                .then((res) => alert("Movie added to watch later."))
                .catch((err) => alert("Movie already added to list."));
            wL.push(id);
        }
    }

    const watchNow = (id) => {
        window.location.href = "./Watchnow/" + id;
    }

    const addToHistory = (id) => {
        let res = addToWatched(id);
        res.then((res) => alert("Movie added to history"));
    }

    return (
        <div sx={{ bgColor: "black" }} style={style.trendingPoster}>
            {/* Hero unit */}
            <Box
                sx={{
                    pt: "20%",
                    pb: 2,
                }}
            >
                {(later) && <AlertWatchLater msg={detail.title + " is already added."} />}

                <Container maxWidth="md" sx={{ float: "left", zIndex: 1000 }} align="left">
                    <Typography variant="h6" color="white" width="25%" paragraph>
                        Trending this week
                    </Typography>
                    <Typography variant="h3" color="white" component="h1" fontWeight="700" sx={{ width: "60%" }}>
                        {detail.title}
                    </Typography>
                    <Typography variant="body1" color="#ebecf1" paragraph>
                        {detail.description}
                    </Typography>
                    <Stack
                        sx={{ pt: 4 }}
                        direction="row"
                        spacing={2}

                    >
                        <Button variant="contained" color="success" onClick={() => { watchNow(detail.id); addToHistory(detail.id) }}>Watch Now</Button>
                        <Button variant="contained" color="error" onClick={() => watchLater(detail.id)}>Watch Later</Button>
                    </Stack>
                </Container>
            </Box>
        </div>
    )
}

export default HeroUnit