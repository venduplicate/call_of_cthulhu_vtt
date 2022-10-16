import { Socket } from "socket.io";
import sonic, { SonicEmitter } from "../../local-events/sonic.js";
import type {
  InitiativeArray,
  InitiativeMap,
} from "../../data/schemas/Initiative";
import type { InitiativeFirestore } from "../../data/firestore/Combat/InitiativeFirestore.js";

export default {
  name: "GetInitiative",
  once: false,
  async execute(
    socket: Socket,
    sonic: SonicEmitter,
    sessionId: string,
    callback: (data: {
      initiative: InitiativeMap | InitiativeArray;
      isSorted: boolean;
      nextNumber: number;
      previousNumber: number;
      currentNumber: number;
    }) => void
  ) {
    sonic.emit(
      "getInitiativeFirestore",
      async (initiativeFirestore: InitiativeFirestore) => {
        const initiativeData = await initiativeFirestore.getAllInitiative(
          sessionId
        );
        const data = await initiativeFirestore.getSessionData(sessionId);

        if (data !== undefined) {
          const isSorted = data.isSorted;
          const nextNumber = data.nextNumber;
          const previousNumber = data.previousNumber;
          const currentNumber = data.currentNumber;

          if (isSorted) {
            const initiativeMap =
              initiativeFirestore.toInitiativeMapFromArray(initiativeData);
            callback({
              initiative: initiativeMap,
              isSorted: isSorted,
              nextNumber: nextNumber,
              previousNumber: previousNumber,
              currentNumber: currentNumber,
            });
          }
          if (!isSorted) {
            callback({
              initiative: initiativeData,
              isSorted: isSorted,
              nextNumber: nextNumber,
              previousNumber: previousNumber,
              currentNumber: currentNumber,
            });
          }
        }
      }
    );
  },
};
