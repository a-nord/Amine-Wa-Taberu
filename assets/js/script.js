//=============================== DOM Traversal ===============================//
const searchInput = $("#search-bar");
const results = $(".results");
const searchBtn = $("#searchBtn");
const artistInfo = $("#artist-info");

//============================== Global Variables ==============================//
const apiKey = `eeb927aca555bdd1797a9ff27182de7f`;
const apiSecret = `09f025e237eebbd253e8eadfc9b9edfd`;

//================================= Functions =================================//

const getAnimeTrack = async (anime) => {
	results.empty();
	try {
		const animeResponse = await fetch(`https://api.animethemes.moe/search?q=${anime}`);

		const animeData = await animeResponse.json();
		console.log(animeData);

		const songs = animeData.search.songs.map((element) => element.title);
		console.log(songs);

		songs.forEach((element) => {
			const card = $(`<button type="button">${element} </button>`);
			card.on("click", () => {
				addTrackToLocal(element);
				window.location.href = "index2.html";
			});
			results.append(card);
		});
	} catch (error) {
		console.error("Error:", error);
	}
};

const getTrackInfo = async (track) => {
	console.log(1);
	try {
		const lastFmAPI = `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${track}&api_key=${apiKey}&format=json`;

		const trackResponse = await fetch(lastFmAPI);
		const trackData = await trackResponse.json();

		console.log(trackData);

		const firstTrack = trackData.results?.trackmatches?.track[0];

		if (firstTrack) {
			const artistName = firstTrack.artist;
			console.log(artistName);
			artistInfo.append(artistName);
		} else {
			console.log("No information found for the track");
		}
	} catch (error) {
		console.error(error);
	}
};

const addTrackToLocal = (track) => {
    localStorage.setItem("song", JSON.stringify(track))
}

searchBtn.on("click", (event) => {
	event.preventDefault(event);
	// Get the value from the input section from html
	getAnimeTrack(searchInput.val());
	searchInput.val("");
});

//===== Press 'Enter' on the input field to search ====//
searchInput.on("keydown", (event) => {
	if (event.key === "Enter") {
		event.preventDefault();
		getAnimeTrack(searchInput.val());
		searchInput.val("");
	}
});
