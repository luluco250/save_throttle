import { createSignal, useContext } from "solid-js";
import { SaveApiContext } from "../contexts/save-api";

export function SaveButton() {
	const [saving, setSaving] = createSignal(false);
	const saveApi = useContext(SaveApiContext);

	return <button
		type="button"
		onclick={async () => {
			try {
				setSaving(true);
				await saveApi.save();
			} finally {
				setSaving(false);
			}
		}}
	>
		Save
	</button>;
}
