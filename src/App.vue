<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/order">Order</router-link> |
    <router-link to="/rxjs">RxJS</router-link> |
    <router-link to="/lottie">Lottie</router-link> |
    <router-link to="/message">PostMessage</router-link> |
    <router-link to="/text">AutoText</router-link> |
    <router-link to="/file">FileReader</router-link> |
    <router-link to="/grid">GridView</router-link> |
    <router-link to="/lcp">LCP</router-link> |
    <router-link to="/io">IntersectionObserver</router-link> |
    <router-link to="/dp">Design Pattern</router-link> |
    <router-link to="/lottery">抽奖系统</router-link>
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
