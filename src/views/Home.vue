<template>
  <div>
    
    <IntroScene />
    <GapBlock />
  
  <div id="home" class="wrapper">
    

    

    
    <TitleSection scene="curriculum">
      <TitleFunction 
      params="ThePath" 
      subtitle="" 
      href="https://drive.google.com/file/d/1BADQx9Zv18Dzr4xhRAh87_gBE8WFsRAK/view?usp=sharing"></TitleFunction>
    </TitleSection>

    <BizScene :isPlaying="isPlaying.Biz" />
   


    <!--Title: Art Phi Games-->
    <Titles :viewport="viewport" scene="ArtPhiGamesTitle">
            <h1 class="title">
                
            </h1>
            <div class="std">
                
            </div>
        </Titles>

        <!--mario-->
        <SuperMario />
        <div class="gap"></div>

        <!--ghibli-->
        <Ghibli />

        <!--wrapper-->
        <Wrapper />

        <!--thanks-->
        <Thanks />
    </div>
  </div>

</template>

<script>
import { TimelineMax, TweenLite, Power0, Power3 } from 'gsap'
import * as ScrollMagic from 'scrollmagic'
import {
  DOM,
  removeBodyClass,
  addBodyClass,
  isReverse,
  // isForward,
} from '@/utils'
//import GlowyBlob from "../components/GlowyBlob.vue";
import AudioMarioStart from '../components/Characters/SuperMario/assets/smw_princess_help.ogg'
import IntroScene from '../components/Home/IntroScene.vue'
import BizScene from '../components/Home/BizScene.vue'
//import //earlyDaysScene from '../components/Home///earlyDaysScene.vue'
// import SuperMarioScene from '../components/Home/SuperMarioScene.vue'
// import GhibliScene from '../components/Home/GhibliScene.vue'
// import WrapperScene from '../components/Home/WrapperScene.vue'
// import ThanksScene from '../components/Home/ThanksScene.vue'
import GapBlock from '../components/GapBlock.vue'
import TitleSection from '../components/TitleSection.vue'
import TitleFunction from '../components/TitleFunction.vue'

