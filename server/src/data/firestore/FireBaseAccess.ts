/* eslint-disable @typescript-eslint/no-var-requires */
import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const app = initializeApp({
  credential: cert(process.env.FIREBASE_JSON),
  databaseURL: "https://keeper-bot-e1c2e.firebaseio.com",
});

export const db = getFirestore(app);
