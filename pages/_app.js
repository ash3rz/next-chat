/**
 * Needed for SSR
 * Copied from https://github.com/mui-org/material-ui/tree/master/examples/nextjs
 */

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import Head from "next/head";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import io from "socket.io-client";
import theme from "../src/theme";
import PropTypes from "prop-types";

const socket = io("http://localhost:3000");

const queryClient = new QueryClient();

export default function MyApp(props) {
    const { Component, pageProps } = props;

    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <React.Fragment>
            <Head>
                <title>Next Chat</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>
            <ThemeProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    <Component {...pageProps} socket={socket} />
                </QueryClientProvider>
            </ThemeProvider>
        </React.Fragment>
    );
}

MyApp.propTypes = {
    Component: PropTypes.func.isRequired, // the component to render
    pageProps: PropTypes.object, // props for the page
};
