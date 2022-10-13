<script setup lang="ts">
//   import { getContext, onDestroy } from "svelte";
// import type { Writable } from "svelte/store";
//   import type { TabTitles as TabType } from "./types/Tabs";
//   export let title: string;
//   export let id: number;

//   let selectedTab: Writable<number> = getContext("activeTab");
//   const tabTitles: TabType = getContext("tabTitles");

//   $: tabTitles.updateTitle(id, title);

//   tabTitles.register(id, title);

//   onDestroy(() => {
//     tabTitles.unregisterTab(id);
//   });
</script>
<template>
  {#if $selectedTab === id}
  <slot />
  {/if}
</template>

<style></style>
