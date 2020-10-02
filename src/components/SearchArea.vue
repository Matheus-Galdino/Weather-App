<template>
  <div class="search-area">
    <header>
      <span class="material-icons" @click="close"> clear </span>

      <form class="search-group" @submit.prevent="getLocations">
        <div class="input-group">
          <span class="material-icons"> search </span>
          <input type="search" placeholder="search location" v-model="query" />
        </div>
        <button>Search</button>
      </form>
    </header>

    <div class="locations">
      <Location
        v-for="local in locations"
        :local="local"
        :key="local.woeid"
        @selected-location="$emit('forecast-location', $event)"
      />
    </div>

    <div class="no-result-container" v-if="hasSearched && !locations[0]">
      <img src="../assets/undraw_weather.svg" alt="couldn't find a location" />
      <p>
        Couldn't find any location. <br />
        Try typing another name
      </p>
    </div>
  </div>
</template>

<script>
import API from "../API";
import Location from "./Location";

export default {
  name: "SearchArea",
  components: {
    Location,
  },
  data() {
    return {
      locations: [],
      query: "",
      hasSearched: false,
    };
  },
  methods: {
    async getLocations() {
      this.hasSearched = true;
      this.locations = await API.searchLocationByName(this.query);
    },
    close() {
      this.hasSearched = false;
      this.$emit("close-search");
    },
  },
};
</script>

<style>
.search-area {
  position: fixed;
  background: #1e213a;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;

  padding: 1rem;
}

.search-area header {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.search-area header > .material-icons {
  color: white;
  cursor: pointer;
  align-self: flex-end;
}

.search-area .search-group {
  display: flex;
  margin-top: 2.5rem;
}

.search-area .input-group {
  border: 1px solid #e7e7eb;
  display: flex;
  align-items: center;
  flex-grow: 1;
  padding: 1rem;
  margin-right: 1.5rem;
}

.search-area .input-group .material-icons {
  color: #616475;
  margin-right: 1rem;
}

.search-area .input-group input {
  background: transparent;
  border: none;
  font-size: 1.6rem;
  color: white;
  flex-grow: 1;
}

.search-area .search-group button {
  background: #3c47e9;
  border: none;

  font-weight: 500;
  font-size: 1.6rem;

  color: #e7e7eb;

  padding: 0.5rem 1.5rem;

  cursor: pointer;
  transition: all 0.3s ease-out;
}

.search-area .search-group button:hover {
  background: #1926e0;
}

.no-result-container {
  margin-top: 4rem;
}

.no-result-container img {
  width: 100%;
  margin-bottom: 1rem;
}

.no-result-container p {
  font-size: 3rem;
  color: white;
  text-align: center;
}

.locations {
  margin-top: 2rem;
}
</style>