<template>
  <article class="location">
    <p>London</p>
    <span class="material-icons"> keyboard_arrow_right </span>
  </article>
</template>

<script>
export default {};
</script>

<style>
.location {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 2rem 1rem;
  margin-bottom: 2rem;

  cursor: pointer;
  transition: all 0.3s ease-out;
}

.location:hover {
  border: 1px solid #616475;
}

.location p {
  font-weight: 500;
  font-size: 1.6rem;

  color: #e7e7eb;
}

.location .material-icons {
  color: #616475;
}
</style>