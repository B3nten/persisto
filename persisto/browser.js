const f = document.createElement("form");
f.setAttribute("method", "post");
const hi = document.createElement("input");
hi.setAttribute("type", "hidden");
hi.setAttribute("name", "__persisto_data");
f.appendChild(hi);
document.body.appendChild(f);
const e = document.querySelectorAll("a[data-persist]");
e.forEach((e) => {
	const h = e.href;
	e.addEventListener("click", (e) => {
		e.preventDefault();
		let keys = {}
		for (const [key, value] of Object.entries(localStorage)) {
			keys[key]=value
		  }
		hi.setAttribute("value", JSON.stringify(keys));
		f.setAttribute("action", h);
		f.submit();
	});
});
history.replaceState(null, null, location.href);
