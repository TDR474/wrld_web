<template>
    <div class="blob-container" >
      <canvas ref="canvas" class="blob-canvas"></canvas>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex'
  
  export default {

    name: 'GlowyBlob',
    
    data() {
      return {
        mouseX: null,
        mouseY: null,
        radius: 250,
        baseHue: 200,
        hueRange: 30,
        blobSize: 0.2,
        blur: 30,
      }
    },
    computed: {
      ...mapState(['windowWidth', 'windowHeight']),
      width() {
        return this.windowWidth
      },
      height() {
        return this.windowHeight
      },
      scaledRadius() {
        return this.radius * (this.width / 1920)
      },
      scaledBlur() {
        return this.blur * (this.width / 1920)
      },
    },
    methods: {
      setupCanvas() {
        const canvas = this.$refs.canvas
        const ctx = canvas.getContext('2d')
  
        canvas.width = this.width
        canvas.height = this.height
  
        ctx.filter = `blur(${this.scaledBlur}px)`
        ctx.shadowColor = `hsla(0, 0%, 0%, 0.15)`
        ctx.shadowOffsetX = 0
        ctx.shadowOffsetY = 4
        ctx.shadowBlur = 4
      },
      drawBlob() {
        const canvas = this.$refs.canvas
        const ctx = canvas.getContext('2d')
        const { mouseX, mouseY, baseHue, hueRange, blobSize } = this
  
        const scaledMouseX = mouseX * (this.width / 1920)
        const scaledMouseY = mouseY * (this.height / 1080)
        const scaledBlobSize = blobSize * (this.width / 1920)
  
        const centerX = this.width / 2
        const centerY = this.height / 2
        const distanceX = centerX - scaledMouseX
        const distanceY = centerY - scaledMouseY
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
        const normalizedDistance = distance / this.scaledRadius
  
        const hue = (baseHue + hueRange * normalizedDistance) % 360
  
        ctx.clearRect(0, 0, this.width, this.height)
        ctx.fillStyle = `hsla(${hue}, 70%, 60%, 0.3)`
  
        ctx.beginPath()
        ctx.arc(centerX, centerY, this.scaledRadius * (1 + scaledBlobSize * normalizedDistance), 0, 2 * Math.PI, false)
        ctx.fill()
      },
      handleMouseMove(event) {
        this.mouseX = event.clientX
        this.mouseY = event.clientY
      },
    },
    mounted() {
      this.setupCanvas()
  
      this.$refs.blobContainer.addEventListener('mousemove', this.handleMouseMove)
      window.addEventListener('resize', this.setupCanvas)
      this.drawInterval = setInterval(() => {
        this.drawBlob()
      }, 1000 / 60)
    },
    beforeUnmount() {
      this.$refs.blobContainer.removeEventListener('mousemove', this.handleMouseMove)
      window.removeEventListener('resize', this.setupCanvas)
      clearInterval(this.drawInterval)
    },
  }
  </script>

  <style lang="scss" scoped>
    .blob-container {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .blob-canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    #blob {
  background-color: white;
  height: 34vmax;
  aspect-ratio: 1;
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  border-radius: 50%;
  background: linear-gradient(to right, aquamarine, mediumpurple);
  animation: rotate 20s infinite;
  opacity: 0.8;
}

#blur {
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 2;
  backdrop-filter: blur(12vmax);
}

.meta-link > .label {
  width: 100px; 
  text-align: right;
}
    </style>