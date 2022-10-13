import SessionCustomRoll from "../../data/firestore/SessionCustomRoll.js";

export default {
  name: "getCustomRollFirestore",
  once: false,
  async execute(callback: (customRoll: SessionCustomRoll) => void) {
    callback(new SessionCustomRoll());
  },
};
