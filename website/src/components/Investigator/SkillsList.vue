<script setup lang="ts">
import CharacteristicValues from "./CharacteristicValues.vue";
import type { Skills } from "../../stores/types/InvestigatorTypes";
import { ref, type PropType } from "vue";

const props = defineProps({
  skillProp: { type: Object as PropType<Skills>, required: true },
});

const skills = ref(props.skillProp);
const addSkill = () => {
  console.log("test");
};
</script>

<template>
  <ul class="skills-list">
    <li style="align-items: center; justify-content: center">
      <button style="width: 10em; height: 2em">Add Skill</button>
    </li>
    <li v-for="[key, value] in skills" :key="key">
      <input
        id="skill-check"
        type="checkbox"
        class="checkbox-skill"
        :checked="value.hasImproved"
      />
      <CharacteristicValues :valueData="value" :valueName="key" />
    </li>
  </ul>
</template>

<style>
.skills-list {
  display: grid;
  grid-template-columns: repeat(2, 20em);
  justify-content: center;
  width: auto;
  list-style: none;
  margin-top: auto;
  padding: 1em;
}
li {
  display: flex;
}
.checkbox-skill {
  margin-top: 2.5em;
  width: 2em;
  height: 2em;
}
</style>
