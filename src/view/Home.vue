<template>
  <div class="home">
    <GetData />
  </div>
</template>

<script>

import GetData from '../components/GetData.vue';


export default {
  name: 'Home',
  components: {
    GetData,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
