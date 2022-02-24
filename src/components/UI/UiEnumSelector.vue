<template>
  <div class="ui-selector-2" :class="{active: isActive }" @click.stop="toggleShow">
    <div class="ui-selector-2__input-w">
      <span class="ui-selector-2__input">
        {{ getName(modelValue) }}
      </span>
      <img class="ui-selector-2__icon" src="@/assets/icon/arrow_to_down_icon.svg" alt=""/>
    </div>
    <div class="ui-selector-2__list" @click.stop>
      <span class="ui-selector-2__list-item"
            v-for="(key, index) in list"
            :key="index"
            @click="chose(key)"
      >
        {{ getName(key) }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    enumList: {
      type: Object,
      required: true
    }
  },
  emits: ['update:modelValue', 'selected'],
  data() {
    return {
      isActive: false,
    }
  },
  computed: {
    list() {
      //Получает цифровые ключи enum
      return Object.keys(this.enumList).filter(x => !isNaN(x));
    }
  },
  methods: {
    getName(key) {
      return this.enumList[+key];
    },
    chose(item) {
      this.hide();
      this.$emit('update:modelValue', +item);
      this.$emit('selected', +item);
    },
    toggleShow() {
      this.isActive = !this.isActive
    },
    hide() {
      this.isActive = false;
    }
  },
  mounted() {
    window.addEventListener('click', this.hide)
  },
  unmounted() {
    window.removeEventListener('click', this.hide)
  }
}
</script>

<style lang="scss" scoped>
.ui-selector-2 {
  position: relative;
  height: 34px;
  min-width: 56px;
  max-width: 120px;

  display: flex;
  align-items: center;

  color: $colorBlack;
  text-transform: uppercase;

  @include animAll();
  cursor: pointer;


  &__icon {
    margin-left: auto;
    @include hasParent('.active') {
      transform: rotate(90deg);
    }
  }

  &__input-w {
    height: 100%;
    width: 100%;

    display: flex;
    gap: 4px;
    align-items: center;

    padding: 4px;

    background-color: white;
    border: 1px solid #8bbfbb;
    border-radius: 8px;

    @include hasParent('.active') {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  &__list {
    position: absolute;
    top: Calc(100% - 1px);
    left: 0;

    max-height: 240px;
    width: 100%;
    display: flex;
    flex-direction: column;

    background-color: white;
    border: 1px solid $backgroundColorNav;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;

    opacity: 0;
    visibility: hidden;

    @include scrollbarStyle();
    overflow: auto;
    z-index: 2;

    @include hasParent('.active') {
      opacity: 1;
      visibility: visible;
    }
  }

  &__list-item {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 2px 4px;

    &:hover {
      background-color: $backgroundColorHov;
    }
  }
}
</style>
