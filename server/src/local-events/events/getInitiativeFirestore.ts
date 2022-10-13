import {
  type InitiativeFirestore,
  initiativeHandler,
} from "../../data/firestore/InitiativeFirestore.js";

export default {
  name: "getInitiativeFirestore",
  once: false,
  async execute(callback: (roll: InitiativeFirestore) => void) {
    callback(initiativeHandler);
  },
};
