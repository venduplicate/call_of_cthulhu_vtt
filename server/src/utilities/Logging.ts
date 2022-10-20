import * as dotenv from "dotenv";
dotenv.config({
  debug: true,
  path: "c:/Users/Eleven/Documents/Development/call_of_cthulhu_vtt/server/src/.env",
});
import winston from "winston";
import { Logtail } from "@logtail/node";
import { LogtailTransport } from "@logtail/winston";
import sonic from "../local-events/sonic";

const logKey = process.env.LOGTAIL_TOKEN as string;

const logTail = new Logtail(logKey);

export const logger = winston.createLogger({
  transports: [new LogtailTransport(logTail)],
});

// eslint-disable-next-line @typescript-eslint/ban-types
function functionHandler<T extends Object>(
  // eslint-disable-next-line @typescript-eslint/ban-types
  value: Function,
  target: T,
  receiver: any
) {
  return function (this: unknown, ...args: never[]) {
    const start = new Date().getTime();
    try {
      logger.info(`initiating ${value}`, `${value}`, ...args);
      return value.apply(this === receiver ? target : this, args);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        logger.alert(error.message, error.name, `${value}`, ...args);
      }
      return error;
    } finally {
      const end = new Date().getTime();
      logger.info("Function Time Trace", `${value}`, {
        start: start,
        end: end,
        total: end - start,
      });
    }
  };
}

const test = new Function(`console.log("test")`)

export function loggingUtilWrapper<T extends {toString: () => string }>(obj: T) {
  return new Proxy(obj, {
    get(target, prop, receiver) {
      const value = target[prop as keyof T];

      logger.info(`retrieving ${target}`);

      if (value instanceof Function) {
        logger.info(`${value} is function`);
        return functionHandler(value, target, receiver);
      }
      return value;
    },
  });
}
