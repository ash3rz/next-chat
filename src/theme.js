import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#8a0f9c",
        },
        secondary: {
            main: "#43af3b",
        },
        error: {
            main: red.A400,
        },
        background: {
            default: "#fff",
        },
    },
});

export default theme;
