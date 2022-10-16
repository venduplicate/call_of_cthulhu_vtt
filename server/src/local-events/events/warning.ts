import { logger } from "../../utilities/Logging";

export default {
  name: "warning",
  once: false,
  async execute(data: string) {
    logger.warn(data);
  },
};