<template>
  <div class="brand-margin__tag-btn-brand-wrp">
    <button @click="toggleShow" class="brand-margin__tag-btn-brand">
      Выберите бренд
      <img class="brand-margin__tag-btn-brand-icon"
           src="@/assets/icon/arrow_to_down_icon.svg"
           alt=""
      />
    </button>
    <div class="brand-margin__tag-dropdown-wrp"
         :class="{active: isActive }"
    >
      <div class="brand-margin__tag-dropdown">
        <img src="@/assets/icon/search_icon_brand.svg" alt=""/>
        <input class="brand-margin__tag-dropdown-input" type="text" v-model="searchStr"/>
        <btn-close-dialog @click="toggleShow"></btn-close-dialog>
      </div>
      <div class="brand-margin__tag-dropdown-item-wrp">
        <p class="brand-margin__tag-dropdown-item-text"
           v-for="(item, index) in showList"
           :key="index"
           :data-id="item.id"
           @click="chose(item)"
        >
          {{ item.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "@/tools/search";
import BtnCloseDialog from "@component/UI/btnCloseDialog";

export default {
  components: {BtnCloseDialog},
  props: {
    modelValue: {
      type: Object,
      default() {
        return {};
      }
    },
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  emits: ['update:modelValue', 'selected'],
  data() {
    return {
      searchStr: '',
      isActive: false,
    }
  },
  computed: {
    showList() {
      return this.list
          .filter(el => {
            const searchVal = this.searchStr.toLowerCase().trim();
            const en = Search.transRuToEn(searchVal);
            const ru = Search.transEnToRu(searchVal);

            return el.name.toLowerCase().includes(en) ||
                el.name.toLowerCase().includes(ru)
          })
          .sort((a, b) => {
            const name1 = a.name.toLowerCase(),
                name2 = b.name.toLowerCase();

            if (name1 < name2) return -1;
            else if (name1 > name2) return 1;
            return 0;
          })
    }
  },
  methods: {
    chose(item) {
      this.isActive = false;
      this.$emit('update:modelValue', item);
      this.$emit('selected', item);
    },
    toggleShow() {
      this.isActive = !this.isActive
    },
  }
}
</script>

<style scoped>

</style>
