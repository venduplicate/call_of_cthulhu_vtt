import DatabaseError from "../../errors/DatabaseError";
import { logger } from "../../utilities/Logging";

export default {
  name: "error",
  once: false,
  async execute(error: unknown) {
    if (!(error instanceof DatabaseError)) return;
    logger.alert(error);
  },
};