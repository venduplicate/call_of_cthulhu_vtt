<script setup lang="ts">
import { ref } from "vue";
const props = defineProps({
  selectedTab: { type: Number, required: true, default: 1 },
  containerWidth: { type: Number, required: false },
  containerHeight: { type: Number, required: false },
});
//   export let selectedTab = 1;
//   export let containerWidth = 30;
//   export let containerHeight = 65;

const activeTab = ref(props.selectedTab);

function setActive(value: any) {
  activeTab.value = value;
}
let titles: { id: number; title: string }[] = [];
// setContext("activeTab", activeTab);
// setContext("tabTitles", {
//   register(id: number, title: string) {
//     titles.push({ id, title });
//     titles = titles;
//   },
//   updateTitle(id: number, title: string) {
//     const tabIndex = titles.findIndex((title) => title.id === id);
//     titles[tabIndex].title = title;
//   },
//   unregisterTab(id: number) {
//     const tabIndex = titles.findIndex((title) => title.id === id);
//     if (tabIndex > -1) {
//       titles.splice(tabIndex, 1);
//       titles = titles;
//     }
//   },
// });
</script>

<template>
  <div v-for="title in titles" :key="title.id">
    <button
      :class:selected="activeTab === title.id"
      class="tab-button"
      @click="
        () => {
          activeTab = title.id;
        }
      "
    >
      {{ title.title }}
    </button>
  </div>
  <div
    class="tabs-container"
    style:height="{containerHeight}vh"
    style:width="{containerWidth}vw"
  >
    <slot activeTab />
  </div>
</template>
<style>
.tabs-container {
  display: flex;
  border: solid black 5px;
  overflow-y: scroll;
  justify-content: center;
  align-items: center;
}
.selected {
  border-color: yellow;
  background: black;
}
.tab-button {
  border-bottom: none;
  border-radius: 1em 1em 1px 1px;
  max-width: 20em;
  margin-left: 1px;
  margin-right: 1px;
}
</style>
