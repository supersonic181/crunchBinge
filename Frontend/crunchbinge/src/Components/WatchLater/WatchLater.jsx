import { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import WatchLaterCard from './WatchLaterComponent/CardView';
import { getList } from '../../Service/watchLater';
import Footer from '../Footer/Footer';
import { 
    Box,
    Container, 
    Typography,
} from "@mui/material";
import styled from "styled-components";
import WatchLaterIcon from '@mui/icons-material/WatchLater';

function WatchLater() {
    const [list, setList] = useState([]);

    // Fetch Trending of this week in all category
    useEffect(() => {
        async function fetchlist() {
            let mounted = true;
            await getList()
                .then(data => {
                    if (mounted) {
                        setList(data);
                    }
                })
            return () => mounted = false;
        }
        fetchlist();
    }, [])

    const watchLaterList = list.map((ele) => {
        return <WatchLaterCard key={ele} id={ele} />
    })
    const emptyList = () => {
        return (
            <Typography variant='h1' component="div" color="common.white">
                You have nothing to watch Later
            </Typography>
        )
    }

    const [profile, setProfile] = useState({
        name: "",
        email: ""
      });
    
    
      useEffect(() => {
        async function fetchProfile() {
          let mounted = true;
          await profile()
            .then((data) => {
              if (mounted) {
                setProfile({
                  name: data.userName,
                  email: data.email
                })
              }
            })
          return () => mounted = false;
        }
        fetchProfile();
      }, []);


    var dayPhase;
    var time = new Date();
    var hour = time.getHours();
    if (hour >= 0 && hour < 12) {
      dayPhase = "Good Morning";
    } else if (hour >= 12 && hour < 18) {
      dayPhase = "Good Evening";
    } else {
      dayPhase = "Good Night";
    }

    return (
        // <div>
        //     <Navbar />
        //     {(list.length === 0) ? <Typography variant='h1' component="div"> You have nothing to watch</Typography> :watchLaterList}
        //     <Footer />
        // </div>
        <Style>
        <Navbar />
        {/* <BasicDetails profile={profile} /> */}
        {/* {watchHistoryList} */}
        <Box>
        <Box
          style={{
            backgroundColor: "#1B2430",
            width: "100%",
            paddingTop: "25px",
          }}
        >
          <Box 
            style={{
              padding: "5px",
              borderBottom: "8px solid white"
            }}
          >
            <Typography
              variant="h2"
              component="div"
              color="common.white"
              sx={{ pt: 2 }}
              gutterBottom
            >
              {dayPhase} {" "} {profile.name} {","}
            </Typography>
            <Typography
              variant="h5"
              component="div"
              color="common.white"
              sx={{ pb: 4 }}
            >
              Your Watch Later will be updated here
            </Typography>
            <Container 
              sx={{display: "block"}}
            >
            {(list.length === 0) ?
            <Box
               style={{
                    display: "flex",
                    justifyContent: "center"
               }}
            >
              <WatchLaterIcon 
                style={{
                    width: "300px",
                    height: "300px",
                }}
              />
            </Box> 
             :watchLaterList}
            </Container>
          </Box>
        </Box>
      </Box>  
        <Footer />
      </Style>
    )
}

export default WatchLater;

const Style = styled.main`
  width: 100%;
  background: #343a40;
  padding:  0;
`;
