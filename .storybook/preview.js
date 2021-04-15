import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../src/theme";

const withThemeProvider = (Story, context) => {
    return (
        <ThemeProvider theme={theme}>
            <Story {...context} />
        </ThemeProvider>
    );
};
export const decorators = [withThemeProvider];

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};
