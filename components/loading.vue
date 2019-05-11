<template>
  <transition appear name="fade">
    <div class="loading-page" v-show="loading">
      <div id="layer1" class="layer" :class="{'animating': animated}"/>
      <div id="layer2" class="layer" :class="{'animating': animated}"/>
      <div id="layer3" class="layer" :class="{'animating': animated}"/>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'loading',
  data: () => ({
    loading: false,
    animated: false
  }),
  methods: {
    delay (duration) {
      return new Promise((resolve, reject) => {
        setTimeout(() => { resolve() }, duration)
      })
    },
    start () {
      this.loading = true
      setTimeout(() => {
        this.animated = true
      }, 1)
    },
    async finish () {
      await this.delay(1000)
      this.animated = false
      await this.delay(1000)
      this.loading = false
    }
  }
}
</script>

<style lang="postcss" scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: config('colors.indigo-darkest');
  z-index: 99999;
  & .layer {
    position: fixed;
    bottom: -10vh;
    height: 110vh;
    left: -15vw;
    right: -15vw;
    transition: transform 1s ease-in-out;
  }
  & #layer1 {
    background-color: config('colors.indigo-darker');
    transform: translateY(105vh);
    transition-delay: 0.5s;
    &.animating {
      transition-delay: 0s;
      transform: translateY(-5vh);
    }
  }
  & #layer2 {
    background-color: config('colors.indigo-dark');
    transform: rotateZ(-2deg) translateY(105vh);
    transition-delay: 0.2s;
    &.animating {
      transition-delay: 0.2s;
      transform: rotateZ(-2deg) translateY(0vh);
    }
  }
  & #layer3 {
    background-color: config('colors.indigo');
    transform: rotateZ(5deg) translateY(105vh);
    transition-delay: 0s;
    &.animating {
      transition-delay: 0.5s;
      transform: rotateZ(5deg) translateY(-3vh);
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
