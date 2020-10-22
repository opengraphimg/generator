/** @jsx jsx */
// eslint-disable-next-line
import { jsx } from "@emotion/core";
import { render } from "react-dom";

// Styles
import Custom from "./styles/custom";

function App() {
  switch (window.style) {
    case "custom":
      <Custom />;
    default:
      return <Custom />;
  }
}

render(<App />, document.getElementById("app"));
