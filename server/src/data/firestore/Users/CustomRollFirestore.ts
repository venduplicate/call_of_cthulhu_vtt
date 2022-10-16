import { loggingUtilWrapper } from "../../../utilities/Logging.js";
import { InvestigatorFirestore } from "./InvestigatorsFirestore.js";

export class CustomRollFireStore extends InvestigatorFirestore {
  name: string;
  constructor() {
    super();
    this.name = "custom_rolls";
  }
  getRollRef(userId: string, investigatorId: string) {
    const investigatorRef = this.getInvestigatorDocRef(userId, investigatorId);
    return this.getCollectionRef(investigatorRef, this.name);
  }
}

const customRollFirestoreHandler = loggingUtilWrapper(
  new CustomRollFireStore()
);

export default customRollFirestoreHandler;
