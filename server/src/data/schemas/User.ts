import type { InvestigatorInterface } from "./Characters/Investigator.js";

export interface UserInterface {
  id: string;
  investigators: InvestigatorInterface[];
}

export class UserSchema {
  id: string;
  investigators: InvestigatorInterface[];
  constructor(id: string, investigators: InvestigatorInterface[]) {
    this.id = id;
    this.investigators = investigators;
  }
}

export interface DiscordUserInterface {
  userId: string;
}

export class DiscordUserSchema {
  userId: string;
  constructor(userId: string) {
    this.userId = userId;
  }
}
