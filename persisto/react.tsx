import { useContext, createContext, useState, useEffect } from "react";

const LocalStateContext = createContext<Record<string, string> | null>(null);

export function LocalStateProvider({
	children,
	state,
}: {
	children: React.ReactNode;
	state: Record<string, string>;
}) {
	const isServer = typeof document === "undefined";
	return (
		<>
			<script
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: `window.__persisto_data = ${isServer ? JSON.stringify(state) : "window.__persisto_data"}`,
				}}
			/>
			<LocalStateContext.Provider
				value={isServer ? state : window.__persisto_data }
			>
				{children}
			</LocalStateContext.Provider>
		</>
	);
}

export function usePersistantState(key: string, defaultValue: any) {
	const localState = useContext(LocalStateContext);
	const [value, setValue] = useState(
		localState && key in localState ? JSON.parse(localState[key]) : {v: defaultValue},
	);
	console.log("value", localState)
	useEffect(() => {
		if (value.v === defaultValue) {
			localStorage.removeItem(key);
		} else {
			localStorage.setItem(key, JSON.stringify(value));
		}
	}, [value]);

	// function subscribe() {
	// 	function sub(event: StorageEvent) {
	// 		if (event.key === key) {
	// 			if (event.newValue === defaultValue) {
	// 				localStorage.removeItem(key);
	// 			} else {
	// 				setValue(JSON.parse(event.newValue ?? "") ?? null);
	// 			}
	// 		}
	// 	}
	// 	addEventListener("storage", sub);

	// 	return () => {
	// 		removeEventListener("storage", sub);
	// 	};
	// }
	// const snapshot = useSyncExternalStore(subscribe, () =>
	// 	localStorage.getItem(key)
	// );
	console.log("beforehookreturn", value)
	return [value["v"], (v: any) => setValue({ v })];
}
