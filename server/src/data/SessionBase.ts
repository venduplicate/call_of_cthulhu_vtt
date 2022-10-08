import { db } from "./FireBaseAccess"
import {CollectionReference} from "firebase-admin/firestore";

export class SessionBase {
    name: string;
    ref: CollectionReference
    constructor(){
        this.name = "sessions"
        this.ref = db.collection(this.name)
    }
    getSessionRef(sessionId: string){
        return this.ref.doc(sessionId);
    }
}