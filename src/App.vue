<template>
  <div id="page">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
    <navigation-bar></navigation-bar>
    
    <election-component></election-component>
    
    <footer-bar></footer-bar>
  </div>
</template>

<script>
  export default {
    name: 'app',
    created () {
      document.title = "Visualizing Distributed Leader Election Algorithms";
    }
  }
</script>
