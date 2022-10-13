import DBBase from "./DBBase.js";
import { CollectionReference } from "firebase-admin/firestore";
import { SessionConverter, SessionInterface } from "../schemas/Session.js";
import { SuccessorFailureObject } from "../types.js";

export class SessionBase extends DBBase {
  sessions: string;
  ref: CollectionReference;
  constructor() {
    super();
    this.sessions = "sessions";
    this.ref = this.db.collection(this.sessions);
  }
  getSessionRef(sessionId: string) {
    return this.ref.doc(sessionId);
  }
  async getSessionData(sessionId: string) {
    try {
      const ref = this.getSessionRef(sessionId);
      const data = await this.getDocData(SessionConverter, ref);

      return data.data();
    } catch (error) {
      return undefined;
    }
  }
  async updateSessionData(
    sessionId: string,
    data: SessionInterface
  ): Promise<SuccessorFailureObject> {
    try {
      const ref = this.getSessionRef(sessionId);
      await this.setDocData(SessionConverter, ref, data);
      return { error: null, success: true };
    } catch (error) {
      return { error: error, success: false };
    }
  }
}
