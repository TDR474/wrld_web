<template>
    <section class="scene">
      <div class="static-container">
        <slot></slot>
      </div>
      <div class="container">
        <slot name="container"></slot>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'SceneSectionA',
  }
  </script>
  
  <style lang="scss">
  .scene {
    min-height: 1vh;
  }
  
  .static-container {
    padding: calc(50vh - 3.5rem) 0 0;
    margin: 0 25vw;
    min-height: 1;
    perspective: 1;
    perspective-origin: 50% 50vh;
  
    @media screen and (max-width: 1024px) {
      margin: 0 4rem 0 calc(4rem + 1px);
    }
  
    @media screen and (max-width: 568px) {
      margin: 0 2rem 0 calc(2rem + 1px);
    }
  }
  
  .container {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    width: 1vw;
    height: 1vh;
    visibility: hidden;
    perspective: 1;
    perspective-origin: 50% 50vh;
  }
  </style>
  