import { ref, type Ref } from "vue";
import { defineStore } from "pinia";
import { useSocketStore } from "./socket";
import type { InitiativeMap } from "./types/Initiative";
import { Investigator } from "./Character/InvestigatorHandler";
import type { InvestigatorInterface } from "./types/InvestigatorTypes";
import { defaultSkills } from "./static";
import axios from "axios";
import type { SkillHandler } from "./Character/SkillHandler";
import type { ServerSkills, Skill } from "./types/Skills";

export const useInvestigatorStore = defineStore("investigator", () => {
  const investigatorStore = ref<Investigator | undefined>();
  const socket = useSocketStore().socketStore;

  async function initialize(){
    //await getInvestigatorData()
    // where are we getting ID from?
    // setSkills()
  }

  function setInvestigatorData(data: InvestigatorInterface) {
    investigatorStore.value = new Investigator(data);
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

  function setSkills(skills: ServerSkills){
    const skillsMap = new Map()
    defaultSkills.forEach((item: {type: string, subtypes: Array<{name: string, base:number}>, base: number, modern?: boolean}) => {
      if (item.subtypes.length > 0){
        item.subtypes.forEach((subtype) => {
          skillsMap.set(`${item.type} - ${subtype.name}`,subtype)
        })
      }
      else {
        skillsMap.set(item.type, item)
      }
    })
    skills.forEach((item: Skill) => {
      skillsMap.set(item.name,item)
    })
    if(isInvestigator(investigatorStore.value)){
      investigatorStore.value.skillsMap = skillsMap;
    }
  }

  return {
    setInvestigatorData,
    isInvestigator,
    getInvestigatorValues,
    getInvestigatorData,
  };
});
