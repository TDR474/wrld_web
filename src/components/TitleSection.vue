<template>
  <div :class="scene">
    <slot></slot> <!-- Ensures TitleFunction slot content is rendered -->
  </div>
</template>

<script>
// export default {
//   props: {
//     scene: {
//       type: String,
//       default: '',
//     },
//   },
// };
// </script>


export default {
  name: 'TitleSection',
  props: {
    scene: String,
  },
}


<style lang="scss">
.title-container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  visibility: hidden;
  perspective: 900px;
  perspective-origin: 50% 50vh;
  padding-left: 4rem; /* Adjust this to match the alignment of bottom text */
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start; /* Align to the left */
  justify-content: center;



  @media screen and (max-width: 1024px) {
    padding-left: 0rem;
  }

  @media screen and (max-width: 568px) {
    padding-left: 1rem; /* Reduce padding for smaller screens */
  }
}
</style>
