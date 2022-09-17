import React, { useRef, useState, } from "react";
import {
  Box,
  Container,
  Typography
} from "@mui/material";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Cards from "./Cards/Card";


const CardView = ({ trending, type }) => {
  const [slide, setSlide] = useState(0);
  const [isMoved, setIsMoved] = useState(false);
  const listRef = useRef();
  const handleClick = (direction) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 50
    if (direction === "left" && slide >= 0) {
      setSlide(slide - 1);
      listRef.current.style.transform = `translateX(${230 + distance}px)`
    }
    if (direction === "right" && slide < 5) {
      setSlide(slide + 1)
      listRef.current.style.transform = `translateX(${-230 + distance}px)`
    }
  }

  return (
    <Box style={{ backgroundColor: "#1B2430", width: "100%", marginTop: "25px" }}>
      <Box>
        <Typography variant="h4" component="div" color="common.white">Today's Trending {type}</Typography>
        <Container style={{
          maxWidth: "none",
          padding: 0,
          position: "relative",
        }}>
          <KeyboardArrowLeftIcon style={{
            color: "white",
            width: "50px",
            backgroundColor: "rgba(22, 22, 22, 0.5)",
            height: "67%",
            position: "absolute",
            top: 32,
            left: 0,
            bottom: 0,
            zIndex: 100,
            cursor: "pointer",
            display: !isMoved && "none"
          }}
            onClick={() => handleClick("left")}
          />
          <Container
            ref={listRef}
            sx={{ py: 4, m: 1 , mb: 6}}
            style={{
              maxWidth: "none",
              display: "flex",
              width: "max-content",
              transform: "translateX(0)",
              transition: "all 1s ease",
            }}
          >
            {
              trending.map((detail, index) => {
                return (
                  <Cards
                    key={detail.id}
                    id={detail.id}
                    title={detail.title || detail.name}
                    description={detail.overview}
                    poster={"http://image.tmdb.org/t/p/w500" + detail.poster_path}
                    rating={detail.vote_average}
                    release={detail.release_date}
                    language={detail.original_language}
                    index={index}
                  />
                )
              })
            }
          </Container>
          <KeyboardArrowRightIcon style={{
            color: "white",
            width: "50px",
            backgroundColor: "rgba(22, 22, 22, 0.5)",
            height: "67%",
            position: "absolute",
            top: 32,
            right: 0,
            bottom: 0,
            zIndex: 99,
            cursor: "pointer"
          }}
            onClick={() => handleClick("right")}
          />
        </Container>
      </Box>
    </Box>
  )
}

export default CardView;