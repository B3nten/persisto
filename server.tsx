import { serve } from "https://deno.land/std@0.164.0/http/server.ts";
import { createServer } from "ultra/server.ts";
import { Router } from "wouter";
import staticLocationHook from "wouter/static-location";
import App from "./src/app.tsx";
import { SearchParamsProvider } from "./src/context/SearchParams.tsx";
import { persisto } from "./persisto/server.ts";

const server = await createServer({
	importMapPath:
		Deno.env.get("ULTRA_MODE") === "development"
			? import.meta.resolve("./importMap.dev.json")
			: import.meta.resolve("./importMap.json"),
	browserEntrypoint: import.meta.resolve("./client.tsx"),
});

server.all("*", async (context) => {
	/**
	 * Render the request
	 */
	const localState = await persisto.getData(context.req);
	console.log("localState", localState)
	const requestUrl = new URL(context.req.url);
	const result = await server.render(
		<Router hook={staticLocationHook(requestUrl.pathname)}>
			<SearchParamsProvider value={requestUrl.searchParams}>
				<App localState={localState} />
			</SearchParamsProvider>
		</Router>
	);
	return context.body(result, 200, {
		"content-type": "text/html",
	});
});

serve(server.fetch);
