import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Button
} from "@mui/material";
import React from "react";
import styled from "styled-components";

function BasicDetails({ profile }) {
  return (
    <Style>
      <Card className="body">
        <Avatar
          alt="Remy Sharp"
          src={`${process.env.PUBLIC_URL}/default-profile.png`}
          sx={{ width: 96, height: 96 }}
        />
        <CardContent className="content">
          <Typography gutterBottom variant="h5" component="div">
            {profile.name}
          </Typography>
          <Typography variant="body2" className="sub-text">
            {profile.email}
          </Typography>
          <Button variant="standard" color="white" href="/Reset-Password">
            Forget Password?
          </Button>
        </CardContent>
      </Card>
    </Style>
  );
}

export default BasicDetails;

const Style = styled.div`
  /* height: 100vh; */

  .body {
    background: #5c7b9b;
    border-radius: 2px;
    margin: 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;

    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: white;
      .sub-text {
        margin: 0.3rem;
        color: #eceaea;
      }
    }
  }
  .pic {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }
`;
