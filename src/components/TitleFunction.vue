<template>
  <section class="scene-intro" :id="scene">
    <div class="static-container">
      <slot></slot>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TitleFunction',
  props: {
    scene: String,
  },
}
</script>
<!-- <style scoped>
.scene-intro {
  margin: 0;
  padding: 0;
}

.static-container {
  margin: 0;
  padding: 0;
}
</style> -->

<!-- No additional styles are needed since we're using existing classes -->
