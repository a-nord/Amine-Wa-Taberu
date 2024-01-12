//=============================== DOM Traversal ===============================//
const searchInput = $("#search-bar");
const results = $(".results");
const searchBtn = $("#searchBtn");
let likeBtn = $(".likeBtn");
const song = $("#song");
let favSong = $("favSong");

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
					addTrackToLocal(element);
					window.location.href = "index2.html";
				});

				// Add a click event for the likeBtn button
				card.find(".likeBtn").on("click", () => {
					const favorite = element.title;
					
					addToFavorite(favorite);
					console.log(`Liked: ${favorite}`);
					// Add other actions for liking the song
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
	localStorage.setItem("song", JSON.stringify(track.title));
};

const addToFavorite = (favorite) => {
	// Get array in local storage
	let addToFavorite = JSON.parse(localStorage.getItem("favorite"));

	// Check to see if it is not an array
	if (!Array.isArray(addToFavorite)) {
		addToFavorite = [];

		// Delete the last index if array length is over 9
	} else if (addToFavorite.length > 14) {
		addToFavorite.pop();
	}

	// Add new city to beginning of the array and update local storage
	addToFavorite.unshift(favorite);
	localStorage.setItem("favorite", JSON.stringify(addToFavorite));
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


// likeBtn.on("click", (event) => {
//     event.preventDefault();
// console.log(1);
//     const favorite = $(event.currentTarget).siblings(".favSong").text();
//     console.log(favorite);
// });

// favSong.on("click", () => {
// 	console.log(1);
// 	// const apple = $(this)("favSong").val();
// 	// console.log(apple);
// 	// addTrackToLocal(element);
// 	// window.location.href = "index2.html"
// })

// favSong.on("click", (event) => {
// 	console.log(1);
//     event.preventDefault();
//     const songTitle = $(event.currentTarget).text();
//     console.log(songTitle);
//     // Now, you can use songTitle to add to local storage or perform other actions
// });
getAnimeTrack("pokemon"); //FIXME:
