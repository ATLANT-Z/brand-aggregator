<template>
  <div class="ui-tree">
    <div class="ui-tree__head">
      <h2 class="ui-tree__head-title">
        {{ headTitle }}
      </h2>
      <slot name="close"></slot>
    </div>
    <div class="ui-tree__list-w">
      <ul class="ui-tree__list active">
        <tree-item v-for="(item, index) of list"
                   :key="item.id || index"
                   :value="item"
                   :show-active="showActive"
        >
          <template v-slot:add="{sItem}">
            <slot name="add" :sItem="sItem"></slot>
          </template>
          <template v-slot:delete="{sItem}">
            <slot name="delete" :sItem="sItem"></slot>
          </template>
        </tree-item>
      </ul>
    </div>
  </div>
</template>

<script>
import treeItem from "@component/treeItem";

export default {
  components: {treeItem},
  props: {
    headTitle: {
      type: String,
      required: true
    },
    list: {
      type: Array,
      required: true
    },
    showActive: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss">

.ui-tree {
  min-width: 450px;
  max-width: 740px;

  font-size: 16px;
  text-transform: uppercase;

  @include animAll();

  &__head {
    position: relative;
    height: 40px;

    padding: 0 16px;
    @include flexCentrJust;
    justify-content: space-between;

    background-color: $colorWhite;
    border: 1px solid $mainColor;
    border-top-left-radius: $borderRadius;
    border-top-right-radius: $borderRadius;

    z-index: 1000;
  }

  &__head-title {
    font-size: 18px;
    color: $mainColor;
    font-weight: 600;
  }

  &__list-w {
    max-height: 60vh;

    padding-left: 4px;

    border: 1px solid $mainColor;
    border-top: 0;
    border-bottom-left-radius: $borderRadius;
    border-bottom-right-radius: $borderRadius;

    overflow: auto;
    overscroll-behavior: none;
    @include scrollbarStyle();
  }

  &__list {
    position: relative;
    padding-left: 12px;

    & & {
      padding-left: 24px;
    }

    height: 0;
    max-height: 0;
    opacity: 0;
    z-index: -1;
    transition: 0.3s ease-out;

    overflow: hidden;

    &.active {
      height: 100%;
      max-height: 100vh;
      overflow: visible;

      opacity: 1;
      z-index: 2;
    }
  }

  &__list-item {
    position: relative;

    border-left: 1px solid $backgroundColorNav;
    display: flex;
    flex-direction: column;

    &::before {
      content: "";
      width: 1px;
      height: 32px;
      position: absolute;
      top: -20px;
      left: -1px;
      background-color: $backgroundColorNav;
    }

    &:last-child::after {
      content: "";
      width: 2px;
      position: absolute;
      top: 33px;
      bottom: 0;
      left: -1px;
      background-color: $colorWhite;
    }
  }

  &__list-title-w {
    position: relative;
    height: 64px;

    display: flex;
    align-items: center;
    padding-left: 12px;
    padding-right: 8px;

    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: -1px;
      transform: translateY(-50%);

      width: 24px;
      height: 1px;

      background-color: $backgroundColorNav;
    }

    &:hover {
      background-color: $backgroundColorHov;

      .ui-tree__add-btn {
        opacity: 1;
        visibility: visible;
      }
    }

    &.active {
      background-color: $backgroundColorHov;
    }

    //&::after {
    //  content: "";
    //  position: absolute;
    //  height: 64px;
    //  left: -27px;
    //  right: 0;
    //  background-color: $backgroundColorHov;
    //  z-index: -1;
    //}
    //
    //&::before {
    //  content: "";
    //  width: 1px;
    //  height: 32px;
    //  position: absolute;
    //  top: -20px;
    //  left: -1px;
    //  background-color: $backgroundColorNav;
    //}
  }

  &__list-btn {
    margin-right: 8px;
    @include btnPlus;
    position: relative;
    background-color: #ffffff;
    border: 1px solid $mainColor;

    &.active {
      &::before {
        transform: rotate(180deg);
        transition: 0.3s ease-in;
      }
    }

    &::before {
      content: '';
      @include dashVertical;
      top: 10px;
      left: 4px;
      background-color: $mainColor;
    }

    &::after {
      content: '';
      @include dashHorizon;
      top: 10px;
      left: 4px;
      background-color: $mainColor;
    }
  }

  &__list-btn-text {
    padding-left: 8px;
  }

  &__list-btn-w {
    margin-left: auto;
  }

  &__add-btn {
    padding: 11px;
    right: 21px;
    color: $colorWhite;
    outline: none !important;

    display: flex;
    opacity: 0;
    visibility: hidden;

    background-color: $colorBtn;
    text-transform: uppercase;
    border-radius: $borderRadius;
    z-index: 20;

    &.delete {
      background-color: #aa3c3c;
      opacity: 1;
      visibility: visible;
    }

    @include btnDelete(".btnDelete") {
      background-color: #aa3c3c;
    }
  }
}

.activBtn {
  transform: rotate(180deg);
  transition: 0.3s ease-in;
}

</style>
