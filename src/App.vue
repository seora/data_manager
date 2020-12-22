<template>
  <div id="app">
     <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Data Manager</a>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#/">Home</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="#/create">데이터 추가</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="#">태그 관리</a>
                </li>
            </ul>
            </div>
        </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
<<<<<<< HEAD
import ManagerHeader from "./components/ManagerHeader";
import GetData from './components/GetData.vue';

export default {
  name : "App",
  components: {
    ManagerHeader,
    GetData,
  },
=======
export default {
  name: 'App'
>>>>>>> 70ac458d782dcc29a044a088e399a0bc35569bc9
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
<<<<<<< HEAD
  width:100%;
  height: 100%;
=======
  color: #2c3e50;
}

#nav {
  padding: 30px;
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #115e9c;
>>>>>>> 70ac458d782dcc29a044a088e399a0bc35569bc9
}
</style>
