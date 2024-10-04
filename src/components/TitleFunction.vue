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

<!-- No additional styles are needed since we're using existing classes -->
