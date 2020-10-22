/** @jsx jsx */
// eslint-disable-next-line
import { jsx } from "@emotion/core";
import { render } from "react-dom";

// Styles
import Classic from "./styles/classic";
import Custom from "./styles/custom";

function App() {
  switch (window.style) {
    case "classic":
      return <Classic />;
    case "custom":
      return <Custom />;
    default:
      return <Custom />;
  }
}

render(<App />, document.getElementById("app"));
