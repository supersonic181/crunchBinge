import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import BasicDetails from "./BasicDetails";
import WatchHistory from "./WatchHistory";
import { getHistory } from "../../Service/watchHistory";
import {
  Box,
  Container,
  Typography
} from "@mui/material";
import HistoryIcon from '@mui/icons-material/History';
import { profile } from "../../Service/profile";

function Profile(props) {

  const [prof, setProfile] = useState({
    name: "",
    email: ""
  });

  const [list, setList] = useState([]);

  useEffect(() => {
    async function fetchProfile() {
      let mounted = true;
      const data = await profile();
      if (mounted) {
        setProfile({
          name: data.userName,
          email: data.email
        })
      }
      return () => mounted = false;
    }
    fetchProfile();
  }, []);

  useEffect(() => {
    async function fetchlist() {
      let mounted = true;
      await getHistory()
        .then(data => {
          if (mounted) {
            setList(data);
          }
        })
      return () => mounted = false;
    }
    fetchlist();
  }, []);

  const watchHistoryList = list.map((id) => {
    return <WatchHistory key={id} id={id} />
  })


  var dayPhase;
  var time = new Date();
  var hour = time.getHours();
  if (hour >= 6 && hour < 12) {
    dayPhase = "Good Morning";
  } else if (hour >= 12 && hour < 18) {
    dayPhase = "Good Evening";
  } else {
    dayPhase = "Good Night";
  }

  return (
    <Style>
      <Navbar />
      <BasicDetails profile={prof} />
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
              {dayPhase} {" "} {prof.name} {","}
            </Typography>
            <Typography
              variant="h5"
              component="div"
              color="common.white"
              sx={{ pb: 4 }}
            >
              Your Watch History will be updated here
            </Typography>
            <Container
              sx={{ display: "block" }}
            >
              {(list.length === 0) ?
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center"
                  }}
                >
                  <HistoryIcon
                    style={{
                      width: "250px",
                      height: "250px",
                    }}
                  />
                </Box>
                : watchHistoryList}
            </Container>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Style>
  );
}

export default Profile;

const Style = styled.main`
  width: 100%;
  background: #343a40;
  padding:  0;
`;
