// const { Logtail } = require("@logtail/node");
import winston from "winston";
import { Logtail } from "@logtail/node";
import { LogtailTransport } from "@logtail/winston";
import { config } from "dotenv";
config();

const logKey = process.env.LOGTAIL_TOKEN as string;

const logTail = new Logtail(logKey)

export const logger = winston.createLogger({
  transports: [new LogtailTransport(logTail)],
});



interface ClassObject {
  name: string;
  testFunc: () => void;
}

function functionHandler<T extends Object>(value: Function, target: T, receiver: any) {
  return function (this: unknown, ...args: never[]) {
    const start = new Date().getTime();
    try {
      console.log(`initiating ${value.name}`)
      // logger.info(`initiating ${value}`, `${value}`, ...args);
      return value.apply(this === receiver ? target : this, args);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error)
        // logger.alert(error.message, error.name, `${value}`, ...args);
      }
      return error;
    }
    finally {
      const end = new Date().getTime();
      console.log('Function Time Trace', `${value.name}`, { start: start, end: end, total: end - start })
      // logger.info('Function Time Trace',`${value}`,{start:start,end:end,total: end-start})
    }
  };
}

export function loggingUtilWrapper<T extends Object>(obj: T) {
  return new Proxy(obj, {
    get(target, prop, receiver) {
      const value = target[prop as keyof T];

      // logger.info(`retrieving ${target}`)

      if (value instanceof Function) {
        console.log("is a function")
        // logger.info(`${value} is function`)
        return  functionHandler(value, target, receiver);
        

      }
      return value;
    },
  });
}

class myTestClass {
  logStuff() {
    console.log("logging test through proxy")
  }
}

const myClassObj = loggingUtilWrapper(new myTestClass());

myClassObj.logStuff();
