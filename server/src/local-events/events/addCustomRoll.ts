import type { CustomRollFireStore } from "../../data/firestore/Users/CustomRollFirestore.js";
import type { CustomRoll } from "../../data/schemas/Roll.js";
import type { SonicEmitter } from "../sonic.js";

export default {
  name: "addCustomRoll",
  once: false,
  async execute(sessionId: string, data: CustomRoll, sonic: SonicEmitter) {
    sonic.emit(
      "getCustomRollFirestore",
      (customRollHandler: CustomRollFireStore) => {
        customRollHandler.addRoll(sessionId, data);
      }
    );
  },
};
