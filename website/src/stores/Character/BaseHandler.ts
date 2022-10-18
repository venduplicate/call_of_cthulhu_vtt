import type { BaseCharacterInterface } from "../types/InvestigatorTypes";


export class BaseCharacterHandler {
  private id: string;
  private name: string;
  private playerName: string;
  private occupation: string;
  private age: number;
  private controlledById: string;
  private gender: string;
  private pronouns: string;
  private birthplace: string;
  constructor(data: BaseCharacterInterface) {
    this.id = data.id;
    this.name = data.name;
    this.playerName = data.playerName;
    this.controlledById = data.controlledById
    this.occupation = data.occupation;
    this.age = data.age;
    this.gender = data.gender;
    this.pronouns = data.pronouns;
    this.birthplace = data.birthplace;
  }
  getName() {
    return this.name;
  }
  setName(value: string) {
    this.name = value;
    return this;
  }
  getId() {
    return this.id;
  }
  getBasePlayerObject(): BaseCharacterInterface {
    return {
      id: this.id,
      name: this.name,
      playerId: this.controlledById,
      playerName: this.playerName,
      controlledById: this.controlledById,
      occupation: this.occupation,
      age: this.age,
      gender: this.gender,
      pronouns: this.pronouns,
      birthplace: this.birthplace,
    };
  }
}
