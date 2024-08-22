<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/order">Order</router-link> |
    <router-link to="/rxjs">Rxjs</router-link> |
    <router-link to="/lottie">Lottie</router-link> |
    <router-link to="/message">PostMessage</router-link> |
    <router-link to="/text">AutoText</router-link> |
    <router-link to="/abort">AbortSignal</router-link>
  </nav>
  <router-view />
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
