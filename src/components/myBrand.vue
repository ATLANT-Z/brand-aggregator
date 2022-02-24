<template>
  <div class="brand-margin">
    <div class="brand-margin__tag">
      <ui-search-selector @selected="val => tab.addBrand(val)" :list="tab.brandList"/>
    </div>
    <div class="brand-margin__cont-wrp">
      <div class="brand-margin__cont"
           v-for="(brand, index) in tab.brands"
           :key="index"
           :class="{blink: brand.isBlink}"
           :id="'id-' + brand.brandId"
      >
        <div class="brand-margin__all-export-wrp">
          <div class="brand-margin__total-export">
            <btn-delete class="brand-margin__cont-btn-del" @click="removeBrand(brand)"></btn-delete>
            <p class="brand-margin__total-brand-text">
              {{ brand.name }}
            </p>
            <btn-main @click="showDial(brand)" title="Выбор экспорта"/>
          </div>
          <div class="brand-margin__list-margin">
            <margin-item v-for="(item, index) in brand.hasMargin.margin"
                         :key="index"
                         :value="item"
            ></margin-item>
            <btn-plus v-if="brand.hasMargin.isCanAdd" @click="brand.hasMargin.addMargin()"></btn-plus>
          </div>
        </div>
        <div class="brand-margin__item-export-brand">
          <div class="brand-exp-row"
               v-for="(exportRow, index) in brand.exports"
               :key="index"
          >
            <div class="brand-exp-row__left">
              <btn-delete @click="brand.removeExportMarginById(exportRow.exportId)"></btn-delete>
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
    <dialog-export v-model:show="dialogVisible">
      <export-tree head-title="Выберите экспорт" :list="currBrand.exportList">
        <template v-slot:add="{sItem}">
          <button class="ui-tree__add-btn" @click="currBrand.addExportMargin(sItem)">
            Добавить
          </button>
        </template>
        <template v-slot:delete="{sItem}">
          <button class="ui-tree__add-btn delete" @click="currBrand.removeExportMarginById(sItem.id)">
            Удалить
          </button>
        </template>
        <template v-slot:close>
          <btn-close-dialog class="bnt-style-close" @click="dialogVisible = false"></btn-close-dialog>
        </template>
      </export-tree>
    </dialog-export>
  </div>
  <btn-save @save="saveOnServer"></btn-save>
</template>

<script>
import dialogExport from "@component/UI/dialogExport";
import exportTree from './exportTree.vue'
import marginItem from './marginItem.vue'
import btnCloseDialog from "@component/UI/btnCloseDialog";
import btnDelete from "@component/UI/btnDelete";
import UiSearchSelector from "@/components/UI/UiSearchSelector";
import {mapActions, mapGetters} from "vuex";
import {BrandMarginItem} from "@/store/models/export";
import BtnPlus from "@/components/UI/btn-plus";
import BtnSave from "@/components/UI/btnSave";
import BtnMain from "@/components/UI/btnMain";


export default {
  name: 'myBrand',
  components: {
    BtnMain,
    BtnSave,
    BtnPlus,
    UiSearchSelector,
    exportTree,
    marginItem,
    dialogExport,
    btnCloseDialog,
    btnDelete
  },
  computed: {
    ...mapGetters({
      tab: 'getBrandTab'
    })
  },
  data() {
    return {
      currBrand: new BrandMarginItem({brand: this.item, margin: [], exports: []}, []),
      dialogVisible: false
    }
  },
  methods: {
    ...mapActions({
      saveOnServer: 'saveBrandData',
    }),
    removeBrand(item) {
      if ((item.exports.length || item.hasMargin.margin.length > 1) && !confirm('Вы действительно хотите удалить?'))
        return

      this.tab.removeBrand(item);
    },
    showDial(brandItem) {
      this.currBrand = brandItem;
      this.dialogVisible = true
    }
  },
  mounted() {
    console.dir(this.tab.brands);
    console.dir(this.tab.brands[0]);
  }
}
</script>
<style scoped>
.brand-margin {
  --left-side: 40%;
}
</style>
<style lang="scss">
%marginList {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
}

.brand-exp-row {
  display: flex;
  gap: 16px;

  &__left {
    min-width: var(--left-side);

    display: flex;
    align-items: center;
    gap: 4px;

    padding-left: 32px;
  }

  &__right {
    flex-grow: 1;
    @extend %marginList;
  }
}

.brand-margin {
  min-height: 660px;
  margin-bottom: 16px;

  &__tag {
    max-width: 1316px;
    width: 100%;
    height: 61px;
    margin-bottom: 10px;
    padding-left: 16px;
    border: 1px solid $mainColor;
    border-radius: $borderRadius;
    @include flexCent;
  }

  &__tag-title {
    @include blockUppercase;
    margin-right: 10px;
  }

  &__input {
    max-width: 221px;
    width: 100%;
    margin-right: 10px;
    border-bottom: 1px solid $mainColor;
  }

  &__tag-btn-brand {
    width: 292px;
    height: 35px;
    @include flexCentrJust;
    font-size: 17px;
    text-transform: uppercase;
    background-color: $backgroundColorHov;
    border-radius: $borderRadius;
  }

  &__tag-dropdown {
    width: 100%;
    height: 40px;
    padding: 0 16px;
    @include flexCent;
    justify-content: space-between;
    background-color: $colorWhite;
    border: 1px solid $mainColor;
    border-top-left-radius: $borderRadius;
    border-top-right-radius: $borderRadius;
  }

  &__tag-dropdown-wrp {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: none;

    &.active {
      display: block;
    }
  }

  &__tag-btn-brand-wrp {
    position: relative;
  }

  &__tag-dropdown-input {
    width: 172px;
    border-bottom: 1px solid $backgroundColorNav;
  }

  &__tag-dropdown-item-wrp {
    border: 1px solid $backgroundColorNav;
    border-top: 0;
    max-height: 347px;
    position: relative;
    overflow: auto;
    overscroll-behavior: none;
    border-bottom-left-radius: $borderRadius;
    border-bottom-right-radius: $borderRadius;
    background-color: $colorWhite;
    z-index: 100;
  }

  &__tag-btn-brand-icon {
    padding-left: 10px;
  }

  &__tag-dropdown-item-text {
    height: 48px;
    padding-left: 20px;
    @include flexCent;
    font-size: 17px;
    text-transform: uppercase;
    cursor: pointer;

    &:hover {
      background-color: $backgroundColorHov;
    }
  }

  &__cont-wrp {
    max-width: 1316px;
    width: 100%;
    border: 1px solid $backgroundColorNav;
    border-radius: $borderRadius;
  }

  &__cont {
    padding: 16px;

    & + & {
      border-top: 1px solid $backgroundColorNav;
    }

    &.blink {
      @extend %canBlink;
    }
  }

  &__cont-btn-del {
  }

  &__total-export {
    min-width: var(--left-side);

    @include flexCent;
    gap: 8px;
  }

  &__total-brand-text {
    width: 180px;

    font-size: 17px;
    text-transform: uppercase;
    @include lineClamp(2);

    text-overflow: ellipsis;
  }

  &__list-margin {
    @extend %marginList;
  }

  &__all-export-wrp {
    @include flexCent;
    gap: 16px;
  }

  &__item-export-brand {
    padding-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__line-block {
    width: 100%;
    height: 1px;
    background-color: $backgroundColorNav;
  }
}

.bnt-style-close {
  margin-left: auto;
}
</style>
