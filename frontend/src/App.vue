<template>
  <router-view v-slot="slotProps">
    <component :is="slotProps.Component"></component>
  </router-view>
</template>

<script>
export default {
  created() {
    if (localStorage.getItem("favoriteList") !== null) {
      this.$store.dispatch(
        "favorite/setFavoriteList",
        JSON.parse(localStorage.favoriteList)
      );
    }
  },
};
</script>

<style>
/*** Dark Mode Theme ***/
:root,
[data-theme="default"] {
  --bg-color-primary: #141416;
  --bg-color-secondary: #202025;
  --bg-color-tertiary: #282a31;
  --text-color-primary: #fff;
  --text-color-secondary: #000;
  --grey-text-light: rgba(255, 255, 255, 0.5);
  --grey-text-dark: rgba(255, 255, 255, 0.25);
  --icon-color-primary: none; /* none, icons are already white */
  --icon-color-secondary: brightness(0%); /* black */
  --logo-color-filter: brightness(0) saturate(100%) invert(98%) sepia(8%)
    saturate(2440%) hue-rotate(62deg) brightness(99%) contrast(103%);
  --cumulus-green: #95ffb3;
}
/* Light Mode Theme */
[data-theme="light"] {
  --bg-color-primary: #f2faff;
  --bg-color-secondary: #e1f2ff;
  --bg-color-tertiary: #d4eafb;
  --text-color-primary: #000;
  --text-color-secondary: #000;
  --grey-text-light: rgba(0, 0, 0, 0.25);
  --grey-text-dark: rgba(0, 0, 0, 0.5);
  --icon-color-primary: brightness(0%); /* black */
  --icon-color-secondary: brightness(0%); /* black */
  --logo-color-filter: brightness(0) saturate(100%) invert(57%) sepia(100%)
    saturate(348%) hue-rotate(84deg) brightness(101%) contrast(86%);
  --cumulus-green: #35d662;
}

* {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

body {
  padding: 0;
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background-color: var(--bg-color-primary);
}

.buttonMain {
  border-radius: 0;
  background-color: var(--bg-color-tertiary);
  padding: 0.5rem 1rem;
  color: var(--text-color-primary);
  border: 0;
  font-size: 0.8rem;
  cursor: pointer;
  transition: 0.25s all ease;
}

.buttonMain:hover {
  background-color: var(--bg-color-secondary);
}

/* Google place results styling */
/* .pac-container {
  background-color: var(--bg-color-tertiary);
  color: var(--text-color-primary);
  border: 0;
}

.pac-container::after {
  content: none;
}

.pac-item {
  border: 0;
  cursor: pointer;
  padding: 0.2rem 1rem;
}

.pac-item:hover {
  background-color: var(--bg-color-secondary);
}

.pac-item > span {
  color: var(--text-color-primary);
}

.pac-item > span:nth-child(3) {
  opacity: 0.5;
}

.pac-icon {
  display: none;
} */
</style>
