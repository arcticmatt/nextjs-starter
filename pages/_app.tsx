import "@/css/global/Global.css";

// Colors
import "@/css/global/colors/ColorVariables.css";
import "@/css/global/colors/BackgroundColorClasses.css";
import "@/css/global/colors/ColorClasses.css";

// Fonts
import "@/css/global/fonts/FontClasses.css";
import "@/css/global/fonts/FontVariables.css";

import { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}

export default App;
