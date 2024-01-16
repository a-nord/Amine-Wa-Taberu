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
    const animeResponse = await fetch(
      `https://api.animethemes.moe/search?q=${anime}`
    );
    const animeData = await animeResponse.json();
    const songs = animeData.search.songs;

    // if there is a song then run the function
    if (songs.length !== 0) {
      songs.forEach((element) => {
        // Make a button for each song, and a corresponding `like` button
        const card = $(
          `<div>
					<button id="song" type="button" class="song elative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 ring-blue-800">
                    <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">${element.title} </button>
					
					<button type="button" class="likeBtn elative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 ring-blue-800">
                    <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">Like</button>
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
      results.append(
        `There's no songs with this title. Please try a different spelling`
      );
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
        `<button type="button" class="bg-transparent hover:bg-indigo-400 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">${favoriteSong} </button>`
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
