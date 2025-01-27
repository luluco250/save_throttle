import { render } from "solid-js/web";
import { App } from "./components/app";

const root = document.getElementById("root");
if (root === null) {
	throw new Error("Root element is missing from the web page.");
}

render(() => <App/>, root);
