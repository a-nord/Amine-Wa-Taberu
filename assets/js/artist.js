const artistInfo = $("#artist-info");
const trackName = $("#trackName");
const artistBio = $("#artist-bio")

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

		
		if (artistName) {
		const lastFmArtist = `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artistName}&api_key=${apiKey}&format=json`;
		const artistResponse = await fetch(lastFmArtist);
		const artistData =	await artistResponse.json();
		console.log(artistData);

		const content = artistData.artist.bio.content
		artistBio.append(content)
		console.log(content);
		


			artistInfo.append(`by ` + artistName);
			trackName.append(track)
		} else {
			console.log("No information found for the track");
		}
	} catch (error) {
		console.error(error);
	}
};

const getFromLocal = () => {
    let getTrack = JSON.parse(localStorage.getItem("song"))
    getTrackInfo(getTrack);
};

getFromLocal();