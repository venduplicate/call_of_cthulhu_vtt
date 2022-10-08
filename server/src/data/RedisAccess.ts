import {createClient} from "redis";
import * as dotenv from 'dotenv'
dotenv.config({path:"c:/Users/AndrewKent/Documents/Development/call_of_cthulhu_vtt/server/src/.env"})

const redisURL = process.env.REDISCLOUD_URL

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


