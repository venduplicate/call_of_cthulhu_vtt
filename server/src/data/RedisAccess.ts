import {createClient} from "redis";
require("dotenv").config();

const redisURL = process.env.REDISCLOUD_URL as string

class RedisInstance {
  redisURL: string;
  client: any;
  constructor(){
    this.redisURL = process.env.REDISCLOUD_URL as string
    this.client = createClient({
      url: this.redisURL,
    });
  }
  async init(){
    await this.client.connect();
    this.client.on("error", (err: any) => console.log(err));
  }
  async push(key: string, item: any){
    try {
      await this.client.RPUSH(key, JSON.stringify(item));
    } catch (error) {
      console.log(error,this.push.name,...arguments)
    }
  }
  async retrieveArray(key: string): Promise<any[]> {
    try {
      const redisArray = await this.client.LRANGE(key, 0, -1);
      console.log("successfully retrieving array items",this.retrieveArray.name)
      return redisArray;
    } catch (error) {
        console.log(error,this.push.name,...arguments)
      return [];
    }
  }
}
// for now, only need redisClient variable
// if there are common functions between processes, then we should make this the single source of truth for those. 
// for now, that's not needed I think. 
export async function redisInit(){
    const client = createClient({
        url: redisURL,
      });
    await client.connect();
    client.on("error", (err: any) => console.log(err));
    return client;
}

export const redisClient = await redisInit()


