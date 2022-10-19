import { ref, type Ref, computed } from "vue";
import { defineStore } from "pinia";
import { useSocketStore } from "./socket";
import type { InitiativeMap } from "./types/Initiative";
import { Investigator } from "./Character/InvestigatorHandler";
import type { BackStory, BaseCharacterInterface, InvestigatorInterface } from "./types/InvestigatorTypes";
import { defaultSkills } from "./static";
import axios from "axios";
import type { SkillHandler } from "./Character/SkillHandler";
import type { ServerSkills, Skill } from "./types/Skills";
import { SanityHandler } from "./Character/StatusEffectHandler";
import { HealthHandler } from "./Character/HealthHandler";

export const useInvestigatorStore = defineStore("investigator", () => {
  const investigatorStore = ref<Investigator>(new Investigator());
  const skills = ref();
  const socket = useSocketStore().socketStore;

  async function initialize() {
    //await getInvestigatorData()
    // where are we getting ID from?
    // setSkills()
  }

  function initiatlizeValues(data: InvestigatorInterface){
    const investigator = getInvestigatorValues();
    investigator.skills.initBaseSkills();
  }

  function setInvestigatorData(data: InvestigatorInterface) {
    const investigator = new Investigator();
    const characteristics = data.characteristics;
    investigator.skills.initBaseSkills();
    investigator.app.updateCharacteristic(characteristics.app.reg);
    investigator.app.update();
    investigator.con.updateCharacteristic(characteristics.con.reg);
    investigator.con.update();
    investigator.dex.updateCharacteristic(characteristics.dex.reg);
    investigator.edu.update();
    investigator.int.updateCharacteristic(characteristics.int.reg);
    investigator.luck.updateCharacteristic(characteristics.luck.reg);
    investigator.pow.updateCharacteristic(characteristics.pow.reg);
    investigator.sanity = new SanityHandler(data.sanity);
    investigator.baseData.basePlayerObject = {age: data.age, birthplace: data.birthplace, controlledById: data.controlledById, gender: data.gender, id: data.id, name: data.name, occupation: data.occupation, playerId: data.playerId, playerName: data.playerName, pronouns: data.pronouns}
    investigator.siz.updateCharacteristic(characteristics.siz.reg);
    investigator.backstory = data.backstory
     investigator.health = new HealthHandler(data.health.hpCurrent, data.health.hpMax); // create set functions
    investigator.posessions = data.posessions; // handler?
    investigator.skills.initFirestoreSkills(data.skills);
    
    // add status effects to investigator.statusEffects.effectMap = data.statuseffects;
    // add weapons investigator.weapons.


  }
  async function getInvestigatorData(investigatorId: string) {
    const response = await axios.get("http:localhost:3000/investigator", {
      data: investigatorId,
    });
    const investigatorData = JSON.parse(response.data);
    if (isInvestigator(investigatorData)) {
      setInvestigatorData(investigatorData);
    }
  }
  function getInvestigatorValues() {
    return investigatorStore.value;
  }
  function isInvestigator(
    store: Investigator | unknown
  ): store is InvestigatorInterface {
    return (store as Investigator).baseData !== undefined;
  }

  function setSkills() {
    const skillsMap = new Map()
    defaultSkills.forEach((item: { type: string, subtypes: Array<{ name: string, base: number }>, base: number, modern?: boolean }) => {
      if (item.subtypes.length > 0) {
        item.subtypes.forEach((subtype) => {
          skillsMap.set(`${item.type} - ${subtype.name}`, subtype)
        })
      }
      else {
        skillsMap.set(item.type, item)
      }
    })
    skills.value.forEach((item: Skill) => {
      skillsMap.set(item.name, item)
    })
    if (isInvestigator(investigatorStore.value)) {
      investigatorStore.value.skills.skillMap = skillsMap;
    }
  }

  return {
    setInvestigatorData,
    isInvestigator,
    getInvestigatorValues,
    getInvestigatorData,
  };
});
