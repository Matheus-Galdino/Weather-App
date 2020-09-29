<template>
  <section class="forecast">
    <h4>Tomorrow</h4>
    <img src="../assets/Sleet.png" />
    <p>
      16ºC
      <span class="minimun">11ºC</span>
    </p>
  </section>
</template>

<script>
export default {
  name: "Forecast",
};
</script>

<style>
.forecasts {
  margin: 0 10vw;
  padding: 0 1rem;
  display: grid;
  column-gap: 1rem;
  row-gap: 3rem;
  justify-items: center;
  grid-template-columns: 1fr 1fr;
}

.forecast {
  background: #1e213a;
  padding: 2rem 3rem;
  display: flex;
  flex-direction: column;
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