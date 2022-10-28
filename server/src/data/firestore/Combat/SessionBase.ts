import DBBase from "../DBBase.js";
import { CollectionReference } from "firebase-admin/firestore";
import { SessionInterface } from "../../schemas/Session.js";
import { FirebaseConverter } from "../Converter.js";
import { loggingUtilWrapper } from "../../../utilities/Logging.js";

export class SessionBase extends DBBase {
  private baseName: string;
  baseRef: CollectionReference;
  constructor() {
    super();
    this.baseName = "sessions";
    this.baseRef = this.db.collection(this.baseName);
  }
  get collectionString(){
    return "sessions";
  }
  get initiativeCollectionString() {
    return "initiative"
  }
  get customRollCollectionString() {
    return "rolls"
  }
  getSessionRef(sessionId: string) {
    return this.getDocRef(this.getTopRef(this.collectionString), sessionId);
  }
  async getSessionData(sessionId: string) {
    const ref = this.getSessionRef(sessionId);
    const data = await this.getDocData(
      FirebaseConverter<SessionInterface>(),
      ref
    );

    return data.data();
  }
  async updateSessionData(sessionId: string, data: SessionInterface) {
    const ref = this.getSessionRef(sessionId);
    await this.setDocData(FirebaseConverter<SessionInterface>(), ref, data);
    return this;
  }
}

const sessionFirestoreHandler = loggingUtilWrapper(new SessionBase());

export default sessionFirestoreHandler;
