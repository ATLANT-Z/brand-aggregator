<template>
  <div class="markup-category">
    <button @click="isCategoryVisible = true" class="markup-category__btn">
      Выбор категории
    </button>
    <div class="brand-margin__cont-wrp">
      <div class="brand-margin__cont"
           v-for="(category, index) in tab.categories"
           :key="index"
           :class="{blink: category.isBlink}"
           :id="'id-' + category.id"
      >
        <div class="brand-margin__all-export-wrp">
          <div class="brand-margin__total-export">
            <btn-delete class="brand-margin__cont-btn-del" @click="removeCategory(category)"></btn-delete>
            <div class="ui-nested-title">
              {{ category.title }}
            </div>
            <btn-main @click="categoryAddExport(category)" title="Выбор экспорта"/>
          </div>
          <div class="brand-margin__list-margin">
            <margin-item v-for="(item, index) in category.hasMargin.margin"
                         :key="index"
                         :value="item"
            ></margin-item>
            <btn-plus v-if="category.hasMargin.isCanAdd" @click="category.hasMargin.addMargin()"></btn-plus>
          </div>
        </div>
        <div class="brand-margin__item-export-brand">
          <div class="brand-exp-row"
               v-for="(exportRow, index) in category.exports"
               :key="index"
          >
            <div class="brand-exp-row__left">
              <btn-delete @click="category.removeExportMarginById(exportRow.exportId)"></btn-delete>
              <p class="ui-nested-title">
                {{ exportRow.title }}
              </p>
            </div>
            <div class="brand-exp-row__right">
              <margin-item v-for="(item, index) in exportRow.margin"
                           :key="index"
                           :value="item"
              ></margin-item>
              <btn-plus v-if="exportRow.isCanAdd" @click="exportRow.addMargin()"></btn-plus>
            </div>
          </div>
        </div>
      </div>
    </div>


    <dialog-export v-model:show="isExportVisible">
      <export-tree head-title="Выберите экспорт" :list="currCategory.exportList">
        <template v-slot:close>
          <btn-close-dialog class="bnt-style-close" @click="isExportVisible = false"></btn-close-dialog>
        </template>
        <template v-slot:add="{sItem}">
          <button class="ui-tree__add-btn" @click="currCategory.addExportMargin(sItem)">
            Добавить
          </button>
        </template>
        <template v-slot:delete="{sItem}">
          <button class="ui-tree__add-btn delete" @click="currCategory.removeExportMarginById(sItem.id)">
            Удалить
          </button>
        </template>
      </export-tree>
    </dialog-export>
    <dialog-export v-model:show="isCategoryVisible">
      <export-tree head-title="Выберите экспорт" :list="tab.categoryList">
        <template v-slot:add="{sItem}">
          <button class="ui-tree__add-btn" @click="tab.addCategory(sItem)">
            Добавить
          </button>
        </template>
        <template v-slot:delete="{sItem}">
          <button class="ui-tree__add-btn delete" @click="tab.removeCategoryById(sItem.id)">
            Удалить
          </button>
        </template>
        <template v-slot:close>
          <btn-close-dialog class="bnt-style-close" @click="isCategoryVisible = false"></btn-close-dialog>
        </template>
      </export-tree>
    </dialog-export>
  </div>
  <btn-save @save="saveOnServer"></btn-save>
</template>

<script>
import marginItem from "./marginItem.vue";
import DialogExport from "@/components/UI/dialogExport";
import BtnCloseDialog from "@/components/UI/btnCloseDialog";
import BtnDelete from "@/components/UI/btnDelete";
import ExportTree from "@/components/exportTree";
import BtnMain from "@/components/UI/btnMain";
import {mapActions, mapGetters} from "vuex";
import BtnPlus from "@/components/UI/btn-plus";
import BtnSave from "@/components/UI/btnSave";

export default {
  name: "markupPerCategory",
  components: {
    BtnSave,
    BtnPlus,
    BtnMain,
    ExportTree,
    BtnDelete,
    BtnCloseDialog,
    DialogExport,
    marginItem,
  },
  data() {
    return {
      isCategoryVisible: false,
      isExportVisible: false,
      currCategory: {}
    };
  },
  computed: {
    ...mapGetters({
      tab: 'getCategoryTab'
    })
  },
  methods: {
    ...mapActions({
      saveOnServer: 'saveCategoryData',
    }),
    removeCategory(item) {
      if ((item.exports.length || item.hasMargin.margin.length > 1) && !confirm('Вы действительно хотите удалить?'))
        return

      this.tab.removeCategoryById(item.id);
    },
    categoryAddExport(category) {
      this.currCategory = category;
      this.isExportVisible = true;
    }
  },
};
</script>

<style scoped>
.markup-category {
  --left-side: 40%;
}
</style>

<style lang="scss">

.markup-category {
  height: 660px;
  @include contentGrid;
  @include marginCentre;

  margin-bottom: 16px;

  &__btn {
    width: 389px;
    height: 48px;
    margin-bottom: 24px;
    @include flexCentrJust;
    background-color: $mainColor;
    color: $colorWhite;
    text-transform: uppercase;
    border-radius: $borderRadius;
  }

  &__dialog-categories-btn-wrp {
    width: 46px;
    height: 24px;
    margin-left: 10px;
    background-color: #dddddd;
    border-radius: 12px;
    position: relative;
  }

  &__dialog-categories-btn {
    background-color: $colorWhite;
    width: 22px;
    height: 22px;
    position: absolute;
    top: 1px;
    left: 1px;
    border-radius: 50%;
  }

  &__dialog-categories-btn-line-r,
  &__dialog-categories-btn-line-l {
    height: 2px;
    width: 15px;
    background-color: #dddddd;
    position: absolute;
    top: 10px;
    left: 3px;
  }

  &__dialog-categories-btn-line-r {
    transform: rotate(45deg);
  }

  &__dialog-categories-btn-line-l {
    transform: rotate(-45deg);
  }

  &__dialog-categories-btn-subcate {
    @include flexCent;
    text-transform: initial;
  }

}

.lineVertical {
  border-left: 1px solid $backgroundColorNav;
  padding-left: 9px;
}
</style>
