const axios = require("axios");

async function reverseGeocode(lat, lon) {
  console.log("masukgak", lat, lon);

  const res = await axios.get("https://geocode.maps.co/reverse", {
    params: {
      lat,
      lon,
      api_key: process.env.GEOCODE_API_KEY,
    },
  });

  const addr = res.data.address;
  console.log(addr);

  return addr.city || addr.town || addr.village || addr.state || "Unknown";
}

module.exports = { reverseGeocode };
