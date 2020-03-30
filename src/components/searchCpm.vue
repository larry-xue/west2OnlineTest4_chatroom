<template>
  <div class="searchCmp">
    <input type="text" placeholder="Search for Messages or users...">
    <i class="fa fa-search"></i>
  </div>
</template>

<style scoped>
  input {
    outline: none;
    border: none;
  }

  .searchCmp {
    width: 100%;
    height: 50px;
    margin-top: 10px;
    border-radius: 10px;
    background-color: rgb(237,238,246);
    margin-top: 2vh;
    position: relative;
  }

  .searchCmp input {
    width: 90%;
    height: 100%;
    padding-left: 2%;
    font-size: 1.0em;
    background-color:rgb(237,238,246);
  }

  .searchCmp i {
    position: absolute;
    top: 30%;
    right: 2%;
    cursor: pointer;
  }
</style>
