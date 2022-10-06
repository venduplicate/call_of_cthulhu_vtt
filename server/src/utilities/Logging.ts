// const { Logtail } = require("@logtail/node");
import winston from "winston";
import { Logtail } from "@logtail/node";
import { LogtailTransport } from "@logtail/winston";
require("dotenv").config();

const logKey = process.env.LOGTAIL_TOKEN as string;

export class ArcaneTome {
  logTail: Logtail;
  logger: winston.Logger;
  constructor() {
    this.logTail = new Logtail(logKey);
    this.logger = winston.createLogger({
      transports: [new LogtailTransport(this.logTail)],
    });
  }
  _info(message: string, called: string, ...args: any[]) {
    this.logger.info(message, { called: called, ...args });
  }
  _alert(message: string, errorName: string, called: string, ...args: any[]) {
    this.logger.alert(message, {
      error_name: errorName,
      called: called,
      ...args,
    });
  }
  _warn(message: string, called: string, ...args: any[]) {
    this.logger.warn(message, { called: called, ...args });
  }
  _debug(message: string, called: string, ...args: any[]) {
    this.logger.debug(message, { called: called, ...args });
  }
}

export const logger = new ArcaneTome();

export function loggingUtilWrapper<T extends Object>(obj: T) {
  return new Proxy(obj, {
    get(target, prop, receiver) {
      const value = target[prop as keyof T];

      if (value instanceof Function) {
        return function (this: unknown, ...args: never[]) {
          const start = new Date().getTime();
          try {
            logger._info(`initiating ${value}`, `${value}`, ...args);
            return value.apply(this === receiver ? target : this, args);
          } catch (error) {
            if (error instanceof Error) {
              logger._alert(error.message, error.name, `${value}`, ...args);
            }
            return error;
          }
          finally {
            const end = new Date().getTime();
            logger._info('Function Time Trace',`${value}`,{start:start,end:end,total: end-start})
          }
        };
      }
      return value;
    },
  });
}
