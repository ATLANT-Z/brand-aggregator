<template>
  <div class="margin-item" :class="{ isDisable: isDisable }">
    <div class="margin-item__source-wrp">
      <Checkbox v-model="isActive" :id="'marginItem-' + exportRow.exportId">
      </Checkbox>
      <btn-delete @click="exportTab.removeExportMarginById(exportRow.exportId)"></btn-delete>
      <p class="ui-nested-title">
        {{ exportRow.title }}
      </p>
    </div>
    <div class="markup-all-price"
         v-for="(item, index) in exportRow.margin"
         :key="index">
      <margin-item :value="item"></margin-item>
    </div>
    <btn-plus v-if="exportRow.isCanAdd" @click="exportRow.addMargin()"></btn-plus>
  </div>
</template>

<script>
import marginItem from "./marginItem.vue";
import Checkbox from "@component/UI/checkbox";
import btnDelete from "@component/UI/btnDelete";
import {ExportItem} from "@/store/models/export";
import {mapGetters} from "vuex";
import BtnPlus from "@/components/UI/btn-plus";

export default {
  components: {
    BtnPlus,
    btnDelete,
    marginItem,
    Checkbox
  },
  props: {
    exportRow: ExportItem
  },
  computed: {
    ...mapGetters({
      exportTab: 'getExportTab',
      exportAll: 'getExportAll',
    }),
    isDisable() {
      return !this.isActive || this.exportAll.active
    },
    isActive: {
      get() {
        return this.exportRow.active;
      },
      set(val) {
        return this.exportRow.setActive(val);
      }
    }
  },
};
</script>

<style lang="scss">

.markup-all-price {
  @include flexCent;
  position: relative;
  gap: 4px;
  opacity: 1;
  background-color: white;

  @include hasParent('.isDisable') {
    cursor: not-allowed;
    * {
      pointer-events: none;
    }
  }
}

.margin-item {
  padding-top: 5px;
  @include flexCent;
  gap: 4px;
  align-items: center;
  flex-wrap: wrap;

  &.isDisable {
    opacity: 0.5;
  }

  &__source-wrp {
    @include flexCent;
    gap: 4px;
  }
}

.custom-checkbox {
  &__text {
    @include textUpper;
  }
}
</style>
