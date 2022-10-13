import { db } from "../../data/firestore/FireBaseAccess";
export default {
  name: "getDB",
  once: false,
  async execute(callback: (roll: unknown) => void) {
    callback("initiativeHandler");
  },
};
