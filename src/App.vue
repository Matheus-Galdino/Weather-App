<template>
  <nav v-if="locationForecast[0]">
    <button class="search-button" @click="showSearchArea = true">
      Search for places
    </button>

    <button class="gps-button" @click="getUserLocation">
      <span class="material-icons"> gps_fixed </span>
    </button>
  </nav>

  <SearchArea
    v-if="showSearchArea"
    @close-search="showSearchArea = false"
    @forecast-location="forecast($event)"
  />

  <img
    src="./assets/loading.gif"
    alt="loading"
    id="loading"
    v-if="!locationForecast[0]"
  />

  <section id="today-forecast" v-if="locationForecast[0]">
    <img :src="getWeatherImage" alt="sunny with clouds" />
    <p class="temperature">
      <span>
        {{ todayForecast.the_temp.toFixed(1) }}
      </span>
      <small>ºC</small>
    </p>

    <h2>{{ todayForecast.weather_state_name }}</h2>

    <p class="date">
      Today
      <span> . </span>
      {{ getPredictionDate }}
    </p>

    <p class="location">
      <span class="material-icons"> location_on </span> {{ location.title }}
    </p>
  </section>

  <section id="aditional-details" v-if="locationForecast[0]">
    <div class="forecasts">
      <Forecast v-for="f in locationForecast" :forecast="f" :key="f.id" />
    </div>

    <div class="highlights">
      <h2>Today's Highlights</h2>

      <section class="highlight">
        <h3>Wind status</h3>
        <p>{{ todayForecast.wind_speed.toFixed(0) }} <span> mph</span></p>
        <small> <span class="material-icons"> navigation </span> WSW </small>
      </section>

      <section class="highlight">
        <h3>Humidity</h3>
        <p>{{ todayForecast.humidity.toFixed(0) }}<span> % </span></p>
        <div class="progress-group">
          <progress :value="todayForecast.humidity" min="0" max="100">
            Humidity {{ todayForecast.humidity.toFixed(0) }}%
          </progress>
        </div>
      </section>

      <section class="highlight">
        <h3>Visibility</h3>
        <p>{{ todayForecast.visibility.toFixed(0) }} <span> miles </span></p>
      </section>

      <section class="highlight">
        <h3>Air Pressure</h3>
        <p>{{ todayForecast.air_pressure.toFixed(0) }} <span>mb</span></p>
      </section>
    </div>
  </section>

  <footer v-if="locationForecast[0]">Matheus Carvalho @DevChallenges.io</footer>
</template>

<script>
import API from "./API";
import Forecast from "./components/Forecast";
import SearchArea from "./components/SearchArea";

export default {
  name: "App",
  components: {
    Forecast,
    SearchArea,
  },
  data() {
    return {
      showSearchArea: false,
      location: {},
      locationForecast: {},
      todayForecast: {},
    };
  },
  methods: {
    async forecast(location) {
      this.showSearchArea = false;
      this.location = await API.getLocationForecast(location.woeid);
      this.locationForecast = this.location.consolidated_weather;
      this.todayForecast = this.locationForecast[0];
      this.locationForecast.splice(0, 1);
    },
    async searchByLattLong(position) {
      this.location = await API.searchLocationByLattLong(
        position.coords.latitude,
        position.coords.longitude
      );
      this.forecast(this.location[0]);
    },
    getUserLocation() {
      navigator.geolocation.getCurrentPosition(this.searchByLattLong);
    },
  },
  computed: {
    getWeatherImage() {
      return require(`./assets/${this.todayForecast.weather_state_name.replace(
        " ",
        ""
      )}.png`);
    },
    getPredictionDate() {
      const today = new Date(Date.now());
      return today.toDateString().slice(0, -4).trim();
    },
  },
  created() {
    this.getUserLocation();
  },
};
</script>

<style>
#app {
  max-width: 100vw;
  min-height: 100vh;
  background: #100e1d;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/*#region Nav*/

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: fixed;
  top: 15px;
  padding: 0 10px;
  z-index: 999;
}

nav button {
  color: white;
  background: #6e707a;

  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  cursor: pointer;
  transition: all 0.2s ease-out;
}

nav button:hover {
  background: #5d5f67;
}

nav .search-button {
  padding: 1.25rem 2rem;
  font-weight: 500;
  font-size: 1.5rem;

  color: #e7e7eb;

  border-radius: 0.5rem;
}

nav .gps-button {
  padding: 10px;
  border-radius: 50%;
}

/*#endregion*/

#loading {
  align-self: center;
}

/*#region Today forecast*/

#today-forecast {
  height: 95vh;
  padding: 12rem 0 5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background: #1e213a;
  position: relative;
}

#today-forecast::before {
  content: "";
  background-image: url("./assets/Cloud-background.png");
  background-position: left top;
  background-repeat: repeat-x;
  background-origin: content-box;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  opacity: 0.1;
}

#today-forecast .temperature {
  display: flex;
  align-items: center;
  position: relative;
}

#today-forecast .temperature span {
  font-weight: 500;
  font-size: 13rem;

  color: #e7e7eb;
}

#today-forecast .temperature small {
  font-size: 5rem;
  color: #a09fb1;
}

#today-forecast h2 {
  font-weight: 600;
  font-size: 3.5rem;

  color: #a09fb1;
}

#today-forecast p {
  font-weight: 500;
  font-size: 1.75rem;

  color: #88869d;
}

#today-forecast .date span {
  margin: 0 1rem;
}

#today-forecast .location {
  display: flex;
  align-items: center;
  font-weight: 600;
}

#today-forecast .location .material-icons {
  margin-right: 0.5rem;
}

/*#endregion*/

/*#region Aditional details */
#aditional-details {
  padding-top: 6rem;
}

.highlights {
  margin: 6rem 5vw 8rem;
}

.highlights h2 {
  font-weight: bold;
  font-size: 2.3rem;

  color: #e7e7eb;
}

.highlights .highlight {
  background: #1e213a;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0.5rem;
  margin: 4rem 0;
  padding: 3rem 0;
  color: #e7e7eb;
}

.highlight h3 {
  font-weight: 500;
  font-size: 1.6rem;
}

.highlight p {
  font-weight: bold;
  font-size: 7rem;
  margin: 2rem 0;
}

.highlight p span {
  font-weight: 400;
  font-size: 5rem;
}

.highlight small {
  font-weight: 500;
  font-size: 1.4rem;
}

.highlight small .material-icons {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  font-size: 1.2rem;
  padding: 0.3rem;
  transform: rotate(210deg);
  margin-right: 0.7rem;
}

.progress-group {
  display: grid;
  width: 50%;
  grid-template-columns: 1fr 1fr 1fr;
}

.progress-group small {
  font-size: 1.2rem;

  color: #a09fb1;
}

.progress-group progress {
  grid-column: 1 / 4;
  width: 100%;
}

/*#endregion*/

footer {
  font-weight: 600;
  font-size: 1.4rem;
  text-align: center;

  color: #616475;
  padding-bottom: 2rem;
}
</style>
