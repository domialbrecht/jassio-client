import "../styles/globals.css";
import "../styles/util/scroll-animations.css";
import "../styles/util/scrollbar.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
