import { createContext,  } from "solid-js";
import type { JSX } from "solid-js";
import { throttle } from "throttle-debounce";

const SAVE_TIMEOUT = 1000;

export class SaveApi {
	private readonly _throttledSave = throttle(
		SAVE_TIMEOUT,
		() => this._actuallySave(),
	);

	public constructor(
		private readonly _onSave?: (timestamp: Date) => void,
	) {}

	public async save() {
		this._throttledSave();
	}

	private async _actuallySave() {
		this._onSave?.(new Date());
	}
}

export interface SaveApiProviderProps {
	children?: JSX.Element;
	onSave?(timestamp: Date): void;
}

export const SaveApiContext = createContext<SaveApi>();

export function SaveApiProvider(props: SaveApiProviderProps) {
	return <SaveApiContext.Provider value={new SaveApi(props.onSave)}>
		{props.children}
	</SaveApiContext.Provider>;
}
