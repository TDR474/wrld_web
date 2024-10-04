<template>
  <div id="about" class="wrapper">
    <div class="pic"></div>
    <div class="static-container">
      <h1 class="title">about(<span class="params">Lucid</span>)</h1>

      <TextBlock>
        <div class="first-fold">
          <ul class="about-contact">
            <li>
              <a href="https://lucidity-demo-production.up.railway.app/" title="Demo" target="_blank" class="bt">
                Demo
              </a>
            </li>
            <li>
              <a href="https://drive.google.com/file/d/1BADQx9Zv18Dzr4xhRAh87_gBE8WFsRAK/view?usp=sharing" title="Whitepaper" target="_blank" class="bt">
                Whitepaper
              </a>
            </li>
          </ul>
        </div>
      </TextBlock>
    </div>
  </div>
</template>

<script>
import { TimelineMax, Power3, Power0 } from 'gsap'
import * as ScrollMagic from 'scrollmagic'
import TextBlock from '../components/TextBlock.vue'

export default {
  name: 'AboutView',
  components: { TextBlock },
  data() {
    return {
      introTimeline: new TimelineMax(),
      headerTimeline: new TimelineMax(),
      scrollMagicController: new ScrollMagic.Controller(),
    }
  },
  mounted() {
    this.playIntro()
    this.playHeaderBg()
  },
  beforeUnmount() {
    this.scrollMagicController.destroy()
    this.scrollMagicController = null
    this.introTimeline.kill()
    this.introTimeline = null
    this.headerTimeline.kill()
    this.headerTimeline = null
  },
  methods: {
    playIntro() {
      this.introTimeline
        .addLabel('enter', 1)
        .from(
          '.title',
          2,
          {
            autoAlpha: 0,
            rotationX: 90,
            transformOrigin: '50% 50% -100px',
            ease: Power3.easeOut,
          },
          'enter'
        )
    },
    playHeaderBg() {
      const duration = window.innerHeight

      this.headerTimeline.to('.header-bg', 4, {
        autoAlpha: 1,
        ease: Power0.easeNone,
      })

      new ScrollMagic.Scene({
        triggerElement: '#about',
        offset: duration / 4,
        duration: duration,
      })
        .setTween(this.headerTimeline)
        .addTo(this.scrollMagicController)
        .reverse(true)
    },
  },
}
</script>

<style lang="scss">
.page-about {
  .header-bg {
    opacity: 0;
    visibility: hidden;
  }
}

#about {
  .pic {
    pointer-events: none;
    display: block;
    position: fixed;
    z-index: 9999;
    top: 50%;
    left: -12vw;
    transform: translate3d(0, -50%, 0);
    width: 43vw;
    aspect-ratio: 1/1;
    border-radius: 100%;

    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    filter: grayscale(1) brightness(1);
    mix-blend-mode: difference;

    @media screen and (max-width: 1024px) {
      top: -12vh;
      left: 50%;
      transform: translate3d(-50%, 0, 0) rotate(90deg);
      width: 70vw;
    }
  }

  .static-container {
    padding-top: 30vh;

    @media screen and (max-width: 1024px) {
      padding-top: 50vw;
    }
  }

  .about-contact {
    display: flex;
    align-items: center;
    list-style: none;
    margin: 2rem 0;

    li {
      display: flex;
      align-items: center;
      flex: 0 0 auto;
      list-style: none;
      margin: 0 1rem 0 0;
      color: var(--gray);
    }

    a {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      text-decoration: none;

      &.bt {
        background: var(--purple);
        color: var(--bg);
        padding: 0 1rem;
        height: 2rem;
        border-radius: 3rem;
        margin-left: 1rem;
        line-height: 2rem;

        &:hover {
          background: var(--light);
        }
      }
    }

    @media screen and (max-width: 568px) {
      flex-flow: row wrap;

      li:last-child {
        flex: 0 0 100%;
        margin: 1rem 0 0;
      }
    }
  }
}
</style>
