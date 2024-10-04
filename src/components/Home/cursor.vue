<template>
    <div>
      <Blob />
    </div>
  </template>
  
  <script>
  import Blob from '../GlowyBlob.vue';
  
  export default {
    components: {
      Blob
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .blob {
      position: absolute;
      top: 0;
      left: 0;
      width: 50px;
      height: 50px;
      background-color: #ffffff;
      border-radius: 50%;
      opacity: 0.5;
      filter: blur(10px);
      transition: all 0.2s ease-out;
      mix-blend-mode: screen;
      pointer-events: none;
  }

  .blob.active {
      opacity: 0.8;
      transform: scale(1.5);
  }
  </style>
  