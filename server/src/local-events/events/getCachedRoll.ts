import { CustomRollFireStore } from "../../data/firestore/Users/CustomRollFirestore";
import type { RollRedis } from "../../data/redis/RollRedis";
import type { CustomRoll } from "../../data/schemas/Roll";
import SonicError from "../../errors/SonicError";
import sonic from "../sonic";

export default {
  name: "getCachedRoll",
  once: false,
  async execute(cachedId: string, sessionId: string) {
    sonic.emit("getRollRedis", async (handlerRedis: RollRedis) => {
      const rollCache = await handlerRedis.getCacheRoll(cachedId);
      if (rollCache == null) {
        const sonicError = new SonicError("rollCache is null");
        sonic.emit("alert", sonicError);
        throw sonicError;
      }
      sonic.emit("debug", "creating roll object");
      const idArray = cachedId.split(":");
      const rollId = idArray[0];
      const playerId = idArray[1];
      const rollObject = JSON.parse(rollCache);
      const rollData: CustomRoll = {
        notation: rollObject.notation,
        name: rollObject.name,
        id: rollId,
        investigatorId: playerId,
      };
      sonic.emit("info", "adding roll object into firestore");

      sonic.emit(
        "getCustomRollFirestore",
        async (handlerRoll: CustomRollFireStore) => {
          handlerRoll.addRoll(sessionId, rollData);
        }
      );
    });
  },
};
