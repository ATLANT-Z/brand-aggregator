<template>
  <button class="close-btn" v-bind="$attrs">
    <span class="close-btn__line-r"></span>
    <span class="close-btn__line-l"></span>
  </button>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.close-btn {
  position: relative;
  width: 24px;
  height: 24px;

  background-color: white;
  border: 1px solid $colorRed;
  border-radius: $borderRadius;


  &__line-r {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);

    width: 14px;
    height: 2px;
    background-color: $colorRed;
  }

  &__line-l {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);

    width: 14px;
    height: 2px;
    background-color: $colorRed;
  }
}
</style>
