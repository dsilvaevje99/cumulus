<template>
  <div class="container">
    <div class="loader">Loading...</div>
  </div>
</template>

<style scoped>
.container {
  transform: translateY(-200%);
}

.loader,
.loader:before,
.loader:after {
  border-radius: 50%;
  width: 0.5rem;
  height: 0.5rem;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: load7 1s infinite ease-in-out;
  animation: load7 1s infinite ease-in-out;
}
.loader {
  color: #ffffff;
  font-size: 0.5rem;
  margin: 0.5rem auto;
  position: relative;
  text-indent: -9999em;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
.loader:before,
.loader:after {
  content: "";
  position: absolute;
  bottom: 0;
}
.loader:before {
  left: -1rem;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.loader:after {
  left: 1rem;
}
@-webkit-keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2em 0 0;
  }
}
@keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2em 0 0;
  }
}
</style>
