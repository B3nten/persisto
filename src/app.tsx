import { Route, Switch } from "wouter";
import HomePage from "./pages/Home.tsx";
import AboutPage from "./pages/About.tsx";
import { LocalStateProvider } from "../persisto/react.tsx";

export default function App({ localState }: { localState: any }) {

	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<title>with-wouter</title>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="shortcut icon" href="/favicon.ico" />
				<script src="../persisto/browser.js" defer />
			</head>
			<body>
				<LocalStateProvider state={localState}>
					<nav style={{paddingBottom: "16px"}}>
						<a data-persist href="/" style={{marginRight: "16px"}}>
							Counter
						</a>
						<a data-persist href="/about">
							About
						</a>
					</nav>
					<main>
						<Switch>
							<Route path="/">
								<HomePage />
							</Route>
							<Route path="/about">
								<AboutPage />
							</Route>
							<Route>404</Route>
						</Switch>
					</main>
				</LocalStateProvider>
			</body>
		</html>
	);
}
