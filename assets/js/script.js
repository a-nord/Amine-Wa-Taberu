let getLyric = async (song) => {
	try {
		const apiKey = "rZnuDLVC0bYtT2J7ND-ReZbAYg0j1tRMIcUwH00_Nkm4LKfUaVs7brjH5yuiNsLE";
		const geniusAPI = `https://floating-headland-95050.herokuapp.com/https://api.genius.com/search?q=${encodeURIComponent(song)}`;

		const response = await fetch(geniusAPI, {
			headers: {
				Authorization: `Bearer ${apiKey}`,
			},
		});

		const data = await response.json();
		console.log(data);
	} catch (error) {
		console.error(error);
	}
};

getLyric(`hero's come back`)


// submitBtn.on("click", (event) => {
//     getLyric(`hero's come back`);
// })