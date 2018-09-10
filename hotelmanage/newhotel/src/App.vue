<template>
  <div class="body">
    <Index></Index>
  </div>
</template>

<script>
  import Index from './components/index'
  export default {
    components:{
      'Index':Index,
    }
  }
</script>

<style>
  .body{
    height: 100%;
    width: 100%;
    background: url("../static/img/bg1.jpg");
    background-size: 100% 100%;
  }
  html,body{
    height:100%;
  }
</style>
