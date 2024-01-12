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

		const songs = animeData.search.songs;
		console.log(songs);
		if (songs.length !== 0) {
			//FIXME: make sure to change to `songs` out when done
			songs.forEach((element) => {
				const card = $(`<button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">${element.title} </button>`);
				card.on("click", () => {
					addTrackToLocal(element);
					window.location.href = "index2.html";
				});
				results.append(card);
			});
		} else {
			results.append(`There's no songs with this title. Please try a differnt spelling`);
			//searchMoreAnime(animeData)
		}
	} catch (error) {
		console.error("Error:", error);
	}
};
// END

// const searchMoreAnime = async (list) => {
//     console.log(`Got to searchMoreAnime`);
//     console.log(list);
//     const limti1Anime=list.search.anime.slice(0,1);
//     const moreAnime = limti1Anime[0].name
//    console.log(moreAnime)

// }
// // END

const addTrackToLocal = (track) => {
	localStorage.setItem("song", JSON.stringify(track));
};

searchBtn.on("click", (event) => {
	event.preventDefault(event);
	// Get the value from the input section from html
	getAnimeTrack(searchInput.val());
	searchInput.val("");
	results.val("");
});

//===== Press 'Enter' on the input field to search ====//
searchInput.on("keydown", (event) => {
	if (event.key === "Enter") {
		event.preventDefault();
		getAnimeTrack(searchInput.val());
		searchInput.val("");
		results.val("");
	}
});
