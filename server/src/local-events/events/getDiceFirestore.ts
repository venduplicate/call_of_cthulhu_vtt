import {
  customRollHandler,
  CustomRollFireStore,
} from "../../data/firestore/Users/CustomRollFirestore";

export default {
  name: "getDice",
  once: false,
  async execute(callback: (customRollFirestore: CustomRollFireStore) => void) {
    callback(customRollHandler);
  },
};
