import type { InvestigatorFirestore } from "./InvestigatorTypes";

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
