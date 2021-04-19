import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#ee98fb",
        },
        secondary: {
            main: "#43af3b",
        },
        error: {
            main: red.A400,
        },
        background: {
            paper: "#3d3d3d",
        }
    },
});

export default theme;
