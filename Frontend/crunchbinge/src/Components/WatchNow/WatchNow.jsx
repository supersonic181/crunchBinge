import React, { Suspense } from 'react'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getVideoIDList } from '../../Service/VideoID/getVideoID';
import { Box, Container } from "@mui/material";

const VideoPlayer = React.lazy(() => import("./WatchNowComponent/VideoPlayer"));

const style = {
    position: 'relative',
    // top: '50%',
    // left: '50%',
    // transform: 'translate(-50%, -50%)',
    width: "100%",
    bgcolor: "#1b1c25",
    boxShadow: 24,
};

function WatchNow() {
    const [videoList, setVideoList] = useState([]);

    const id = useParams();

    useEffect(() => {
        async function getVideoList(id) {
            let mounted = true;
            await getVideoIDList(id)
                .then(data => {
                    if (mounted) {
                        setVideoList(data.results);
                    }
                })
            return () => mounted = false;
        }
        getVideoList(id.id);
    }, [id.id])

    let videoID = 'Loading...';
    if (videoList === '') {
        videoID = 'No Video is Available at the moment';
    }
    else {
        videoID = videoList.reverse().map((ele, index) => {
            return <Suspense fallback={<div style={{textAlign: "center"}}><b>Loading...</b></div>}>
                <VideoPlayer key={index} id={ele.key} title={ele.name} />
            </Suspense>
        })
    }

    return (
        <>
            <Navbar />
            <Box sx={{bgcolor: "black", color: "#ebecf1", py: 10, borderBottom: "8px solid #1b1c25"}}>
            <Container 
              maxWidth="xl" sx={{textAlign: "center",}}
              style={{
                backgroundColor: "rgb(23 23 23)",
                padding: "10%"
              }}  
            >
                <Box style={style}>
                {videoID}
                </Box>
            </Container>
            </Box>
            <Footer />
        </>
    )
}

export default WatchNow