const apiKey = 'rZnuDLVC0bYtT2J7ND-ReZbAYg0j1tRMIcUwH00_Nkm4LKfUaVs7brjH5yuiNsLE';

// Example: Search for lyrics
const searchQuery = `hero's come back`;
const searchEndpoint = `https://floating-headland-95050.herokuapp.com/https://api.genius.com/search?q=${encodeURIComponent(searchQuery)}`;

// Make a GET request to the Genius API
fetch(searchEndpoint, {
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
})
  .then(response => response.json())
  .then(data => {
    // Handle the API response here
    console.log(data);
  })
  .catch(error => {
    // Handle errors
    console.error('Error:', error);
  });



  