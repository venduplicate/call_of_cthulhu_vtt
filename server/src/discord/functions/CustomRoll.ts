import type CustomRollFireStore from "../../data/firestore/CustomRollFirestore";
import type { CustomRoll } from "../../data/schemas/Roll";
import type { SonicEmitter } from "../../local-events/sonic";

export function addCustomRoll(
  sonic: SonicEmitter,
  sessionId: string,
  rollData: CustomRoll
) {
  sonic.emit("getCustomRollFirestore", (customRoll: CustomRollFireStore) => {
    customRoll.addRoll(sessionId, {
      id: sonic.createUUID(),
      investigatorId: rollData.investigatorId,
      notation: rollData.notation,
      name: rollData.name,
    });
  });
}
