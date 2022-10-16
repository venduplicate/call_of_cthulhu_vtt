import RollError from "../../errors/RollError";
import { logger } from "../../utilities/Logging";

export default {
  name: "error",
  once: false,
  async execute(error: unknown) {
    if (!(error instanceof RollError)) return;
    logger.alert(error);
  },
};
