<script setup lang="ts">
import RegHalfFifthBoxes from "./RegHalfFifthBoxes.vue";
import type { Characteristic } from "../../stores/types/Characteristics";
import { ref, type PropType } from "vue";

const props = defineProps({
  valueData: { type: Object as PropType<Characteristic>, required: true },
  valueName: { type: String, required: true },
});

const value = ref(props.valueData);
</script>

<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      margin: 1em;
      padding: 0.5em;
      max-width: 15em;
    "
  >
    <div
      style="
        display: flex;
        justify-content: space-around;
        font-size: x-small;
        margin-left: 1em;
      "
    >
      <span style="min-width: 3em"></span>
      <em>Reg</em>
      <em>Half</em>
      <em>Fifth</em>
    </div>
    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
      "
    >
      <em style="font-size: small; margin-right: 0.5em; min-width: 7em">{{
        valueName
      }}</em>
      <RegHalfFifthBoxes :valueData="value" />
    </div>
  </div>
</template>
