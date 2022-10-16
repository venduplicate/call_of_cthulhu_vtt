import InitiativeError from "../../errors/InitiativeError";
import { logger } from "../../utilities/Logging";

export default {
  name: "error",
  once: false,
  async execute(error: unknown) {
    if (!(error instanceof InitiativeError)) return;
    logger.alert(error);
  },
};