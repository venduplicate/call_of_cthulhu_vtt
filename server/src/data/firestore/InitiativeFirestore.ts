import { loggingUtilWrapper } from "../../utilities/Logging.js";
import { SessionBase } from "./SessionBase.js";
import { SuccessorFailureObject } from "../types.js";
import {
  InitiativeArray,
  InitiativeConverter,
  InitiativeInterface,
  InitiativeMap,
  InitiativeSchema,
} from "../schemas/Initiative.js";

export class InitiativeFirestore extends SessionBase {
  initiative: string;
  constructor() {
    super();
    this.initiative = "initiative";
  }
  getInitiativeRef(sessionId: string) {
    return this.getSessionRef(sessionId).collection(this.initiative);
  }
  async getAllInitiative(sessionId: string) {
    const ref = this.getInitiativeRef(sessionId);
    const docData = await this.getCollectionData(ref);
    const initiativeArray = this.toArrayFromFirestoreDoc(docData);

    return initiativeArray;
  }
  async updateOneInitiative(
    sessionId: string,
    docId: string,
    data: InitiativeInterface
  ): Promise<SuccessorFailureObject> {
    try {
      const ref = this.getInitiativeRef(sessionId).doc(docId);
      await this.setDocData(
        InitiativeConverter,
        ref,
        new InitiativeSchema(data)
      );
      return { error: null, success: true };
    } catch (error) {
      return { error: error, success: false };
    }
  }
  async updateAllInitiative(
    sessionId: string,
    data: InitiativeMap
  ): Promise<SuccessorFailureObject> {
    try {
      const ref = this.getInitiativeRef(sessionId);
      const dataArray = this.toInitiativeArrayFromMap(data);
      this.setBatchData(ref, dataArray);
      return { error: null, success: true };
    } catch (error) {
      return { error: error, success: false };
    }
  }
  async deleteAllInitiative(
    sessionId: string,
    data: InitiativeInterface[]
  ): Promise<SuccessorFailureObject> {
    try {
      const ref = this.getInitiativeRef(sessionId);
      this.deleteBatchData(ref, data);
      return { error: null, success: true };
    } catch (error) {
      return { error: error, success: false };
    }
  }
  toInitiativeMapFromArray(dataArray: InitiativeArray) {
    const initiativeMap = new Map();

    dataArray.forEach((record: InitiativeInterface) => {
      initiativeMap.set(record.round_order, record);
    });

    return initiativeMap;
  }
  toInitiativeArrayFromMap(initiativeMap: InitiativeMap) {
    const initiativeArray: InitiativeArray = [];
    initiativeMap.forEach((item: InitiativeInterface) => {
      initiativeArray.push(item);
    });
    return initiativeArray;
  }
  toArrayFromFirestoreDoc(
    firestoreDocs: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>
  ) {
    const initiativeArray: InitiativeArray = [];

    firestoreDocs.forEach((doc) => {
      const record = doc.data() as InitiativeInterface;
      initiativeArray.push(record);
    });

    return initiativeArray;
  }
}

export const initiativeHandler = loggingUtilWrapper(new InitiativeFirestore());
