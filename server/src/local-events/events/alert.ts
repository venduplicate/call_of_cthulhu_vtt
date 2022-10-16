import { logger } from "../../utilities/Logging";

export default {
  name: "alert",
  once: false,
  async execute(data: unknown) {
    logger.alert(data);
  },
};
