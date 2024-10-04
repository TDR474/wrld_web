<template>
  <section class="scene-intro" id="intro">
    <div class="static-container">
      <h1 class="title">
        <span class="k">Lucid</span>
        <span class="func">.is()</span>
      </h1>
      <TextBlock>
        <p class="-purple">Better Money for the Better Future</p>
        <p class="-gray">Inflation-resistant digital currency that help you save, spend and invest with confidence.</p>
      </TextBlock>
    </div>
  </section>
  
</template>

<script>
import TextBlock from '../TextBlock.vue'

export default {
  name: 'IntroScene',
  components: { TextBlock },
}
</script>
