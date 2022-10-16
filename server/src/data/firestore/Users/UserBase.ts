import DBBase from "../DBBase.js";
import { UserInterface } from "../../schemas/User.js";
import { loggingUtilWrapper } from "../../../utilities/Logging.js";
import { ConverterInterface, FirebaseConverter } from "../Converter.js";
import { CollectionReference } from "firebase-admin/firestore";
export class UserBase extends DBBase {
  private baseName: string;
  baseRef: CollectionReference;
  converter: ConverterInterface<UserInterface>;
  constructor() {
    super();
    this.baseName = "users";
    this.converter = FirebaseConverter<UserInterface>();
    this.baseRef = this.db.collection(this.baseName);
  }
  getUserRef(userId: string) {
    return this.getDocRef(this.baseRef, userId);
  }
}

const userDatabaseHandler = loggingUtilWrapper(new UserBase());

export default userDatabaseHandler;
