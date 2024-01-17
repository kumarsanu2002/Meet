import "@/styles/globals.css";

import { SocketProvider } from "@/context/socket";

export default function App({ Component, pageProps }) {
  return (
    //wrapping whole component in context api
    <SocketProvider>
      <Component {...pageProps} />
    </SocketProvider>
  );
}