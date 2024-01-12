//=============================== DOM Traversal ===============================//
const searchInput = $("#search-bar");
const results = $(".results");
const searchBtn = $("#searchBtn");


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
