import { ThemeProvider } from "@mui/material/styles";
import theme from "./utils/theme";
import LandingPage from "./Components/Starting/LandingPage/Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import SignUp from "./Components/Starting/StartingComponent/SignUp";
import Movies from "./Components/Movies/Movies";
import Series from "./Components/Series/Series";
import WatchLater from "./Components/WatchLater/WatchLater";
import WatchNow from "./Components/WatchNow/WatchNow";
import Search from "./Components/Search/Search";
import Profile from "./Components/Profile/Profile";
import Reset from "./Components/ResetPassword/Reset";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ThemeProvider theme={theme}>
              <LandingPage />
            </ThemeProvider>
          }
        ></Route>

        <Route path="/Profile" element={<Profile />}></Route>
        <Route path="/Home" element={<Home />}></Route>
        <Route path="/Movies" element={<Movies />}></Route>
        <Route path="/Series" element={<Series />}></Route>
        <Route path="/Watchlater" element={<WatchLater />}></Route>
        <Route path="/Watchnow/:id" element={<WatchNow />}></Route>
        <Route path="/Reset-Password" element={<Reset />}></Route>
        <Route
          path="/Search"
          element={
            <ThemeProvider theme={theme}>
              <Search />
            </ThemeProvider>
          }
        ></Route>

        <Route
          path="/Signup"
          element={
            <ThemeProvider theme={theme}>
              <SignUp />
            </ThemeProvider>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
