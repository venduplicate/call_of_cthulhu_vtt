import {
  customRollHandler,
  CustomRollFireStore,
} from "../../data/firestore/Users/CustomRollFirestore.js";

export default {
  name: "getCustomRollFirestore",
  once: false,
  async execute(callback: (customRoll: CustomRollFireStore) => void) {
    callback(customRollHandler);
  },
};
