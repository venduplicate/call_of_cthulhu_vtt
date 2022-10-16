import SonicError from "../../errors/SonicError";
import { logger } from "../../utilities/Logging";

export default {
  name: "error",
  once: false,
  async execute(error: unknown) {
    if (!(error instanceof SonicError)) return;
    logger.alert(error);
  },
};