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
  constructor(data = {id: "", name: "", playerName: "", controlledById: "", occupation: "", age: 0, gender: "", pronouns: "", birthplace: ""} as BaseCharacterInterface) {
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
  get characterName() {
    return this.name;
  }
  set characterName(value: string) {
    this.name = value;
  }
  get characterId() {
    return this.id;
  }
  set characterId(value: string){
    this.id = value;
  }
  get playerNameString(){
    return this.playerName
  }
  set playerNameString(value: string){
    this.playerName = value;
  }
  set playerId(value: string){
    this.controlledById = value;
  }
  set occupationString(value: string){
    this.occupation = value;
  }
  set genderString(value: string){
    this.gender = value;
  }
  set pronounString(value: string){
    this.pronouns = value;
  }
  set ageNumber(value: number){
    this.age = value;
  }
  set birthPlaceString(value: string){
    this.birthPlaceString = value;
  }
  set basePlayerObject(data: BaseCharacterInterface){
    const {id, name, playerName, controlledById, occupation, age, gender, pronouns, birthplace} = data;
    this.characterId = id;
    this.playerNameString = playerName;
    this.characterName = name;
    this.playerId = controlledById;
    this.occupationString = occupation;
    this.ageNumber = age;
    this.genderString = gender;
    this.pronounString = pronouns;
    this.birthPlaceString = birthplace;
  }
  get basePlayerObject(): BaseCharacterInterface {
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
