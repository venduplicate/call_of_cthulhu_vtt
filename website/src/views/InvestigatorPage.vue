<script setup lang="ts">
import CharacteristicValues from "../components/Investigator/CharacteristicValues.vue"
import SkillsList from "../components/Investigator/SkillsList.vue";
import { useInvestigatorStore } from "../stores/InvestigatorStore";

const investigator = useInvestigatorStore();
</script>

<template>
  <div style="display: flex; justify-content: space-around">
    <div style="display: flex; flex-direction: column">
      <div style="display: flex; align-content: space-around">
        <div
          style="
            border: solid black 2px;
            padding: 2em;
            border-radius: 2em;
            max-width: 15em;
          "
        >
          <div style="width: 10em; height: 10em; background-color: blue" />
        </div>
        <div
          style="
            display: flex;
            flex-wrap: wrap;
            margin-left: 5em;
            margin-right: 5em;
            justify-content: space-between;
          "
        >
          <div class="label-wrapper">
            <input style="" id="name" type="text" />
            <label for="name">Character Name</label>
          </div>
          <div class="label-wrapper">
            <input type="text" />
            <label for="name">Birthplace</label>
          </div>
          <div class="label-wrapper">
            <input type="text" />
            <label for="name">Pronouns</label>
          </div>
          <div class="label-wrapper">
            <input type="text" />
            <label for="name">Occupation</label>
          </div>
          <div class="label-wrapper">
            <input type="text" />
            <label for="name">Residence</label>
          </div>
          <div class="label-wrapper">
            <input type="text" />
            <label for="name">Age</label>
          </div>
        </div>
      </div>
      <CharacteristicBox />
    </div>
    <div style="">
      <TabsContainer>
        <TabPanel title="Skills" id="{1}"><SkillsList></SkillsList></TabPanel>
        <TabPanel title="My Story" id="{2}"
          ><LargeTextAreaField title="My Story"
        /></TabPanel>
        <TabPanel title="Backstory" id="{3}"><Backstory /></TabPanel>
        <TabPanel title="Gear/Items" id="{4}"
          ><LargeTextAreaField title="Gear/Items"
        /></TabPanel>
        <TabPanel title="Fellow Investigators" id="{5}"
          ><Investigators
        /></TabPanel>
        <TabPanel title="Notes" id="{6}"
          ><LargeTextAreaField title="Notes"
        /></TabPanel>
      </TabsContainer>
    </div>
  </div>
</template>

<style>
.label-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
