<template>
  <div id = "app">
    <ManagerHeader />
    <GetData />    
  </div>
</template>

<script>
import ManagerHeader from "./components/ManagerHeader";
import GetData from './components/GetData.vue';

export default {
  name : "App",
  components: {
    ManagerHeader,
    GetData,
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width:100%;
  height: 100%;
}
</style>
