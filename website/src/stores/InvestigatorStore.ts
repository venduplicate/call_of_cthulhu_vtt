import { ref, type Ref } from "vue";
import { defineStore } from "pinia";
import { useSocketStore } from "./socket";
import type { InitiativeMap } from "./types/Initiative";
import type { InvestigatorInterface } from "./types/InvestigatorTypes";
import { Investigator } from "./Character/InvestigatorHandler";
import axios from "axios";

export const useInvestigatorStore = defineStore("investigator", () => {
  const investigatorStore = ref<Investigator | undefined>();
  const socket = useSocketStore().socketStore;

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

  return {
    setInvestigatorData,
    isInvestigator,
    getInvestigatorValues,
    getInvestigatorData,
  };
});
