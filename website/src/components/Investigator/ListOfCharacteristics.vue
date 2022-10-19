<script setup lang="ts">
import CharacteristicValues from "./CharacteristicValues.vue";

const attributes = [
  "STR",
  "CON",
  "DEX",
  "INT",
  "SIZ",
  "POW",
  "APP",
  "EDU",
  "Hit Points",
  "Magic Points",
  "Luck",
  "Sanity",
];
</script>

<template>
  <div class="box-one">
    <CharacteristicValues
      v-for="attribute in attributes"
      :key="attribute"
      :charData="{ name: attribute, reg: 100 }"
    />
  </div>
</template>

<style>
.char-box {
  display: flex;
  width: 50vw;
}
.box-one {
  display: flex;
  flex-wrap: wrap;
}
</style>
