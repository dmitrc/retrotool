import { createElement } from "react";
import { render } from "react-dom";
import { App } from "./components/App";
import { createSocket } from "./utils/Socket";

createSocket();

render(
    <App />,
    document.getElementById("app")
);