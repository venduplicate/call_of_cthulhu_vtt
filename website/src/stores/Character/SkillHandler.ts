import type { Characteristic } from "../types/Characteristics";
import { CharacteristicBase } from "./CharacteristicHandler";

export interface Skill extends Characteristic {
  name: string;
  hasImproved: boolean;
}

export type Skills = Map<string, Skill>;

export class SkillHandler extends CharacteristicBase {
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
