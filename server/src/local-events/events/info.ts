import { logger } from "../../utilities/Logging";

export default {
  name: "info",
  once: false,
  async execute(data: string) {
    logger.info(data);
  },
};
