//=============================== DOM Traversal ===============================//
const searchInput = $("#search-bar");
const results = $(".results");
const searchBtn = $("#searchBtn");
let likeBtn = $(".likeBtn");
const song = $("#song");
let favSong = $("favSong");
const likeSongs = $("#liked-songs");

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
			songs.forEach((element) => {
				const card = $(
					`<div>
					<button id="song" type="button" class="favSong text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">${element.title} </button>

					<button type="button" class="likeBtn text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Like</button>
					</div>`
				);
				// Add a click event for the favSong button
				card.find(".favSong").on("click", () => {
					addTrackToLocal(element.title);
					window.location.href = "index2.html";
				});

				// Add a click event for the likeBtn button
				card.find(".likeBtn").on("click", () => {
					const favorite = element.title;

					addToFavorite(favorite);
					console.log(`Liked: ${favorite}`);

				});

				results.append(card);
			});
		} else {
			results.append(`There's no songs with this title. Please try a different spelling`);
			//searchMoreAnime(animeData)
		}
	} catch (error) {
		console.error("Error:", error);
	}
}; // END

const addTrackToLocal = (track) => {
	localStorage.setItem("song", JSON.stringify(track));
};

const addToFavorite = (favorite) => {
	let addToFavorite = JSON.parse(localStorage.getItem("favorite"));

	if (!Array.isArray(addToFavorite)) {
		addToFavorite = [];
	} else if (addToFavorite.length > 14) {
		addToFavorite.pop();
	}

	addToFavorite.unshift(favorite);
	localStorage.setItem("favorite", JSON.stringify(addToFavorite));
};

const displayFavorites = () => {
	likeSongs.empty();
	const storedFavorites = JSON.parse(localStorage.getItem("favorite"));
	if (storedFavorites) {
		storedFavorites.forEach((favoriteSong) => {
			const listSongs = $(
				`<button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"> ${favoriteSong} </button>`
			);
			listSongs.on("click", () => {
				
				addTrackToLocal(favoriteSong);
				console.log(favoriteSong);
				window.location.href = "index2.html";
			});
			likeSongs.append(listSongs);
		});
	}
};
//============Handlers=================//
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

getAnimeTrack("pokemon"); //FIXME:
displayFavorites();
