<template>
  <div id="search-area">
    <header>
      <span class="material-icons" @click="$emit('close-search')"> clear </span>

      <div class="search-group">
        <div class="input-group">
          <span class="material-icons"> search </span>
          <input type="seach" placeholder="search location" v-model="query" />
        </div>
        <button @click="getLocations">Search</button>
      </div>
    </header>

    <div class="locations">
      <Location
        v-for="local in locations"
        :local="local"
        :key="local.woeid"
        @selected-location="$emit('forecast-location', $event)"
      />
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
    };
  },
  methods: {
    async getLocations() {
      let result = await API.searchLocationByName(this.query);
      this.locations = result;
    },
  },
};
</script>

<style>
#search-area {
  position: fixed;
  background: #1e213a;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;

  padding: 1rem;
}

#search-area header {
  width: 100%;
  display: flex;
  flex-direction: column;
}

#search-area header > .material-icons {
  color: white;
  cursor: pointer;
  align-self: flex-end;
}

#search-area .search-group {
  display: flex;
  margin-top: 2.5rem;
}

#search-area .input-group {
  border: 1px solid #e7e7eb;
  display: flex;
  align-items: center;
  flex-grow: 1;
  padding: 1rem;
  margin-right: 1.5rem;
}

#search-area .input-group .material-icons {
  color: #616475;
  margin-right: 1rem;
}

#search-area .input-group input {
  background: transparent;
  border: none;
  font-size: 1.6rem;
  color: white;
  flex-grow: 1;
}

#search-area .search-group button {
  background: #3c47e9;
  border: none;

  font-weight: 500;
  font-size: 1.6rem;

  color: #e7e7eb;

  padding: 0.5rem 1.5rem;

  cursor: pointer;
}

.locations {
  margin-top: 2rem;
}
</style>