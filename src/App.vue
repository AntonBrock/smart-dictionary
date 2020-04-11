<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App',
    beforeCreate() {
      this.$store.commit('data/setStore');
    }
}
</script>

<style>
  html, body {
    background: #f8f4f4;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    margin: 5px;
  }
</style>