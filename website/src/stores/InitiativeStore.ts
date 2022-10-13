import { ref, type Ref } from "vue";
import { defineStore } from "pinia";
import { useSocketStore } from "./socket";
import {
  type InitiativeArray,
  type InitiativeMap,
  isInitiativeArray,
  isInitiativeMap,
  type InitiativeInterface,
} from "./types/Initiative";

export const useInitiativeStore = defineStore("initiative", () => {
  const initiativeMapRef: Ref<InitiativeMap> = ref(new Map());
  const initiativeArrayRef: Ref<InitiativeArray> = ref([]);
  const isSortedRef = ref(false);
  const nextNumberRef: Ref<number | null> = ref(null);
  const previousNumberRef: Ref<number | null> = ref(null);
  const currentNumberRef: Ref<number | null> = ref(null);
  const socketStore = useSocketStore();
  const socket = socketStore.socketStore;

  function initiatilizeInitiative() {
    socket.emit(
      "GetInitiative",
      (data: {
        initiative: InitiativeMap | InitiativeArray;
        isSorted: boolean;
        nextNumber: number;
        previousNumber: number;
        currentNumber: number;
      }) => {
        const {
          initiative,
          isSorted,
          nextNumber,
          previousNumber,
          currentNumber,
        } = data;
        if (isSorted) {
          if (isInitiativeMap(initiative)) {
            initiativeMapRef.value = initiative;
          }
        }
        if (!isSorted) {
          if (isInitiativeArray(initiative)) {
            initiativeArrayRef.value = initiative;
          }
        }
        isSortedRef.value = isSorted;
        nextNumberRef.value = nextNumber;
        previousNumberRef.value = previousNumber;
        currentNumberRef.value = currentNumber;
      }
    );
  }

  function emitUpdateSingleIntiative(record: InitiativeInterface) {
    const sessionId = socketStore.getSessionId() as string;
    socket.emit("UpdateSingleInitiative", {
      sessionId: sessionId,
      initiative: record,
    });
  }

  function updateSingleInitiative(
    position: number,
    record: InitiativeInterface
  ) {
    initiativeMapRef.value.get(position) == record;
    emitUpdateSingleIntiative(record);
  }

  function emitDeleteSingleIntiative(id: string) {
    socket.emit("DeleteSingleInitiative", id);
  }

  function deleteSingleInitiative(index: number) {
    const recordId = initiativeMapRef.value.get(index)?.id;
    initiativeMapRef.value.delete(index);
    if (recordId !== undefined) {
      emitDeleteSingleIntiative(recordId);
    }
  }

  return {
    initiativeMapRef,
    isSortedRef,
    nextNumberRef,
    previousNumberRef,
    currentNumberRef,
    initiatilizeInitiative,
    updateSingleInitiative,
  };
});
