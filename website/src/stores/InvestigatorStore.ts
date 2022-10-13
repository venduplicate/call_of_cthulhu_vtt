import { ref, type Ref } from "vue";
import { defineStore } from "pinia";
import { useSocketStore } from "./socket";
import type { InitiativeMap } from "./types/Initiative";
import type { InvestigatorFirestore } from "./types/InvestigatorTypes";

export const useInvestigatorStore = defineStore("initiative", () => {
  const investigatorStore: Ref<InvestigatorFirestore | undefined> = ref();
  const socket = useSocketStore().socketStore;

 
  return { investigatorStore };
});
