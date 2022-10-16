import MonsterError from "../../errors/MonsterErrors";
import { logger } from "../../utilities/Logging";

export default {
  name: "error",
  once: false,
  async execute(error: unknown) {
    if (!(error instanceof MonsterError)) return;
    logger.alert(error);
  },
};
