import SessionCustomRoll from "../../data/firestore/SessionCustomRoll";

module.exports = {
  name: "getCustomRollFirestore",
  once: false,
  async execute(callback: (customRoll: SessionCustomRoll) => void) {
    callback(new SessionCustomRoll());
  },
};
