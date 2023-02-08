export default function AboutPage() {
	return (
		<div>
			This is a simple example of how client state can be maintained
			through full page reloads.
			<br />
			By intercepting anchor tags with the <code>data-persist</code>{" "}
			attribute, the state is sent to the server via a form POST request.
			<br />
			The server can use this state to SSR the page, and the client can
			use it to hydrate the state.
			<br />
			This allows for a seamless experience for the user, and allows for
			the state to be persisted across page reloads.
			<br />
			<br />
			Try navigating back and forth, and notice that the counter state
			persists.
			<br />
      Try looking at the network tab in your browser's dev tools to see whats going on.
      <br />
      Notice what happens when you refresh the page.
		</div>
	);
}
