//================= DOM Traversal =================//
const artistNameEl = $(".artist-name");
const trackNameEl = $("#track-name");
const artistBioEl = $("#artist-bio");
const songListEl = $(".song-list");

//================ Global Variables ===============//
const apiKey = `eeb927aca555bdd1797a9ff27182de7f`;
const apiSecret = `09f025e237eebbd253e8eadfc9b9edfd`;

//=================== Functions ==================//

//=== Get the artist from the song's name ===//
const getTrackInfo = async (songName) => {
	console.log(1);
	try {
		const lastFmAPI = `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${songName}&api_key=${apiKey}&format=json`;

		const trackResponse = await fetch(lastFmAPI);
		const trackData = await trackResponse.json();

		// Traverse though the data to get the artist's name
		const artistName = trackData.results.trackmatches.track[0].artist;

		// If there is a name then run these functions
		if (artistName) {
			getArtistBio(artistName);
			getArtistSongs(artistName);

			// Put the song's name on the page
			trackNameEl.append(songName);
		} else {
			console.log("No artist found");
		}
	} catch (error) {
		console.error("Errrr", error.message);
	}
}; // END

//=== Get artist's biography from API ===//
const getArtistBio = async (artistName) => {
	try {
		const lastFmArtist = `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artistName}&api_key=${apiKey}&format=json`;

		const artistResponse = await fetch(lastFmArtist);
		const artistData = await artistResponse.json();

		const content = artistData.artist.bio.content;

		// Replace newline characters with HTML line break tags
		const formattedContent = content.replace(/\n/g, "<br>"); 

		artistBioEl.append(formattedContent);
		artistNameEl.append(artistName);

	} catch (error) {
		console.error("Errrr", error.message);
	}
}; // END

//=== Get the artist's 5 top songs ===//
const getArtistSongs = async (artistName) => {
	try {
		const lastFmTopSongs = `https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${artistName}&api_key=${apiKey}&format=json`;

		const topSongsResponse = await fetch(lastFmTopSongs);
		const topSongsData = await topSongsResponse.json();

		//Just get the first 5 index
		const topSongs = topSongsData.toptracks.track.slice(0, 5);
		topSongs.forEach((topSongs) => {
			const songName = $(`<li>${topSongs.name}</li>`);
			songListEl.append(songName);
		});

		// console.log(typeof topSongsData.toptracks.track);
	} catch (error) {
		console.error("Errrr", error.message);
	}
}; // END

//=== Get song name from local storage ===//
const getFromLocal = () => {
	let getTrack = JSON.parse(localStorage.getItem("song"));
	console.log(getTrack);
	getTrackInfo(getTrack);
};
// init function
getFromLocal();
