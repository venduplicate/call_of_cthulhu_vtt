<script setup lang="ts">
import RegHalfFifthBoxes from "./RegHalfFifthBoxes.vue";
import type { Weapon } from "../../stores/types/InvestigatorTypes";
import { ref, type PropType } from "vue";

const props = defineProps({
  weaponProp: { type: Object as PropType<Weapon>, required: true },
});

const weapon = ref(props.weaponProp);
const reghalffith = ref({
  reg: props.weaponProp.reg,
  half: props.weaponProp.half,
  fifth: props.weaponProp.fifth,
});
</script>

<template>
  <div class="weapon">
    <input type="text" :value="weapon.name" />
    <RegHalfFifthBoxes :valueData="reghalffith" />
    <input type="text" :value="weapon.attacks" />
    <input type="text" :value="weapon.range" />
    <input type="text" :value="weapon.damage" />
    <input type="text" :value="weapon.ammo" />
    <input type="text" :value="weapon.malf" />
  </div>
</template>

<style>
.weapon {
  display: flex;
}
</style>
