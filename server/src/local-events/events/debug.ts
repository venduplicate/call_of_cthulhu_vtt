import { logger } from "../../utilities/Logging";

export default {
  name: "debug",
  once: false,
  async execute(data: string) {
    logger.debug(data);
  },
};
