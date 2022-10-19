import type { Characteristic } from "../types/Characteristics";
import { CharacteristicBase } from "./CharacteristicHandler";
import type { Skills, Skill, ServerSkills } from "../types/Skills";
import { defaultSkills } from "../static";

export class SkillRecord extends CharacteristicBase {
  name: string;
  hasImproved: boolean;
  constructor(skill = {name: "", hasImproved: false, reg: 0, half: 0, fifth: 0}) {
    super(skill);
    this.name = skill.name;
    this.hasImproved = skill.hasImproved;
  }
  get skillName() {
    return this.name;
  }
  getHasImproved() {
    return this.hasImproved;
  }
  setHasImproved(value: boolean) {
    this.hasImproved = value;
    return this;
  }
}

export class SkillsHandler {
  listOfSkills: Skills;
  constructor(){
    this.listOfSkills = new Map();
  }
  get skillMap(){
    return new Map(this.listOfSkills);
  }
  set skillMap(data: Skills){
    this.listOfSkills = new Map(data);
  }
  set addSkill(data: Skill){
    const newSkills = this.skillMap.set(data.name,new SkillRecord(data));
    this.skillMap = newSkills;
  }
  set defaultSkill(data: SkillRecord){
    const newSkills = this.skillMap.set(data.name,data);
    this.skillMap = newSkills;
  }
  set removeSkill(name: string){
    const removedSkills = this.skillMap
    removedSkills.delete(name);
    this.skillMap = removedSkills;
  }
  getSkill(name: string){
    return this.skillMap.get(name);
  }
  initBaseSkills(){
    defaultSkills.forEach((item) => {
      const newSkill = new SkillRecord({name: item.type, hasImproved: false, reg: item.base, half: 0, fifth: 0})
      newSkill.update();
      this.defaultSkill = newSkill;
    })
    return this;
  }
  initFirestoreSkills(data: ServerSkills){
    data.forEach((item) => {
      this.addSkill = item;
    })
    return this;
  }
}
