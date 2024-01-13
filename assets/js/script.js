//================= DOM Traversal =================//
const searchInput = $("#search-bar");
const results = $(".results");
const searchBtn = $("#searchBtn");
const song = $("#song");
const likeSongs = $("#liked-songs");

//=================== Functions ==================//

//=== Search for Anime's songs ===//
const getAnimeTrack = async (anime) => {
	results.empty();
	try {
		const animeResponse = await fetch(`https://api.animethemes.moe/search?q=${anime}`);
		const animeData = await animeResponse.json();
		const songs = animeData.search.songs;

		// if there is a song then run the function
		if (songs.length !== 0) {
			songs.forEach((element) => {
				// Make a button for each song, and a corresponding `like` button
				const card = $(
					`<div>
					<button id="song" type="button" class="song text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">${element.title} </button>
					
					<button type="button" class="likeBtn text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Like</button>
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
}; // END

//=== Display songs from local storage ===//
const displayFavorites = () => {
	likeSongs.empty();
	const storedFavorites = JSON.parse(localStorage.getItem("favorite"));
	if (storedFavorites) {

		//make a button for each song in local storage
		storedFavorites.forEach((favoriteSong) => {
			const listSongs = $(
				`<button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"> ${favoriteSong} </button>`
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

// init function
displayFavorites();
