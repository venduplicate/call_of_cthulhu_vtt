import { loggingUtilWrapper } from "../../../utilities/Logging.js";
import { SessionBase } from "./SessionBase.js";
import {
  InitiativeArray,
  InitiativeInterface,
  InitiativeMap,
  PlayerArray,
} from "../../schemas/Initiative.js";
import { FirebaseConverter, ConverterInterface } from "../Converter.js";

export class InitiativeFirestore extends SessionBase {
  public name: string;
  public converter: ConverterInterface<InitiativeArray>;
  constructor() {
    super();
    this.name = "initiative";
    this.converter = FirebaseConverter<InitiativeArray>();
  }
  getInitiativeRef(sessionId: string) {
    return this.getCollectionRef(this.getSessionRef(sessionId), this.name);
  }
  async getAllInitiative(sessionId: string) {
    const ref = this.getInitiativeRef(sessionId);
    const docData = await this.getCollectionData(ref);
    const initiativeArray = this.toArrayFromFirestoreDoc(docData);

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
  async getPlayerNames(sessionId: string) {
    const initiativeArray = await this.getAllInitiative(sessionId);
    const playerArray: PlayerArray = [];
    initiativeArray.forEach((doc: InitiativeInterface) => {
      playerArray.push({
        investigatorId: doc.investigator_id,
        name: doc.name,
      });
    });
    return playerArray;
  }
}

export const initiativeFirestoreHandler = loggingUtilWrapper(
  new InitiativeFirestore()
);
