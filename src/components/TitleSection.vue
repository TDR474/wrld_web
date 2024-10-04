<template>
  <div>
    <h1 class="title">
      <slot></slot>
      <template v-if="params">
        (<a
          :href="cvLink"
          class="params"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ params }}
        </a>)
      </template>
    </h1>
    <TextBlock v-if="subtitle">
      <p class="-gray">{{ subtitle }}</p>
    </TextBlock>
  </div>
</template>

<script>
import TextBlock from './TextBlock.vue'

export default {
  name: 'TitleSection',
  props: {
    params: String,
    subtitle: String,
    cvLink: {
      type: String,
      default: 'your_cv_link_here', // Replace with your actual CV link
    },
  },
  components: { TextBlock },
}
</script>

<!-- Scoped styles if needed -->
<style scoped>
.title {
  /* Your title styles */
}

.params {
  /* Styles for the clickable parameter */
  color: var(--purple); /* Or any color you prefer */
  text-decoration: none;
}

.params:hover {
  text-decoration: underline;
}
/* .scene-intro {
  margin: 0;
  padding: 0;
}

.static-container {
  margin: 0;
  padding: 0;
} */
</style>
