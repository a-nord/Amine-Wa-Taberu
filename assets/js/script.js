let userinput = "pokemon"
let results = $(".results")



//================= Global Variables ====================//
const apiKey = `eeb927aca555bdd1797a9ff27182de7f`;
const apiSecret = `09f025e237eebbd253e8eadfc9b9edfd`;

//================ Functions ===================//

let getAnimeTrack = async (anime) => {
	try {
		const animeResponse = await fetch(`https://api.animethemes.moe/search?q=${anime}&include[anime]=resources`);

		let animeData = await animeResponse.json();
		console.log(animeData);

		 let songs = animeData.search.songs.map(element => element.title);
		 console.log(songs);

         songs.forEach(element => {
            const card = $(`<button type="button">${element} </button>`)
            card.on("click", () => {
                getTrackInfo(element)
            })
            
            results.append(card)
         });


	} catch (error) {
		console.error("Error:", error);
	}


};

let getTrackInfo = async (track) => {
    try {
        const lastFmAPI = `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${track}&api_key=${apiKey}&format=json`;

        const trackResponse = await fetch(lastFmAPI);
        const trackData = await trackResponse.json();

        console.log(trackData);

        const firstTrack = trackData.results?.trackmatches?.track[0];

        if (firstTrack) {
            console.log('Artist:', firstTrack.artist);
			

        } else {
            console.log('No information found for the track');
        }

    } catch (error) {
        console.error(error);
    }
};


// getTrackInfo('Naru');

getAnimeTrack(userinput);
