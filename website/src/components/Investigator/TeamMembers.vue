<script setup lang="ts">
// const props = defineProps({team: {type: Object as PropType<{}>}})
//export let teamData;
</script>

<template>
  <div class="multi-wrapper">
    <div class="single-wrapper" v-for="item in Array(6)" :key="item">
      <label for="char">Character</label><input id="char" type="text" />
      <label for="player">Player</label><input id="player" type="text" />
    </div>
  </div>
</template>

<style>
.multi-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 15em);
  justify-content: center;
  column-gap: 1em;
}
.single-wrapper {
  display: flex;
  flex-direction: column;
  margin: 1em;
  border: solid black 2px;
  padding: 1em;
  border-radius: 1em 0 1em 0;
  box-shadow: 0.5em 1em black;
}
</style>
