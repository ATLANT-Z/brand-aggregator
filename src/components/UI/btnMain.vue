<template>
  <div class="ui-main-btn" v-bind="$attrs">
    {{title}}
  </div>
</template>

<script>
export default {
  props: {
    title: String
  }
}
</script>

<style lang="scss" scoped>
.ui-main-btn {
  padding: 8px 16px;
  font-size: 16px;
  background-color: $mainColor;
  color: $colorWhite;
  border-radius: $borderRadius;
  @include flexCentrJust;

  cursor: pointer;
}
</style>
