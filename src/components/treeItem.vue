<template>
  <li class="ui-tree__list-item">
    <div class="ui-tree__list-title-w" :class="{active: value.active && showActive}">
      <button class="ui-tree__list-btn" v-if="value.children.length" :class="{active: isActive}"
              @click="expandList"></button>
      <p class="ui-tree__list-btn-text">
        {{ value.title }}
      </p>
      <div class="ui-tree__list-btn-w" v-if="value.id">
        <slot name="add" :sItem="value" v-if="!value.active"></slot>
        <slot name="delete" :sItem="value" v-if="value.active && showActive"></slot>
      </div>
    </div>
    <ul class="ui-tree__list" :class="{active: isActive}" v-if="value.children.length">
      <tree-item v-for="(item) of value.children"
                 :key="item.id"
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
  </li>
</template>

<script>
import {TreeItemData} from "@/store/models/treeItemData";

export default {
  name: "treeItem",
  props: {
    value: TreeItemData,
    showActive: Boolean,
  },
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    expandList() {
      this.isActive = !this.isActive;
    },
  },

};
</script>

<style lang="scss">

</style>
