import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const base = createTheme({
    palette: {
        primary: {
            light: "#9ac27b0",
            main: "#206a5d"
        },
        secondary: {
            light: "#e53935",
            main: "#b71c1c"
        }
    }
});

const theme = responsiveFontSizes(base);

export default theme;

