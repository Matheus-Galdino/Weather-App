const BASEURL = "https://cors-anywhere.herokuapp.com/www.metaweather.com/api";

const basicFetch = async (endPoint) => {
  const req = await fetch(BASEURL + endPoint);
  return await req.json();
};

export default {
  searchLocation: async (query) => {
    return basicFetch(`/location/search/?query=${query}`);
  },
  getLocationForecast: async (woeid) => {
    return basicFetch(`/location/${woeid}`);
  },
};
