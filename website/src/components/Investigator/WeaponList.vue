<script setup lang="ts">
import type { Weapon } from "../../stores/types/InvestigatorTypes";
import { ref, type PropType } from "vue";

const props = defineProps({
  weaponsProp: { type: Array as PropType<Weapon[]>, required: true },
});

const weapons = ref(props.weaponsProp);

function addWeapon() {
  const temp = [...weapons.value];
  // temp.push({
  //   name: "",
  //   type: ""
  //   reg: 0,
  //   damage: "",
  //   attacks: 0,
  //   range: "",
  //   ammo: 0,
  //   malf: "",
  // });
  // weaponsWritable.set(temp);
}
</script>

<template>
  <div>
    <Weapon v-for="weapon in weapons" :key="weapon.name" :weaponData="weapon" />
    <button>Add Weapon</button>
  </div>
</template>
