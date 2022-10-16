import {
  type InitiativeFirestore,
  initiativeHandler,
} from "../../data/firestore/Combat/InitiativeFirestore.js";
import { InitiativeArray } from "../../data/schemas/Initiative.js";

export default {
  name: "getAllnitiativeFromDatabase",
  once: false,
  async execute(sessionId: string, callback: (data: InitiativeArray) => void) {
    const data = await initiativeHandler.getAllInitiative(sessionId);
    callback(data);
  },
};
