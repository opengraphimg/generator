/** @jsx jsx */
// eslint-disable-next-line
import { jsx } from "@emotion/core";
import { render } from "react-dom";

// Styles
import Modern from "./styles/modern";
import Devto from "./styles/devto";
import Classic from "./styles/classic";
import Custom from "./styles/custom";

function App() {
  switch (window.style) {
    case "modern":
      return <Modern />;
    case "devto":
      return <Devto />;
    case "classic":
      return <Classic />;
    case "custom":
      return <Custom />;
    default:
      return <Custom />;
  }
}

render(<App />, document.getElementById("app"));
