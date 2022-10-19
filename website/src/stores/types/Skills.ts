import type { Characteristic } from "./Characteristics";
import type {SkillRecord } from "../Character/SkillHandler";

export interface Skill extends Characteristic {
  name: string;
  hasImproved: boolean;
}

export type Skills = Map<string, SkillRecord>;

export type ServerSkills = Map<string,Skill>;

