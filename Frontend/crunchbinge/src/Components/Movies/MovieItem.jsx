import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Container } from "@mui/system";
import { addToList } from "../../Service/watchLater";
import { addToWatched } from "../../Service/watchHistory";
import AlertWatchLater from "../Alert/AlertWatchLater";
import { profile } from "../../Service/profile";


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

export const MovieItem = ({
  id,
  title,
  img,
  text,
  release,
  lang,
  backdrop,
  rating,
}) => {
  const url = "https://image.tmdb.org/t/p/original" + img;

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const watchNow = (id) => {
    window.location.href = "./Watchnow/" + id;
  };

  const [user, setUser] = React.useState("");
  const [name, setName] = React.useState("");
  const [later, setLater] = React.useState(false);
  var wL = [];

  React.useEffect(() => {
    async function fetchProfile() {
      let mounted = true;
      const data = await profile();
      if (mounted) {
        setUser(data.watchLater);
        setName(data.userName);
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
  };

  const addToHistory = (id) => {
    let res = addToWatched(id);
    res.then((res) => alert("Movie added to history"));
  }

  return (
    <>
      <div className="collection-item" onClick={handleOpen}>
        <div>
          <img
            src={url}
            onError={(e) => {
              e.currentTarget.src = { url }
              e.currentTarget.onerror = null;
            }}
            alt="movie"
            className="collection-item__movie-image"
          />
          <div className="collection-item__text">
            <h1 className="collection-item__title">{title}</h1>
            <span className="collection-item__overview">
              {text.length > 160 ? text.slice(0, 160) + "..." : text}
            </span>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          style={{
            backgroundColor: "black",
            color: "#ebecf1",
          }}
        >
          {(later) && <AlertWatchLater name={name} msg={title + " is already added."} />}

          <Box sx={{ display: "flex" }}>
            <Container
              sx={{
                display: "inline-block",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Typography variant="h4" component="h4" gutterBottom>
                {title}
              </Typography>
              <Typography variant="h5" component="h4" sx={{ mt: 2 }}>
                About:
              </Typography>
              <Typography variant="body1" textAlign="justify" gutterBottom>
                {text}
              </Typography>
              <Typography variant="h5" component="h4" sx={{ mt: 2 }}>
                Release Date:
              </Typography>
              <Typography variant="body1" gutterBottom>
                {release}
              </Typography>
              <Typography variant="h5" component="h4" sx={{ mt: 2 }}>
                Original Language:
              </Typography>
              <Typography variant="body1" gutterBottom>
                {lang}
              </Typography>
              <Typography variant="h5" sx={{ mt: 2 }}>
                Rating:
              </Typography>
              <Typography variant="body1" gutterBottom>
                {rating}
              </Typography>
            </Container>
            <Container align="center">
              <img src={url} width="80%" height="80%" alt={title}></img>
              <Button
                size="large"
                color="success"
                variant="contained"
                sx={{ width: "90%", marginBottom: 1 }}
                onClick={() => { watchNow(id); addToHistory(id) }}
              >
                Watch Now
              </Button>
              <Button
                size="large"
                color="error"
                variant="contained"
                sx={{ width: "90%", marginBottom: 1 }}
                onClick={() => watchLater(id)}
              >
                Watch Later
              </Button>
            </Container>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
