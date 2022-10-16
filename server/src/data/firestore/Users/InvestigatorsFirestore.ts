import { UserBase } from "./UserBase.js";
import { loggingUtilWrapper } from "../../../utilities/Logging.js";
import { SuccessorFailureObject } from "../../types.js";
import {
  InvestigatorSchema,
  InvestigatorInterface,
} from "../../schemas/Characters/Investigator.js";
import { FirebaseConverter } from "../Converter.js";

export class InvestigatorFirestore extends UserBase {
  investigators: string;
  constructor() {
    super();
    this.investigators = "investigators";
  }
  getInvestigatorsCollectionRef(userId: string) {
    return this.getUserRef(userId).collection(this.investigators);
  }
  getInvestigatorDocRef(userId: string, investigatorId: string) {
    return this.getDocRef(
      this.getInvestigatorsCollectionRef(userId),
      investigatorId
    );
  }
  async getSingleInvestigator(userId: string, investigatorId: string) {
    const ref = this.getInvestigatorsCollectionRef(userId).doc(investigatorId);
    const docData = await this.getDocData(
      FirebaseConverter<InvestigatorInterface>(),
      ref
    );

    return { ...docData.data() };
  }
  async updateInvestigator(
    userId: string,
    investigatorData: InvestigatorInterface
  ): Promise<SuccessorFailureObject> {
    const ref = this.getInvestigatorsCollectionRef(userId).doc(
      investigatorData.id
    );
    try {
      await this.setDocData(
        FirebaseConverter<InvestigatorInterface>(),
        ref,
        new InvestigatorSchema(investigatorData)
      );
      return { error: null, success: true };
    } catch (error) {
      return { error: error, success: false };
    }
  }
  async deleteInvestigator(
    userId: string,
    investigatorId: string
  ): Promise<SuccessorFailureObject> {
    try {
      const ref =
        this.getInvestigatorsCollectionRef(userId).doc(investigatorId);
      await this.deleteDocData(ref);
      return { error: null, success: true };
    } catch (error) {
      return { error: error, success: false };
    }
  }
}

const investigatorFirestoreHandler = loggingUtilWrapper(
  new InvestigatorFirestore()
);

export default investigatorFirestoreHandler;
