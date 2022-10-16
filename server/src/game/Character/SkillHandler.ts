import { list_of_skills } from "../static/skills";
import { Characteristic, CharacteristicBase } from "./CharacteristicHandler";

export interface Skill extends Characteristic {
  name: string;
  hasImproved: boolean;
}

type SkillType = typeof list_of_skills;

export type SkillStrings = SkillType[number];

export type Skills = Map<string, Skill>;

export class Skill extends CharacteristicBase {
  name: string;
  hasImproved: boolean;
  constructor(skill: Skill) {
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
