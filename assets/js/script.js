//================= DOM Traversal =================//
const searchInput = $("#search-bar");
const results = $(".results");
const searchBtn = $("#searchBtn");
const song = $("#song");
const likeSongs = $("#liked-songs");
const clearHist = $("#clearHist");

//=================== Functions ==================//

//=== Search for Anime's songs ===//
const getAnimeTrack = async (anime) => {
	results.removeClass("bg-white");
	results.empty();
	try {
		const animeResponse = await fetch(`https://api.animethemes.moe/search?q=${anime}`);
		const animeData = await animeResponse.json();
		const songs = animeData.search.songs;

		// if there is a song then run the function
		if (songs.length !== 0) {
			results.addClass("bg-white");
			songs.forEach((element) => {
				// Make a button for each song, and a corresponding `👍` button
				const card = $(
					`<div>
					<button id="song" type="button" class="song relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"> <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0 min-w-full">${element.title}</span></button>
					
					<button type="button" class="likeBtn relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"> <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0 min-w-full">👍</span></button>
					</div>`
				);

				// Clicking the song will go to artist's info page
				card.find(".song").on("click", () => {
					addTrackToLocal(element.title);
					window.location.href = "index2.html";
				});

				// Clicking the `like` will add to favorite
				card.find(".likeBtn").on("click", () => {
					const favorite = element.title;
					addToFavorite(favorite);
				});

				// put both buttons on page
				results.append(card);
			});
		} else {
			results.append(`There's no songs with this title. Please try a different spelling`);
		}
	} catch (error) {
		console.error("Error:", error);
	}
}; // END

//=== Put liked songs to local storage ===//
const addToFavorite = (favorite) => {
	let addToFavorite = JSON.parse(localStorage.getItem("favorite"));

	// Make an array if it isn't
	if (!Array.isArray(addToFavorite)) {
		addToFavorite = [];
		// Only have 15 songs in array
	} else if (addToFavorite.length > 14) {
		addToFavorite.pop();
	}
	// Put new song on index[0] and add to local storage
	addToFavorite.unshift(favorite);
	localStorage.setItem("favorite", JSON.stringify(addToFavorite));
	displayFavorites();
}; // END

//=== Display songs from local storage ===//
const displayFavorites = () => {
	likeSongs.empty();
	const storedFavorites = JSON.parse(localStorage.getItem("favorite"));
	if (storedFavorites) {
		//make a button for each song in local storage
		storedFavorites.forEach((favoriteSong) => {
			const listSongs = $(
				`<button class="relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"> <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0 min-w-full">${favoriteSong}</span></button>`
			);
			// clicked song will go to artist's page
			listSongs.on("click", () => {
				addTrackToLocal(favoriteSong);
				window.location.href = "index2.html";
			});

			// put buttons on page
			likeSongs.append(listSongs);
		});
	}
}; // END

//=== Put song name to local storage ===//
const addTrackToLocal = (track) => {
	localStorage.setItem("song", JSON.stringify(track));
}; // END

//============ Handlers =================//
searchBtn.on("click", (event) => {
	event.preventDefault(event);
	// Get the value from the input section from html
	getAnimeTrack(searchInput.val());
	searchInput.val("");
	results.val("");
});

//=== Press 'Enter' on the input field to search ===//
searchInput.on("keydown", (event) => {
	if (event.key === "Enter") {
		event.preventDefault();
		getAnimeTrack(searchInput.val());
		searchInput.val("");
		results.val("");
	}
});

//=== Clear favorites ===//
clearHist.on("click", (event) => {
	event.preventDefault(event);
	localStorage.removeItem("favorite");
	likeSongs.empty();
	likeSongs.removeClass("bg-white p-8 rounded")
});

// Init function
displayFavorites();
