const BASEURL = "https://cors-anywhere.herokuapp.com/www.metaweather.com/api";

const basicFetch = async (endPoint) => {
  const req = await fetch(BASEURL + endPoint);
  return await req.json();
};

export default {
  searchLocationByName: async (query) => {
    return basicFetch(`/location/search/?query=${query}`);
  },
  searchLocationByLattLong: async (latt, long) => {
    return basicFetch(`/location/search?lattlong=${latt},${long}`);
  },
  getLocationForecast: async (woeid) => {
    return basicFetch(`/location/${woeid}`);
  },
};
