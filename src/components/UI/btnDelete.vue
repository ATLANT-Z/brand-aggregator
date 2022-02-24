<template>
  <button class="bnt-del" v-bind="$attrs">
    <span class="bnt-del__dash-left"></span>
    <span class="bnt-del__dash-right"></span>
  </button>
  <slot></slot>
</template>

<script>
export default {
  name: 'btnDelete',
}
</script>

<style lang="scss" scoped>
.bnt-del {
  min-width: 24px;
  max-width: 24px;
  min-height: 24px;
  max-height: 24px;
  position: relative;
  border: $borderBlock;
  border-radius: $borderRadius;
  cursor: pointer;
  background-color: $colorWhite;

  &__dash-left {
    @include dashVertical;
    width: 15px;
    left: 50%;
    top: 50%;
    background-color: $mainColor;
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &__dash-right {
    @include dashVertical;
    width: 15px;
    left: 50%;
    top: 50%;
    background-color: $mainColor;
    transform: translate(-50%, -50%) rotate(-45deg);
  }
}
</style>
