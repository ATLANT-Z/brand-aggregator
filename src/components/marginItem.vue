<template>
  <btn-delete v-if="value.isCanRemove" @click="value.remove()"></btn-delete>
  <div class="margin">
    <input class="margin__price" type="number"
           name="margin"
           min="0"
           v-model="mutable(value).value"
           :step="step"
    />
    <UiEnumSelector v-model="mutable(value).type" :enum-list="enumList"/>
  </div>
</template>

<script>
import BtnDelete from "@/components/UI/btnDelete";
import {mapGetters} from "vuex";
import {MarginItem, MarginType} from "@/store/models/export";
import UiEnumSelector from "@/components/UI/UiEnumSelector";

export default {
  components: {UiEnumSelector, BtnDelete},
  props: {
    value: {
      type: MarginItem,
      require: true
    },
  },
  data() {
    return {
      enumList: MarginType
    }
  },
  computed: {
    ...mapGetters({
      mutable: 'getMutableMarginItem'
    }),
    step() {
      if (this.value.type === MarginType.грн || this.value.type === MarginType["-грн"])
        return 1;
      else
        return 0.1
    },
  },
};
</script>

<style lang="scss" scoped>

.margin {
  display: flex;
  gap: 4px;

  @include hasParent('.isDisable') {
    opacity: 0.6;
    pointer-events: none;
  }

  &__price {
    width: 56px;
    height: 34px;

    @include flexCentrJust;

    padding: 4px;

    background-color: white;
    border: $borderBlock;
    border-radius: $borderRadius;

    -moz-appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  &__list-wrp {
    width: 64px;
    height: 34px;

    padding: 4px 0 4px 4px;

    color: $colorBlack;
    text-transform: uppercase;

    background-color: white;
    border: $borderBlock;
    border-radius: $borderRadius;
  }

  &__currency {
    color: $colorBlack;
    text-transform: uppercase;
  }
}

option {
  border-radius: 8px;
}

</style>
