import type { InitiativeFirestore } from "../../data/firestore/Combat/InitiativeFirestore";
import type Initiative from "../../game/Initiative/Initiative";

export default {
  name: "updateAllInitiativeToDatabase",
  once: false,
  async execute(
    initiativeDatabaseHandler: InitiativeFirestore,
    initiativeHandler: Initiative,
    sessionId: string
  ) {
    initiativeDatabaseHandler.updateAllInitiative(
      sessionId,
      initiativeHandler.initiativeMap
    );
  },
};
