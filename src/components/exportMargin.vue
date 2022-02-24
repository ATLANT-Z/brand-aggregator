<template>
  <div class="export-margin" v-bind="$attrs">
    <div class="export-margin__unloading">
      <h2 class="export-margin__title">Выгрузки</h2>
      <export-tree head-title="Выберите экспорт" :list="tab.exportList">
        <template v-slot:add="{sItem}">
          <button class="ui-tree__add-btn" @click="tab.addExportMargin(sItem)">
            Добавить
          </button>
        </template>
        <template v-slot:delete="{sItem}">
          <button class="ui-tree__add-btn delete" @click="tab.removeExportMarginById(sItem.id)">
            Удалить
          </button>
        </template>
      </export-tree>
      <div class="checkbox-wrp">
        <MyCheckbox id="allCheckbox" v-model="exportAll.active">
        </MyCheckbox>
        <label class="custom-checkbox__text" for="allCheckbox">
          <p class="custom-checkbox__text-style">
            Выбрать все экспорты
          </p>
        </label>
      </div>
      <div class="export-margin__btn-pus-wrp" :class="{isDisable: !exportAll.active}">
        <margin-item v-for="(item,index) in exportAll.margin"
                     :key="index"
                     :value="item"
        ></margin-item>
        <btn-plus v-if="exportAll.isCanAdd" @click="exportAll.addMargin()"></btn-plus>
      </div>
    </div>
    <div class="export-margin__margin">
      <h2 class="export-margin__title">Наценка</h2>
      <div class="export-margin__container">
        <export-margin-item v-for="item of list"
                            :key="item.exportId"
                            :exportRow="item">
        </export-margin-item>
      </div>
    </div>
  </div>
  <btn-save @save="saveOnServer"></btn-save>
</template>

<script>
import exportTree from './exportTree.vue'
import marginItem from './marginItem.vue'
import exportMarginItem from './exportMarginItem.vue'
import {mapGetters, mapActions} from "vuex";
import BtnSave from "@/components/UI/btnSave";
import BtnPlus from "@/components/UI/btn-plus";
import MyCheckbox from "@/components/UI/checkbox";

export default {
  name: "exportMargin",
  components: {
    MyCheckbox,
    BtnPlus,
    BtnSave,
    exportTree,
    marginItem,
    exportMarginItem
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      tab: 'getExportTab',
      list: 'getExportMarginList',
      exportAll: 'getExportAll'
    }),
  },
  methods: {
    ...mapActions({
      saveOnServer: 'saveExportData',
    })
  }
}
</script>

<style lang="scss" scoped>
.checkbox-wrp {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 0;
}

.export-margin {
  min-height: 660px;
  margin-bottom: 16px;
  color: $mainColor;
  @include flexSpasBit;
  @include contentGrid;
  @include magCent;
  gap: 8px;

  &__unloading {
    max-width: 450px;
    width: 100%;
  }

  &__title {
    margin-bottom: $magButt;
    font-size: 17px;
    text-align: left;
  }

  &__btn-pus-wrp {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px;
  }

  &__container {
    max-width: 857px;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 8px;
    gap: 8px;
    border: $borderBlock;
    border-radius: $borderRadius;
  }

  &__margin {
    width: 100%;
  }
}
</style>
