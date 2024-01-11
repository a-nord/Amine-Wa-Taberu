//================= Global Variables ====================//
const apiKey = `eeb927aca555bdd1797a9ff27182de7f`;
const apiSecret = `09f025e237eebbd253e8eadfc9b9edfd`;

//================ Functions ===================//

let getAnime = async (anime) => {
	try {
		const animeResponse = await fetch(`https://api.animethemes.moe/anime/${anime}`);

		let animeData = await animeResponse.json();

		console.log(animeData);
	} catch (error) {
		console.error("Error:", error);
	}
};

let getArtistInfo = async (artist) => {
	try {
		const lastFmAPI = `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist}&api_key=${apiKey}&format=json`;

		const artistResponse = await fetch(lastFmAPI);
		const artistData = await artistResponse.json();

		console.log(artistData.artist);
	} catch (error) {
		console.error(error);
	}
};

getArtistInfo("nobodyknows");
getAnime("pokemon");
