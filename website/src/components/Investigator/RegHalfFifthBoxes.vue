<script setup lang="ts">
import type { Characteristic } from "../../stores/types/InvestigatorTypes";
import { ref, type PropType } from "vue";

const props = defineProps({
  valueData: { type: Object as PropType<Characteristic>, required: true },
});

const regular = ref(props.valueData.reg);
const half = ref(Math.floor(regular.value / 2));
const fifth = ref(Math.floor(regular.value / 5));

function updateValues() {
  half.value = Math.floor(regular.value / 2);
  fifth.value = Math.floor(regular.value / 5);
}
</script>

<template>
  <div class="inputs-border">
    <div class="input-alignment" data-id="Reg">
      <input
        id="reg"
        type="text"
        name=""
        :value="regular"
        @change="updateValues"
      />
    </div>
    <div class="input-alignment" data-id="Half">
      <input id="half" type="text" name="" :value="half" disabled />
    </div>
    <div class="input-alignment" data-id="Fifth">
      <input id="fifth" type="text" name="" :value="fifth" disabled />
    </div>
  </div>
</template>

<style>
.input-alignment {
  display: flex;
  align-items: center;
  border: solid black 0.2em;
}
.inputs-border {
  display: flex;
  border: solid black 0.2em;
  border-radius: 0.5em;
  align-items: center;
  height: fit-content;
  width: fit-content;
}
input {
  width: 4em;
  height: 2em;
  text-align: center;
  border: 0;
  font-size: x-small;
}
</style>
