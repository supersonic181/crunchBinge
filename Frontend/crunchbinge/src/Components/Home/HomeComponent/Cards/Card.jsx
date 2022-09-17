import React, { useState, useEffect } from "react";
import "./styles.css";

import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    IconButton,
    Modal,
    Stack,
    Typography
} from "@mui/material";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { addToList } from '../../../../Service/watchLater';
import { addToWatched } from "../../../../Service/watchHistory";
import AlertWatchLater from "../../../Alert/AlertWatchLater";
import { profile } from "../../../../Service/profile";


const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    height: "90%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    overflow: "auto",
};


const Cards = (movie) => {
    const [user, setUser] = useState("");
    const [name, setName] = useState("");
    const [later, setLater] = useState(false);
    var wL = [];

    useEffect(() => {
        async function fetchProfile() {
            let mounted = true;
            const data = await profile();
            if (mounted) {
                setUser(data.watchLater);
                setName(data.userName);
            }
            return () => mounted = false;
        }
    }, []);


    const certificate = (movie.adult) ? "A" : "UA";

    const url = "http://image.tmdb.org/t/p/w500" + movie.poster;


    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const watchLater = (id) => {
        if (user.includes(id) || wL.includes(id)) {
            setLater(true);
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
        <Container style={{ maxWidth: "232px" }}>
            <Card sx={{
                width: "225px",
                height: "125px",
                marginRight: "5px",
                overflow: "hidden",
                cursor: "pointer",
                bgcolor: "black",
            }}
                className="card"
                // style={{left: isHovered && movie.index  * 225 -50 + movie.index * 5}}
                onMouseEnter={() => setLater(false)}
            >
                {(later) && <AlertWatchLater name={name} msg={movie.title + " is already added."} />}
                <img
                    src={movie.poster}
                    alt={movie.title}
                    className="photos"
                />
                <CardActions style={{ paddingBottom: 0 }}>
                    <Stack direction="row">
                        <IconButton onClick={handleOpen}>
                            <PlayCircleOutlineIcon style={{ color: "white" }} />
                        </IconButton>
                        <IconButton onClick={() => watchLater(movie.id)} >
                            <WatchLaterIcon style={{ color: "white" }} />
                        </IconButton>
                    </Stack>
                </CardActions>
                <CardContent style={{ paddingBottom: "1px", paddingTop: "1px" }}>
                    <Typography variant="body2" component="div" color="common.white">
                        {movie.title}
                    </Typography>
                    <Typography variant="caption" component="div" color="common.white">
                        {certificate}
                    </Typography>
                    <Typography variant="caption" component="div" color="common.white">
                        Release Date: {" "} {movie.release}
                    </Typography>
                    <Typography variant="caption" component="div" color="common.white">
                        Rating: {" "} {movie.rating}
                    </Typography>
                </CardContent>
            </Card>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}
                    style={{
                        backgroundColor: "black",
                        color: "#ebecf1"
                    }}
                >
                    <Box sx={{ display: "flex" }} >
                        <Container sx={{ display: "inline-block", alignItems: "center", marginTop: 10 }}>
                            <Typography variant="h4" component="h4" gutterBottom>
                                {movie.title}
                            </Typography>
                            <Typography variant='h5' component="h4" sx={{ mt: 2 }}>
                                About:
                            </Typography>
                            <Typography variant="body1" textAlign="justify" gutterBottom>
                                {movie.description}
                            </Typography>
                            <Typography variant='h5' component="h4" sx={{ mt: 2 }}>
                                Release Date:
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {movie.release}
                            </Typography>
                            <Typography variant='h5' component="h4" sx={{ mt: 2 }}>
                                Original Language:
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {movie.language}
                            </Typography>
                            <Typography variant='h5' sx={{ mt: 2 }}>
                                Rating:
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {movie.rating}
                            </Typography>

                        </Container>
                        <Container align="center" >
                            <img src={url} width="80%" height="80%" alt={movie.title}></img>
                            <Button size="large" color="success" variant="contained" sx={{ width: "90%" }} onClick={() => { watchNow(movie.id); addToHistory(movie.id) }}>Binge</Button>
                        </Container>
                    </Box>
                </Box>
            </Modal>
        </Container>
    )
}

export default Cards;