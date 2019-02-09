import { createElement } from "react";
import { render } from "react-dom";
import { App } from "./components/App";
import { createSocket } from "./socket";

createSocket();

render(
    <App />,
    document.getElementById("app")
);