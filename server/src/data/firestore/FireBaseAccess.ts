import {cert, initializeApp} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import * as dotenv from 'dotenv'
dotenv.config({debug: true,path:"c:/Users/AndrewKent/Documents/Development/call_of_cthulhu_vtt/server/src/.env"})

const app = initializeApp({
  credential: cert(process.env.FIREBASE_JSON as string),
  databaseURL: "https://keeper-bot-e1c2e.firebaseio.com"
})



export const db = getFirestore(app)


