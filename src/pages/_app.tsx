import type { AppProps } from "next/app";

import "global.css";
import theme from "theme";
import { ThemeProvider } from "@mui/material";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div {
          height: 100%;
        }
      `}</style>
      <style global jsx>{`
        body {
          margin: 0;
        }
      `}</style>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
