<template>
  <div class="about">
    <div class="about-text1" ref="$animation1"></div>
    <div class="about-text2" ref="$animation2"></div>
  </div>
  <div class="demo">
    <div class="growsandstays">This grows and stays big.</div>
    <div class="grows">This just grows.</div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    console.log(this.$refs);
    this.$refs.$animation1.animate(
      {
        offsetDistance: ["0%", "100%"],
        offsetPath: [
          "path('M138.3,65.7016 C138.3,65.7016 140.3,126.3257 140.3,126.3257 C140.3,126.3257 190.3,92.3257 190.3,92.3257 C190.3,92.3257 192.3,39.3257 192.3,39.3257')",
          "path('M138.3,65.7016 C138.3,65.7016 140.3,126.3257 140.3,126.3257 C140.3,126.3257 190.3,92.3257 190.3,92.3257 C190.3,92.3257 192.3,39.3257 192.3,39.3257')",
        ],
        offsetAnchor: ["auto", "auto"],
        offsetRotate: ["0deg", "360deg"],
      },
      {
        direction: "alternate",
        duration: 3000,
        iterations: Infinity,
      }
    );

    const rabbitDownKeyframes = new KeyframeEffect(
      this.$refs.$animation2, // element to animate
      [
        { transform: "rotate(0)" }, // keyframe
        // { transform: "rotate(360deg)" }, // keyframe
      ],
      { duration: 2000, fill: "forwards", iterations: Infinity } // keyframe options
    );

    const rabbitDownAnimation = new Animation(
      rabbitDownKeyframes,
      document.timeline
    );

    // Play rabbit animation
    rabbitDownAnimation.play();
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.about {
  &-text1 {
    width: 50px;
    height: 100px;
    background: #acacac;
  }

  &-text2 {
    width: 50px;
    height: 100px;
    background: #abcdef;
  }
}
.demo {
  font-size: 24px;
  border-top: 100px solid #ccc;
  height: 300px;
}

@keyframes grow {
  0% {
    font-size: 0;
  }
  100% {
    font-size: 40px;
  }
}

.demo:hover .grows {
  animation-name: grow;
  animation-duration: 3s;
  animation-fill-mode: both;
}

.demo:hover .growsandstays {
  animation-name: grow;
  animation-duration: 3s;
  animation-fill-mode: both;
}
</style>
