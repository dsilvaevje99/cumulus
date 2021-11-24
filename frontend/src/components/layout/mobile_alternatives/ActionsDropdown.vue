<template>
  <div class="container">
    <base-icon icon="menu" class="icon"></base-icon>
    <div class="popupContainer">
      <div>
        <router-link to="/"
          ><img
            src="../../../assets/icons/standard_view_white.svg"
            alt="Standard view"
            :class="`viewIcon ${currentRouteName === '/' && 'active'}`"
        /></router-link>
        <router-link to="/dagene-framover"
          ><img
            src="../../../assets/icons/day_view_white.svg"
            alt="Day view"
            :class="
              `viewIcon ${currentRouteName === '/dagene-framover' && 'active'}`
            "
        /></router-link>
        <theme-toggler></theme-toggler>
      </div>
    </div>
  </div>
</template>

<script>
import ThemeToggler from "../ThemeToggler.vue";

export default {
  components: { ThemeToggler },
  computed: {
    currentRouteName() {
      return this.$router.currentRoute._value.fullPath;
    },
  },
};
</script>

<style scoped>
.container {
  position: relative;
  margin-left: 1rem;
}

.container:hover > .icon {
  filter: var(--logo-color-filter);
}

.icon {
  font-size: 1.5em;
  margin: 0;
}

.popupContainer {
  background-color: var(--cumulus-green);
  color: var(--text-color-secondary);
  opacity: 0;
  position: absolute;
  top: 100%;
  right: 0;
  transition: 0.5s opacity ease-out;
  height: 0;
  width: 0;
  border-radius: 1rem;
}

.popupContainer > div > * {
  margin: 0 1rem;
}

.popupContainer > div {
  display: none;
}

.container:hover > .popupContainer,
.displayPopup {
  opacity: 1;
  padding: 1.5rem 2rem;
  height: auto;
  width: auto;
}

.container:hover > .popupContainer > div,
.displayPopup > div {
  display: flex;
  align-items: center;
}

.viewIcon {
  width: 2rem;
  opacity: 0.25;
  transition: 0.2s opacity ease-out;
  margin: 0;
  filter: var(--icon-color-secondary);
}

.viewIcon:hover {
  opacity: 1;
}

.active {
  opacity: 1;
}
</style>
