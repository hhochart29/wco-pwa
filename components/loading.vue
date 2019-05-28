<template>
  <div class="loading-page" v-show="loading">
    <div id="layer1" class="layer" :class="{'animating': animated}"/>
    <div id="layer2" class="layer" :class="{'animating': animated}"/>
    <div id="layer3" class="layer" :class="{'animating': animated}"/>
  </div>
</template>

<script>
export default {
  name: 'loading',
  data: () => ({
    loading: false,
    animated: false
  }),
  methods: {
    start () {
      this.loading = true
      setTimeout(() => {
        this.animated = true
      }, 1)
    },
    async finish () {
      this.animated = false
      await this.$delay(600)
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
  z-index: 99999;
  & .layer {
    position: fixed;
    bottom: -10vh;
    height: 110vh;
    left: -15vw;
    right: -15vw;
    transition: transform 0.3s ease-in-out;
  }
  & #layer1 {
    background-color: theme('colors.indigo-darker');
    transform: rotate(2deg) translateY(105vh);
    transition-delay: 0.3s;
    &.animating {
      transition-delay: 0s;
      transform: rotate(2deg) translateY(-5vh);
    }
  }
  & #layer2 {
    background-color: theme('colors.indigo-dark');
    transform: rotateZ(-2deg) translateY(105vh);
    transition-delay: 0.15s;
    &.animating {
      transition-delay: 0.15s;
      transform: rotateZ(-2deg) translateY(0vh);
    }
  }
  & #layer3 {
    background-color: theme('colors.indigo');
    transform: rotateZ(5deg) translateY(105vh);
    transition-delay: 0s;
    &.animating {
      transition-delay: 0.3s;
      transform: rotateZ(5deg) translateY(-3vh);
    }
  }
}
</style>
