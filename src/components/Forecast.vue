<template>
  <section class="forecast">
    <h4>{{ getPredictionDate }}</h4>
    <img :src="getWeatherImage" />
    <div class="predictions">
      <p>{{ forecast.max_temp.toFixed(0) }}ºC</p>
      <p class="minimun">{{ forecast.min_temp.toFixed(0) }}ºC</p>
    </div>
  </section>
</template>

<script>
export default {
  name: "Forecast",
  props: ["forecast"],
  methods: {
    addDays(date, days) {
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    },
    isSameDay(dateA, dateB) {
      return (
        dateA.getFullYear() === dateB.getFullYear() &&
        dateA.getMonth() === dateB.getMonth() &&
        dateA.getDate() === dateB.getDate()
      );
    },
  },
  computed: {
    getWeatherImage() {
      return require(`../assets/${this.forecast.weather_state_name.replace(
        " ",
        ""
      )}.png`);
    },
    getPredictionDate() {
      const predictionDate = new Date(this.forecast.applicable_date);
      const tomorrow = this.addDays(Date.now(), 1);

      return this.isSameDay(predictionDate, tomorrow)
        ? "Tomorrow"
        : predictionDate.toDateString().slice(0, -4).trim();
    },
  },
};
</script>

<style>
.forecasts {
  width: 70%;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  column-gap: 1rem;
  row-gap: 3rem;
  justify-items: center;
  grid-template-columns: 1fr 1fr;
}

.forecast {
  background: #1e213a;
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

.predictions {
  display: flex;
}

.forecast p,
h4 {
  color: #e7e7eb;
  font-weight: 500;
  font-size: 1.6rem;
}

.forecast h4 {
  text-align: center;
}

.forecast img {
  height: 6rem;
  margin: 2rem auto 3rem;
}

.forecast .minimun {
  color: #a09fb1;
  margin-left: 1rem;
}
</style>