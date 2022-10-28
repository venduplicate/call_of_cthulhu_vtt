<script setup lang="ts">
import { ref, type PropType } from "vue";
import type { Characteristic } from "../../stores/types/Characteristics";

const props = defineProps({
  valueData: { type: Object as PropType<Characteristic>, required: true },
});

const characteristicRef = ref(props.valueData);
characteristicRef.value.update()
const regular = ref(characteristicRef.value.reg);
const half = ref(characteristicRef.value.half);
const fifth = ref(characteristicRef.value.fifth);

function updateValues() {
  characteristicRef.value.updateCharacteristic(regular.value);
  characteristicRef.value.update();
  half.value = characteristicRef.value.half;
  fifth.value = characteristicRef.value.fifth;
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
