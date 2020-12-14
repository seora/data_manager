<template>
  <div id = "app">
    <ManagerHeader />
    <GetData />
    <br><br>
    <SearchBar/>
    <ManagerTableView />
  </div>
</template>

<script>
import ManagerHeader from "./components/ManagerHeader";
import GetData from './components/GetData.vue';
import ManagerTableView from './components/ManagerTableView.vue';
import SearchBar from './components/SearchBar.vue';

export default {
  name : "App",
  components: {
    ManagerHeader,
    GetData,
    SearchBar,
    ManagerTableView,
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