export default {
  name: 'HomeView',
  components: {
    //GlowyBlob,

    IntroScene,
    BizScene,
    ////earlyDaysScene,
    // SuperMarioScene,
    // GhibliScene,
    // WrapperScene,
    // ThanksScene,
    GapBlock,
    TitleSection,
    TitleFunction,
  },
  data() {
    return {
      audioMarioStart: new Audio(AudioMarioStart),
      scrollMagicController: new ScrollMagic.Controller(),
      scrollMagicScene: {},
      timelines: {},
      tweeners: {},
      isPlaying: {
        Biz: false,
        ////earlyDays: false,
        Ghibli: false,
        Potion: false,
      },
    }
  },
  created() {
    window.addEventListener('beforeunload', () => window.scroll(0, 0))
  },
  mounted() {
    // setup
    // this.playGlowyBlob()
    this.playIntroScene()
    
    this.setupScenes()
    this.manageLoops()
    
    // scenes animation
    this.sceneMyCV()
    this.sceneBizTitle()
    this.sceneBizZen()
    this.sceneBizEverybody()
    this.sceneBizEnding()

    this.sceneOcean()
    this.sceneFloatingHead()
    this.sceneSunset()
    //this.sceneArtPhiGames()
    this.sceneMario()
    this.sceneGhibli()
    this.sceneWrapper()
  },
  beforeUnmount() {
    // loop animations
    this.isPlaying = {
      Biz: false,
      //////earlyDays: false,
      Ghibli: false,
      Potion: false,
    }
    // to avoid style issues
    removeBodyClass('is-playing-mario', 'blue-background')
    // timelines
    Object.values(this.timelines).forEach((timeLine) => timeLine.kill())
    this.timelines = {}
    // tweeners
    Object.values(this.tweeners).forEach((tweener) => tweener.kill())
    this.tweeners = {}
    // scrollMagic
    this.scrollMagicController.destroy(true)
    this.scrollMagicController = null
    Object.values(this.scrollMagicScene).forEach((scene) => scene.destroy(true))
    this.scrollMagicScene = {}
  },
  methods: {
    setupScenes() {
      const scenesElements = {
        myCV: DOM.get('#curriculum.scene'),
        bizTitle: DOM.get('#bizTitle.scene'),
        biz1: DOM.get('#biz1.scene'),
        biz2: DOM.get('#biz2.scene'),
        biz3: DOM.get('#biz3.scene'),
        //earlyTitle: DOM.get('#//earlyTitle.scene'),
        //early1: DOM.get('#//early-days.scene'),
        //early2: DOM.get('#//early-days2.scene'),
        //early3: DOM.get('#//early-days3.scene'),
        //artPhiGamesTitle: DOM.get('#ArtPhiGamesTitle.scene'),
        mario: DOM.get('#Mario.scene'),
        ghibli: DOM.get('#Ghibli.scene'),
        ghibli2: DOM.get('#Ghibli2.scene'),
        ghibli3: DOM.get('#Ghibli3.scene'),
        ghibli4: DOM.get('#Ghibli4.scene'),
        wrapper: DOM.get('#wrapperTitle.scene'),
        thanks: DOM.get('#thanks.scene'),
      }

      Object.entries(scenesElements).forEach(([scene, element]) => {
        // tweeners animate timelines' progress, to add momentum
        this.tweeners[scene] = new TimelineMax()
        this.timelines[scene] = new TimelineMax({ paused: true })

        // ScrollMagic scenes
        this.scrollMagicScene[scene] = new ScrollMagic.Scene({
          triggerElement: element,
          offset: -this.$viewport.height / 2, // start half screen before
          duration: element.offsetHeight, // lasts for the element height
        })
          .setTween(this.tweeners[scene])
          .addTo(this.scrollMagicController)
          .reverse(true)
          .setClassToggle(element, 'active')

        // animate timeline progress from tweeners
        this.tweeners[scene]
          .to(element, 1, { autoAlpha: 1 }) // fake, just to have some progress
          .eventCallback('onUpdate', () => {
            TweenLite.to(this.timelines[scene], 0.5, {
              progress: this.tweeners[scene].progress(),
              ease: Power0.easeNone,
            })
          })
      })
    },
    playGlowyBlob() {
      const blob = document.getElementById("blob");

      window.onpointermove = event => { 
        const { clientX, clientY } = event;
        
        blob.animate({
          left: `${clientX}px`,
          top: `${clientY}px`
        }, { duration: 3000, fill: "forwards" });
      }
    },
    playIntroScene() {
      const timeline = new TimelineMax()
      timeline
        .addLabel('enter', 1)
        .from(
          '#intro .title',
          2,
          {
            autoAlpha: 0,
            rotationX: 90,
            transformOrigin: '50% 50% -100px',
            ease: Power3.easeOut,
          },
          'enter'
        )
        .from(
          '#intro .std',
          2,
          {
            autoAlpha: 0,
            x: -32,
            ease: Power3.easeOut,
          },
          'enter+=1.5'
        )
    },
    manageLoops() {
      // play & stop loop animations based on each scene
      this.scrollMagicScene.myCV.on('enter', () => (this.isPlaying.Biz = false))
      this.scrollMagicScene.bizTitle.on(
        'enter',
        () => (this.isPlaying.Biz = true)
      )
      this.scrollMagicScene.biz1.on('enter', () => (this.isPlaying.Biz = true))
      this.scrollMagicScene.biz2.on('enter', () => (this.isPlaying.Biz = true))
      this.scrollMagicScene.biz3.on('enter', () => (this.isPlaying.Biz = true))
      
      
      this.scrollMagicScene.mario
        .on('enter', (e) => {
         
          if (isReverse(e)) {
            addBodyClass('blue-background')
          }
        })
        .on('leave', (e) => {
          if (isReverse(e)) {
            this.isPlaying.Ghibli = false
          }
          removeBodyClass('blue-background')
        })
      this.scrollMagicScene.ghibli
        .on('enter', () => {
          this.isPlaying.Ghibli = true
          removeBodyClass('is-playing-mario')
          addBodyClass('blue-background')
        })
        .on('leave', () => removeBodyClass('blue-background'))
      this.scrollMagicScene.ghibli2
        .on('enter', () => addBodyClass('blue-background'))
        .on('leave', () => removeBodyClass('blue-background'))
      this.scrollMagicScene.ghibli3
        .on('enter', () => addBodyClass('blue-background'))
        .on('leave', () => removeBodyClass('blue-background'))
      this.scrollMagicScene.ghibli4
        .on('enter', () => addBodyClass('blue-background'))
        .on('leave', () => removeBodyClass('blue-background'))
      this.scrollMagicScene.wrapper.on('enter', () => {
        removeBodyClass('blue-background')
        this.isPlaying.Ghibli = true
        this.isPlaying.Potion = false
      })
      this.scrollMagicScene.thanks.on('enter', () => {
        this.isPlaying.Ghibli = false
        this.isPlaying.Potion = true
      })
    },
    sceneMyCV() {
      this.timelines.myCV
        .set('#curriculum .title-container', { autoAlpha: 1 }) // show animations
        .addLabel('start', 0)
        .from(
          '#curriculum .title',
          2,
          {
            yPercent: -50,
            autoAlpha: 0,
            rotationX: 90,
            transformOrigin: '50% 50% -100px',
            ease: Power3.easeOut,
          },
          'start'
        )
        .from(
          '#curriculum .std',
          2,
          {
            yPercent: 50,
            autoAlpha: 0,
            rotationX: -90,
            transformOrigin: '50% 50% -100px',
            ease: Power3.easeOut,
          },
          'start'
        )
        .to('#curriculum .title, #curriculum .std', 2, {
          autoAlpha: 0,
          yPercent: -100,
        })
    },
    sceneBizTitle() {
      this.timelines.bizTitle
        // next scene characters
        .set('#filomena', {
          autoAlpha: 0,
          scale: 0,
          xPercent: 600,
          yPercent: 100,
        })
        .set('#dino', {
          scale: 0,
          xPercent: 400,
          yPercent: 100,
        })
        .set('#astro, #coffee, #et, #octo', {
          autoAlpha: 0,
          scale: 0,
          xPercent: 400,
          yPercent: 100,
        })
        // this scene
        .set('#bizTitle .title-container, #biz1 .container', { autoAlpha: 1 })
        .addLabel('start', 0)
        .from(
          '#bizTitle .title',
          6,
          {
            yPercent: -50,
            autoAlpha: 0,
            rotationX: 90,
            transformOrigin: '50% 50% -100px',
            ease: Power3.easeOut,
          },
          'start'
        )
        .to('#bizTitle .title', 6, {
          autoAlpha: 0,
          yPercent: -100,
        })
        .staggerFrom(
          '#smart, #open',
          6,
          {
            autoAlpha: 0,
            scale: 0,
            ease: Power3.easeOut,
          },
          0.2,
          'start+=2'
        )
        .from(
          '#abiz',
          6,
          {
            scale: 0,
          },
          'start+=2'
        )
    },
    sceneBizZen() {
      this.timelines.biz1
        .addLabel('start', 0)
        .from(
          '#zen',
          4,
          {
            xPercent: 70,
            ease: Power3.easeOut,
          },
          'start'
        )
        .to(
          '#abiz',
          4,
          {
            autoAlpha: 0,
            xPercent: -100,
            ease: Power3.easeIn,
          },
          'start'
        )
        .staggerTo(
          '#smart, #open',
          4,
          {
            autoAlpha: 0,
            scale: 0,
            ease: Power3.easeOut,
          },
          0.2,
          'start'
        )
    },
    sceneBizEverybody() {
      this.timelines.biz2
        .addLabel('start', 0)
        .to(
          '#zen',
          4,
          {
            yPercent: 130,
            ease: Power3.easeIn,
          },
          'start'
        )
        .staggerTo(
          '#dino, #astro, #coffee, #et, #filomena, #octo',
          5,
          {
            autoAlpha: 1,
            scale: 1,
            xPercent: 0,
            yPercent: 0,
            ease: Power3.easeOut,
          },
          0.2,
          'start'
        )
    },
    sceneBizEnding() {
      this.timelines.biz3
        .addLabel('start', 0)
        .to(
          '#dino',
          6,
          {
            yPercent: 200,
            scale: 1.5,
            ease: Power3.easeIn,
          },
          'start'
        )
        .to(
          '#et',
          6,
          {
            xPercent: -250,
            yPercent: -100,
            autoAlpha: 0,
            ease: Power3.easeIn,
          },
          'start'
        )
        .to(
          '#filomena',
          6,
          {
            xPercent: -300,
            yPercent: 300,
            autoAlpha: 0,
            ease: Power3.easeIn,
          },
          'start'
        )
        .to(
          '#octo',
          6,
          {
            xPercent: -650,
            yPercent: 400,
            autoAlpha: 0,
            ease: Power3.easeIn,
          },
          'start'
        )
        .to(
          '#astro',
          12,
          {
            bottom: '-10vh',
            right: '-10vw',
            scale: 4,
            ease: Power3.easeInOut,
          },
          'start'
        )
        .to(
          '#coffee',
          12,
          {
            top: '8rem',
            left: 0,
            scale: 4,
            ease: Power3.easeInOut,
          },
          'start'
        )
    },
   
    


    



    sceneWrapper() {
      this.timelines.wrapper
        .addLabel('start', 0)
        .to('#Ghibli .container', 2, { autoAlpha: 0 }, 'start')
        .from('#wrapperTitle .static-container', 2, { autoAlpha: 1 })
    },
    createParallax(options) {
      const {
        tweenerElement,
        tweenerTime,
        timelineTime,
        offset,
        duration,
        triggerElement,
      } = {
        tweenerElement: '.tweenerElement',
        tweenerTime: 20,
        timelineTime: 4,
        offset: -this.$viewport.height / 2,
        duration: this.$viewport.height * 3.5,
        triggerElement: '',
        ...options,
      }

      const timeline = new TimelineMax({ paused: true })
      const tweener = new TimelineMax()

      tweener
        .to(tweenerElement, tweenerTime, { rotation: 0 })
        .eventCallback('onUpdate', () => {
          TweenLite.to(timeline, timelineTime, {
            progress: tweener.progress(),
            ease: Power3.easeOut,
          })
        })

      new ScrollMagic.Scene({
        triggerElement,
        offset,
        duration,
      })
        .setTween(tweener)
        .addTo(this.scrollMagicController)

      return timeline
    },
  },
}
</script>

<style lang="scss">
//fonts
@font-face {
  font-family: 'SMW';
  src: url('../assets/fonts/smw.woff2') format('woff2'),
    url('../assets/fonts/smw.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

#home {
  .scene .static-container {
    padding: 0;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
  }

  #ArtPhiGamesTitle {
    .line {
      display: block;
    }

    @media screen and (max-width: 568px) {
      .title {
        white-space: nowrap;
      }
    }
  }

  // standard text
  .std {
    font-size: 1.2rem;

    .-big {
      display: block;
      font-size: 4rem;
      font-weight: 700;
      word-spacing: -0.1em;
      letter-spacing: -0.05em;
      width: 70vw;

      @media screen and (max-width: 1024px) {
        font-size: 3.5rem;
        width: 90vw;
      }

      @media screen and (max-width: 768px) {
        width: 100%;
      }

      @media screen and (max-width: 568px) {
        font-size: 2rem;
      }
    }

    @media screen and (max-width: 568px) {
      font-size: 1rem;
    }
  }

  @media screen and (max-width: 568px) {
    .title {
      white-space: nowrap;
    }
  }
}
</style>
