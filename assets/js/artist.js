const artistInfo = $("#artist-info");
const trackName = $("#trackName");
const artistBio = $("#artist-bio");
const songList = $(".song-list");

const apiKey = `eeb927aca555bdd1797a9ff27182de7f`;
const apiSecret = `09f025e237eebbd253e8eadfc9b9edfd`;

const getTrackInfo = async (track) => {
	console.log(1);
	try {
		const lastFmAPI = `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${track}&api_key=${apiKey}&format=json`;

		const trackResponse = await fetch(lastFmAPI);
		const trackData = await trackResponse.json();

		const firstTrack = trackData.results?.trackmatches?.track[0];
		const artistName = firstTrack.artist;

		console.log(artistName);

		console.log(trackData);

		if (artistName) {
			getArtistBio(artistName);
			getArtistSongs(artistName);

			trackName.append(track);
		} else {
			console.log("No artist found");
		}
	} catch (error) {
		console.error("Errrr", error.message);
	}
};

const getArtistBio = async (artistName) => {
	try {
		const lastFmArtist = `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artistName}&api_key=${apiKey}&format=json`;
		const artistResponse = await fetch(lastFmArtist);
		const artistData = await artistResponse.json();
		console.log(artistData);

		const content = artistData.artist.bio.content;
		const formattedContent = content.replace(/\n/g, '<br>'); // Replace newline characters with HTML line break tags

        artistBio.append(formattedContent); // Use innerHTML to render HTML content
        console.log(formattedContent);

		artistInfo.append(`by ` + artistName);
	} catch (error) {
		console.error("Errrr", error.message);
	}
};

const getArtistSongs = async (artistName) => {
	try {
		const lastFmTopSongs = `https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${artistName}&api_key=${apiKey}&format=json`;
		const topSongsResponse = await fetch(lastFmTopSongs);
		const topSongsData = await topSongsResponse.json();
		console.log(topSongsData.toptracks.track);

		const topSongs = topSongsData.toptracks.track.slice(0, 5);
		topSongs.forEach((element) => {
			const songName = $(`<li>${element.name}</li>`);
			songList.append(songName);
		});

		// console.log(typeof topSongsData.toptracks.track);
	} catch (error) {
		console.error("Errrr", error.message);
	}
};

const getFromLocal = () => {
	let getTrack = JSON.parse(localStorage.getItem("song"));
	console.log(getTrack);
	getTrackInfo(getTrack);
};

getFromLocal();
