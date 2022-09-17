import * as React from 'react';
import { searchByName } from '../../../../Service/SearchResult/Search';
import SearchResultCard from '../CardView/CardViewS';
import {
    Box,
    Container,
    Typography
} from "@mui/material";
import styled from "styled-components";
import SearchIcon from '@mui/icons-material/Search';

export default function SearchResult(prop) {

    const [detail, setDetail] = React.useState([]);

    React.useEffect(() => {
        async function fetchDetail(name) {
            let mounted = true;
            await searchByName(name)
                .then(data => {
                    if (mounted) {
                        setDetail(data.results);
                    }
                })
            return () => mounted = false;
        }
        if(prop.name)
        {
            fetchDetail(prop.name);
        }
    }, [prop.name])

    let searchResult = 'No Result Found';
    if(prop.name)
    {
        searchResult = detail.map((ele) => {
            return <SearchResultCard key={ele.id} id={ele.id} title={ele.title} release_date={ele.release_date} poster_path={ele.poster_path} vote_average={ele.vote_average}/>
        })
    }

    return (
<Style>
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
            variant="h5"
            component="div"
            color="common.white"
            sx={{ pb: 4 }}
          >
            Search results here:-
          </Typography>
          <Container 
            sx={{display: "block"}}
          >
            {(detail.length === 0) ?
            <Box>
            <Box
               style={{
                    display: "flex",
                    justifyContent: "center"
               }}
            >
              <SearchIcon
                style={{
                    width: "250px",
                    height: "250px",
                }}
              />
            </Box>
            <Typography variant="h6" color="#ebecf1" textAlign="center" sx={{ m: 4 }}>
                    No serach available
                </Typography>
            </Box> 
             :searchResult}
          </Container>
        </Box>
      </Box>
    </Box>  
    </Style>
    );
}

const Style = styled.main`
  width: 100%;
  background: #343a40;
  padding:  0;
`;
