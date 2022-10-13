import type { InvestigatorFirestore } from "./Investigator.js";

export interface UserInterface {
  id: string;
  investigators: InvestigatorFirestore[];
}

export class UserSchema {
  id: string;
  investigators: InvestigatorFirestore[];
  constructor(id: string, investigators: InvestigatorFirestore[]) {
    this.id = id;
    this.investigators = investigators;
  }
}

export const UserConverter = {
  toFirestore: function (data: UserInterface) {
    return { ...data };
  },
  fromFirestore: function (snapshot: FirebaseFirestore.QueryDocumentSnapshot) {
    const data = snapshot.data() as UserInterface;
    return new UserSchema(data.id, data.investigators);
  },
};
