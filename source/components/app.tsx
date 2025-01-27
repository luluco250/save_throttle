import { createSignal } from "solid-js";
import { SaveApiProvider } from "../contexts/save-api";
import { SaveButton } from "./save-button";

export function App() {
	const [saveText, setSaveText] = createSignal("Not saved yet.");

	return <SaveApiProvider
		onSave={timestamp => {
			setSaveText(`Saved: ${timestamp.toISOString()}`);
		}}
	>
		<h1>{saveText()}</h1>
		<SaveButton/>
	</SaveApiProvider>;
}
