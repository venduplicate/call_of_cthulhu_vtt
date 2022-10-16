import InvestigatorError from "../../errors/InvestigatorError";
import { logger } from "../../utilities/Logging";

export default {
  name: "error",
  once: false,
  async execute(error: unknown) {
    if (!(error instanceof InvestigatorError)) return;
    logger.alert(error);
  },
};