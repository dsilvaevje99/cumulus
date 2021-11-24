<template>
  <div class="container">
    <section>
      <coming-days></coming-days>
    </section>
    <section>
      <favorite-locations></favorite-locations>
    </section>
  </div>
</template>

<script>
import ComingDays from "./ComingDays.vue";
import FavoriteLocations from "./FavoriteLocations.vue";

export default {
  components: { ComingDays, FavoriteLocations },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  background-color: var(--bg-color-tertiary);
  color: var(--text-color-primary);
  padding: 2em 0;
}

section {
  width: 50%;
  padding: 0 3rem;
}

@media only screen and (min-width: 1450px) {
  section:nth-child(2) {
    width: 40%;
  }
}

@media only screen and (max-width: 1308px) {
  .container {
    display: none;
  }
}
</style>
