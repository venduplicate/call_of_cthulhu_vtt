import { InitiativeArray } from "../../data/schemas/Initiative";
import Initiative from "../../game/Initiative/Initiative";

export default {
  name: "createInitiativeClassHandler",
  once: false,
  async execute(
    initiativeArray: InitiativeArray,
    callback: (initiativeHandler: Initiative) => void
  ) {
    callback(new Initiative(initiativeArray));
  },
};
