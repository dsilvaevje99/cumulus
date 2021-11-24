<template>
  <div class="toggleContainer" @click="toggleTheme">
    <div :class="['iconContainer', isActive('dark')]">
      <base-icon icon="moon" class="icon"></base-icon>
    </div>
    <div :class="['iconContainer', isActive('light')]">
      <base-icon icon="sun" class="icon"></base-icon>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: "dark",
    };
  },
  mounted() {
    const container = document.getElementsByTagName("body")[0];
    const themeIsSet = container.hasAttribute("data-theme");
    if (themeIsSet) {
      this.active = "light";
    }
    const savedTheme = localStorage.getItem("cumulus-theme");
    if (savedTheme && savedTheme === "light" && !themeIsSet) {
      this.toggleTheme();
    }
  },
  methods: {
    isActive(theme) {
      return this.active === theme ? "active" : "";
    },
    toggleTheme() {
      const container = document.getElementsByTagName("body")[0];
      if (this.active === "dark") {
        container.setAttribute("data-theme", "light");
        this.active = "light";
      } else {
        container.removeAttribute("data-theme");
        this.active = "dark";
      }

      localStorage.setItem("cumulus-theme", this.active);
    },
  },
};
</script>

<style scoped>
.toggleContainer {
  display: flex;
  border-radius: 1rem;
  border: 0.15rem solid var(--bg-color-tertiary);
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 3.5rem;
  background-color: var(--bg-color-primary);
}

.iconContainer {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  padding: 0.3rem 0.35rem;
  margin: 0;
  border-radius: 50%;
  font-size: 0.72rem;
  opacity: 0.5;
  transition: 0.2s all ease-out;
}

.toggleContainer:hover > .iconContainer {
  opacity: 1;
}

.active {
  background-color: var(--bg-color-tertiary);
  opacity: 1;
}

.icon {
  margin: 0;
  padding: 0;
}
</style>
