const artistInfo = $("#artist-info");


const apiKey = `eeb927aca555bdd1797a9ff27182de7f`;
const apiSecret = `09f025e237eebbd253e8eadfc9b9edfd`;



const getTrackInfo = async (track) => {
	console.log(1);
	try {
		const lastFmAPI = `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${track}&api_key=${apiKey}&format=json`;

		const trackResponse = await fetch(lastFmAPI);
		const trackData = await trackResponse.json();

		console.log(trackData);

		const firstTrack = trackData.results?.trackmatches?.track[0];

		if (firstTrack) {
			const artistName = firstTrack.artist;
			console.log(artistName);
			artistInfo.append(artistName);
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