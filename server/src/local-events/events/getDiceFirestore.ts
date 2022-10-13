import CustomRollFireStore from "../../data/firestore/CustomRollFirestore";

export default {
  name: "getDice",
  once: false,
  async execute(callback: (customRollFirestore: CustomRollFireStore) => void) {
    callback(new CustomRollFireStore());
  },
};