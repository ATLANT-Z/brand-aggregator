<template>
  <input type="checkbox"
         class="ui-checkbox-2"
         v-model="value"
         v-bind="$attrs"
  />
</template>

<script>
export default {
  name: 'myCheckbox',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      value: this.modelValue,
    }
  },
  watch: {
    modelValue(val) {
      this.value = val;
    },
    value(value) {
      this.$emit('update:modelValue', value)
    }
  },
}
</script>

<style lang="scss" scoped>
.ui-checkbox-2 {
  --margin: 12px;
  --size: 12px;
  position: relative;
  display: block;
  @include fixedWH(0px, 0px);
  margin: var(--margin);
  background-color: transparent;
  cursor: pointer;
  pointer-events: auto;

  @include animAll($anim-small-time);

  &::before,
  &::after {
    content: "";
    transform: translate(-50%, -50%);
    position: absolute;
    top: 50%;
    left: 50%;

    @include fixedWH(Calc(var(--size) * 2), Calc(var(--size) * 2));
    display: flex;

    background-image: none;
  }

  &:before {
    background-color: #ffffff;
    border: 1px solid $mainColor;
    border-radius: 8px;
  }

  &:after {
    transform: translate(-52%, -50%) scale(0);
    clip-path: polygon(74% 23%, 85% 31%, 46% 81%, 19% 56%, 26% 46%, 45% 62%);
    background-color: white;
    opacity: 0;
  }

  &:checked:before,
  &.checked:before {
    background-color: $mainColor;
  }

  &:checked:after,
  &.checked:after {
    transform: translate(-50%, -50%) scale(0.9);
    opacity: 1;
  }
}
</style>
