<script setup lang="ts">
import { type PropType, ref } from "vue";
import type { BackStory } from "../../stores/types/InvestigatorTypes";
import LargeTextArea from "../LargeTextArea.vue";
import TabContainer from "../TabContainer.vue";
import TabPanel from "../TabPanel.vue";
// export let backStory;

const props = defineProps({
  backStory: { type: Object as PropType<BackStory>, required: true },
});

const backStoryRef = ref([
  { title: "Personal Description", text: props.backStory.personal_desc },
  { title: "Traits", text: props.backStory.traits },
  { title: "Ideology & Beliefs", text: props.backStory.ideology_beliefs },
  { title: "Injuries and Scars", text: props.backStory.injuries_scars },
  { title: "Significant People", text: props.backStory.significant_people },
  { title: "Phobias & Manias", text: props.backStory.phobias_manias },
  {
    title: "Meaningiful Locations",
    text: props.backStory.meaningful_locations,
  },
  {
    title: "Arcane Tomes & Spells",
    text: props.backStory.arcane_tomes_spells_artifacts,
  },
  {
    title: "Treasured Possessions",
    text: props.backStory.treasured_possessions,
  },
  {
    title: "Encounters with Strange Enemies",
    text: props.backStory.encounters_with_strange_entities,
  },
]);
</script>

<template>
  <div
    style="
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-self: flex-start;
      margin-top: 1em;
    "
  >
    <TabContainer :activeTab="1" :containerHeight="70" :containerWidth="45">
      <TabPanel
        v-for="(item, index) in backStoryRef"
        :key="item.title"
        :title="item.title"
        :id="index"
      >
        <LargeTextArea :title="item.title" :textData="item.text" />
      </TabPanel>
    </TabContainer>
  </div>
</template>

<style>
.multi-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 10em);
  column-gap: 10em;
  margin-top: auto;
}
.single-wrapper {
  display: flex;
  margin-top: 3em;
  align-items: flex-start;
  width: 100%;
  border: solid black 2px;
  padding: 1em;
  border-radius: 1em 0 1em 0;
  box-shadow: 0.5em 1em black;
}
</style>
