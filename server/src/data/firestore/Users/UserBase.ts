import DBBase from "../DBBase.js";
import { UserInterface } from "../../schemas/User.js";
import { loggingUtilWrapper } from "../../../utilities/Logging.js";
import { ConverterInterface, FirebaseConverter } from "../Converter.js";
import { CollectionReference } from "firebase-admin/firestore";
export class UserBase extends DBBase {
  converter: ConverterInterface<UserInterface>;
  constructor() {
    super();
    this.converter = FirebaseConverter<UserInterface>();
  }
  get collectionString(){
    return "users"
  }
  getUserDocRef(userId: string) {
    return this.getDocRef(this.getTopRef(this.collectionString), userId);
  }
}

const userDatabaseHandler = loggingUtilWrapper(new UserBase());

export default userDatabaseHandler;
